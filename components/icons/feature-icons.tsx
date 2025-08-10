import React from "react";

// 기술 혁신 아이콘
export const InnovationIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" opacity="0.3"/>
    <path d="M12 0L13.5 7.5L21 9L13.5 10.5L12 18L10.5 10.5L3 9L10.5 7.5L12 0Z"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
  </svg>
);

// 전략적 파트너십 아이콘
export const PartnershipIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4Z" opacity="0.3"/>
    <path d="M8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6Z" opacity="0.3"/>
    <path d="M15 14C17.7614 14 20 16.2386 20 19V21H12V19C12 16.2386 14.2386 14 17 14H15Z"/>
    <path d="M9 16C11.2091 16 13 17.7909 13 20V22H1V20C1 17.7909 2.79086 16 5 16H9Z"/>
  </svg>
);

// 플랫폼 우수성 아이콘
export const ExcellenceIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" opacity="0.3"/>
    <path d="M12 4L14 8L18 9L14 10L12 14L10 10L6 9L10 8L12 4Z"/>
    <circle cx="12" cy="18" r="2"/>
    <circle cx="6" cy="18" r="2"/>
    <circle cx="18" cy="18" r="2"/>
  </svg>
);

// 프로젝트 협력 아이콘
export const ProjectIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3H21V17H15L12 20L9 17H3V3Z" opacity="0.3"/>
    <path d="M19 3H5C3.9 3 3 3.9 3 5V15C3 16.1 3.9 17 5 17H9L12 20L15 17H19C20.1 17 21 16.1 21 15V5C21 3.9 20.1 3 19 3Z"/>
    <circle cx="8" cy="10" r="2"/>
    <circle cx="16" cy="10" r="2"/>
    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

// 결제 시스템 아이콘
export const PaymentIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4Z" opacity="0.3"/>
    <path d="M22 8H2V10H22V8Z"/>
    <path d="M14 14H18V16H14V14Z"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

// 성과 달성 아이콘
export const AchievementIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 16L3 21L7.5 18L12 21L16.5 18L21 21L19 16H5Z" opacity="0.3"/>
    <path d="M12 2L13.5 7L19 7.5L13.5 8L12 13L10.5 8L5 7.5L10.5 7L12 2Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

// 글로벌 확장 아이콘
export const GlobalIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" opacity="0.3"/>
    <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2Z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 12C8 8 9.79 4.5 12 4.5C14.21 4.5 16 8 16 12C16 16 14.21 19.5 12 19.5C9.79 19.5 8 16 8 12Z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// 팀 아이콘들
export const TechTeamIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" opacity="0.3"/>
    <rect x="4" y="4" width="16" height="10" rx="2" opacity="0.2"/>
    <path d="M6 18L8 16H16L18 18V20H6V18Z"/>
    <circle cx="12" cy="9" r="2"/>
  </svg>
);

export const MarketingTeamIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" opacity="0.3"/>
    <path d="M3 11L5.5 8.5L8.5 11.5L12 8L16.5 12.5L21 8V20H3V11Z"/>
    <circle cx="8" cy="8" r="2"/>
    <circle cx="16" cy="8" r="2"/>
  </svg>
);

export const OperationTeamIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" opacity="0.3"/>
    <path d="M12 8C14.21 8 16 9.79 16 12V20H8V12C8 9.79 9.79 8 12 8Z"/>
    <circle cx="12" cy="15" r="2"/>
    <path d="M6 10V12H4V10H6Z"/>
    <path d="M20 10V12H18V10H20Z"/>
  </svg>
);

export const BusinessTeamIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.5 7L19 7.5L13.5 8L12 13L10.5 8L5 7.5L10.5 7L12 2Z" opacity="0.3"/>
    <path d="M16 11C18.21 11 20 12.79 20 15V21H12V15C12 12.79 13.79 11 16 11Z"/>
    <path d="M8 9C10.21 9 12 10.79 12 13V19H4V13C4 10.79 5.79 9 8 9Z"/>
    <circle cx="8" cy="6" r="2"/>
    <circle cx="16" cy="8" r="2"/>
  </svg>
);