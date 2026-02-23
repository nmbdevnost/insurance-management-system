import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Typography } from "@/shared/components/ui/typography";
import { RiSaveLine } from "@remixicon/react";
import NotificationTimeline from "../../components/notification-timeline";

const timing = {
  initialReminder: 30,
  weeklyInterval: 7,
  dailyStart: 7,
  dailyEnd: 1,
};

const NotificationTimingPage = () => {
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            <Typography variant="h5">Notification Timing</Typography>
          </CardTitle>
          <CardDescription>
            <Typography variant="body-sm">
              Configure when and how often reminders are sent.
            </Typography>
          </CardDescription>
        </CardHeader>

        <form className="space-y-4">
          <CardContent className="space-y-4">
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="initial-reminder">
                      Initial Reminder (days before expiry)
                    </FieldLabel>
                    <Input id="initial-reminder" type="text" placeholder="30" />
                    <FieldDescription>
                      Start sending reminders this many days before expiry.
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="weekly-reminder-interval">
                      Weekly Reminder Interval (days)
                    </FieldLabel>
                    <Input
                      id="weekly-reminder-interval"
                      type="text"
                      placeholder="7"
                    />
                    <FieldDescription>
                      Send reminder every X days during weekly phase
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldGroup className="grid grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="daily-reminders-start">
                      Daily Reminders Start (days before expiry)
                    </FieldLabel>
                    <Input
                      id="daily-reminders-start"
                      type="text"
                      placeholder="7"
                    />
                    <FieldDescription>
                      Start sending daily reminders this many days before
                      expiry.
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="daily-reminders-end">
                      Daily Reminders end (days before expiry)
                    </FieldLabel>
                    <Input
                      id="daily-reminders-end"
                      type="text"
                      placeholder="7"
                    />
                    <FieldDescription>
                      Stop sending daily reminders when this many days remain.
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />
            </FieldGroup>

            <NotificationTimeline
              initialDays={timing.initialReminder}
              weeklyInterval={timing.weeklyInterval}
              dailyStart={timing.dailyStart}
              dailyEnd={timing.dailyEnd}
            />
          </CardContent>

          <CardFooter>
            <Button className="ml-auto">
              <RiSaveLine /> Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default NotificationTimingPage;
