# Node.js resmi image
FROM node:18

# Çalışma dizini
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Gerekli modülleri yükle
RUN npm install

# Geri kalan tüm dosyaları kopyala
COPY . .

# Uygulamanın dinleyeceği port (varsayılan 3000)
EXPOSE 3000

# Uygulama başlatma komutu
CMD ["node", "app.js"]
