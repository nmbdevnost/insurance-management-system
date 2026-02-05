export function isStringMatch(str: string, toMatchStr: string) {
  return str.toLowerCase().includes(toMatchStr.toLowerCase());
}

export function mapColor(status: string) {
  if (isStringMatch(status, "auto-deduct")) {
    return "bg-violet-100 border-violet-500 text-violet-500";
  }

  if (isStringMatch(status, "reminder")) {
    return "bg-orange-100 border-orange-500 text-orange-500";
  }

  if (isStringMatch(status, "expired")) {
    return "bg-red-100 border-red-500 text-red-500";
  }

  if (isStringMatch(status, "ok")) {
    return "bg-green-100 border-green-500 text-green-500";
  }

  if (isStringMatch(status, "hold")) {
    return "bg-amber-100 border-amber-600 text-amber-600";
  }

  return "text-primary border-primary bg-primary/10";
}
