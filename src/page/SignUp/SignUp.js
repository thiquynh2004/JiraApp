import { Button, Form, Input, message } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signUpAction } from "../../redux/actions/types/QuanLyNguoiDungAction";
import styles from "./signup.module.scss";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("*Email is invalid")
        .required("*Email is required")
        .trim("The contact name cannot include leading and trailing spaces"),
      passWord: Yup.string()
        .required("*Password is required!")
        .min(6, "*Password must be at least 6 characters long!")
        .trim("The contact name cannot include leading and trailing spaces"),
      name: Yup.string()
        .required("*Name is required!")
        .min(2, "*Name is too short")
        .max(50, "*Name is too long!"),
      phoneNumber: Yup.string()
        .required("*Phone number is required!")
        .matches(
          /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
          "*Phone number is invalid"
        )
        .trim("The contact name cannot include leading and trailing spaces"),
    }),
    onSubmit: (values) => {
      dispatch(signUpAction(values));
      console.log("values", values);
      message.success(
        {
          content: "Đăng ký thành công rồi nè",
          className: "message",
          style: {
            marginTop: "10vh",
            fontSize: "20px",
          },
        },
        setTimeout(() => {
          navigate("/login");
        }, 1000)
      );
    },
  });
  return (
    <div className={styles.register}>
      <div className={styles.registerForm}>
        <h1>Đăng ký</h1>
        <Form
          onSubmitCapture={formik.handleSubmit}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="true"
          size="large"
        >
          <Form.Item
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input name="email" onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email && (
              <i className={styles.error}>{formik.errors.email}</i>
            )}
          </Form.Item>

          <Form.Item label="Password" hasFeedback={!!formik.errors.passWord}>
            <Input.Password
              name="passWord"
              onChange={formik.handleChange}
              value={formik.values.passWord}
            />
            {formik.errors.passWord && formik.touched.passWord && (
              <i className={styles.error}>{formik.errors.passWord}</i>
            )}
          </Form.Item>
          <Form.Item label="Name" hasFeedback>
            <Input
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <i className={styles.error}>{formik.errors.name}</i>
            )}
          </Form.Item>

          <Form.Item label="Phone Number" hasFeedback>
            <Input
              name="phoneNumber"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <i className={styles.error}>{formik.errors.phoneNumber}</i>
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
