import InsuranceCompanyForm from "@/modules/insurance/components/forms/insurance-company-form";
import {
  insuranceCompanySchema,
  type InsuranceCompanyFormValues,
} from "@/modules/insurance/lib/schemas/insurance-company-schema";
import DialogForm from "@/shared/components/dialogs/dialog-form";
import { Button } from "@/shared/components/ui/button";
import { TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { Tooltip } from "@base-ui/react";
import { RiPencilLine } from "@remixicon/react";
import { useState } from "react";

const InsuranceCompanyEditAction = ({
  initialValues,
}: {
  initialValues: InsuranceCompanyFormValues;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip.Root>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} />
          }
        >
          <RiPencilLine />
        </TooltipTrigger>

        <TooltipContent>Edit</TooltipContent>
      </Tooltip.Root>

      <DialogForm
        open={open}
        onOpenChange={setOpen}
        schema={insuranceCompanySchema}
        onSubmit={() => {}}
        defaultValues={initialValues}
        title="Edit Insurance Company"
        description="Update the information of an existing insurance provider."
        className="max-w-xl!"
        submitText="Edit"
      >
        <InsuranceCompanyForm />
      </DialogForm>
    </>
  );
};

export default InsuranceCompanyEditAction;
