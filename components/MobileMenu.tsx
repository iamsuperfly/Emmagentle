import Link from "next/link";

type MobileMenuItem = {
  href: string;
  label: string;
};

export function MobileMenu({
  items,
  className = "",
  children,
}: {
  items: MobileMenuItem[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <details className={`mobile-menu ${className}`.trim()}>
      <summary>Menu</summary>
      <div className="mobile-menu-panel">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        {children}
      </div>
    </details>
  );
}