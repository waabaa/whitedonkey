"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { 
  Send,
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  Briefcase,
  Target,
  Calculator,
  Calendar,
  FileText,
  Sparkles,
  Puzzle
} from "lucide-react";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/lib/constants";
import { ApplicationSubmitRequest } from "@/lib/validations/application";

export default function ApplyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ApplicationSubmitRequest>({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    projectTitle: "",
    projectType: "youtube",
    description: "",
    budgetRange: "under_10m",
    timeline: "",
    aiRequirements: "",
    blockchainNeeds: "",
    attachmentIds: []
  });

  const handleInputChange = (field: keyof ApplicationSubmitRequest, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '신청서 제출에 실패했습니다.');
      }

      toast.success(
        `협력 신청서가 성공적으로 제출되었습니다!\n신청번호: ${result.applicationId}`,
        { duration: 5000 }
      );
      
      // Redirect to a thank you page or home
      router.push(`/?submitted=${result.applicationId}`);

    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(
        error instanceof Error ? error.message : '신청서 제출 중 오류가 발생했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative w-8 h-8 md:w-10 md:h-10 bg-slate-800 rounded-lg p-1 md:p-1.5 shadow-lg">
              <Image
                src="/logo-white-donkey.png"
                alt="흰당나귀"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-gradient">흰당나귀</span>
          </Link>
          
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>돌아가기</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-light">협력 신청</h1>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground">
                AI 마케팅 자동화로 함께 성장하세요
              </p>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information Section */}
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <Building2 className="w-5 h-5 text-primary mr-3" />
                  <h2 className="text-xl font-semibold">기업 정보</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-medium flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      회사명 *
                    </label>
                    <Input
                      id="companyName"
                      placeholder="회사명을 입력해주세요"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contactName" className="text-sm font-medium flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      담당자명 *
                    </label>
                    <Input
                      id="contactName"
                      placeholder="담당자명을 입력해주세요"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      required
                      maxLength={50}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contactEmail" className="text-sm font-medium flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      이메일 *
                    </label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@company.com"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contactPhone" className="text-sm font-medium flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      연락처 *
                    </label>
                    <Input
                      id="contactPhone"
                      placeholder="010-1234-5678"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      required
                      maxLength={20}
                    />
                  </div>
                </div>
              </div>

              {/* Business Information Section */}
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <Briefcase className="w-5 h-5 text-primary mr-3" />
                  <h2 className="text-xl font-semibold">비즈니스 정보</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="projectTitle" className="text-sm font-medium flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        업종/사업 분야 *
                      </label>
                      <Input
                        id="projectTitle"
                        placeholder="예: 온라인 쇼핑몰 운영"
                        value={formData.projectTitle}
                        onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                        required
                        maxLength={200}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="projectType" className="text-sm font-medium flex items-center">
                        <Sparkles className="w-4 h-4 mr-2" />
                        원하는 서비스 *
                      </label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => handleInputChange('projectType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="서비스를 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(PROJECT_TYPES).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="budgetRange" className="text-sm font-medium flex items-center">
                        <Calculator className="w-4 h-4 mr-2" />
                        예산 범위 *
                      </label>
                      <Select
                        value={formData.budgetRange}
                        onValueChange={(value) => handleInputChange('budgetRange', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="예산 범위를 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(BUDGET_RANGES).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="timeline" className="text-sm font-medium flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        희망 시작 시기 *
                      </label>
                      <Input
                        id="timeline"
                        placeholder="예: 즉시, 2024년 3월, 협의 후"
                        value={formData.timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        required
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      사업 설명 및 목표 *
                    </label>
                    <Textarea
                      id="description"
                      placeholder="현재 운영하고 있는 사업에 대해 설명하고, 마케팅을 통해 달성하고 싶은 목표를 구체적으로 작성해주세요."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      required
                      maxLength={5000}
                      rows={4}
                      className="resize-none"
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {formData.description.length} / 5,000자
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketing Requirements Section */}
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <Puzzle className="w-5 h-5 text-primary mr-3" />
                  <h2 className="text-xl font-semibold">마케팅 상세 정보</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="aiRequirements" className="text-sm font-medium flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      현재 마케팅 현황 및 어려움 *
                    </label>
                    <Textarea
                      id="aiRequirements"
                      placeholder="현재 마케팅을 어떻게 하고 계시나요? 어떤 부분에서 어려움을 겪고 계시는지 자세히 설명해주세요."
                      value={formData.aiRequirements}
                      onChange={(e) => handleInputChange('aiRequirements', e.target.value)}
                      required
                      maxLength={2000}
                      rows={4}
                      className="resize-none"
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {formData.aiRequirements.length} / 2,000자
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="blockchainNeeds" className="text-sm font-medium flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      해결하고 싶은 마케팅 과제 *
                    </label>
                    <Textarea
                      id="blockchainNeeds"
                      placeholder="AI 마케팅 자동화를 통해 해결하고 싶은 구체적인 과제나 달성하고 싶은 목표를 작성해주세요."
                      value={formData.blockchainNeeds}
                      onChange={(e) => handleInputChange('blockchainNeeds', e.target.value)}
                      required
                      maxLength={2000}
                      rows={4}
                      className="resize-none"
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {formData.blockchainNeeds.length} / 2,000자
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 md:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">신청서 제출</h3>
                  <p className="text-sm text-muted-foreground">
                    제출하신 내용을 검토한 후 24시간 이내에 연락드리겠습니다.
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="px-8 py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        제출 중...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        협력 신청서 제출
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {/* Contact Information */}
            <div className="mt-12 p-6 bg-muted/30 border border-border rounded-lg">
              <h3 className="font-semibold mb-3 text-center">문의사항이 있으신가요?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-center">
                <div>
                  <div className="font-medium mb-1">이메일</div>
                  <a 
                    href="mailto:support@whitedonkey.co.kr"
                    className="text-primary hover:underline"
                  >
                    support@whitedonkey.co.kr
                  </a>
                </div>
                <div>
                  <div className="font-medium mb-1">전화</div>
                  <a href="tel:1588-1234" className="text-primary hover:underline">
                    1588-1234
                  </a>
                </div>
                <div>
                  <div className="font-medium mb-1">운영시간</div>
                  <div className="text-muted-foreground">
                    평일 09:00-18:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-8">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo and Brand */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative w-16 h-16 md:w-12 md:h-12 bg-slate-800 rounded-lg p-2 shadow-lg">
                <Image
                  src="/logo-white-donkey.png"
                  alt="흰당나귀"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-xl font-bold text-gradient mb-1">흰당나귀</h3>
                <p className="text-base md:text-sm text-muted-foreground">AI 마케팅 자동화 플랫폼</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <Link href="/notice" className="hover:text-primary transition-colors">공지사항</Link>
              <span className="cursor-pointer hover:text-primary transition-colors">개인정보처리방침</span>
              <span className="cursor-pointer hover:text-primary transition-colors">이용약관</span>
              <span className="cursor-pointer hover:text-primary transition-colors">협력문의</span>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm text-muted-foreground">
              <div>© 2024 흰당나귀 (White Donkey). All rights reserved.</div>
              <div className="mt-2 text-xs">Powered by AI Technology & Blockchain Innovation</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}