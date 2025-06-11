import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProduct } from "../../api/productApi";
import { toast } from "react-toastify";

const ProductListPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu ban đầu
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllProduct(); // gọi API trực tiếp (hoặc thay hook nếu muốn)
      setList(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xoá không?")) {
      try {
        await deleteProduct(id);
        toast.success("Xoá sản phẩm thành công!");
        // Cập nhật lại danh sách sau khi xoá
        setList((prevList) => prevList.filter((item) => item.id !== id));
      } catch (error) {
        toast.error("Xoá thất bại!");
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Quản lý sản phẩm</h2>
        <Link to="add" className="btn btn-primary btn-lg">
          + Thêm sản phẩm
        </Link>
      </div>

      {/* Loading/Error */}
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-danger">Lỗi: {error.message}</p>}

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle text-center">
          <thead className="table-light">
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th className="text-start">Tên sản phẩm</th>
              <th style={{ width: "15%" }}>Giá (VNĐ)</th>
              <th style={{ width: "20%" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
				  
				    <td className="text-start">{item.title}</td>
			
                
                  <td>{item.price?.toLocaleString()}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Xoá
                      </button>
                      <Link
                        to={`update/${item.id}`}
                        className="btn btn-warning btn-sm text-white"
                      >
                        Sửa
                      </Link>
					  <Link to={`/admin/products/detail/${item.id}`} className="btn btn-info">Xem</Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-muted py-4">
                  Không có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;
