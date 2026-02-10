import TemplateList from "@/modules/control-panel/components/template/template-list";
import TemplatesNotFound from "@/modules/control-panel/components/template/templates-not-found";
import SearchInput from "@/shared/components/search-input";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import type { Template } from "@/shared/lib/types/email-templates";
import { useState } from "react";
import TemplatePreviewSection from "./template-preview-section";

const templates: Template[] = [
  {
    id: "1",
    name: "Initial Reminder",
    description: "First notification sent to customers",
    subject: "Important: Your policy {{policy_number}} expires soon",
    body: "Dear {{customer_name}},\n\nYour insurance policy {{policy_number}} with {{insurance_company}} will expire on {{expiry_date}}.\n\nYou have {{days_remaining}} days remaining to renew your coverage.\n\nPolicy Details:\n- Coverage Amount: {{coverage_amount}}\n- Premium: {{premium_amount}}\n\nPlease contact us to discuss your renewal options.\n\nBest regards,\nYour Insurance Team",
    category: "reminder",
    lastModified: "2 days ago",
    usageCount: 342,
    variables: [
      {
        key: "{{customer_name}}",
        description: "Customer's full name",
        example: "John Smith",
        category: "customer",
      },
      {
        key: "{{policy_number}}",
        description: "Insurance policy number",
        example: "POL-2024-001",
        category: "policy",
      },
      {
        key: "{{insurance_company}}",
        description: "Insurance provider name",
        example: "ABC Insurance Co.",
        category: "policy",
      },
      {
        key: "{{expiry_date}}",
        description: "Policy expiration date",
        example: "March 15, 2026",
        category: "dates",
      },
      {
        key: "{{days_remaining}}",
        description: "Days until expiry",
        example: "7 days",
        category: "dates",
      },
      {
        key: "{{coverage_amount}}",
        description: "Policy coverage amount",
        example: "$100,000",
        category: "financial",
      },
      {
        key: "{{premium_amount}}",
        description: "Premium payment amount",
        example: "$500/month",
        category: "financial",
      },
    ],
  },
  {
    id: "2",
    name: "Weekly Reminder",
    description: "Weekly follow-up for pending renewals",
    subject: "Weekly reminder: {{policy_number}} renewal needed",
    body: "Hello {{customer_name}},\n\nThis is your weekly reminder about policy {{policy_number}}.\n\nExpiry date: {{expiry_date}}\nDays remaining: {{days_remaining}}\n\nDon't let your coverage lapse. Contact us today!\n\nBest regards,\nYour Insurance Team",
    category: "reminder",
    lastModified: "1 week ago",
    usageCount: 189,
    variables: [
      {
        key: "{{customer_name}}",
        description: "Customer's full name",
        example: "John Smith",
        category: "customer",
      },
      {
        key: "{{policy_number}}",
        description: "Insurance policy number",
        example: "POL-2024-001",
        category: "policy",
      },
      {
        key: "{{expiry_date}}",
        description: "Policy expiration date",
        example: "March 15, 2026",
        category: "dates",
      },
      {
        key: "{{days_remaining}}",
        description: "Days until expiry",
        example: "7 days",
        category: "dates",
      },
    ],
  },
  {
    id: "3",
    name: "Final Notice",
    description: "Urgent final reminder before expiry",
    subject: "🚨 URGENT: {{policy_number}} expires in {{days_remaining}} days",
    body: "Dear {{customer_name}},\n\n⚠️ FINAL NOTICE ⚠️\n\nYour policy {{policy_number}} will expire very soon!\n\nExpiry Date: {{expiry_date}}\nDays Remaining: {{days_remaining}}\n\nImmediate action is required to maintain your coverage of {{coverage_amount}}.\n\nPlease respond urgently.\n\nBest regards,\nYour Insurance Team",
    category: "reminder",
    lastModified: "3 days ago",
    usageCount: 87,
    variables: [
      {
        key: "{{customer_name}}",
        description: "Customer's full name",
        example: "John Smith",
        category: "customer",
      },
      {
        key: "{{policy_number}}",
        description: "Insurance policy number",
        example: "POL-2024-001",
        category: "policy",
      },
      {
        key: "{{expiry_date}}",
        description: "Policy expiration date",
        example: "March 15, 2026",
        category: "dates",
      },
      {
        key: "{{days_remaining}}",
        description: "Days until expiry",
        example: "7 days",
        category: "dates",
      },
      {
        key: "{{coverage_amount}}",
        description: "Policy coverage amount",
        example: "$100,000",
        category: "financial",
      },
    ],
  },
  {
    id: "4",
    name: "Auto-Renewal Notice",
    description: "Pre-renewal notification for auto-renewal policies",
    subject: "Auto-renewal scheduled: {{policy_number}}",
    body: "Dear {{customer_name}},\n\nYour policy {{policy_number}} is set to auto-renew on {{expiry_date}}.\n\nRenewal Details:\n- Coverage: {{coverage_amount}}\n- Premium: {{premium_amount}}\n- Company: {{insurance_company}}\n\nNo action needed unless you wish to make changes.\n\nBest regards,\nYour Insurance Team",
    category: "notification",
    lastModified: "1 day ago",
    usageCount: 256,
    variables: [
      {
        key: "{{customer_name}}",
        description: "Customer's full name",
        example: "John Smith",
        category: "customer",
      },
      {
        key: "{{policy_number}}",
        description: "Insurance policy number",
        example: "POL-2024-001",
        category: "policy",
      },
      {
        key: "{{expiry_date}}",
        description: "Policy expiration date",
        example: "March 15, 2026",
        category: "dates",
      },
      {
        key: "{{coverage_amount}}",
        description: "Policy coverage amount",
        example: "$100,000",
        category: "financial",
      },
      {
        key: "{{premium_amount}}",
        description: "Premium payment amount",
        example: "$500/month",
        category: "financial",
      },
      {
        key: "{{insurance_company}}",
        description: "Insurance provider name",
        example: "ABC Insurance Co.",
        category: "policy",
      },
    ],
  },
  {
    id: "5",
    name: "Renewal Confirmation",
    description: "Confirmation after successful renewal",
    subject: "✓ Renewal confirmed: {{policy_number}}",
    body: "Dear {{customer_name}},\n\n🎉 Great news! Your policy {{policy_number}} has been successfully renewed.\n\nNew Policy Details:\n- Coverage Amount: {{coverage_amount}}\n- Premium: {{premium_amount}}\n- Provider: {{insurance_company}}\n- Valid Until: {{expiry_date}}\n\nThank you for choosing us!\n\nBest regards,\nYour Insurance Team",
    category: "confirmation",
    lastModified: "5 days ago",
    usageCount: 428,
    variables: [
      {
        key: "{{customer_name}}",
        description: "Customer's full name",
        example: "John Smith",
        category: "customer",
      },
      {
        key: "{{policy_number}}",
        description: "Insurance policy number",
        example: "POL-2024-001",
        category: "policy",
      },
      {
        key: "{{coverage_amount}}",
        description: "Policy coverage amount",
        example: "$100,000",
        category: "financial",
      },
      {
        key: "{{premium_amount}}",
        description: "Premium payment amount",
        example: "$500/month",
        category: "financial",
      },
      {
        key: "{{insurance_company}}",
        description: "Insurance provider name",
        example: "ABC Insurance Co.",
        category: "policy",
      },
      {
        key: "{{expiry_date}}",
        description: "Policy expiration date",
        example: "March 15, 2026",
        category: "dates",
      },
    ],
  },
];

const TemplateSection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <>
      <section className="max-w-80 flex-1">
        <header className="bg-card sticky top-0 z-10 flex h-24 items-center border-b">
          <div className="flex-1 space-y-2 p-4">
            <h3 className="leading-tight font-medium">Templates</h3>

            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <ScrollArea className="h-[calc(100vh-140px-96px)]">
          {filteredTemplates.length > 0 ? (
            <TemplateList
              templates={filteredTemplates}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          ) : (
            <>
              <TemplatesNotFound
                variant={searchQuery.length > 0 ? "search" : "empty"}
              />
            </>
          )}
        </ScrollArea>
      </section>

      {/* Template Preview Section */}
      <TemplatePreviewSection selectedTemplate={selectedTemplate} />
    </>
  );
};

export default TemplateSection;
