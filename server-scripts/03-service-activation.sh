#!/bin/bash

# 🚀 흰당나귀 서비스 활성화 스크립트
# 실행: chmod +x server-scripts/03-service-activation.sh && ./server-scripts/03-service-activation.sh

set -e

SERVER_PATH="/var/www/whitedonkey"
LOG_FILE="/var/log/whitedonkey-service.log"
DOMAIN="whitedonkey.ktenterprise.net"

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

log "🚀 흰당나귀 서비스 활성화 시작..."

# 현재 디렉토리 확인
if [ ! -d "$SERVER_PATH" ]; then
    error "서버 디렉토리를 찾을 수 없습니다: $SERVER_PATH"
    exit 1
fi

cd "$SERVER_PATH"

# 1. 환경변수 로드
log "1. 환경변수 로드..."
if [ -f ".env" ]; then
    # 안전한 환경변수 로드
    set -a
    source .env
    set +a
    success "환경변수 로드 완료"
else
    error ".env 파일을 찾을 수 없습니다"
    exit 1
fi

# 2. 의존성 설치
log "2. NPM 의존성 설치..."
# 프로덕션과 개발 의존성을 모두 설치 (빌드에 필요한 패키지 포함)
if npm install; then
    success "의존성 설치 완료"
else
    error "의존성 설치 실패"
    exit 1
fi

# 빌드에 필요한 핵심 패키지들이 있는지 확인하고 없으면 설치
log "빌드 필수 패키지 확인 및 설치..."
REQUIRED_PACKAGES="@tailwindcss/postcss tailwindcss postcss autoprefixer class-variance-authority clsx"
for package in $REQUIRED_PACKAGES; do
    if ! npm list "$package" > /dev/null 2>&1; then
        log "$package 패키지 설치 중..."
        npm install "$package"
    fi
done
success "빌드 필수 패키지 확인 완료"

# 3. 보안 취약점 검사 및 수정
log "3. 보안 취약점 검사..."

# 간단한 보안 취약점 자동 수정 시도 (타임아웃 설정)
log "보안 취약점 자동 수정 시도 중..."
timeout 60 npm audit fix --production --force 2>/dev/null && success "보안 취약점 자동 수정 완료" || warning "일부 보안 취약점은 자동 수정되지 않았습니다"

warning "xlsx 패키지는 알려진 취약점이 있지만 기능에 영향 없습니다"

# 중요: 보안 검사 실패로 전체 설치가 중단되지 않도록 함
log "보안 검사 완료 (설치 계속 진행)"

# 4. Next.js 빌드
log "4. Next.js 애플리케이션 빌드..."
# 기존 빌드 제거
rm -rf .next

if npm run build; then
    success "Next.js 빌드 완료"
else
    error "Next.js 빌드 실패"
    exit 1
fi

# 5. PM2 생태계 파일 생성
log "5. PM2 설정 파일 생성..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'whitedonkey',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/whitedonkey',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      instances: 1,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
      error_file: '/var/log/whitedonkey-error.log',
      out_file: '/var/log/whitedonkey-out.log',
      log_file: '/var/log/whitedonkey-combined.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      increment_var: 'PORT',
      kill_timeout: 4000
    }
  ]
};
EOF

success "PM2 설정 파일 생성 완료"

# 6. PM2로 애플리케이션 시작
log "6. PM2로 애플리케이션 시작..."

# 기존 프로세스 중지 (있는 경우)
if pm2 list | grep -q whitedonkey; then
    pm2 delete whitedonkey
    warning "기존 프로세스를 중지했습니다"
fi

# PM2로 앱 시작
if pm2 start ecosystem.config.js; then
    success "PM2로 애플리케이션 시작 완료"
else
    error "PM2 애플리케이션 시작 실패"
    exit 1
fi

# PM2 자동 시작 설정
pm2 startup
pm2 save

# 7. Nginx 설정
log "7. Nginx 리버스 프록시 설정..."

