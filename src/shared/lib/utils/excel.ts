import readXlsxFile from "read-excel-file";

/**
 * Parses an Excel file and returns an array of objects.
 * @param file The Excel file to parse.
 * @returns An array of objects, where each object represents a row in the Excel file.
 */
export const parseExcelFile = async (
  file: File,
  expectedColumns?: readonly string[] | string[]
): Promise<Record<string, unknown>[] | { errors: string[] }> => {
  try {
    const rows = await readXlsxFile(file);

    if (rows.length === 0) {
      return [];
    }

    const headers = rows[0] as string[];

    if (expectedColumns) {
      const headerSet = new Set(headers.map((h) => h.trim()));

      const missingColumns = expectedColumns.filter(
        (col) => !headerSet.has(col)
      );

      const errors: string[] = [];

      if (missingColumns.length > 0) {
        errors.push(
          `Missing required columns: ${missingColumns.join(", ")} in ${file.name}.`
        );
      }

      if (errors.length > 0) {
        return { errors };
      }
    }

    const rowData = rows.slice(1).map((row) => {
      return headers.reduce(
        (obj, header, index) => {
          obj[header] = row[index];
          return obj;
        },
        {} as Record<string, unknown>
      );
    });

    return rowData;
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    throw new Error(
      `Failed to parse Excel file: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
