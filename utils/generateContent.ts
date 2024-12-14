export async function generateContent(prompt: string, generateImage = true) {
  const { sub } = await $fetch("/api/token");

  if (!sub) throw new Error("Not authenticated");

  const generateTextResponse = await $fetch("/api/generate-text", {
    method: "POST",
    body: {
      input: prompt,
    },
  });

  const regex = /{.*}/s;
  const matched = generateTextResponse.match(regex);

  const json = matched && JSON.parse(matched[0]);

  const text = json?.text;
  const imagePrompt = json?.imagePrompt || prompt;

  if (!text) {
    throw new Error("Text generation failed");
  }

  const image =
    generateImage &&
    (await $fetch("/api/generate-image", {
      method: "POST",
      body: {
        input: imagePrompt,
      },
    }).catch(() => null));

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
