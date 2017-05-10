import React from 'react';
import { connect } from 'dva';
class RepayNewPage extends React.Component {
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
        还球
      </div>
    );
  }
}

RepayNewPage.propTypes = {

};

export default connect()(RepayNewPage);
