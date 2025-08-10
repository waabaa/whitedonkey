import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  try {
    const applicationId = params.id;
    const body = await request.json();
    const { status } = body;

    if (!status || !["PENDING", "REVIEWING", "APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "유효하지 않은 상태값입니다." },
        { status: 400 }
      );
    }

    // Update application status
    const application = await prisma.application.update({
      where: {
        applicationId: applicationId
      },
      data: {
        status: status,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      application,
      message: "상태가 성공적으로 업데이트되었습니다."
    });

  } catch (error) {
    console.error("Error updating application status:", error);
    
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json(
        { error: "해당 신청서를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "상태 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  try {
    const applicationId = params.id;

    const application = await prisma.application.findUnique({
      where: {
        applicationId: applicationId
      },
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
      }
    });

    if (!application) {
      return NextResponse.json(
        { error: "신청서를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ application });

  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { error: "신청서 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}