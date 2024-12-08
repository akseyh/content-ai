import { getServerSession } from "#auth";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) return "Not authorized";

  const contents = await prisma.content.findMany();

  return contents;
});
