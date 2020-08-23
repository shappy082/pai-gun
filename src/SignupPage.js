import React from "react";
import { Row, Input, Col, Form, Button } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import { HomeOutlined } from "@ant-design/icons";

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
      console.log(result);
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
          <img src="logo3.png" alt="logo" style={{ margin: 10 }} />
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
              label="username"
              rules={[
                {
                  required: true,
                  message: "Please input USERNAME ",
                },
              ]}
            >
              <Input
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="password"
              rules={[
                {
                  required: true,
                  message: "Please input password!",
                },
              ]}
            >
              <Input
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="password"
              />
            </Form.Item>
            <Form.Item
              name="name"
              label="name"
              rules={[
                {
                  required: true,
                  message: "Please input name!",
                },
              ]}
            >
              <Input
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="name,name,name"
              />
            </Form.Item>
            <Form.Item name="submit">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default SignupPage;
