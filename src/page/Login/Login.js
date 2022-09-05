/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
// import { FacebookOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import styles from "./login.module.scss";
import { dangNhapAction } from "../../redux/actions/types/QuanLyNguoiDungAction";
import { USER_LOGIN } from "../../util/config";

export default function Login() {
  const dispatch = useDispatch();
  const {userLogin} = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin", userLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem(USER_LOGIN)){
      navigate('/')
    }
  },[])
 
  const formik = useFormik({
    initialValues: {
      email: '',
      passWord: '',
    },
    onSubmit: values => {
      const action = dangNhapAction(values);
      dispatch(action);
      console.log("values", values);
      message.success(
        {
          content: "Đăng nhập thành công",
          className: "message",
          style: {
            marginTop: "10vh",
            fontSize: "20px",
          },
        },
        setTimeout(() => {
         navigate("/")
        }, 1000)
      );
    }

  })
  return (
    <div className={styles.login}>
      {/* <div className={styles.container}> */}

      <Row style={{ height: window.innerHeight }}>
        <Col span={12} className={styles.left}>
          {/* <h1>Welcome to </h1> */}
        </Col>
        <Col span={12} className={styles.right}>
          <h1>Welcome to Jira, </h1>
          {/* <hr/> */}
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
              <Input name="email" onChange={formik.handleChange}/>
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
              <Input.Password name="passWord" onChange={formik.handleChange}/>
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
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className={styles.facebookLogin}>
            {/* <p>or</p>
            <Button>
              
              <FacebookOutlined />
              Login with Facebook
            </Button> */}
          </div>
          <div className={styles.register}>
            <p>Don't you have an account?</p>
            <Link to ="/register">Register</Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
