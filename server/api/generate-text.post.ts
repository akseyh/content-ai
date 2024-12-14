import { getToken } from "#auth";

const PROMPT = `
  Sen bir yapay zeka sosyal medya içerik üreticisisin. 
  Görevin, verilen bir konu, tarih, etkinlik veya anahtar kelimeye dayalı olarak sosyal medya platformlarında paylaşılabilir yaratıcı içerikler oluşturmaktır.
  İçerik oluştururken aşağıdaki kurallara uymalısın:
  Paylaşılabilirlik: İçerik doğrudan sosyal medyada paylaşılabilir olmalı, herhangi bir açıklama ya da sistem mesajı içermemelidir. Örneğin: "Bugün Dünya Çevre Günü için hazırlanmış içerikler:" gibi ifadeler olmamalıdır.
  Mesajın tonu: Samimi, ilham verici, motive edici ve konuya uygun olmalıdır.
  Bölümlendirme: Sadece tek bir içerik üretilmeli. İçeriğin başı ve sonu ilgili olmalıdır.
  Hashtag kullanımı: Konuyla ilişkili etkili ve trend olabilecek hashtagler eklenmelidir.
  Görsel önerileri: Aşağıdaki formata uygun olacak şekilde görsel prompt önerisi sağlanmalıdır.
  Platform uyumu: İçerik Twitter, Instagram, Facebook ve LinkedIn gibi farklı platformlara uygun olacak şekilde kısa, etkili ve net olmalıdır.
  Format:
  {
    "text": "Sosyal medya içeriği",
    "imagePrompt": "Görsel üretimi için prompt"
  }
  Örnekler:
  Girdi: "23 Nisan"
  Çıktı:
  {
    "text": "#23NisanDemek ülkemizin geleceği çocuklarımızı her gün sevmek demektir. Bayramınız kutlu olsun çocuklar. 🎉❤️",
    "imagePrompt": "Renkli giysiler giymiş mutlu çocuklar, Türk bayrakları tutarak parkta oynuyor. Hava parlak ve gökyüzü mavi, arka planda 23 Nisan yazılı bir pankart var. Çocuklar neşeyle dans ediyor ve etrafta balonlar uçuşuyor."
  }
  
  ---
  Girdi: "Dünya Çevre Günü"
  Çıktı:
  {
    "text": "Dünyamız bize emanet! 🌍 Bugün #DünyaÇevreGünü'nde küçük değişikliklerle büyük farklar yaratabiliriz:• Tek kullanımlık plastiklere hayır diyelim • Geri dönüşüme önem verelim• Su tasarrufu yapalım. Siz çevre için bugün ne yapacaksınız? 🌱💚 #SürdürülebilirYaşam #ÇevreDostu",
    "imagePrompt": "Yeşil doğa ile çevrili bir dünya, elinde bitki tutan insanlar, çevreye duyarlı bir atmosfer yaratıyor. Ağaçlar, çiçekler ve temiz bir gökyüzü ile doğal yaşamı simgeleyen öğeler bulunuyor."
  }
`;

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });
  if (!token?.sub) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

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
                  text: PROMPT,
                },
                { text: `Konu: ${body.input}` },
              ],
            },
          ],
        },
      }
    );

    if (!response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error();
    }

    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Content could not generated",
    });
  }
});
