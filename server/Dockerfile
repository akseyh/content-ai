# 1. Node.js resmi imajını temel alın
FROM node:18

# 2. Gerekli bağımlılıkları yükleyin (build-essential ve SQLite)
RUN apt-get update && apt-get install -y \
    build-essential \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# 3. Çalışma dizinini ayarla
WORKDIR /app

# 4. package.json ve package-lock.json dosyalarını kopyala
COPY package.json package-lock.json ./

# 5. Bağımlılıkları yükle ve native modülleri inşa et
RUN npm ci --build-from-source

# 6. Proje dosyalarını kopyala (node_modules hariç)
COPY . .

# 7. Strapi uygulamasını derle
RUN npm run build

# 8. Ortam değişkenlerini ayarla
ENV NODE_ENV development

# 9. Uygulama için portu aç
EXPOSE 1337

# 10. Uygulamayı başlat
CMD ["npm", "start"]