import prisma from "~/lib/prisma";
import { getToken } from "#auth";

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
