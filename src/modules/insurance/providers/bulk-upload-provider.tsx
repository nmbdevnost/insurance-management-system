import { type RowSelectionState } from "@/shared/providers/data-table-provider";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type {
  EnrichedRow,
  ExtractedRow,
  FlowPhase,
  ReviewTab,
} from "../lib/types/bulk-transaction";

interface BulkUploadContextValue {
  tab: FlowPhase;
  setTab: Dispatch<SetStateAction<FlowPhase>>;
  extractedRows: ExtractedRow[];
  setExtractedRows: Dispatch<SetStateAction<ExtractedRow[]>>;
  enrichedRows: EnrichedRow[];
  setEnrichedRows: Dispatch<SetStateAction<EnrichedRow[]>>;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  activeTab: ReviewTab;
  setActiveTab: Dispatch<SetStateAction<ReviewTab>>;
  reset: () => void;
}

interface BulkUploadProviderProps {
  tab: FlowPhase;
  setTab: Dispatch<SetStateAction<FlowPhase>>;
  children: ReactNode;
}

const BulkUploadContext = createContext<BulkUploadContextValue | null>(null);

export const BulkUploadProvider = ({
  tab,
  setTab,
  children,
}: BulkUploadProviderProps) => {
  const [extractedRows, setExtractedRows] = useState<ExtractedRow[]>([]);
  const [enrichedRows, setEnrichedRows] = useState<EnrichedRow[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [activeTab, setActiveTab] = useState<ReviewTab>("all");

  const reset = useCallback(() => {
    setExtractedRows([]);
    setEnrichedRows([]);
    setRowSelection({});
    setActiveTab("all");
    setTab("upload");
  }, [setTab]);

  const value = useMemo(
    () => ({
      tab,
      setTab,
      extractedRows,
      setExtractedRows,
      enrichedRows,
      setEnrichedRows,
      rowSelection,
      setRowSelection,
      activeTab,
      setActiveTab,
      reset,
    }),
    [tab, setTab, extractedRows, enrichedRows, rowSelection, activeTab, reset]
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
