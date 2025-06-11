import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-danger mb-4">Ối! Trang này không tồn tại nữa.</h1>
      <Link to="/" className="btn btn-primary btn-lg">
        Quay về trang chủ
      </Link>
    </div>
  ); 
};

export default NotFoundPage;
