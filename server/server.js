import express from "express"; // Express bize kolay şekilde server ve API endpoint oluşturma imkanı verir
import cors from "cors";// React uygulamasının backend ile konuşabilmesi için CORS'u aktif ediyoruz-CORS olmazsa tarayıcı güvenlik nedeniyle isteği engeller
import dotenv from "dotenv";// .env dosyasındaki gizli bilgileri (API key gibi) okumak için kullanılır


dotenv.config(); // .env dosyasını yükler


const app = express(); // Express uygulamasını başlatıyoruz


app.use(cors()); // CORS middleware: frontend → backend iletişimine izin verir


app.use(express.json()); // (React mesaj gönderdiğinde JSON formatında gelecek)


const API_KEY = process.env.OPENROUTER_API_KEY; // .env dosyasındaki API key'i alıyoruz


// React'in çağıracağı endpoint
// React burada POST isteği ile mesaj gönderecek
app.post("/chat", async (req, res) => {

try {

  // OpenRouter AI API'ye request gönderiyoruz
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {

    method: "POST",

    headers: {
      // API key burada kullanılıyor (frontend bunu görmez)
      "Authorization": `Bearer ${API_KEY}`,

      // gönderdiğimiz veri JSON formatında
      "Content-Type": "application/json"
    },

    // React'ten gelen mesajı aynen AI API'ye gönderiyoruz
    body: JSON.stringify(req.body)

  });

  // AI'dan gelen cevabı JSON formatına çeviriyoruz
  const data = await response.json();

  // AI cevabını tekrar React frontend'e gönderiyoruz
  res.json(data);

} catch (error) {

  // Eğer hata olursa terminalde log göster
  console.error(error);

  // Frontend'e hata mesajı gönder
  res.status(500).json({ error: "Server error" });

}

});


// Server'ı 3001 portunda çalıştırıyoruz
// React genelde 3000 portunda çalışır, backend ayrı portta olur
app.listen(3001, () => {

console.log("AI proxy server running on port 3001");

});