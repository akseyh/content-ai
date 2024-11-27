import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await prisma.content.create({ data: body });
});
