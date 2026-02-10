import VariablesList from "@/modules/control-panel/components/variable/variable-list";
import VariablesNotFound from "@/modules/control-panel/components/variable/variables-not-found";
import SearchInput from "@/shared/components/search-input";
import { ButtonGroup } from "@/shared/components/ui/button-group";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import type { Variable } from "@/shared/lib/types/email-templates";
import AddVariable from "./add-variable";

export const variables: Variable[] = [
  {
    key: "{{customer_name}}",
    description: "Customer's full name",
    example: "John Smith",
    category: "customer",
  },
  {
    key: "{{policy_number}}",
    description: "Insurance policy number",
    example: "POL-2024-001",
    category: "policy",
  },
  {
    key: "{{insurance_company}}",
    description: "Insurance provider name",
    example: "ABC Insurance Co.",
    category: "policy",
  },
  {
    key: "{{expiry_date}}",
    description: "Policy expiration date",
    example: "March 15, 2026",
    category: "dates",
  },
  {
    key: "{{days_remaining}}",
    description: "Days until expiry",
    example: "7 days",
    category: "dates",
  },
  {
    key: "{{coverage_amount}}",
    description: "Policy coverage amount",
    example: "$100,000",
    category: "financial",
  },
  {
    key: "{{premium_amount}}",
    description: "Premium payment amount",
    example: "$500/month",
    category: "financial",
  },
];

const VariablesSection = () => {
  return (
    <section className="max-w-80 flex-1">
      <header className="bg-card sticky top-0 z-10 flex h-24 items-center border-b">
        <div className="flex-1 space-y-2 p-4">
          <h3 className="leading-tight font-medium">Variables</h3>

          <ButtonGroup className="w-full">
            <SearchInput />
            <AddVariable />
          </ButtonGroup>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-140px-96px)]">
        <div className="space-y-2 p-2 pr-3">
          {variables.length > 0 ? (
            <VariablesList variables={variables} />
          ) : (
            <VariablesNotFound />
          )}
        </div>
      </ScrollArea>
    </section>
  );
};

export default VariablesSection;
