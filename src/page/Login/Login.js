/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
// import { FacebookOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import styles from "./login.module.scss";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { USER_LOGIN } from "../../util/config";
// import FacebookLogin from "react-facebook-login";
// import axios from "axios";
// import { TokenCybersoft } from "../../util/config"
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(USER_LOGIN)) {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },
    onSubmit: (values) => {
      const action = dangNhapAction(values);
      dispatch(action);
      console.log("values", values);
    },
  });

  // const responseFacebook = (response) => {
  //   axios({
  //     url: "http://jiranew.cybersoft.edu.vn/api/Users/facebooklogin",
  //     method: "POST",
  //     data: {
  //       facebookToken: response.accessToken,
  //     },
  //     headers:{
  //       TokenCybersoft,
  //   }
  //   }).then((res) => {
  //     console.log(res)
  //     localStorage.setItem("accessToken", res.data.content.accessToken);
  //   });
  // };
  return (
    <div className={styles.login}>
      <Row style={{ height: window.innerHeight }}>
        <Col span={12} className={styles.left}>
        </Col>
        <Col span={12} className={styles.right}>
          <h1>Welcome to Jira, </h1>

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
            autoComplete="on"
            size="large"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input name="email" onChange={formik.handleChange} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="passWord"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password name="passWord" onChange={formik.handleChange} />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setTimeout(() => {
                    navigate("/");
                  }, 2000);
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className={styles.facebookLogin}>
            {/* <p>or</p>
            <FacebookLogin
              appId="783609159586705"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
            />
            */}
          </div>
          <div className={styles.register}>
            <p>Don't you have an account?</p>
            <Link to="/signup">Sign Up </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
