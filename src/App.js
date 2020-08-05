import React from 'react';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import LoginPage from './LoginPage'
import PrivateRoute from './PrivateRoute'
import MainLayout from './Mainlayout'

const hist = createBrowserHistory()

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/" render={props => <MainLayout {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
