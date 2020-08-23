import React from "react";
import { Route, Switch } from "react-router-dom";

// import AppTopBar from "./components/AppTopBar";
import MyPlan from "./components/MyPlan";
import CreatePlan from "./components/CreatePlan";
import AddLocation from "./components/AddLocation";
import Explore from "./components/Explore";
import TripDetail from './components/TripDetail'

class Mainlayout extends React.Component {
  render() {
    return (
      //   <Layout>
      //     <Header
      //       style={{
      //         position: "fixed",
      //         zIndex: 1,
      //         width: "100%",
      //         backgroundColor: green[3],
      //       }}
      //     >
      //       <Row justify="space-between" align="middle">
      //         <Col flex={5} style={{ marginTop: 10 }}>
      //           <Title level={2}>{sessionStorage.getItem("page")}</Title>
      //         </Col>
      //         <Col span={19} align="right">
      //           <Link to="/">
      //             <Avatar
      //               size="large"
      //               icon={<UserOutlined />}
      //               style={{ marginRight: 10, border: "1px solid black" }}
      //             />
      //           </Link>
      //           <Button
      //             type="primary"
      //             danger
      //             onClick={() => this.setState({ isLoggedIn: false })}
      //           >
      //             Signout
      //           </Button>
      //         </Col>
      //       </Row>
      //     </Header>
      //     <Content className="site-layout" style={{ marginTop: 67 }}>
      <Switch>
        <Route path="/detail">
          <TripDetail />
        </Route>
        <Route path="/create">
          <CreatePlan />
        </Route>
        <Route path="/addLocation">
          <AddLocation />
        </Route>
        <Route path="/explore">
          <Explore />
        </Route>
        <Route path="/">
          <MyPlan />
        </Route>
      </Switch>
      //     </Content>
      //   </Layout>
    );
  }
}

export default Mainlayout;
