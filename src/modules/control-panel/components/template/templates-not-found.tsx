import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { RiMailSendLine } from "@remixicon/react";

const TemplatesNotFound = ({
  variant = "empty",
}: {
  variant?: "empty" | "search";
}) => {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiMailSendLine />
        </EmptyMedia>
        <EmptyTitle>No Template Found</EmptyTitle>
        <EmptyDescription>
          {variant === "empty"
            ? "There are no templates created yet."
            : "No templates match your search criteria."}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default TemplatesNotFound;
