/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {payAuthority} from '../services/user';
import {setCurPath} from '../models/path';
import cookie from 'react-cookie';
class Authority extends React.Component {

  componentWillMount() {
    var payobj = cookie.load('token');
    alert(payobj);
    // if(payobj){
    //   alert(payobj);
    // }

    setCurPath('/authority');
  }

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
        var orderInfo = result['orderInfo'];
        var orderId = orderInfo['orderId'];
        var userId = orderInfo['userId'];
        var info = {
          orderId : orderId,
          path : '/authority',
        }
        var uri = `http://rentapi.magiclizi.com/pay/payment?info=${JSON.stringify(info)}`;
        var redirect_uri = encodeURI(uri);
        var newUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4188036aadb09af1&redirect_uri='
          + uri + '&response_type=code&scope=snsapi_base#wechat_redirect';
        window.location = newUri;
      }
    })
  }
}

export default connect()(Authority);
