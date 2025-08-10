import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateApplicationId } from "@/lib/utils";
import { ApplicationSubmitSchema } from "@/lib/validations/application";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validationResult = ApplicationSubmitSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "입력 데이터가 올바르지 않습니다.",
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    
    // Generate unique application ID
    const applicationId = generateApplicationId();

    // Check if attachments exist (if any provided)
    if (data.attachmentIds && data.attachmentIds.length > 0) {
      const attachments = await prisma.attachment.findMany({
        where: {
          id: { in: data.attachmentIds },
          applicationId: { equals: null } // Only unassigned attachments
        } as any
      });

      if (attachments.length !== data.attachmentIds.length) {
        return NextResponse.json(
          { error: "일부 첨부파일을 찾을 수 없습니다." },
          { status: 400 }
        );
      }
    }

    // Create application in database transaction
    const application = await prisma.$transaction(async (tx) => {
      // Create the application
      const newApplication = await tx.application.create({
        data: {
          applicationId,
          companyName: data.companyName,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          projectTitle: data.projectTitle,
          projectType: data.projectType as any,
          budgetRange: data.budgetRange as any,
          timeline: data.timeline,
          description: data.description,
          aiRequirements: data.aiRequirements,
          blockchainNeeds: data.blockchainNeeds,
          status: "PENDING"
        }
      });

      // Connect attachments to the application (if any)
      if (data.attachmentIds && data.attachmentIds.length > 0) {
        await tx.attachment.updateMany({
          where: {
            id: { in: data.attachmentIds }
          },
          data: {
            applicationId: newApplication.id
          }
        });
      }

      return newApplication;
    });

    // Return success response with application ID
    return NextResponse.json({
      success: true,
      applicationId: application.applicationId,
      message: "협력 신청서가 성공적으로 제출되었습니다."
    });

  } catch (error) {
    console.error("Application submission error:", error);
    
    // Handle Prisma unique constraint errors
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "중복된 신청서입니다. 잠시 후 다시 시도해주세요." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "신청서 제출 중 오류가 발생했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("id");
    
    if (!applicationId) {
      return NextResponse.json(
        { error: "신청서 ID가 필요합니다." },
        { status: 400 }
      );
    }

    // Find application by ID
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

    // Return application data (excluding sensitive information)
    return NextResponse.json({
      applicationId: application.applicationId,
      companyName: application.companyName,
      contactName: application.contactName,
      projectTitle: application.projectTitle,
      status: application.status,
      createdAt: application.createdAt,
      attachments: application.attachments
    });

  } catch (error) {
    console.error("Application retrieval error:", error);
    return NextResponse.json(
      { error: "신청서 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}