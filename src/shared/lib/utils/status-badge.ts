export function isStringMatch(str: string, toMatchStr: string) {
  return str.toLowerCase().includes(toMatchStr.toLowerCase());
}

export function matchStrings(string: string, strings: string[]) {
  return strings.some((str) => isStringMatch(string, str));
}

export function mapColor(status: string) {
  if (isStringMatch(status, "auto-deduct")) {
    return "bg-violet-100 border-violet-600 text-violet-600";
  }

  if (isStringMatch(status, "reminder")) {
    return "bg-sky-100 border-sky-600 text-sky-600";
  }

  if (matchStrings(status, ["error", "expired"])) {
    return "bg-red-100 border-red-600 text-red-600";
  }

  if (isStringMatch(status, "ok")) {
    return "bg-green-100 border-green-600 text-green-600";
  }

  if (matchStrings(status, ["hold", "pending"])) {
    return "bg-amber-100 border-amber-600 text-amber-600";
  }

  if (matchStrings(status, ["draft"])) {
    return "bg-muted border-muted-foregroud text-muted-foreground border-dashed";
  }

  return "text-primary border-primary bg-primary/10";
}
