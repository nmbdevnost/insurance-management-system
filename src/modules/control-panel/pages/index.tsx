import { Card, CardDescription, CardTitle } from "@/shared/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/shared/components/ui/field";
import { Switch } from "@/shared/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { useState } from "react";
import NotificationTimingPage from "./notification-timing";
import SystemConfigurationPage from "./system-configuration-page";
import { Typography } from "@/shared/components/ui/typography";

const ControlPanelPage = () => {
  const [tab, setTab] = useState("system-configuration");

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <div className="space-y-4">
        <div>
          <Typography variant="h3" as="h1">
            Control Panel
          </Typography>
          <Typography muted>
            Manage insurance renewal notifications and email scheduling.
          </Typography>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FieldLabel htmlFor="switch-notifications">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Notifications</FieldTitle>
                <FieldDescription>
                  Enable or disable sending notifications.
                </FieldDescription>
              </FieldContent>
              <Switch id="switch-notifications" defaultChecked />
            </Field>
          </FieldLabel>

          <Card className="p-4">
            <CardTitle>Hold Status</CardTitle>
            <CardDescription>20</CardDescription>
          </Card>
        </div>
      </div>

      <Tabs
        value={tab}
        onValueChange={setTab}
        orientation="vertical"
        className="gap-8"
      >
        <TabsList variant="line">
          <TabsTrigger
            value="system-configuration"
            className="data-active:text-primary! after:bg-primary h-fit flex-none"
          >
            System Configuration
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-active:text-primary! after:bg-primary h-fit flex-none"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system-configuration">
          <SystemConfigurationPage />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationTimingPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ControlPanelPage;
