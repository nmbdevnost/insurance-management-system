import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";

const AddVariable = () => {
  const [open, setOpen] = useState(false);
  console.log(open);
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

      {/* <DialogForm
        open={open}
        onOpenChange={setOpen}
        schema={z.object({ name: z.string().min(2).max(100) })}
        onSubmit={() => {}}
        defaultValues={}
        title="Add Variable"
        description="Add a new variable to be used in email templates."
        className="w-full"
      ></DialogForm> */}
    </>
  );
};

export default AddVariable;
