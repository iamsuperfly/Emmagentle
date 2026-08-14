export const BUSINESS_DEFAULTS = {
  businessName: "Emmanuel Enterprise",
  whatsappNumber: "+234 916 697 6985",
  phoneNumber: "",
  openingHours: "Tuesday–Saturday · 8:00 AM–8:00 PM",
  address: "Address to be confirmed",
  logoPath: "",
} as const;

export const STORAGE_BUCKET = "product-images";

export type BusinessSettings = {
  id?: number;
  business_name: string;
  whatsapp_number: string;
  phone_number: string;
  opening_hours: string;
  address: string;
  logo_path: string;
  updated_at?: string;
};