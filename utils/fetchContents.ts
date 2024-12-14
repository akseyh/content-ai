import type { Content } from "@prisma/client";

export async function fetchContents() {
  const contents = await $fetch<Content[]>("/api/content");

  if (!contents) return [];

  return contents;
}
