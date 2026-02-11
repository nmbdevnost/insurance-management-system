import VariablesList from "@/modules/control-panel/components/variable/variable-list";
import VariablesNotFound from "@/modules/control-panel/components/variable/variables-not-found";
import {
  templateSchema,
  templateSchemaDefaultValues,
} from "@/modules/control-panel/lib/schemas/template-schema";
import DialogForm from "@/shared/components/dialogs/dialog-form";
import { Button } from "@/shared/components/ui/button";
import { FieldSet } from "@/shared/components/ui/field";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Separator } from "@/shared/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { RiAddLine, RiArrowRightSLine } from "@remixicon/react";
import { useState } from "react";
import { variables } from "../sections/variable-section";
import AddEmailTemplateForm from "./add-email-template-form";

const AddEmailTemplate = () => {
  const [open, setOpen] = useState(false);
  const [variablesOpen, setVariablesOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <RiAddLine />
        New Template
      </Button>

      <DialogForm
        open={open}
        onOpenChange={() => {
          setOpen(false);
          setVariablesOpen(true);
        }}
        schema={templateSchema}
        onSubmit={() => {}}
        defaultValues={templateSchemaDefaultValues}
        className="max-w-5xl!"
        title="Create Email Template"
        description="Design a new automated email template for your notifications."
        scrollableBody={false}
      >
        <div className="flex max-h-[75vh]">
          <ScrollArea className="max-h-full flex-1 transition-all duration-300">
            <FieldSet className="p-4">
              <AddEmailTemplateForm />
            </FieldSet>
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
                    type="button"
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
      </DialogForm>
    </>
  );
};

export default AddEmailTemplate;
