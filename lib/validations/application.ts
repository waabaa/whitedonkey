import { z } from "zod";

export const ApplicationSubmitSchema = z.object({
  // 기업 정보
  companyName: z
    .string()
    .min(1, "회사명을 입력해주세요")
    .max(100, "회사명은 100자 이하로 입력해주세요")
    .trim(),
  
  contactName: z
    .string()
    .min(1, "담당자명을 입력해주세요")
    .max(50, "담당자명은 50자 이하로 입력해주세요")
    .trim(),
  
  contactEmail: z
    .string()
    .email("올바른 이메일 주소를 입력해주세요")
    .max(100, "이메일은 100자 이하로 입력해주세요"),
  
  contactPhone: z
    .string()
    .regex(/^[0-9-+\s()]+$/, "올바른 전화번호를 입력해주세요")
    .max(20, "전화번호는 20자 이하로 입력해주세요"),

  // 비즈니스 정보
  projectTitle: z
    .string()
    .min(1, "업종을 입력해주세요")
    .max(200, "업종은 200자 이하로 입력해주세요")
    .trim(),
  
  projectType: z.enum([
    "youtube",
    "seo", 
    "sns",
    "local",
    "payment",
    "consulting"
  ]).refine((val) => val !== undefined, {
    message: "원하는 서비스를 선택해주세요"
  }),
  
  description: z
    .string()
    .min(10, "현재 마케팅 상황과 목표를 최소 10자 이상 입력해주세요")
    .max(5000, "내용은 5000자 이하로 입력해주세요"),
  
  budgetRange: z.enum([
    "under_10m",
    "range_10m_50m",
    "range_50m_100m",
    "range_100m_500m", 
    "over_500m"
  ]).refine((val) => val !== undefined, {
    message: "예산 범위를 선택해주세요"
  }),
  
  timeline: z
    .string()
    .min(1, "희망 시작 시기를 입력해주세요")
    .max(100, "시작 시기는 100자 이하로 입력해주세요"),

  // 마케팅 요구사항
  aiRequirements: z
    .string()
    .min(10, "현재 마케팅 현황을 최소 10자 이상 입력해주세요")
    .max(2000, "마케팅 현황은 2000자 이하로 입력해주세요"),
  
  blockchainNeeds: z
    .string()
    .min(10, "해결하고 싶은 마케팅 과제를 최소 10자 이상 입력해주세요")
    .max(2000, "마케팅 과제는 2000자 이하로 입력해주세요"),

  // 첨부파일
  attachmentIds: z
    .array(z.string().cuid())
    .max(5, "첨부파일은 최대 5개까지 업로드 가능합니다")
    .optional()
    .default([])
});

export const ApplicationCheckSchema = z.object({
  applicationId: z
    .string()
    .min(1, "신청서 ID를 입력해주세요")
    .max(50, "올바른 신청서 ID를 입력해주세요")
});

export const AdminApplicationUpdateSchema = z.object({
  status: z.enum([
    "PENDING",
    "REVIEWING", 
    "APPROVED",
    "REJECTED",
    "ON_HOLD"
  ]).optional(),
  
  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH", 
    "URGENT"
  ]).optional(),
  
  adminNotes: z
    .string()
    .max(5000, "관리자 메모는 5000자 이하로 입력해주세요")
    .optional()
});

export type ApplicationSubmitRequest = z.infer<typeof ApplicationSubmitSchema>;
export type ApplicationCheckRequest = z.infer<typeof ApplicationCheckSchema>;
export type AdminApplicationUpdateRequest = z.infer<typeof AdminApplicationUpdateSchema>;