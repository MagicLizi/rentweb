/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {payAuthority} from '../services/user';
class Authority extends React.Component {

  constructor() {
    super();
  }

  render(){
    return(
      <div className = {rentPageCss['container']}>
        <div onClick={()=>this.payAuthority()} className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rent1.jpg)'}}></div>
      </div>
    )
  }

  payAuthority(){
    payAuthority().then(result=>{
      if(result){
        console.log(result['orderInfo']);
        console.log('调用支付！支付成功后设置订单paidat 以及用户authority')
      }
    })
  }
}

export default connect()(Authority);
