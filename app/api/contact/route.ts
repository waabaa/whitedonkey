import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Contact form submission interface
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { 
          error: "필수 항목을 모두 입력해주세요.",
          details: "이름, 이메일, 제목, 메시지는 필수입니다." 
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "올바른 이메일 주소를 입력해주세요." },
        { status: 400 }
      );
    }

    // Create contact inquiry in database
    const contactInquiry = await prisma.contactInquiry.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        company: body.company?.trim() || null,
        subject: body.subject.trim(),
        message: body.message.trim(),
        status: "PENDING",
        createdAt: new Date()
      }
    });

    console.log("Contact inquiry created:", {
      id: contactInquiry.id,
      name: contactInquiry.name,
      email: contactInquiry.email,
      subject: contactInquiry.subject
    });

    // Return success response
    return NextResponse.json({
      success: true,
      inquiryId: contactInquiry.id,
      message: "문의가 성공적으로 접수되었습니다. 24시간 이내에 답변드리겠습니다."
    }, { status: 201 });

  } catch (error) {
    console.error("Contact form submission error:", error);
    
    // Handle database connection errors
    if (error instanceof Error && error.message.includes("connect")) {
      return NextResponse.json(
        { error: "데이터베이스 연결 오류입니다. 잠시 후 다시 시도해주세요." },
        { status: 503 }
      );
    }

    // Handle unique constraint errors (duplicate email in short time)
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "동일한 이메일로 최근에 문의하셨습니다. 잠시 후 다시 시도해주세요." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "문의 접수 중 오류가 발생했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}

// GET endpoint for retrieving contact inquiries (admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const inquiryId = searchParams.get("id");
    
    if (inquiryId) {
      // Get specific inquiry by ID
      const inquiry = await prisma.contactInquiry.findUnique({
        where: { id: parseInt(inquiryId) },
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          subject: true,
          message: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!inquiry) {
        return NextResponse.json(
          { error: "문의를 찾을 수 없습니다." },
          { status: 404 }
        );
      }

      return NextResponse.json(inquiry);
    } else {
      // Get all inquiries (with pagination)
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "20");
      const offset = (page - 1) * limit;

      const [inquiries, total] = await Promise.all([
        prisma.contactInquiry.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            subject: true,
            status: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' },
          skip: offset,
          take: limit
        }),
        prisma.contactInquiry.count()
      ]);

      return NextResponse.json({
        inquiries,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    }

  } catch (error) {
    console.error("Contact inquiry retrieval error:", error);
    return NextResponse.json(
      { error: "문의 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}