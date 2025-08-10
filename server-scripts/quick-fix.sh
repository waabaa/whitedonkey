#!/bin/bash

# 🚀 빠른 문제 해결 및 재시작 스크립트
# Node.js 충돌 문제를 해결하고 바로 설치를 계속합니다
# 
# 실행: chmod +x server-scripts/quick-fix.sh && sudo ./server-scripts/quick-fix.sh

set -e

# 색깔 출력 함수
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
}

# 로고 출력
echo -e "${PURPLE}"
echo "🔧 흰당나귀 빠른 문제 해결 스크립트"
echo -e "${NC}"

log "🚀 Node.js/npm 충돌 문제를 해결하고 설치를 계속합니다..."

# 1단계: Node.js/npm 문제 해결
echo -e "${YELLOW}🔧 1단계: Node.js/npm 충돌 해결 중...${NC}"
if ./server-scripts/fix-nodejs-npm.sh; then
    success "Node.js/npm 문제 해결 완료"
else
    error "Node.js/npm 문제 해결 실패"
    exit 1
fi

echo ""
log "환경 변수를 새로고침합니다..."
source ~/.profile 2>/dev/null || true

# 2단계: 서버 환경 설정
echo -e "${YELLOW}🔧 2단계: 서버 환경 설정 중...${NC}"
if ./server-scripts/01-server-setup.sh; then
    success "서버 환경 설정 완료"
else
    error "서버 환경 설정 실패"
    exit 1
fi

# 3단계: 데이터베이스 설정
echo -e "${YELLOW}🗄️ 3단계: 데이터베이스 설정 중...${NC}"
if ./server-scripts/02-database-setup.sh; then
    success "데이터베이스 설정 완료"
else
    error "데이터베이스 설정 실패"
    exit 1
fi

# 4단계: 서비스 활성화
echo -e "${YELLOW}🚀 4단계: 서비스 활성화 중...${NC}"
if ./server-scripts/03-service-activation.sh; then
    success "서비스 활성화 완료"
else
    error "서비스 활성화 실패"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 모든 설치가 완료되었습니다!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${PURPLE}🌐 웹사이트: http://whitedonkey.ktenterprise.net${NC}"
echo -e "${PURPLE}📊 서버 상태: pm2 list${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"