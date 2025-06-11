import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Mock data
  const product = {
    id: 1,
    name: "Nike Air Max 270",
    price: 129.99,
    description: "The Nike Air Max 270 delivers visible cushioning under every step with a large window and fresh color. The shoe features a stretchy inner sleeve for a snug, sock-like fit.",
    images: [
      "/images/sneaker1.jpg",
      "/images/sneaker2.jpg",
      "/images/sneaker3.jpg",
      "/images/sneaker4.jpg"
    ],
    sizes: ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" },
      { name: "Red", value: "#FF0000" },
      { name: "Blue", value: "#0000FF" }
    ],
    features: [
      "Breathable mesh upper",
      "Foam midsole",
      "Rubber outsole",
      "Nike Air unit",
      "Padded collar"
    ],
    rating: 4.5,
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        date: "2024-03-15",
        comment: "Great shoes! Very comfortable and stylish. The cushioning is amazing."
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 4,
        date: "2024-03-10",
        comment: "Good quality and fit. The only reason for 4 stars is that they run a bit small."
      },
      {
        id: 3,
        user: "Mike R.",
        rating: 5,
        date: "2024-03-05",
        comment: "Perfect for daily wear and workouts. Highly recommended!"
      }
    ],
    inStock: true
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }
    console.log('Adding to cart:', {
      product,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
  };

  return (
    <div className="product-detail-page">
      <div className="product-container">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[0]} alt={product.name} />
          </div>
          <div className="thumbnail-images">
            {product.images.map((image, index) => (
              <div key={index} className="thumbnail">
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </div>
            ))}
          </div>
          {/* Reviews Section */}
          <div className="reviews-section">
            <h3>Customer Reviews</h3>
            <div className="reviews-list">
              {product.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-user">
                      <span className="user-name">{review.user}</span>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="review-count">({product.reviews.length} reviews)</span>
            
          </div>

          <div className="product-price">
            <span className="price">${product.price}</span>
            {product.inStock ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          {/* Size Selection */}
          <div className="size-selection">
            <h3>Select Size</h3>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="color-selection">
            <h3>Select Color</h3>
            <div className="color-options">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color.name)}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="quantity-selection">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {/* Product Features */}
          <div className="product-features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
