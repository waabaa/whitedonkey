"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminAuth } from "./admin-auth";
import { toast } from "react-hot-toast";
import { 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Home,
  Bell
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: "dashboard" | "notices" | "applications" | "settings";
}

export function AdminLayout({ children, currentPage = "dashboard" }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 인증 상태 확인
    const checkAuth = () => {
      const authStatus = localStorage.getItem("admin-authenticated");
      const authTime = localStorage.getItem("admin-auth-time");
      
      if (authStatus === "true" && authTime) {
        const timeDiff = Date.now() - parseInt(authTime);
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        // 24시간 후 자동 로그아웃
        if (hoursDiff < 24) {
          setIsAuthenticated(true);
        } else {
          handleLogout();
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuth = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-authenticated");
    localStorage.removeItem("admin-auth-time");
    setIsAuthenticated(false);
    toast.success("로그아웃 되었습니다.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuth={handleAuth} />;
  }

  const navigation = [
    {
      name: "대시보드",
      href: "/admin",
      icon: Home,
      active: currentPage === "dashboard"
    },
    {
      name: "공지사항 관리",
      href: "/admin/notices",
      icon: Bell,
      active: currentPage === "notices"
    },
    {
      name: "협력신청 관리",
      href: "/admin/applications",
      icon: Users,
      active: currentPage === "applications"
    },
    {
      name: "설정",
      href: "/admin/settings",
      icon: Settings,
      active: currentPage === "settings"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 grid-bg geometric-pattern" />
      
      {/* Header */}
      <header className="relative z-50 sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold">흰당나귀 관리자</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              사이트 보기
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="relative z-10 w-64 bg-card border-r border-border min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.active 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}