import { getToken } from "#auth";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const token = await getToken({ event });

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authorized",
      });
    }

    const body = await readBody(event);

    // Tarihleri ISO string formatına dönüştür
    const formattedDate = new Date(body.date).toISOString();
    const formattedDateTo = body.dateTo
      ? new Date(body.dateTo).toISOString()
      : null;

    const newContentCalendar = await prisma.contentCalendar.create({
      data: {
        name: body.name,
        date: formattedDate,
        dateTo: formattedDateTo,
        category: body.category,
        description: body.description,
        isActive: body.isActive,
      },
    });

    return newContentCalendar;
  } catch (error: any) {
    console.error("Error in content calendar creation:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to create content calendar",
    });
  }
});
