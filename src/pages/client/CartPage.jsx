import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/CartPage.css';

const CartPage = () => {
  // Mock data for cart items
  const cartItems = [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: 129.99,
      image: "/images/sneaker1.jpg",
      size: "US 9",
      color: "Black",
      quantity: 1
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 159.99,
      image: "/images/sneaker2.jpg",
      size: "US 8.5",
      color: "White",
      quantity: 2
    }
  ];

  // Mock data for cart summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
      </div>

      {cartItems.length > 0 ? (
        <div className="cart-container">
          {/* Cart Items List */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                </div>
                <div className="item-price">
                  ${item.price}
                </div>
                <div className="quantity-controls">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>
                <button className="remove-item">×</button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2 className="summary-header">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-button">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
