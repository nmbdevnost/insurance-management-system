import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/components/ui/item";
import { RiArrowRightUpLine } from "@remixicon/react";

export type QuickActionProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
};

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <Item
      variant="outline"
      render={<button />}
      className="group hover:border-primary hover:bg-primary/5 w-full rounded-lg border border-slate-200 bg-white text-left transition-all"
      onClick={onClick}
    >
      <ItemMedia
        className="bg-primary/5 group-hover:bg-primary group-hover:text-primary-foreground text-primary self-center! rounded-md p-3 transition-colors [&_svg:not([class*='size-'])]:size-4.5"
        variant="icon"
      >
        {icon}
      </ItemMedia>

      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{subtitle}</ItemDescription>
      </ItemContent>

      <ItemActions>
        <RiArrowRightUpLine className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-all group-hover:-translate-y-1" />
      </ItemActions>
    </Item>
  );
};

export default QuickAction;
