import { Button, Form, Input } from "antd";
import React, { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { editUserAction } from "../../../redux/actions/QuanLyNguoiDungAction";

export default function UpdateInformation(props) {
  const { userLogin } = props;
  console.log("user", userLogin);
  const [img, setImg] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: userLogin.id,
      avatar: null,
      email: userLogin.email,
      name: userLogin.name,
      phoneNumber: userLogin.phoneNumber,
      passWord: null,
    },
    onSubmit: (values) => {
      console.log("values", values);

      let formData = new FormData();
      for (let key in values) {
        if (key !== "avatar") {
          formData.append(key, values[key]);
        } else {
          if (values.avatar !== null) {
            formData.append("Avataz", values.avatar, values.avatar.name);
          }
        }
      }
      dispatch(editUserAction(formData));
    },
  });
  const handleChangeAvatar = (event) => {
    let file = event.target.files[0];
    //tao doi tuong dọc file
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        setImg(e.target.result);
      };
      formik.setFieldValue("avatar", file);
    }
    console.log("file", file);
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Form.Item label="Avatar" valuePropName="fileList">
        <input
          type="file"
          onChange={handleChangeAvatar}
          accept="image/png, image/jpeg, image/jpg, image/gif"
        />
        <br />
        <img
          src={img === "" ? userLogin.avatar : img}
          alt="avatar"
          style={{ width: "80px", height: "auto" }}
        />
      </Form.Item>
      <Form.Item label="Name">
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="email">
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Phone Number">
        <Input
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Password">
        <Input
          type="password"
          placeholder="Nhập lại mật khẩu"
          name="passWord"
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Cập nhật">
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
}
