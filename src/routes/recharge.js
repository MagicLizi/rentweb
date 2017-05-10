import React from 'react';
import { connect } from 'dva';
import Style from './recharge.css';
import {setCurPath} from '../models/path';
import {urlDomain} from '../utils/request';
class recharge extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

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

    setCurPath('/recharge');
  }

  onBridgeReady(){
    var payobj = this.props.location.query['payobj'];
    if(payobj){
      if(payobj&&payobj.length>0){
        var obj = JSON.parse(payobj);
        WeixinJSBridge.invoke('getBrandWCPayRequest', obj, res=>{
          if(res['err_msg'] == "get_brand_wcpay_request:ok"){
            alert("支付成功");
            window.location = `${urlDomain}/qrScan?direction=true`;
          }
          else if(res['err_msg'] == "get_brand_wcpay_request:cancel"){

          }
          else{
            alert("支付失败:"+res);
          }
        });
      }
    }
  }

  recharge(rechargeId){
    // alert(rechargeId);
    this.props.createRechargeOrder(rechargeId,r=>{
      var orderId = r['orderId'];
      var userId = r['userId'];
      var info = {
        orderId : orderId,
        path : `${urlDomain}/recharge`,
        userId:userId
      }
      var uri = `http://rentapi.magiclizi.com/pay/payment?info=${JSON.stringify(info)}`;
      var redirect_uri = encodeURI(uri);
      var newUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4188036aadb09af1&redirect_uri='
        + uri + '&response_type=code&scope=snsapi_base#wechat_redirect';
      window.location = newUri;
    })
  }

  render(){
    return (
      <div className = {Style['container']}>
        <div className = {Style['selectContainer']}>
          <div className={Style['selectRow']}>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(1)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/recharge2.png)',marginLeft:'5vw'}}/>
            </div>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(2)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/recharge5.png)',marginRight:'5vw'}}/>
            </div>
          </div>
          <div className={Style['selectRow']}>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(3)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/recharge10.png)',marginLeft:'5vw'}}/>
            </div>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(4)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/recharge20.png)',marginRight:'5vw'}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var mapDispatchToProps = function(dispatch){
  return{
    createRechargeOrder:(rechargeId,callback)=>{
      dispatch({type:'user/createRechargeOrder',callback:callback,rechargeId:rechargeId})
    },
  }
}

recharge.propTypes = {

};

export default connect(null,mapDispatchToProps)(recharge);
