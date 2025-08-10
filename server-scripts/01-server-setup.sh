#!/bin/bash

# 🔧 흰당나귀 서버 환경 설정 스크립트
# 실행: chmod +x server-scripts/01-server-setup.sh && ./server-scripts/01-server-setup.sh

set -e  # 에러 발생시 스크립트 중단

SERVER_PATH="/var/www/whitedonkey"
LOG_FILE="/var/log/whitedonkey-setup.log"

# 색깔 출력 함수
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로깅 함수
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✅ $1${NC}" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ❌ $1${NC}" | tee -a "$LOG_FILE"
}

log "🚀 흰당나귀 서버 환경 설정 시작..."

# 1. 시스템 업데이트
log "1. 시스템 패키지 업데이트..."
sudo apt update && sudo apt upgrade -y

# 2. 필수 패키지 설치
log "2. 필수 패키지 설치..."
sudo apt install -y \
    curl \
    wget \
    git \
    nginx \
    postgresql \
    postgresql-contrib \
    nodejs \
    npm \
    certbot \
    python3-certbot-nginx \
    htop \
    ufw \
    fail2ban

# 3. Node.js 버전 확인 및 업데이트 (필요시)
log "3. Node.js 버전 확인..."
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    warning "Node.js 버전이 낮습니다. 업데이트합니다..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt install -y nodejs
fi

success "Node.js 버전: $(node --version)"
success "NPM 버전: $(npm --version)"

# 4. PM2 설치
log "4. PM2 프로세스 매니저 설치..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    success "PM2 설치 완료"
else
    success "PM2가 이미 설치되어 있습니다"
fi

# 5. 디렉토리 권한 설정
log "5. 디렉토리 권한 설정..."
if [ -d "$SERVER_PATH" ]; then
    sudo chown -R $USER:$USER "$SERVER_PATH"
    success "디렉토리 권한 설정 완료"
else
    error "서버 디렉토리를 찾을 수 없습니다: $SERVER_PATH"
    exit 1
fi

# 6. 방화벽 설정
log "6. 방화벽 설정..."
sudo ufw --force enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000  # Next.js 개발 서버
success "방화벽 설정 완료"

# 7. Fail2Ban 설정
log "7. Fail2Ban 보안 설정..."
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
success "Fail2Ban 설정 완료"

# 8. PostgreSQL 서비스 시작
log "8. PostgreSQL 서비스 시작..."
sudo systemctl enable postgresql
sudo systemctl start postgresql
success "PostgreSQL 서비스 시작됨"

# 9. Nginx 서비스 시작
log "9. Nginx 서비스 시작..."
sudo systemctl enable nginx
sudo systemctl start nginx
success "Nginx 서비스 시작됨"

# 10. 로그 디렉토리 생성
log "10. 로그 디렉토리 설정..."
sudo mkdir -p /var/log/whitedonkey
sudo chown $USER:$USER /var/log/whitedonkey
success "로그 디렉토리 생성 완료"

# 11. 시스템 정보 출력
log "11. 시스템 정보 확인..."
echo "=================== 시스템 정보 ==================="
echo "OS: $(lsb_release -d | cut -f2)"
echo "Kernel: $(uname -r)"
echo "CPU: $(nproc) cores"
echo "Memory: $(free -h | awk '/^Mem:/ {print $2}')"
echo "Disk: $(df -h / | awk 'NR==2 {print $4}') available"
echo "Node.js: $(node --version)"
echo "NPM: $(npm --version)"
echo "PostgreSQL: $(sudo -u postgres psql -c 'SELECT version();' | head -3 | tail -1)"
echo "Nginx: $(nginx -v 2>&1)"
echo "=================================================="

success "🎉 서버 환경 설정 완료!"
success "다음 단계: ./server-scripts/02-database-setup.sh 실행"