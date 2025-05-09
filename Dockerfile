FROM node:18

WORKDIR /app

# Paket dosyalarını ayrı kopyala (önce)
COPY package.json ./
COPY package-lock.json ./

# Bağımlılıkları yükle
RUN npm install --omit=dev --legacy-peer-deps

# Geri kalan her şeyi kopyala
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
