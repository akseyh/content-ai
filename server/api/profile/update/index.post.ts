import { getToken } from "#auth";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = await getToken({ event });

  if (!token?.sub) return "Not authorized";

  try {
    await prisma.userProfile.upsert({
      where: { userId: token.sub },
      update: {
        industry: body.industry,
        targetAudience: body.targetAudience,
        tone: body.tone,
        brandPersonality: body.brandPersonality,
      },
      create: {
        userId: token.sub,
        industry: body.industry,
        targetAudience: body.targetAudience,
        tone: body.tone,
        brandPersonality: body.brandPersonality,
      },
    });
    return { success: true, message: "Profil başarıyla güncellendi" };
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    return { success: false, message: "Profil güncellenirken bir hata oluştu" };
  }
});
