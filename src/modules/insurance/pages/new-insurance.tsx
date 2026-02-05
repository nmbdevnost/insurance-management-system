import { DataTableDropdownFilter } from "@/shared/components/data-table/data-table-filters";
import type { DropdownOption } from "@/shared/lib/types/dropdown";
import { useState } from "react";

// Insurance Type Options
const insuranceTypeOptions: DropdownOption[] = [
  { label: "Life Insurance", value: "life_insurance" },
  { label: "Health Insurance", value: "health_insurance" },
  { label: "Motor Insurance", value: "motor_insurance" },
  { label: "Property Insurance", value: "property_insurance" },
  { label: "Accident Insurance", value: "accident_insurance" },
  { label: "Travel Insurance", value: "travel_insurance" },
  { label: "Fire Insurance", value: "fire_insurance" },
];

// Segment Options
const segmentOptions: DropdownOption[] = [
  { label: "Individual", value: "individual" },
  { label: "Family", value: "family" },
  { label: "Corporate", value: "corporate" },
  { label: "Group", value: "group" },
  { label: "SME", value: "sme" },
];

// Province Options (Nepal)
const provinceOptions: DropdownOption[] = [
  { label: "Koshi Province", value: "koshi" },
  { label: "Madhesh Province", value: "madhesh" },
  { label: "Bagmati Province", value: "bagmati" },
  { label: "Gandaki Province", value: "gandaki" },
  { label: "Lumbini Province", value: "lumbini" },
  { label: "Karnali Province", value: "karnali" },
  { label: "Sudurpashchim Province", value: "sudurpashchim" },
];

// Insurance Company Options
const insuranceCompanyOptions: DropdownOption[] = [
  { label: "Nepal Life Insurance Co. Ltd.", value: "nepal_life" },
  { label: "Prabhu Insurance Ltd.", value: "prabhu_insurance" },
  { label: "Shikhar Insurance Co. Ltd.", value: "shikhar_insurance" },
  { label: "Himalayan General Insurance Co. Ltd.", value: "himalayan_general" },
  { label: "Siddhartha Insurance Ltd.", value: "siddhartha_insurance" },
  { label: "National Life Insurance Co. Ltd.", value: "national_life" },
  { label: "Premier Insurance Co. Ltd.", value: "premier_insurance" },
];

// Branch Options
const branchOptions: DropdownOption[] = [
  { label: "Kathmandu Branch", value: "kathmandu" },
  { label: "Pokhara Branch", value: "pokhara" },
  { label: "Biratnagar Branch", value: "biratnagar" },
  { label: "Butwal Branch", value: "butwal" },
  { label: "Dhangadhi Branch", value: "dhangadhi" },
  { label: "Chitwan Branch", value: "chitwan" },
  { label: "Lalitpur Branch", value: "lalitpur" },
  { label: "Birgunj Branch", value: "birgunj" },
];

// Status Options
const statusOptions: DropdownOption[] = [
  { label: "Current", value: "current" },
  { label: "Expired", value: "expired" },
  { label: "On Hold", value: "on_hold" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Pending", value: "pending" },
];

// Account Status Options
const accountStatusOptions: DropdownOption[] = [
  { label: "Active", value: "active" },
  { label: "Closed", value: "closed" },
  { label: "Suspended", value: "suspended" },
  { label: "Inactive", value: "inactive" },
];

const allOptions = [
  ...insuranceTypeOptions,
  ...segmentOptions,
  ...provinceOptions,
  ...insuranceCompanyOptions,
  ...branchOptions,
  ...statusOptions,
  ...accountStatusOptions,
];

const NewInsurancePage = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <div>
      <DataTableDropdownFilter
        id="status"
        label="Status"
        disableSearch
        options={allOptions}
        selectedValue={value ? [value] : []}
        onValueChange={(_name, value) => {
          setValue(value[0]);
        }}
      />
    </div>
  );
};

export default NewInsurancePage;
