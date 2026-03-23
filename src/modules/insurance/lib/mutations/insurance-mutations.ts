import { handleErrorResponse } from "@/shared/lib/utils/error";
import { mutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { createInsurance as createMutationApi } from "../api/insurances-api";

export const createInsurance = mutationOptions({
  mutationFn: createMutationApi,
  onSuccess: (data) => {
    toast.success(data.result.message ?? "Insurance created successfully.");
  },
  onError: (error) => {
    handleErrorResponse(error);
    console.log(error);
  },
});
