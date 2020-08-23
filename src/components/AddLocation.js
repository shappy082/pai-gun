import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Row, Input, Col, Form, Button, Typography, Avatar } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import {
  EnvironmentOutlined,
  TagsOutlined,
  GlobalOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { blue } from "@ant-design/colors";

const { Title } = Typography;

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }

  onFinish = async (values) => {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    try {
      const result = await axios.post(
        process.env.REACT_APP_API_URL + "/location/insert",
        {
          tag: values.tag.split(" "),
          location: values.location.split(" "),
          location_name: values.location_name,
        },
        {
          headers: headers,
        }
      );
      if (result.data.success) {
        alert("Location added");
        return;
      }
    } catch (err) {
      alert("Insert failed:", err);
    }
  };
  render() {
    if (this.state.isLoggedIn === false) {
      sessionStorage.clear();
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{
            backgroundColor: blue[3],
            marginBottom: 10,
          }}
        >
          <Col flex={2} style={{ margin: 10 }}>
            <Title level={2} style={{ marginTop: 10 }}>
              เพิ่มสถานที่
            </Title>
          </Col>
          <Col flex={5} align="right" style={{ margin: 10 }}>
            <Link to="/">
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ marginRight: 10, border: "1px solid black" }}
              />
            </Link>
            <Button
              type="primary"
              danger
              onClick={() => this.setState({ isLoggedIn: false })}
            >
              Signout
            </Button>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          align="top"
          style={{ minHeight: "100vh" }}
        >
          <Col>
            <Form
              name="addLocation"
              className="addLocation-form"
              initialValues={{
                remember: false,
              }}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="location_name"
                label="location_name"
                rules={[
                  {
                    required: true,
                    message: "Please input location_name!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <EnvironmentOutlined className="site-form-item-icon" />
                  }
                  placeholder="Location name"
                />
              </Form.Item>
              <Form.Item
                name="location"
                label="location"
                rules={[
                  {
                    required: true,
                    message: "Please input location!",
                  },
                ]}
              >
                <Input
                  prefix={<GlobalOutlined className="site-form-item-icon" />}
                  placeholder="Latitude Longitude"
                />
              </Form.Item>
              <Form.Item
                name="tag"
                label="tag"
                rules={[
                  {
                    required: true,
                    message: "Please input tag!",
                  },
                ]}
              >
                <Input
                  prefix={<TagsOutlined className="site-form-item-icon" />}
                  placeholder="Ex. tag1 tag2 tag3"
                />
              </Form.Item>
              <Form.Item name="submit">
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddLocation;
