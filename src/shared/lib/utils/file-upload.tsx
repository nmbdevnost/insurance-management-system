import type { FileMetadata } from "@/shared/hooks/use-file-upload";
import {
  RiFileLine,
  RiFilePdf2Line,
  RiFileTextLine,
  RiFolderZipLine,
  RiHeadphoneLine,
  RiImageLine,
  RiVideoLine,
} from "@remixicon/react";

export const getFileIcon = (file: File | FileMetadata) => {
  const type = file instanceof File ? file.type : file.type;
  if (type.startsWith("image/")) return <RiImageLine className="size-4" />;
  if (type.startsWith("video/")) return <RiVideoLine className="size-4" />;
  if (type.startsWith("audio/")) return <RiHeadphoneLine className="size-4" />;
  if (type.includes("pdf")) return <RiFilePdf2Line className="size-4" />;
  if (type.includes("word") || type.includes("doc"))
    return <RiFileTextLine className="size-4" />;
  if (type.includes("excel") || type.includes("sheet"))
    return <RiFileTextLine className="size-4" />;
  if (type.includes("zip") || type.includes("rar"))
    return <RiFolderZipLine className="size-4" />;
  return <RiFileLine className="size-4" />;
};

export const getFileTypeLabel = (file: File | FileMetadata) => {
  const type = file instanceof File ? file.type : file.type;
  if (type.startsWith("image/")) return "Image";
  if (type.startsWith("video/")) return "Video";
  if (type.startsWith("audio/")) return "Audio";
  if (type.includes("pdf")) return "PDF";
  if (type.includes("word") || type.includes(".doc")) return "Word";
  if (type.includes("excel") || type.includes(".sheet")) return "Excel";
  if (type.includes("zip") || type.includes("rar")) return "Archive";
  if (type.includes("json")) return "JSON";
  if (type.includes("text")) return "Text";
  return "File";
};
