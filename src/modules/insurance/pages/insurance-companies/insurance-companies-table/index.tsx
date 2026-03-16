import DataTable from "@/shared/components/data-table";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import DataTableToolbar from "@/shared/components/data-table/data-table-toolbar";
import { Card, CardFooter, CardHeader } from "@/shared/components/ui/card";
import {
  DataTableProvider,
  type TableParams,
} from "@/shared/providers/data-table-provider";
import insuranceCompaniesColumns from "./columns";
import { useState } from "react";
import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants";
import type { FilterConfig } from "@/shared/lib/types/table";

const InsuranceCompaniesTable = () => {
  const [tableParams, setTableParams] =
    useState<TableParams>(DEFAULT_TABLE_PARAMS);

  const data = [
    {
      cif_id: "CIF8001",
      company_name: "Nepal Insurance Co. Ltd.",
      account_number: "ACC-1001-01",
      address: "Kathmandu, Nepal",
      email: "info@nepalinsurance.com.np",
      phone_number: "+977-1-4234567",
      contact_person_one: "Ram Prasad Sharma",
      contact_person_two: "Sita Devi Gurung",
      status: "active",
    },
    {
      cif_id: "CIF8002",
      company_name: "Shikhar Insurance Co. Ltd.",
      account_number: "ACC-1002-02",
      address: "Lalitpur, Nepal",
      email: "contact@shikharinsurance.com",
      phone_number: "+977-1-5544332",
      contact_person_one: "Hari Bahadur Thapa",
      contact_person_two: "Gita Adhikari",
      status: "active",
    },
    {
      cif_id: "CIF8003",
      company_name: "IME General Insurance Ltd.",
      account_number: "ACC-1003-03",
      address: "Pokhara, Nepal",
      email: "support@imeinsurance.com",
      phone_number: "+977-61-523456",
      contact_person_one: "Bishnu Prasad Khanal",
      contact_person_two: "Radhika Pandey",
      status: "inactive",
    },
    {
      cif_id: "CIF8004",
      company_name: "Sagarmatha Insurance Co. Ltd.",
      account_number: "ACC-1004-04",
      address: "Biratnagar, Nepal",
      email: "info@sagarmathainsurance.com",
      phone_number: "+977-21-412345",
      contact_person_one: "Krishna Kumar Rai",
      contact_person_two: "Mina Sharma",
      status: "active",
    },
    {
      cif_id: "CIF8005",
      company_name: "United Insurance Co. (Nepal) Ltd.",
      account_number: "ACC-1005-05",
      address: "Chitwan, Nepal",
      email: "united@unitedinsurance.com.np",
      phone_number: "+977-56-591234",
      contact_person_one: "Shiva Prasad Dahal",
      contact_person_two: "Sunita Thapa",
      status: "active",
    },
    {
      cif_id: "CIF8006",
      company_name: "Himalayan General Insurance Co. Ltd.",
      account_number: "ACC-1006-06",
      address: "Butwal, Nepal",
      email: "info@himalayaninsurance.com",
      phone_number: "+977-71-534567",
      contact_person_one: "Tek Bahadur Chhetri",
      contact_person_two: "Sabina Gurung",
      status: "inactive",
    },
    {
      cif_id: "CIF8007",
      company_name: "National Life Insurance Co. Ltd.",
      account_number: "ACC-1007-07",
      address: "Kathmandu, Nepal",
      email: "service@nationallife.com.np",
      phone_number: "+977-1-4433221",
      contact_person_one: "Gyanendra Raj Poudel",
      contact_person_two: "Srijana Karki",
      status: "active",
    },
  ];

  const filters: FilterConfig[] = [
    {
      id: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
      type: "select",
      disableSearch: true,
    },
  ];

  return (
    <>
      <DataTableProvider
        data={data}
        columns={insuranceCompaniesColumns}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
      >
        <Card className="gap-0 p-0">
          <CardHeader className="p-2">
            <DataTableToolbar filters={filters} />
          </CardHeader>

          <DataTable className="rounded-none border-x-0" />

          <CardFooter className="bg-card border-t-0 p-2">
            <DataTablePagination className="w-full" />
          </CardFooter>
        </Card>
      </DataTableProvider>
    </>
  );
};

export default InsuranceCompaniesTable;
