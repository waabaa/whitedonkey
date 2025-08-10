#!/bin/bash

# 🚀 설치 중단 지점부터 계속 진행 스크립트
# 데이터베이스 설정이 완료된 상태에서 서비스 활성화부터 시작
# 실행: chmod +x server-scripts/continue-setup.sh && sudo ./server-scripts/continue-setup.sh

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
echo "🚀 흰당나귀 설치 계속 진행 스크립트"
echo -e "${NC}"

log "📋 중단된 지점부터 설치를 계속 진행합니다..."

# 현재 디렉토리 확인
if [ ! -d "/var/www/whitedonkey" ]; then
    error "서버 디렉토리를 찾을 수 없습니다: /var/www/whitedonkey"
    exit 1
fi

cd /var/www/whitedonkey

# 환경변수 및 데이터베이스 확인
log "환경 확인 중..."

if [ ! -f ".env" ]; then
    error ".env 파일이 없습니다. 데이터베이스 설정부터 다시 실행하세요."
    echo "실행: sudo ./server-scripts/02-database-setup.sh"
    exit 1
fi

if [ ! -f "database-info.txt" ]; then
    error "데이터베이스 정보 파일이 없습니다. 데이터베이스 설정부터 다시 실행하세요."
    echo "실행: sudo ./server-scripts/02-database-setup.sh"
    exit 1
fi

success "환경 파일 확인 완료"

# 서비스 활성화 실행
echo -e "${YELLOW}🚀 서비스 활성화 단계 실행 중...${NC}"
if ./server-scripts/03-service-activation.sh; then
    success "서비스 활성화 완료"
else
    error "서비스 활성화 실패"
    
    # 실패 시 도움말
    echo ""
    echo -e "${YELLOW}📝 문제 해결 가이드:${NC}"
    echo "1. Next.js 빌드 오류: npm run build --verbose 로 상세 오류 확인"
    echo "2. PM2 오류: pm2 kill 후 다시 시도"
    echo "3. Nginx 오류: sudo nginx -t 로 설정 확인"
    echo "4. 포트 충돌: sudo netstat -tlnp | grep :3000 으로 확인"
    echo ""
    echo "로그 확인: tail -f /var/log/whitedonkey-service.log"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 흰당나귀 설치가 완료되었습니다!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${PURPLE}🌐 웹사이트: http://whitedonkey.ktenterprise.net${NC}"
echo -e "${PURPLE}📊 서버 상태: pm2 list${NC}"
echo -e "${PURPLE}📝 로그 확인: pm2 logs whitedonkey${NC}"
echo -e "${PURPLE}🏥 헬스체크: ./server-scripts/health-check.sh${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# 최종 상태 확인
log "🔍 최종 서비스 상태 확인..."
sleep 3

if curl -f -s http://localhost:3000 > /dev/null; then
    success "✅ 웹서비스 정상 응답"
else
    warning "⚠️ 웹서비스 응답 확인 필요"
    echo "수동 확인: curl http://localhost:3000"
fi

if pm2 list | grep -q "online"; then
    success "✅ PM2 프로세스 정상 실행"
else
    warning "⚠️ PM2 상태 확인: pm2 list"
fi

echo ""
echo -e "${PURPLE}🐴 흰당나귀와 함께 성공적인 AI 마케팅을 시작하세요! 🚀${NC}"