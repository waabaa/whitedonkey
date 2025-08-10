import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { FILE_UPLOAD_CONFIG } from "@/lib/constants";
import { sanitizeFilename } from "@/lib/utils";

// File signature validation
const FILE_SIGNATURES: { [key: string]: number[][] } = {
  "image/jpeg": [[0xFF, 0xD8, 0xFF]],
  "image/png": [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]],
  "application/pdf": [[0x25, 0x50, 0x44, 0x46]],
  "application/msword": [[0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1]],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    [0x50, 0x4B, 0x03, 0x04],
    [0x50, 0x4B, 0x05, 0x06],
    [0x50, 0x4B, 0x07, 0x08]
  ],
};

function validateFileSignature(buffer: ArrayBuffer, mimeType: string): boolean {
  const signatures = FILE_SIGNATURES[mimeType];
  if (!signatures) return false;

  const bytes = new Uint8Array(buffer.slice(0, 8));
  
  return signatures.some(signature => {
    return signature.every((byte, index) => bytes[index] === byte);
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "파일이 선택되지 않았습니다." },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > FILE_UPLOAD_CONFIG.maxFileSize) {
      return NextResponse.json(
        { 
          error: `파일 크기가 너무 큽니다. 최대 ${Math.round(FILE_UPLOAD_CONFIG.maxFileSize / 1024 / 1024)}MB까지 업로드 가능합니다.` 
        },
        { status: 400 }
      );
    }

    // Validate file type
    if (!FILE_UPLOAD_CONFIG.allowedTypes.includes(file.type as any)) {
      return NextResponse.json(
        { error: "지원하지 않는 파일 형식입니다." },
        { status: 400 }
      );
    }

    // Validate file signature
    const buffer = await file.arrayBuffer();
    if (!validateFileSignature(buffer, file.type)) {
      return NextResponse.json(
        { error: "파일이 손상되었거나 올바르지 않습니다." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const originalName = sanitizeFilename(file.name);
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);
    const uniqueId = crypto.randomUUID();
    const filename = `${nameWithoutExt}_${uniqueId}${ext}`;

    // Ensure upload directory exists
    const uploadDir = FILE_UPLOAD_CONFIG.uploadDir;
    await mkdir(uploadDir, { recursive: true });

    // Write file to disk
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, new Uint8Array(buffer));

    // Save file info to database
    const attachment = await prisma.attachment.create({
      data: {
        filename: filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: `/uploads/${filename}`,
        applicationId: null // applicationId will be set when application is created
      } as any
    });

    return NextResponse.json({
      id: attachment.id,
      filename: attachment.filename,
      originalName: attachment.originalName,
      size: attachment.size,
      mimeType: attachment.mimeType,
      url: attachment.url,
    });

  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "파일 업로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

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
      await unlink(path.join(process.cwd(), attachment.url.replace('/', '')));
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