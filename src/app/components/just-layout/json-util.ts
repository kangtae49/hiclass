export function stableStringify(obj: any): string {
  return JSON.stringify(sort(obj));
}

function sort(value: any): any {
  if (Array.isArray(value)) return value.map(sort);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([k, v]) => [k, sort(v)])
    );
  }
  return value;
}