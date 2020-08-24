import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import * as serviceWorker from './serviceWorker';
import App from './App'
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';

// import { Provider } from 'react-redux';
// import store from './store/configureStore';

ReactDOM.render(
  <HashRouter>
    <ScrollToTop>
      {/* <Provider store={store}> */}
      <App />
      {/* </Provider> */}
    </ScrollToTop>
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
