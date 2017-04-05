import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import RentPage from './routes/RentPage';
import UserPage from './routes/UserPage';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/rent" component={RentPage} />
      <Route path="/user" component={UserPage} />
    </Router>
  );
}

export default RouterConfig;
