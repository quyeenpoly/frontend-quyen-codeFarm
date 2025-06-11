import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-text">ADIDAS</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Shop</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button>
            <FaSearch />
          </button>
        </div>

        {/* User Actions */}
        <div className="user-actions">
          <button className="action-btn">
            <FaUser />
          </button>
          <button className="action-btn">
            <FaHeart />
          </button>
          <button className="action-btn">
            <FaShoppingCart />
            <span className="cart-count">0</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Shop</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
          <div className="mobile-search">
            <input type="text" placeholder="Search products..." />
            <button>
              <FaSearch />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 