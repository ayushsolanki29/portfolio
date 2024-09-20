import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatNumber(amount: number) {
  const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

  return NUMBER_FORMATTER.format(amount);
}