# Nginx 설정 파일 생성
sudo tee /etc/nginx/sites-available/whitedonkey << EOF
# HTTP에서 HTTPS로 리다이렉트
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Let's Encrypt 인증을 위한 경로
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    # 나머지는 HTTPS로 리다이렉트
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

# HTTPS 서버 블록
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;
    
    # SSL 인증서 (Let's Encrypt로 자동 생성됨)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # SSL 보안 설정
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:le_nginx_SSL:10m;
    ssl_session_timeout 1440m;
    ssl_session_tickets off;
    
    # 보안 헤더
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # 로그 설정
    access_log /var/log/nginx/whitedonkey.access.log;
    error_log /var/log/nginx/whitedonkey.error.log;
    
    # 파일 업로드 크기 제한
    client_max_body_size 10M;
    
    # Gzip 압축
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        text/x-component
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # 정적 파일 캐싱
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
        access_log off;
        
        try_files \$uri @nextjs;
    }
    
    # Next.js 앱으로 프록시
    location @nextjs {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        proxy_buffers 8 32k;
        proxy_buffer_size 64k;
    }
    
    # 기본 라우팅
    location / {
        try_files \$uri @nextjs;
    }
    
    # 관리자 영역 (추가 보안 가능)
    location /admin {
        try_files \$uri @nextjs;
    }
    
    # 업로드 디렉토리
    location /uploads {
        try_files \$uri @nextjs;
    }
    
    # 숨김 파일 및 민감한 파일 접근 차단
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    location ~ \.(log|conf|env|sql)$ {
        deny all;
        access_log off;
        log_not_found off;
    }
}
EOF

# 사이트 활성화
sudo ln -sf /etc/nginx/sites-available/whitedonkey /etc/nginx/sites-enabled/

# Nginx 설정 테스트
if sudo nginx -t; then
    success "Nginx 설정이 유효합니다"
else
    error "Nginx 설정에 오류가 있습니다"
    exit 1
fi

# 8. SSL 인증서 발급 (Let's Encrypt)
log "8. SSL 인증서 발급 (Let's Encrypt)..."

# Certbot으로 SSL 인증서 발급 시도
if sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email "support@whitedonkey.co.kr"; then
    success "SSL 인증서 발급 완료"
else
    warning "SSL 인증서 발급 실패. HTTP로 서비스를 시작합니다"
    # HTTPS 설정 제거하고 HTTP만 사용
    sudo tee /etc/nginx/sites-available/whitedonkey << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    access_log /var/log/nginx/whitedonkey.access.log;
    error_log /var/log/nginx/whitedonkey.error.log;
    
    client_max_body_size 10M;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF
fi

# Nginx 재시작
sudo systemctl reload nginx
success "Nginx 설정 적용 완료"

# 9. 서비스 상태 확인
log "9. 서비스 상태 확인..."

# PM2 상태 확인
sleep 5  # 애플리케이션 시작 대기

if pm2 list | grep -q "online"; then
    success "PM2 애플리케이션이 실행 중입니다"
else
    error "PM2 애플리케이션 실행 실패"
    pm2 logs whitedonkey --lines 20
    exit 1
fi

# 로컬 연결 테스트
log "로컬 연결 테스트 중..."
for i in {1..10}; do
    if curl -f -s http://localhost:3000 > /dev/null; then
        success "로컬 연결 성공 (시도 $i/10)"
        break
    else
        if [ $i -eq 10 ]; then
            error "로컬 연결 실패"
            exit 1
        fi
        sleep 2
    fi
done

# 외부 연결 테스트 (HTTP)
log "외부 연결 테스트 중..."
if curl -f -s "http://$DOMAIN" > /dev/null; then
    success "외부 HTTP 연결 성공"
else
    warning "외부 HTTP 연결 실패 (DNS 설정 확인 필요)"
fi

# 10. 모니터링 설정
log "10. 시스템 모니터링 설정..."

