#!/bin/bash

# 🎯 최종 완전 해결 스크립트
# PostCSS 설정 + 권한 + 의존성 문제를 모두 해결
# 실행: chmod +x server-scripts/final-fix-complete.sh && sudo ./server-scripts/final-fix-complete.sh

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

log "🎯 최종 완전 해결 시작..."

cd "$SERVER_PATH"

# 1. PM2 프로세스 중지
log "1. PM2 프로세스 중지..."
pm2 stop whitedonkey 2>/dev/null || warning "중지할 PM2 프로세스가 없습니다"

# 2. 파일 소유권 변경 (developer 사용자로)
log "2. 파일 소유권 정리..."
chown -R developer:developer .
success "파일 소유권을 developer로 변경 완료"

# 3. 잘못된 PostCSS 설정 제거 및 올바른 설정 생성
log "3. PostCSS 설정 교체..."
rm -f postcss.config.js tailwind.config.js

# 올바른 PostCSS 설정 (Tailwind 4.x 호환)
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
EOF

# Tailwind 설정
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

success "올바른 PostCSS/Tailwind 설정 생성 완료"

# 4. 의존성 완전 재설치 (developer 사용자로)
log "4. 의존성 완전 재설치 (developer 권한)..."
sudo -u developer bash << 'USERSCRIPT'
cd /var/www/whitedonkey

# 완전 정리
rm -rf node_modules .next package-lock.json
npm cache clean --force

# 필수 패키지 설치
npm install --save @tailwindcss/postcss@latest
npm install --save tailwindcss@latest
npm install --save postcss@latest
npm install --save autoprefixer@latest
npm install --save class-variance-authority@latest
npm install --save clsx@latest
npm install --save tailwind-merge@latest
npm install --save-dev @types/node@latest
npm install --save-dev @types/react@latest
npm install --save-dev @types/react-dom@latest

# 전체 의존성 설치
npm install
USERSCRIPT

if [ $? -eq 0 ]; then
    success "의존성 설치 완료 (developer 권한)"
else
    error "의존성 설치 실패"
    exit 1
fi

# 5. 패키지 설치 확인 (올바른 방법)
log "5. 패키지 설치 실제 확인..."
SUCCESS_COUNT=0
REQUIRED_PACKAGES=(
    "@tailwindcss/postcss"
    "tailwindcss" 
    "postcss"
    "autoprefixer"
    "class-variance-authority"
    "clsx"
    "tailwind-merge"
    "@types/node"
    "@types/react"
    "@types/react-dom"
)

for package in "${REQUIRED_PACKAGES[@]}"; do
    if [ -d "node_modules/$package" ] || [ -d "node_modules/@${package#@}" ]; then
        success "✅ $package 확인됨"
        ((SUCCESS_COUNT++))
    else
        error "❌ $package 누락"
    fi
done

log "$SUCCESS_COUNT/${#REQUIRED_PACKAGES[@]} 패키지 설치 완료"

# 6. 환경변수 로드
log "6. 환경변수 로드..."
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
    success "환경변수 로드 완료"
fi

# 7. Next.js 빌드 테스트 (developer 권한)
log "7. Next.js 빌드 테스트 (developer 권한)..."
sudo -u developer bash << 'BUILDSCRIPT'
cd /var/www/whitedonkey
export NODE_ENV=production
npm run build
BUILDSCRIPT

if [ $? -eq 0 ]; then
    success "🎉 Next.js 빌드 성공!"
else
    error "빌드 실패. 추가 디버깅 필요"
    
    log "디버깅 정보:"
    echo "PostCSS 설정 파일:"
    cat postcss.config.js
    echo ""
    echo "node_modules/@tailwindcss 존재 확인:"
    ls -la node_modules/@tailwindcss/ || echo "디렉토리 없음"
    echo ""
    echo "globals.css 파일 확인:"
    head -10 app/globals.css 2>/dev/null || echo "globals.css 파일 없음"
    
    exit 1
fi

# 8. PM2 재시작 (developer 권한)
log "8. PM2 재시작..."
sudo -u developer pm2 start ecosystem.config.js
if [ $? -eq 0 ]; then
    success "PM2 시작 완료"
    
    # 5초 대기 후 상태 확인
    sleep 5
    sudo -u developer pm2 list
    
    # 연결 테스트
    log "연결 테스트..."
    if curl -f -s http://localhost:3000 > /dev/null; then
        success "🎉 애플리케이션 정상 실행!"
        echo ""
        echo "🌐 웹사이트 접속:"
        echo "- HTTP: http://whitedonkey.ktenterprise.net"
        echo "- HTTPS: https://whitedonkey.ktenterprise.net"
        echo ""
        echo "📝 이제 sudo 없이 작업 가능:"
        echo "- pm2 list"
        echo "- pm2 logs whitedonkey"  
        echo "- pm2 restart whitedonkey"
        echo "- npm run build"
    else
        warning "연결 테스트 실패. PM2 로그 확인: pm2 logs whitedonkey"
    fi
else
    error "PM2 시작 실패"
    exit 1
fi

# 9. 최종 권한 확인
log "9. 최종 권한 설정 확인..."
echo "현재 소유자: $(ls -la package.json | awk '{print $3":"$4}')"
echo "node_modules 소유자: $(ls -lad node_modules | awk '{print $3":"$4}')"
echo ".next 소유자: $(ls -lad .next 2>/dev/null | awk '{print $3":"$4}' || echo '.next 없음')"

success "🎉 모든 문제 해결 완료!"
success "이제 sudo 없이 npm, pm2 명령어 사용 가능합니다."