import { useCart } from "../context/CartContext";
import "./Cart.css";


const { cart, removeFromCart, updateQty, cartTotal } = useCart();

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);


if (cart.length === 0) {
  return (
    <div className="empty">
      <h2>Your Cart is Empty</h2>
      <button>Start Shopping</button>
    </div>
  );
}


{cart.map((item) => (
  <div className="cart-item" key={item.id}>
    
    <img src={item.image} />

    <div>
      <h3>{item.name}</h3>
      <p>{item.category}</p>

      <div>
        <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
        <span>{item.qty}</span>
        <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
      </div>

      <p>₹{item.price * item.qty}</p>

      <button onClick={() => removeFromCart(item.id)}>
        Remove
      </button>

    </div>
  </div>
))}

<div className="summary">
  <h2>Order Summary</h2>

  <p>Subtotal: ₹{cartTotal}</p>

  <p>Shipping: {cartTotal > 500 ? "FREE" : "₹50"}</p>

  <h3>Total: ₹{cartTotal}</h3>

  <button>Checkout</button>
</div>
