import Link from "next/link";
import { deleteProduct } from "@/app/admin/actions";
import { formatNaira } from "@/lib/currency";
import { requireAdmin } from "@/lib/auth";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const products = await getProducts();

  return (
    <>
      <div className="admin-title-row">
        <div>
          <p className="eyebrow">Catalogue management</p>
          <h1>Products</h1>
        </div>
        <Link className="button button-primary" href="/admin/products/new">Add product</Link>
      </div>
      {params.error ? <p className="error-message">{params.error}</p> : null}
      <div className="panel">
        {products.length ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Availability</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <br />
                    <small>{formatNaira(product.price)}</small>
                  </td>
                  <td>{product.categories?.name || "Uncategorised"}</td>
                  <td>{product.stock_status === "in_stock" ? "Available" : product.stock_status === "out_of_stock" ? "Out of stock" : "Confirm availability"}</td>
                  <td>{product.featured ? "Yes" : "No"}</td>
                  <td>
                    <div className="table-actions">
                      <Link className="button button-secondary" href={`/admin/products/${product.id}`}>Edit</Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button className="button button-danger" type="submit">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products yet. Create the first product to populate the public catalogue.</p>
        )}
      </div>
    </>
  );
}