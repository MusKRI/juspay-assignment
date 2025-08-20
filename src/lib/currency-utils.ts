/**
 * Formats a currency value using Intl.NumberFormat
 * @param value - The numeric value to format
 * @param currency - The currency code (e.g., 'USD', 'EUR', 'GBP')
 * @returns Formatted currency string with exactly 2 decimal places
 *
 * Example: formatCurrency(1234.5, 'USD') => "$1,234.50"
 */
export function formatCurrency(
  value: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
