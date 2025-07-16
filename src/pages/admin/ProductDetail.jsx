import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Tag, Button, Image, Typography, Space, Divider } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const { Title, Paragraph, Text } = Typography;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        // Nếu API trả về { success, data, ... }
        setProduct(res.data.data); // <-- Sửa lại dòng này!
      } catch (error) {
        toast.error("Không thể tải chi tiết sản phẩm.");
      }
    };
    fetchDetail();
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: 32 }}>
        <p>Đang tải dữ liệu sản phẩm...</p>
      </div>
    );
  }

  // Fallback helpers
  const safe = (val, fallback = "-") => (val !== undefined && val !== null && val !== "") ? val : fallback;
  const safeArray = (arr) => Array.isArray(arr) && arr.length > 0 ? arr : null;

  return (
    
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px #eee' }}>
      <Title level={2} style={{ color: '#1677ff', marginBottom: 24 }}>Chi tiết sản phẩm</Title>
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Space align="start" size={32} wrap>
          <Image
            src={safe(product.thumbnail, "https://via.placeholder.com/220x220?text=No+Image")}
            alt={safe(product.title, "No title")}
            width={220}
            height={220}
            style={{ objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}
            fallback="https://via.placeholder.com/220x220?text=No+Image"
          />
          <Descriptions
            column={1}
            bordered
            size="middle"
            style={{ minWidth: 350 }}
            labelStyle={{ width: 140, fontWeight: 600 }}
          >
            <Descriptions.Item label="Tên sản phẩm">{safe(product.title)}</Descriptions.Item>
            <Descriptions.Item label="Giá">
              <Text strong type="danger">{safe(product.priceDefault, 0).toLocaleString()} VNĐ</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Thương hiệu">{safe(product.brandId?.title)}</Descriptions.Item>
            <Descriptions.Item label="Danh mục con">{safe(product.subCategoryId?.title)}</Descriptions.Item>
            <Descriptions.Item label="Slug">{safe(product.slug)}</Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{product.createdAt ? new Date(product.createdAt).toLocaleString() : "-"}</Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">{product.updatedAt ? new Date(product.updatedAt).toLocaleString() : "-"}</Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
      <Divider />
      <Descriptions
        title="Thông tin bổ sung"
        column={1}
        bordered
        size="middle"
        style={{ marginBottom: 24 }}
        labelStyle={{ width: 180, fontWeight: 600 }}
      >
        <Descriptions.Item label="Mô tả ngắn">{safe(product.shortDescription)}</Descriptions.Item>
        <Descriptions.Item label="Mô tả chi tiết">
          <Paragraph style={{ whiteSpace: 'pre-line' }}>{safe(product.description)}</Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="SEO Title">{safe(product.seoTitle)}</Descriptions.Item>
        <Descriptions.Item label="SEO Description">{safe(product.seoDescription)}</Descriptions.Item>
        <Descriptions.Item label="Tags">
          {safeArray(product.tags) ? (
            product.tags.map(tag => <Tag key={tag}>{tag}</Tag>)
          ) : <Text type="secondary">Không có</Text>}
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng đã bán">{safe(product.soldCount, 0)}</Descriptions.Item>
        <Descriptions.Item label="Biến thể">
          {safeArray(product.variants) ? (
            product.variants.map(variant => <Tag key={variant._id || variant}>{variant.title || variant}</Tag>)
          ) : <Text type="secondary">Không có</Text>}
        </Descriptions.Item>
      </Descriptions>
      <Button type="default" onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </div>
  );
};

export default ProductDetailPage;
