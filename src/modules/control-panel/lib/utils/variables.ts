export function extractVariables(template: string): string[] {
  const pattern = /\{\{(\w+)\}\}/g;
  const matches = template.matchAll(pattern);
  return Array.from(matches, (match) => match[1]);
}
