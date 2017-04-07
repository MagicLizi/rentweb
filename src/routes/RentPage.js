/**
 * Created by magiclizi on 2017/4/5.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {setCurPath} from '../models/path';
class RentPage extends React.Component{

  constructor() {
    super();
  }

  componentWillMount() {
    setCurPath('/rent');
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
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentinservice.jpg)'}}>
          <span style = {{fontSize:30,color:'white',marginBottom:'26vh'}}>亲的柜号是{curRentInfo['chestLogicId']}_{curRentInfo['boxId']}号
          </span>
          <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
    else{
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentwarning.jpg)'}}>
          <div onClick={()=>{this.checkAuthority()}} className = {rentPageCss['ball']}/>
        </div>
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


