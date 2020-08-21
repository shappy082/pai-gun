import React from "react";
import { Row, Input, Col, Form, Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { HomeOutlined } from "@ant-design/icons";

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = async (values) => {
    var tagArray = values.tag.split(",");
    try {
      const result = await axios.post(
        process.env.REACT_APP_API_URL + "/location/insert/",
        {
          tag: tagArray,
          location: values.location,
          location_name: values.location_name,
        },
        {
          Authorization: "Bearer" + sessionStorage.getItem("token"),
        }
      );
      if (result.data.success) {
        console.log("form will reset here");
        // addLocation.resetFields();
      }
    } catch (err) {
      alert("data wrong.");
    }
  };
  render() {
    return (
      <Row>
        <Col>
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
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="location_name"
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
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="location"
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
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="tag,tag,tag"
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

export default AddLocation;
