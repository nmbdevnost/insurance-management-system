import { Typography } from "@/shared/components/ui/typography";
import AddInsuranceCompany from "./add-insurance-company";
import InsuranceCompaniesTable from "./insurance-companies-table";

const InsuranceCompaniesPage = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Typography variant="h3" as="h1">
          Insurance Companies
        </Typography>

        <AddInsuranceCompany />
      </div>

      <InsuranceCompaniesTable />
    </>
  );
};

export default InsuranceCompaniesPage;
