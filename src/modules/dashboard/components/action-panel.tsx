import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/shared/components/ui/item";
import { Separator } from "@/shared/components/ui/separator";
import {
  RiArrowRightSLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type ActionPanelProps = {
  title?: string;
  description?: string;
  icon?: RemixiconComponentType;
  totalData?: string;
  actions?: Array<{
    title: string;
    description: string;
    buttonText: string;
    isPrimary?: boolean;
    icon?: RemixiconComponentType | null;
  }>;
};

const ActionPanel: React.FC<ActionPanelProps> = ({
  title,
  description,
  icon: Icon,
  totalData,
  actions,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
              <Icon className="size-4" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <CardTitle className="text-base font-bold tracking-tight">
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {totalData && (
            <Badge variant="primary-light" className="whitespace-nowrap">
              {totalData}
            </Badge>
          )}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col items-center gap-4">
        {actions?.map((action, index) => (
          <>
            <Item size="xs">
              <ItemContent>
                <ItemTitle>{action.title}</ItemTitle>
                <ItemDescription>{action.description}</ItemDescription>
              </ItemContent>

              <ItemActions>
                <Button
                  size="sm"
                  variant={action.isPrimary ? "default" : "secondary"}
                >
                  {action.buttonText}
                  {action.icon ? (
                    <action.icon />
                  ) : action.icon !== null ? (
                    <RiArrowRightSLine />
                  ) : (
                    <></>
                  )}
                </Button>
              </ItemActions>
            </Item>

            {index < actions.length - 1 && <Separator />}
          </>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActionPanel;
