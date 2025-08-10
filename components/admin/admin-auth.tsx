"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

interface AdminAuthProps {
  onAuth: (isAuthenticated: boolean) => void;
}

export function AdminAuth({ onAuth }: AdminAuthProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 비밀번호 체크 (5o2o@)
    if (password === "5o2o@") {
      // 로컬 스토리지에 인증 상태 저장
      localStorage.setItem("admin-authenticated", "true");
      localStorage.setItem("admin-auth-time", Date.now().toString());
      
      toast.success("관리자 인증 성공");
      onAuth(true);
    } else {
      toast.error("비밀번호가 올바르지 않습니다.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="fixed inset-0 grid-bg geometric-pattern" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <h1 className="text-2xl font-bold text-gradient">관리자 인증</h1>
            <p className="text-muted-foreground mt-2">
              관리자 비밀번호를 입력해주세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="관리자 비밀번호를 입력하세요"
                required
                className="w-full"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !password}
            >
              {isLoading ? "인증 중..." : "로그인"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>관리자 전용 페이지입니다</p>
          </div>
        </div>
      </div>
    </div>
  );
}