import InsuranceCompanyForm from "@/modules/insurance/components/forms/insurance-company-form";
import {
  defaultInsuranceCompanyValues,
  insuranceCompanySchema,
} from "@/modules/insurance/lib/schemas/insurance-company-schema";
import DialogForm from "@/shared/components/dialogs/dialog-form";
import { Button } from "@/shared/components/ui/button";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";

const AddInsuranceCompany = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <RiAddLine />
        Add Insurance Company
      </Button>

      <DialogForm
        open={open}
        onOpenChange={setOpen}
        schema={insuranceCompanySchema}
        onSubmit={() => {}}
        defaultValues={defaultInsuranceCompanyValues}
        title="Create Insurance Company"
        description="Provide the necessary information to register a new insurance provider."
        className="max-w-xl!"
      >
        <InsuranceCompanyForm />
      </DialogForm>
    </>
  );
};

export default AddInsuranceCompany;
