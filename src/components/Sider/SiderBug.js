import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(
    <NavLink to="/create-issues">Create issues</NavLink>,
    "1",
    <PlusOutlined />
  ),
  getItem(<NavLink to="/search">Search</NavLink>, "2", <SearchOutlined />),
];

export default function SiderBug() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className="sider-bug"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        backgroundColor: "#001529"
      }}
    >
      <Button
        // type="primary"
        onClick={toggleCollapsed}
        // style={{
        //   marginBottom: 16,
        // }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{
          height: "100%",
          borderRight: 0,
        }}
      />
    </div>
  );
}
