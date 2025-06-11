import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/OrderPage.css';

const OrderPage = () => {
  // Mock data for orders
  const orders = [
    {
      id: "ORD001",
      date: "2024-03-15",
      status: "delivered",
      items: [
        {
          id: 1,
          name: "Nike Air Max 270",
          image: "/images/sneaker1.jpg",
          price: 129.99,
          quantity: 1,
          size: "US 9",
          color: "Black"
        },
        {
          id: 2,
          name: "Adidas Ultraboost",
          image: "/images/sneaker2.jpg",
          price: 159.99,
          quantity: 2,
          size: "US 8.5",
          color: "White"
        }
      ],
      subtotal: 449.97,
      shipping: 10,
      total: 459.97
    },
    {
      id: "ORD002",
      date: "2024-03-10",
      status: "processing",
      items: [
        {
          id: 3,
          name: "Puma RS-X",
          image: "/images/sneaker3.jpg",
          price: 89.99,
          quantity: 1,
          size: "US 10",
          color: "Blue"
        }
      ],
      subtotal: 89.99,
      shipping: 10,
      total: 99.99
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="order-page">
      <div className="order-header">
        <h1>My Orders</h1>
      </div>

      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header-info">
                <div>
                  <span className="order-number">Order #{order.id}</span>
                  <span className="order-date">{formatDate(order.date)}</span>
                </div>
                <span className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                    </div>
                    <div className="item-quantity">
                      Quantity: {item.quantity}
                    </div>
                    <div className="item-price">
                      ${item.price}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="order-actions">
                <button className="action-button view-details">
                  View Details
                </button>
                {order.status === 'pending' && (
                  <button className="action-button cancel-order">
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
          <Link to="/products" className="shop-now">
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
