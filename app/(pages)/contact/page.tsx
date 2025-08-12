"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({}); // Clear previous errors

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || '문의가 성공적으로 접수되었습니다!');
        
        // Reset form and errors
        setFormData({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: ""
        });
        setFieldErrors({});
      } else {
        // Handle field-specific errors
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
          toast.error(data.details || '입력 정보를 확인해주세요.');
        } else {
          toast.error(data.error || '문의 접수 중 오류가 발생했습니다.');
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ""
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background */}
      <div className="fixed inset-0 grid-bg geometric-pattern" />
      
      {/* Navigation */}
      <nav className="relative z-50 px-8 py-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
          </Button>
          <div className="text-2xl font-bold">
            <span className="text-primary">🐴</span> 흰당나귀
          </div>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
            asChild
          >
            <Link href="/apply">협력 신청</Link>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-8 py-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-light mb-8">
            협력 <span className="text-gradient">문의</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            AI 마케팅 자동화로 비즈니스를 성장시킬 준비가 되셨나요?<br/>
            흰당나귀와 함께 새로운 성공 스토리를 만들어보세요.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light mb-4">협력 문의하기</h2>
                <p className="text-muted-foreground">
                  협력 문의를 보내주시면 24시간 이내에 전담 매니저가 연락드립니다.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      성함 *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="홍길동"
                      required
                      className={`bg-card border-border focus:border-primary ${
                        fieldErrors.name 
                          ? 'border-red-500 focus:border-red-500 bg-red-50/5' 
                          : ''
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      이메일 주소 *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@company.co.kr"
                      required
                      className={`bg-card border-border focus:border-primary ${
                        fieldErrors.email 
                          ? 'border-red-500 focus:border-red-500 bg-red-50/5' 
                          : ''
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    회사명/사업장명
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="(주)홍길동컴퍼니"
                    className={`bg-card border-border focus:border-primary ${
                      fieldErrors.company 
                        ? 'border-red-500 focus:border-red-500 bg-red-50/5' 
                        : ''
                    }`}
                  />
                  {fieldErrors.company && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.company}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    문의 제목 *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="AI 마케팅 자동화 협력 문의"
                    required
                    className={`bg-card border-border focus:border-primary ${
                      fieldErrors.subject 
                        ? 'border-red-500 focus:border-red-500 bg-red-50/5' 
                        : ''
                    }`}
                  />
                  {fieldErrors.subject && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    문의 내용 *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="현재 비즈니스 상황과 AI 마케팅 자동화를 통해 해결하고 싶은 과제를 구체적으로 적어주세요. 예: 온라인 매출 증대, 고객 획득 비용 절감, SNS 마케팅 자동화 등"
                    rows={6}
                    required
                    className={`bg-card border-border focus:border-primary resize-none ${
                      fieldErrors.message 
                        ? 'border-red-500 focus:border-red-500 bg-red-50/5' 
                        : ''
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.message}</p>
                  )}
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className={`w-4 h-4 mr-2 ${isSubmitting ? 'animate-spin' : ''}`} />
                  {isSubmitting ? '전송 중...' : '협력 문의 보내기'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light mb-4">빠른 상담이 필요하신가요?</h2>
                <p className="text-muted-foreground">
                  궁금한 점이 있으시면 언제든 다양한 채널로 연락주세요. 전문 상담을 지원해드립니다.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 smooth-transition">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">이메일 문의</h3>
                      <p className="text-muted-foreground">contact@whitedonkey.co.kr</p>
                      <p className="text-muted-foreground">support@whitedonkey.co.kr</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 smooth-transition">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">전화 상담</h3>
                      <p className="text-muted-foreground">1588-1234 (대표전화)</p>
                      <p className="text-muted-foreground">02-1234-5678 (상담전용)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 smooth-transition">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">내방 방문</h3>
                      <p className="text-muted-foreground">서울특별시 강남구</p>
                      <p className="text-muted-foreground">테헤란로 123, 15층</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 smooth-transition">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">상담 가능 시간</h3>
                      <p className="text-muted-foreground">평일: 오전 9:00 - 오후 6:00</p>
                      <p className="text-muted-foreground">주말: 오전 10:00 - 오후 4:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-4">소셜 미디어</h3>
                <div className="flex items-center space-x-4">
                  {[
                    { name: "카카오톡", icon: "💬", url: "#" },
                    { name: "네이버 블로그", icon: "📝", url: "#" },
                    { name: "인스타그램", icon: "📷", url: "#" },
                    { name: "YouTube", icon: "🎥", url: "#" }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="w-10 h-10 bg-muted/20 rounded-full flex items-center justify-center hover:bg-primary/20 hover:scale-110 smooth-transition"
                      title={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="max-w-7xl mx-auto mt-32">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-video bg-muted/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl">🏢</div>
                <p className="text-muted-foreground">강남구 테헤란로 소재 - 지하철 2호선 강남역 5번 출구</p>
                <p className="text-muted-foreground text-sm">방문 전 사전 예약을 부탁드립니다</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto mt-32">
          <h2 className="text-4xl font-light text-center mb-16">
            자주 묻는 <span className="text-primary">질문</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "보통 답변 시간은 얼마나 걸리나요?",
                answer: "영업일 기준 24시간 이내에 모든 문의에 답변드립니다. 급한 사안의 경우 전화로 직접 연락주세요."
              },
              {
                question: "무료 상담을 제공하나요?",
                answer: "네! 30분간 무료 상담을 제공하여 비즈니스 요구사항과 목표 달성을 위한 방법을 논의합니다."
              },
              {
                question: "문의 메시지에 어떤 정보를 포함해야 하나요?",
                answer: "현재 비즈니스 상황, 마케팅 과제, 예상 기간, 예산 범위, 그리고 특별히 해결하고 싶은 문제점을 자세히 알려주세요."
              },
              {
                question: "화상 통화로 상담이 가능한가요?",
                answer: "물론입니다! 자세한 프로젝트 논의를 위해 화상 통화를 선호합니다. 고객님의 일정에 맞춰 미팅을 준비할 수 있습니다."
              }
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 smooth-transition">
                <h3 className="font-medium mb-2">{item.question}</h3>
                <p className="text-muted-foreground text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center mt-32">
          <div className="bg-card border border-border rounded-lg p-12 space-y-8">
            <h2 className="text-4xl font-light">
              지금 바로 <span className="text-primary">시작</span>하세요
            </h2>
            <p className="text-xl text-muted-foreground">
              폼 작성 대신 바로 협력 신청서를 작성하여 빠른 상담을 받아보세요.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
            >
              <Link href="/apply">협력 신청서 작성하기</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="text-2xl font-bold">
                  <span className="text-primary">🐴</span> 흰당나귀
                </div>
                <p className="text-sm text-muted-foreground">
                  AI 마케팅 자동화와 블록체인 결제의<br/>
                  혁신적인 융합을 선도하는 플랫폼
                </p>
                <div className="text-sm text-muted-foreground">
                  사업자등록번호: 123-45-67890<br/>
                  통신판매업신고번호: 2024-서울강남-1234
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">서비스</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>YouTube 영상 마케팅 자동화</div>
                  <div>SEO/AEO 최적화</div>
                  <div>SNS 마케팅 관리</div>
                  <div>로컬 비즈니스 마케팅</div>
                  <div>스테이블코인 결제</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">고객지원</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>고객센터: 1588-1234</div>
                  <div>이메일: support@whitedonkey.co.kr</div>
                  <div>운영시간: 평일 09:00-18:00</div>
                  <div>점심시간: 12:00-13:00</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">회사정보</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>본사: 서울특별시 강남구 테헤란로</div>
                  <div>설립: 2021년</div>
                  <div>대표이사: 김성훈</div>
                  <div>개인정보보호책임자: 이영희</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                <div>© 2024 흰당나귀(White Donkey) Co., Ltd. All rights reserved.</div>
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                  <span>개인정보처리방침</span>
                  <span>이용약관</span>
                  <span>사업자정보확인</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}