import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { RiMailSendLine } from "@remixicon/react";

const TemplateNotSelected = () => {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiMailSendLine />
        </EmptyMedia>
        <EmptyTitle>No Template Selected</EmptyTitle>
        <EmptyDescription>
          Select a template from the sidebar to view details
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default TemplateNotSelected;
