# 흰당나귀 (White Donkey) AI 마케팅 플랫폼

소상공인을 위한 AI 마케팅 자동화와 블록체인 결제 시스템

## 🚀 프로젝트 개요

흰당나귀는 소상공인과 중소기업을 위한 AI 마케팅 자동화 플랫폼입니다. AI 기술과 블록체인 결제 시스템을 통해 마케팅 효율성을 극대화하고 비용을 절감합니다.

### 주요 서비스
- 🎥 **YouTube 영상 마케팅 자동화**: AI 기반 콘텐츠 생성 및 최적화
- 🔍 **SEO/AEO 최적화**: 검색엔진 및 AI 검색 최적화
- 📱 **SNS 마케팅 관리**: 통합 소셜미디어 마케팅 자동화
- 📍 **로컬 비즈니스 마케팅**: 지역 기반 마케팅 솔루션
- 💳 **스테이블코인 결제 시스템**: 블록체인 기반 안전한 결제
- 🎯 **AI 마케팅 컨설팅**: 전문가 컨설팅 서비스

## 🛠️ 기술 스택

### Frontend & Backend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Zod** (데이터 검증)

### 데이터베이스
- **PostgreSQL**
- **Prisma ORM**

### 인증 & 보안
- **NextAuth.js** (관리자 인증)
- **bcryptjs** (비밀번호 해시)
- **Rate Limiting** (API 보호)
- **CSRF 보호**

### UI & UX
- **Radix UI** (접근성 우선 컴포넌트)
- **Framer Motion** (애니메이션)
- **React Hot Toast** (알림)
- **Lucide React** (아이콘)

## 📁 프로젝트 구조

```
white-donkey-platform/
├── app/
│   ├── (public)/           # 공개 라우트
│   │   ├── page.tsx       # 랜딩 페이지
│   │   ├── apply/         # 협력 신청
│   │   ├── check/         # 신청 조회
│   │   └── notice/        # 공지사항
│   ├── admin/             # 관리자 영역
│   │   ├── login/         # 관리자 로그인
│   │   ├── dashboard/     # 대시보드
│   │   └── applications/  # 신청서 관리
│   └── api/               # API 라우트
├── components/
│   ├── ui/                # 기본 UI 컴포넌트
│   ├── forms/             # 폼 컴포넌트
│   ├── landing/           # 랜딩 페이지 컴포넌트
│   └── admin/             # 관리자 컴포넌트
├── lib/
│   ├── auth.ts            # NextAuth 설정
│   ├── prisma.ts          # Prisma 클라이언트
│   ├── utils.ts           # 유틸리티 함수
│   ├── constants/         # 상수 정의
│   └── validations/       # Zod 스키마
├── prisma/
│   ├── schema.prisma      # 데이터베이스 스키마
│   └── seed.ts            # 시드 데이터
└── types/                 # TypeScript 타입 정의
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example`을 참고하여 `.env` 파일을 생성하고 필요한 환경 변수를 설정하세요.

```bash
# 필수 환경 변수
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. 데이터베이스 설정

```bash
# Prisma 클라이언트 생성
npm run db:generate

# 데이터베이스 마이그레이션
npm run db:migrate

# 시드 데이터 삽입 (선택사항)
npm run db:seed
```

### 4. 개발 서버 실행

```bash
npm run dev
```

애플리케이션이 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📊 데이터베이스 스키마

### 주요 모델
- **Application**: 협력 신청서 데이터
- **Admin**: 관리자 계정
- **Notice**: 공지사항
- **Attachment**: 첨부파일
- **Session**: 관리자 세션

### 주요 Enum
- **ApplicationStatus**: PENDING, REVIEWING, APPROVED, REJECTED, ON_HOLD
- **ProjectType**: youtube, seo, sns, local, payment, consulting
- **BudgetRange**: under_10m, 10m_50m, 50m_100m, 100m_500m, over_500m (월 요금제 기준)

## 🔒 보안 기능

- **비밀번호 해시**: bcryptjs를 사용한 안전한 비밀번호 저장
- **Rate Limiting**: API 남용 방지를 위한 요청 제한
- **CSRF 보호**: Cross-Site Request Forgery 공격 방지
- **파일 업로드 보안**: 파일 타입 검증 및 크기 제한
- **입력값 검증**: Zod를 통한 데이터 유효성 검사

## 🎯 주요 기능

### 공개 기능
- **랜딩 페이지**: AI 마케팅 서비스 소개 및 주요 기능 안내
- **서비스 신청**: AI 마케팅 서비스 온라인 신청
- **신청 조회**: 신청서 ID를 통한 처리 상태 확인
- **공지사항**: 플랫폼 관련 공지사항 및 업데이트 소식

### 관리자 기능
- **관리자 로그인**: NextAuth.js 기반 인증
- **대시보드**: 신청서 통계 및 서비스 현황
- **신청서 관리**: AI 마케팅 서비스 신청서 검토 및 관리
- **고객 관리**: 고객 정보 및 서비스 이용 현황
- **공지사항 관리**: 서비스 공지 및 업데이트 관리

## 🛠️ 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 검사
npm run lint

# 데이터베이스 관련
npm run db:generate    # Prisma 클라이언트 생성
npm run db:migrate     # 마이그레이션 실행
npm run db:push        # 스키마 푸시
npm run db:studio      # Prisma Studio 실행
npm run db:seed        # 시드 데이터 삽입
```

## 🚀 배포

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 라이선스

This project is licensed under the MIT License.

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요.

## 📞 문의

서비스 관련 문의사항이 있으시면 [support@whitedonkey.co.kr](mailto:support@whitedonkey.co.kr)으로 연락해 주세요.

- **고객센터**: 1588-1234
- **운영시간**: 평일 09:00-18:00 (점심시간 12:00-13:00)
- **이메일**: support@whitedonkey.co.kr

---

© 2024 흰당나귀(White Donkey) Co., Ltd. AI 마케팅 자동화로 소상공인의 성장을 돕는 플랫폼.