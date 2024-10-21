# Utilizando a imagem base do Node.js
FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY package.json ./

RUN npm install -g pnpm \
    && pnpm install
COPY . .

EXPOSE 3000


CMD ["pnpm", "dev"]

