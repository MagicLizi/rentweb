/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {repay} from '../services/action';
import {setCurPath} from '../models/path';
class RepayPage extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    setCurPath('/repay');
    this.props.getCurRentInfo();
  }

  repay(){
    repay().then(result=>{
      if(result){
        var orderInfo = result['orderInfo'];
        console.log(orderInfo);
        console.log('调用支付,支付成功后，设置箱子的使用状态为 0');
      }
    })
  }

  renderAction(){
    if(this.props.curRentInfo){
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repay.jpeg)'}}>
          <span style = {{fontSize:25,color:'white',marginBottom:'20vh',width:'75vw',textAlign:'center'}}>
            猪猪提醒，亲的柜号是{this.props.curRentInfo['chestLogicId']}_{this.props.curRentInfo['boxId']}号，记得将球放入的同时，把门关上哦。还有私人物品，千万别忘了呢。点击确认。
          </span>
          <div onClick={()=>{this.repay()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
    else{
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/openRentingError.jpg)'}}>
          <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }

  render(){
    return(
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
      </div>
    )
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

export default connect(mapStateToProps,mapDispathchToProps)(RepayPage)
