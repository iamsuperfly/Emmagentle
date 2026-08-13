"use client";

import { useActionState } from "react";
import { deleteCategory, saveCategory } from "@/app/admin/actions";
import { Category } from "@/lib/types";

export function CategoryForm({ category }: { category?: Category }) {
  const [state, formAction, pending] = useActionState(saveCategory, {});
  return (
    <div className="panel">
      <form className="stack" action={formAction}>
        {state.error ? <p className="error-message">{state.error}</p> : null}
        <input type="hidden" name="id" value={category?.id || ""} />
        <label>
          Category name
          <input name="name" required defaultValue={category?.name || ""} placeholder="e.g. Measuring Tools" />
        </label>
        <label>
          Description (optional)
          <textarea name="description" defaultValue={category?.description || ""} />
        </label>
        <div className="button-row">
          <button className="button button-primary" disabled={pending} type="submit">
            {pending ? "Saving…" : category ? "Save category" : "Add category"}
          </button>
        </div>
      </form>
      {category ? (
        <form className="button-row" action={deleteCategory}>
          <input type="hidden" name="id" value={category.id} />
          <button className="button button-danger" type="submit">Delete</button>
        </form>
      ) : null}
    </div>
  );
}