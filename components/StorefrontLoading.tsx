type StorefrontLoadingProps = {
  label: string;
  message: string;
};

export function StorefrontLoading({ label, message }: StorefrontLoadingProps) {
  return (
    <section className="section route-loading" aria-busy="true" aria-live="polite">
      <div className="shell">
        <div className="loading-panel" role="status">
          <span className="loading-spinner" aria-hidden="true" />
          <div>
            <p className="eyebrow">{label}</p>
            <p className="loading-message">{message}</p>
          </div>
        </div>
      </div>
    </section>
  );
}