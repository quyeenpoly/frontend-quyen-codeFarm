import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../../api/authApi";
import { loginSchema } from "../../validations/authSchema";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const nav = useNavigate();

  const onSubmit = async (dataForm) => {
    try {
      const { data } = await loginApi(dataForm);
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        nav("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Login failed!");
      reset();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center">Đăng nhập</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              Mật khẩu:
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

          <div className="mb-3 text-center">
            Bạn chưa có tài khoản?{" "}
            <Link to="/auth/register" className="text-decoration-none">
              Đăng ký ngay!
            </Link>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
