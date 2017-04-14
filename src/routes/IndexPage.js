import React from 'react';
import { connect } from 'dva';
import Loading from '../components/Loading';
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
        {this['state'].show?(<Loading closeLoading = {()=>{
          this.setState({show:false})
        }}/>):null}
      </div>
    );
  }
}

IndexPage.propTypes = {

};

export default connect()(IndexPage);
