class Mainlayout extends React.Component {
    render() {
        return (
            <Router>
                <FakebookTopBar></FakebookTopBar>
                <div style={{ margin: 10 }}>
                    <Switch>
                        <Route path="/home"><HomeFeed /></Route>
                        <Route path="/profile"><Profile /></Route>
                        <Route path="/"><LoginPage /></Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Mainlayout;