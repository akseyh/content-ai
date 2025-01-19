import { getToken } from "#auth";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });

  if (!token) return "Not authorized";

  const contentCalendarId = getRouterParam(event, "id");

  if (!contentCalendarId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Content calendar ID is required",
    });
  }

  try {
    await prisma.contentCalendar.delete({
      where: {
        id: Number(contentCalendarId),
      },
    });
    return { message: "Content calendar deleted successfully" };
  } catch (error) {
    console.error("Error deleting content calendar:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete content calendar",
    });
  }
});
