#!/bin/bash

# 🔧 Node.js/npm 충돌 해결 스크립트
# 실행: chmod +x server-scripts/fix-nodejs-npm.sh && sudo ./server-scripts/fix-nodejs-npm.sh

set -e

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

log "🔧 Node.js/npm 충돌 문제 해결 시작..."

# 1. 현재 Node.js 버전 확인
log "1. 현재 Node.js 상태 확인..."
echo "Node.js 버전: $(node --version 2>/dev/null || echo '설치되지 않음')"
echo "npm 버전: $(npm --version 2>/dev/null || echo '설치되지 않음')"
echo "현재 위치: $(which node 2>/dev/null || echo '없음')"
echo "npm 위치: $(which npm 2>/dev/null || echo '없음')"

# 2. 충돌하는 패키지 제거
log "2. 충돌하는 npm 패키지 제거..."

# Ubuntu 시스템 npm 제거 시도
if dpkg -l | grep -q "^ii.*npm"; then
    warning "Ubuntu 시스템 npm 패키지를 제거합니다..."
    apt remove -y npm || true
    apt autoremove -y || true
fi

# nodejs 패키지 상태 확인
if dpkg -l | grep -q "^ii.*nodejs.*nodesource"; then
    success "NodeSource에서 설치된 Node.js 발견"
else
    warning "Ubuntu 기본 nodejs 패키지 감지됨"
    # Ubuntu nodejs 제거
    apt remove -y nodejs || true
fi

# 3. NodeSource Node.js 재설치 (npm 포함)
log "3. NodeSource Node.js LTS 재설치..."

# NodeSource GPG 키 및 리포지토리 설정
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -

# Node.js 설치 (npm 자동 포함됨)
apt install -y nodejs

# 4. 설치 확인
log "4. 설치 결과 확인..."
sleep 2

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)

success "Node.js 버전: $NODE_VERSION"
success "npm 버전: $NPM_VERSION"

# 버전 검사
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_MAJOR" -ge 18 ]; then
    success "Node.js 버전이 요구사항을 만족합니다 (v18 이상)"
else
    error "Node.js 버전이 너무 낮습니다. v18 이상이 필요합니다."
    exit 1
fi

# 5. npm 글로벌 패키지 업데이트
log "5. npm 최신 버전 업데이트..."
npm install -g npm@latest

# 6. PM2 설치
log "6. PM2 글로벌 설치..."
npm install -g pm2

success "PM2 버전: $(pm2 --version)"

# 7. 권한 설정
log "7. npm 권한 설정..."

# npm 글로벌 디렉토리를 홈 디렉토리로 설정 (권한 문제 방지)
if [ -n "$SUDO_USER" ]; then
    USER_HOME=$(eval echo ~$SUDO_USER)
    mkdir -p "$USER_HOME/.npm-global"
    chown -R $SUDO_USER:$SUDO_USER "$USER_HOME/.npm-global"
    
    # .profile에 PATH 추가 (중복 체크)
    if ! grep -q "npm-global/bin" "$USER_HOME/.profile"; then
        echo 'export PATH=~/.npm-global/bin:$PATH' >> "$USER_HOME/.profile"
        success "npm 글로벌 경로를 .profile에 추가했습니다"
    fi
    
    # npm 설정
    sudo -u $SUDO_USER npm config set prefix "$USER_HOME/.npm-global"
fi

# 8. 패키지 의존성 문제 해결
log "8. 패키지 의존성 정리..."
apt --fix-broken install -y || true
apt autoremove -y || true
apt autoclean || true

# 9. 최종 테스트
log "9. 최종 기능 테스트..."

# Node.js 테스트
if node -e "console.log('Node.js 작동 확인')"; then
    success "Node.js 정상 작동"
else
    error "Node.js 테스트 실패"
    exit 1
fi

# npm 테스트
if npm --version > /dev/null; then
    success "npm 정상 작동"
else
    error "npm 테스트 실패"
    exit 1
fi

# PM2 테스트
if pm2 --version > /dev/null; then
    success "PM2 정상 작동"
else
    error "PM2 테스트 실패"
    exit 1
fi

# 10. 정보 출력
log "10. 설치 완료 정보..."
echo "======================= 설치 완료 ======================="
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "PM2: $(pm2 --version)"
echo "Node.js 경로: $(which node)"
echo "npm 경로: $(which npm)"
echo "PM2 경로: $(which pm2)"
echo "====================================================="

success "🎉 Node.js/npm 충돌 문제가 해결되었습니다!"
success "이제 ./server-scripts/01-server-setup.sh를 다시 실행할 수 있습니다"

# 사용자에게 알림
if [ -n "$SUDO_USER" ]; then
    warning "변경사항을 적용하려면 다음 중 하나를 실행하세요:"
    echo "1. 새 터미널 세션 시작"
    echo "2. source ~/.profile 실행"
    echo "3. 로그아웃 후 다시 로그인"
fi