"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Star } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: "youtube-marketing",
      title: "YouTube 영상 마케팅 자동화",
      icon: "🎥",
      description: "AI가 자동으로 최적의 콘텐츠를 생성하고 업로드하여 YouTube 채널을 성장시킵니다.",
      features: [
        "AI 기반 영상 콘텐츠 자동 생성",
        "최적 업로드 시간 분석 및 자동 스케줄링",
        "키워드 최적화 및 SEO 자동 처리",
        "썸네일 및 제목 A/B 테스트",
        "구독자 증가 전략 자동 실행",
        "실시간 성과 분석 및 최적화"
      ],
      pricing: {
        basic: "월 50만원",
        premium: "월 150만원",
        enterprise: "맞춤 견적"
      }
    },
    {
      id: "seo-optimization",
      title: "SEO/AEO 최적화",
      icon: "🔍",
      description: "검색엔진과 AI 검색에서 최상위 노출을 위한 종합 SEO 최적화 서비스를 제공합니다.",
      features: [
        "구글/네이버 검색 최적화",
        "ChatGPT/Claude 등 AI 검색 최적화",
        "키워드 분석 및 콘텐츠 최적화",
        "기술적 SEO 개선",
        "백링크 전략 수립 및 실행",
        "검색 순위 실시간 모니터링"
      ],
      pricing: {
        basic: "월 80만원",
        premium: "월 200만원",
        enterprise: "맞춤 견적"
      }
    },
    {
      id: "sns-management",
      title: "SNS 마케팅 관리",
      icon: "📱",
      description: "인스타그램, 페이스북, 카카오톡 등 모든 SNS 채널의 통합 관리 및 자동화 서비스입니다.",
      features: [
        "콘텐츠 자동 생성 및 배포",
        "최적 타이밍 분석 및 예약 게시",
        "팔로워 증가 전략 수립",
        "댓글 및 메시지 자동 응답",
        "인플루언서 협업 매칭",
        "SNS 통합 성과 대시보드"
      ],
      pricing: {
        basic: "월 70만원",
        premium: "월 180만원",
        enterprise: "맞춤 견적"
      }
    },
    {
      id: "local-business",
      title: "로컬 비즈니스 마케팅",
      icon: "📍",
      description: "지역 기반 비즈니스를 위한 특화된 AI 마케팅 솔루션으로 지역 고객 유치를 극대화합니다.",
      features: [
        "구글 마이비즈니스 최적화",
        "지역 SEO 및 로컬 검색 노출",
        "지역별 맞춤 광고 타겟팅",
        "고객 리뷰 관리 및 평점 개선",
        "지역 이벤트 및 프로모션 자동화",
        "경쟁업체 분석 및 차별화 전략"
      ],
      pricing: {
        basic: "월 60만원",
        premium: "월 160만원",
        enterprise: "맞춤 견적"
      }
    },
    {
      id: "stable-payment",
      title: "스테이블코인 결제 시스템",
      icon: "💳",
      description: "안전하고 투명한 블록체인 기반 스테이블코인 결제 시스템으로 글로벌 거래를 지원합니다.",
      features: [
        "USDC/USDT 스테이블코인 자동 결제",
        "실시간 환율 적용 및 정산",
        "블록체인 기반 거래 투명성",
        "기존 PG사 대비 70% 수수료 절감",
        "글로벌 결제 지원",
        "자동 세금계산서 발행"
      ],
      pricing: {
        basic: "거래액의 1.5%",
        premium: "거래액의 1.0%",
        enterprise: "맞춤 견적"
      }
    },
    {
      id: "ai-consulting",
      title: "AI 마케팅 컨설팅",
      icon: "🎯",
      description: "전문 컨설턴트가 비즈니스 특성에 맞는 AI 마케팅 전략을 수립하고 실행을 지원합니다.",
      features: [
        "비즈니스 진단 및 마케팅 전략 수립",
        "AI 도구 맞춤 구축 및 최적화",
        "마케팅 팀 교육 및 역량 강화",
        "성과 측정 지표 설계",
        "지속적인 성과 모니터링",
        "월간 전략 리뷰 및 개선"
      ],
      pricing: {
        basic: "월 100만원",
        premium: "월 250만원",
        enterprise: "맞춤 견적"
      }
    }
  ];

  const packages = [
    {
      name: "스타터",
      price: "월 29만원",
      period: "",
      description: "소상공인과 스타트업을 위한 기본 패키지",
      features: [
        "1개 서비스 선택",
        "기본 설정 및 최적화",
        "월 2회 성과 리포트",
        "카카오톡 지원",
        "기본 대시보드 제공"
      ],
      popular: false
    },
    {
      name: "비즈니스",
      price: "월 79만원",
      period: "",
      description: "성장하는 중소기업을 위한 종합 패키지",
      features: [
        "3개 서비스 조합",
        "고급 AI 최적화",
        "주간 성과 리포트",
        "전화 + 화상 지원",
        "맞춤형 전략 수립",
        "전담 매니저 배정"
      ],
      popular: true
    },
    {
      name: "엔터프라이즈",
      price: "맞춤 견적",
      period: "",
      description: "대규모 기업을 위한 맞춤형 솔루션",
      features: [
        "전체 서비스 이용",
        "맞춤형 AI 모델 구축",
        "실시간 모니터링",
        "24/7 전담 지원팀",
        "월간 전략 컨설팅",
        "고급 분석 및 인사이트",
        "SLA 보장"
      ],
      popular: false
    }
  ];

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
            AI 마케팅 <span className="text-gradient">서비스</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            소상공인을 위한 AI 마케팅 자동화와 블록체인 결제 시스템으로<br/>
            비즈니스 성장을 가속화하는 혁신적인 플랫폼 서비스입니다.
          </p>
        </div>

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto mb-32">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 smooth-transition group"
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl group-hover:scale-110 smooth-transition">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl font-medium group-hover:text-primary smooth-transition">
                      {service.title}
                    </h2>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pricing */}
                  <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Starting from</span>
                      <span className="text-xl font-medium text-primary">
                        {service.pricing.basic}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Packages */}
        <section className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">요금제 <span className="text-primary">선택</span></h2>
            <p className="text-muted-foreground">
              비즈니스 규모와 예산에 맞는 최적의 요금제를 선택하세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div 
                key={pkg.name}
                className={`bg-card border rounded-lg p-8 relative ${
                  pkg.popular 
                    ? 'border-primary shadow-lg shadow-primary/10 scale-105' 
                    : 'border-border hover:border-primary/50'
                } smooth-transition`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center">
                    <h3 className="text-xl font-medium mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                      <span className="text-muted-foreground">{pkg.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-2">{pkg.description}</p>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    asChild
                    className={`w-full ${
                      pkg.popular 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 neon-glow' 
                        : 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    <Link href="/apply">서비스 신청하기</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="max-w-6xl mx-auto mb-32">
          <h2 className="text-4xl font-light text-center mb-16">서비스 진행 과정</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "무료 상담",
                description: "비즈니스 목표와 현재 상황을 파악하여 최적의 AI 마케팅 전략을 제안합니다."
              },
              {
                step: "02", 
                title: "맞춤 설계",
                description: "업종과 규모에 맞는 AI 마케팅 시스템을 설계하고 구축 계획을 수립합니다."
              },
              {
                step: "03",
                title: "시스템 구축", 
                description: "전문가 팀이 AI 마케팅 자동화 시스템을 구축하고 최적화합니다."
              },
              {
                step: "04",
                title: "운영 지원",
                description: "시스템 런칭 후 지속적인 모니터링과 개선으로 최고의 성과를 보장합니다."
              }
            ].map((item) => (
              <div key={item.step} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-light text-center mb-16">자주 묻는 질문</h2>
          <div className="space-y-6">
            {[
              {
                question: "AI 마케팅 시스템 구축은 얼마나 걸리나요?",
                answer: "서비스 종류와 복잡도에 따라 다르지만, 보통 2-4주 정도 소요됩니다. 대규모 맞춤형 솔루션의 경우 더 오래 걸릴 수 있습니다."
              },
              {
                question: "서비스 런칭 후에도 지원을 받을 수 있나요?",
                answer: "네, 모든 패키지에는 런칭 후 지원이 포함됩니다. 지속적인 최적화와 문제 해결을 위한 유지보수 플랜을 제공합니다."
              },
              {
                question: "기존 마케팅 팀과 협업이 가능한가요?",
                answer: "물론입니다! 기존 팀과의 협업을 환영하며, 기존 워크플로우에 자연스럽게 통합할 수 있습니다."
              },
              {
                question: "어떤 기술을 주로 사용하시나요?",
                answer: "최신 AI/ML 기술, 블록체인, 클라우드 플랫폼(AWS, 네이버클라우드) 등을 활용하여 최고의 성과를 만들어냅니다."
              }
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium mb-2">{item.question}</h3>
                <p className="text-muted-foreground text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg p-12 space-y-8">
            <h2 className="text-4xl font-light">
              지금 바로 <span className="text-primary">AI 마케팅</span>을 시작하세요
            </h2>
            <p className="text-xl text-muted-foreground">
              마케팅 전문가가 되지 않아도, AI가 모든 마케팅을 자동으로 처리합니다.<br/>
              첫 달 무료 체험으로 효과를 직접 확인해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow text-lg px-8 py-3"
              >
                <Link href="/apply">무료 체험 시작하기</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3"
              >
                <Link href="/contact">전문가 상담받기</Link>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              ✓ 첫 달 무료 체험 ✓ 언제든 해지 가능 ✓ 전담 매니저 배정
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
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