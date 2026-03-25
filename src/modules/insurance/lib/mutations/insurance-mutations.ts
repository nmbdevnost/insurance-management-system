import { handleErrorResponse } from "@/shared/lib/utils/error";
import { mutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createBankInducedInsurance as createBankInducedInsuranceApi,
  createClientInducedInsurance as createClientInducedInsuranceApi,
} from "../api/insurances-api";

export const createBankInducedInsurance = mutationOptions({
  mutationFn: createBankInducedInsuranceApi,
  onSuccess: (data) => {
    toast.success(data.result.message ?? "Insurance created successfully.");
  },
  onError: (error) => {
    handleErrorResponse(error);
    console.log(error);
  },
});

export const createClientInducedInsurance = mutationOptions({
  mutationFn: createClientInducedInsuranceApi,
  onSuccess: (data) => {
    toast.success(data.result.message ?? "Insurance created successfully.");
  },
  onError: (error) => {
    handleErrorResponse(error);
    console.log(error);
  },
});
