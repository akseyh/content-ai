import { getToken } from "#auth";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { DallEAPIWrapper } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { z } from "zod";
import { UserProfile } from "@prisma/client";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

function createCustomPrompt(content: string, userProfile: UserProfile) {
  return `
  Sen bir yapay zeka sosyal medya içerik üreticisisin. 
  Görevin, verilen bir konu, tarih, etkinlik veya anahtar kelimeye dayalı olarak sosyal medya platformlarında paylaşılabilir yaratıcı içerikler oluşturmaktır.
  Üreteceğin içeriğin konusu: ${content}
  

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
  
  Marka uyumu:
    - Üreteceğin içerik aşağıdaki marka tanımına uyumlu olmalıdır. Marka'nın kişiliğine göre içerikler üret.
    - İçerikte veya Hashtaglerde marka'nın adından veya sektöründen mutlaka bahset.

  Marka Tanımı: 
    {context}
  
  Format:
    {{
      "text": "Sosyal medya içeriği",
      "imagePrompt": "Görsel üretimi için prompt"
    }}
    Örnekler:
    Girdi: "23 Nisan"
    Çıktı:
    {{
      "text": "#23NisanDemek ülkemizin geleceği çocuklarımızı her gün sevmek demektir. Bayramınız kutlu olsun çocuklar. 🎉❤️",
      "imagePrompt": "Renkli giysiler giymiş mutlu çocuklar, Türk bayrakları tutarak parkta oynuyor. Hava parlak ve gökyüzü mavi, arka planda 23 Nisan yazılı bir pankart var. Çocuklar neşeyle dans ediyor ve etrafta balonlar uçuşuyor."
    }}
    
    ---
    Girdi: "Dünya Çevre Günü"
    Çıktı:
    {{
      "text": "Dünyamız bize emanet! 🌍 Bugün #DünyaÇevreGünü'nde küçük değişikliklerle büyük farklar yaratabiliriz:• Tek kullanımlık plastiklere hayır diyelim • Geri dönüşüme önem verelim• Su tasarrufu yapalım. Siz çevre için bugün ne yapacaksınız? 🌱💚 #SürdürülebilirYaşam #ÇevreDostu",
      "imagePrompt": "Yeşil doğa ile çevrili bir dünya, elinde bitki tutan insanlar, çevreye duyarlı bir atmosfer yaratıyor. Ağaçlar, çiçekler ve temiz bir gökyüzü ile doğal yaşamı simgeleyen öğeler bulunuyor."
    }}
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

async function generateImage(prompt: string): Promise<string> {
  const dalleModel = new DallEAPIWrapper({
    model: "dall-e-3",
    size: "1024x1024",
    apiKey: process.env.OPENAI_API_KEY,
  });

  return dalleModel.invoke(prompt);
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const token = await getToken({ event });

  if (!token?.sub) {
    throw createError({
      statusCode: 401,
      message: "Yetkilendirme gerekli",
    });
  }

  // Kullanıcı profilini ve örnekleri veritabanından al
  const userProfile = await getUserProfile(token.sub);
  if (!userProfile) {
    throw createError({
      statusCode: 401,
      message: "User profile not found",
    });
  }

  const customPrompt = createCustomPrompt(body.content, userProfile);

  const geminiModel = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash-latest",
    maxOutputTokens: 2048,
    apiKey: process.env.GEMINI_API_KEY,
  });
  

  const geminiResponseFormatter = z.object({
    text: z.string(),
    imagePrompt: z.string(),
  });

  const geminiModelWithStructured = geminiModel.withStructuredOutput(
    geminiResponseFormatter
  );

  const loader = new CheerioWebBaseLoader(
    userProfile.url || "https://semsyilmaz.com"
  );

  const rawDocuments = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 0,
  });

  const documents = await splitter.splitDocuments(rawDocuments);

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );

  const retriever = vectorStore.asRetriever();

  const prompt = ChatPromptTemplate.fromTemplate(customPrompt);

  const chain = await createStuffDocumentsChain({
    llm: geminiModel,
    prompt,
  });

  const context = await retriever._getRelevantDocuments(
    `Şirketin/markanın:
  - Kurumsal iletişim dili ve tonu nasıl?
  - Değerleri ve ilkeleri neler?
  - Hedef kitlesiyle nasıl iletişim kuruyor?
  - Kullandığı anahtar kelimeler ve terminoloji nedir?
  - Marka kişiliği ve kimliği nasıl yansıtılıyor?
  - Sosyal medya ve iletişim stratejisi nasıl?`
  );

  const response = await chain.invoke({
    messages: [new HumanMessage(`Konu: ${body.content}`)],
    context,
  });

  const geminiResponse = (await geminiModelWithStructured.invoke([
    new SystemMessage(customPrompt),
    new HumanMessage(response),
  ])) as { text: string; imagePrompt: string };

  return {
    text: geminiResponse.text,
    imageUrl: "",
  };
});
