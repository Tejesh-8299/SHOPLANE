import { useState } from "react";
import products from "../data/products.json";
import "./Home.css";

function Home() {
  // 🔹 States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");
  const [sort, setSort] = useState("");

  // 🔹 Filter Logic
  const filteredProducts = products
    .filter((product) => {
      const matchSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || product.category === category;

      const matchPrice =
        price === "All" ||
        (price === "low" && product.price < 500) ||
        (price === "medium" &&
          product.price >= 500 &&
          product.price <= 1000) ||
        (price === "high" && product.price > 1000);

      return matchSearch && matchCategory && matchPrice;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="container">

      {/* 🔹 Navbar */}
      <div className="navbar">
        <h2 className="logo">ShopLane</h2>
        <button className="cart-btn">Cart</button>
      </div>

      {/* 🔹 Hero + Search */}
      <div className="hero">
        <h1>Find Your Products</h1>

        <input
          type="text"
          placeholder="Search products..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🔹 Filters */}
        <div className="filters">

          {/* Category */}
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select>

          {/* Price */}
          <select onChange={(e) => setPrice(e.target.value)}>
            <option value="All">All Prices</option>
            <option value="low">Below ₹500</option>
            <option value="medium">₹500 - ₹1000</option>
            <option value="high">Above ₹1000</option>
          </select>

          {/* Sort */}
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>

        </div>
      </div>

      {/* 🔹 Product Grid */}
      <div className="grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="image"
              />
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="category">{product.category}</p>
            </div>
          ))
        ) : (
          <h2 className="empty">No products found</h2>
        )}
      </div>

    </div>
  );
}

export default Home;
