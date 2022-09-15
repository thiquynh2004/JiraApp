import { Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DetailInformation from "./DetailInformation/DetailInformation";
import UpdateInformation from "./UpdateInformation/UpdateInformation";
import { EditOutlined } from "@ant-design/icons";
import styles from "./profile.module.scss";

export default function Profile() {
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
  // const [visible, setVisible] = useState(false);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin", userLogin);
  return (
    <div>
      <Row gutter={16}>
        <Col span={1}>
          <span className={styles.icon} onClick={showModal}>
            <EditOutlined />
          </span>
        </Col>
        <Col span={11}>
          <DetailInformation userLogin={userLogin} />
        </Col>
        <Modal
          title="Edit User"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <UpdateInformation userLogin = {userLogin}/>
        </Modal>
      </Row>
    </div>
  );
}
