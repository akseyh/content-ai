import fs from "fs/promises";
import path from "path";

async function saveImage(imageUrl: string, fileName: string) {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Resim indirilemedi: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Buffer'a dönüştürülüyor
    const filePath = path.join(process.cwd(), "public", "images", fileName);

    // Dosyayı kaydet
    await fs.writeFile(filePath, buffer);
    console.log("Resim başarıyla kaydedildi:", filePath);

    return `/images/${fileName}`;
  } catch (err) {
    console.error("Resim kaydedilirken hata oluştu:", err);
  }
}

export default saveImage;
