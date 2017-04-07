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
             style = {{backgroundImage:'url(url(http://rentservice.b0.upaiyun.com/repay.jpeg)'}}>

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
