/**
 * The day an order is delivered by the courier ("2026-11-27"), in the time of Serbia: the same rules as the api
 * (dh-api/src/orders/pickup-date.ts). Today only before 15:00, after that from tomorrow; at most one month ahead.
 */

const TIME_ZONE = "Europe/Belgrade";
const CUTOFF_HOUR = 15;
const MAX_MONTHS_AHEAD = 1;

/** "2026-11-27" and the hour (0 - 23) of a moment, in the time of Serbia */
const belgradeDateAndHour = (now: Date) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  return { date: `${part("year")}-${part("month")}-${part("day")}`, hour: Number(part("hour")) };
};

const addDays = (date: string, days: number) => {
  const day = new Date(`${date}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() + days);

  return day.toISOString().slice(0, 10);
};

const addMonths = (date: string, months: number) => {
  const [year, month, day] = date.split("-").map(Number);
  // the last day of the month when the month after has fewer days (31.1. -> 28.2.)
  const lastDay = new Date(Date.UTC(year, month - 1 + months + 1, 0)).getUTCDate();

  return new Date(Date.UTC(year, month - 1 + months, Math.min(day, lastDay))).toISOString().slice(0, 10);
};

/** The first and the last day that can be picked now (both included); the first one is the default */
export const pickupDateRange = (now = new Date()) => {
  const { date: today, hour } = belgradeDateAndHour(now);

  return {
    first: hour < CUTOFF_HOUR ? today : addDays(today, 1),
    last: addMonths(today, MAX_MONTHS_AHEAD),
  };
};

export const isPickupDateAllowed = (date: string, now = new Date()) => {
  const { first, last } = pickupDateRange(now);

  return /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= first && date <= last;
};
