import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'moment'
import 'moment/locale/th';
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
                            description={eachPlan.plan.slice(0, 3).map((eachSubplan, index) => (
                                <Row key={index}>
                                    <Col flex={1}>{moment(eachSubplan.date).format('LT')}</Col>
                                    <Col flex={11}>{eachSubplan.location_name}</Col>
                                </Row>
                            ))}
                        />
                    </Card>
                ))}
                <Link to="/create">
                    <Button type="primary">Create Plan</Button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/addLocation">
                    <Button type="primary">Add Location</Button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/explore">
                    <Button type="primary">Explore Trip</Button>
                </Link>
            </div>
        );
    }
}
export default MyPlan;
