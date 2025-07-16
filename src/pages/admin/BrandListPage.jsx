import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message, Popconfirm, Select } from "antd";
import axios from "axios";

const API_URL = "http://localhost:5000/api/brands";

const BrandListPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [form] = Form.useForm();

  // Fetch brands
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      if (res.data.success && res.data.data) {
        setBrands(res.data.data);
      }
    } catch (err) {
      message.error("Lỗi khi tải brand");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Open modal for create or edit
  const openModal = (brand = null) => {
    setEditingBrand(brand);
    setModalVisible(true);
    if (brand) {
      form.setFieldsValue({
        title: brand.title,
        description: brand.description,
        slug: brand.slug,
        image: brand.image,
        status: brand.status,
      });
    } else {
      form.resetFields();
    }
  };

  // Handle create or update
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingBrand) {
        await axios.patch(`${API_URL}/${editingBrand._id}`, values);
        message.success("Cập nhật brand thành công");
      } else {
        await axios.post(API_URL, values);
        message.success("Thêm brand thành công");
      }
      setModalVisible(false);
      setEditingBrand(null);
      fetchBrands();
    } catch (err) {
      message.error("Lỗi khi lưu brand");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xóa brand thành công");
      fetchBrands();
    } catch (err) {
      message.error("Lỗi khi xóa brand");
    }
  };

  const columns = [
    {
      title: "Tên brand",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (url) => url ? <img src={url} alt="brand" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6 }} /> : null,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => status === 1 ? "Hiển thị" : "Ẩn",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa brand này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>Quản lý brand</h2>
      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
        Thêm brand
      </Button>
      <Table
        columns={columns}
        dataSource={brands}
        rowKey="_id"
        loading={loading}
        bordered
      />
      <Modal
        title={editingBrand ? "Sửa brand" : "Thêm brand"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => { setModalVisible(false); setEditingBrand(null); }}
        okText={editingBrand ? "Lưu" : "Thêm"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên brand"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên brand" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: "Vui lòng nhập slug" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ảnh (URL)"
            name="image"
            rules={[{ required: true, message: "Vui lòng nhập link ảnh" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
              <Select.Option value={1}>Hiển thị</Select.Option>
              <Select.Option value={0}>Ẩn</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandListPage; 