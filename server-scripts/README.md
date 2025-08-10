# 🐴 흰당나귀 서버 설정 스크립트

완전 자동화된 서버 배포 스크립트 모음입니다.

## 🚀 빠른 시작

### 🔧 Node.js 충돌 문제가 있는 경우 (권장)
```bash
# 저장소 업데이트 후 서버에서 실행
cd /var/www/whitedonkey
git pull origin main

# 문제 해결 및 자동 설치 (한 번에 모든 문제 해결)
chmod +x server-scripts/quick-fix.sh
sudo ./server-scripts/quick-fix.sh
```

### 전체 자동 설치 (Node.js 문제 없는 경우)
```bash
# 저장소 클론 후 서버에서 실행
git clone https://github.com/waabaa/whitedonkey.git /var/www/whitedonkey
cd /var/www/whitedonkey

# 모든 설정을 한 번에 실행
chmod +x server-scripts/00-complete-setup.sh
sudo ./server-scripts/00-complete-setup.sh
```

### Node.js 문제만 해결하는 경우
```bash
# Node.js/npm 충돌 문제만 해결
chmod +x server-scripts/fix-nodejs-npm.sh
sudo ./server-scripts/fix-nodejs-npm.sh
```

### 단계별 설치
```bash
# 1단계: 서버 환경 설정
./server-scripts/01-server-setup.sh

# 2단계: 데이터베이스 설정
./server-scripts/02-database-setup.sh

# 3단계: 서비스 활성화
./server-scripts/03-service-activation.sh
```

## 📁 스크립트 구성

| 파일명 | 설명 | 실행시간 |
|--------|------|----------|
| `quick-fix.sh` | 🔧 **Node.js 충돌 해결 + 전체 설치** | ~20-25분 |
| `fix-nodejs-npm.sh` | 🔧 Node.js/npm 충돌 문제만 해결 | ~3-5분 |
| `00-complete-setup.sh` | 🎯 전체 자동화 스크립트 | ~15-20분 |
| `01-server-setup.sh` | 🔧 시스템 패키지 및 서비스 설치 | ~5-8분 |
| `02-database-setup.sh` | 🗄️ PostgreSQL 설정 및 Prisma 마이그레이션 | ~3-5분 |
| `03-service-activation.sh` | 🚀 Next.js 빌드 및 PM2/Nginx 설정 | ~5-7분 |
| `health-check.sh` | 🏥 서비스 상태 확인 (자동 생성됨) | ~30초 |

## ⚙️ 설치되는 구성요소

### 시스템 패키지
- **Node.js** (LTS 버전)
- **PostgreSQL** (최신 안정 버전)
- **Nginx** (웹서버/리버스프록시)
- **PM2** (프로세스 관리자)
- **Certbot** (SSL 인증서)
- **보안 도구** (UFW, Fail2Ban)

### 애플리케이션
- **Next.js** 프로덕션 빌드
- **Prisma** 데이터베이스 ORM
- **자동 백업** 시스템
- **로그 로테이션** 설정
- **헬스체크** 모니터링

## 🔧 설정 정보

### 환경변수 (.env)
```bash
DATABASE_URL="postgresql://whitedonkey:password@localhost:5432/whitedonkey_db"
NEXTAUTH_SECRET="auto-generated-secret"
NEXTAUTH_URL="https://whitedonkey.ktenterprise.net"
NODE_ENV=production
PORT=3000
```

### 서비스 포트
- **Next.js 애플리케이션**: 3000
- **HTTP**: 80
- **HTTPS**: 443
- **PostgreSQL**: 5432

### 중요 디렉토리
```
/var/www/whitedonkey/          # 애플리케이션 루트
/var/log/whitedonkey/          # 애플리케이션 로그
/var/log/nginx/                # Nginx 로그
/etc/nginx/sites-available/    # Nginx 설정
/var/backups/whitedonkey/      # 자동 백업
```

## 🛠️ 관리 명령어

### 서비스 관리
```bash
# PM2 상태 확인
pm2 list

# PM2 로그 확인
pm2 logs whitedonkey

# 서비스 재시작
pm2 restart whitedonkey

# 서비스 중지/시작
pm2 stop whitedonkey
pm2 start whitedonkey
```

### 데이터베이스 관리
```bash
# 데이터베이스 접속
PGPASSWORD='password' psql -h localhost -U whitedonkey -d whitedonkey_db

# 백업 생성
pg_dump -h localhost -U whitedonkey whitedonkey_db > backup.sql

# 백업 복원
PGPASSWORD='password' psql -h localhost -U whitedonkey -d whitedonkey_db < backup.sql

# Prisma 마이그레이션
npx prisma migrate deploy
```

### 웹서버 관리
```bash
# Nginx 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl reload nginx

# SSL 인증서 갱신
sudo certbot renew
```

## 🏥 모니터링 및 문제해결

### 헬스체크 실행
```bash
# 수동 헬스체크
./server-scripts/health-check.sh

# 로그 확인
tail -f /var/log/whitedonkey-health.log
```

### 일반적인 문제 해결

#### 1. 서비스가 시작되지 않는 경우
```bash
# PM2 로그 확인
pm2 logs whitedonkey --lines 50

# 환경변수 확인
cd /var/www/whitedonkey
cat .env

# 포트 사용 확인
sudo netstat -tlnp | grep :3000
```

#### 2. 데이터베이스 연결 오류
```bash
# PostgreSQL 상태 확인
sudo systemctl status postgresql

# 데이터베이스 연결 테스트
export $(grep -v '^#' /var/www/whitedonkey/.env | xargs)
npx prisma db execute --stdin <<< "SELECT 1;"
```

#### 3. Nginx 설정 오류
```bash
# 설정 파일 검증
sudo nginx -t

# 에러 로그 확인
sudo tail -f /var/log/nginx/whitedonkey.error.log
```

#### 4. SSL 인증서 문제
```bash
# 인증서 상태 확인
sudo certbot certificates

# 수동 갱신
sudo certbot renew --force-renewal
```

## 🔄 업데이트 및 배포

### 코드 업데이트
```bash
# 기존 update-server.sh 사용
./server-configs/update-server.sh

# 또는 수동 업데이트
git pull origin main
npm ci --production
npm run build
pm2 restart whitedonkey
```

### 백업 및 복원
```bash
# 전체 백업 (자동으로 실행됨)
tar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz \
    --exclude=node_modules --exclude=.next --exclude=uploads .

# 복원
tar -xzf backup_YYYYMMDD_HHMMSS.tar.gz
```

## 🔐 보안 설정

### 방화벽 (UFW)
- SSH (22) - 허용
- HTTP (80) - 허용  
- HTTPS (443) - 허용
- Custom (3000) - 허용 (개발용)

### Fail2Ban
- SSH 무차별 대입 공격 방지
- HTTP 플러딩 방지

### SSL/TLS
- Let's Encrypt 자동 인증서
- 강력한 암호화 설정
- HSTS 헤더 적용

## 🆘 지원 및 문의

### 로그 위치
- 애플리케이션: `/var/log/whitedonkey-*.log`
- 웹서버: `/var/log/nginx/whitedonkey.*.log`
- 시스템: `/var/log/syslog`

### 긴급 복구
```bash
# 서비스 전체 재시작
sudo systemctl restart postgresql nginx
pm2 restart all

# 마지막 백업으로 복원
cd /var/backups/whitedonkey
ls -la # 최신 백업 확인
tar -xzf backup_LATEST.tar.gz -C /var/www/whitedonkey/
```

---

**🐴 흰당나귀 AI 마케팅 플랫폼**  
버전: 1.0.0  
문의: support@whitedonkey.co.kr