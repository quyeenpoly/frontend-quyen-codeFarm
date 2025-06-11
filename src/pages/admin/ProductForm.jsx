import React from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "../../api/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../validations/productSchema";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await createProduct(data);
      console.log("Thêm sản phẩm thành công:", res);
      reset();
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-primary">Thêm sản phẩm mới</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-light p-4 rounded shadow-sm">
        {/* Title */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Tên sản phẩm</label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title")}
          />
          {errors?.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Giá</label>
          <input
            type="number"
            step="0.01"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            {...register("price", { valueAsNumber: true })}
          />
          {errors?.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Mô tả</label>
          <textarea
            rows="3"
            className="form-control"
            {...register("description")}
            placeholder="Nhập mô tả nếu có..."
          />
        </div>

        {/* Actions */}
        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-primary">
            Thêm sản phẩm
          </button>
          <button type="button" onClick={() => reset()} className="btn btn-secondary">
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
