import { getToken } from "#auth";
import prisma from "~/server/utils/prisma";
import { createError } from "h3";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });

  if (!token) {
    throw createError({
      statusCode: 401 as number,
      message: "Yetkilendirme hatası",
    });
  }

  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400 as number,
      message: "ID parametresi gerekli",
    });
  }

  const calendar = await prisma.contentCalendar.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!calendar) {
    throw createError({
      statusCode: 404 as number,
      message: "İçerik takvimi bulunamadı",
    });
  }

  return calendar;
});
