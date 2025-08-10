"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search,
  Download,
  Eye,
  Filter,
  Calendar,
  Users,
  ClipboardList,
  TrendingUp
} from "lucide-react";
import { PROJECT_TYPES } from "@/lib/constants";
import { toast } from "react-hot-toast";

interface Application {
  id: number;
  applicationId: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  projectTitle: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  description: string;
  aiRequirements: string;
  blockchainNeeds: string;
  status: "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED";
  createdAt: string;
  attachments?: Array<{
    id: string;
    filename: string;
    originalName: string;
    size: number;
    mimeType: string;
    url: string;
  }>;
}

const statusColors = {
  PENDING: "bg-yellow-500/10 text-yellow-500",
  REVIEWING: "bg-blue-500/10 text-blue-500",
  APPROVED: "bg-green-500/10 text-green-500",
  REJECTED: "bg-red-500/10 text-red-500"
};

const statusLabels = {
  PENDING: "검토대기",
  REVIEWING: "검토중",
  APPROVED: "승인",
  REJECTED: "반려"
};

export default function ApplicationsManagement() {
  const [applications, setApplications] = useState<Application[]>([
    // 샘플 데이터
    {
      id: 1,
      applicationId: "WD-2024-001",
      companyName: "㈜테크놀로지",
      contactName: "김철수",
      contactEmail: "kim@tech.com",
      contactPhone: "010-1234-5678",
      projectTitle: "E-Commerce 플랫폼 AI 마케팅",
      projectType: "youtube-marketing",
      budgetRange: "1000만원 - 3000만원",
      timeline: "2024년 2월",
      description: "온라인 쇼핑몰 운영 중이며, AI를 활용한 개인화 마케팅 시스템을 도입하고 싶습니다. 고객 데이터 분석을 통한 맞춤형 상품 추천 및 마케팅 자동화가 필요합니다.",
      aiRequirements: "현재 Google Analytics와 Facebook Pixel을 사용하고 있으나, 더 정교한 고객 세분화와 예측 마케팅이 필요합니다.",
      blockchainNeeds: "고객 이탈률 감소, 전환율 향상, ROI 개선을 통한 매출 증대",
      status: "PENDING",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      applicationId: "WD-2024-002", 
      companyName: "김영수",
      contactName: "김영수",
      contactEmail: "youngsoo@gmail.com",
      contactPhone: "010-9876-5432",
      projectTitle: "카페 매출 향상 프로젝트",
      projectType: "local-business",
      budgetRange: "500만원 이하",
      timeline: "2024년 1월",
      description: "강남역 근처 카페를 운영하고 있습니다. 지역 고객 유치를 위한 AI 기반 로컬 마케팅이 필요합니다.",
      aiRequirements: "현재 인스타그램과 네이버 플레이스만 운영 중입니다. 체계적인 마케팅 전략이 부족합니다.",
      blockchainNeeds: "신규 고객 유치, 재방문율 증가, 브랜드 인지도 향상",
      status: "APPROVED",
      createdAt: "2024-01-14T15:20:00Z"
    },
    {
      id: 3,
      applicationId: "WD-2024-003",
      companyName: "㈜마케팅플러스",
      contactName: "박지은",
      contactEmail: "jieun@marketingplus.co.kr", 
      contactPhone: "010-5555-7777",
      projectTitle: "다중 브랜드 SNS 마케팅 자동화",
      projectType: "sns-management",
      budgetRange: "3000만원 - 5000만원",
      timeline: "2024년 3월",
      description: "여러 브랜드의 SNS 계정을 관리하고 있는 마케팅 에이전시입니다. 콘텐츠 제작부터 게시, 분석까지 자동화하고 싶습니다.",
      aiRequirements: "현재 수동으로 콘텐츠를 제작하고 있어 효율성이 떨어집니다. AI를 통한 콘텐츠 생성과 최적 게시 시간 분석이 필요합니다.",
      blockchainNeeds: "업무 효율성 증대, 클라이언트 만족도 향상, 운영 비용 절감",
      status: "REVIEWING",
      createdAt: "2024-01-13T09:15:00Z"
    },
    {
      id: 4,
      applicationId: "WD-2024-004",
      companyName: "스타트업ABC",
      contactName: "이민호",
      contactEmail: "minho@startupABC.com",
      contactPhone: "010-3333-4444",
      projectTitle: "B2B SaaS 제품 마케팅",
      projectType: "seo-aeo",
      budgetRange: "1000만원 - 3000만원",
      timeline: "2024년 2월",
      description: "B2B SaaS 제품을 런칭했으나 인지도가 낮습니다. 검색 엔진 최적화와 콘텐츠 마케팅을 통한 리드 제너레이션이 필요합니다.",
      aiRequirements: "현재 웹사이트 트래픽이 낮고, 유기적 검색 유입이 부족합니다.",
      blockchainNeeds: "브랜드 인지도 향상, 웹사이트 트래픽 증가, 잠재 고객 확보",
      status: "REJECTED",
      createdAt: "2024-01-12T14:45:00Z"
    }
  ]);

  const [filteredApplications, setFilteredApplications] = useState<Application[]>(applications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Filter applications when search term or filters change
  useEffect(() => {
    let filtered = applications;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Project type filter
    if (projectTypeFilter !== "all") {
      filtered = filtered.filter(app => app.projectType === projectTypeFilter);
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter, projectTypeFilter]);

  const updateApplicationStatus = (applicationId: string, newStatus: string) => {
    const updatedApplications = applications.map(app =>
      app.applicationId === applicationId
        ? { ...app, status: newStatus as "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED" }
        : app
    );
    setApplications(updatedApplications);
    toast.success("상태가 업데이트되었습니다.");
  };

  const exportToExcel = () => {
    // 실제로는 서버에서 Excel 파일 생성
    toast.success("Excel 파일이 다운로드됩니다.");
  };

  const getStats = () => {
    const total = applications.length;
    const pending = applications.filter(app => app.status === "PENDING").length;
    const approved = applications.filter(app => app.status === "APPROVED").length;
    const thisMonth = applications.filter(app => {
      const created = new Date(app.createdAt);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length;

    return { total, pending, approved, thisMonth };
  };

  const stats = getStats();

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit", 
      day: "2-digit"
    }).format(new Date(dateString));
  };

  return (
    <AdminLayout currentPage="applications">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">협력신청 관리</h1>
            <p className="text-muted-foreground mt-1">
              접수된 협력 신청서를 확인하고 관리할 수 있습니다.
            </p>
          </div>
          <Button onClick={exportToExcel}>
            <Download className="w-4 h-4 mr-2" />
            Excel 내보내기
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">전체 신청서</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">검토 대기</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">승인 완료</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">이번 달</p>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">필터 및 검색</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="회사명, 담당자, 이메일로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="PENDING">검토대기</SelectItem>
                <SelectItem value="REVIEWING">검토중</SelectItem>
                <SelectItem value="APPROVED">승인</SelectItem>
                <SelectItem value="REJECTED">반려</SelectItem>
              </SelectContent>
            </Select>

            <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="서비스 유형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 서비스</SelectItem>
                {Object.entries(PROJECT_TYPES).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setProjectTypeFilter("all");
            }}>
              <Filter className="w-4 h-4 mr-2" />
              필터 초기화
            </Button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-card border border-border rounded-lg">
          <Table>
            <TableCaption>
              {filteredApplications.length > 0 
                ? `총 ${filteredApplications.length}개의 신청서가 있습니다.`
                : "조건에 맞는 신청서가 없습니다."
              }
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>신청번호</TableHead>
                <TableHead>회사명</TableHead>
                <TableHead>담당자</TableHead>
                <TableHead>서비스 유형</TableHead>
                <TableHead>예산 범위</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>신청일</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    조건에 맞는 신청서가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((application) => (
                  <TableRow key={application.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">
                      {application.applicationId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {application.companyName}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.contactName}</div>
                        <div className="text-sm text-muted-foreground">
                          {application.contactEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {PROJECT_TYPES[application.projectType as keyof typeof PROJECT_TYPES]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {application.budgetRange}
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={application.status} 
                        onValueChange={(newStatus) => updateApplicationStatus(application.applicationId, newStatus)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge className={statusColors[application.status]}>
                            {statusLabels[application.status]}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">검토대기</SelectItem>
                          <SelectItem value="REVIEWING">검토중</SelectItem>
                          <SelectItem value="APPROVED">승인</SelectItem>
                          <SelectItem value="REJECTED">반려</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(application.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedApplication(application)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">신청서 상세 정보</h2>
                <Button variant="ghost" onClick={() => setSelectedApplication(null)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">기업 정보</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>신청번호:</strong> {selectedApplication.applicationId}</div>
                      <div><strong>회사명:</strong> {selectedApplication.companyName}</div>
                      <div><strong>담당자:</strong> {selectedApplication.contactName}</div>
                      <div><strong>이메일:</strong> {selectedApplication.contactEmail}</div>
                      <div><strong>전화번호:</strong> {selectedApplication.contactPhone}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">프로젝트 정보</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>프로젝트명:</strong> {selectedApplication.projectTitle}</div>
                      <div><strong>서비스 유형:</strong> {PROJECT_TYPES[selectedApplication.projectType as keyof typeof PROJECT_TYPES]}</div>
                      <div><strong>예산 범위:</strong> {selectedApplication.budgetRange}</div>
                      <div><strong>희망 시작 시기:</strong> {selectedApplication.timeline}</div>
                      <div><strong>신청일:</strong> {formatDate(selectedApplication.createdAt)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">프로젝트 설명</h3>
                  <div className="text-sm bg-muted p-4 rounded-lg whitespace-pre-wrap">
                    {selectedApplication.description}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">현재 마케팅 현황</h3>
                  <div className="text-sm bg-muted p-4 rounded-lg whitespace-pre-wrap">
                    {selectedApplication.aiRequirements}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">해결하고 싶은 마케팅 과제</h3>
                  <div className="text-sm bg-muted p-4 rounded-lg whitespace-pre-wrap">
                    {selectedApplication.blockchainNeeds}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">상태 변경:</span>
                    <Select 
                      value={selectedApplication.status} 
                      onValueChange={(newStatus) => {
                        updateApplicationStatus(selectedApplication.applicationId, newStatus);
                        setSelectedApplication({ ...selectedApplication, status: newStatus as "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED" });
                      }}
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={statusColors[selectedApplication.status]}>
                          {statusLabels[selectedApplication.status]}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">검토대기</SelectItem>
                        <SelectItem value="REVIEWING">검토중</SelectItem>
                        <SelectItem value="APPROVED">승인</SelectItem>
                        <SelectItem value="REJECTED">반려</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setSelectedApplication(null)}>
                    닫기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}