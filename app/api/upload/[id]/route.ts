import { NextRequest, NextResponse } from "next/server";
import path from "path";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  try {
    const { id } = params;

    const attachment = await prisma.attachment.findUnique({
      where: { id }
    });

    if (!attachment) {
      return NextResponse.json(
        { error: "파일을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // Delete file from database
    await prisma.attachment.delete({
      where: { id }
    });

    // Try to delete file from disk (optional - ignore if fails)
    try {
      const { unlink } = await import('fs/promises');
      const filePath = path.join(process.cwd(), attachment.url.replace('/', ''));
      await unlink(filePath);
    } catch (fsError) {
      console.warn("파일 삭제 실패 (무시됨):", fsError);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("File delete error:", error);
    return NextResponse.json(
      { error: "파일 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}