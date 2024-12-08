export async function generateContent(prompt: string) {
  const { sub } = await $fetch("/api/token");

  if (!sub) throw new Error("Not authenticated");

  const response = await $fetch("/api/generate-content", {
    method: "POST",
    body: {
      input: prompt,
    },
  });

  const content = await $fetch("/api/content", {
    method: "POST",
    body: {
      subject: prompt,
      text: response,
      owner: sub,
    },
  });

  return content;
}
