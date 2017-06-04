import React from 'react';
import { connect } from 'dva';
import Style from './recharge.css';
import {setCurPath} from '../models/path';
import {urlDomain} from '../utils/request';
import {getRechargeConfig} from '../services/user';
class recharge extends React.Component {
  constructor(){
    super();
    this.state = {
      rechargeConfig:null
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

    var payobj = this.props.location.query['payobj'];
    if(!payobj) {
      this.props.checkNeedRechargeable(r=> {
        if (r['need']) {
          if(r['balance']>0){
            alert(`当前余额为:${(r['balance']/100).toFixed(2)}元`);
          }
          else if(r['balance'] <= 0){
            alert(`当前余额为:${(r['balance']/100).toFixed(2)}元，需要充值后才能正常使用！`);
          }
        }
      })
    }

    getRechargeConfig().then(data=>{
      this.setState({rechargeConfig:data})
    })
  }

  onBridgeReady(){
    var payobj = this.props.location.query['payobj'];
    var self = this;
    if(payobj){
      if(payobj&&payobj.length>0){
        var obj = JSON.parse(payobj);
        WeixinJSBridge.invoke('getBrandWCPayRequest', obj, res=>{
          if(res['err_msg'] == "get_brand_wcpay_request:ok"){
            alert("支付成功");
            if(self.props.location.query['showQR']){
              window.location = `${urlDomain}/qrScan?direction=true`;
            }
            else{
              window.location = `${urlDomain}/user`;
            }
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
      var path = `${urlDomain}/recharge`;
      var info = {
        orderId : orderId,
        path : path,
        userId:userId
      }
      if(this.props.location.query['showQR']){
        info.showQR = true;
      }
      var uri = `http://rentapi.magiclizi.com/pay/payment?info=${JSON.stringify(info)}`;
      var redirect_uri = encodeURI(uri);
      var newUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4188036aadb09af1&redirect_uri='
        + uri + '&response_type=code&scope=snsapi_base#wechat_redirect';
      window.location = newUri;
    })
  }

  renderConfig(){
    if(this.state.rechargeConfig){
      return(
        <div>
          <div className={Style['selectRow']}>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(1)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rechargeBtn.png)',marginLeft:'5vw'}}>
                <span>{~~(this.state.rechargeConfig['1'].price/100)}</span>
              </div>
            </div>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(2)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rechargeBtn.png)',marginRight:'5vw'}}>
                <span>{~~(this.state.rechargeConfig['2'].price/100)}</span>
              </div>
            </div>
          </div>
          <div className={Style['selectRow']}>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(3)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rechargeBtn.png)',marginLeft:'5vw'}}>
                <span>{~~(this.state.rechargeConfig['3'].price/100)}</span>
              </div>
            </div>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(4)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rechargeBtn.png)',marginRight:'5vw'}}>
                <span>{~~(this.state.rechargeConfig['4'].price/100)}</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return null;
  }

  render(){
    return (
      <div className = {Style['container']}>
        <div className = {Style['selectContainer']}>
          {this.renderConfig()}
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
    checkNeedRechargeable:(callback)=>{
      dispatch({type:'user/checkNeedRechargeable',callback:callback})
    }
  }
}

recharge.propTypes = {

};

export default connect(null,mapDispatchToProps)(recharge);
