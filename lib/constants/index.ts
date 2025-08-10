export const APP_CONFIG = {
  name: process.env.APP_NAME || "흰당나귀 (White Donkey)",
  description: "AI 마케팅 자동화와 블록체인 결제 시스템으로 소상공인의 성장을 돕는 플랫폼",
  url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  adminEmail: process.env.ADMIN_EMAIL || "support@whitedonkey.co.kr"
} as const;

export const PROJECT_TYPES = {
  youtube: "YouTube 영상 마케팅 자동화",
  seo: "SEO/AEO 최적화", 
  sns: "SNS 마케팅 관리",
  local: "로컬 비즈니스 마케팅",
  payment: "스테이블코인 결제 시스템",
  consulting: "AI 마케팅 컨설팅"
} as const;

export const BUDGET_RANGES = {
  under_10m: "월 50만원 미만",
  "range_10m_50m": "월 50만원 ~ 100만원",
  "range_50m_100m": "월 100만원 ~ 200만원",
  "range_100m_500m": "월 200만원 ~ 500만원",
  over_500m: "월 500만원 이상"
} as const;

export const APPLICATION_STATUS = {
  PENDING: "검토 대기",
  REVIEWING: "검토 중",
  APPROVED: "승인",
  REJECTED: "거절",
  ON_HOLD: "보류"
} as const;

export const PRIORITY_LEVELS = {
  LOW: "낮음",
  MEDIUM: "보통",
  HIGH: "높음", 
  URGENT: "긴급"
} as const;

export const ADMIN_ROLES = {
  SUPER_ADMIN: "최고 관리자",
  ADMIN: "관리자",
  MODERATOR: "운영자"
} as const;

export const FILE_UPLOAD_CONFIG = {
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "5242880"), // 5MB
  maxFiles: 5,
  allowedTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "image/webp"
  ],
  uploadDir: process.env.UPLOAD_DIR || "./uploads"
} as const;

export const RATE_LIMIT_CONFIG = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15분
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100")
} as const;

export const API_ROUTES = {
  // Public API
  APPLICATIONS: "/api/applications",
  APPLICATION_CHECK: "/api/applications/check", 
  NOTICES: "/api/notices",
  UPLOAD: "/api/upload",
  
  // Admin API
  ADMIN_AUTH: "/api/admin/auth",
  ADMIN_APPLICATIONS: "/api/admin/applications",
  ADMIN_NOTICES: "/api/admin/notices",
  ADMIN_DASHBOARD: "/api/admin/dashboard"
} as const;