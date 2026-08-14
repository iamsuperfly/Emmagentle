export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  product_count?: number;
};

export type ProductImage = {
  id: string;
  product_id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string;
  price: number | null;
  stock_status: "in_stock" | "out_of_stock" | "on_request";
  featured: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category | null;
  product_images?: ProductImage[];
};

export type ProductInput = {
  name: string;
  description: string;
  category_id: string;
  price: string;
  stock_status: Product["stock_status"];
  featured: boolean;
  image?: File;
  existing_image_path?: string;
};

export type ActionState = {
  error?: string;
  success?: string;
};