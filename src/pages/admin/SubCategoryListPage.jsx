import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message, Popconfirm, Select } from "antd";
import axios from "axios";

const API_URL = "http://localhost:5000/api/sub-categories";
const CATEGORY_API_URL = "http://localhost:5000/api/categories";

const SubCategoryListPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [form] = Form.useForm();

  // Fetch sub-categories
  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      if (res.data.success && res.data.data) {
        setSubCategories(res.data.data);
      }
    } catch (err) {
      message.error("Lỗi khi tải sub-category");
    }
    setLoading(false);
  };

  // Fetch categories for parent select
  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API_URL);
      if (res.data.success && res.data.data) {
        setCategories(res.data.data);
      }
    } catch (err) {
      message.error("Lỗi khi tải danh mục cha");
    }
  };

  useEffect(() => {
    fetchSubCategories();
    fetchCategories();
  }, []);

  // Open modal for create or edit
  const openModal = (subCate = null) => {
    setEditingSubCategory(subCate);
    setModalVisible(true);
    if (subCate) {
      form.setFieldsValue({
        title: subCate.title,
        description: subCate.description,
        slug: subCate.slug,
        categoryParentId: subCate.categoryParentId,
      });
    } else {
      form.resetFields();
    }
  };

  // Handle create or update
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingSubCategory) {
        await axios.patch(`${API_URL}/${editingSubCategory._id}`, values);
        message.success("Cập nhật sub-category thành công");
      } else {
        await axios.post(API_URL, values);
        message.success("Thêm sub-category thành công");
      }
      setModalVisible(false);
      setEditingSubCategory(null);
      fetchSubCategories();
    } catch (err) {
      message.error("Lỗi khi lưu sub-category");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xóa sub-category thành công");
      fetchSubCategories();
    } catch (err) {
      message.error("Lỗi khi xóa sub-category");
    }
  };

  const columns = [
    {
      title: "Tên sub-category",
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
      title: "Danh mục cha",
      dataIndex: "categoryParentId",
      key: "categoryParentId",
      render: (parent) => {
        // Nếu parent là object (populate), lấy title
        if (parent && typeof parent === "object" && parent.title) return parent.title;
        // Nếu parent là id, tìm trong categories
        const cat = categories.find(c => c._id === parent);
        return cat ? cat.title : parent;
      }
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
            title="Bạn có chắc muốn xóa sub-category này?"
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
      <h2>Quản lý sub-category</h2>
      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
        Thêm sub-category
      </Button>
      <Table
        columns={columns}
        dataSource={subCategories}
        rowKey="_id"
        loading={loading}
        bordered
      />
      <Modal
        title={editingSubCategory ? "Sửa sub-category" : "Thêm sub-category"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => { setModalVisible(false); setEditingSubCategory(null); }}
        okText={editingSubCategory ? "Lưu" : "Thêm"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên sub-category"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên sub-category" }]}
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
            label="Danh mục cha"
            name="categoryParentId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục cha" }]}
          >
            <Select placeholder="Chọn danh mục cha">
              {categories.map(cat => (
                <Select.Option value={cat._id} key={cat._id}>{cat.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubCategoryListPage; 