import React, { useState } from 'react';
import '../../css/CheckoutPage.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Vietnam',
    paymentMethod: 'cod'
  });

  // Mock cart data - replace with actual cart data from your state management
  const [cartItems] = useState([
    {
      id: 1,
      name: 'Nike Air Max 270',
      price: 150,
      image: 'public/images/sneaker1.jpg',
      size: '42',
      color: 'Black',
      quantity: 1
    },
    {
      id: 2,
      name: 'Adidas Ultraboost 22',
      price: 180,
      image: 'public/images/sneaker3.jpg',
      size: '43',
      color: 'White',
      quantity: 1
    }
  ]);

  const shipping = 10;
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Navigate to success page or handle order creation
    // navigate('/checkout/success');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>

      <div className="checkout-container">
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="form-section">
              <h2>Contact Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="form-section">
              <h2>Shipping Address</h2>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP/Postal Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Vietnam">Vietnam</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <div className={`payment-method ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
                <div className={`payment-method ${formData.paymentMethod === 'credit' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    id="credit"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="credit">Credit Card</label>
                </div>
                <div className={`payment-method ${formData.paymentMethod === 'momo' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    id="momo"
                    name="paymentMethod"
                    value="momo"
                    checked={formData.paymentMethod === 'momo'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="momo">MoMo</label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2 className="summary-header">Order Summary</h2>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size} | Color: {item.color}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <button
            type="submit"
            className="place-order-button"
            onClick={handleSubmit}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
