import { getToken } from "#auth";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });

  if (!token) return "Not authorized";

  const contents = await prisma.contentCalendar.findMany();

  return contents || [];
});
