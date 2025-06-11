import React from 'react';
import "../../css/About.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>About Us</h1>
          <p className="mission-statement">
            We are dedicated to providing the best shopping experience with quality products and exceptional service.
          </p>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="company-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2024, we started with a simple mission: to make quality products accessible to everyone. 
                What began as a small online store has grown into a trusted destination for shoppers worldwide.
              </p>
              <p>
                Today, we continue to innovate and expand our offerings while staying true to our core values 
                of quality, customer satisfaction, and community.
              </p>
            </div>
            <div className="info-image">
              <img src="/images/newban12.jpg" alt="Our Store" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <i className="fas fa-heart"></i>
              <h3>Customer First</h3>
              <p>We prioritize our customers' needs and satisfaction above all else.</p>
            </div>
            <div className="value-card">
              <i className="fas fa-star"></i>
              <h3>Quality</h3>
              <p>We maintain the highest standards in all our products and services.</p>
            </div>
            <div className="value-card">
              <i className="fas fa-handshake"></i>
              <h3>Integrity</h3>
              <p>We conduct our business with honesty and transparency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="/images/sneaker1.jpg" alt="Team Member" />
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img src="/images/sneaker2.jpg" alt="Team Member" />
              <h3>Jane Smith</h3>
              <p>Head of Operations</p>
            </div>
            <div className="team-member">
              <img src="/images/sneaker3.jpg" alt="Team Member" />
              <h3>Mike Johnson</h3>
              <p>Customer Service Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Join Our Journey</h2>
          <p>Be part of our growing community and experience the difference.</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 