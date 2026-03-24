import type { FileMimeType } from "../types/file";

export const FILE_TYPE_MAP = {
  // Images
  png: "image/png",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  // Documents
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // Text
  txt: "text/plain",
  csv: "text/csv",
  // Audio
  mp3: "audio/mpeg",
  wav: "audio/wav",
  // Video
  mp4: "video/mp4",
  webm: "video/webm",
  // Wildcard
  "*": "*",
} as const satisfies Record<string, FileMimeType>;

export type FileType = keyof typeof FILE_TYPE_MAP;
