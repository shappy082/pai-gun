import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/th";
import { Button, Card, Row, Col, Avatar, Typography } from "antd";
import {
  SearchOutlined,
  PlusSquareOutlined,
  GlobalOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { green } from "@ant-design/colors";
const { Title } = Typography;
const { Meta } = Card;

class MyPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: [],
      admin: sessionStorage.getItem("role"),
      isLoggedIn: true,
      seeDetail: "",
    };
  }

  componentDidMount() {
    sessionStorage.setItem("trip_id", "");
    this.getAllPlan();
  }

  getAllPlan = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
        "/planning/user/" +
        sessionStorage.getItem("user_id")
      );
      // console.log(response.status)
      // console.log(response.data.data)
      let results = response.data.data;
      results.forEach((element) => {
        if (element.status !== false) {
          this.setState({
            plan: [...this.state.plan, element],
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
    console.log("All Plans", this.state.plan);
  };

  seeDetail = (trip_id) => {
    // console.log("see detail", trip_id);
    sessionStorage.setItem("trip_id", trip_id);
    this.setState({
      seeDetail: trip_id,
    });
  };

  render() {
    if (this.state.isLoggedIn === false) {
      sessionStorage.clear();
      return <Redirect to="/login" />;
    }
    if (this.state.seeDetail !== "") {
      return <Redirect to="/detail" />;
    }
    return (
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{
            backgroundColor: green[3],
            marginBottom: 10,
            borderBottom: '1px solid black'
          }}
        >
          <Col flex={2} style={{ margin: 10 }}>
            <Title level={2} style={{ marginTop: 10 }}>
              แผนของฉัน
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
        <Row gutter={10} justify="space-between" style={{ margin: 10 }}>
          <Col flex={1}>
            <Link to="/create">
              <Button
                type="primary"
                style={{ width: "100%" }}
                size="large"
                icon={<PlusSquareOutlined />}
              >
                สร้างแผนใหม่
              </Button>
            </Link>
          </Col>
          <Col flex={1} hidden={!this.state.admin}>
            <Link to="/addLocation">
              <Button
                type="primary"
                style={{ width: "100%" }}
                size="large"
                icon={<GlobalOutlined />}
              >
                เพิ่มสถานที่ใหม่
              </Button>
            </Link>
          </Col>
          <Col flex={1}>
            <Link to="/explore">
              <Button
                type="primary"
                style={{ width: "100%" }}
                size="large"
                icon={<SearchOutlined />}
              >
                สำรวจแผนการท่องเที่ยว
              </Button>
            </Link>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          align="top"
          style={{ marginBottom: 10 }}
        >
          <Col style={{ width: '50%' }} hidden={this.state.plan.length > 0}>
            <div align="middle">
              <Title level={4} style={{ marginTop: 10 }}>
                คุณยังไม่มีแผนการเดินทาง โปรดสร้างหรือสำรวจ
            </Title>
            </div>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          align="top"
          style={{ marginBottom: 10 }}
        >
          <Col style={{ width: "60%" }}>
            {
              this.state.plan.map((eachPlan) => (

                <Card
                  title={eachPlan.plan_name}
                  extra={moment(eachPlan.create_date).format("LL")}
                  key={eachPlan.trip_id}
                  hoverable
                  style={{
                    margin: 10,
                    border: "1px solid black",
                  }}
                  onClick={() => this.seeDetail(eachPlan.trip_id)}
                >
                  <Meta
                    description={eachPlan.plan
                      .slice(0, 3)
                      .map((eachSubplan, index) => (
                        <Row key={index}>
                          <Col flex={1}>
                            {moment(eachSubplan.date).utc().format("LT")}
                          </Col>
                          <Col flex={11}>{eachSubplan.location_name}</Col>
                        </Row>
                      ))}
                  />
                </Card>

              ))
            }
          </Col>
        </Row>
      </div>
    );
  }
}
export default MyPlan;
