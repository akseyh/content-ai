export async function fetchContents() {
  const contents = await $fetch<
    { subject: string; text: string; image: string; createdAt: Date }[]
  >("/api/content");

  if (!contents) return [];

  return contents;
}
