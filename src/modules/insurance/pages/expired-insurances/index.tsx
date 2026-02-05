import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { format } from "date-fns";
import { useState } from "react";
import ExpiredLoanTab from "./tabs/expired-loan";
import ExpiredPolicyTab from "./tabs/expired-policy";
import LoanNotExpiredTab from "./tabs/loan-not-expired";

const ExpiredIsurancePage = () => {
  const [tab, setTab] = useState("expired-policy");

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

      <Tabs className="gap-0" value={tab} onValueChange={setTab}>
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
