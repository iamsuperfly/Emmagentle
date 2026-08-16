export function WhatsAppIcon({ className = "button-icon" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9.25" fill="currentColor" />
      <path
        d="M8.35 7.65c.18-.2.42-.23.67-.15l1.03.42c.22.09.36.27.39.5l.1.85c.03.22-.03.4-.18.56l-.48.49c.47.82 1.1 1.45 1.92 1.92l.49-.48c.15-.15.34-.21.56-.18l.85.1c.23.03.41.17.5.39l.42 1.03c.1.25.05.49-.15.67l-.37.34c-.33.3-.78.43-1.22.34a7.1 7.1 0 0 1-5.5-5.5c-.09-.44.04-.89.34-1.22l.34-.37Z"
        fill="var(--orange-dark)"
      />
    </svg>
  );
}