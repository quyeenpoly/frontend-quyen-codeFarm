import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetail } from "../../api/productApi";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data } = await getProductDetail(id);
        setProduct(data);
      } catch (error) {
        toast.error("Không thể tải chi tiết sản phẩm.");
      }
    };
    fetchDetail();
  }, [id]);

  if (!product) {
    return (
      <div className="container mt-4">
        <p>Đang tải dữ liệu sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-primary mb-4">Chi tiết sản phẩm</h2>

      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-3">{product.title}</h4>
          <p className="card-text"><strong>Giá:</strong> {product.price?.toLocaleString()} VNĐ</p>

          {/* Nếu có thêm mô tả, hình ảnh, v.v... */}
          {product.description && (
            <p className="card-text">
              <strong>Mô tả:</strong> {product.description}
            </p>
          )}

          {/* Nếu có ảnh */}
          {product.image && (
            <div className="mb-3">
              <img src={product.image} alt={product.title} className="img-fluid rounded" />
            </div>
          )}

          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
