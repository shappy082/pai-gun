import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Row, Col } from 'antd';
import AppTopBar from './components/AppTopBar'
import MyPlan from './components/MyPlan'

class Mainlayout extends React.Component {
    render() {
        return (
            <>
                <Row>
                    <Col span={24}>
                        <AppTopBar page="แผนของฉัน" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Switch>
                            <Route path="/create">create plan</Route>
                            <Route path="/"><MyPlan /></Route>
                        </Switch>
                    </Col>
                </Row>
            </>
        )
    }
}

export default Mainlayout;