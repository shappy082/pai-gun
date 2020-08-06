import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'moment'
import { Button, Card, Row, Col } from "antd";
const { Meta } = Card;

class MyPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: [],
    };
  }
  componentDidMount() {
    this.getAllPlan();
  }

  getAllPlan = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/planning/user/" +
          sessionStorage.getItem("user_id")
      );
      // console.log(response.status)
      // console.log(response.data.data)
      let results = response.data.data;
      results.forEach((element) => {
        this.setState({
          plan: [...this.state.plan, element],
        });
      });
    } catch (err) {
      console.error(err);
    }
    console.log("All Plans", this.state.plan);
  };

  render() {
    return (
      <div style={{ margin: 10 }}>
        {this.state.plan.map((eachPlan) => (
          <Card
            title={eachPlan.plan_name}
            extra={moment(eachPlan.create_date).format('LL')}
            key={eachPlan.trip_id}
            hoverable
            style={{
              marginBottom: 10,
              border: "1px solid black",
            }}
          >
            <Meta
              description={eachPlan.plan.map((eachSubplan, index) => (
                <Row guttter={5} key={index}>
                  <Col span={12}>{moment(eachSubplan.date).format('LT')}</Col>
                  <Col span={12}>{eachSubplan.location_name}</Col>
                </Row>
                // <div key={index}>{eachSubplan.location_name}</div>
              ))}
            />
          </Card>
        ))}
        <Link to="/create">
          <Button type="primary">Create Plan</Button>
        </Link>
      </div>
    );
  }
}
export default MyPlan;
