/**
 * Currency and price formatting utilities for BEAUTIFO.
 * All prices strictly formatted in Pakistani Rupees (PKR).
 */
export const formatPKR = (amount: number): string => {
  return `PKR ${Math.round(amount).toLocaleString('en-US')}`;
};

/**
 * Clean inline SVG data URL fallback for any image that encounters network disruption.
 * Never fails or produces broken-image icons.
 */
export const BEAUTY_FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23F8F8FA'/%3E%3Cpath d='M200 130c-25 0-45 20-45 45v95c0 15 12 28 28 28h34c16 0 28-13 28-28v-95c0-25-20-45-45-45zm0-25c7 0 12-5 12-12s-5-12-12-12-12 5-12 12 5 12 12 12z' fill='%23E8D0D6'/%3E%3Ctext x='200' y='330' font-family='serif' font-size='14' text-anchor='middle' fill='%23B09098' letter-spacing='3'%3EBEAUTIFO%3C/text%3E%3C/svg%3E";

