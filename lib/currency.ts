export function formatNaira(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "Price on request";

  return `₦${new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value)}`;
}