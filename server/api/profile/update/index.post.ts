import { getToken } from "#auth";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });

  if (!token?.sub) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const userId = token.sub;
  const body = await readBody(event);

  try {
    const profile = await prisma.userProfile.upsert({
      where: {
        userId: userId,
      },
      update: {
        industry: body.industry,
        targetAudience: body.targetAudience,
        tone: body.tone,
        brandPersonality: body.brandPersonality,
        url: body.url,
      },
      create: {
        userId: userId,
        industry: body.industry,
        targetAudience: body.targetAudience,
        tone: body.tone,
        brandPersonality: body.brandPersonality,
        url: body.url,
      },
    });
    return profile;
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      message: e.message,
    });
  }
});
