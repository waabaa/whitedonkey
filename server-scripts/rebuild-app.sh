#!/bin/bash

# 🔧 Next.js 애플리케이션 리빌드 스크립트
# PM2 errored 상태 해결을 위한 프로덕션 빌드 재생성
# 실행: chmod +x server-scripts/rebuild-app.sh && ./server-scripts/rebuild-app.sh

set -e

SERVER_PATH="/var/www/whitedonkey"

# 색깔 출력 함수
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

log "🔧 Next.js 애플리케이션 리빌드 시작..."

# 현재 디렉토리 확인
if [ ! -d "$SERVER_PATH" ]; then
    error "서버 디렉토리를 찾을 수 없습니다: $SERVER_PATH"
    exit 1
fi

cd "$SERVER_PATH"

# PM2 프로세스 중지
log "1. PM2 프로세스 중지..."
if pm2 list | grep -q whitedonkey; then
    pm2 stop whitedonkey
    success "PM2 프로세스 중지 완료"
else
    warning "실행 중인 PM2 프로세스가 없습니다"
fi

# 기존 .next 디렉토리 제거 (있는 경우)
log "2. 기존 빌드 제거..."
if [ -d ".next" ]; then
    rm -rf .next
    success "기존 .next 디렉토리 제거 완료"
fi

# 환경변수 로드
log "3. 환경변수 로드..."
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
    success "환경변수 로드 완료"
else
    error ".env 파일을 찾을 수 없습니다"
    exit 1
fi

# Node.js 버전 및 의존성 확인
log "4. Node.js 환경 확인..."
node --version
npm --version

# 의존성 재설치 (캐시 정리 포함)
log "5. 의존성 재설치..."
npm cache clean --force
if npm install; then
    success "의존성 설치 완료"
else
    error "의존성 설치 실패"
    exit 1
fi

# Next.js 빌드 실행
log "6. Next.js 프로덕션 빌드..."
export NODE_ENV=production
if npm run build; then
    success "Next.js 빌드 성공"
else
    error "Next.js 빌드 실패"
    # 상세 오류 정보 출력
    echo ""
    log "빌드 오류 디버깅 정보:"
    echo "Node.js 버전: $(node --version)"
    echo "npm 버전: $(npm --version)" 
    echo "현재 디렉토리: $(pwd)"
    echo "package.json 확인:"
    if [ -f "package.json" ]; then
        echo "✅ package.json 존재"
    else
        echo "❌ package.json 없음"
    fi
    exit 1
fi

# 빌드 결과 확인
log "7. 빌드 결과 확인..."
if [ -d ".next" ]; then
    success ".next 디렉토리 생성 확인"
    echo "빌드 크기: $(du -sh .next 2>/dev/null || echo '확인 불가')"
else
    error ".next 디렉토리가 생성되지 않았습니다"
    exit 1
fi

# PM2로 서비스 재시작
log "8. PM2 서비스 재시작..."
if pm2 start ecosystem.config.js; then
    success "PM2 서비스 시작 완료"
else
    error "PM2 서비스 시작 실패"
    exit 1
fi

# 서비스 상태 확인 (5초 대기 후)
log "9. 서비스 상태 확인..."
sleep 5

# PM2 상태 출력
echo ""
log "PM2 상태:"
pm2 list

# 로컬 연결 테스트
log "10. 애플리케이션 연결 테스트..."
for i in {1..5}; do
    if curl -f -s http://localhost:3000 > /dev/null; then
        success "로컬 연결 성공 (시도 $i/5)"
        break
    else
        if [ $i -eq 5 ]; then
            error "로컬 연결 실패 - PM2 로그를 확인하세요"
            echo ""
            log "최근 PM2 로그:"
            pm2 logs whitedonkey --lines 10
            exit 1
        fi
        warning "연결 실패, 재시도 중... ($i/5)"
        sleep 3
    fi
done

# Nginx 재로드
log "11. Nginx 설정 재로드..."
if sudo nginx -t; then
    sudo systemctl reload nginx
    success "Nginx 재로드 완료"
else
    warning "Nginx 설정 오류 확인 필요"
fi

success "🎉 Next.js 애플리케이션 리빌드 완료!"

echo ""
echo "📊 최종 상태:"
echo "- 빌드 디렉토리: $(ls -la .next 2>/dev/null | wc -l) 개 파일"
echo "- PM2 상태: $(pm2 list | grep whitedonkey | awk '{print $10}' || echo 'unknown')"
echo "- 로컬 포트 3000: $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo 'error')"
echo ""
echo "🌐 웹사이트 접속 테스트:"
echo "- HTTP: http://whitedonkey.ktenterprise.net"  
echo "- HTTPS: https://whitedonkey.ktenterprise.net"
echo ""
echo "📝 유용한 명령어:"
echo "- PM2 로그: pm2 logs whitedonkey"
echo "- PM2 상태: pm2 list"
echo "- 헬스체크: ./server-scripts/health-check.sh"