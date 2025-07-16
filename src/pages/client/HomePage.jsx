import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        if (res.data.success && res.data.data) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Style</h1>
          <p>Explore our latest collection of premium fashion</p>
          <Link to="/shop" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src="/images/danhmuc1.jpg" alt="Men's Fashion" />
            <Link to="/shop?category=men">Shop Now</Link>
          </div>
          <div className="category-card">
            <img src="/images/danhmuc2.jpg" alt="Women's Fashion" />
            <Link to="/shop?category=women">Shop Now</Link>
          </div>
          <div className="category-card">
            <img src="/images/img_collection.jpg" alt="Accessories" />
            <Link to="/shop?category=accessories">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="product-grid">
          {products.length === 0 ? (
            <p>Đang tải sản phẩm...</p>
          ) : (
            products.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image">
                  <img src={product.thumbnail} alt={product.title} />
                  <div className="product-overlay">
                    <button className="quick-view">Quick View</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="price">{product.priceDefault.toLocaleString()}₫</p>
                  <div className="rating">
                    <span>★★★★★</span>
                    <span>({product.soldCount || 0})</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Special Offer */}
      <section className="special-offer">
        <div className="offer-content">
          <h2>Special Offer</h2>
          <p>Get 20% off on your first purchase</p>
          <Link to="/shop" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature">
          <i className="fas fa-truck"></i>
          <h3>Free Shipping</h3>
          <p>On all orders over $50</p>
        </div>
        <div className="feature">
          <i className="fas fa-undo"></i>
          <h3>Easy Returns</h3>
          <p>30 days return policy</p>
        </div>
        <div className="feature">
          <i className="fas fa-lock"></i>
          <h3>Secure Payment</h3>
          <p>100% secure checkout</p>
        </div>
        <div className="feature">
          <i className="fas fa-headset"></i>
          <h3>24/7 Support</h3>
          <p>Dedicated support team</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 