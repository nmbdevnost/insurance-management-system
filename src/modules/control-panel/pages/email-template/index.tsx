import SearchInput from "@/shared/components/search-input";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ButtonGroup } from "@/shared/components/ui/button-group";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { Input } from "@/shared/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/shared/components/ui/item";
import { Label } from "@/shared/components/ui/label";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Separator } from "@/shared/components/ui/separator";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import {
  RiAddLine,
  RiAlertLine,
  RiCheckLine,
  RiClipboardLine,
  RiCodeLine,
  RiDeleteBinLine,
  RiMailLine,
  RiMailSendLine,
  RiMore2Line,
  RiPencilLine,
  RiSendInsLine,
  RiSendPlaneLine,
  RiSparklingLine,
  RiTimeLine,
} from "@remixicon/react";
import { useMemo, useState } from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  subject: string;
  body: string;
  category: "reminder" | "notification" | "confirmation";
  lastModified: string;
  usageCount: number;
}

interface Variable {
  key: string;
  description: string;
  example: string;
  category: "customer" | "policy" | "dates" | "financial";
}

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
  },
];

const variables: Variable[] = [
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
];

const variableCategoryColors = {
  customer: "bg-purple-50 text-purple-700 border-purple-200",
  policy: "bg-blue-50 text-blue-700 border-blue-200",
  dates: "bg-orange-50 text-orange-700 border-orange-200",
  financial: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const EmailTemplatesManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [copiedVariable, setCopiedVariable] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [variableFilter, setVariableFilter] = useState<string | null>("all");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVariable(text);
    setTimeout(() => setCopiedVariable(null), 2000);
  };

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const filteredVariables = variables.filter(
    (v) => variableFilter === "all" || v.category === variableFilter
  );

  const usedVariables = useMemo(() => {
    if (!selectedTemplate) return [] as Variable[];

    const content = `${selectedTemplate.subject}\n${selectedTemplate.body}`;
    const matches = content.match(/\{\{[^}]+\}\}/g) ?? [];
    const usedKeys = new Set(matches);
    return variables.filter((v) => usedKeys.has(v.key));
  }, [selectedTemplate]);

  return (
    <div className="-m-4 flex grow flex-col">
      {/* Top Header */}
      <div className="bg-card flex h-fit items-center justify-between border-b p-4">
        <div>
          <h1 className="page-heading">Email Templates</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Manage automated notification templates • {templates.length} total
            templates
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger render={<Button />}>
            <RiAddLine className="size-4" />
            New Template
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create Email Template</DialogTitle>
              <DialogDescription>
                Design a new automated email template for your notifications
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 pr-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name *</Label>
                    <Input
                      id="template-name"
                      placeholder="e.g., Initial Reminder"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-category">Category *</Label>
                    <Select>
                      <SelectTrigger id="template-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reminder">Reminder</SelectItem>
                        <SelectItem value="notification">
                          Notification
                        </SelectItem>
                        <SelectItem value="confirmation">
                          Confirmation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of when this template is used"
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject Line *</Label>
                  <Input
                    id="subject"
                    placeholder="Use variables like {{customer_name}}"
                    className="font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="body">Email Body *</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 gap-1 text-xs"
                    >
                      <RiSparklingLine className="size-3" />
                      AI Assist
                    </Button>
                  </div>
                  <Textarea
                    id="body"
                    placeholder="Compose your email template here. Use variables in {{double_braces}} format."
                    rows={12}
                    className="resize-none font-mono text-sm"
                  />
                </div>
                <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <RiCodeLine className="mt-0.5 size-4 shrink-0 text-blue-600" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-blue-900">
                      Available Variables
                    </p>
                    <p className="text-xs leading-relaxed text-blue-700">
                      Click variables in the sidebar to copy and paste them into
                      your template.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Create Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content */}
      <div className="flex">
        <ScrollArea className="h-[calc(100vh-140px)] max-w-80 flex-1">
          <div className="bg-card sticky top-0 h-24 space-y-2 border-b px-4 py-3">
            <h3 className="text-lg leading-tight font-medium">Templates</h3>

            <SearchInput onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div>
            {filteredTemplates.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <RiMailSendLine />
                  </EmptyMedia>
                  <EmptyTitle>No Template Found</EmptyTitle>
                  <EmptyDescription>
                    Select a template from the sidebar to view details
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <>
                {filteredTemplates.map((template) => {
                  return (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={cn(
                        "group hover:bg-muted w-full border-r-2 p-3 text-left transition-all",
                        selectedTemplate?.id === template.id
                          ? "bg-accent/10 hover:bg-accent/10 border-accent"
                          : "bg-card border-card hover:shadow-sm"
                      )}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm leading-tight font-medium">
                              {template.name}
                            </h3>
                          </div>
                        </div>

                        <Badge
                          variant="outline"
                          className="bg-background h-5 shrink-0 text-xs"
                        >
                          {template.usageCount}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2 line-clamp-2 text-xs leading-relaxed">
                        {template.description}
                      </p>
                      <div className="text-muted-foreground flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <RiTimeLine className="size-3" />
                          Last modified {template.lastModified}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        </ScrollArea>

        <ScrollArea className="h-[calc(100vh-140px)] flex-1 border-x">
          {selectedTemplate ? (
            <>
              <div className="bg-card sticky top-0 z-10 flex h-24 items-center border-b px-4">
                <div className="flex flex-1 items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <h2 className="text-lg font-semibold">
                          {selectedTemplate.name}
                        </h2>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {selectedTemplate.description}
                      </p>
                      <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1">
                          <RiSendPlaneLine className="size-3" />
                          Used {selectedTemplate.usageCount} times
                        </span>
                        <span className="flex items-center gap-1">
                          <RiTimeLine className="size-3" />
                          Modified {selectedTemplate.lastModified}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <ButtonGroup>
                      <Button variant="outline" size="sm">
                        <RiSendInsLine />
                        Send
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={<Button variant="outline" size="icon-sm" />}
                        >
                          <RiMore2Line />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-full max-w-md!"
                        >
                          <DropdownMenuItem>
                            <RiPencilLine />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <RiClipboardLine />
                            Duplicate
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem variant="destructive">
                            <RiDeleteBinLine />
                            Delete Template
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ButtonGroup>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="mx-auto max-w-3xl space-y-6 p-4">
                  {/* Subject Line */}
                  <div>
                    <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
                      <RiMailLine className="size-3.5" />
                      Subject Line
                    </Label>
                    <Card className="p-4">
                      <p className="text-sm leading-relaxed font-medium">
                        {selectedTemplate.subject}
                      </p>
                    </Card>
                  </div>

                  {/* Email Body */}
                  <div>
                    <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
                      <RiCodeLine className="size-3.5" />
                      Email Body
                    </Label>
                    <Card className="p-4">
                      <div className="prose prose-sm max-w-none">
                        <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap">
                          {selectedTemplate.body}
                        </pre>
                      </div>
                    </Card>
                  </div>

                  {/* Variables Used */}
                  <div>
                    <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
                      <RiCodeLine className="size-3.5" />
                      Variables Used
                    </Label>

                    {usedVariables.length === 0 ? (
                      <Card className="p-4">
                        <p className="text-muted-foreground text-sm">
                          No variables detected in this template.
                        </p>
                      </Card>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {usedVariables.map((variable) => (
                          <button
                            key={variable.key}
                            onClick={() => copyToClipboard(variable.key)}
                            className={cn(
                              "group relative w-full rounded-lg border p-3 text-left transition-all hover:shadow-sm active:scale-[0.98]",
                              copiedVariable === variable.key
                                ? "border-emerald-300 ring ring-emerald-100"
                                : "bg-card hover:bg-muted"
                            )}
                          >
                            <div className="mb-2 flex items-center justify-between gap-2">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "font-mono text-xs",
                                  variableCategoryColors[variable.category]
                                )}
                              >
                                {variable.key}
                              </Badge>
                              {copiedVariable === variable.key ? (
                                <div className="flex items-center gap-1 text-emerald-600">
                                  <RiCheckLine className="size-4" />
                                  <span className="text-xs font-medium">
                                    Copied!
                                  </span>
                                </div>
                              ) : (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <RiClipboardLine className="text-muted-foreground size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Copy to Clipboard
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-2 text-xs leading-relaxed">
                              {variable.description}
                            </p>
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-muted-foreground">
                                Example:
                              </span>
                              <span className="text-foreground font-medium">
                                {variable.example}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Preview with Variables */}
                  <div>
                    <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
                      <RiSparklingLine className="size-3.5" />
                      Preview with Sample Data
                    </Label>
                    <Card>
                      <CardHeader>
                        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                          Subject:
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {selectedTemplate.subject
                            .replace(/\{\{customer_name\}\}/g, "John Smith")
                            .replace(/\{\{policy_number\}\}/g, "POL-2024-001")
                            .replace(/\{\{days_remaining\}\}/g, "7")}
                        </p>
                      </CardHeader>

                      <Separator className="my-4" />

                      <CardContent className="prose prose-sm max-w-none">
                        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                          Body:
                        </p>

                        <pre className="mt-1 font-sans text-sm leading-relaxed whitespace-pre-wrap">
                          {selectedTemplate.body
                            .replace(/\{\{customer_name\}\}/g, "John Smith")
                            .replace(/\{\{policy_number\}\}/g, "POL-2024-001")
                            .replace(
                              /\{\{insurance_company\}\}/g,
                              "ABC Insurance Co."
                            )
                            .replace(/\{\{expiry_date\}\}/g, "March 15, 2026")
                            .replace(/\{\{days_remaining\}\}/g, "7")
                            .replace(/\{\{coverage_amount\}\}/g, "$100,000")
                            .replace(/\{\{premium_amount\}\}/g, "$500/month")}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Info Box */}
                  <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <RiAlertLine className="mt-0.5 size-5 shrink-0 text-blue-600" />
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-blue-900">
                        Dynamic Variables
                      </p>
                      <p className="text-xs leading-relaxed text-blue-700">
                        This template uses{" "}
                        {(selectedTemplate.body.match(/\{\{/g) || []).length}{" "}
                        variables that will be automatically replaced with real
                        customer data when emails are sent.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          ) : (
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
          )}
        </ScrollArea>

        <div className="flex h-[calc(100vh-140px)] w-full max-w-80 flex-col overflow-y-hidden">
          <div className="bg-card sticky top-0 z-10 h-14 border-b">
            <Item>
              <ItemMedia
                variant="icon"
                className="bg-primary/10 text-primary rounded-lg p-2"
              >
                <RiCodeLine />
              </ItemMedia>

              <ItemContent>
                <ItemTitle>Variables</ItemTitle>
              </ItemContent>

              <ItemActions>
                <ButtonGroup>
                  <Select
                    value={variableFilter}
                    onValueChange={setVariableFilter}
                  >
                    <SelectTrigger className="h-7!">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={null}>
                        All ({variables.length})
                      </SelectItem>
                      <SelectItem value="customer">Customer Info</SelectItem>
                      <SelectItem value="policy">Policy Details</SelectItem>
                      <SelectItem value="dates">Dates & Time</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button size="icon-sm" variant="outline">
                    <RiAddLine />
                  </Button>
                </ButtonGroup>
              </ItemActions>
            </Item>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2 p-3">
              {filteredVariables.map((variable, index) => (
                <button
                  key={index}
                  onClick={() => copyToClipboard(variable.key)}
                  className={cn(
                    "group relative w-full rounded-lg border p-3 text-left transition-all hover:shadow-sm active:scale-[0.98]",
                    copiedVariable === variable.key
                      ? "border-emerald-300 ring ring-emerald-100"
                      : "bg-card hover:bg-muted"
                  )}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-mono text-xs",
                        variableCategoryColors[variable.category]
                      )}
                    >
                      {variable.key}
                    </Badge>
                    {copiedVariable === variable.key ? (
                      <div className="flex items-center gap-1 text-emerald-600">
                        <RiCheckLine className="size-4" />
                        <span className="text-xs font-medium">Copied!</span>
                      </div>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger>
                          <RiClipboardLine className="text-muted-foreground size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                        </TooltipTrigger>
                        <TooltipContent>Copy to Clipboard</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2 text-xs leading-relaxed">
                    {variable.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-muted-foreground">Example:</span>
                    <span className="text-foreground font-medium">
                      {variable.example}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>

          <div className="bg-card sticky bottom-0 z-10 h-fit border-t p-2">
            <div className="rounded-lg border border-blue-200 bg-linear-to-br from-blue-50 to-purple-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <RiSparklingLine className="size-4 text-blue-600" />
                <p className="text-xs font-semibold text-blue-900">Pro Tip</p>
              </div>
              <p className="text-xs leading-relaxed text-blue-700">
                Variables are case-sensitive and must be wrapped in double curly
                braces:{" "}
                <code className="rounded bg-blue-100 px-1 py-0.5 font-mono">{`{{variable}}`}</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatesManager;
