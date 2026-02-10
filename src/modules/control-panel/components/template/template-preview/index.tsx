import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import type { Template } from "@/shared/lib/types/email-templates";
import { Separator } from "@base-ui/react";
import {
  RiAlertLine,
  RiBracesLine,
  RiCodeLine,
  RiHeading,
  RiSparklingLine,
} from "@remixicon/react";
import VariablesList from "../../variable/variable-list";

const TemplatePreview = ({ template }: { template?: Template }) => {
  if (!template) return null;

  const usedVariables = template.variables || [];

  return (
    <>
      {/* Subject Line */}
      <div>
        <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
          <RiHeading className="size-3.5" />
          Subject Line
        </Label>
        <Card className="p-4">
          <p className="text-sm leading-relaxed font-medium">
            {template.subject}
          </p>
        </Card>
      </div>

      {/* Email Body */}
      <div>
        <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
          <RiBracesLine className="size-3.5" />
          Email Body
        </Label>
        <Card className="p-4">
          <div className="prose prose-sm max-w-none">
            <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap">
              {template.body}
            </pre>
          </div>
        </Card>
      </div>

      {/* Variables Used */}
      <div>
        <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
          <RiCodeLine className="size-3.5" />
          Variables Used{" "}
          {usedVariables.length > 0 && <span>({usedVariables.length})</span>}
        </Label>

        {usedVariables.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            <VariablesList variables={usedVariables} />
          </div>
        ) : (
          <Card className="p-4">
            <p className="text-muted-foreground text-sm">
              No variables detected in this template.
            </p>
          </Card>
        )}
      </div>

      {/* Preview with Variables */}
      <div>
        <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
          <RiSparklingLine className="size-3.5" />
          Preview with Sample Data
        </Label>
        <Card>
          <CardHeader>
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Subject:
            </p>
            <p className="mt-1 text-sm font-medium">
              {template.subject
                .replace(/\{\{customer_name\}\}/g, "John Smith")
                .replace(/\{\{policy_number\}\}/g, "POL-2024-001")
                .replace(/\{\{days_remaining\}\}/g, "7")}
            </p>
          </CardHeader>

          <Separator className="my-4" />

          <CardContent className="prose prose-sm max-w-none">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Body:
            </p>

            <pre className="mt-1 font-sans text-sm leading-relaxed whitespace-pre-wrap">
              {template.body
                .replace(/\{\{customer_name\}\}/g, "John Smith")
                .replace(/\{\{policy_number\}\}/g, "POL-2024-001")
                .replace(/\{\{insurance_company\}\}/g, "ABC Insurance Co.")
                .replace(/\{\{expiry_date\}\}/g, "March 15, 2026")
                .replace(/\{\{days_remaining\}\}/g, "7")
                .replace(/\{\{coverage_amount\}\}/g, "$100,000")
                .replace(/\{\{premium_amount\}\}/g, "$500/month")}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Info Box */}
      <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <RiAlertLine className="mt-0.5 size-5 shrink-0 text-blue-600" />
        <div className="space-y-1">
          <p className="text-xs font-medium text-blue-900">Dynamic Variables</p>
          <p className="text-xs leading-relaxed text-blue-700">
            This template uses {(template.body.match(/\{\{/g) || []).length}{" "}
            variables that will be automatically replaced with real customer
            data when emails are sent.
          </p>
        </div>
      </div>
    </>
  );
};

export default TemplatePreview;
