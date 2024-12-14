export async function generateContent(prompt: string) {
  const { sub } = await $fetch("/api/token");

  if (!sub) throw new Error("Not authenticated");

  const text = await $fetch("/api/generate-text", {
    method: "POST",
    body: {
      input: prompt,
    },
  });

  const image = await $fetch("/api/generate-image", {
    method: "POST",
    body: {
      input: prompt,
    },
  });

  const content = await $fetch("/api/content", {
    method: "POST",
    body: {
      subject: prompt,
      text,
      image,
      owner: sub,
    },
  });

  return content;
}
