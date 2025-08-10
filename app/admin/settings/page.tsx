"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { 
  Settings,
  Save,
  Shield,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  Database
} from "lucide-react";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  adminEmail: string;
  adminPassword: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  businessHours: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  maxFileUploadSize: number;
  sessionTimeout: number;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "흰당나귀",
    siteDescription: "AI 마케팅 자동화 플랫폼",
    adminEmail: "admin@whitedonkey.co.kr",
    adminPassword: "5o2o@",
    contactPhone: "1588-1234",
    contactEmail: "support@whitedonkey.co.kr",
    address: "서울특별시 강남구 테헤란로 123",
    businessHours: "월-금 09:00-18:00",
    maintenanceMode: false,
    allowRegistrations: true,
    maxFileUploadSize: 10,
    sessionTimeout: 24
  });

  const [originalSettings, setOriginalSettings] = useState<SiteSettings>({...settings});
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (key: keyof SiteSettings, value: string | number | boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Check if there are changes
    const changed = JSON.stringify(newSettings) !== JSON.stringify(originalSettings);
    setHasChanges(changed);
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to database
    setOriginalSettings({...settings});
    setHasChanges(false);
    toast.success("설정이 저장되었습니다.");
  };

  const handleResetSettings = () => {
    if (confirm("설정을 초기화하시겠습니까?")) {
      setSettings({...originalSettings});
      setHasChanges(false);
      toast.success("설정이 초기화되었습니다.");
    }
  };

  const stats = {
    totalUsers: 1247,
    totalNotices: 5,
    totalApplications: 12,
    diskUsage: "2.3GB",
    lastBackup: "2024-01-15 14:30"
  };

  return (
    <AdminLayout currentPage="settings">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">관리자 설정</h1>
            <p className="text-muted-foreground mt-1">
              시스템 설정 및 사이트 정보를 관리할 수 있습니다.
            </p>
          </div>
          
          <div className="flex space-x-3">
            {hasChanges && (
              <Button variant="outline" onClick={handleResetSettings}>
                취소
              </Button>
            )}
            <Button onClick={handleSaveSettings} disabled={!hasChanges}>
              <Save className="w-4 h-4 mr-2" />
              저장
            </Button>
          </div>
        </div>

        {/* System Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
              <div className="text-sm text-muted-foreground">총 사용자</div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalNotices}</div>
              <div className="text-sm text-muted-foreground">공지사항</div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalApplications}</div>
              <div className="text-sm text-muted-foreground">협력신청</div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.diskUsage}</div>
              <div className="text-sm text-muted-foreground">디스크 사용량</div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-center">
              <div className="text-xs font-medium text-gray-600">{stats.lastBackup}</div>
              <div className="text-sm text-muted-foreground">마지막 백업</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Site Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                사이트 정보
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                웹사이트 기본 정보를 설정합니다.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">사이트 명</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange("siteName", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">사이트 설명</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                연락처 정보
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                고객 문의 및 연락처 정보를 설정합니다.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">고객 문의 이메일</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">고객 문의 전화</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">주소</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessHours">영업시간</Label>
                <Input
                  id="businessHours"
                  value={settings.businessHours}
                  onChange={(e) => handleInputChange("businessHours", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Admin Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                관리자 설정
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                관리자 계정 및 보안 설정을 관리합니다.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminEmail">관리자 이메일</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adminPassword">관리자 비밀번호</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  value={settings.adminPassword}
                  onChange={(e) => handleInputChange("adminPassword", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">세션 타임아웃 (시간)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  min="1"
                  max="168"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Database className="w-5 h-5 mr-2" />
                시스템 설정
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                시스템 운영 및 보안 설정을 관리합니다.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>점검 모드</Label>
                  <p className="text-sm text-muted-foreground">사이트를 점검 모드로 전환</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleInputChange("maintenanceMode", e.target.checked)}
                  className="rounded border-border"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>신규 가입 허용</Label>
                  <p className="text-sm text-muted-foreground">새로운 사용자 등록 허용</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.allowRegistrations}
                  onChange={(e) => handleInputChange("allowRegistrations", e.target.checked)}
                  className="rounded border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxFileUploadSize">최대 파일 업로드 크기 (MB)</Label>
                <Input
                  id="maxFileUploadSize"
                  type="number"
                  min="1"
                  max="100"
                  value={settings.maxFileUploadSize}
                  onChange={(e) => handleInputChange("maxFileUploadSize", parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium">시스템 관리</h3>
            <p className="text-sm text-muted-foreground mt-1">
              시스템 백업, 로그 관리 등 고급 관리 기능입니다.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" onClick={() => toast.success("백업이 시작되었습니다.")}>
                <Database className="w-4 h-4 mr-2" />
                데이터 백업
              </Button>
              
              <Button variant="outline" onClick={() => toast.success("캐시가 삭제되었습니다.")}>
                <Settings className="w-4 h-4 mr-2" />
                캐시 삭제
              </Button>
              
              <Button variant="outline" onClick={() => toast.success("로그가 다운로드됩니다.")}>
                <Clock className="w-4 h-4 mr-2" />
                로그 다운로드
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={() => {
                  if (confirm("정말로 시스템을 재시작하시겠습니까?")) {
                    toast.success("시스템이 재시작됩니다.");
                  }
                }}
              >
                시스템 재시작
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}