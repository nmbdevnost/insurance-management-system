export type Variable = {
  key: string;
  description: string;
  example?: string;
  category: "customer" | "policy" | "dates" | "financial";
};

export type Template = {
  id: string;
  name: string;
  description: string;
  subject: string;
  body: string;
  category: "reminder" | "notification" | "confirmation";
  lastModified: string;
  usageCount: number;
  variables: Variable[];
};
