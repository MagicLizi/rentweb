import React from 'react';
import { connect } from 'dva';
import rentPageCss from './RentPage.css';
import {setCurPath} from '../models/path';
class RepayNewPage extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount() {
    setCurPath('/repayNewPage');

    this.props.getCurRentInfo();
  }

  render(){
    return (
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
      </div>
    );
  }

  goPay(){

  }

  renderAction(){
    if(this.props.curRentInfo){
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repaynew1.jpg!w640)'}}>
          <div onClick={()=>{this.goPay()}} className = {rentPageCss['ball1']}/>
        </div>
      )
    }
    else{
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/openRentingError.jpg!w640)'}}>
          <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
  }
}

RepayNewPage.propTypes = {

};

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispathchToProps = function(dispatch){
  return{
    getCurRentInfo:(callback)=>{
      dispatch({type:'user/getCurRentInfo',callback:callback})
    },
  }
}

export default connect(mapStateToProps,mapDispathchToProps)(RepayNewPage);
