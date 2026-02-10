import AddEmailTemplate from "./add-email-template";
import TemplateSection from "./sections/template-section";
import VariablesSection from "./sections/variable-section";

const EmailTemplatesManager = () => {
  return (
    <div className="-m-4 flex grow flex-col">
      {/* Top Header */}
      <div className="bg-card flex h-fit items-end justify-between border-b p-4">
        <div className="flex-1">
          <h1 className="page-heading">Email Templates</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Manage automated notification templates.
          </p>
        </div>

        <AddEmailTemplate />
      </div>

      {/* Main Content */}
      <div className="flex h-[100vh-140px] overflow-y-hidden">
        {/* Templates Section */}
        <TemplateSection />

        {/* Variables Section */}
        <VariablesSection />
      </div>
    </div>
  );
};

export default EmailTemplatesManager;
