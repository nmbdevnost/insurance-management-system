import VariablesList from "@/modules/control-panel/components/variable/variable-list";
import VariablesNotFound from "@/modules/control-panel/components/variable/variables-not-found";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Separator } from "@/shared/components/ui/separator";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { RiAddLine, RiArrowRightSLine, RiCodeLine } from "@remixicon/react";
import { useState } from "react";
import { variables } from "../sections/variable-section";

const CATEGORY_OPTIONS = [
  {
    label: "Reminder",
    value: "reminder",
  },
  {
    label: "Notification",
    value: "notification",
  },
  {
    label: "Confirmation",
    value: "confirmation",
  },
];

const AddEmailTemplate = () => {
  const [open, setOpen] = useState(false);
  const [variablesOpen, setVariablesOpen] = useState(true);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setVariablesOpen(true);
      }}
    >
      <DialogTrigger render={<Button onClick={() => setOpen(true)} />}>
        <RiAddLine className="size-4" />
        New Template
      </DialogTrigger>

      <DialogContent className="max-w-5xl! gap-0 p-0">
        <DialogHeader className="p-4">
          <DialogTitle>Create Email Template</DialogTitle>
          <DialogDescription>
            Design a new automated email template for your notifications
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex max-h-[70vh]">
          <ScrollArea className="h-full flex-1 transition-all duration-300">
            <div className="space-y-4 p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name *</Label>
                  <Input
                    id="template-name"
                    placeholder="e.g., Initial Reminder"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-category">Category *</Label>
                  <Select items={CATEGORY_OPTIONS}>
                    <SelectTrigger id="template-category" className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((option) => (
                        <SelectItem value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of when this template is used"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject Line *</Label>
                <Input
                  id="subject"
                  placeholder="Use variables like {{customer_name}}"
                  className="font-medium"
                />
              </div>

              <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <RiCodeLine className="mt-0.5 size-4 shrink-0 text-blue-600" />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-blue-900">
                    Available Variables
                  </p>
                  <p className="text-xs leading-relaxed text-blue-700">
                    Click variables in the sidebar to copy and paste them into
                    your template.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Email Body *</Label>
                <Textarea
                  id="body"
                  placeholder="Compose your email template here. Use variables in {{double_braces}} format."
                  rows={12}
                  className="min-h-48 resize-none font-mono text-sm"
                />
              </div>
            </div>
          </ScrollArea>

          <Separator orientation="vertical" />

          <div
            className={cn(
              "relative h-full max-w-70 flex-1 transition-all duration-300",
              !variablesOpen && "max-w-0"
            )}
          >
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="icon-sm"
                    className="absolute top-1 -left-7 z-10 rounded-r-none"
                    onClick={() => setVariablesOpen(!variablesOpen)}
                  >
                    <RiArrowRightSLine
                      className={cn(
                        "transition-transform duration-150",
                        !variablesOpen && "rotate-180"
                      )}
                    />
                  </Button>
                }
              />
              <TooltipContent>Toggle Variables Panel</TooltipContent>
            </Tooltip>

            <ScrollArea className={variablesOpen ? "h-full" : "opacity-0"}>
              <div className="space-y-2 p-4">
                <h3 className="leading-tight font-medium">
                  Available Variables
                </h3>

                {variables.length > 0 ? (
                  <VariablesList variables={variables} />
                ) : (
                  <VariablesNotFound />
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="m-0">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={() => setOpen(false)}>Create Template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmailTemplate;
