import { toast } from "sonner";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isArrayOfRecords(
  value: unknown
): value is Array<Record<string, unknown>> {
  return Array.isArray(value) && value.every(isRecord);
}

export function handleErrorResponse(
  error: unknown,
  includeDetails = false
): void {
  const fallback = "An error occurred while processing your request.";

  if (!isRecord(error)) {
    if (isString(error)) {
      toast.error(error);
    } else {
      toast.error(fallback);
    }
    return;
  }

  const response = error.response;
  if (!isRecord(response)) {
    if (isString(error)) {
      toast.error(error);
    } else {
      toast.error(fallback);
    }
    return;
  }

  const data = response.data;
  if (!isRecord(data)) {
    if (isString(error)) {
      toast.error(error);
    } else {
      toast.error(fallback);
    }
    return;
  }

  const serverError = data.error;
  if (!isRecord(serverError)) {
    toast.error(fallback);
    return;
  }

  // Main message (priority 1)
  if (isString(serverError.message) && serverError.message.trim()) {
    toast.error(serverError.message.trim(), {
      duration: 5000,
      dismissible: true,
    });

    if (!includeDetails) return;
  }

  // Validation errors – one toast per message (priority 2)
  const validationErrors = serverError.validationErrors;
  if (isArrayOfRecords(validationErrors)) {
    validationErrors.forEach((valErr) => {
      if (isRecord(valErr)) {
        const msg = valErr.message;
        if (isString(msg) && msg.trim()) {
          toast.error(msg.trim(), {
            duration: 6000,
            dismissible: true,
          });
        }
      }
    });
  }
  // Details summary as fallback (only if no validation errors)
  else if (isString(serverError.details) && serverError.details.trim()) {
    const summary = serverError.details
      .split(/[\r\n]+/)
      .map((line) => line.trim())
      .filter((line): line is string => !!line)
      .join(" • ");

    if (summary) {
      toast.error(summary, { duration: 7000 });
    }
  }
}
