import { GoogleGenAI, Type } from "@google/genai";
import { TelegramGroup } from "../types";

// ==============================================================================
//  API ANAHTARI AYARLARI (Lütfen Burayı Okuyun)
// ==============================================================================
// Hosting'e yüklerken "Environment Variables" ile uğraşmak istemiyorsanız,
// API anahtarınızı aşağıdaki tırnak işaretlerinin içine yapıştırabilirsiniz.
// ÖRNEK: const MANUAL_KEY = "AIzaSyDOrnekAnahtariniz...";
// ==============================================================================
const MANUAL_KEY = "AIzaSyABpi615t0S3o0GnSJ9QfVUN6hZ7LMLrqI"; 

// Tarayıcı ortamında process.env hatasını önlemek ve güvenli erişim sağlamak için
const getApiKey = () => {
  // 1. Öncelik: Manuel girilen anahtar (Eğer yukarıya yazdıysanız bu kullanılır)
  if (MANUAL_KEY) {
    return MANUAL_KEY;
  }

  try {
    // 2. Öncelik: Build ortamı (Vercel/Netlify) veya Node.js process.env
    if (typeof process !== "undefined" && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Hata yutulur, aşağıda boş string döner
  }
  return "";
};

const apiKey = getApiKey();
// Eğer anahtar yoksa AI servisini başlatırken hata vermemesi için boş kontrolü yapıyoruz
const ai = new GoogleGenAI({ apiKey: apiKey || "dummy_key" });

export const searchTelegramGroups = async (keywords: string): Promise<TelegramGroup[]> => {
  // API Key kontrolü
  if (!apiKey || apiKey === "undefined" || apiKey === "dummy_key") {
    throw new Error("API Anahtarı eksik! Lütfen 'geminiService.ts' dosyasını açıp 'MANUAL_KEY' kısmına anahtarınızı yazın veya kurulum rehberini (i) okuyun.");
  }

  try {
    const modelId = "gemini-2.5-flash"; 
    
    const prompt = `
      Sen uzman bir Telegram topluluk küratörüsün. Görevin, kullanıcının verdiği anahtar kelimelere ("${keywords}") en uygun, aktif ve kaliteli Telegram gruplarını veya kanallarını listelemek.

      Lütfen aşağıdaki kriterlere dikkat et:
      1. **Çeşitlilik:** Mümkünse hem sohbet gruplarını hem de duyuru kanallarını (haber, kampanya vb.) karıştır.
      2. **Dil:** Arama terimi Türkçe ise öncelikle Türkçe (TR) grupları, ardından çok popüler Global (EN) grupları öner.
      3. **Doğruluk:** "link" alanı için grubun GERÇEK kullanıcı adını (t.me/kullaniciadi) yazmaya çalış. Eğer kesin eminsin değilsen, en mantıklı tahmini yaz ancak açıklama kısmında bunu belirtme, kullanıcı deneyimi için doğrudan link gibi görünsün.
      4. **Detay:** Üye sayılarını gerçekçi tahmin et (örn: 5.2K, 120K).
      5. **Format:** En az 5, en fazla 9 sonuç döndür.

      Sonucu sadece aşağıdaki JSON şemasına uygun olarak ver.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Grup adı" },
              description: { type: Type.STRING, description: "Kısa, ilgi çekici açıklama" },
              category: { type: Type.STRING, description: "Kategori (örn: Yazılım, Haber)" },
              membersCount: { type: Type.STRING, description: "Üye sayısı (örn: 10K)" },
              language: { type: Type.STRING, description: "Dil (TR, EN)" },
              link: { type: Type.STRING, description: "t.me linki (https:// olmadan)" },
              isOfficial: { type: Type.BOOLEAN, description: "Resmi/Onaylı mı?" }
            },
            required: ["name", "description", "category", "membersCount", "language", "link"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as TelegramGroup[];
      return data;
    }
    
    return [];
  } catch (error: any) {
    console.error("Gemini Search Error:", error);
    if (error.message.includes("API key")) {
      throw new Error("API Anahtarı geçersiz. Lütfen geminiService.ts dosyasındaki MANUAL_KEY alanını kontrol edin.");
    }
    throw new Error("Gruplar aranırken bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.");
  }
};
