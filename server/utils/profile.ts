import prisma from "~/server/utils/prisma";

export async function getUserProfile(userId: string) {
  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return null;
    }

    // API yanıtı için profili formatlayalım
    return profile;
  } catch (error) {
    console.error("Profil getirme hatası:", error);
    return null;
  }
}
