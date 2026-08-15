import { StorefrontLoading } from "@/components/StorefrontLoading";

export default function Loading() {
  return (
    <StorefrontLoading
      label="Loading products"
      message="Fetching the latest catalogue for you."
    />
  );
}