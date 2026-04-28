import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import products from "../data/products.json";
import "./ProductDetails.css";
import { useCart } from "../context/CartContext"; 


function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

    const { addToCart } = useCart();

    const product = products.find(p => p.id === Number(id));

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);



  if (!product) return <h2>Product Not Found</h2>;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-details">

      {/* Breadcrumb */}
      <p className="breadcrumb">
        Home &gt; {product.category} &gt; {product.name}
      </p>

      <div className="main-section">

        {/* LEFT IMAGE */}
        <div className="image-section">
          <img src={product.image} alt={product.name} />
          {product.badge && <span className="badge">{product.badge}</span>}
        </div>

        {/* RIGHT DETAILS */}
        <div className="info-section">
          <p className="category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="rating">⭐ {product.rating || "4.5"}</p>

          <p className="price">
            ₹{product.price}
           <span className="discount">
            {product.discount ? `${product.discount}% OFF` : ""}
             </span>
          </p>

          <p className="desc">{product.description || "No description available"}</p>
          {/* Quantity */}
          <div className="qty">
            <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
          </div>

          {/* Buttons */}
          <div className="actions">
            <button onClick={handleAddToCart}>
              {added ? "Added!" : "Add to Cart"}
            </button>

            <button onClick={handleBuyNow} className="buy">
              Buy Now
            </button>
          </div>

          {/* Features */}
          <div className="features">
            <p>🚚 Free Delivery</p>
            <p>↩️ 7-Day Returns</p>
            <p>✔️ Genuine Product</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related">
        <h2>Related Products</h2>

        <div className="related-grid">
          {relatedProducts.map(item => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
