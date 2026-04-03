import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';


// PDF worker ayarı (Güncellendi: cdnjs bağlantısı düzeltildi)

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;;


// Dosya tipini algılayan ve içeriğini metne çeviren ana fonksiyon

export async function parseFile(file) {
  const type = file.type;
  const name = file.name.toLowerCase();
  try {
    // 1. PDF İşleme
    if (type === 'application/pdf') {
      return await extractPdfText(file);
    }
    
    // 2. Excel ve CSV İşleme
    if (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        type === 'application/vnd.ms-excel' || 
        name.endsWith('.csv')) {
      return await extractExcelText(file);
    }
    // 3. Word Dosyası İşleme
    if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        name.endsWith('.docx')) {
      return await extractWordText(file);
    }
    // Resimler multimodal modellerce işlendiği için metin ayıklamaya gerek yok.
    return null; 
  } catch (err) {
    console.error("Dosya okunurken hata oluştu:", name, err);
    return `[Hata: ${name} dosyası okunamadı]`;
  }
}
// PDF'ten metin ayıklama
async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(' ') + "\n";
  }
  return fullText;
}
// Excel'den metin ayıklama
async function extractExcelText(file) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  let sheetTexts = "";
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    // Excel verisini CSV benzeri bir metne çeviriyoruz
    const csvValue = XLSX.utils.sheet_to_csv(sheet);
    sheetTexts += `--- Sayfa: ${sheetName} ---\n${csvValue}\n`;
  });
  return sheetTexts;
}
// Word'den metin ayıklama
async function extractWordText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}