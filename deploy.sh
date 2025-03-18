#!/bin/bash

echo "Iniciando processo de implantação..."

cd dialogos-cliente

echo "Instalando dependências..."
npm ci

echo "Compilando a aplicação..."
npm run build

echo "Preparando arquivos para produção..."
mkdir -p .next/standalone
mkdir -p .next/standalone/.next/static

cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
cp .env.local .next/standalone/
cp package.json .next/standalone/

if ! command -v pm2 &> /dev/null; then
    echo "Instalando PM2..."
    npm install -g pm2
fi

echo "Iniciando aplicação com PM2..."
pm2 delete dialogos-client 2>/dev/null || true
pm2 start ecosystem.config.cjs

echo "Salvando configuração do PM2..."
pm2 save

echo "Implantação concluída com sucesso!"
