"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { 
  Plus,
  Edit,
  Trash2,
  Pin,
  PinOff,
  Eye,
  Calendar,
  Search
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

export default function NoticesManagement() {
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
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPinned: false
  });

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

  const handleCreateNotice = () => {
    setIsEditMode(false);
    setCurrentNotice(null);
    setFormData({ title: "", content: "", isPinned: false });
    setIsCreateModalOpen(true);
  };

  const handleEditNotice = (notice: Notice) => {
    setIsEditMode(true);
    setCurrentNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      isPinned: notice.isPinned
    });
    setIsCreateModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }

    if (isEditMode && currentNotice) {
      // 수정
      const updatedNotices = notices.map(notice =>
        notice.id === currentNotice.id
          ? {
              ...notice,
              title: formData.title,
              content: formData.content,
              isPinned: formData.isPinned,
              updatedAt: new Date().toISOString()
            }
          : notice
      );
      setNotices(updatedNotices);
      toast.success("공지사항이 수정되었습니다.");
    } else {
      // 새로 생성
      const newNotice: Notice = {
        id: Math.max(...notices.map(n => n.id), 0) + 1,
        title: formData.title,
        content: formData.content,
        isPinned: formData.isPinned,
        viewCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotices([newNotice, ...notices]);
      toast.success("공지사항이 작성되었습니다.");
    }

    setIsCreateModalOpen(false);
    setFormData({ title: "", content: "", isPinned: false });
  };

  const handleDeleteNotice = (id: number) => {
    if (confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      setNotices(notices.filter(notice => notice.id !== id));
      toast.success("공지사항이 삭제되었습니다.");
    }
  };

  const togglePin = (id: number) => {
    const updatedNotices = notices.map(notice =>
      notice.id === id
        ? { ...notice, isPinned: !notice.isPinned }
        : notice
    );
    setNotices(updatedNotices);
    toast.success("공지사항 고정 상태가 변경되었습니다.");
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(dateString));
  };

  return (
    <AdminLayout currentPage="notices">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">공지사항 관리</h1>
            <p className="text-muted-foreground mt-1">
              공지사항을 작성, 수정, 삭제할 수 있습니다.
            </p>
          </div>
          <Button onClick={handleCreateNotice}>
            <Plus className="w-4 h-4 mr-2" />
            새 공지사항
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
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
        <div className="bg-card border border-border rounded-lg">
          <div className="p-6">
            <div className="space-y-4">
              {sortedNotices.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📢</div>
                  <h3 className="text-lg font-medium mb-2">공지사항이 없습니다</h3>
                  <p className="text-muted-foreground">새 공지사항을 작성해보세요.</p>
                </div>
              ) : (
                sortedNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className="border border-border rounded-lg p-4 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {notice.isPinned && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center">
                              <Pin className="w-3 h-3 mr-1" />
                              고정
                            </span>
                          )}
                          <h3 className="text-lg font-medium">{notice.title}</h3>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {notice.content.substring(0, 100)}...
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
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePin(notice.id)}
                          title={notice.isPinned ? "고정 해제" : "고정하기"}
                        >
                          {notice.isPinned ? (
                            <PinOff className="w-4 h-4" />
                          ) : (
                            <Pin className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditNotice(notice)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteNotice(notice.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">
                  {isEditMode ? "공지사항 수정" : "새 공지사항 작성"}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">제목</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="공지사항 제목을 입력하세요"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">내용</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="공지사항 내용을 입력하세요"
                      rows={10}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPinned"
                      checked={formData.isPinned}
                      onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                      className="rounded border-border"
                    />
                    <Label htmlFor="isPinned">상단 고정</Label>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      취소
                    </Button>
                    <Button type="submit">
                      {isEditMode ? "수정하기" : "작성하기"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}