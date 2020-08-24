import React from "react";
import { Row, Input, Col, Form, Button, Card } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import { SmileOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
    };
  }
  onFinish = async (values) => {
    //var tagArray = values.tag.split(",");
    try {
      const result = await axios.post(
        process.env.REACT_APP_API_URL + "/user/signup",
        {
          // tag: tagArray,
          username: values.username,
          password: values.password,
          name: values.name,
        }
      );
      if (result.data.success) {
        alert("ลงทะเบียนสำเร็จ")
        this.setState({
          done: true
        })
      }
    } catch (err) {
      alert("data wrong.");
    }
  };
  render() {
    if (this.state.done) {
      return <Redirect to="/login" />;
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
            <h1 align="middle" style={{ marginBottom: 50 }}>ลงทะเบียน Pai-เที่ยว-Gun</h1>
            <Form
              name="addLocation"
              className="addLocation-form"
              style={{ width: 300 }}
              initialValues={{
                remember: false,
              }}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input USERNAME ",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="password"
                />
              </Form.Item>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input name!",
                  },
                ]}
              >
                <Input
                  prefix={<SmileOutlined className="site-form-item-icon" />}
                  placeholder="name"
                />
              </Form.Item>
              <Form.Item name="submit">
                <Button type="primary" htmlType="submit">
                  Submit
              </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SignupPage;
