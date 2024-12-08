export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const response = await $fetch<{
      candidates: [{ content: { parts: [{ text: string }] } }];
    }>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        body: {
          contents: [
            {
              parts: [
                {
                  text: "Sosyal medya yöneticisi gibi davran. Sana verdiğim konu ile alakalı sosyal medya içeriği oluştur. Her platformda aynı içerik üretilecek. Cevap olarak içeriğin text alanını ver. Metine herhangi bir komut, soru ekleme.",
                },
                { text: `Konu: ${body.input}` },
              ],
            },
          ],
        },
      }
    );

    if (!response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Content could not generated");
    }

    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Content oluşturulurken bir hata oluştu",
    });
  }
});
