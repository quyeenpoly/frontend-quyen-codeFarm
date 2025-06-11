import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">STORE</Link>
            <p className="footer-description">
              Discover the latest trends in fashion and lifestyle. 
              Shop our curated collection of premium products.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3>Shop</h3>
              <ul>
                <li><Link to="/shop">All Products</Link></li>
                <li><Link to="/shop?category=new">New Arrivals</Link></li>
                <li><Link to="/shop?category=best-seller">Best Sellers</Link></li>
                <li><Link to="/shop?category=sale">Sale</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>About</h3>
              <ul>
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Help</h3>
              <ul>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/shipping">Shipping</Link></li>
                <li><Link to="/returns">Returns</Link></li>
                <li><Link to="/size-guide">Size Guide</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} STORE. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 