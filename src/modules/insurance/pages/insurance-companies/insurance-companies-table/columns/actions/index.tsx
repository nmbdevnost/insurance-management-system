import type { InsuranceCompany } from "@/shared/lib/types/insurance";
import InsuranceCompanyEditAction from "./insurance-company-edit-action";

const InsuranceCompanyActions = ({
  rowData,
}: {
  rowData: InsuranceCompany;
}) => {
  return (
    <>
      <InsuranceCompanyEditAction
        initialValues={{
          accountNumber: rowData.account_number,
          companyName: rowData.company_name,
          address: rowData.address,
          contactPersonOne: rowData.contact_person_one,
          contactPersonTwo: rowData.contact_person_two,
          email: rowData.email,
          phoneNumber: rowData.phone_number,
        }}
      />
    </>
  );
};

export default InsuranceCompanyActions;
