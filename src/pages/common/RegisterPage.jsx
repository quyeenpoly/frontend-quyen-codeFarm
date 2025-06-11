import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerSchema } from "../../validations/authSchema";
import { toast } from "react-toastify";
import { registerApi } from "../../api/authApi";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;
      const res = await registerApi(data);
      console.log(res);
      reset();
      toast.success("Register successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Register failed!");
      reset();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center">Đăng ký tài khoản</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              id="username"
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username")}
              placeholder="Nhập username"
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
              placeholder="Nhập email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password")}
              placeholder="Nhập mật khẩu"
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              {...register("confirmPassword")}
              placeholder="Nhập lại mật khẩu"
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword.message}</div>
            )}
          </div>

          <div className="mb-3 text-center">
            Bạn đã có tài khoản?{" "}
            <Link to="/auth/login" className="text-decoration-none">
              Đăng nhập ngay!
            </Link>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
