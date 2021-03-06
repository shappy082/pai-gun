import React from "react";
import moment from "moment";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
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
  Table,
  Tag,
  Avatar,
} from "antd";
import { PlusOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
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
      dataTable: [],
      done: false,
      isLoggedIn: true,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleInput = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      }//, () => console.log(this.state.plan)
    );
  };

  onChangeDate = (value, dateString) => {
    // console.log("Selected Date: ", value);
    // console.log("Formatted Selected Date: ", dateString);
    this.setState(
      {
        latestDate: dateString,
      },
      // () => console.log("after time", this.state)
    );
  };

  onChangeTime = (time, timeString) => {
    // console.log("Selected Time: ", time);
    // console.log("Formatted Selected Time: ", timeString);
    this.setState(
      {
        latestTime: timeString,
      },
      // () => console.log("after time", this.state)
    );
  };

  savePlan = async () => {
    // console.log(this.state);
    if (this.state.plan_name === "") {
      alert("โปรดใส่ชื่อแผนการท่องเที่ยว");
    } else if (this.state.plan.length < 3) {
      alert("โปรดเพิ่มแผนการท่องเที่ยวมากกว่านี้");
    } else {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/planning/insert",
          {
            user_id: sessionStorage.getItem("user_id"),
            plan_name: this.state.plan_name,
            plan: this.state.plan,
          }
        );
        // console.log(response.statusText);
        if (response.statusText === "Created") {
          alert("Complete");
          this.setState({
            done: true,
          });
        }
      } catch (err) {
        alert("Error! Please try again!");
      }
    }
  };

  searchLocation = async (value) => {
    // console.log("search input", value.split(" "));
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/location/tag",
        {
          tag: value.split(" "),
        }
      );
      let results = response.data.data;
      // console.log(results);
      this.setState({
        dataTable: results,
      });
    } catch (err) {
      alert("Error! Please try again!");
    }
    // console.log("All Plans", this.state.plan);
  };

  selectLocation = (record) => {
    if (this.state.latestDate === "") {
      alert("โปรดระบุวันที่")
    } else {
      this.setState(
        (prevState) => ({
          plan: [
            ...prevState.plan,
            {
              location_id: record.location_id,
              location_name: record.location_name,
              date:
                this.state.latestDate + "T" + this.state.latestTime + ":00.000Z",
            },
          ],
          dataTable: [],
          visible: false,
        }),
        // () => console.log(this.state.plan)
      );
    }
  };

  onDelete = (record) => {
    let filteredArray = this.state.plan.filter(item => item.location_id !== record.location_id)
    this.setState({ plan: filteredArray });
  };

  render() {
    if (this.state.isLoggedIn === false) {
      sessionStorage.clear();
      return <Redirect to="/login" />;
    }
    if (this.state.done) {
      return <Redirect to="/" />;
    }
    const columns = [
      {
        title: "ชื่อ",
        dataIndex: "location_name",
        key: "location_name",
        render: (text) => <div>{text}</div>,
      },
      {
        title: "ตำแหน่ง",
        dataIndex: "location",
        key: "location",
        render: (location) => (
          <>
            {location.map((text) => {
              return <Tag key={text}>{text}</Tag>;
            })}
          </>
        ),
      },
      {
        title: "Tags",
        dataIndex: "tag",
        key: "_id",
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = "magenta";
              if (tag === "วัด") {
                color = "orange";
              }
              if (tag === "โรงแรม") {
                color = "geekblue";
              }
              if (tag.includes("อาหาร")) {
                color = "purple";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
    ];
    const columns_display = [
      {
        title: () => (
          <div align="middle" >
            <strong>วันที่</strong>
          </div>
        ),
        dataIndex: "date",
        key: "date",
        render: (date) => <div align="middle">{moment(date).format("LL")}</div>,
        width: 250
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
        width: 100
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
        width: 350
      },
      {
        title: () => (
          <div align="middle">
            <strong>Action</strong>
          </div>
        ),
        dataIndex: "",
        key: "x",
        render: (record) => (
          <div align="middle">
            <Button type="danger" icon={<DeleteOutlined />} onClick={() => this.onDelete(record)}></Button>
          </div>
        ),
        width: 50
      },
    ];
    return (
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{
            backgroundColor: blue[3],
            marginBottom: 10,
            borderBottom: '1px solid black'
          }}
        >
          <Col flex={2} style={{ margin: 10 }}>
            <Title level={2} style={{ marginTop: 10 }}>
              สร้างแผนใหม่
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
        <div style={{ margin: 10 }}>
          <Row gutter={[10, 10]} justify="space-between" align="middle">
            <Col>
              <Row align="middle" gutter={10}>
                <Col>
                  <Title level={4} style={{ marginTop: 5 }}>
                    ชื่อแผนการท่องเที่ยว
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
                บันทึก
              </Button>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col>
              <Button
                type="primary"
                onClick={this.showModal}
                shape="round"
                size="large"
                icon={<PlusOutlined />}
              >
                เพิ่ม
              </Button>
            </Col>
          </Row>
          <hr></hr>
          <Row
            type="flex"
            justify="center"
            align="top"
            style={{ marginBottom: 10 }}
          >
            <Col style={{ width: '50%' }} hidden={this.state.plan.length !== 0}>
              <div align="middle">
                <Title level={4} style={{ marginTop: 10 }}>
                  โปรดตั้งชื่อแผนการท่องเที่ยวและกดปุ่ม "เพิ่ม"
                </Title>
                <Title level={4} style={{ marginTop: 10 }}>
                  เมื่อเสร็จสิ้นกดปุ่ม "บันทึก"
                </Title>
              </div>
            </Col>
            <Col style={{ width: "500px" }} hidden={this.state.plan.length === 0}>
              <Table
                bordered
                rowKey={this.state.plan._id}
                columns={columns_display}
                dataSource={this.state.plan}
                pagination={false}
                size="large"
              />
            </Col>
          </Row>
          <Modal
            title="เลือกเวลาและสถานที่"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Row gutter={[10, 10]}>
              <Col flex={2}>
                <ConfigProvider locale={locale}>
                  <DatePicker onChange={this.onChangeDate} size="large" style={{ width: '100%' }} />
                </ConfigProvider>
              </Col>
              <Col flex={1}>
                <ConfigProvider locale={locale}>
                  <TimePicker
                    defaultValue={moment(this.state.latestTime, "HH:mm")}
                    onChange={this.onChangeTime}
                    format={"HH:mm"}
                    minuteStep={15}
                    size="large"
                    style={{ width: '100%' }}
                  />
                </ConfigProvider>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col style={{ width: '100%' }}>
                <Search
                  placeholder="ค้นหาสถานที่"
                  enterButton="ค้นหา"
                  size="large"
                  onSearch={(value) => this.searchLocation(value)}
                />
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Table
                  bordered
                  rowKey="uid"
                  columns={columns}
                  dataSource={this.state.dataTable}
                  pagination={{ pageSize: 5 }}
                  onRow={(record) => {
                    return {
                      onClick: () => {
                        this.selectLocation(record);
                      },
                    };
                  }}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      </div>
    );
  }
}
export default CreatePlan;
