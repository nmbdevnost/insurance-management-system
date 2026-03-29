import type { InsuranceBulkUploadRow } from "@/shared/lib/types/insurance";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { BalanceCheckResult } from "../lib/types/insurances";
import type { BulkUploadSteps } from "../pages/bulk-upload";

interface BulkUploadContextValue {
  tab: BulkUploadSteps;
  setTab: Dispatch<SetStateAction<BulkUploadSteps>>;
  extractedRows: InsuranceBulkUploadRow[];
  setExtractedRows: Dispatch<SetStateAction<InsuranceBulkUploadRow[]>>;
  balanceResults: BalanceCheckResult[];
  setBalanceResults: Dispatch<SetStateAction<BalanceCheckResult[]>>;
}

interface BulkUploadProviderProps {
  tab: BulkUploadSteps;
  setTab: Dispatch<SetStateAction<BulkUploadSteps>>;
  children: ReactNode;
}

const BulkUploadContext = createContext<BulkUploadContextValue | null>(null);

export const BulkUploadProvider = ({
  tab,
  setTab,
  children,
}: BulkUploadProviderProps) => {
  const [extractedRows, setExtractedRows] = useState<InsuranceBulkUploadRow[]>(
    []
  );
  const [balanceResults, setBalanceResults] = useState<BalanceCheckResult[]>(
    []
  );

  const value = useMemo(
    () => ({
      tab,
      setTab,
      extractedRows,
      setExtractedRows,
      balanceResults,
      setBalanceResults,
    }),
    [tab, setTab, extractedRows, balanceResults]
  );

  return (
    <BulkUploadContext.Provider value={value}>
      {children}
    </BulkUploadContext.Provider>
  );
};

/**
 * Consumes BulkUploadContext.
 * @throws if used outside of BulkUploadProvider
 */
export const useBulkUpload = (): BulkUploadContextValue => {
  const ctx = useContext(BulkUploadContext);
  if (!ctx)
    throw new Error("useBulkUpload must be used within BulkUploadProvider");
  return ctx;
};
