import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Avatar } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        
        {/* Greeting section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 20px",
            fontSize: "16px",
            fontWeight: 600,
            color: "#fff",
            marginBottom: 8,
          }}
        >
          <Avatar
            size={32}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#87d068", marginRight: 12 }}
          />
          {!collapsed && <span>Xin chào, Admin</span>}
        </div>

        {/* Menu items */}
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: (
                <Link style={{ textDecoration: "none" , color: "#ffff"}} to="/admin">
                  DashBoard
                </Link>
              ),
            },
            {
              key: "2",
              icon: <AppstoreOutlined />,
              label: (
                <Link style={{ textDecoration: "none" , color: "#ffff"}} to="/admin/products">
                  Quản lý sản phẩm
                </Link>
              ),
            },
            {
              key: "3",
              icon: <TeamOutlined />,
              label: (
                <Link style={{ textDecoration: "none" , color: "#ffff"}} to="/admin/users">
                  Quản lý tài khoản
                </Link>
              ),
            },
            {
              key: "4",
              icon: <ShoppingCartOutlined />,
              label: (
                <Link style={{ textDecoration: "none" , color: "#ffff"}} to="/admin/orders">
                  Quản lý đơn hàng
                </Link>
              ),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
