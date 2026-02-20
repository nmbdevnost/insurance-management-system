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
    <div className="-m-4 flex grow flex-col">
      <div className="space-y-4 border-b p-4">
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
        className="grow"
      >
        <TabsList
          variant="line"
          className="h-full! max-h-full! items-start justify-start border-r pt-4"
        >
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

        <TabsContent value="system-configuration" className="px-4 py-6">
          <div className="mx-auto w-full max-w-xl">
            <SystemConfigurationPage />
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="px-4 py-6">
          <div className="mx-auto w-full max-w-xl">
            <NotificationTimingPage />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ControlPanelPage;
