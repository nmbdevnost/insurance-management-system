import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { RiMailSendLine } from "@remixicon/react";

const VariablesNotFound = () => {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiMailSendLine />
        </EmptyMedia>
        <EmptyTitle>No Variables Found</EmptyTitle>
        <EmptyDescription>There are no variables created yet.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default VariablesNotFound;
