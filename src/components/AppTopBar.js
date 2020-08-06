import React from 'react'
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

class AppTopBar extends React.Component {
    constructor(props){
        super(props)
        this.state={
            page: props.page
        }
    }
    render() {
        return (
            <Row>
                <Col>
                    {this.state.page}
                </Col>
            </Row>
        )
    }
}

export default AppTopBar