import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, cartTotal } = useCart();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const shipping = cartTotal > 500 ? 0 : 50;
  const grandTotal = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="empty">
        <h2>Your Cart is Empty</h2>
        <button onClick={() => navigate("/")}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div>
            <h3>{item.name}</h3>
            <p>{item.category}</p>

            <div>
              <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
            </div>

            <p>Rs {item.price * item.qty}</p>

            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      <div className="summary">
        <h2>Order Summary</h2>
        <p>Subtotal: Rs {cartTotal}</p>
        <p>Shipping: {shipping === 0 ? "FREE" : `Rs ${shipping}`}</p>
        <h3>Total: Rs {grandTotal}</h3>
        <button>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
