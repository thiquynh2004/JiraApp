import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Menu, Modal } from "antd";
import React, { useState } from "react";
import CreateTask from "../../page/CreateTask/CreateTask";


export default function SiderBug() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const items = [
    {
      label: (
        <>
          <span type="primary" onClick={() => setOpen(true)}>
            Create task
          </span>
          <Modal
            title="Create task"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
          >
            <CreateTask />
          </Modal>
        </>
      ),
      key: "createTask",
      icon: <PlusOutlined onClick={showDrawer} />,
    },
    {
      label: "Search",
      key: "search",
      icon: <SearchOutlined />,
    },
  ];

  return (
    <>
      <div
        className="sider-bug"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          backgroundColor: "#001529",
        }}
      >
        <Button onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["createTask"]}
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
    </>
  );
}
