// Market-size charts: the cited sources publish US dollar figures. These are
// converted to rupees here in one place so every page stays consistent and the
// unit can be switched without touching the course content.

export const USD_TO_INR = 88;

/** US$ billion  ->  rupee lakh crore  (1 lakh crore = 1e12 rupees). */
const toLakhCrore = (usdBillion: number) => (usdBillion * 1e9 * USD_TO_INR) / 1e12;

export const CHART_UNIT_LABEL = "₹ lakh crore";

export const CONVERSION_NOTE = `Source figures are in US dollars and are converted at ₹${USD_TO_INR} per US dollar, rounded to the nearest ₹0.01 lakh crore. Chart values are shown in lakh crore (L).`;

export function marketPoints(usdBillions: [year: string, usdBillion: number][]) {
  return usdBillions.map(([year, usd]) => {
    const value = Math.round(toLakhCrore(usd) * 100) / 100;
    return { year, value, label: `₹${value.toFixed(2)} L` };
  });
}
