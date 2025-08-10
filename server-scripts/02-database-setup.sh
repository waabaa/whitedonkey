#!/bin/bash

# 🗄️ 흰당나귀 데이터베이스 설정 스크립트
# 실행: chmod +x server-scripts/02-database-setup.sh && ./server-scripts/02-database-setup.sh

set -e

SERVER_PATH="/var/www/whitedonkey"
LOG_FILE="/var/log/whitedonkey-database.log"

# 색깔 출력 함수
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

log "🗄️ 흰당나귀 데이터베이스 설정 시작..."

# 현재 디렉토리 확인
if [ ! -d "$SERVER_PATH" ]; then
    error "서버 디렉토리를 찾을 수 없습니다: $SERVER_PATH"
    exit 1
fi

cd "$SERVER_PATH"

# 1. PostgreSQL 상태 확인
log "1. PostgreSQL 서비스 상태 확인..."
if systemctl is-active --quiet postgresql; then
    success "PostgreSQL이 실행 중입니다"
else
    warning "PostgreSQL이 중지되어 있습니다. 시작합니다..."
    sudo systemctl start postgresql
    sleep 3
fi

# 2. 데이터베이스 사용자 정보 입력
log "2. 데이터베이스 설정 정보 입력..."

# 기본값 설정
DEFAULT_DB_NAME="whitedonkey_db"
DEFAULT_DB_USER="whitedonkey"
DEFAULT_DB_HOST="localhost"
DEFAULT_DB_PORT="5432"

# 사용자 입력 또는 기본값 사용
DB_NAME="${DB_NAME:-$DEFAULT_DB_NAME}"
DB_USER="${DB_USER:-$DEFAULT_DB_USER}"
DB_HOST="${DB_HOST:-$DEFAULT_DB_HOST}"
DB_PORT="${DB_PORT:-$DEFAULT_DB_PORT}"

# 비밀번호 생성 (환경변수가 없으면 랜덤 생성)
if [ -z "$DB_PASSWORD" ]; then
    DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-16)
    success "데이터베이스 비밀번호가 자동 생성되었습니다"
fi

log "데이터베이스 정보:"
log "- 데이터베이스명: $DB_NAME"
log "- 사용자명: $DB_USER"
log "- 호스트: $DB_HOST"
log "- 포트: $DB_PORT"

# 3. PostgreSQL 사용자 및 데이터베이스 생성
log "3. PostgreSQL 사용자 및 데이터베이스 생성..."

# 사용자 존재 확인
if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1; then
    warning "사용자 '$DB_USER'가 이미 존재합니다"
else
    sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
    success "사용자 '$DB_USER' 생성 완료"
fi

# 데이터베이스 존재 확인
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    warning "데이터베이스 '$DB_NAME'가 이미 존재합니다"
else
    sudo -u postgres createdb -O "$DB_USER" "$DB_NAME"
    success "데이터베이스 '$DB_NAME' 생성 완료"
fi

# 권한 부여
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
sudo -u postgres psql -c "ALTER USER $DB_USER CREATEDB;"
success "사용자 권한 설정 완료"

# 4. .env 파일 생성/업데이트
log "4. .env 파일 설정..."

# 기존 .env 백업
if [ -f ".env" ]; then
    cp .env ".env.backup.$(date +%Y%m%d_%H%M%S)"
    warning "기존 .env 파일을 백업했습니다"
fi

# DATABASE_URL 생성
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

# .env 파일 생성
cat > .env << EOF
# Database
DATABASE_URL="$DATABASE_URL"

# NextAuth.js
NEXTAUTH_SECRET="whitedonkey-secret-$(openssl rand -base64 32 | tr -d '=+/')"
NEXTAUTH_URL="https://whitedonkey.ktenterprise.net"

# Application Settings
APP_NAME="흰당나귀 (White Donkey)"
ADMIN_EMAIL="support@whitedonkey.co.kr"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload Settings
MAX_FILE_SIZE=5242880
UPLOAD_DIR="./uploads"

# Production Settings
NODE_ENV=production
PORT=3000
EOF

success ".env 파일 생성 완료"

# 5. 환경변수 로드 테스트
log "5. 환경변수 로드 테스트..."
export $(grep -v '^#' .env | xargs)

if [ -n "$DATABASE_URL" ]; then
    success "DATABASE_URL 설정 확인됨"
else
    error "DATABASE_URL 설정 실패"
    exit 1
fi

# 6. 데이터베이스 연결 테스트
log "6. 데이터베이스 연결 테스트..."
if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1;" > /dev/null 2>&1; then
    success "데이터베이스 연결 성공"
