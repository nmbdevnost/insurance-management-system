import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { format } from "date-fns";
import ExpiredLoanTab from "./tabs/expired-loan";
import ExpiredPolicyTab from "./tabs/expired-policy";
import LoanNotExpiredTab from "./tabs/loan-not-expired";

const ExpiredIsurancePage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-heading">Insurance Expiry & Renewal</h1>
          <p className="text-muted-foreground text-sm">
            Kathmandu Branch &bull; Last Updated:{" "}
            {format(new Date(), "PPP hh:mm a")}
          </p>
        </div>
      </div>

      {/* <div className="grid gap-4 lg:grid-cols-3">
        <StatCard
          title="Urgent (<= 7 days)"
          value="10"
          className="border-l-4 border-red-500"
        />
        <StatCard
          title="Reminder (8-30 days)"
          value="10"
          className="border-l-4 border-yellow-500"
        />
        <StatCard
          title="Expired (> 30 days)"
          value="10"
          className="border-l-4 border-green-500"
        />
      </div> */}

      <Tabs defaultValue="expired-policy" className="gap-0">
        <TabsList className="ml-4 rounded-b-none border">
          <TabsTrigger
            className="data-active:bg-primary data-active:text-primary-foreground!"
            value="expired-policy"
          >
            Expired Policy
          </TabsTrigger>
          <TabsTrigger
            className="data-active:bg-primary data-active:text-primary-foreground!"
            value="expired-loan"
          >
            Expired Loan
          </TabsTrigger>
          <TabsTrigger
            className="data-active:bg-primary data-active:text-primary-foreground!"
            value="loan-not-expired"
          >
            Loan Not Expired
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expired-policy">
          <ExpiredPolicyTab />
        </TabsContent>

        <TabsContent value="expired-loan">
          <ExpiredLoanTab />
        </TabsContent>

        <TabsContent value="loan-not-expired">
          <LoanNotExpiredTab />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ExpiredIsurancePage;
