import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        if (res.data.success && res.data.data) {
          setProduct(res.data.data);
        }
      } catch (err) {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Đang tải...</div>;

  return (
    <div className="product-detail-page">
      <div className="product-container">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-name">{product.title}</h1>
          <div className="product-price">
            <span className="price">{product.priceDefault ? product.priceDefault.toLocaleString() + "₫" : ""}</span>
            <span className={product.deletedAt ? "out-of-stock" : "in-stock"}>
              {product.deletedAt ? "Ngừng kinh doanh" : "Còn hàng"}
            </span>
          </div>
          <p className="product-short-description" style={{ fontStyle: 'italic', color: '#888' }}>{product.shortDescription}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-meta">
            <div><strong>Đã bán:</strong> {product.soldCount}</div>
            <div><strong>Tags:</strong> {product.tags && product.tags.length > 0 ? product.tags.join(', ') : 'Không có'}</div>
            <div><strong>Ngày tạo:</strong> {new Date(product.createdAt).toLocaleString()}</div>
            <div><strong>Ngày cập nhật:</strong> {new Date(product.updatedAt).toLocaleString()}</div>
            <div><strong>SEO Title:</strong> {product.seoTitle}</div>
            <div><strong>SEO Description:</strong> {product.seoDescription}</div>
          </div>
          <div className="quantity-selection">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>
          <button className="add-to-cart-btn" onClick={() => alert('Thêm vào giỏ hàng!')}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
