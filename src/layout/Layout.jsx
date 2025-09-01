import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/users";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const colorBgContainer = "#fff";
  const borderRadiusLG = 8;
  const navigate = useNavigate();
  const location = useLocation();  // Add this!
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // clear Redux state
    navigate("/login", { replace: true }); // redirect to login
  };

  // Helper to determine active menu key
  const getSelectedKey = () => {
    if (location.pathname.includes("CategoryList")) return "1";
    if (location.pathname.includes("ProductSliderList")) return "3";
    if (location.pathname.includes("ProductList")) return "2";
    if (location.pathname.includes("OrderListing")) return "4";
    return "";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#fff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 0 8px 0",
            marginBottom: 8,
          }}
        >
          <img
            src="assets/logo1.jpg"
            alt="Logo"
            style={{ height: 100, width: 100, marginBottom: 8 }}
          />
          <span
            style={{
              color: "#18181b",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            Admin
          </span>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          onClick={({ key }) => {
            if (key === "1") navigate("/dashboard/CategoryList");
            else if (key === "2") navigate("/dashboard/ProductList");
            else if (key === "3") navigate("/dashboard/ProductSliderList");
            else if (key === "4") navigate("/dashboard/OrderListing");
          }}
          items={[
            {
              key: "1",
              icon: <UnorderedListOutlined />,
              label: "Category List",
            },
            {
              key: "2",
              icon: <UnorderedListOutlined />,
              label: "Product List",
            },
            {
              key: "3",
              icon: <UnorderedListOutlined />,
              label: "Slider List",
            },
            {
              key: "4",
              icon: <UnorderedListOutlined />,
              label: "Order List",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 64,
            position: "relative",
          }}
        >
          {/* Collapse Button on Left */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "20px",
              width: 56,
              height: 56,
              marginLeft: 8,
              color: "#18181b",
            }}
          />

          {/* Center Title (absolute center) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontWeight: 500,
                fontSize: 18,
                color: "#18181b",
              }}
            >
              Kitchen Viz Admin Dashboard
            </span>
          </div>

          {/* Logout on Right */}
          <Button
            type="primary"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            style={{
              backgroundColor: "#f87171",
              borderColor: "#f87171",
              fontWeight: "bold",
              marginRight: 16,
            }}
          >
            Logout
          </Button>
        </Header>

        <Content
          style={{
            margin: "32px 16px",
            padding: 32,
            minHeight: 320,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          }}
        >
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
