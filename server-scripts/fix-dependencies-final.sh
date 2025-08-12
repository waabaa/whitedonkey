#!/bin/bash

# 🔧 의존성 문제 완전 해결 스크립트 (최종)
# 반복되는 빌드 의존성 누락 문제를 근본적으로 해결
# 실행: chmod +x server-scripts/fix-dependencies-final.sh && ./server-scripts/fix-dependencies-final.sh

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

log "🔧 반복되는 의존성 문제 완전 해결 시작..."

cd "$SERVER_PATH"

# 1. PM2 프로세스 중지
log "1. PM2 프로세스 중지..."
pm2 stop whitedonkey 2>/dev/null || warning "중지할 PM2 프로세스가 없습니다"

# 2. 완전한 캐시 및 모듈 정리
log "2. 완전한 정리 작업..."
rm -rf node_modules
rm -rf .next
rm -f package-lock.json
npm cache clean --force
success "모든 캐시 및 모듈 정리 완료"

# 3. 핵심 누락 패키지 목록 정의
log "3. 필수 패키지 목록 확인..."
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

# 4. Node.js 환경 확인
log "4. Node.js 환경 확인..."
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"

# 5. package.json 백업 및 확인
log "5. package.json 백업 및 확인..."
if [ -f "package.json" ]; then
    cp package.json "package.json.backup.$(date +%Y%m%d_%H%M%S)"
    success "package.json 백업 완료"
else
    error "package.json 파일을 찾을 수 없습니다"
    exit 1
fi

# 6. 필수 패키지 개별 설치 (강제 설치)
log "6. 필수 패키지 개별 강제 설치..."
for package in "${REQUIRED_PACKAGES[@]}"; do
    log "설치 중: $package"
    if npm install "$package" --save --force; then
        success "$package 설치 완료"
    else
        error "$package 설치 실패"
        # 실패해도 계속 진행
    fi
done

# 7. 전체 의존성 설치
log "7. 전체 의존성 설치..."
if npm install --force; then
    success "전체 의존성 설치 완료"
else
    error "전체 의존성 설치 실패"
    exit 1
fi

# 8. 설치된 패키지 확인
log "8. 중요 패키지 설치 확인..."
MISSING_PACKAGES=()
for package in "${REQUIRED_PACKAGES[@]}"; do
    if npm list "$package" >/dev/null 2>&1; then
        success "✅ $package 설치됨"
    else
        error "❌ $package 누락"
        MISSING_PACKAGES+=("$package")
    fi
done

# 9. 누락된 패키지가 있으면 재시도
if [ ${#MISSING_PACKAGES[@]} -gt 0 ]; then
    warning "누락된 패키지가 있습니다. 재시도합니다..."
    for package in "${MISSING_PACKAGES[@]}"; do
        log "재시도: $package"
        npm install "$package" --save --force --legacy-peer-deps || warning "$package 설치 실패 (스킵)"
    done
fi

# 10. PostCSS 설정 확인 및 생성
log "9. PostCSS 설정 확인..."
if [ ! -f "postcss.config.js" ]; then
    log "postcss.config.js 생성..."
    cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
    success "postcss.config.js 생성 완료"
fi

# 11. Tailwind CSS 설정 확인
log "10. Tailwind CSS 설정 확인..."
if [ ! -f "tailwind.config.js" ] && [ ! -f "tailwind.config.ts" ]; then
    warning "Tailwind 설정 파일이 없습니다. 기본 설정 생성..."
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
    success "tailwind.config.js 생성 완료"
fi

# 12. 환경변수 로드
log "11. 환경변수 로드..."
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
    success "환경변수 로드 완료"
fi

# 13. Next.js 빌드 테스트
log "12. Next.js 빌드 테스트..."
export NODE_ENV=production
if npm run build; then
    success "🎉 Next.js 빌드 성공!"
else
    error "빌드가 여전히 실패합니다. 상세 분석 필요"
    
    log "패키지 설치 상태 최종 확인:"
    for package in "${REQUIRED_PACKAGES[@]}"; do
        if npm list "$package" >/dev/null 2>&1; then
            echo "✅ $package: $(npm list "$package" 2>/dev/null | grep "$package" | head -1 || echo '버전 확인 불가')"
        else
            echo "❌ $package: 누락"
        fi
    done
    
    log "Node.js 모듈 경로 확인:"
    echo "node_modules 크기: $(du -sh node_modules 2>/dev/null || echo '확인 불가')"
    echo "node_modules 내부 주요 디렉토리:"
    ls -la node_modules/ | grep -E "(tailwind|postcss|class-variance)" || echo "관련 디렉토리 없음"
    
    exit 1
fi

# 14. PM2 재시작
log "13. PM2 서비스 재시작..."
if pm2 start ecosystem.config.js; then
    success "PM2 서비스 시작 완료"
    
    # 5초 대기 후 상태 확인
    sleep 5
    pm2 list
    
    # 연결 테스트
    log "연결 테스트 중..."
    if curl -f -s http://localhost:3000 > /dev/null; then
        success "🎉 애플리케이션 정상 실행 중!"
        echo ""
        echo "🌐 웹사이트 접속 가능:"
        echo "- HTTP: http://whitedonkey.ktenterprise.net"
        echo "- HTTPS: https://whitedonkey.ktenterprise.net"
    else
        warning "연결 테스트 실패. PM2 로그를 확인하세요: pm2 logs whitedonkey"
    fi
else
    error "PM2 시작 실패"
    exit 1
fi

success "🎉 의존성 문제 완전 해결 완료!"
success "이제 반복되는 빌드 오류가 해결되었습니다."

echo ""
echo "📝 해결된 패키지들:"
for package in "${REQUIRED_PACKAGES[@]}"; do
    if npm list "$package" >/dev/null 2>&1; then
        echo "✅ $package"
    else
        echo "❌ $package (여전히 누락)"
    fi
done