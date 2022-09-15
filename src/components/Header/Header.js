/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
// import "./header.scss";
import _ from "lodash";
import { Button, Modal } from "antd";
import { FrownOutlined, LogoutOutlined } from "@ant-design/icons";
import { TOKEN, USER_LOGIN } from "../../util/config";
import styles from "./header.module.scss";

const { confirm } = Modal;

export default function Header() {
  const navigate = useNavigate();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const showLogOutConfirm = () => {
    confirm({
      title: "Bạn có muốn đăng xuất không?",
      icon: <FrownOutlined />,
      // content: <FrownOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN);
        navigate("/login");
        window.location.reload();
        console.log("OK");
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

 


  const operations = (
    <div>
      {!_.isEmpty(userLogin) ? (
        <div>
          <>
            <NavLink to = "/profile">
            <Button  type="dashed"  size="large">Hello {userLogin.name}</Button>
              </NavLink>
           
          </>
          <Button type="ghost" size="large" onClick={showLogOutConfirm}>
            Đăng xuất <LogoutOutlined />
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
  return (
    <div className={styles.header}>
      <div className={styles.buttonItems}>{operations}</div>
    </div>
  );
}
