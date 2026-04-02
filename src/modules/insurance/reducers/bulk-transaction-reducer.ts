import type {
  EnrichedRow,
  ExtractedRow,
  FlowPhase,
  ReviewTab,
} from "../lib/types/bulk-transaction";

export interface TransactionState {
  phase: FlowPhase;
  extractedRows: ExtractedRow[];
  enrichedRows: EnrichedRow[];
  selectedIds: Set<string>;
  activeTab: ReviewTab;
}

export type TransactionAction =
  | { type: "SET_PHASE"; payload: FlowPhase }
  | { type: "SET_EXTRACTED_ROWS"; payload: ExtractedRow[] }
  | { type: "SET_ENRICHED_ROWS"; payload: EnrichedRow[] }
  | { type: "TOGGLE_ROW"; payload: string }
  | { type: "TOGGLE_ALL"; payload: { ids: string[]; checked: boolean } }
  | { type: "SET_ACTIVE_TAB"; payload: ReviewTab }
  | { type: "RESET" };

export const initialBulkTransactionState: TransactionState = {
  phase: "upload",
  extractedRows: [],
  enrichedRows: [],
  selectedIds: new Set(),
  activeTab: "all",
};

export function transactionReducer(
  state: TransactionState,
  action: TransactionAction
): TransactionState {
  switch (action.type) {
    case "SET_PHASE":
      return { ...state, phase: action.payload };

    case "SET_EXTRACTED_ROWS":
      return { ...state, extractedRows: action.payload };

    case "SET_ENRICHED_ROWS":
      return { ...state, enrichedRows: action.payload };

    case "TOGGLE_ROW": {
      const next = new Set(state.selectedIds);
      if (next.has(action.payload)) {
        next.delete(action.payload);
      } else {
        next.add(action.payload);
      }
      return { ...state, selectedIds: next };
    }

    case "TOGGLE_ALL": {
      const next = new Set(state.selectedIds);
      action.payload.ids.forEach((id) =>
        action.payload.checked ? next.add(id) : next.delete(id)
      );
      return { ...state, selectedIds: next };
    }

    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };

    case "RESET":
      return { ...initialBulkTransactionState, selectedIds: new Set() };

    default:
      return state;
  }
}
