import { getToken } from "#auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });

  if (!token) return "Not authorized";

  const contents = await prisma.content.findMany({
    where: {
      author: token.sub,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return contents || [];
});
