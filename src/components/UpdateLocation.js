import React from 'react'
import { Row, Input, Col, Form, Button, Table } from "antd";
import axios from "axios";


import "antd/dist/antd.css";
import { HomeOutlined } from "@ant-design/icons";
const { Search } = Input;

const columns = [
    {
        title: 'location_name',
        dataIndex: 'location_name',
        key: 'location_name',
    },
    {
        title: 'location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'tag',
        dataIndex: 'tag',
        key: 'tag',
    },
];
class UpdateLocation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource : []

        }
    }
    onFinish = async (values) => {
        console.log("from search", values);
        //var tagArray = values.tag;
        //var ar = tagArray.split(',');
        //console.log(ar);
        try {
            const result = await axios.post(
                process.env.REACT_APP_API_URL + "/location/location_name/",
                {
                    //tag: ar,
                    //location: values.location,
                    location_name: values,
                }
            );
            console.log(result.data);
            this.setState({dataSource:result.data.data})
        } catch (err) {
            alert("data wrong.");
        }
    };

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <Form
                            name="addLocation"
                            className="addLocation-form"
                            style={{ width: 300 }}
                            initialValues={{
                                remember: false,
                            }}//location_name
                            onFinish={this.onFinish}
                        >
                            <Search
                                placeholder="input search text"
                                enterButton="Search"
                                size="large"
                                onSearch={this.onFinish}
                            />
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
                            <Form.Item name={['submit']}>
                                <Button type="primary" htmlType="submit">
                                    Edit
                        </Button>
                            </Form.Item></Form></Col>
                </Row>
                <Row>
                    <Col><Table dataSource={this.state.dataSource} columns={columns} />;
                </Col>
                </Row>
            </>
        )
    }
}

export default UpdateLocation