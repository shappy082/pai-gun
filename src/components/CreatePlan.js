import React from "react";
import moment from "moment";
import {
  Row,
  Col,
  Input,
  Modal,
  Button,
  TimePicker,
  DatePicker,
  Typography,
  ConfigProvider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import locale from "antd/es/locale/th_TH";
const { Title } = Typography;
const { Search } = Input;

class CreatePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan_name: "",
      plan: [],
      visible: false,
      latestTime: "00:00",
      latestDate: "",
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleInput = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      } //() => console.log(this.state.plan_name)
    );
  };

  onChangeDate = (value, dateString) => {
    console.log("Selected Date: ", value);
    console.log("Formatted Selected Date: ", dateString);
    this.setState(
      {
        latestDate: dateString,
      },
      () => console.log("after time", this.state)
    );
  };

  onChangeTime = (time, timeString) => {
    console.log("Selected Time: ", time);
    console.log("Formatted Selected Time: ", timeString);
    this.setState(
      {
        latestTime: timeString,
      },
      () => console.log("after time", this.state)
    );
  };

  savePlan = () => {
    console.log(this.state);
  };

  searchLocation = (value) => {
    console.log("search with", value);
  };

  render() {
    return (
      <div style={{ margin: 10 }}>
        <Row gutter={[10, 10]} justify="space-between" align="middle">
          <Col>
            <Row align="middle" gutter={10}>
              <Col>
                <Title level={4} style={{ marginTop: 5 }}>
                  ชื่อ Trip
                </Title>
              </Col>
              <Col>
                <Input
                  name="plan_name"
                  placeholder="กรุณาระบุชื่อ"
                  onChange={this.handleInput}
                  size="large"
                ></Input>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={this.savePlan}
              shape="round"
              size="large"
            >
              {" "}
              บันทึก{" "}
            </Button>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col>
            <Button
              type="primary"
              onClick={this.showModal}
              shape="round"
              icon={<PlusOutlined />}
            >
              {" "}
              เพิ่ม{" "}
            </Button>
          </Col>
        </Row>
        <hr></hr>
        <Row gutter={[10, 10]}>
          <Col>
            display all plan
            {this.state.plan.map((eachPlan) => console.log(eachPlan))}
          </Col>
        </Row>
        <Modal
          title="เลือกเวลาและสถานที่"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row gutter={[10, 10]}>
            <Col>
              <ConfigProvider locale={locale}>
                <DatePicker onChange={this.onChangeDate} size="large" />
              </ConfigProvider>
            </Col>
            <Col>
              <ConfigProvider locale={locale}>
                <TimePicker
                  defaultValue={moment(this.state.latestTime, "HH:mm")}
                  onChange={this.onChangeTime}
                  format={"HH:mm"}
                  minuteStep={15}
                  size="large"
                />
              </ConfigProvider>
            </Col>
          </Row>
          <Row>
            <Col>
              <Search
                placeholder="ค้นหาสถานที่"
                enterButton="ค้นหา"
                size="large"
                onSearch={(value) => this.searchLocation(value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>รายชื่อสถานที่</p>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
export default CreatePlan;
