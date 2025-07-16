import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message, Popconfirm, Select, Tooltip, Card } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  // Thêm state
  const [brands, setBrands] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      if (res.data && res.data.data) {
        setProducts(res.data.data);
      } else if (Array.isArray(res.data)) {
        setProducts(res.data);
      }
    } catch (err) {
      message.error("Lỗi khi tải sản phẩm");
    }
    setLoading(false);
  };

  // Fetch brands & subcategories
  const fetchBrands = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/brands");
      setBrands(res.data.data || []);
    } catch { }
  };
  const fetchSubCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sub-categories");
      setSubCategories(res.data.data || []);
    } catch { }
  };

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchSubCategories();
  }, []);

  // Open modal for create or edit
  const openModal = (product = null) => {
    setEditingProduct(product);
    setModalVisible(true);
    if (product) {
      form.setFieldsValue({
        title: product.title,
        priceDefault: product.priceDefault,
        thumbnail: product.thumbnail,
        shortDescription: product.shortDescription,
        description: product.description,
        slug: product.slug,
        brandId: product.brandId?._id || product.brandId || undefined,
        subCategoryId: product.subCategoryId?._id || product.subCategoryId || undefined,
      });
    } else {
      form.resetFields();
    }
  };

  // Handle create or update
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Ensure brandId and subCategoryId are string IDs
      const payload = {
        ...values,
        priceDefault: Number(values.priceDefault), // Ensure number type
        brandId: typeof values.brandId === "object" ? values.brandId._id : values.brandId,
        subCategoryId: typeof values.subCategoryId === "object" ? values.subCategoryId._id : values.subCategoryId,
      };
      // Validate brandId and subCategoryId format
      const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);
      if (!isValidObjectId(payload.brandId)) {
        message.error("Thương hiệu không hợp lệ!");
        return;
      }
      if (!isValidObjectId(payload.subCategoryId)) {
        message.error("Danh mục con không hợp lệ!");
        return;
      }
      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct._id}`, payload);
        message.success("Cập nhật sản phẩm thành công");
      } else {
        await axios.post(API_URL, payload);
        message.success("Thêm sản phẩm thành công");
      }
      setModalVisible(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      message.error("Lỗi khi lưu sản phẩm");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xóa sản phẩm thành công");
      fetchProducts();
    } catch (err) {
      message.error("Lỗi khi xóa sản phẩm");
    }
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 70,
      render: (url) => url ? (
        <img src={url} alt="thumb" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, boxShadow: '0 2px 8px #eee' }} />
      ) : null,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      render: (text) => <Tooltip title={text}>{text}</Tooltip>,
    },
    {
      title: "Giá (VNĐ)",
      dataIndex: "priceDefault",
      key: "priceDefault",
      render: (price) => price ? price.toLocaleString() : '',
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "shortDescription",
      key: "shortDescription",
      ellipsis: true,
      render: (text) => <Tooltip title={text}>{text}</Tooltip>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      ellipsis: true,
      render: (text) => <Tooltip title={text}>{text}</Tooltip>,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brandId",
      key: "brandId",
      render: (brand) => brand?.title || brands.find(b => b._id === brand)?.title || "",
    },
    {
      title: "Danh mục con",
      dataIndex: "subCategoryId",
      key: "subCategoryId",
      render: (sub) => sub?.title || subCategories.find(s => s._id === sub)?.title || "",
    },
    {
      title: "Hành động",
      key: "action",
      width: 110,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" onClick={() => openModal(record)}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
          <Link to={`/admin/products/${record._id}`}><Button type="link">Xem</Button></Link>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontWeight: 700, color: '#1677ff', margin: 0 }}>Quản lý sản phẩm</h2>
        <Button type="primary" onClick={() => openModal()}>
          Thêm sản phẩm
        </Button>
      </div>
      <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 2px 12px #eee', padding: 0 }}>
        <Table
          columns={columns}
          dataSource={products}
          rowKey="_id"
          loading={loading}
          bordered
          pagination={{ pageSize: 10, showSizeChanger: false }}
          size="middle"
          style={{ background: 'white' }}
        />
      </Card>
      <Modal
        title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => { setModalVisible(false); setEditingProduct(null); }}
        okText={editingProduct ? "Lưu" : "Thêm"}
        cancelText="Hủy"
        width={600}
        bodyStyle={{ padding: 24 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Giá (VNĐ)"
            name="priceDefault"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <Input type="number" min={0} placeholder="Nhập giá sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Ảnh (URL)"
            name="thumbnail"
            rules={[{ required: true, message: "Vui lòng nhập link ảnh" }]}
          >
            <Input placeholder="Dán link ảnh sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Mô tả ngắn"
            name="shortDescription"
          >
            <Input placeholder="Nhập mô tả ngắn" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea rows={3} placeholder="Nhập mô tả chi tiết" />
          </Form.Item>
          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: "Vui lòng nhập slug" }]}
          >
            <Input placeholder="Nhập slug (không dấu, không cách)" />
          </Form.Item>
          <Form.Item
            label="Thương hiệu"
            name="brandId"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
          >
            <Select placeholder="Chọn thương hiệu" showSearch optionFilterProp="children">
              {brands.map(b => (
                <Select.Option value={b._id} key={b._id}>{b.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Danh mục con"
            name="subCategoryId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục con" }]}
          >
            <Select placeholder="Chọn danh mục con" showSearch optionFilterProp="children">
              {subCategories.map(s => (
                <Select.Option value={s._id} key={s._id}>{s.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductListPage;
