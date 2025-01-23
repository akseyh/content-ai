import { getToken } from "#auth";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });

  if (!token) {
    throw createError({
      statusCode: 401 as number,
      message: "Yetkilendirme hatası",
    });
  }

  const contentCalendarId = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!contentCalendarId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Content calendar ID is required",
    });
  }

  try {
    const updatedContentCalendar = await prisma.contentCalendar.update({
      where: {
        id: Number(contentCalendarId),
      },
      data: {
        date: new Date(body.date),
        dateTo: new Date(body.dateTo),
        name: body.name,
        description: body.description,
        category: body.category,
        isActive: body.isActive,
      },
    });
    return updatedContentCalendar;
  } catch (error) {
    console.error("Error updating content calendar:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update content calendar",
    });
  }
});
