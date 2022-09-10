/* eslint-disable react-hooks/exhaustive-deps */
import {} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Outlet} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { menuItems } from "./MenuItems";
import SiderBug from "../../components/Sider/SiderBug";
import styles from "./homeTemplate.module.scss"
const { Content, Sider } = Layout;

export default function HomeTemplate() {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin", userLogin);
  return (
    <div className={styles.homeTemplate}>
    <SiderBug/>
    <Layout
      style={{
      }}
    >
      <Sider>
        <div className="logo" style={{ color: "white" }}>
          hihih
        </div>
        <Menu
          theme="default"
          mode="inline"
          defaultSelectedKeys={["3"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
    </div>
  );
}
