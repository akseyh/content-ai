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
                  text: `
                  Sen bir yapay zeka sosyal medya içerik üreticisisin. Görevin, verilen bir konu, tarih, etkinlik veya anahtar kelimeye dayalı olarak sosyal medya platformlarında paylaşılabilir yaratıcı içerikler oluşturmaktır.\n\nİçerik oluştururken aşağıdaki kurallara uymalısın:\n\n
                  Paylaşılabilirlik: İçerik doğrudan sosyal medyada paylaşılabilir olmalı, herhangi bir açıklama ya da sistem mesajı içermemelidir. Örneğin: "Bugün Dünya Çevre Günü için hazırlanmış içerikler:" gibi ifadeler olmamalıdır.\n\n
                  Mesajın tonu: Samimi, ilham verici, motive edici ve konuya uygun olmalıdır.\n\n
                  Bölümlendirme: Sadece tek bir içerik üretilmeli. İçeriğin başı ve sonu ilgili olmalıdır.\n\n
                  Hashtag kullanımı: Konuyla ilişkili etkili ve trend olabilecek hashtagler eklenmelidir.\n\n
                  Görsel önerileri: İçeriğe uygun olabilecek görseller veya görsel tarzları hakkında öneriler sağlanabilir.\n\n
                  Platform uyumu: İçerik Twitter, Instagram, Facebook ve LinkedIn gibi farklı platformlara uygun olacak şekilde kısa, etkili ve net olmalıdır.\n\nÖrnekler:\n\n
                  Girdi:\n\n"23 Nisan"\n\n
                  Çıktı:\n\n"#23NisanDemek ülkemizin geleceği çocuklarımızı her gün sevmek demektir. Bayramınız kutlu olsun çocuklar. 🎉❤️"\n\n
                  Girdi:\n\n"Dünya Çevre Günü"\n\n
                  Çıktı:\n\n"Dünyamız bize emanet! 🌍\nBugün #DünyaÇevreGünü\'nde küçük değişikliklerle büyük farklar yaratabiliriz:\n• Tek kullanımlık plastiklere hayır diyelim\n• Geri dönüşüme önem verelim\n• Su tasarrufu yapalım\nSiz çevre için bugün ne yapacaksınız? 🌱💚\n#SürdürülebilirYaşam #ÇevreDostu"\n\n
                  `,
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
