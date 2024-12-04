import prisma from "../../data/prismaClient";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await prisma.content.create({ data: body });
});
