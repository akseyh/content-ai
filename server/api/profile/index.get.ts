import { getToken } from "#auth";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });

  if (!token?.sub) {
    throw createError({
      statusCode: 401,
      statusMessage: "Not authorized",
    });
  }

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: token.sub },
    });

    return profile;
  } catch (error) {
    console.error("Profil getirme hatası:", error);
    return null; // Hata durumunda null döndür
  }
});
