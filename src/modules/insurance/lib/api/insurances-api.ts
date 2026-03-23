import { GET, POST } from "@/shared/lib/api/api";
import type {
  CreateInsuranceBody,
  CreateInsuranceResponse,
} from "../types/insurances";

export const getInsurances = async (tableParams?: Record<string, unknown>) => {
  const page = (tableParams?.page as number) ?? 1;
  const pageSize = (tableParams?.pageSize as number) ?? 10;

  const skip = (page - 1) * pageSize;

  const url = new URL("https://dummyjson.com/todos");
  url.searchParams.set("limit", String(pageSize));
  url.searchParams.set("skip", String(skip));
  if (tableParams?.status)
    url.searchParams.set("status", String(tableParams.status));

  const response = await GET(url.toString());

  const data = response.data;

  return data;
};

export const createInsurance = async (insurance: CreateInsuranceBody) => {
  const response = await POST<CreateInsuranceBody, CreateInsuranceResponse>(
    "/insurance/policy",
    insurance
  );

  return response.data;
};
