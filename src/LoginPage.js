import React from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./index.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      user_id: "",
      token: "",
      isLoggedIn: false,
    };
  }
  onFinish = async (values) => {
    try {
      const result = await axios.post(
        process.env.REACT_APP_API_URL + "/user/signin/",
        {
          password: values.password,
          username: values.username,
        }
      );
      console.log(result);
      if (result.status === 200 && result.data.message === "ok") {
        this.setState({
          isLoggedIn: true,
          user_id: result.data.user_id,
          token: result.data.token,
        });
      }
    } catch (err) {
      alert("Invalid username or password.");
    }
  };
  render() {
    if (this.state.isLoggedIn) {
      sessionStorage.setItem("token", this.state.token);
      sessionStorage.setItem("user_id", this.state.user_id);
      return <Redirect to="/" />;
    }

    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col>
          <img src="logo3.png" alt="logo" style={{ margin: 10 }} />
          <Form
            name="normal_login"
            className="login-form"
            style={{ width: 300 }}
            initialValues={{
              remember: false,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              {/* <a href="" className="login-form-forgot">
              Forgot password
            </a> */}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            OR
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/">Register Now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default LoginPage;
