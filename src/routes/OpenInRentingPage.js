/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {openInRenting} from '../services/action';
import {setCurPath} from '../models/path';
class OpenInRentingPage extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    setCurPath('/openInRenting');
    this.props.getCurRentInfo();
  }

  render(){
    return(
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
      </div>
    )
  }

  openInRenting(){
    openInRenting().then(result=>{
      if(result){
        alert('开门中，请稍后。。。');
      }
    })

  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }

  renderAction(){
    if(this.props.curRentInfo){
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentinservice.jpg)'}}>
          <span style = {{fontSize:30,color:'white',marginBottom:'26vh'}}>亲的柜号是{this.props.curRentInfo['chestLogicId']}_{this.props.curRentInfo['boxId']}号
          </span>
          <div onClick={()=>{this.openInRenting()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
    else{
      return(
        <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/openInRentingError.jpg)'}}></div>
      )
    }
  }
}

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispathchToProps = function(dispatch){
  return{
    getCurRentInfo:()=>{
      dispatch({type:'user/getCurRentInfo'})
    },
  }
}

export default connect(mapStateToProps,mapDispathchToProps)(OpenInRentingPage);
