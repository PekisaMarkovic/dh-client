const formatter = new Intl.NumberFormat("sr-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 2304.5 -> "2.304,50" */
export const formatPrice = (price: number) => formatter.format(price);
