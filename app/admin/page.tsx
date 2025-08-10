"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Bell,
  Users,
  FileText,
  TrendingUp,
  Eye,
  Plus
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">관리자 대시보드</h1>
            <p className="text-muted-foreground mt-1">
              흰당나귀 AI 마케팅 플랫폼 관리
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">총 공지사항</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2 이번 주
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">협력신청</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5 이번 주
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">페이지 조회수</p>
                <p className="text-2xl font-bold">2,847</p>
              </div>
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 mr-1" />
              +127 어제
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">처리 대기</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-red-500">
              처리 필요
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">빠른 작업</h3>
            <div className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/admin/notices">
                  <Plus className="w-4 h-4 mr-2" />
                  새 공지사항 작성
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/applications">
                  <Users className="w-4 h-4 mr-2" />
                  협력신청 확인
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/notice">
                  <Eye className="w-4 h-4 mr-2" />
                  공지사항 페이지 보기
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">최근 활동</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">새 협력신청</p>
                  <p className="text-muted-foreground">㈜테크놀로지 - AI 마케팅 서비스</p>
                </div>
                <span className="text-xs text-muted-foreground">2분 전</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">공지사항 조회</p>
                  <p className="text-muted-foreground">"스테이블코인 결제 시스템 업데이트"</p>
                </div>
                <span className="text-xs text-muted-foreground">15분 전</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">새 협력신청</p>
                  <p className="text-muted-foreground">김영수 - 로컬 비즈니스 마케팅</p>
                </div>
                <span className="text-xs text-muted-foreground">1시간 전</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications Preview */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">최근 협력신청</h3>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/applications">모두 보기</Link>
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">신청자</th>
                  <th className="text-left py-2">연락처</th>
                  <th className="text-left py-2">서비스</th>
                  <th className="text-left py-2">상태</th>
                  <th className="text-left py-2">신청일</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3">㈜테크놀로지</td>
                  <td className="py-3">tech@company.com</td>
                  <td className="py-3">AI 마케팅 서비스</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs">
                      대기중
                    </span>
                  </td>
                  <td className="py-3">2024-01-15</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3">김영수</td>
                  <td className="py-3">kim@email.com</td>
                  <td className="py-3">로컬 비즈니스 마케팅</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs">
                      처리완료
                    </span>
                  </td>
                  <td className="py-3">2024-01-14</td>
                </tr>
                <tr>
                  <td className="py-3">㈜마케팅플러스</td>
                  <td className="py-3">info@marketing.co.kr</td>
                  <td className="py-3">SNS 마케팅 관리</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs">
                      검토중
                    </span>
                  </td>
                  <td className="py-3">2024-01-13</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}