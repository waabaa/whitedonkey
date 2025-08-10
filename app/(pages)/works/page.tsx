"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function WorksPage() {
  const projects = [
    {
      id: 1,
      title: "중소기업 온라인몰 매출 300% 증가",
      category: "AI 마케팅 자동화",
      description: "3개월간 AI 마케팅 자동화 시스템 도입으로 온라인 매출 300% 증가, 고객 획득 비용 60% 절감 달성",
      results: ["매출 300% 증가", "CAC 60% 절감", "ROI 450% 달성"],
      client: "스마트홈 용품 전문몰",
      image: "📈",
      year: "2024"
    },
    {
      id: 2,
      title: "카페 프랜차이즈 지역 마케팅 성공",
      category: "로컬 비즈니스 마케팅",
      description: "AI 기반 지역 타겟팅으로 새 매장 오픈 3개월 만에 목표 매출 150% 달성, 고객 재방문율 85% 기록",
      results: ["목표 매출 150% 달성", "재방문율 85%", "브랜드 인지도 200% 상승"],
      client: "프리미엄 카페 프랜차이즈",
      image: "☕",
      year: "2024"
    },
    {
      id: 3,
      title: "뷰티 브랜드 SNS 마케팅 혁신",
      category: "SNS 마케팅 관리",
      description: "AI 콘텐츠 자동 생성 및 최적 타이밍 배포로 팔로워 500% 증가, 브랜드 참여도 400% 개선",
      results: ["팔로워 500% 증가", "참여도 400% 개선", "매출 연동 250% 향상"],
      client: "국내 독립 뷰티 브랜드",
      image: "💄",
      year: "2024"
    },
    {
      id: 4,
      title: "전자상거래 SEO 최적화 성과",
      category: "SEO/AEO 최적화",
      description: "AI 기반 SEO 최적화로 검색 순위 평균 15위 상승, 자연 유입 트래픽 400% 증가 및 전환율 개선",
      results: ["검색 순위 평균 15위 상승", "자연 유입 400% 증가", "전환율 180% 개선"],
      client: "종합 온라인 쇼핑몰",
      image: "🔍",
      year: "2024"
    },
    {
      id: 5,
      title: "레스토랑 체인 YouTube 마케팅",
      category: "YouTube 영상 마케팅",
      description: "AI 생성 콘텐츠와 자동 업로드로 구독자 10만명 달성, 매장별 예약 건수 평균 250% 증가",
      results: ["구독자 10만명 달성", "예약 건수 250% 증가", "브랜드 노출 500% 향상"],
      client: "프리미엄 레스토랑 체인",
      image: "🍽️",
      year: "2024"
    },
    {
      id: 6,
      title: "피트니스 센터 스테이블코인 결제",
      category: "블록체인 결제 시스템",
      description: "스테이블코인 자동 결제 시스템 도입으로 결제 편의성 개선, 회원 유지율 40% 증가 및 해외 회원 확보",
      results: ["회원 유지율 40% 증가", "해외 회원 200% 증가", "결제 수수료 70% 절감"],
      client: "프리미엄 피트니스 체인",
      image: "💪",
      year: "2023"
    }
  ];

  const categories = ["전체", "AI 마케팅 자동화", "로컬 비즈니스", "SNS 마케팅", "SEO 최적화", "블록체인 결제"];

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
            성공 <span className="text-gradient">레퍼런스</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            흰당나귀와 함께한 소상공인들의 놀라운 성장 이야기를 확인해보세요.<br/>
            AI 마케팅 자동화로 실제로 달성한 성과들입니다.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "전체" ? "default" : "outline"}
              className={category === "전체" 
                ? "bg-primary text-primary-foreground neon-glow" 
                : "border-primary/20 text-muted-foreground hover:border-primary hover:text-primary"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 smooth-transition"
              >
                {/* Project Image */}
                <div className="aspect-[4/3] bg-muted/20 flex items-center justify-center group-hover:bg-muted/30 smooth-transition">
                  <div className="text-6xl opacity-60 group-hover:opacity-80 group-hover:scale-110 smooth-transition">
                    {project.image}
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium group-hover:text-primary smooth-transition">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Client Info */}
                  <div className="bg-muted/20 rounded-lg p-3 border border-primary/10">
                    <div className="text-xs text-primary font-medium mb-1">업체명</div>
                    <div className="text-sm font-medium">{project.client}</div>
                  </div>
                  
                  {/* Results */}
                  <div className="space-y-2">
                    <div className="text-xs text-primary font-medium">주요 성과</div>
                    <div className="space-y-1">
                      {project.results.map((result, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-light text-center mb-16">전체 성과 요약</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "120+", title: "성공적인 캐페인", desc: "AI 마케팅 자동화 성공 사례" },
              { number: "350%", title: "평균 매출 증가", desc: "전체 클라이언트 평균 성장률" },
              { number: "85%", title: "비용 절감", desc: "기존 마케팅 대비 비용 절감" },
              { number: "98%", title: "고객 만족도", desc: "서비스 종료 후 만족도 조사" }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="text-4xl font-bold text-primary">{item.number}</div>
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-light text-center mb-16">고객 후기</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "흰당나귀의 AI 마케팅 자동화로 3개월 만에 매출이 3배 늘었습니다. 정말 놀라운 결과였어요.",
                name: "김주영 대표",
                company: "스마트홈 용품 전문몰",
                rating: 5
              },
              {
                text: "지역 마케팅이 이렇게 효과적일 줄 몰랐어요. 신규 매장 오픈 후 바로 주민들에게 알려졌어요.",
                name: "박민수 점장",
                company: "프리미엄 카페 프랜차이즈",
                rating: 5
              },
              {
                text: "SNS 마케팅을 맡기고 나서 너무 편해졌어요. 팀원들이 다른 업무에 집중할 수 있게 되었습니다.",
                name: "이예은 실장",
                company: "국내 독립 뷰티 브랜드",
                rating: 5
              },
              {
                text: "SEO 최적화 후 검색 엔진에서 상위 노출되기 시작하면서 매출이 급상승했습니다.",
                name: "최영호 대표",
                company: "종합 온라인 쇼핑몰",
                rating: 5
              },
              {
                text: "YouTube 채널을 자동으로 관리해주니 너무 편리하고, 구독자도 빠르게 늘었어요.",
                name: "정준수 셔프",
                company: "프리미엄 레스토랑 체인",
                rating: 5
              },
              {
                text: "스테이블코인 결제로 해외 고객들도 많이 방문하게 되었고, 결제도 간편해졌어요.",
                name: "김승민 운영바",
                company: "프리미엄 피트니스 체인",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 smooth-transition">
                <div className="flex items-center mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-primary text-sm">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-medium text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg p-12 space-y-8">
            <h2 className="text-4xl font-light">
              당신도 이런 <span className="text-primary">성과</span>를 만들어보세요
            </h2>
            <p className="text-xl text-muted-foreground">
              성공한 소상공인들처럼 당신도 AI 마케팅 자동화로 <br/>
              비즈니스를 성장시킬 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow text-lg px-8 py-3"
              >
                <Link href="/apply">무료 상담 신청하기</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3"
              >
                <Link href="/services">서비스 상세보기</Link>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              ✓ 무료 상담 30분 ✓ 맞춤형 전략 제안 ✓ 성과 보장
            </div>
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