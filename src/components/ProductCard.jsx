import { useNavigate } from "react-router";

export default function ProductCard({
  id,
  title,
  price,
  time,
  image,
  variant = "large",
}) {
  const cardClassName = `product-card product-card-${variant}`;
  const navigate = useNavigate();

  return (
    <article className={cardClassName}
    onClick={() => navigate(`/opskrift?id=${id}`)}>
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

          {time && <span className="product-card-time">{time} min</span>}
        </div>
      </div>
    </article>
  );
}
