/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {payAuthority} from '../services/user';
import {setCurPath} from '../models/path';
import {urlDomain} from '../utils/request';
class Authority extends React.Component {

  componentWillMount() {

    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {

    }
    else {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", ()=>{this.onBridgeReady()}, false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", ()=>{this.onBridgeReady()});
      }
    }
    setCurPath('/authority');
  }

  onBridgeReady(){
    var payobj = this.props.location.query['payobj'];
    if(payobj){
      if(payobj&&payobj.length>0){
        var obj = JSON.parse(payobj);
        WeixinJSBridge.invoke('getBrandWCPayRequest', obj, res=>{
          if(res['err_msg'] == "get_brand_wcpay_request:ok"){
            // alert("支付成功");
            window.location = `${urlDomain}/qrScan`;
          }
          else if(res['err_msg'] == "get_brand_wcpay_request:cancel"){
            // alert("支付取消");
            this.props.cancelPay();
          }
          else{
            alert("支付失败:"+res);
            this.props.cancelPay();
          }
        });
      }
    }
  }

  componentDidMount() {

  }

  constructor() {
    super();
  }

  render(){
    return(
      <div className = {rentPageCss['container']}>
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentAllDetail5.jpg!w640)'}}>

          <div onClick={()=>{this.goZhiMa()}} className = {rentPageCss['authBtn']}>
            <span>芝麻</span>
          </div>
          <div onClick={()=>{this.payAuthority()}} className = {rentPageCss['authBtn']}>
            <span>直接支付</span>
          </div>
        </div>
      </div>
    )
  }

  goZhiMa(){
    alert('芝麻');
  }

  payAuthority(){
    payAuthority().then(result=>{
      if(result){
        var orderInfo = result['orderInfo'];
        var orderId = orderInfo['orderId'];
        var userId = orderInfo['userId'];
        var info = {
          orderId : orderId,
          path : `${urlDomain}/authority`,
          userId:userId
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

var mapDispatchToProps = function(dispatch){
  return {
    cancelPay:()=>{
      dispatch({type:'user/cancelPay'})
    },
    goQR:()=>{
      dispatch({type:'user/goQR'})
    }
  }
}

export default connect(null,mapDispatchToProps)(Authority);
