import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

const NotificationTimingPage = () => {
  return (
    <>
      <form>
        <FieldSet>
          <FieldLegend>Notification Timing</FieldLegend>
          <FieldDescription>
            Configure when and how often reminders are sent.
          </FieldDescription>
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

            <Field>
              <FieldLabel htmlFor="daily-reminders-start">
                Daily Reminders Start (days before expiry)
              </FieldLabel>
              <Input id="daily-reminders-start" type="text" placeholder="7" />
              <FieldDescription>
                Start sending daily reminders this many days before expiry.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="daily-reminders-end">
                Daily Reminders end (days before expiry)
              </FieldLabel>
              <Input id="daily-reminders-end" type="text" placeholder="7" />
              <FieldDescription>
                Stop sending daily reminders when this many days remain.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </>
  );
};

export default NotificationTimingPage;
