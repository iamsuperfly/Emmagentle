export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="empty-state">
      <p className="eyebrow">Stock note</p>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
