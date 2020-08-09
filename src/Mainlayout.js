import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import { green } from '@ant-design/colors';

import AppTopBar from './components/AppTopBar'
import MyPlan from './components/MyPlan'
import AddLocation from './components/AddLocation'
import UpdateLocation from './components/UpdateLocation'
import Explore from './components/Explore'

const { Header, Content } = Layout;

class Mainlayout extends React.Component {
    render() {
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: green[3] }} >
                    {/* <Row>
                        <Col> */}
                    < AppTopBar page="แผนของฉัน" />
                    {/* </Col>
                    </Row> */}
                </Header>
                <Content className="site-layout" style={{ marginTop: 67 }}>
                    <Switch>
                        <Route path="/create">create plan</Route>
                        <Route path="/addLocation"><AddLocation /></Route>
                        <Route path="/explore"><Explore /></Route>
                        <Route path="/"><MyPlan /></Route>
                    </Switch>
                </Content>
            </Layout >
        )
    }
}

export default Mainlayout;