import { getToken } from "#auth";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import prisma from "~/server/utils/prisma";
import { HumanMessage } from "@langchain/core/messages";
import { ContentCalendar } from "@prisma/client";

function createCustomPrompt(contentCalendars: ContentCalendar[]) {
  return `
    Sen bir yapay zeka sosyal medya içerik üreticisisin. 
    Görevin, sosyal medyada paylaşılacak içerik konuları önermek. Bu yakın zamandaki bir özel gün veya gündemle ilgili bir konu olabilir.

    - Profesyonel şekilde hitap et.
    - Kibarca önerini açıklayan bir şekilde cevap ver.
    - Text alanında neden bu konuyla ilgili bir sosyal medya içeriği üretmenin iyi fikir olduğunu açıkla.
    - Cevabın en fazla 1-2 cümle olsun.

    Şuanki tarih: ${new Date()}

    Sana bu yılki özel günleri listeleyeceğim:
    ${JSON.stringify(contentCalendars)}

    Örnek Cevap:
    23 Nisan yakın görünüyor. Bunun hakkında bir içerik üretebilirsin.
  `;
}

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });
  if (!token?.sub) {
    throw createError({
      statusCode: 401,
      message: "Yetkilendirme gerekli",
    });
  }

  try {
    const contentCalendars = await prisma.contentCalendar.findMany();
    const customPrompt = createCustomPrompt(contentCalendars);
    console.log(customPrompt);

    const geminiModel = new ChatGoogleGenerativeAI({
      modelName: "gemini-1.5-flash-latest",
      maxOutputTokens: 2048,
      apiKey: process.env.GEMINI_API_KEY,
    });

    const geminiResponse = await geminiModel.invoke([
      new HumanMessage(customPrompt),
    ]);

    return geminiResponse.content;
  } catch (error) {
    console.error("Content oluşturma hatası:", error);
    throw createError({
      statusCode: 500,
      message: "Content oluşturulurken bir hata oluştu",
    });
  }
});
