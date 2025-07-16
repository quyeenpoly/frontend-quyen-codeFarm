import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/HomePage.css";

const fakeCategoryImages = [
  "/images/danhmuc1.jpg",
  "/images/danhmuc2.jpg",
  "/images/img_collection.jpg"
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        if (res.data.success && res.data.data) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };
    fetchCategories();
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
          {categories.length === 0 ? (
            <>
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
            </>
          ) : (
            [...categories]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
              .map((cat, idx) => (
                <div className="category-card" key={cat._id}>
                  <img src={cat.image || fakeCategoryImages[idx % fakeCategoryImages.length]} alt={cat.title} />
                  <Link to={`/shop?category=${cat.slug}`}>{cat.title}</Link>
                </div>
              ))
          )}
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
              <Link to={`/products/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-card">
                  <div className="product-image">
                    <img src={product.thumbnail} alt={product.title} />
                    <div className="product-overlay">
                      <button className="quick-view">Quick View</button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="price">{product.priceDefault ? product.priceDefault.toLocaleString() + "₫" : ""}</p>
                    <div className="rating">
                      <span>★★★★★</span>
                      <span>({product.soldCount || 0})</span>
                    </div>
                  </div>
                </div>
              </Link>
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