else
    error "데이터베이스 연결 실패"
    exit 1
fi

# 7. Prisma 설정 확인
log "7. Prisma 설정 확인..."
if [ -f "prisma/schema.prisma" ]; then
    success "Prisma 스키마 파일 발견"
    
    # Prisma 클라이언트 생성
    log "Prisma 클라이언트 생성 중..."
    if npx prisma generate; then
        success "Prisma 클라이언트 생성 완료"
    else
        error "Prisma 클라이언트 생성 실패"
        exit 1
    fi
    
    # 데이터베이스 마이그레이션
    log "데이터베이스 마이그레이션 실행 중..."
    if npx prisma migrate deploy; then
        success "데이터베이스 마이그레이션 완료"
    else
        warning "마이그레이션 실패. 개발용 마이그레이션을 시도합니다..."
        if npx prisma db push; then
            success "데이터베이스 스키마 동기화 완료"
        else
            error "데이터베이스 마이그레이션/동기화 실패"
            exit 1
        fi
    fi
else
    warning "Prisma 스키마 파일을 찾을 수 없습니다"
fi

# 8. 초기 데이터 시드 (있는 경우)
if [ -f "prisma/seed.ts" ] || [ -f "prisma/seed.js" ]; then
    log "8. 초기 데이터 시드 실행..."
    if npx prisma db seed; then
        success "초기 데이터 시드 완료"
    else
        warning "초기 데이터 시드 실패 (스킵됨)"
    fi
fi

# 9. 데이터베이스 정보 저장
log "9. 데이터베이스 정보 저장..."
cat > database-info.txt << EOF
=== 흰당나귀 데이터베이스 정보 ===
생성일시: $(date '+%Y-%m-%d %H:%M:%S')

데이터베이스명: $DB_NAME
사용자명: $DB_USER
비밀번호: $DB_PASSWORD
호스트: $DB_HOST
포트: $DB_PORT

연결 문자열: $DATABASE_URL

=== 관리 명령어 ===
데이터베이스 접속: PGPASSWORD='$DB_PASSWORD' psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME
백업: pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME > backup.sql
복원: PGPASSWORD='$DB_PASSWORD' psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME < backup.sql

※ 이 파일은 민감한 정보를 포함하고 있으니 안전하게 보관하세요.
EOF

# 파일 권한 설정 (소유자만 읽기 가능)
chmod 600 database-info.txt
success "데이터베이스 정보가 database-info.txt에 저장되었습니다"

# 10. PostgreSQL 설정 최적화
log "10. PostgreSQL 성능 최적화..."
POSTGRES_VERSION=$(sudo -u postgres psql -c 'SHOW server_version;' | head -3 | tail -1 | cut -d' ' -f1)
POSTGRES_CONF="/etc/postgresql/$(echo $POSTGRES_VERSION | cut -d'.' -f1)/main/postgresql.conf"

if [ -f "$POSTGRES_CONF" ]; then
    # 설정 백업
    sudo cp "$POSTGRES_CONF" "$POSTGRES_CONF.backup.$(date +%Y%m%d_%H%M%S)"
    
    # 메모리 정보 가져오기
    TOTAL_MEM=$(free -m | awk 'NR==2{print $2}')
    SHARED_BUFFERS=$((TOTAL_MEM / 4))  # 총 메모리의 25%
    
    # 성능 설정 추가
    sudo bash -c "cat >> $POSTGRES_CONF" << EOF

# 성능 최적화 설정 ($(date '+%Y-%m-%d %H:%M:%S') 추가)
shared_buffers = ${SHARED_BUFFERS}MB
effective_cache_size = $((TOTAL_MEM * 3 / 4))MB
work_mem = 4MB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.7
wal_buffers = 16MB
default_statistics_target = 100
EOF
    
    success "PostgreSQL 성능 설정 최적화 완료"
    warning "설정 적용을 위해 PostgreSQL을 재시작합니다..."
    sudo systemctl restart postgresql
    sleep 5
else
    warning "PostgreSQL 설정 파일을 찾을 수 없습니다"
fi

success "🎉 데이터베이스 설정 완료!"
success "다음 단계: ./server-scripts/03-service-activation.sh 실행"

# 중요한 정보 출력
echo ""
echo "🔐 중요 정보:"
echo "데이터베이스 비밀번호: $DB_PASSWORD"
echo "연결 문자열: $DATABASE_URL"
echo "※ database-info.txt 파일에 모든 정보가 저장되었습니다"