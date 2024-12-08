# Base image
FROM node:18

# Çalışma dizinini oluştur
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Proje dosyalarını kopyala
COPY . .

# Uygulamayı build et
RUN npm run build

# Port ayarı
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

# Başlangıç komutu
CMD ["node", ".output/server/index.mjs"]