import { BUSINESS_DEFAULTS } from "./config";

export function whatsappHref(productName: string, number: string = BUSINESS_DEFAULTS.whatsappNumber) {
  const digits = number.replace(/\D/g, "");
  const message = `Hello, I'm interested in the ${productName}. Is it available?`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}