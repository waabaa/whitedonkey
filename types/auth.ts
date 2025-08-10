import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}

export enum AdminRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN", 
  MODERATOR = "MODERATOR"
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  REVIEWING = "REVIEWING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ON_HOLD = "ON_HOLD"
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM", 
  HIGH = "HIGH",
  URGENT = "URGENT"
}

export enum ProjectType {
  MARKETING_AI = "MARKETING_AI",
  BLOCKCHAIN_DEV = "BLOCKCHAIN_DEV",
  HYBRID_SOLUTION = "HYBRID_SOLUTION",
  CONSULTING = "CONSULTING",
  OTHER = "OTHER"
}

export enum BudgetRange {
  UNDER_10M = "UNDER_10M",
  RANGE_10_50M = "RANGE_10_50M",
  RANGE_50_100M = "RANGE_50_100M", 
  OVER_100M = "OVER_100M",
  NEGOTIABLE = "NEGOTIABLE"
}