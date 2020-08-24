import React from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./index.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Row, Col, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      user_id: "",
      role: "",
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
          role: result.data.role,
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
      if (this.state.role === "admin") {
        sessionStorage.setItem("role", this.state.role);
      }
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
          <Card hoverable>
            <img src="logo3.png" alt="logo" style={{ margin: 10 }} />
            <Form
              name="normal_login"
              className="login-form"
              style={{ width: 300 }}
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; OR &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/signup">Register Now!</Link>
              </Form.Item>
            </Form>

          </Card>

        </Col>
      </Row>
    );
  }
}

export default LoginPage;
