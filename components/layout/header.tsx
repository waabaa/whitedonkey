"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  sections: Array<{ id: string; label: string; }>;
  currentSection: number;
  scrollToSection: (index: number) => void;
}

export function Header({ sections, currentSection, scrollToSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Main Header */}
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
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentSection === index ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {section.label}
              </button>
            ))}
            <Link 
              href="/notice" 
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              공지사항
            </Link>
          </nav>

          {/* CTA Button + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Button 
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/apply">협력 신청</Link>
            </Button>
            
            <button
              className="lg:hidden flex flex-col gap-1.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="w-6 h-0.5 bg-foreground transition-all"></span>
              <span className="w-6 h-0.5 bg-foreground transition-all"></span>
              <span className="w-6 h-0.5 bg-foreground transition-all"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="container mx-auto px-8 py-4 space-y-4">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    scrollToSection(index);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left text-sm font-medium transition-colors hover:text-primary ${
                    currentSection === index ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section.label}
                </button>
              ))}
              <Link 
                href="/notice" 
                className="block w-full text-left text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                공지사항
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* FOLLOW ME Vertical Text */}
      <div className="follow-me-container fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
          <div className="transform -rotate-90 origin-center">
            <span className="text-xs font-light text-muted-foreground tracking-widest">
              FOLLOW ME
            </span>
          </div>
          <div className="flex flex-col space-y-3">
            <Link href="#" className="w-2 h-2 bg-primary/30 hover:bg-primary rounded-full smooth-transition hover:scale-150"></Link>
            <Link href="#" className="w-2 h-2 bg-primary/30 hover:bg-primary rounded-full smooth-transition hover:scale-150"></Link>
            <Link href="#" className="w-2 h-2 bg-primary/30 hover:bg-primary rounded-full smooth-transition hover:scale-150"></Link>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
        </div>
      </div>
    </>
  );
}