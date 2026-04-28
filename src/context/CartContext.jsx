import { createContext, useState } from "react";
const CartContext = createContext();
export { CartContext };

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ➕ Add item
  const addToCart = (product, quantity = 1) => {
    const safeQty = Math.max(1, Number(quantity) || 1);
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + safeQty }
            : item
        );
      }

      return [...prev, { ...product, qty: safeQty }];
    });
  };

  // ❌ Remove item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔄 Update qty
  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, qty } : item
        )
      );
    }
  };

  // 🧹 Clear cart
  const clearCart = () => setCart([]);

  // 🔢 Total count
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // 💰 Total price
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

