import { format } from "date-fns";
import InsuranceTable from "./insurance-table";
import { Typography } from "@/shared/components/ui/typography";

const InsurancesPage = () => {
  return (
    <>
      <div>
        <Typography variant="h3" as="h1">
          Insurance Page
        </Typography>
        <Typography muted>
          Kathmandu Branch &bull; Last Updated:{" "}
          {format(new Date(), "PPP hh:mm a")}
        </Typography>
      </div>
      <div>
        <InsuranceTable />
      </div>
    </>
  );
};

export default InsurancesPage;
