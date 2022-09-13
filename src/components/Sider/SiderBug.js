import {
   DoubleLeftOutlined,
  DoubleRightOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Menu, Modal } from "antd";
import React, { useState } from "react";
import CreateTask from "../../page/CreateTask/CreateTask";
import styles from './sider.module.scss'

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
        className={styles.siderBug}
       
      >
        <Button onClick={toggleCollapsed}>
          {collapsed ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
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