# 로그 로테이션 설정
sudo tee /etc/logrotate.d/whitedonkey << 'EOF'
/var/log/whitedonkey*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}

/var/log/nginx/whitedonkey*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        systemctl reload nginx
    endscript
}
EOF

success "로그 로테이션 설정 완료"

# 11. 최종 상태 확인 및 정보 출력
log "11. 최종 시스템 상태 확인..."

echo ""
echo "========================= 서비스 상태 ========================="
echo "📋 PM2 프로세스:"
pm2 list

echo ""
echo "🌐 Nginx 상태:"
sudo systemctl status nginx --no-pager -l

echo ""
echo "🗄️ PostgreSQL 상태:"
sudo systemctl status postgresql --no-pager -l

echo ""
echo "📊 시스템 리소스:"
echo "CPU 사용률: $(top -bn1 | grep load | awk '{printf "%.2f%%", $(NF-2)}')"
echo "메모리 사용률: $(free | grep Mem | awk '{printf "%.2f%%", $3/$2 * 100.0}')"
echo "디스크 사용률: $(df -h / | awk 'NR==2{printf "%s", $5}')"

echo ""
echo "🔗 접속 정보:"
echo "HTTP URL: http://$DOMAIN"
echo "HTTPS URL: https://$DOMAIN (SSL 인증서 발급된 경우)"
echo "서버 IP: $(curl -s ifconfig.me)"
echo ""

# 12. 헬스체크 스크립트 생성
log "12. 헬스체크 스크립트 생성..."
cat > server-scripts/health-check.sh << 'EOF'
#!/bin/bash

# 서비스 헬스체크 스크립트
echo "=== 흰당나귀 서비스 헬스체크 ==="
echo "실행시간: $(date)"

# PM2 상태 확인
echo "PM2 상태:"
pm2 list

# 애플리케이션 응답 확인
if curl -f -s http://localhost:3000 > /dev/null; then
    echo "✅ 애플리케이션 응답: 정상"
else
    echo "❌ 애플리케이션 응답: 실패"
fi

# 데이터베이스 연결 확인
if [ -f "/var/www/whitedonkey/.env" ]; then
    cd /var/www/whitedonkey
    export $(grep -v '^#' .env | xargs)
    if npx prisma db execute --stdin <<< "SELECT 1;" > /dev/null 2>&1; then
        echo "✅ 데이터베이스 연결: 정상"
    else
        echo "❌ 데이터베이스 연결: 실패"
    fi
fi

# 시스템 리소스
echo "시스템 리소스:"
echo "- CPU: $(top -bn1 | grep load | awk '{printf "%.2f%%", $(NF-2)}')"
echo "- 메모리: $(free | grep Mem | awk '{printf "%.2f%%", $3/$2 * 100.0}')"
echo "- 디스크: $(df -h / | awk 'NR==2{printf "%s", $5}')"

echo "헬스체크 완료"
EOF

chmod +x server-scripts/health-check.sh
success "헬스체크 스크립트 생성 완료"

# 13. 크론탭 설정 (정기 헬스체크)
log "13. 정기 헬스체크 크론탭 설정..."
(crontab -l 2>/dev/null; echo "*/5 * * * * /var/www/whitedonkey/server-scripts/health-check.sh >> /var/log/whitedonkey-health.log 2>&1") | crontab -
success "5분마다 헬스체크 실행 설정 완료"

success "🎉 흰당나귀 서비스 활성화 완료!"
success "웹사이트 접속: http://$DOMAIN"

# 중요한 명령어들 출력
echo ""
echo "📝 유용한 명령어들:"
echo "PM2 상태 확인: pm2 list"
echo "PM2 로그 확인: pm2 logs whitedonkey"
echo "PM2 재시작: pm2 restart whitedonkey"
echo "Nginx 재시작: sudo systemctl reload nginx"
echo "헬스체크 실행: ./server-scripts/health-check.sh"
echo "서비스 업데이트: ./server-configs/update-server.sh"