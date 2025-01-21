FROM node:18-alpine AS builder

WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Kaynak kodları kopyala
COPY . .

# Uygulamayı derle
RUN npm run build

# Üretim aşaması
FROM nginx:alpine

# Nginx yapılandırmasını kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Builder aşamasından derlenen dosyaları kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# Healthcheck ekle
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
