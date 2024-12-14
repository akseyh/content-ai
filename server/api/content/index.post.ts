import { getToken } from "#auth";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  // Token'dan kullanıcı bilgisini al
  const token = await getToken({ event });
  if (!token?.sub) {
    throw createError({
      statusCode: 401,
      message: "Yetkilendirme gerekli",
    });
  }

  // Request body'den content bilgilerini al
  const body = await readBody(event);

  try {
    // Yeni content oluştur
    const content = await prisma.content.create({
      data: {
        subject: body.subject,
        text: body.text,
        image: body.image,
        owner: token.sub,
      },
    });

    return content;
  } catch (error) {
    console.error("Content oluşturma hatası:", error);
    throw createError({
      statusCode: 500,
      message: "Content oluşturulurken bir hata oluştu",
    });
  }
});
