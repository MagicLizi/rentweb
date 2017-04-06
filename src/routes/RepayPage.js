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

  render(){
    return(
      <div className = {rentPageCss['container']}>
        <div onClick={()=>{this.repay()}} className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repay.jpeg)'}}></div>
      </div>
    )
  }
}

export default connect()(RepayPage)
