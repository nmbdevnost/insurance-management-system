import {
  variableFormDefaultValues,
  variableSchema,
} from "@/modules/control-panel/lib/schemas/variable-schema";
import DialogForm from "@/shared/components/dialogs/dialog-form";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import AddVariableForm from "./add-variable-form";

const AddVariable = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip delay={500}>
        <TooltipTrigger
          render={
            <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
              <RiAddLine />
            </Button>
          }
        />

        <TooltipContent>Add Variable</TooltipContent>
      </Tooltip>

      <DialogForm
        open={open}
        onOpenChange={setOpen}
        schema={variableSchema}
        onSubmit={(data) => {
          console.log(data);
        }}
        defaultValues={variableFormDefaultValues}
        title="Add Variable"
        description="Add a new variable to be used in email templates."
      >
        <AddVariableForm />
      </DialogForm>
    </>
  );
};

export default AddVariable;
