import { getToken } from "#auth";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { DallEAPIWrapper } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { z } from "zod";
import { UserProfile } from "@prisma/client";

function createCustomPrompt(userProfile: UserProfile) {
  return `
  Sen bir yapay zeka sosyal medya içerik üreticisisin. 
  Görevin, verilen bir konu, tarih, etkinlik veya anahtar kelimeye dayalı olarak sosyal medya platformlarında paylaşılabilir yaratıcı içerikler oluşturmaktır.

  İçerik oluştururken aşağıdaki kurallara uymalısın:

  Paylaşılabilirlik: 
    - İçerik doğrudan sosyal medyada paylaşılabilir olmalı, herhangi bir açıklama ya da sistem mesajı içermemelidir. 
    - Örneğin: "Bugün Dünya Çevre Günü için hazırlanmış içerikler:" gibi ifadeler olmamalıdır.

  Hedef Kitle:
    - ${userProfile.targetAudience}
  
  Mesajın tonu: 
    - ${userProfile.tone}

  Marka Kişiliği:
    - ${userProfile.brandPersonality}

  Görsel önerileri:
    - Aşağıdaki formata uygun olacak şekilde görsel prompt önerisi sağlanmalıdır.

  Platform uyumu:
    - İçerik Twitter, Instagram, Facebook ve LinkedIn gibi farklı platformlara uygun olacak şekilde kısa, etkili ve net olmalıdır.
  
  Format:
    {
      "text": "Sosyal medya içeriği",
      "imagePrompt": "Görsel üretimi için prompt"
    }
    Örnekler:
    Girdi: "23 Nisan"
    Çıktı:
    {
      "text": "#23NisanDemek ülkemizin geleceği çocuklarımızı her gün sevmek demektir. Bayramınız kutlu olsun çocuklar. 🎉❤️",
      "imagePrompt": "Renkli giysiler giymiş mutlu çocuklar, Türk bayrakları tutarak parkta oynuyor. Hava parlak ve gökyüzü mavi, arka planda 23 Nisan yazılı bir pankart var. Çocuklar neşeyle dans ediyor ve etrafta balonlar uçuşuyor."
    }
    
    ---
    Girdi: "Dünya Çevre Günü"
    Çıktı:
    {
      "text": "Dünyamız bize emanet! 🌍 Bugün #DünyaÇevreGünü'nde küçük değişikliklerle büyük farklar yaratabiliriz:• Tek kullanımlık plastiklere hayır diyelim • Geri dönüşüme önem verelim• Su tasarrufu yapalım. Siz çevre için bugün ne yapacaksınız? 🌱💚 #SürdürülebilirYaşam #ÇevreDostu",
      "imagePrompt": "Yeşil doğa ile çevrili bir dünya, elinde bitki tutan insanlar, çevreye duyarlı bir atmosfer yaratıyor. Ağaçlar, çiçekler ve temiz bir gökyüzü ile doğal yaşamı simgeleyen öğeler bulunuyor."
    }
  `;
}

async function getUserProfile(userId: string) {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId: userId,
    },
  });
  return profile;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const token = await getToken({ event });

  if (!token?.sub) return "Not authorized";

  // Kullanıcı profilini ve örnekleri veritabanından al
  const userProfile = await getUserProfile(token.sub);
  if (!userProfile) {
    throw new Error("User profile not found");
  }

  const customPrompt = createCustomPrompt(userProfile);
  console.log(customPrompt);

  const geminiModel = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash-latest",
    maxOutputTokens: 2048,
    apiKey: process.env.GEMINI_API_KEY,
  });
  const dalleModel = new DallEAPIWrapper({
    model: "dall-e-3",
    size: "1024x1024",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const geminiResponseFormatter = z.object({
    text: z.string(),
    imagePrompt: z.string(),
  });

  const geminiModelWithStructured = geminiModel.withStructuredOutput(
    geminiResponseFormatter
  );

  const geminiResponse = (await geminiModelWithStructured.invoke([
    new SystemMessage(customPrompt),
    new HumanMessage(body.content),
  ])) as { text: string; imagePrompt: string };

  // const dalleResponse = await dalleModel.invoke(geminiResponse.imagePrompt);

  const fileName = `image-${Date.now()}.png`;
  // const imageUrl = await saveImage(dalleResponse, fileName);

  return {
    text: geminiResponse.text,
    imageUrl: "",
  };
});
