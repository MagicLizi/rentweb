import React from 'react';
import { connect } from 'dva';
import Loading from '../components/Loading';
class IndexPage extends React.Component {
  constructor(){
    super();
  }

  componentWillMount() {
    console.log(this.props);
  }

  render(){
    return (
      <div>
        rentweb启动成功！
        <Loading />
      </div>
    );
  }
}

IndexPage.propTypes = {

};

export default connect()(IndexPage);
