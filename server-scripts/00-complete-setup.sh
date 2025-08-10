#!/bin/bash

# 🎯 흰당나귀 완전 자동화 서버 설정 스크립트
# 이 스크립트는 모든 설정을 한 번에 실행합니다
# 
# 실행방법:
# 1. chmod +x server-scripts/00-complete-setup.sh
# 2. ./server-scripts/00-complete-setup.sh
#
# 또는 개별 실행:
# ./server-scripts/01-server-setup.sh
# ./server-scripts/02-database-setup.sh  
# ./server-scripts/03-service-activation.sh

set -e

# 색깔 출력 함수
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# 로고 출력
print_logo() {
    echo -e "${CYAN}"
    echo "██╗    ██╗██╗  ██╗██╗████████╗███████╗    ██████╗  ██████╗ ███╗   ██╗██╗  ██╗███████╗██╗   ██╗"
    echo "██║    ██║██║  ██║██║╚══██╔══╝██╔════╝    ██╔══██╗██╔═══██╗████╗  ██║██║ ██╔╝██╔════╝╚██╗ ██╔╝"
    echo "██║ █╗ ██║███████║██║   ██║   █████╗      ██║  ██║██║   ██║██╔██╗ ██║█████╔╝ █████╗   ╚████╔╝ "
    echo "██║███╗██║██╔══██║██║   ██║   ██╔══╝      ██║  ██║██║   ██║██║╚██╗██║██╔═██╗ ██╔══╝    ╚██╔╝  "
    echo "╚███╔███╔╝██║  ██║██║   ██║   ███████╗    ██████╔╝╚██████╔╝██║ ╚████║██║  ██╗███████╗   ██║   "
    echo " ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝   ╚═╝   "
    echo ""
    echo "                              🐴 AI 마케팅 플랫폼 서버 설정 🐴"
    echo -e "${NC}"
}

# 진행상황 표시 함수
show_progress() {
    local current=$1
    local total=$2
    local message=$3
    local percentage=$((current * 100 / total))
    
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}📊 진행상황: $current/$total ($percentage%) - $message${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# 메인 함수
main() {
    print_logo
    
    echo -e "${GREEN}🚀 흰당나귀 AI 마케팅 플랫폼 자동 설정을 시작합니다!${NC}"
    echo ""
    
    # 사용자 확인
    read -p "계속 진행하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "설치가 취소되었습니다."
        exit 1
    fi
    
    # 현재 디렉토리 확인
    if [ ! -d "/var/www/whitedonkey" ]; then
        echo -e "${RED}❌ /var/www/whitedonkey 디렉토리를 찾을 수 없습니다.${NC}"
        echo "현재 디렉토리에서 실행하시겠습니까? (현재: $(pwd))"
        read -p "계속하시겠습니까? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "설치가 취소되었습니다."
            exit 1
        fi
    fi
    
    # 스크립트 실행 권한 설정
    chmod +x server-scripts/*.sh
    
    # 시작 시간 기록
    START_TIME=$(date +%s)
    
    # 1단계: 서버 환경 설정
    show_progress 1 3 "서버 환경 설정"
    echo -e "${YELLOW}🔧 시스템 패키지 및 서비스 설치 중...${NC}"
    if ./server-scripts/01-server-setup.sh; then
        echo -e "${GREEN}✅ 서버 환경 설정 완료!${NC}"
    else
        echo -e "${RED}❌ 서버 환경 설정 실패!${NC}"
        exit 1
    fi
    
    echo ""
    read -p "계속하려면 Enter를 누르세요..." -n 1 -s
    echo ""
    
    # 2단계: 데이터베이스 설정
    show_progress 2 3 "데이터베이스 설정"
    echo -e "${YELLOW}🗄️ PostgreSQL 데이터베이스 설정 중...${NC}"
    if ./server-scripts/02-database-setup.sh; then
        echo -e "${GREEN}✅ 데이터베이스 설정 완료!${NC}"
    else
        echo -e "${RED}❌ 데이터베이스 설정 실패!${NC}"
        exit 1
    fi
    
    echo ""
    read -p "계속하려면 Enter를 누르세요..." -n 1 -s
    echo ""
    
    # 3단계: 서비스 활성화
    show_progress 3 3 "서비스 활성화"
    echo -e "${YELLOW}🚀 웹 서비스 활성화 중...${NC}"
    if ./server-scripts/03-service-activation.sh; then
        echo -e "${GREEN}✅ 서비스 활성화 완료!${NC}"
    else
        echo -e "${RED}❌ 서비스 활성화 실패!${NC}"
        exit 1
    fi
    
    # 완료 시간 계산
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))
    MINUTES=$((DURATION / 60))
    SECONDS=$((DURATION % 60))
    
    # 완료 메시지
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 흰당나귀 AI 마케팅 플랫폼 설치가 완료되었습니다! 🎉${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${CYAN}⏱️  총 설치 시간: ${MINUTES}분 ${SECONDS}초${NC}"
    echo ""
    echo -e "${YELLOW}📍 중요 정보:${NC}"
    echo "   🌐 웹사이트: http://whitedonkey.ktenterprise.net"
    echo "   📊 서버 상태: pm2 list"
    echo "   📝 로그 확인: pm2 logs whitedonkey"
    echo "   🔄 서비스 재시작: pm2 restart whitedonkey"
    echo ""
    echo -e "${YELLOW}📁 중요 파일 위치:${NC}"
    echo "   🔧 환경설정: .env"
    echo "   🗄️ 데이터베이스 정보: database-info.txt"
    echo "   📋 PM2 설정: ecosystem.config.js"
    echo "   ⚙️  Nginx 설정: /etc/nginx/sites-available/whitedonkey"
    echo ""
    echo -e "${YELLOW}🛠️  유용한 명령어:${NC}"
    echo "   헬스체크: ./server-scripts/health-check.sh"
    echo "   업데이트: ./server-configs/update-server.sh"
    echo "   SSL 갱신: sudo certbot renew"
    echo ""
    
    # 최종 상태 확인
    echo -e "${CYAN}🔍 최종 서비스 상태 확인 중...${NC}"
    sleep 3
    
    # 웹사이트 접속 테스트
    if curl -f -s http://localhost:3000 > /dev/null; then
        echo -e "${GREEN}✅ 로컬 서비스 정상 동작${NC}"
    else
        echo -e "${RED}❌ 로컬 서비스 확인 실패${NC}"
    fi
    
    # PM2 상태 확인
    if pm2 list | grep -q "online"; then
        echo -e "${GREEN}✅ PM2 프로세스 정상 실행${NC}"
    else
        echo -e "${RED}❌ PM2 프로세스 확인 필요${NC}"
    fi
    
    # PostgreSQL 연결 확인
    if systemctl is-active --quiet postgresql; then
        echo -e "${GREEN}✅ PostgreSQL 서비스 정상${NC}"
    else
        echo -e "${RED}❌ PostgreSQL 서비스 확인 필요${NC}"
    fi
    
    # Nginx 상태 확인
    if systemctl is-active --quiet nginx; then
        echo -e "${GREEN}✅ Nginx 서비스 정상${NC}"
    else
        echo -e "${RED}❌ Nginx 서비스 확인 필요${NC}"
    fi
    
    echo ""
    echo -e "${PURPLE}🐴 흰당나귀와 함께 성공적인 AI 마케팅을 시작하세요! 🚀${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# 에러 핸들링
trap 'echo -e "${RED}❌ 스크립트 실행 중 오류가 발생했습니다. 로그를 확인해주세요.${NC}"; exit 1' ERR

# 메인 실행
main "$@"