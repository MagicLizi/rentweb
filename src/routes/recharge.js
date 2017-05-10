import React from 'react';
import { connect } from 'dva';
import Style from './recharge.css';
class recharge extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount() {

  }

  render(){
    return (
      <div style = {Style.container}>
        充值
      </div>
    );
  }
}

recharge.propTypes = {

};

export default connect()(recharge);
