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
            <Row justify="space-between" align="middle">
                <Col style={{ marginTop: 10 }}>
                    <Title level={2}>{this.state.page}</Title>
                </Col>
                <Col>
                    <Link to="/"><Avatar size="large" icon={<UserOutlined />} style={{ marginRight: 10, border: '1px solid black' }} /></Link>
                    <Button type="primary" danger onClick={() => this.setState({ isLoggedIn: false })}>Signout</Button>
                </Col>
            </Row>
        )
    }
}

export default AppTopBar