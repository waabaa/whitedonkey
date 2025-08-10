import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/lib/constants";

const statusLabels = {
  PENDING: "검토대기",
  REVIEWING: "검토중", 
  APPROVED: "승인",
  REJECTED: "반려"
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filters } = body;

    // Build where clause for filtering
    const where: any = {};
    
    if (filters?.status && filters.status !== "all") {
      where.status = filters.status;
    }
    
    if (filters?.projectType && filters.projectType !== "all") {
      where.projectType = filters.projectType;
    }
    
    if (filters?.searchTerm) {
      where.OR = [
        { companyName: { contains: filters.searchTerm, mode: "insensitive" } },
        { contactName: { contains: filters.searchTerm, mode: "insensitive" } },
        { contactEmail: { contains: filters.searchTerm, mode: "insensitive" } },
        { applicationId: { contains: filters.searchTerm, mode: "insensitive" } }
      ];
    }

    // Fetch applications
    const applications = await prisma.application.findMany({
      where,
      include: {
        attachments: {
          select: {
            originalName: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    // Prepare data for Excel
    const excelData = applications.map((app, index) => ({
      "번호": index + 1,
      "신청번호": app.applicationId,
      "신청일": new Date(app.createdAt).toLocaleDateString("ko-KR"),
      "회사명": app.companyName,
      "담당자명": app.contactName,
      "이메일": app.contactEmail,
      "전화번호": app.contactPhone,
      "업종": app.projectTitle,
      "서비스유형": PROJECT_TYPES[app.projectType as keyof typeof PROJECT_TYPES] || app.projectType,
      "예산범위": BUDGET_RANGES[app.budgetRange as keyof typeof BUDGET_RANGES] || app.budgetRange,
      "희망시작시기": app.timeline,
      "상태": statusLabels[app.status as keyof typeof statusLabels] || app.status,
      "마케팅현황": app.aiRequirements,
      "해결과제": app.blockchainNeeds,
      "프로젝트설명": app.description,
      "첨부파일": app.attachments.map(att => att.originalName).join(", ") || "없음",
      "최종수정일": new Date(app.updatedAt).toLocaleDateString("ko-KR")
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths for better formatting
    const columnWidths = [
      { wch: 5 },   // 번호
      { wch: 15 },  // 신청번호
      { wch: 12 },  // 신청일
      { wch: 20 },  // 회사명
      { wch: 15 },  // 담당자명
      { wch: 25 },  // 이메일
      { wch: 15 },  // 전화번호
      { wch: 20 },  // 업종
      { wch: 20 },  // 서비스유형
      { wch: 15 },  // 예산범위
      { wch: 15 },  // 희망시작시기
      { wch: 10 },  // 상태
      { wch: 30 },  // 마케팅현황
      { wch: 30 },  // 해결과제
      { wch: 30 },  // 프로젝트설명
      { wch: 25 },  // 첨부파일
      { wch: 12 }   // 최종수정일
    ];

    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "협력신청서");

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { 
      bookType: "xlsx", 
      type: "buffer"
    });

    // Create response with Excel file
    const fileName = `applications_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": excelBuffer.length.toString()
      }
    });

  } catch (error) {
    console.error("Excel export error:", error);
    return NextResponse.json(
      { error: "Excel 내보내기 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}