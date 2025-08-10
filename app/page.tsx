"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AIPartnersSection } from "@/components/ui/ai-partners-section";
import { Header } from "@/components/layout/header";
import { 
  InnovationIcon, 
  PartnershipIcon, 
  ExcellenceIcon, 
  ProjectIcon, 
  PaymentIcon, 
  AchievementIcon, 
  GlobalIcon,
  TechTeamIcon,
  MarketingTeamIcon,
  OperationTeamIcon,
  BusinessTeamIcon 
} from "@/components/icons/feature-icons";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { id: "home", label: "홈" },
    { id: "about", label: "회사소개" },
    { id: "demo", label: "플랫폼 시연" },
    { id: "services", label: "AI 마케팅 서비스" },
    { id: "references", label: "레퍼런스" },
    { id: "faq", label: "FAQ" }
  ];

  const services = [
    "마케팅 자동화",
    "데이터 파트너십", 
    "스테이블 결제",
    "투자 기회",
    "공동 개발",
    "기술 컨설팅"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.floor(scrollPosition / windowHeight);
      setCurrentSection(Math.min(sectionIndex, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const scrollToSection = (index: number) => {
    const headerHeight = 80; // Account for fixed header height
    const targetSection = document.getElementById(sections[index].id);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    } else {
      // Fallback to viewport height calculation if section not found
      window.scrollTo({
        top: index * window.innerHeight - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  // Hero Interactive Geometry Component with Donkey Logo Animation
  function HeroInteractiveGeometry() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);

      const handleMouseMove = (e: MouseEvent) => {
        const rect = document.getElementById('hero-interactive-geometry')?.getBoundingClientRect();
        if (rect) {
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setMousePosition({ x, y });
        }
      };

      const element = document.getElementById('hero-interactive-geometry');
      if (element) {
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseenter', () => setIsHovered(true));
        element.addEventListener('mouseleave', () => setIsHovered(false));
        
        return () => {
          element.removeEventListener('mousemove', handleMouseMove);
          element.removeEventListener('mouseenter', () => setIsHovered(true));
          element.removeEventListener('mouseleave', () => setIsHovered(false));
        };
      }
    }, []);

    return (
      <div 
        id="hero-interactive-geometry"
        className="w-80 h-80 lg:w-96 lg:h-96 mx-auto relative cursor-crosshair overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 0, 0.15) 0%, rgba(0, 255, 0, 0.08) 40%, rgba(0, 255, 0, 0.02) 80%, transparent 100%)`
        }}
      >
        {/* Dynamic background that follows mouse */}
        <div 
          className="absolute inset-0 opacity-50 transition-all duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 0, 0.1) 0%, transparent 60%)`
          }}
        />

        {/* Animated White Donkey Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`relative transition-all duration-500 ${isHovered ? 'animate-donkey-jump' : ''}`}
            style={isMounted ? {
              transform: `translate(${(mousePosition.x - 50) * 0.2}px, ${(mousePosition.y - 50) * 0.2}px) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`
            } : {}}
          >
            {/* Geometric interpretation of donkey */}
            <div className="relative">
              {/* Body - elliptical shape */}
              <div 
                className={`w-20 h-16 bg-slate-800/80 rounded-full border-2 border-primary/40 shadow-lg ${isHovered ? 'animate-pulse' : ''}`}
                style={isMounted ? {
                  boxShadow: `0 0 20px rgba(0, 255, 0, ${0.3 + (mousePosition.x + mousePosition.y) * 0.003})`,
                  transform: `rotate(${Math.sin(mousePosition.x * 0.02) * 2}deg)`
                } : {}}
              >
                {/* Inner logo */}
                <div className="absolute inset-2 flex items-center justify-center">
                  <Image
                    src="/logo-white-donkey.png"
                    alt="흰당나귀"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain opacity-90"
                    priority
                  />
                </div>
              </div>

              {/* Legs - animated geometric lines */}
              <div className="absolute -bottom-2 left-2">
                <div 
                  className={`w-1 h-6 bg-primary/60 rounded-full ${isHovered ? 'animate-leg-kick' : 'animate-bounce-slow'}`}
                  style={{ animationDelay: '0ms' }}
                />
              </div>
              <div className="absolute -bottom-2 left-5">
                <div 
                  className={`w-1 h-6 bg-primary/60 rounded-full ${isHovered ? 'animate-leg-kick' : 'animate-bounce-slow'}`}
                  style={{ animationDelay: '100ms' }}
                />
              </div>
              <div className="absolute -bottom-2 right-5">
                <div 
                  className={`w-1 h-6 bg-primary/60 rounded-full ${isHovered ? 'animate-leg-kick' : 'animate-bounce-slow'}`}
                  style={{ animationDelay: '200ms' }}
                />
              </div>
              <div className="absolute -bottom-2 right-2">
                <div 
                  className={`w-1 h-6 bg-primary/60 rounded-full ${isHovered ? 'animate-leg-kick' : 'animate-bounce-slow'}`}
                  style={{ animationDelay: '300ms' }}
                />
              </div>

              {/* Ears - triangular shapes */}
              <div className="absolute -top-2 left-3">
                <div 
                  className={`w-3 h-6 bg-primary/40 transform rotate-12 origin-bottom ${isHovered ? 'animate-ear-wiggle' : ''}`}
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
              </div>
              <div className="absolute -top-2 right-3">
                <div 
                  className={`w-3 h-6 bg-primary/40 transform -rotate-12 origin-bottom ${isHovered ? 'animate-ear-wiggle' : ''}`}
                  style={{ 
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    animationDelay: '150ms'
                  }}
                />
              </div>

              {/* Tail - curved line */}
              <div className="absolute -right-3 top-4">
                <div 
                  className={`w-8 h-1 bg-primary/50 rounded-full transform origin-left ${isHovered ? 'animate-tail-wag' : ''}`}
                  style={{ transform: 'rotate(-20deg)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Outer rotating ring with mouse influence */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin-slow"
          style={isMounted ? {
            transform: `rotate(${mousePosition.x * 0.3}deg)`,
            transition: 'transform 0.5s ease-out'
          } : {}}
        >
          <div 
            className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400/60 rounded-full animate-pulse"
            style={isMounted ? {
              transform: `scale(${1 + (mousePosition.y - 50) * 0.002})`
            } : {}}
          />
          <div 
            className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400/60 rounded-full animate-pulse delay-300"
            style={isMounted ? {
              transform: `scale(${1 + (mousePosition.x - 50) * 0.002})`
            } : {}}
          />
        </div>
        
        {/* Geometric snowflake patterns (from the logo) */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`snowflake-${i}`}
            className="absolute animate-float"
            style={{
              left: `${20 + (i * 60 / 6)}%`,
              top: `${15 + (i * 70 / 6)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.5}s`
            }}
          >
            <div 
              className={`w-2 h-2 bg-blue-400/40 ${isHovered ? 'animate-sparkle' : ''}`}
              style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                transform: `rotate(${i * 60}deg)`,
                ...(isMounted && {
                  transform: `rotate(${i * 60 + mousePosition.x * 0.5}deg) scale(${1 + Math.sin(mousePosition.y * 0.02 + i) * 0.3})`
                })
              }}
            />
          </div>
        ))}
        
        {/* Floating particles that react to mouse */}
        {[
          { top: 10, left: 10, delay: 0 },
          { top: 20, right: 15, delay: 150 },
          { bottom: 20, left: 20, delay: 300 },
          { bottom: 10, right: 10, delay: 450 }
        ].map((particle, i) => (
          <div 
            key={i}
            className={`absolute w-1 h-1 bg-primary/60 rounded-full animate-particle-drift`}
            style={{
              ...particle,
              animationDelay: `${particle.delay}ms`,
              ...(isMounted && {
                transform: `translate(${Math.sin(mousePosition.x * 0.02 + i) * 8}px, ${Math.cos(mousePosition.y * 0.02 + i) * 8}px)`
              })
            }}
          />
        ))}

        {/* Mouse-following energy trails */}
        {isHovered && [...Array(8)].map((_, i) => (
          <div
            key={`trail-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${20 + i * 5}px)`,
              transition: 'all 0.3s ease-out',
            }}
          >
            <div 
              className={`w-0.5 h-4 bg-gradient-to-t from-primary/80 to-transparent rounded-full animate-pulse`}
              style={{ animationDelay: `${i * 50}ms` }}
            />
          </div>
        ))}

        {/* Interactive connecting lines to donkey */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(0, 255, 0)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(0, 255, 0)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {[...Array(4)].map((_, i) => (
            <line
              key={`hero-line-${i}`}
              x1={`${25 + i * 15}%`}
              y1={`${25 + i * 15}%`}
              x2="50%"
              y2="50%"
              stroke="url(#heroLineGradient)"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </svg>
      </div>
    );
  }

  // Interactive Geometry Component for "Our Story" section
  function InteractiveGeometry() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }); // Default center position
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      // Set mounted flag to enable client-side only features
      setIsMounted(true);

      const handleMouseMove = (e: MouseEvent) => {
        const rect = document.getElementById('interactive-geometry')?.getBoundingClientRect();
        if (rect) {
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setMousePosition({ x, y });
        }
      };

      const element = document.getElementById('interactive-geometry');
      if (element) {
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseenter', () => setIsHovered(true));
        element.addEventListener('mouseleave', () => setIsHovered(false));
        
        return () => {
          element.removeEventListener('mousemove', handleMouseMove);
          element.removeEventListener('mouseenter', () => setIsHovered(true));
          element.removeEventListener('mouseleave', () => setIsHovered(false));
        };
      }
    }, []);

    return (
      <div 
        id="interactive-geometry"
        className="w-full h-80 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 flex items-center justify-center overflow-hidden cursor-crosshair relative"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 0, 0.15) 0%, rgba(0, 255, 0, 0.05) 50%, rgba(0, 255, 0, 0.02) 100%)`
        }}
      >
        {/* Dynamic background gradient that follows mouse */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 0, 0.1) 0%, transparent 70%)`
          }}
        />

        {/* Central orbiting system */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Main central sphere */}
          <div 
            className={`absolute w-20 h-20 bg-primary/20 rounded-full animate-pulse ${isHovered ? 'animate-morph' : ''}`}
            style={isMounted ? {
              transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`
            } : {}}
          >
            <div className="absolute inset-2 bg-primary/30 rounded-full animate-pulse delay-150" />
            <div className="absolute inset-4 bg-primary/40 rounded-full animate-pulse delay-300" />
          </div>

          {/* Orbiting geometric shapes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-orbit"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + i * 2}s`,
                transform: `rotate(${i * 60}deg) translateX(${80 + i * 10}px) rotate(-${i * 60}deg)`
              }}
            >
              <div 
                className={`w-3 h-3 ${
                  i % 3 === 0 ? 'bg-blue-500/40 rounded-full' : 
                  i % 3 === 1 ? 'bg-green-500/40 rounded-sm transform rotate-45' :
                  'bg-purple-500/40 rounded-full'
                } animate-float`}
                style={isMounted ? {
                  animationDelay: `${i * 0.3}s`,
                  transform: `scale(${1 + Math.sin(mousePosition.x * 0.01 + i) * 0.2})`
                } : {
                  animationDelay: `${i * 0.3}s`
                }}
              />
            </div>
          ))}

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute animate-particle-drift"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${10 + (i * 11) % 80}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${10 + (i % 5) * 2}s`
              }}
            >
              <div 
                className={`w-1 h-1 ${
                  i % 4 === 0 ? 'bg-primary/60' :
                  i % 4 === 1 ? 'bg-blue-400/50' :
                  i % 4 === 2 ? 'bg-green-400/50' :
                  'bg-purple-400/50'
                } rounded-full animate-pulse`}
                style={isMounted ? {
                  transform: `translate(${Math.sin(mousePosition.x * 0.02 + i) * 10}px, ${Math.cos(mousePosition.y * 0.02 + i) * 10}px)`
                } : {}}
              />
            </div>
          ))}

          {/* Pulse rings */}
          {isHovered && [...Array(3)].map((_, i) => (
            <div
              key={`ring-${i}`}
              className="absolute border border-primary/30 rounded-full animate-pulse-ring"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}

          {/* Dynamic connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(0, 255, 0)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(0, 255, 0)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {[...Array(5)].map((_, i) => (
              <line
                key={`line-${i}`}
                x1={`${20 + i * 15}%`}
                y1={`${20}%`}
                x2={`${mousePosition.x}%`}
                y2={`${mousePosition.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                className="animate-pulse"
              />
            ))}
          </svg>

          {/* Corner geometric elements */}
          <div className="absolute top-4 left-4 w-4 h-4 border-2 border-primary/40 transform rotate-45 animate-bounce-slow" />
          <div className="absolute top-4 right-4 w-3 h-3 bg-primary/50 rounded-full animate-float delay-150" />
          <div className="absolute bottom-4 left-4 w-5 h-5 bg-gradient-to-br from-blue-500/30 to-transparent rounded-sm animate-morph delay-300" />
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-400/60 rounded-full animate-particle-drift delay-450" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 grid-bg geometric-pattern" />
      
      {/* Header */}
      <Header 
        sections={sections}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
      />

      {/* Side Navigation Dots */}
      <div className="nav-dots hidden lg:block">
        <div className="flex flex-col space-y-4">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className={`w-2 h-2 rounded-full smooth-transition ${
                currentSection === index 
                  ? 'bg-primary scale-150' 
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
      </div>


      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative py-8 pt-16">
          <div className="container mx-auto px-8 grid lg:grid-cols-2 gap-6 items-center">
            {/* Text Content */}
            <div className="space-y-4">
              <div className="text-sm text-primary font-medium uppercase tracking-wider flex items-center">
                <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                AI 마케팅과 블록체인이 만나는 새로운 협력의 시작
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight">
                흰당나귀
                <br />
                <span className="text-gradient">White Donkey</span>
              </h1>
              
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">진행중인</div>
                  <div className="text-sm text-muted-foreground">파트너십</div>
                </div>
              </div>
            </div>
            
            {/* Interactive Geometric Background */}
            <div className="relative">
              <HeroInteractiveGeometry />
            </div>
          </div>
        </section>

        {/* Services Tags */}
        <section className="py-6 border-t border-border">
          <div className="container mx-auto px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <div className="container mx-auto px-8">
            {/* Company Introduction */}
            <div className="max-w-4xl mx-auto text-center space-y-8 mb-20">
              <h2 className="text-4xl md:text-5xl font-light">About <span className="text-primary">흰당나귀</span></h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                흰당나귀는 AI 마케팅 자동화와 블록체인 스테이블 코인 결제를 결합한 
                혁신적인 협력 플랫폼입니다. 데이터 기반 마케팅과 안전한 결제 시스템으로 
                비즈니스 성장을 가속화합니다.
              </p>
              <div className="grid md:grid-cols-3 gap-8 pt-8">
                <div className="space-y-3">
                  <div className="text-3xl md:text-4xl font-bold text-primary">다수</div>
                  <div className="text-muted-foreground">AI Solutions Deployed</div>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl md:text-4xl font-bold text-primary">다수</div>
                  <div className="text-muted-foreground">Strategic Partners</div>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl md:text-4xl font-bold text-primary">높은</div>
                  <div className="text-muted-foreground">Platform Volume</div>
                </div>
              </div>
            </div>

            {/* Our Story */}
            <div className="max-w-6xl mx-auto mb-20">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h3 className="text-3xl md:text-4xl font-light">우리의 이야기</h3>
                  <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <p>
                      흰당나귀는 AI 마케팅 자동화와 블록체인 스테이블 코인 결제를 
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
                  <InteractiveGeometry />
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="max-w-6xl mx-auto mb-20">
              <h3 className="text-3xl md:text-4xl font-light text-center mb-16">핵심 가치</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-4 group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:border-blue-500/40 smooth-transition">
                    <InnovationIcon className="w-8 h-8 text-blue-500" />
                  </div>
                  <h4 className="text-xl font-semibold group-hover:text-blue-500 smooth-transition">기술 혁신</h4>
                  <p className="text-muted-foreground">
                    AI와 블록체인의 융합을 선도하며, 업계 표준을 정의하는 
                    차세대 솔루션을 만들어갑니다.
                  </p>
                </div>
                <div className="text-center space-y-4 group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:border-green-500/40 smooth-transition">
                    <PartnershipIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-semibold group-hover:text-green-500 smooth-transition">전략적 파트너십</h4>
                  <p className="text-muted-foreground">
                    기업들과 지속 가능한 파트너십을 구축하고, 협력적 생태계 
                    개발을 통해 혁신을 촉진합니다.
                  </p>
                </div>
                <div className="text-center space-y-4 group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:border-purple-500/40 smooth-transition">
                    <ExcellenceIcon className="w-8 h-8 text-purple-500" />
                  </div>
                  <h4 className="text-xl font-semibold group-hover:text-purple-500 smooth-transition">플랫폼 우수성</h4>
                  <p className="text-muted-foreground">
                    우리 플랫폼은 미션 크리티컬 애플리케이션을 위한 엔터프라이즈급 
                    신뢰성, 보안성, 확장성을 제공합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Organization Structure */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-light text-center mb-16">조직 구조</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { 
                    name: "기술개발팀", 
                    role: "AI/블록체인 기술 개발", 
                    gradient: "from-blue-500/10 to-blue-600/5", 
                    color: "text-blue-500",
                    icon: TechTeamIcon
                  },
                  { 
                    name: "마케팅팀", 
                    role: "AI 마케팅 솔루션 기획", 
                    gradient: "from-green-500/10 to-green-600/5", 
                    color: "text-green-500",
                    icon: MarketingTeamIcon
                  },
                  { 
                    name: "운영팀", 
                    role: "플랫폼 운영 및 관리", 
                    gradient: "from-purple-500/10 to-purple-600/5", 
                    color: "text-purple-500",
                    icon: OperationTeamIcon
                  },
                  { 
                    name: "사업개발팀", 
                    role: "파트너십 및 비즈니스 개발", 
                    gradient: "from-orange-500/10 to-orange-600/5", 
                    color: "text-orange-500",
                    icon: BusinessTeamIcon
                  }
                ].map((team, index) => (
                  <div key={index} className="text-center space-y-4 group">
                    <div className={`w-24 h-24 bg-gradient-to-br ${team.gradient} rounded-xl flex items-center justify-center mx-auto border border-primary/20 group-hover:border-primary/50 group-hover:scale-110 smooth-transition`}>
                      <team.icon className={`w-12 h-12 ${team.color}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{team.name}</h4>
                      <p className="text-muted-foreground text-sm">{team.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Partners Section */}
        <AIPartnersSection />

        {/* Demo Section */}
        <section id="demo" className="py-24">
          <div className="container mx-auto px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light mb-6">플랫폼 <span className="text-primary">시연</span></h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  실제 작동하는 AI 마케팅 솔루션을 영상으로 확인해보세요
                </p>
              </div>
              
              {/* YouTube Demo Videos */}
              <div className="grid lg:grid-cols-2 gap-8 mb-16">
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/YiCYYF3JQPo?si=uWeW5WkRNMXBxScp&enablejsapi=1&origin=https://localhost:3000"
                      title="흰당나귀 AI 마케팅 플랫폼 시연 1"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">AI 마케팅 시연</h3>
                    <p className="text-muted-foreground">실시간 고객 분석부터 타겟팅까지 자동화 프로세스</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/GfJ8jEqtRTw?si=2lW1klt4LVZix7Jo&enablejsapi=1&origin=https://localhost:3000"
                      title="흰당나귀 플랫폼 시연 2"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">플랫폼 시연</h3>
                    <p className="text-muted-foreground">통합 AI 마케팅 소루션 사용법 안내</p>
                  </div>
                </div>
              </div>
              
              {/* Feature Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { id: 1, title: "AI 마케팅 자동화", desc: "실시간 고객 분석 및 타겟팅", gradient: "from-blue-500/10 to-blue-600/5" },
                  { id: 2, title: "스테이블 코인 결제", desc: "안전한 블록체인 결제 시스템", gradient: "from-green-500/10 to-green-600/5" },
                  { id: 3, title: "데이터 파트너십", desc: "협력사 데이터 연동 솔루션", gradient: "from-purple-500/10 to-purple-600/5" },
                  { id: 4, title: "실시간 분석", desc: "AI 기반 비즈니스 인사이트", gradient: "from-orange-500/10 to-orange-600/5" }
                ].map((feature) => (
                  <div key={feature.id} className="group cursor-pointer">
                    <div className={`p-6 bg-gradient-to-br ${feature.gradient} border border-border rounded-xl smooth-transition group-hover:border-primary group-hover:scale-105`}>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20">
                        <div className="w-6 h-6 bg-primary rounded-sm"></div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-muted/10">
          <div className="container mx-auto px-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="max-w-4xl mx-auto text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-light mb-8">
                  AI 마케팅 <span className="text-gradient">서비스</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  소상공인을 위한 AI 마케팅 자동화와 블록체인 결제 시스템으로<br/>
                  비즈니스 성장을 가속화하는 혁신적인 플랫폼 서비스입니다.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {[
                  {
                    id: "youtube-marketing",
                    title: "YouTube 영상 마케팅 자동화",
                    icon: "▶",
                    description: "AI가 자동으로 최적의 콘텐츠를 생성하고 업로드하여 YouTube 채널을 성장시킵니다.",
                    features: [
                      "AI 기반 영상 콘텐츠 자동 생성",
                      "최적 업로드 시간 분석 및 자동 스케줄링",
                      "키워드 최적화 및 SEO 자동 처리",
                      "썸네일 및 제목 A/B 테스트",
                      "구독자 증가 전략 자동 실행",
                      "실시간 성과 분석 및 최적화"
                    ]
                  },
                  {
                    id: "seo-optimization",
                    title: "SEO/AEO 최적화",
                    icon: "◉",
                    description: "검색엔진과 AI 검색에서 최상위 노출을 위한 종합 SEO 최적화 서비스를 제공합니다.",
                    features: [
                      "구글/네이버 검색 최적화",
                      "ChatGPT/Claude 등 AI 검색 최적화",
                      "키워드 분석 및 콘텐츠 최적화",
                      "기술적 SEO 개선",
                      "백링크 전략 수립 및 실행",
                      "검색 순위 실시간 모니터링"
                    ]
                  },
                  {
                    id: "sns-management",
                    title: "SNS 마케팅 관리",
                    icon: "◈",
                    description: "인스타그램, 페이스북, 카카오톡 등 모든 SNS 채널의 통합 관리 및 자동화 서비스입니다.",
                    features: [
                      "콘텐츠 자동 생성 및 배포",
                      "최적 타이밍 분석 및 예약 게시",
                      "팔로워 증가 전략 수립",
                      "댓글 및 메시지 자동 응답",
                      "인플루언서 협업 매칭",
                      "SNS 통합 성과 대시보드"
                    ]
                  },
                  {
                    id: "local-business",
                    title: "로컬 비즈니스 마케팅",
                    icon: "◎",
                    description: "지역 기반 비즈니스를 위한 특화된 AI 마케팅 솔루션으로 지역 고객 유치를 극대화합니다.",
                    features: [
                      "구글 마이비즈니스 최적화",
                      "지역 SEO 및 로컬 검색 노출",
                      "지역별 맞춤 광고 타겟팅",
                      "고객 리뷰 관리 및 평점 개선",
                      "지역 이벤트 및 프로모션 자동화",
                      "경쟁업체 분석 및 차별화 전략"
                    ]
                  },
                  {
                    id: "stable-payment",
                    title: "스테이블코인 결제 시스템",
                    icon: "⧈",
                    description: "안전하고 투명한 블록체인 기반 스테이블코인 결제 시스템으로 글로벌 거래를 지원합니다.",
                    features: [
                      "USDC/USDT 스테이블코인 자동 결제",
                      "실시간 환율 적용 및 정산",
                      "블록체인 기반 거래 투명성",
                      "기존 PG사 대비 70% 수수료 절감",
                      "글로벌 결제 지원",
                      "자동 세금계산서 발행"
                    ]
                  },
                  {
                    id: "ai-consulting",
                    title: "AI 마케팅 컨설팅",
                    icon: "◆",
                    description: "전문 컨설턴트가 비즈니스 특성에 맞는 AI 마케팅 전략을 수립하고 실행을 지원합니다.",
                    features: [
                      "비즈니스 진단 및 마케팅 전략 수립",
                      "AI 도구 맞춤 구축 및 최적화",
                      "마케팅 팀 교육 및 역량 강화",
                      "성과 측정 지표 설계",
                      "지속적인 성과 모니터링",
                      "월간 전략 리뷰 및 개선"
                    ]
                  }
                ].map((service) => (
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
                        <h3 className="text-2xl font-medium group-hover:text-primary smooth-transition">
                          {service.title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      <div className="space-y-3">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-3">
                            <div className="w-4 h-4 text-primary flex-shrink-0">
                              <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Inquiry Button */}
                      <div className="border-t border-border pt-6">
                        <Button 
                          asChild
                          className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Link href={`/apply?service=${service.id}`}>서비스 문의하기</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Process */}
              <div className="max-w-6xl mx-auto">
                <h3 className="text-4xl font-light text-center mb-16">서비스 진행 과정</h3>
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
                      <h4 className="text-xl font-medium">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* References Section */}
        <section id="references" className="py-16">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <h2 className="text-4xl md:text-5xl font-light">성공 <span className="text-primary">레퍼런스</span></h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative p-8 border border-border rounded-xl space-y-4 smooth-transition hover:border-primary group overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 smooth-transition">
                      <ProjectIcon className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">프로젝트 협력</h3>
                    <p className="text-muted-foreground leading-relaxed">다양한 기업과의 AI 마케팅 자동화 프로젝트 성공 사례</p>
                    <div className="mt-4 text-sm text-primary font-medium">성공적인 협력 프로젝트 수행</div>
                  </div>
                </div>
                
                <div className="relative p-8 border border-border rounded-xl space-y-4 smooth-transition hover:border-primary group overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-600/5 rounded-full blur-xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 smooth-transition">
                      <PaymentIcon className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">결제 시스템</h3>
                    <p className="text-muted-foreground leading-relaxed">안전한 블록체인 기반 스테이블 코인 결제 시스템 구축</p>
                    <div className="mt-4 text-sm text-primary font-medium">다양한 결제 수단 지원</div>
                  </div>
                </div>
                
                <div className="relative p-8 border border-border rounded-xl space-y-4 smooth-transition hover:border-primary group overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-purple-600/5 rounded-full blur-xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 smooth-transition">
                      <AchievementIcon className="w-8 h-8 text-purple-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">성과 달성</h3>
                    <p className="text-muted-foreground leading-relaxed">협력사 매출 300% 증가 및 운영 비용 50% 절감</p>
                    <div className="mt-4 text-sm text-primary font-medium">높은 성과 달성률</div>
                  </div>
                </div>
                
                <div className="relative p-8 border border-border rounded-xl space-y-4 smooth-transition hover:border-primary group overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-orange-600/5 rounded-full blur-xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 smooth-transition">
                      <GlobalIcon className="w-8 h-8 text-orange-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">글로벌 확장</h3>
                    <p className="text-muted-foreground leading-relaxed">아시아-태평양 지역 5개국 동시 서비스 런칭</p>
                    <div className="mt-4 text-sm text-primary font-medium">아시아 태평양 지역 서비스</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-light text-center mb-12">자주 묻는 <span className="text-primary">질문</span></h2>
              <div className="space-y-4">
                {[
                  {
                    question: "협력 신청 후 검토 기간은 얼마나 걸리나요?",
                    answer: "협력 신청서 검토는 보통 5-7 영업일 소요되며, 추가 정보가 필요한 경우 담당자가 별도 연락드립니다."
                  },
                  {
                    question: "최소 협력 규모나 조건이 있나요?",
                    answer: "협력 규모는 프로젝트 성격에 따라 유연하게 조정 가능하며, 스타트업부터 대기업까지 모든 규모의 파트너와 협력합니다."
                  },
                  {
                    question: "기술 지원 및 교육은 제공되나요?",
                    answer: "네, 협력 파트너에게는 기술 교육, 문서화된 가이드, 그리고 전담 기술 지원팀을 통한 지속적인 지원을 제공합니다."
                  },
                  {
                    question: "수익 분배 구조는 어떻게 되나요?",
                    answer: "프로젝트별로 협의하여 결정되며, 일반적으로 기여도와 투자 비율에 따른 공정한 수익 분배 구조를 적용합니다."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 smooth-transition">
                    <h3 className="font-medium mb-2 text-base md:text-lg">{item.question}</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-16">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-light">함께 시작하세요</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                AI 마케팅과 블록체인의 혁신적인 조합으로 비즈니스를 성장시킬 준비가 되셨나요?<br/>
                지금 협력 신청하시고 새로운 기회를 만나보세요.
              </p>
              <div className="flex justify-center">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
                >
                  <Link href="/apply">협력 신청하기</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
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