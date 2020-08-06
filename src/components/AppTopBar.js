import React from 'react'
import { Redirect, Link } from "react-router-dom";
import {
    Row,
    Col,
    Button,
    Typography,
    Avatar
} from 'antd';
import 'antd/dist/antd.css';
import { green } from '@ant-design/colors';
import { UserOutlined } from '@ant-design/icons';
const { Title } = Typography;

class AppTopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: props.page,
            isLoggedIn: true
        }
    }

    render() {
        if (this.state.isLoggedIn === false) {
            sessionStorage.clear()
            return <Redirect to="/login" />;
        }
        return (
            <Row justify="space-between" align="middle" style={{ backgroundColor: green[3] }}>
                <Col style={{ marginLeft: 10, marginTop: 10 }}>
                    <Title level={2}>{this.state.page}</Title>
                </Col>
                <Col style={{ margin: 10 }}>
                    <Link to="/"><Avatar icon={<UserOutlined />} style={{ marginRight: 10 }} /></Link>
                    <Button type="primary" danger onClick={() => this.setState({ isLoggedIn: false })}>Signout</Button>
                </Col>
            </Row>
        )
    }
}

export default AppTopBar