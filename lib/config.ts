export const PUBLIC_LOGO_PATH = "/file_00000000e25c82438fc8ee9b3e045f71.png";

export const BUSINESS_DEFAULTS = {
  businessName: "EMMA GENTLE",
  whatsappNumber: "+234 916 697 6985",
  phoneNumber: "",
  openingHours: "Tuesday–Saturday · 8:00 AM–8:00 PM",
  address: "Address to be confirmed",
  logoPath: PUBLIC_LOGO_PATH,
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