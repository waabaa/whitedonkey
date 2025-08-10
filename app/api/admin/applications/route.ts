import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const projectType = searchParams.get("projectType");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Build where clause for filtering
    const where: any = {};
    
    if (status && status !== "all") {
      where.status = status;
    }
    
    if (projectType && projectType !== "all") {
      where.projectType = projectType;
    }
    
    if (search) {
      where.OR = [
        { companyName: { contains: search, mode: "insensitive" } },
        { contactName: { contains: search, mode: "insensitive" } },
        { contactEmail: { contains: search, mode: "insensitive" } },
        { applicationId: { contains: search, mode: "insensitive" } }
      ];
    }

    // Get total count for pagination
    const total = await prisma.application.count({ where });

    // Get applications with pagination
    const applications = await prisma.application.findMany({
      where,
      include: {
        attachments: {
          select: {
            id: true,
            filename: true,
            originalName: true,
            size: true,
            mimeType: true,
            url: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    });

    return NextResponse.json({
      applications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "신청서 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}