import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import RentPage from './routes/RentPage';
import UserPage from './routes/UserPage';
import AuthorityPage from './routes/AuthorityPage';
import QRScanPage from './routes/QRScanPage';
import OpenInRenting from './routes/OpenInRentingPage';
import RepayPage from './routes/RepayPage';
import HelpPage from './routes/HelperPage';
import OrderPage from './routes/UserOrder';
import Recharge from './routes/recharge';
import BindMobile from './routes/bindMobile';
import RepayNewPage from './routes/RepayNewPage';
import UserInvitation from './routes/userInvitation';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/rent" component={RentPage} />
      <Route path="/user" component={UserPage} />
      <Route path="/authority" component={AuthorityPage} />
      <Route path="/qrScan" component={QRScanPage} />
      <Route path="/openInRenting" component={OpenInRenting} />
      <Route path="/repay" component={RepayPage} />
      <Route path="/help" component={HelpPage} />
      <Route path="/orders" component={OrderPage} />
      <Route path="/bind" component={BindMobile} />
      <Route path="/recharge" component={Recharge} />
      <Route path="/repayNewPage" component={RepayNewPage} />
      <Route path="/userInvitation" component={UserInvitation} />
    </Router>
  );
}

export default RouterConfig;
