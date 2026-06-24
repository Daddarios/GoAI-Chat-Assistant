# 1. AŞAMA: Önyüz Derleme (Frontend Build)
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN CI=false npm run build

# 2. AŞAMA: Çalıştırma (Runtime Stage)
FROM node:20-alpine
WORKDIR /app

# Hugging Face için varsayılan 'node' kullanıcısını (UID 1000) kullanıyoruz
USER node
ENV PATH="/home/node/.local/bin:$PATH"

# Arka yüz bağımlılıklarını kur
COPY --chown=node:node server/package*.json ./server/
RUN cd server && npm install --omit=dev

# Önyüz build dosyalarını ve arka yüz kodunu kopyala
COPY --chown=node:node --from=build-stage /app/build ./build
COPY --chown=node:node server/ ./server/

# Portu ayarla (Hugging Face gereksinimi: 7860)
EXPOSE 7860
ENV PORT=7860

# Uygulamayı başlat
CMD ["node", "server/server.js"]
