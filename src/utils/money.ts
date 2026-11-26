const formatter = new Intl.NumberFormat("sr-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 2304.5 -> "2.304,50" */
export const formatPrice = (price: number) => formatter.format(price);

/** The amount of a line in cents: the price (up to 3 decimals) times the quantity, rounded once, the same as the api */
export const lineTotalCents = (price: number, quantity: number) => Math.round((Math.round(price * 1000) * quantity) / 10);
