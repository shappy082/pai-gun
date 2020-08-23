import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/th";
import { Input, Button, Row, Col, Card, Typography, Avatar } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { purple } from "@ant-design/colors";
const { Title } = Typography;

class TripDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }
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
            backgroundColor: purple[3],
            marginBottom: 10,
          }}
        >
          <Col flex={5} style={{ margin: 10 }}>
            <Title level={2} style={{ marginTop: 10 }}>
              {this.state.plan_name}
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
      </div>
    );
  }
}

export default TripDetail;
