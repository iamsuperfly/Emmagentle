export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="empty-state">
      <p className="eyebrow">Catalogue update</p>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}