#!/bin/bash
source ~/.bashrc 

echo "Iniciando processo de implantação..."

echo "Instalando dependências..."
npm i

echo "Compilando a aplicação..."
npm run build

echo "Preparando arquivos para produção..."
mkdir -p .next/standalone
mkdir -p .next/standalone/.next/static

cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
cp .env.local .next/standalone/
cp package.json .next/standalone/

echo "Iniciando aplicação com PM2..."
pm2 delete dialogos-client 2>/dev/null || true
pm2 start ecosystem.config.cjs --only dialogos-client

echo "Salvando configuração do PM2..."
pm2 save

echo "Implantação concluída com sucesso!"
