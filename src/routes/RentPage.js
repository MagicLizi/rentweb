/**
 * Created by magiclizi on 2017/4/5.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';

class RentPage extends React.Component{

  constructor() {
    super();
  }

  componentWillMount() {
    this['props'].getCurRentInfo();
  }

  render(){
    return(
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
      </div>
    )
  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }

  renderAction(){
    var curRentInfo = this['props'].curRentInfo;
    if(curRentInfo){
      return(
        <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/inservice.jpg)'}}></div>
      )
    }
    else{
      return(
        <div onClick={()=>{this.checkAuthority()}} className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentfirst.jpg)'}}></div>
      )
    }
  }

  checkAuthority(){
    this.props.checkUserAuthority();
  }
}

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispatchToProps = function(dispatch){
  return {
    getCurRentInfo:()=>{
      dispatch({type:'user/getCurRentInfo'})
    },
    checkUserAuthority:()=>{
      dispatch({type:'user/checkAuthority'})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RentPage);


