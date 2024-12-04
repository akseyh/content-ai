import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await prisma.content.create({ data: body });
});
