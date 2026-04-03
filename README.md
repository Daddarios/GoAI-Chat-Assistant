# 🚀 GoAI - ChatLab & Assistant

---

## 🇹🇷 TÜRKCE VERSION

Modern, hızlı ve çok fonksiyonlu bir yapay zeka deneyimi. **GoAI**, OpenRouter API'si aracılığıyla en güçlü AI modellerini tek bir profesyonel arayüzde birleştirirken, gelişmiş döküman analizi yetenekleriyle dökümanlarınızı "okuyabilen" ve görsellerinizi anlamlandırabilen bir yapay zeka ekosistemidir.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![OpenRouter](https://img.shields.io/badge/API-OpenRouter-7E33E1?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

### ✨ Öne Çıkan Özellikler

- **📁 Akıllı Belge Analizi:** PDF, Word (.docx), Excel (.xlsx, .xls) ve CSV dosyalarının içeriğini otomatik olarak ayıklayıp AI'ya analiz için sunar.
- **🖼️ Vision (Görsel Okuma):** Resim dosyalarını (.png, .jpg, .webp) Vision destekli modellerle doğrudan analiz eder.
- **🤖 Çoklu Model Seçimi:** Sidebar üzerinden OpenRouter'daki en iyi (StepFun, Qwen, Llama vb.) modeller arasında dinamik geçiş imkanı.
- **⚙️ Dinamik Sistem Talimatları:** AI'nın kişiliğini ve davranışını anlık olarak "System Anweisung" üzerinden yapılandırabilme.
- **📜 Yerel Hafıza (History):** Tüm sohbet geçmişi tarayıcı hafızasında saklanır; oturumları isimlendirebilir veya yönetebilirsiniz.
- **🎨 Glassmorphism Tasarım:** Vanilla CSS ile tasarlanmış, modern, şeffaf ve premium bir kullanıcı arayüzü.
- **🔒 Güvenli Veri Akışı:** API anahtarlarınızı korumak için tasarlanmış bağımsız Node.js Proxy sunucusu.

---

### 🛠️ Teknoloji Yığını

