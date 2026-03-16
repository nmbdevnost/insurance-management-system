import type { InsuranceCompany } from "@/shared/lib/types/insurance";
import type { ColumnDef } from "@tanstack/react-table";
import InsuranceCompanyActions from "./actions";

const insuranceCompaniesColumns: ColumnDef<InsuranceCompany>[] = [
  {
    accessorKey: "cif_id",
    header: "CIF ID",
  },
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "account_number",
    header: "Account Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "contact_person_one",
    header: "Contact Person One",
  },
  {
    accessorKey: "contact_person_two",
    header: "Contact Person Two",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <InsuranceCompanyActions rowData={row.original} />,
    meta: {
      pin: "right",
    },
  },
];

export default insuranceCompaniesColumns;
