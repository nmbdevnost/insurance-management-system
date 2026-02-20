import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/shared/components/ui/item";
import { Typography } from "@/shared/components/ui/typography";
import { RiSettings2Line } from "@remixicon/react";

const SystemConfigurationPage = () => {
  return (
    <>
      <form>
        <FieldSet>
          <FieldLegend>
            <Typography variant="h5">Sytstem Configuration</Typography>
          </FieldLegend>
          <FieldDescription>
            <Typography variant="body-sm">
              General notification and email settings.
            </Typography>
          </FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="auto-renewal-trigger">
                Auto-Renewal Trigger (days before expiry)
              </FieldLabel>
              <Input id="auto-renewal-trigger" type="text" placeholder="30" />
              <FieldDescription>
                Trigger auto-renewal process this many days before expiry.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="email-send-time">Email Send Time</FieldLabel>
              <Input id="email-send-time" type="time" />
              <FieldDescription>
                Time of day to send scheduled emails.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="maximum-retry-attempts">
                Maximum Retry Attempts
              </FieldLabel>
              <Input id="maximum-retry-attempts" type="text" placeholder="3" />
              <FieldDescription>
                Maximum attempts to retry failed email attempts.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <RiSettings2Line className="text-muted-foreground size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="text-muted-foreground">
                Changes will take effect after saving and regenerating scheduled
                notifications.
              </ItemTitle>
            </ItemContent>
          </Item>
        </FieldSet>
      </form>
    </>
  );
};

export default SystemConfigurationPage;
