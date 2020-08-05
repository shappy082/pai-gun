import React from 'react'
import { Route } from 'react-router-dom'

class Mainlayout extends React.Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={this} />
            </div>
        )
    }
}

export default Mainlayout;