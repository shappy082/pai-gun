import React from 'react'
import moment from 'moment';
import {
    Row, Col,
    Input,
    Modal,
    Button,
    TimePicker,
    DatePicker
} from 'antd';
import { PlusOutlined } from "@ant-design/icons";

class CreatePlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plan_name: '',
            plan: [],
            visible: false,
            relatedTag: []
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, //() => console.log(this.state.plan_name)
        );
    }

    onChange = (time, timeString) => {
        console.log(time, timeString);
    }

    savePlan = () => {
        console.log(this.state);
    }

    render() {
        return (
            <div style={{ margin: 10 }}>
                <Row gutter={[10, 10]} justify="space-between" align="middle">
                    <Col>
                        <lable>ชื่อ Trip</lable>
                        <Input name="plan_name" placeholder="กรุณาระบุชื่อ" onChange={this.handleInput}></Input>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={this.savePlan} shape="round" size="large"> บันทึก </Button>
                    </Col>
                </Row>
                <Row gutter={[10, 10]}>
                    <Col>
                        <Button type="primary" onClick={this.showModal} shape="round" icon={<PlusOutlined />}> เพิ่ม </Button>
                    </Col>
                </Row>
                <hr></hr>
                <Row gutter={[10, 10]}>
                    <Col>
                        display all plan
                        {
                            this.state.plan.map((eachPlan) => (
                                console.log(eachPlan)
                            ))
                        }
                    </Col>
                </Row>
                <Modal
                    title="เลือกเวลาและสถานที่"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>ใส่วันที่และเวลา</p>
                    <p>ค้นหาสถานที่</p>
                    <p>รายชื่อสถานที่</p>
                </Modal>
            </div>
        )
    }
}
export default CreatePlan;