#!/bin/bash

# 🔧 .env 파일 환경변수 이름 문제 수정 스크립트
# 실행: chmod +x server-scripts/fix-env-file.sh && ./server-scripts/fix-env-file.sh

set -e

# 색깔 출력 함수
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

log "🔧 .env 파일의 환경변수 이름 문제를 수정합니다..."

# .env 파일이 있는지 확인
if [ ! -f ".env" ]; then
    warning ".env 파일을 찾을 수 없습니다. 스킵합니다."
    exit 0
fi

# 백업 생성
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
success ".env 파일을 백업했습니다"

# 문제가 되는 환경변수 이름 수정
sed -i 's/APP_NAME="흰당나귀 (White Donkey)"/APP_NAME="White Donkey AI Marketing Platform"/g' .env

success ".env 파일의 환경변수 이름을 수정했습니다"

# 수정 결과 확인
log "수정된 .env 파일 내용:"
grep "APP_NAME" .env || echo "APP_NAME not found"

success "🎉 .env 파일 수정 완료!"