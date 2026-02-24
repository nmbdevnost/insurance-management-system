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
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
} from "@/shared/components/ui/item";
import { Typography } from "@/shared/components/ui/typography";
import { RiSaveLine, RiSettings2Line } from "@remixicon/react";

const SystemConfigurationPage = () => {
  return (
    <>
      <Card>
        <form>
          <FieldSet>
            <CardHeader>
              <CardTitle>
                <FieldLegend>
                  <Typography variant="h5">Sytstem Configuration</Typography>
                </FieldLegend>
              </CardTitle>

              <CardDescription>
                <FieldDescription>
                  <Typography variant="body-sm">
                    General notification and email settings.
                  </Typography>
                </FieldDescription>
              </CardDescription>
            </CardHeader>

            <FieldSeparator />

            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="auto-renewal-trigger">
                    Auto-Renewal Trigger (days before expiry)
                  </FieldLabel>
                  <Input
                    id="auto-renewal-trigger"
                    type="text"
                    placeholder="30"
                  />
                  <FieldDescription>
                    Trigger auto-renewal process this many days before expiry.
                  </FieldDescription>
                </Field>

                <Field>
                  <FieldLabel htmlFor="email-send-time">
                    Email Send Time
                  </FieldLabel>
                  <Input id="email-send-time" type="time" />
                  <FieldDescription>
                    Time of day to send scheduled emails.
                  </FieldDescription>
                </Field>

                <Field>
                  <FieldLabel htmlFor="maximum-retry-attempts">
                    Maximum Retry Attempts
                  </FieldLabel>
                  <Input
                    id="maximum-retry-attempts"
                    type="text"
                    placeholder="3"
                  />
                  <FieldDescription>
                    Maximum attempts to retry failed email attempts.
                  </FieldDescription>
                </Field>
              </FieldGroup>

              <Item variant="outline" size="sm" className="mt-4">
                <ItemMedia variant="icon">
                  <RiSettings2Line className="text-primary size-5" />
                </ItemMedia>
                <ItemContent>
                  <ItemDescription>
                    Changes will take effect after saving and regenerating
                    scheduled notifications.
                  </ItemDescription>
                </ItemContent>
              </Item>
            </CardContent>

            <CardFooter>
              <Button className="ml-auto">
                <RiSaveLine /> Save Changes
              </Button>
            </CardFooter>
          </FieldSet>
        </form>
      </Card>
    </>
  );
};

export default SystemConfigurationPage;
