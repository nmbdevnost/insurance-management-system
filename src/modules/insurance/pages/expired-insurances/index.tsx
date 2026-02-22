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
import { Typography } from "@/shared/components/ui/typography";

const ExpiredIsurancePage = () => {
  const [tab, setTab] = useState("expired-policy");

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h3" as="h1">
            Insurance Expiry & Renewal
          </Typography>

          <Typography muted>
            Kathmandu Branch &bull; Last Updated:{" "}
            {format(new Date(), "PPP hh:mm a")}
          </Typography>
        </div>
      </div>

      <Tabs className="gap-0" value={tab} onValueChange={setTab}>
        <TabsList className="ml-4 rounded-b-none border">
          <TabsTrigger
            className="data-active:bg-primary data-active:text-primary-foreground!"
            value="expired-policy"
          >
            Expired List
          </TabsTrigger>
          <TabsTrigger
            className="data-active:bg-primary data-active:text-primary-foreground!"
            value="expired-loan"
          >
            Loan Closed
          </TabsTrigger>
          <TabsTrigger
            className="data-active:bg-primary data-active:text-primary-foreground!"
            value="loan-not-expired"
          >
            Loan Not Closed
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
