import { getToken } from "#auth";
import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });
  if (!token?.sub) {
    throw createError({
      statusCode: 401,
      message: "Yetkilendirme gerekli",
    });
  }

  const body = await readBody(event);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: body.input,
      n: 1,
      size: "256x256",
    });

    const imageUrl = response.data[0].url;

    return imageUrl;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Image oluşturulurken bir hata oluştu",
    });
  }
});
