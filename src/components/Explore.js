import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/th";
// import { Button, Card, Row, Col } from "antd";
import { Form, Input, Button, Checkbox, Row, Col, Card } from "antd";
import { UserOutlined, LockOutlined, SearchOutlined } from "@ant-design/icons";
import HeaderSearch from "ant-design-pro/lib/HeaderSearch";
import Column from "antd/lib/table/Column";

const { Meta } = Card;

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: [],
      tags: "",
    };
  }

  // componentDidMount() {
  //     this.getAllPlan();
  // }

  onFinish = async (values) => {
    try {
      this.setState({ plan: [] });
      console.log(values.tags);
      var array_tags = values.tags.split(",");
      console.log(array_tags);
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/planning/location/",
        {
          tags: array_tags,
        }
      );
      // console.log(response.status)
      console.log(response.data.data);
      let results = response.data.data;
      results.forEach((element) => {
        this.setState({
          plan: [...this.state.plan, element],
        });
      });
    } catch (err) {
      console.error(err);
    }
    console.log("All Plans", this.state.plan);
  };

  render() {
    return (
      <div style={{ margin: 10 }}>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "10vh" }}
        >
          <Col align="middle">
            <Form
              name="normal_explore"
              className="explore-form"
              style={{ width: 400 }}
              initialValues={{
                remember: false,
              }}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="tags"
                rules={[
                  {
                    message: "Please input your Tag!",
                  },
                ]}
              >
                <Input
                  prefix={<SearchOutlined className="site-form-item-icon" />}
                  placeholder="ค้นหา"
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                {" "}
                ค้นหา{" "}
              </Button>
            </Form>
          </Col>
        </Row>
        <Row gutter={10}>
          {this.state.plan.map((eachPlan) => (
            <Col span={12}>
              <Card
                title={eachPlan.plan_name}
                extra={moment(eachPlan.create_date).format("LL")}
                key={eachPlan.trip_id}
                hoverable
                style={{
                  marginBottom: 10,
                  // border: "1px solid black",
                }}
              >
                <Meta
                  description={eachPlan.plan.map((eachSubplan, index) => (
                    <Row key={index}>
                      <Col flex={1}>
                        {moment(eachSubplan.date).format("LT")}
                      </Col>
                      <Col flex={11}>{eachSubplan.location_name}</Col>
                    </Row>
                    // <div key={index}>{eachSubplan.location_name}</div>
                  ))}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Link to="/create">
          <Button type="primary">Create Plan</Button>
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/addLocation">
          <Button type="primary">Add Location</Button>
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/explore">
          <Button type="primary">Explore Trip</Button>
        </Link>
      </div>
    );
  }
}

export default Explore;
