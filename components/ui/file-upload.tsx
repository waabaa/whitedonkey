"use client";

import * as React from "react";
import { Upload, X, FileText } from "lucide-react";
import { cn, formatFileSize } from "@/lib/utils";
import { FILE_UPLOAD_CONFIG } from "@/lib/constants";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface FileUploadProps {
  onUpload: (files: File[]) => Promise<string[]>;
  onRemove: (fileId: string) => void;
  uploadedFiles: UploadedFile[];
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  onUpload,
  onRemove,
  uploadedFiles,
  maxFiles = FILE_UPLOAD_CONFIG.maxFiles,
  maxSize = FILE_UPLOAD_CONFIG.maxFileSize,
  accept = FILE_UPLOAD_CONFIG.allowedTypes as any,
  disabled = false,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
    // Reset input value
    e.target.value = "";
  };

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;

    // Check file count limit
    if (uploadedFiles.length + files.length > maxFiles) {
      alert(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
      return;
    }

    // Validate files
    const validFiles: File[] = [];
    const errors: string[] = [];

    for (const file of files) {
      // Check file size
      if (file.size > maxSize) {
        errors.push(`${file.name}: 파일 크기가 ${formatFileSize(maxSize)}를 초과했습니다.`);
        continue;
      }

      // Check file type
      if (!accept.includes(file.type)) {
        errors.push(`${file.name}: 지원하지 않는 파일 형식입니다.`);
        continue;
      }

      validFiles.push(file);
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    }

    if (validFiles.length === 0) return;

    try {
      setIsUploading(true);
      await onUpload(validFiles);
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("파일 업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  const canUploadMore = uploadedFiles.length < maxFiles;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      {canUploadMore && !disabled && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            isUploading && "opacity-50 pointer-events-none"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {isUploading ? "업로드 중..." : "파일을 드래그하거나 클릭하여 선택"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                최대 {maxFiles}개 파일, 개당 최대 {formatFileSize(maxSize)}
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOC, DOCX, JPG, PNG, WEBP 파일만 업로드 가능
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 disabled:opacity-50"
            >
              {isUploading ? "업로드 중..." : "파일 선택"}
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept.join(",")}
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            업로드된 파일 ({uploadedFiles.length}/{maxFiles})
          </p>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(file.id)}
                  disabled={disabled}
                  className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Count Limit Message */}
      {!canUploadMore && (
        <p className="text-xs text-muted-foreground text-center">
          최대 파일 개수({maxFiles}개)에 도달했습니다.
        </p>
      )}
    </div>
  );
}