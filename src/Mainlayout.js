import React from 'react'
import { Row } from 'antd';
import AppTopBar from './components/AppTopBar'

class Mainlayout extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <AppTopBar page="Main Page" />
                </Row>
                <div>
                    This is Main Page.
            </div>
            </div>
        )
    }
}

export default Mainlayout;