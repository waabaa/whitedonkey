"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { ApplicationSubmitSchema, type ApplicationSubmitRequest } from "@/lib/validations/application";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/lib/constants";
import { Loader2, CheckCircle } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface ApplicationFormProps {
  onSubmit: (data: ApplicationSubmitRequest) => Promise<void>;
  isLoading?: boolean;
}

export function ApplicationForm({ onSubmit, isLoading = false }: ApplicationFormProps) {
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const searchParams = useSearchParams();

  // Service mapping for URL parameters to form values
  const serviceMapping = {
    'youtube-marketing': 'youtube',
    'seo-optimization': 'seo', 
    'sns-management': 'sns',
    'local-business': 'local',
    'stable-payment': 'payment',
    'ai-consulting': 'consulting'
  } as const;

  // Get default service from URL parameter
  const serviceParam = searchParams?.get('service') as keyof typeof serviceMapping | null;
  const defaultProjectType = serviceParam && serviceMapping[serviceParam] ? serviceMapping[serviceParam] : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<ApplicationSubmitRequest>({
    resolver: zodResolver(ApplicationSubmitSchema) as any,
    defaultValues: {
      attachmentIds: [],
      projectType: defaultProjectType,
    },
    mode: "onChange",
  });

  // Set default service when component mounts if coming from service inquiry
  React.useEffect(() => {
    if (defaultProjectType) {
      setValue("projectType", defaultProjectType);
    }
  }, [defaultProjectType, setValue]);

  const projectType = watch("projectType");
  const budgetRange = watch("budgetRange");

  // Update attachmentIds when uploadedFiles change
  React.useEffect(() => {
    setValue("attachmentIds", uploadedFiles.map(file => file.id));
  }, [uploadedFiles, setValue]);

  const handleFileUpload = async (files: File[]): Promise<string[]> => {
    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`파일 업로드 실패: ${file.name}`);
        }

        const result = await response.json();
        return result;
      });

      const uploadResults = await Promise.all(uploadPromises);
      
      // Add uploaded files to state
      const newFiles = uploadResults.map((result) => ({
        id: result.id,
        name: result.filename,
        size: result.size,
        type: result.mimeType,
        url: result.url,
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);
      return uploadResults.map(result => result.id);
    } catch (error) {
      console.error("File upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileRemove = async (fileId: string) => {
    try {
      // Call delete API
      await fetch(`/api/upload/${fileId}`, {
        method: "DELETE",
      });

      // Remove from state
      setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    } catch (error) {
      console.error("파일 삭제 실패:", error);
    }
  };

  const handleFormSubmit = async (data: ApplicationSubmitRequest) => {
    try {
      await onSubmit(data);
      // Reset form on successful submission
      reset();
      setUploadedFiles([]);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const getServiceDisplayName = (serviceId: string) => {
    const serviceNames = {
      'youtube-marketing': 'YouTube 영상 마케팅 자동화',
      'seo-optimization': 'SEO/AEO 최적화',
      'sns-management': 'SNS 마케팅 관리', 
      'local-business': '로컬 비즈니스 마케팅',
      'stable-payment': '스테이블코인 결제 시스템',
      'ai-consulting': 'AI 마케팅 컨설팅'
    };
    return serviceNames[serviceId as keyof typeof serviceNames] || '협력 신청';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-light mb-8">
          {serviceParam ? (
            <span>
              <span className="text-gradient">{getServiceDisplayName(serviceParam)}</span> 문의서
            </span>
          ) : (
            <>
              협력 <span className="text-gradient">신청서</span>
            </>
          )}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {serviceParam ? (
            <>
              {getServiceDisplayName(serviceParam)} 서비스 문의서를 작성해주세요.<br/>
              전담 매니저가 24시간 이내에 연락드립니다.
            </>
          ) : (
            <>
              흰당나귀 AI 마케팅 자동화 서비스 신청서를 작성해주세요.<br/>
              전담 매니저가 24시간 이내에 연락드립니다.
            </>
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* 기업 정보 섹션 */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-6 hover:border-primary/20 smooth-transition">
          <h2 className="text-2xl font-light flex items-center">
            <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold mr-4">
              1
            </span>
            기업 정보
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">
                회사명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                placeholder="회사명을 입력해주세요"
                {...register("companyName")}
                className={errors.companyName ? "border-red-500" : ""}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">{errors.companyName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">
                담당자명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactName"
                placeholder="담당자명을 입력해주세요"
                {...register("contactName")}
                className={errors.contactName ? "border-red-500" : ""}
              />
              {errors.contactName && (
                <p className="text-sm text-red-500">{errors.contactName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">
                이메일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="contact@company.com"
                {...register("contactEmail")}
                className={errors.contactEmail ? "border-red-500" : ""}
              />
              {errors.contactEmail && (
                <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">
                전화번호 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPhone"
                placeholder="010-1234-5678"
                {...register("contactPhone")}
                className={errors.contactPhone ? "border-red-500" : ""}
              />
              {errors.contactPhone && (
                <p className="text-sm text-red-500">{errors.contactPhone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* 비즈니스 정보 섹션 */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-6 hover:border-primary/20 smooth-transition">
          <h2 className="text-2xl font-light flex items-center">
            <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold mr-4">
              2
            </span>
            비즈니스 정보
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="businessType">
                업종 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="businessType"
                placeholder="예: 온라인쇼핑몰, 카페, 뷰티샵, 레스토랑 등"
                {...register("projectTitle")}
                className={errors.projectTitle ? "border-red-500" : ""}
              />
              {errors.projectTitle && (
                <p className="text-sm text-red-500">{errors.projectTitle.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  희망 서비스 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={projectType}
                  onValueChange={(value) => setValue("projectType", value as "youtube" | "seo" | "sns" | "local" | "payment" | "consulting")}
                >
                  <SelectTrigger className={errors.projectType ? "border-red-500" : ""}>
                    <SelectValue placeholder="원하는 서비스를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PROJECT_TYPES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.projectType && (
                  <p className="text-sm text-red-500">{errors.projectType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  예산 범위 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={budgetRange}
                  onValueChange={(value) => setValue("budgetRange", value as "under_10m" | "range_10m_50m" | "range_50m_100m" | "range_100m_500m" | "over_500m")}
                >
                  <SelectTrigger className={errors.budgetRange ? "border-red-500" : ""}>
                    <SelectValue placeholder="예산 범위를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BUDGET_RANGES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.budgetRange && (
                  <p className="text-sm text-red-500">{errors.budgetRange.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">
                희망 시작 시기 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="timeline"
                placeholder="예: 즉시, 1주일 후, 1개월 후"
                {...register("timeline")}
                className={errors.timeline ? "border-red-500" : ""}
              />
              {errors.timeline && (
                <p className="text-sm text-red-500">{errors.timeline.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                현재 마케팅 상황 및 목표 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="현재 비즈니스 상황, 마케팅 현황, 달성하고 싶은 목표를 구체적으로 작성해주세요. 예: 현재 월매출 1000만원, SNS 팔로워 부족, 온라인 매출 2배 증가 목표 (최소 10자)"
                rows={5}
                {...register("description")}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* 마케팅 요구사항 섹션 */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-6 hover:border-primary/20 smooth-transition">
          <h2 className="text-2xl font-light flex items-center">
            <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold mr-4">
              3
            </span>
            마케팅 요구사항
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="aiRequirements">
                현재 마케팅 현황 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="aiRequirements"
                placeholder="현재 진행 중인 마케팅 방법, 사용 중인 툴, 월 마케팅 예산, 주요 고객층 등을 구체적으로 작성해주세요 (최소 10자)"
                rows={4}
                {...register("aiRequirements")}
                className={errors.aiRequirements ? "border-red-500" : ""}
              />
              {errors.aiRequirements && (
                <p className="text-sm text-red-500">{errors.aiRequirements.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="blockchainNeeds">
                해결하고 싶은 마케팅 과제 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="blockchainNeeds"
                placeholder="현재 겪고 있는 마케팅 문제점, 개선하고 싶은 부분, 달성하고 싶은 목표 등을 구체적으로 작성해주세요 (최소 10자)"
                rows={4}
                {...register("blockchainNeeds")}
                className={errors.blockchainNeeds ? "border-red-500" : ""}
              />
              {errors.blockchainNeeds && (
                <p className="text-sm text-red-500">{errors.blockchainNeeds.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* 첨부파일 섹션 */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-6 hover:border-primary/20 smooth-transition">
          <h2 className="text-2xl font-light flex items-center">
            <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold mr-4">
              4
            </span>
            첨부파일
          </h2>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              사업자등록증, 회사소개서, 기존 마케팅 자료, 브랜드 가이드라인 등을 첨부해주세요. (선택사항)
            </p>
            
            <FileUpload
              onUpload={handleFileUpload}
              onRemove={handleFileRemove}
              uploadedFiles={uploadedFiles}
              disabled={isLoading || isUploading}
            />
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-center pt-12">
          <Button
            type="submit"
            size="lg"
            disabled={isLoading || isUploading || !isValid}
            className="min-w-[250px] bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                제출 중...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                신청서 제출하기
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}