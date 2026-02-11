import { Badge } from "@/shared/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { variableCategoryColors } from "@/shared/lib/constants/email-template";
import type { Variable } from "@/shared/lib/types/email-templates";
import { cn } from "@/shared/lib/utils";
import { copyToClipboard } from "@/shared/lib/utils/copy-to-clipboard";
import { RiCheckLine, RiClipboardLine } from "@remixicon/react";
import { useState } from "react";

const VariableListItem = ({ variable }: { variable: Variable }) => {
  const { category, description, key, example } = variable || {};

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = (text: string) => {
    copyToClipboard(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={() => handleCopyToClipboard(key)}
      className={cn(
        "group relative w-full rounded-lg border p-3 text-left transition-all hover:shadow-sm active:scale-[0.98]",
        isCopied
          ? "border-emerald-300 ring ring-emerald-100"
          : "bg-card hover:bg-muted"
      )}
      type="button"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <Badge
          variant="outline"
          className={cn("font-mono text-xs", variableCategoryColors[category])}
        >
          {key}
        </Badge>
        {isCopied ? (
          <Badge className="absolute top-2 right-2 flex items-center gap-1 border-emerald-200 bg-emerald-50 text-emerald-600">
            <RiCheckLine className="size-4" />
            <span className="text-xs font-medium">Copied!</span>
          </Badge>
        ) : (
          <Tooltip delay={500}>
            <TooltipTrigger
              render={
                <RiClipboardLine className="text-muted-foreground size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              }
            ></TooltipTrigger>
            <TooltipContent>Copy to Clipboard</TooltipContent>
          </Tooltip>
        )}
      </div>
      <p className="text-muted-foreground mb-2 text-xs leading-relaxed">
        {description}
      </p>
      {example && (
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground">Example:</span>
          <span className="text-foreground font-medium">{example}</span>
        </div>
      )}
    </button>
  );
};

export default VariableListItem;
