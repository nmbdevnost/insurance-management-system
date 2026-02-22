import { format } from "date-fns";
import InsuranceTable from "./insurance-table";

const InsurancesPage = () => {
  return (
    <>
      <div>
        <h1 className="page-heading">Insurance Page</h1>
        <p className="text-muted-foreground text-sm">
          Kathmandu Branch &bull; Last Updated:{" "}
          {format(new Date(), "PPP hh:mm a")}
        </p>
      </div>
      <div>
        <InsuranceTable />
      </div>
    </>
  );
};

export default InsurancesPage;
