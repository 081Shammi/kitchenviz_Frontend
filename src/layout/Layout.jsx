import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  FormOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/users";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const colorBgContainer = "#fff";
  const borderRadiusLG = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // clear Redux state
    navigate("/login", { replace: true }); // redirect to login
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#fff", // ← white background
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)", // optional shadow for depth
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
            src="/public/assets/logo1.jpg"
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
          selectedKeys={[location.pathname.includes("recruitment") ? "2" : "1"]} // keeps highlight in sync
          onClick={({ key }) => {
            if (key === "1") navigate("/dashboard/CategoryList");
            else if (key === "2") navigate("/dashboard/ProductList");
            else if (key === "3") navigate("/dashboard/ProductSliderList");
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
              pointerEvents: "none", // allows clicks to pass through
            }}
          >
            <span
              style={{
                fontWeight: 500,
                fontSize: 18,
                color: "#18181b",
              }}
            >
              Kicthen Viz Admin Dashboard
            </span>
          </div>

          {/* Logout on Right */}
          <Button
            type="primary"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            style={{
              backgroundColor: "#f87171", // light red
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
          <div
          // style={{
          //   minHeight: 200,
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   color: "#888",
          //   fontSize: 22,
          //   fontWeight: 500,
          // }}
          >
            {/* {children} */}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
