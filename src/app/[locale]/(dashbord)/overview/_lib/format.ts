const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}

export function formatCurrency(value: number, currency: string) {
  return `${formatNumber(value)} ${currency}`;
}

/** "+12.5" / "-3" / "0" — the sign is always explicit for non-zero values */
export function formatSigned(value: number, suffix = "") {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${formatNumber(Math.abs(value))}${suffix}`;
}

/** keeps a chart axis readable when every value is 0 or very small */
export function niceMax(dataMax: number, min = 4) {
  return Math.max(Math.ceil(dataMax * 1.15), min);
}
