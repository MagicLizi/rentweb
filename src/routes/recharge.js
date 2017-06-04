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
      this.setState({rechargeConfig:data.rechargeConfig})
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
        <div className = {Style['selectContainer']}>
          <div className={Style['selectRow']}>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(1)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/btnrecharge.png)',marginLeft:'5vw'}}>
                <span className={Style['priceTitle']}>{this.state.rechargeConfig["1"].price/100}元</span>
              </div>
              <div  className={Style['additionTitle']} style = {{marginLeft:'5vw'}}>
                {this.state.rechargeConfig["1"]['addition']>0?
                  `充${this.state.rechargeConfig["1"].price/100}元 送${this.state.rechargeConfig["1"]['addition']/100}元`:''}
              </div>
            </div>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(2)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/btnrecharge.png)',marginRight:'5vw'}}>
                <span className={Style['priceTitle']}>{this.state.rechargeConfig["2"].price/100}元</span>
              </div>
              <div  className={Style['additionTitle']} style = {{marginRight:'5vw'}}>
                {this.state.rechargeConfig["2"]['addition']>0?
                  `充${this.state.rechargeConfig["2"].price/100}元 送${this.state.rechargeConfig["2"]['addition']/100}元`:''}
              </div>
            </div>
          </div>
          <div className={Style['selectRow']}>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(3)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/btnrecharge.png)',marginLeft:'5vw'}}>
                <span className={Style['priceTitle']}>{this.state.rechargeConfig["3"].price/100}元</span>
              </div>
              <div  className={Style['additionTitle']} style = {{marginLeft:'5vw'}}>
                {this.state.rechargeConfig["3"]['addition']>0?
                  `充${this.state.rechargeConfig["3"].price/100}元 送${this.state.rechargeConfig["3"]['addition']/100}元`:''}
              </div>
            </div>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(4)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/btnrecharge.png)',marginRight:'5vw'}}>
                <span className={Style['priceTitle']}>{this.state.rechargeConfig["4"].price/100}元</span>
              </div>
              <div  className={Style['additionTitle']} style = {{marginRight:'5vw'}}>
                {this.state.rechargeConfig["4"]['addition']>0?
                  `充${this.state.rechargeConfig["4"].price/100}元 送${this.state.rechargeConfig["4"]['addition']/100}元，经常打球推荐`:''}
              </div>
            </div>
          </div>
        </div>
      )
    }
    else{
      return null;
    }
  }

  render(){
    return (
      <div className = {Style['container']}>
         {this.renderConfig()}
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
