# Base image
FROM node:18

# Çalışma dizinini oluştur
WORKDIR /usr/src/app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

RUN npm run build

# Proje dosyalarını kopyala
COPY . .

RUN npm run prisma:generate
RUN npm run prisma:push

# Port ayarı
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

# Başlangıç komutu
CMD ["npm", "run", "dev"]