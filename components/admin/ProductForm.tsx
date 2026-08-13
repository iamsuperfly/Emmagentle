"use client";

import { useActionState } from "react";
import { saveProduct } from "@/app/admin/actions";
import { ActionState, Category, Product } from "@/lib/types";
import { getPublicImageUrl } from "@/lib/images";

const initialState: ActionState = {};

export function ProductForm({ product, categories }: { product?: Product; categories: Category[] }) {
  const [state, formAction, pending] = useActionState(saveProduct, initialState);
  const image = product?.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0];
  const imageUrl = image ? getPublicImageUrl(image.storage_path) : null;

  return (
    <form className="panel stack" action={formAction}>
      {state.error ? <p className="error-message">{state.error}</p> : null}
      <input type="hidden" name="id" value={product?.id || ""} />
      <div className="form-grid">
        <label>
          Product name
          <input name="name" required defaultValue={product?.name || ""} placeholder="e.g. LED Bulb 12W" />
        </label>
        <label>
          Category
          <select name="category_id" defaultValue={product?.category_id || ""}>
            <option value="">Uncategorised</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <label className="form-field-full">
          Description
          <textarea name="description" defaultValue={product?.description || ""} placeholder="Product details customers should know" />
        </label>
        <label>
          Price (optional)
          <input name="price" type="number" min="0" step="0.01" defaultValue={product?.price ?? ""} placeholder="Leave blank to ask" />
        </label>
        <label>
          Availability
          <select name="stock_status" defaultValue={product?.stock_status || "on_request"}>
            <option value="in_stock">Available</option>
            <option value="out_of_stock">Out of stock</option>
            <option value="on_request">Confirm availability</option>
          </select>
        </label>
        <label className="form-field-full">
          Product image
          <input name="image" type="file" accept="image/*" />
          <small>Maximum 5 MB. A new upload replaces the current image.</small>
        </label>
        {imageUrl ? (
          <div className="form-field-full">
            <p className="eyebrow">Current image</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={image?.alt_text || product?.name || "Current product"} style={{ width: "180px", height: "120px", objectFit: "cover" }} />
          </div>
        ) : null}
        <label className="checkbox-row form-field-full">
          <input name="featured" type="checkbox" defaultChecked={product?.featured || false} />
          Show on the featured section
        </label>
      </div>
      <div className="button-row">
        <button className="button button-primary" disabled={pending} type="submit">
          {pending ? "Saving…" : product ? "Save changes" : "Create product"}
        </button>
      </div>
    </form>
  );
}