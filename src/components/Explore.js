import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/th";
import { Input, Button, Row, Col, Card, Typography, Avatar } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { magenta } from "@ant-design/colors";
const { Title } = Typography;

const { Meta } = Card;

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      plan: [],
      tags: "",
      isLoggedIn: true,
    };
  }

  searchTrip = async () => {
    if (!this.state.searchInput) {
      alert("โปรดระบุคำค้นหา");
    } else {
      try {
        this.setState({ plan: [] });
        var array_tags = this.state.searchInput.split(" ");
        console.log(array_tags);
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/planning/location/",
          {
            tags: array_tags,
          }
        );
        if (response.data.data.length !== 0) {
          let results = response.data.data;
          results.forEach((element) => {
            this.setState({
              plan: [...this.state.plan, element],
            });
          });
        } else {
          this.setState({
            searchInput: "",
          });
          alert("ไม่พบแผนการท่องเที่ยว โปรดค้นหาอีกครั้ง");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  handleInput = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      } //() => console.log(this.state.plan_name)
    );
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
            backgroundColor: magenta[3],
            marginBottom: 10,
          }}
        >
          <Col flex={5} style={{ margin: 10 }}>
            <Title level={2} style={{ marginTop: 10 }}>
              สำรวจ
            </Title>
          </Col>
          <Col span={19} align="right" style={{ margin: 10 }}>
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

        <div style={{ margin: 10 }}>
          <Row
            type="flex"
            justify="center"
            align="top"
            style={{ marginBottom: 10 }}
          >
            <Col align="middle">
              <Row>
                <Col>
                  <Input
                    name="searchInput"
                    placeholder="ค้นหาด้วยชื่อ หรือ tags"
                    value={this.state.searchInput}
                    onChange={this.handleInput}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        this.searchTrip();
                      }
                    }}
                    style={{ width: "300px" }}
                    size="large"
                  />
                </Col>
                <Col>
                  <Button type="primary" size="large" onClick={this.searchTrip}>
                    <SearchOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {this.state.plan.map((eachPlan) => (
            <Card
              title={eachPlan.plan_name}
              extra={moment(eachPlan.create_date).format("LL")}
              key={eachPlan.trip_id}
              hoverable
              style={{
                marginBottom: 10,
                border: "1px solid black",
              }}
            >
              <Meta
                description={eachPlan.plan
                  .slice(0, 3)
                  .map((eachSubplan, index) => (
                    <Row key={index}>
                      <Col flex={1}>
                        {moment(eachSubplan.date).utc().format("HH:MM")}
                      </Col>
                      <Col flex={11}>{eachSubplan.location_name}</Col>
                    </Row>
                  ))}
              />
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default Explore;
