export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          display_name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name?: string | null;
          created_at?: string;
        };
        Update: {
          display_name?: string | null;
        };
      };
      business_settings: {
        Row: {
          id: number;
          business_name: string;
          whatsapp_number: string;
          phone_number: string;
          opening_hours: string;
          address: string;
          logo_path: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          business_name?: string;
          whatsapp_number?: string;
          phone_number?: string;
          opening_hours?: string;
          address?: string;
          logo_path?: string;
          updated_at?: string;
        };
        Update: {
          business_name?: string;
          whatsapp_number?: string;
          phone_number?: string;
          opening_hours?: string;
          address?: string;
          logo_path?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          updated_at?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          storage_path: string;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          storage_path: string;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          storage_path?: string;
          alt_text?: string | null;
          sort_order?: number;
        };
      };
      products: {
        Row: {
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
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          slug: string;
          description?: string;
          price?: number | null;
          stock_status?: "in_stock" | "out_of_stock" | "on_request";
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          name?: string;
          slug?: string;
          description?: string;
          price?: number | null;
          stock_status?: "in_stock" | "out_of_stock" | "on_request";
          featured?: boolean;
          updated_at?: string;
        };
      };
    };
    Functions: {
      search_products: {
        Args: { search_term: string };
        Returns: Database["public"]["Tables"]["products"]["Row"][];
      };
    };
  };
};