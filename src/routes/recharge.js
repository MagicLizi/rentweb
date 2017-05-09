import React from 'react';
import { connect } from 'dva';
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
      <div>
        充值
      </div>
    );
  }
}

recharge.propTypes = {

};

export default connect()(recharge);
