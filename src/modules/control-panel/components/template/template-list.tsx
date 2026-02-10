import { Separator } from "@/shared/components/ui/separator";
import type { Template } from "@/shared/lib/types/email-templates";
import TemplateListItem from "./template-list-item";

const TemplateList = ({
  templates,
  selectedTemplate,
  setSelectedTemplate,
}: {
  templates: Template[];
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
}) => {
  return (
    <>
      {templates.map((template) => (
        <>
          <TemplateListItem
            key={template.id}
            template={template}
            isSelected={selectedTemplate?.id === template.id}
            onSelect={setSelectedTemplate}
          />

          <Separator />
        </>
      ))}
    </>
  );
};

export default TemplateList;
