export default function ProductGrid({ title, children, variant = "vertical" }) {
  const gridOrientation = variant === "horizontal" ? "product-grid product-grid-horizontal" : "product-grid product-grid-vertical";

  return (
    <section className={gridOrientation}>
      {title && <h2 className="product-grid-title">{title}</h2>}
      <div className="product-grid-items">{children}</div>
    </section>
  );
}
