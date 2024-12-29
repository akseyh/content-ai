export async function generateContent(prompt: string, generateImage = true) {
  const { sub } = await $fetch("/api/token");

  if (!sub) throw new Error("Not authenticated");

  const contentGenerateResponse = await $fetch<{
    text: string;
    imageUrl: string;
  }>("/api/content/generate", {
    method: "POST",
    body: {
      content: prompt,
    },
  });

  const content = await $fetch("/api/content", {
    method: "POST",
    body: {
      subject: prompt,
      text: contentGenerateResponse.text,
      image: contentGenerateResponse.imageUrl,
      owner: sub,
    },
  });

  return content;
}
