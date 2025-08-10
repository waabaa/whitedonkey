"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Calendar,
  Eye,
  Pin,
  ArrowLeft,
  Bell
} from "lucide-react";

interface Notice {
  id: number;
  title: string;
  content: string;
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      title: "흰당나귀 AI 마케팅 플랫폼 정식 오픈 안내",
      content: `안녕하세요, 흰당나귀 팀입니다.

드디어 AI 마케팅 자동화 플랫폼이 정식으로 오픈되었습니다!

🎉 주요 서비스 소개:
• YouTube 영상 마케팅 자동화
• SEO/AEO 최적화 
• SNS 마케팅 관리
• 로컬 비즈니스 마케팅
• 스테이블코인 결제 시스템
• AI 마케팅 컨설팅

📞 런칭 기념 혜택:
• 첫 달 완전 무료 체험
• 상담 신청 시 마케팅 전략 무료 제공
• 6개월 이상 계약 시 20% 할인

많은 관심과 이용 부탁드립니다.

문의: support@whitedonkey.co.kr
전화: 1588-1234`,
      isPinned: true,
      viewCount: 1250,
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T09:00:00Z"
    },
    {
      id: 2,
      title: "스테이블코인 결제 시스템 업데이트 완료",
      content: `스테이블코인 결제 시스템이 업데이트되었습니다.

🔄 업데이트 내용:
• USDC, USDT 결제 안정성 개선
• 실시간 환율 정보 정확도 향상
• 거래 수수료 최대 30% 절감
• 자동 세금계산서 발행 기능 추가

💳 지원 결제수단:
• USDC (USD Coin)
• USDT (Tether)
• 기존 신용카드/계좌이체 병행 지원

기존 고객님들께는 별도 안내를 드리며, 새로운 결제 시스템으로 더욱 편리한 서비스를 제공하겠습니다.`,
      isPinned: false,
      viewCount: 856,
      createdAt: "2024-01-12T14:30:00Z",
      updatedAt: "2024-01-12T14:30:00Z"
    },
    {
      id: 3,
      title: "2024년 1월 정기 점검 안내",
      content: `2024년 1월 정기 시스템 점검을 실시합니다.

📅 점검 일정:
• 일시: 2024년 1월 25일 (목) 오전 2:00 ~ 6:00
• 소요시간: 약 4시간 예정

🔧 점검 내용:
• 서버 인프라 업그레이드
• 데이터베이스 최적화
• 보안 패치 적용
• 성능 개선 작업

점검 시간 중에는 모든 서비스 이용이 불가능하니 양해 부탁드립니다.
점검 완료 후 더욱 안정적이고 빠른 서비스를 제공하겠습니다.`,
      isPinned: false,
      viewCount: 423,
      createdAt: "2024-01-10T16:15:00Z",
      updatedAt: "2024-01-10T16:15:00Z"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // 검색 필터링
  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 정렬 (고정된 공지사항 먼저, 그 다음 날짜순)
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(dateString));
  };

  const incrementViewCount = (noticeId: number) => {
    setNotices(prev => prev.map(notice => 
      notice.id === noticeId 
        ? { ...notice, viewCount: notice.viewCount + 1 }
        : notice
    ));
  };

  const handleNoticeClick = (notice: Notice) => {
    incrementViewCount(notice.id);
    setSelectedNotice(notice);
  };

  if (selectedNotice) {
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
            
            <Button onClick={() => setSelectedNotice(null)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로
            </Button>
          </div>
        </header>

        {/* Notice Detail */}
        <main className="pt-20 pb-8">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    {selectedNotice.isPinned && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full flex items-center mr-3">
                        <Pin className="w-3 h-3 mr-1" />
                        고정
                      </span>
                    )}
                    <h1 className="text-2xl md:text-3xl font-bold">{selectedNotice.title}</h1>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(selectedNotice.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {selectedNotice.viewCount.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {selectedNotice.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
          
          <nav className="flex items-center space-x-8">
            <Link href="/apply" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">
              협력 신청
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-light">공지사항</h1>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground">
                흰당나귀의 최신 소식과 업데이트를 확인하세요
              </p>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="공지사항 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
              {sortedNotices.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📢</div>
                  <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
                  <p className="text-muted-foreground">다른 키워드로 검색해보세요.</p>
                </div>
              ) : (
                sortedNotices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => handleNoticeClick(notice)}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          {notice.isPinned && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center mr-3">
                              <Pin className="w-3 h-3 mr-1" />
                              고정
                            </span>
                          )}
                          <h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                            {notice.title}
                          </h3>
                        </div>
                        
                        <p className="text-muted-foreground text-sm md:text-base mb-4 line-clamp-2">
                          {notice.content.split('\n').find(line => line.trim()) || notice.content.substring(0, 100)}...
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(notice.createdAt)}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {notice.viewCount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
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