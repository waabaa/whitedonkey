"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function AboutPage() {
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
            회사소개 <span className="text-gradient">흰당나귀</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            흰당나귀는 AI 마케팅과 블록체인 기술을 결합한 혁신적인 협력 플랫폼입니다.<br/>
            혁신적인 비즈니스와 최첨단 기술 솔루션을 연결하여 새로운 가치를 창출합니다.
          </p>
        </div>

        {/* Story Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-light">우리의 이야기</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  2021년 설립된 흰당나귀는 AI 마케팅 자동화와 블록체인 스테이블 코인 결제를 
                  결합한 세계 최고 수준의 협력 플랫폼을 만들겠다는 비전에서 시작되었습니다.
                </p>
                <p>
                  업계 리더들이 AI의 지능과 블록체인의 보안성 및 투명성을 활용할 수 있는 
                  통합 플랫폼의 필요성을 인식하면서 우리의 여정이 시작되었습니다.
                </p>
                <p>
                  오늘날 우리는 전략적 파트너십과 혁신적인 기술 솔루션을 통해 기업과 
                  혁신가들이 미래를 구축할 수 있도록 지원하고 있습니다.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-muted/20 rounded-lg border border-primary/20 flex items-center justify-center">
                <div className="text-8xl opacity-50">🚀</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-light text-center mb-16">핵심 가치</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-medium">기술 혁신</h3>
              <p className="text-muted-foreground">
                AI와 블록체인의 융합을 선도하며, 업계 표준을 정의하는 
                차세대 솔루션을 만들어갑니다.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-medium">전략적 파트너십</h3>
              <p className="text-muted-foreground">
                기업들과 지속 가능한 파트너십을 구축하고, 협력적 생태계 
                개발을 통해 혁신을 촉진합니다.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-medium">플랫폼 우수성</h3>
              <p className="text-muted-foreground">
                우리 플랫폼은 미션 크리티컬 애플리케이션을 위한 엔터프라이즈급 
                신뢰성, 보안성, 확장성을 제공합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-light text-center mb-16">핵심 팀</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "김지현", role: "최고기술책임자 (CTO)", icon: "👩‍💻" },
              { name: "박민수", role: "AI 연구개발 총괄", icon: "🧠" },
              { name: "이승우", role: "블록체인 아키텍트", icon: "⛓️" }
            ].map((member, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="w-32 h-32 bg-muted/20 rounded-full flex items-center justify-center mx-auto border border-primary/20 group-hover:border-primary/50 smooth-transition">
                  <span className="text-4xl">{member.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">다수</div>
              <div className="text-muted-foreground">AI 마케팅 캠페인 성공</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">다양한</div>
              <div className="text-muted-foreground">협력 파트너사</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">높은</div>
              <div className="text-muted-foreground">스테이블 코인 거래량</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">안정적</div>
              <div className="text-muted-foreground">서비스 가용성</div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-light mb-8 text-center">연락처 정보</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">이메일</div>
                  <div className="text-muted-foreground">contact@whitedonkey.co.kr</div>
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">전화번호</div>
                  <div className="text-muted-foreground">+82 2-1234-5678</div>
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">본사 위치</div>
                  <div className="text-muted-foreground">서울특별시 강남구</div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
              >
                <Link href="/apply">협력 신청하기</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}