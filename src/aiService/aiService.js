/**
 * Backend proxy (/chat) üzerinden 
 * OpenRouter API'sine istek gönderen fonksiyon.
 */
export async function sendenChatMessage({
  model,
  systemPrompt,
  messages,
  userText,
  signal
}) {
  try {
    const response = await fetch("/chat", {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        systemPrompt,
        messages,
        userText,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Sunucu hatası: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Yanıt alınamadı.";
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("İşlem kullanıcı tarafından durduruldu.");
    }
    throw err;
  }
}