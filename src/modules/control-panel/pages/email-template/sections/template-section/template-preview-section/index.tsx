import TemplatePreview from "@/modules/control-panel/components/template/template-preview";
import TemplateNotSelected from "@/modules/control-panel/components/template/template-preview/template-not-selected";
import { Button } from "@/shared/components/ui/button";
import { ButtonGroup } from "@/shared/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import type { Template } from "@/shared/lib/types/email-templates";
import {
  RiClipboardLine,
  RiDeleteBinLine,
  RiMore2Line,
  RiPencilLine,
  RiSendInsLine,
  RiSendPlaneLine,
  RiTimeLine,
} from "@remixicon/react";

const TemplatePreviewSection = ({
  selectedTemplate,
}: {
  selectedTemplate: Template | null;
}) => {
  return (
    <section className="flex-1 border-x">
      {selectedTemplate ? (
        <>
          <ScrollArea className="h-[calc(100vh-140px)] flex-1">
            <header className="bg-card flex h-24 items-center border-b px-4">
              <div className="flex flex-1 items-start justify-between">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="leading-tight font-medium">
                      {selectedTemplate.name}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {selectedTemplate.description}
                  </p>

                  <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <RiSendPlaneLine className="size-4" />
                      Used {selectedTemplate.usageCount} times
                    </span>
                    <span className="flex items-center gap-1">
                      <RiTimeLine className="size-4" />
                      Modified {selectedTemplate.lastModified}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <ButtonGroup>
                    <Button variant="outline" size="sm">
                      <RiSendInsLine />
                      Send
                    </Button>

                    <DropdownMenu>
                      <Tooltip delay={500}>
                        <TooltipTrigger
                          render={
                            <DropdownMenuTrigger
                              render={
                                <Button variant="outline" size="icon-sm" />
                              }
                            >
                              <RiMore2Line />
                            </DropdownMenuTrigger>
                          }
                        />

                        <TooltipContent>More</TooltipContent>
                      </Tooltip>
                      <DropdownMenuContent
                        align="end"
                        className="w-full max-w-md!"
                      >
                        <DropdownMenuItem>
                          <RiPencilLine />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          <RiClipboardLine />
                          Duplicate
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem variant="destructive">
                          <RiDeleteBinLine />
                          Delete Template
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ButtonGroup>
                </div>
              </div>
            </header>

            <div className="mx-auto max-w-3xl space-y-6 p-4">
              <TemplatePreview template={selectedTemplate} />
            </div>
          </ScrollArea>
        </>
      ) : (
        <TemplateNotSelected />
      )}
    </section>
  );
};

export default TemplatePreviewSection;
