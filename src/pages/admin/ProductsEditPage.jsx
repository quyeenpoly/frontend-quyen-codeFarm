import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {  getProductDetail, updateProduct } from "../../api/productApi";

const ProductsUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProductDetail(id);
        reset(data); // prefill form
      } catch (error) {
        toast.error("Không thể tải dữ liệu sản phẩm.");
      }
    };
    fetchData();
  }, [id, reset]);

  // Submit form
  const onSubmit = async (data) => {
    try {
      await updateProduct(id, data);
      toast.success("Cập nhật sản phẩm thành công!");
      navigate("/admin/products"); // Quay lại danh sách sản phẩm
    } catch (error) {
      toast.error("Cập nhật thất bại!");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-primary mb-4">Cập nhật sản phẩm</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title", { required: "Tên sản phẩm là bắt buộc" })}
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Giá (VNĐ)</label>
          <input
            type="number"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            {...register("price", {
              required: "Giá là bắt buộc",
              valueAsNumber: true,
              min: { value: 0, message: "Giá phải lớn hơn 0" },
            })}
          />
          {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>

        <div className="col-12 d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-success">
            Lưu thay đổi
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsUpdatePage;
