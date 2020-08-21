import React from "react";
import { Row, Input, Col, Form, Button } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { EnvironmentOutlined, GlobalOutlined, TagsOutlined } from "@ant-design/icons";

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = async (values) => {
    console.log("value", values)
    console.log("Bearer " + sessionStorage.getItem('token'))
    try {
      const result = await axios.post(
        process.env.REACT_APP_API_URL + "/location/insert/",
        {
          tag: values.tag.split(","),
          location: values.location.split(" "),
          location_name: values.location_name,
        },
        {
          Authorization: "Bearer " + sessionStorage.getItem('token'),
        }
      );
      console.log(result)
      // if (result.data.success) {
      //   console.log("form will reset here");
      //   // addLocation.resetFields();
      // }
    } catch (err) {
      alert("Error:", err);
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
                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
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
                prefix={<GlobalOutlined className="site-form-item-icon" />}
                placeholder="latitude longitude"
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
                placeholder="ex. tag,tag,tag"
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
