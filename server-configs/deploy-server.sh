#!/bin/bash

# 흰당나귀 AI 마케팅 플랫폼 서버 배포 스크립트
# Domain: whitedonkey.ktenterprise.net
# Directory: /var/www/whitedonkey

set -e  # 에러 발생시 스크립트 종료

echo "🚀 흰당나귀 AI 마케팅 플랫폼 배포 시작..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 변수 설정
DOMAIN="whitedonkey.ktenterprise.net"
APP_DIR="/var/www/whitedonkey"
REPO_URL="https://github.com/waabaa/whitedonkey.git"
DB_NAME="whitedonkey"
DB_USER="whitedonkey"

echo -e "${BLUE}1. 시스템 업데이트...${NC}"
sudo apt update && sudo apt upgrade -y

echo -e "${BLUE}2. 필요한 패키지 설치...${NC}"
# Node.js 18 설치
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL 설치
sudo apt install -y postgresql postgresql-contrib

# Nginx 설치
sudo apt install -y nginx

# PM2 글로벌 설치
sudo npm install -g pm2

# Certbot 설치 (SSL용)
sudo apt install -y certbot python3-certbot-nginx

echo -e "${BLUE}3. 디렉토리 생성 및 권한 설정...${NC}"
sudo mkdir -p $APP_DIR
sudo mkdir -p /var/www/uploads
sudo mkdir -p /var/log/whitedonkey
sudo mkdir -p /var/backups/whitedonkey

# 사용자 권한 설정
sudo chown -R $USER:$USER $APP_DIR
sudo chown -R $USER:$USER /var/www/uploads
sudo chown -R $USER:$USER /var/log/whitedonkey

echo -e "${BLUE}4. 데이터베이스 설정...${NC}"
sudo -u postgres createdb $DB_NAME 2>/dev/null || echo "Database already exists"
sudo -u postgres createuser $DB_USER 2>/dev/null || echo "User already exists"

echo -e "${YELLOW}데이터베이스 비밀번호를 설정해주세요:${NC}"
sudo -u postgres psql -c "ALTER USER $DB_USER WITH PASSWORD 'secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

echo -e "${BLUE}5. 애플리케이션 클론 및 설정...${NC}"
cd /var/www
if [ ! -d "$APP_DIR/.git" ]; then
    git clone $REPO_URL whitedonkey
else
    cd whitedonkey
    git pull origin main
fi

cd $APP_DIR

# 환경변수 파일 복사
cp server-configs/.env.production .env.production

echo -e "${YELLOW}환경변수 파일을 편집해주세요 (특히 데이터베이스 비밀번호):${NC}"
read -p "편집하시겠습니까? (y/n): " edit_env
if [ "$edit_env" = "y" ]; then
    nano .env.production
fi

echo -e "${BLUE}6. 의존성 설치 및 빌드...${NC}"
npm ci --production
npx prisma generate
npm run build

echo -e "${BLUE}7. 데이터베이스 마이그레이션...${NC}"
npx prisma db push

echo -e "${BLUE}8. PM2 설정...${NC}"
cp server-configs/ecosystem.config.js ecosystem.config.js
pm2 start ecosystem.config.js --env production

# PM2 부팅시 시작 설정
pm2 startup
pm2 save

echo -e "${BLUE}9. Nginx 설정...${NC}"
sudo cp server-configs/nginx-whitedonkey.conf /etc/nginx/sites-available/whitedonkey
sudo ln -sf /etc/nginx/sites-available/whitedonkey /etc/nginx/sites-enabled/

# 기본 사이트 비활성화
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx 설정 테스트
sudo nginx -t

if [ $? -eq 0 ]; then
    sudo systemctl reload nginx
    echo -e "${GREEN}Nginx 설정 완료!${NC}"
else
    echo -e "${RED}Nginx 설정 오류 - 확인해주세요${NC}"
    exit 1
fi

echo -e "${BLUE}10. SSL 인증서 설정...${NC}"
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@whitedonkey.co.kr

# SSL 자동 갱신 설정
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -

echo -e "${BLUE}11. 방화벽 설정...${NC}"
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw --force enable

echo -e "${BLUE}12. 백업 스크립트 설정...${NC}"
cat > /tmp/backup-whitedonkey.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/whitedonkey"

# 데이터베이스 백업
pg_dump -h localhost -U whitedonkey whitedonkey > $BACKUP_DIR/db_$DATE.sql

# 업로드 파일 백업
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/www/uploads

# 7일 이상 된 백업 파일 삭제
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

sudo mv /tmp/backup-whitedonkey.sh /usr/local/bin/backup-whitedonkey.sh
sudo chmod +x /usr/local/bin/backup-whitedonkey.sh

# 매일 새벽 2시 백업 실행
echo "0 2 * * * /usr/local/bin/backup-whitedonkey.sh" | sudo crontab -

echo -e "${GREEN}🎉 배포 완료!${NC}"
echo -e "${GREEN}웹사이트 주소: https://$DOMAIN${NC}"
echo -e "${GREEN}관리자 페이지: https://$DOMAIN/admin${NC}"

echo -e "${BLUE}서비스 상태 확인:${NC}"
pm2 status
sudo systemctl status nginx
sudo systemctl status postgresql

echo -e "${YELLOW}다음 단계:${NC}"
echo "1. https://$DOMAIN 접속하여 웹사이트 확인"
echo "2. 관리자 계정 설정 (필요시)"
echo "3. DNS 설정 확인"
echo "4. 이메일 설정 완료 (선택사항)"

echo -e "${GREEN}배포가 성공적으로 완료되었습니다! 🚀${NC}"