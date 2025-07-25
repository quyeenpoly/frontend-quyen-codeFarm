import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message, Popconfirm } from "antd";
import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      if (res.data.success && res.data.data) {
        setCategories(res.data.data);
      }
    } catch (err) {
      message.error("Lỗi khi tải danh mục");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Open modal for create or edit
  const openModal = (category = null) => {
    setEditingCategory(category);
    setModalVisible(true);
    if (category) {
      form.setFieldsValue({
        title: category.title,
        description: category.description,
        slug: category.slug,
      });
    } else {
      form.resetFields();
    }
  };

  // Handle create or update
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await axios.patch(`${API_URL}/${editingCategory._id}`, values); // PATCH thay vì PUT
        message.success("Cập nhật danh mục thành công");
      } else {
        await axios.post(API_URL, values);
        message.success("Thêm danh mục thành công");
      }
      setModalVisible(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      message.error("Lỗi khi lưu danh mục");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xóa danh mục thành công");
      fetchCategories();
    } catch (err) {
      message.error("Lỗi khi xóa danh mục");
    }
  };

  const columns = [
    {
      title: "Tên danh mục",
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
            title="Bạn có chắc muốn xóa danh mục này?"
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
      <h2>Quản lý danh mục</h2>
      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
        Thêm danh mục
      </Button>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        loading={loading}
        bordered
      />
      <Modal
        title={editingCategory ? "Sửa danh mục" : "Thêm danh mục"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => { setModalVisible(false); setEditingCategory(null); }}
        okText={editingCategory ? "Lưu" : "Thêm"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên danh mục"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
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
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryListPage;
