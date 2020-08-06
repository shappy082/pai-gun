import React from 'react'
import axios from "axios";
import { Button } from 'antd'

class MyPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: []
        }
    }
    componentDidMount() {
        this.getAllPlan()
    }

    getAllPlan = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/planning/user/' + sessionStorage.getItem('user_id'))
            // console.log(response.status)
            // console.log(response.data.data)
            let results = response.data.data
            results.forEach(element => {
                this.setState({
                    plan: [...this.state.plan, element]
                });
            });
        } catch (err) {
            console.error(err)
        }
        console.log("All Plans", this.state.plan)
    }

    render() {
        return (
            <div style={{ margin: 10 }}>
                {
                    this.state.plan.map((eachPlan, index) =>
                        <h1 key={index}>{eachPlan.plan_name}</h1>
                    )
                }

                <Button type="primary">Create Plan</Button>
            </div>
        )
    }
}
export default MyPlan