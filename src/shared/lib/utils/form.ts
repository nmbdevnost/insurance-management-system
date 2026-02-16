import type { Path } from "react-hook-form";
import { ZodObject, type ZodType } from "zod";

/**
 * Extracts field names from a Zod schema
 */
export function getSchemaFields<T>(schema: ZodType): Path<T>[] {
  if (schema instanceof ZodObject || ("shape" in schema && schema.shape)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys((schema as any).shape) as Path<T>[];
  }
  return [];
}
