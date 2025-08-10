import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint 경고를 빌드 시 무시하도록 설정
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript 에러를 빌드 시 무시하도록 설정 (위험하지만 배포용)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
