#!/bin/bash

# 흰당나귀 AI 마케팅 플랫폼 업데이트 스크립트
# 서버에서 Git pull 후 재시작하는 스크립트

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

APP_DIR="/var/www/whitedonkey"

echo -e "${BLUE}🔄 흰당나귀 AI 마케팅 플랫폼 업데이트 시작...${NC}"

cd $APP_DIR

echo -e "${BLUE}1. Git pull 실행...${NC}"
git pull origin main

echo -e "${BLUE}2. 의존성 업데이트 확인...${NC}"
npm ci --production

echo -e "${BLUE}3. Prisma 스키마 업데이트...${NC}"
npx prisma generate
npx prisma db push

echo -e "${BLUE}4. 애플리케이션 빌드...${NC}"
npm run build

echo -e "${BLUE}5. PM2 재시작...${NC}"
pm2 restart whitedonkey

echo -e "${GREEN}✅ 업데이트 완료!${NC}"

# 상태 확인
echo -e "${BLUE}현재 상태:${NC}"
pm2 status whitedonkey

echo -e "${GREEN}웹사이트 주소: https://whitedonkey.ktenterprise.net${NC}"