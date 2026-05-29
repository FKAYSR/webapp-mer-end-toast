export default function ProductCard({
  title,
  price,
  time,
  image,
  variant = "large",
  onClick,
}) {
  const cardClassName = `product-card product-card--${variant}`;

  return (
    <article className={cardClassName}>
      {image && (
        <div className="product-card-image-wrapper">
          <img className="product-card-image" src={image} alt={title ?? ""} />
        </div>
      )}

      <div className="product-card-content">
        {title && <h3 className="product-card-title">{title}</h3>}

        <div className="product-card-meta">
          {typeof price !== "undefined" && price !== null && (
            <span className="product-card-price">
              {Number(price).toLocaleString("da-DK", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })} kr
            </span>
          )}

          {time && <span className="product-card__time">{time} min</span>}
        </div>
      </div>

      {onClick && (
        <button
          type="button"
          className="product-card__button"
          onClick={onClick}
          aria-label={title ? `Vælg ${title}` : "Vælg opskrift"}
        />
      )}
    </article>
  );
}
