import React from 'react';
import { connect } from 'dva';
import Loading from '../components/Loading';
import PLoading from '../components/PayLoading';
class IndexPage extends React.Component {
  constructor(){
    super();
    this.state = {
      show:true
    }
  }

  componentWillMount() {
    console.log(this.props);
  }

  render(){
    return (
      <div>
        rentweb启动成功！
        <PLoading />
      </div>
    );
  }
}

IndexPage.propTypes = {

};

export default connect()(IndexPage);
