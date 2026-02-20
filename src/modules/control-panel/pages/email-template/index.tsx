import { Typography } from "@/shared/components/ui/typography";
import AddEmailTemplate from "./add-email-template";
import TemplateSection from "./sections/template-section";
import VariablesSection from "./sections/variable-section";

const EmailTemplatesManager = () => {
  return (
    <div className="-m-4 flex grow flex-col">
      {/* Top Header */}
      <div className="bg-card flex h-fit items-end justify-between border-b p-3.5">
        <div className="flex-1">
          <Typography variant="h3" as="h1">
            Email Templates
          </Typography>
          <Typography muted>
            Manage automated notification templates.
          </Typography>
        </div>

        <AddEmailTemplate />
      </div>

      {/* Main Content */}
      <div className="flex grow overflow-y-hidden">
        {/* Templates Section */}
        <TemplateSection />

        {/* Variables Section */}
        <VariablesSection />
      </div>
    </div>
  );
};

export default EmailTemplatesManager;
