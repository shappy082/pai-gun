import React from 'react'
import { Button } from 'antd'

class MyPlan extends React.Component {
    render() {
        return (
            <div style={{ margin: 10 }}>
                <h1>My Plan Page</h1>
                <Button type="primary">Create Plan</Button>
            </div>
        )
    }
}
export default MyPlan