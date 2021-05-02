import currency from "currency.js";
export const PESO = value =>
  currency(value, { precision: 2, separator: ",", symbol: "₱", decimal: "." });
