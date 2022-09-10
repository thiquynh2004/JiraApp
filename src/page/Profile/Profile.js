import { Button, Modal } from 'antd';
import React, { useState } from 'react'

export default function Profile() {
  const [ setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button onClick={showModal}>Cập nhật</Button>
          <Modal
            footer={null}
            visible={visible}
            title="Chỉnh sửa thông tin cá nhân"
            // onOk={formik.handleSubmit}
            onCancel={handleCancel}
            onClick={handleOk}
          ></Modal>
    </div>
  )
}