- **Frontend:** [React 19](https://react.dev), JavaScript (ES6+), HTML5, Vanilla CSS3.
- **Backend:** [Node.js](https://nodejs.org), [Express.js](https://expressjs.com), Axios, CORS.
- **Dosya İşleme:** [pdfjs-dist](https://mozilla.github.io/pdf.js/) (PDF), [xlsx](https://sheetjs.com) (Excel), [mammoth](https://github.com/mwilliamson/mammoth.js) (Word).
- **AI Entegrasyonu:** [OpenRouter AI API](https://openrouter.ai).
- **UI & Markdown:** [React Markdown](https://github.com/remarkjs/react-markdown), [Highlight.js](https://highlightjs.org).

---

### 🧭 Kullanım Rehberi ve İpuçları

**GoAI - ChatLab**, kullanıcı ve yapay zeka arasındaki etkileşimi en üst düzeye çıkarmak için tasarlanmıştır:

*   **Dinamik Sohbet Deneyimi:** Her türlü görev için (kod yazma, yaratıcı metin, veri analizi) en uygun modeli seçerek sohbeti anında başlatabilirsiniz.
*   **Bağlamsal Belge Analizi:** Dökümanlarınızı veya görsellerinizi sisteme tanıtarak, yapay zekanın bu veriler üzerinde derinlemesine analiz yapmasını sağlayın.
*   **Özelleştirilebilir Yapay Zeka Kimliği:** "System Anweisung" panelini kullanarak asistanınızın uzmanlık alanını ve konuşma tarzını dilediğiniz gibi yapılandırın.
*   **Bağımsız Veri Güvenliği:** Tüm veri trafiği yerel bir proxy üzerinden yönetilir, bu da API anahtarınızın güvenliğini ve dökümanların hızlı işlenmesini sağlar.

**İpuçları:**
- **System Prompt:** Sidebar'daki "System Anweisung" alanından AI'nın nasıl davranması gerektiğini belirleyebilirsiniz (Örn: "Kısa ve öz cevap ver").
- **Dosya Yükleme:** Dosyaları ataç ikonuna tıklayarak veya sürükleyerek yükleyebilirsiniz. Birden fazla dosyayı aynı anda gönderebilirsiniz.
- **Durdurma (Stop):** Uzun cevaplar sırasında "Stop" butonunu kullanarak akışı anında kesebilirsiniz.

---

### 🚀 Kurulum

#### 1. Sunucu Tarafı (Backend)
```bash
cd react-ai/server
npm install
```
`server/.env` dosyanızı oluşturun ve API keyinizi ekleyin:
`OPENROUTER_API_KEY=your_openrouter_key`

Sunucuyu başlatın:
```bash
node server.js
```

#### 2. İstemci Tarafı (Frontend)
Yeni bir terminalde:
```bash
cd react-ai
npm install
npm start
```

---

### 📂 Dosya Yapısı

```bash
react-ai/
├── server/             # Node.js Proxy Sunucusu
│   ├── server.js       # Ana sunucu dosyası
│   └── .env            # API Key konfigürasyonu
├── src/                # React Frontend
│   ├── aiService/      # API servisi ve Dosya İşleme (fileParser.js)
│   ├── Components/     # React Bileşenleri (ChatBox, Settings, InputArea)
│   ├── App.js          # Ana uygulama mantığı
│   └── theme.css       # Merkezi modern tasarım dosyası
└── README.md
```

---

### 📄 Lisans
Bu proje [MIT](LICENSE) lisansı altında korunmaktadır.

**Geliştiren:** [Onur Gökhan Bicer]
**Versiyon:** 1.2.0 (Multimodal Document Update)

---

## 🇩🇪 VERSION DEUTSCH

Eine moderne, schnelle und multifunktionale KI-Erfahrung. **GoAI** integriert die leistungsstärksten KI-Modelle über die OpenRouter-API in einer einzigen professionellen Benutzeroberfläche und bietet fortschrittliche Dokumentenanalyse-Funktionen, mit denen Ihre Dokumente "gelesen" und Ihre Bilder interpretiert werden können.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![OpenRouter](https://img.shields.io/badge/API-OpenRouter-7E33E1?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

### ✨ Herausragende Merkmale

- **📁 Intelligente Dokumentenanalyse:** Extrahiert automatisch Inhalte aus PDF-, Word- (.docx), Excel- (.xlsx, .xls) und CSV-Dateien für die KI-Analyse.
- **🖼️ Vision-Unterstützung:** Analysiert Bilddateien (.png, .jpg, .webp) direkt mit vision-unterstützten KI-Modellen.
- **🤖 Multi-Modell-Auswahl:** Dynamischer Wechsel zwischen Top-Modellen (StepFun, Qwen, Llama usw.) über die Sidebar.
- **⚙️ Dynamische Systemanweisungen:** Passen Sie die Persönlichkeit und das Verhalten der KI sofort über "System Anweisung" an.
- **📜 Lokaler Verlauf (History):** Der gesamte Chat-Verlauf wird im Browser-Speicher gesichert; Sitzungen können umbenannt oder verwaltet werden.
- **🎨 Glassmorphism Design:** Ein modernes, transparentes Premium-UI, das vollständig mit Vanilla CSS entworfen wurde.
- **🔒 Sicherer Datenfluss:** Unabhängiger Node.js-Proxy-Server zum Schutz Ihrer API-Schlüssel.

---

### 🛠️ Technologie-Stack

- **Frontend:** [React 19](https://react.dev), JavaScript (ES6+), HTML5, Vanilla CSS3.
- **Backend:** [Node.js](https://nodejs.org), [Express.js](https://expressjs.com), Axios, CORS.
- **Dateiverarbeitung:** [pdfjs-dist](https://mozilla.github.io/pdf.js/) (PDF), [xlsx](https://sheetjs.com) (Excel), [mammoth](https://github.com/mwilliamson/mammoth.js) (Word).
- **API-Integration:** [OpenRouter AI API](https://openrouter.ai).
- **UI & Markdown:** [React Markdown](https://github.com/remarkjs/react-markdown), [Highlight.js](https://highlightjs.org).

---

### 🧭 Benutzerhandbuch und Tipps

**GoAI - ChatLab** wurde entwickelt, um die Interaktion zwischen Benutzer und KI zu optimieren:

*   **Dynamisches Chat-Erlebnis:** Starten Sie Chats sofort, indem Sie das am besten geeignete Modell für jede Aufgabe auswählen (Code-Erstellung, kreatives Schreiben, Datenanalyse).
*   **Kontextbezogene Dokumentenanalyse:** Stellen Sie der KI Ihre Dokumente oder Bilder vor, damit sie diese Daten detailliert analysieren kann.
*   **Anpassbare KI-Identität:** Verwenden Sie das Panel "System Anweisung", um das Fachgebiet und den Gesprächsstil Ihres Assistenten zu konfigurieren.
*   **Unabhängige Datensicherheit:** Der gesamte Datenverkehr wird über einen lokalen Proxy verwaltet, was die Sicherheit Ihres API-Schlüssels und die schnelle Verarbeitung von Dokumenten gewährleistet.

**Tipps:**
- **System Prompt:** Legen Sie in der Sidebar fest, wie sich die KI verhalten soll (z.B. "Antworte kurz und bündig").
- **Dateiupload:** Sie können Dateien hochladen, indem Sie auf das Büroklammer-Symbol klicken oder sie per Drag & Drop verschieben. Mehrere Dateien können gleichzeitig gesendet werden.
- **Stoppen (Stop):** Bei langen Antworten können Sie den Fluss sofort unterbrechen, indem Sie den "Stop"-Button verwenden.

---

### 🚀 Installation

#### 1. Serverseite (Backend)
```bash
cd react-ai/server
npm install
```
Erstellen Sie Ihre `server/.env` Datei und fügen Sie Ihren API-Key hinzu:
`OPENROUTER_API_KEY=dein_openrouter_key`

Starten Sie den Server:
```bash
node server.js
```

#### 2. Clientseite (Frontend)
In einem neuen Terminal:
```bash
cd react-ai
npm install
npm start
```

---

### 📂 Dateistruktur

```bash
react-ai/
├── server/             # Node.js Proxy-Server
│   ├── server.js       # Hauptserverdatei
│   └── .env            # API-Key Konfiguration
├── src/                # React Frontend
│   ├── aiService/      # API-Service und Dateiverarbeitung (fileParser.js)
│   ├── Components/     # React-Komponenten (ChatBox, Settings, InputArea)
│   ├── App.js          # Hauptanwendungslogik
│   └── theme.css       # Zentrales modernes Design
└── README.md
```

---

### 📄 Lizenz
Dieses Projekt ist unter der [MIT](LICENSE)-Lizenz geschützt.

**Entwickelt von:** [Onur Gökhan Bicer]
**Version:** 1.2.0 (Multimodal Document Update)

---

## 🇺🇸 VERSION ENGLISH

A modern, fast, and multifunctional AI experience. **GoAI** integrates the most powerful AI models via the OpenRouter API into a single professional interface, providing advanced document analysis capabilities to "read" your documents and interpret your images.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![OpenRouter](https://img.shields.io/badge/API-OpenRouter-7E33E1?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

### ✨ Key Features

- **📁 Smart Document Analysis:** Automatically extracts content from PDF, Word (.docx), Excel (.xlsx, .xls), and CSV files for AI analysis.
- **🖼️ Vision Capabilities:** Directly analyzes image files (.png, .jpg, .webp) using vision-supported AI models.
- **🤖 Multi-Model Selection:** Dynamically switch between top models (StepFun, Qwen, Llama, etc.) via the sidebar.
- **⚙️ Dynamic System Instructions:** Instantly tailor the AI's personality and behavior via the "System Anweisung" panel.
- **📜 Local History:** All chat history is saved in the browser's storage; sessions can be renamed or managed.
- **🎨 Glassmorphism Design:** A modern, transparent premium UI designed entirely with Vanilla CSS.
- **🔒 Secure Data Workflow:** Independent Node.js Proxy server designed to protect your API keys.

---

### 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev), JavaScript (ES6+), HTML5, Vanilla CSS3.
- **Backend:** [Node.js](https://nodejs.org), [Express.js](https://expressjs.com), Axios, CORS.
- **File Processing:** [pdfjs-dist](https://mozilla.github.io/pdf.js/) (PDF), [xlsx](https://sheetjs.com) (Excel), [mammoth](https://github.com/mwilliamson/mammoth.js) (Word).
- **API Integration:** [OpenRouter AI API](https://openrouter.ai).
- **UI & Markdown:** [React Markdown](https://github.com/remarkjs/react-markdown), [Highlight.js](https://highlightjs.org).

---

### 🧭 Usage Guide and Tips

**GoAI - ChatLab** is designed to maximize the interaction between user and AI:

*   **Dynamic Chat Experience:** Start chats instantly by selecting the most suitable model for any task (coding, creative writing, data analysis).
*   **Contextual Document Analysis:** Introduce your documents or images to the AI to allow for in-depth data analysis.
*   **Customizable AI Identity:** Use the "System Anweisung" panel to configure your assistant's expertise and speaking style.
*   **Independent Data Security:** All data traffic is managed through a local proxy, ensuring API key security and fast document processing.

**Tips:**
- **System Prompt:** Set how the AI should behave in the sidebar (e.g., "Give short and concise answers").
- **File Upload:** You can upload files by clicking the paperclip icon or by dragging and dropping. Multiple files can be sent at once.
- **Stopping (Stop):** During long responses, you can interrupt the flow immediately by using the "Stop" button.

---

### 🚀 Installation

#### 1. Server Side (Backend)
```bash
cd react-ai/server
npm install
```
Create your `server/.env` file and add your API key:
`OPENROUTER_API_KEY=your_openrouter_key`

Start the server:
```bash
node server.js
```

#### 2. Client Side (Frontend)
In a new terminal:
```bash
cd react-ai
npm install
npm start
```

---

### 📂 File Structure

```bash
react-ai/
├── server/             # Node.js Proxy Server
│   ├── server.js       # Main server file
│   └── .env            # API Key configuration
├── src/                # React Frontend
│   ├── aiService/      # API service and file processing (fileParser.js)
│   ├── Components/     # React components (ChatBox, Settings, InputArea)
│   ├── App.js          # Main application logic
│   └── theme.css       # Central modern design file
└── README.md
```

---

### 📄 License
This project is protected under the [MIT](LICENSE) license.

**Developed by:** [Onur Gökhan Bicer]
**Version:** 1.2.0 (Multimodal Document Update)
