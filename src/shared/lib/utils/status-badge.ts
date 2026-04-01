export function isStringMatch(str: string, toMatchStr: string) {
  return str.toLowerCase().includes(toMatchStr.toLowerCase());
}

export function matchStrings(string: string, strings: string[]) {
  return strings.some((str) => isStringMatch(string, str));
}

export function mapColor(status: string) {
  if (isStringMatch(status, "auto-deduct")) {
    return "bg-violet-100 text-violet-600 dark:bg-violet-600/10 dark:text-violet-300";
  }

  if (isStringMatch(status, "reminder")) {
    return "bg-sky-100 text-sky-600 dark:bg-sky-600/10 dark:text-sky-300";
  }

  if (matchStrings(status, ["error", "expired", "insufficient"])) {
    return "bg-red-100 text-red-600 dark:bg-red-600/10 dark:text-red-300";
  }

  if (matchStrings(status, ["ok", "available"])) {
    return "bg-green-100 text-green-600 dark:bg-green-600/10 dark:text-green-300";
  }

  if (matchStrings(status, ["hold", "pending"])) {
    return "bg-amber-100 text-amber-600 dark:bg-amber-600/10 dark:text-amber-300";
  }

  if (matchStrings(status, ["draft"])) {
    return "bg-muted text-muted-foreground";
  }

  return "text-primary bg-primary/10";
}
