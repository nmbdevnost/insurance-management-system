import { Badge } from "@/shared/components/ui/badge";
import type { Template } from "@/shared/lib/types/email-templates";
import { cn } from "@/shared/lib/utils";
import { RiTimeLine } from "@remixicon/react";

type TemplateListItemProps = {
  template: Template;
  onSelect: (template: Template) => void;
  isSelected: boolean;
};

const TemplateListItem = ({
  template,
  onSelect,
  isSelected,
}: TemplateListItemProps) => {
  return (
    <button
      onClick={() => onSelect(template)}
      className={cn(
        "group hover:bg-muted w-full border-r-2 p-3 text-left transition-all",
        isSelected
          ? "bg-accent/10 hover:bg-accent/10 border-accent"
          : "bg-card border-card hover:shadow-sm"
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm leading-tight font-medium">
              {template.name}
            </h3>
          </div>
        </div>

        <Badge variant="outline" className="bg-background h-5 shrink-0 text-xs">
          {template.usageCount}
        </Badge>
      </div>
      <p className="text-muted-foreground mb-2 line-clamp-2 text-xs leading-relaxed">
        {template.description}
      </p>
      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <span className="flex items-center gap-1">
          <RiTimeLine className="size-3" />
          Last modified {template.lastModified}
        </span>
      </div>
    </button>
  );
};

export default TemplateListItem;
