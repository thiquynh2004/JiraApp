import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import "./header.scss";
import _ from "lodash";
import { Button, Modal } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { TOKEN, USER_LOGIN } from "../../util/config";
import styles from "./header.module.scss"

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
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          <Button
            // type="primary"
            size="large"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Hello ! {userLogin.name}
          </Button>
          <Button type="ghost" size="large" onClick={showLogOutConfirm}>
            Đăng xuất
          </Button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
  return (
    <div className={styles.header}>
      <div className={styles.buttonItems}>{operations}</div>
    </div>
  );
}
