import React from 'react';
import { connect } from 'dva';

class IndexPage extends React.Component {
  constructor(){
    super();
  }

  componentWillMount() {
    console.log(this.props.location.query);
  }

  render(){
    return (
      <div>
        rentweb启动成功！
      </div>
    );
  }
}

IndexPage.propTypes = {

};

export default connect()(IndexPage);
