import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/th";
import { Button, Row, Col, Typography, Avatar, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { purple } from "@ant-design/colors";
const { Title } = Typography;

class TripDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan_name: "",
      create_date: "",
      plan: [],
      isLoggedIn: true,
    };
  }

  componentDidMount() {
    this.searchTrip();
  }

  searchTrip = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/planning/trip/" +
          sessionStorage.getItem("trip_id")
      );
      let results = response.data.data;
      if (results.status !== false) {
        this.setState({
          plan_name: results.plan_name,
          create_date: results.create_date,
          plan: results.plan,
        });
      }
    } catch (err) {
      console.error(err);
    }
    console.log("All Plans", this.state.plan);
  };

  render() {
    if (this.state.isLoggedIn === false) {
      sessionStorage.clear();
      return <Redirect to="/login" />;
    }
    const columns = [
      {
        title: () => (
          <div align="middle">
            <strong>วันที่</strong>
          </div>
        ),
        dataIndex: "date",
        key: "date",
        render: (date) => <div align="middle">{moment(date).format("LL")}</div>,
      },
      {
        title: () => (
          <div align="middle">
            <strong>เวลา</strong>
          </div>
        ),
        dataIndex: "date",
        key: "date",
        render: (date) => (
          <div align="middle">{moment(date).utc().format("LT")}</div>
        ),
      },
      {
        title: () => (
          <div align="middle">
            <strong>สถานที่</strong>
          </div>
        ),
        dataIndex: "location_name",
        key: "location_name",
        render: (location_name) => <div align="middle">{location_name}</div>,
      },
    ];
    return (
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{
            backgroundColor: purple[3],
            marginBottom: 10,
          }}
        >
          <Col flex={2} style={{ margin: 10 }}>
            <Title level={2} style={{ marginTop: 10 }}>
              {this.state.plan_name}
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
          style={{ marginBottom: 10 }}
        >
          <Col style={{ width: "50%" }}>
            <Table
              bordered
              rowKey={this.state.plan._id}
              columns={columns}
              dataSource={this.state.plan}
              pagination={false}
              size="large"
            />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          align="top"
          style={{ marginBottom: 10 }}
        >
          <Col>
            <iframe
              key="embeded"
              title="google_map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2740.2059638314745!2d100.53794170644429!3d13.764610376484198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29eb0f28f5e81%3A0xd4594d75ebaee10d!2sVictory%20Monument!5e0!3m2!1sen!2sth!4v1598194806408!5m2!1sen!2sth"
              width="600"
              height="450"
              frameborder="0"
              style={{ border: 0 }}
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TripDetail;
