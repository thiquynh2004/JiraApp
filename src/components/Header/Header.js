/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
// import "./header.scss";
import _ from "lodash";
import { Button, Modal } from "antd";
import { FrownOutlined } from "@ant-design/icons";
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const operations = (
    <div>
      {!_.isEmpty(userLogin) ? (
        <div>
          <>
      <Button onClick={showModal}>
        Hello {userLogin.name}
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>

          {/* <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal> */}
          <Button type="ghost" size="large" onClick={showLogOutConfirm}>
            Đăng xuất
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
