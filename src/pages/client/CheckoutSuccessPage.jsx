import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/CheckoutSuccessPage.css';

const CheckoutSuccessPage = () => {
  // Mock order data - replace with actual order data from your state management or API
  const orderData = {
    orderId: 'ORD123456',
    orderDate: new Date().toLocaleDateString(),
    status: 'Processing',
    items: [
      {
        id: 1,
        name: 'Nike Air Max 270',
        price: 150,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
        size: '42',
        color: 'Black',
        quantity: 1
      },
      {
        id: 2,
        name: 'Adidas Ultraboost 22',
        price: 180,
        image: 'public/images/sneaker2.jpg',
        size: '43',
        color: 'White',
        quantity: 1
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Ho Chi Minh City',
      state: 'Ho Chi Minh',
      zipCode: '70000',
      country: 'Vietnam'
    },
    paymentMethod: 'Cash on Delivery',
    subtotal: 330,
    shipping: 10,
    total: 340
  };

  return (
    <div className="success-page">
      <div className="success-header">
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
      </div>

      <div className="order-details">
        <h2>Order Details</h2>
        <div className="order-info">
          <div className="info-group">
            <h3>Order Number</h3>
            <p>{orderData.orderId}</p>
          </div>
          <div className="info-group">
            <h3>Order Date</h3>
            <p>{orderData.orderDate}</p>
          </div>
          <div className="info-group">
            <h3>Order Status</h3>
            <p>{orderData.status}</p>
          </div>
          <div className="info-group">
            <h3>Payment Method</h3>
            <p>{orderData.paymentMethod}</p>
          </div>
        </div>

        <div className="order-items">
          <h3>Order Items</h3>
          <div className="item-list">
            {orderData.items.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Size: {item.size} | Color: {item.color}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-info">
          <div className="info-group">
            <h3>Shipping Address</h3>
            <p>{orderData.shippingAddress.name}</p>
            <p>{orderData.shippingAddress.address}</p>
            <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}</p>
            <p>{orderData.shippingAddress.country}</p>
          </div>
          <div className="info-group">
            <h3>Order Summary</h3>
            <p>Subtotal: ${orderData.subtotal}</p>
            <p>Shipping: ${orderData.shipping}</p>
            <p>Total: ${orderData.total}</p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
        <Link to="/orders" className="view-orders">
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
