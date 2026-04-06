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

# Hugging Face için kullanıcı (UID 1000) yapılandırması
RUN adduser -D -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# Arka yüz bağımlılıklarını kur
COPY --chown=user:user server/package*.json ./server/
RUN cd server && npm install --omit=dev

# Önyüz build dosyalarını ve arka yüz kodunu kopyala
COPY --chown=user:user --from=build-stage /app/build ./build
COPY --chown=user:user server/ ./server/

# Portu ayarla (Hugging Face gereksinimi: 7860)
EXPOSE 7860
ENV PORT=7860

# Uygulamayı başlat
CMD ["node", "server/server.js"]
