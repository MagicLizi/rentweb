/**
 * Created by magiclizi on 2017/4/5.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {setCurPath} from '../models/path';
import {payrent} from '../services/action';
import {urlDomain} from '../utils/request';
class RentPage extends React.Component{

  constructor() {
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
    setCurPath('/rent');

    //检测是否绑定手机
    this['props'].checkNeedBind(need=>{
      if(need){
        // alert(urlDomain);
        window.location = `${urlDomain}/bind`;
      }
      else{
        this['props'].checkUserAuthority(authority=>{
          if(authority){
            //检查是否有未支付
            this['props'].getCurRentInfo(()=> {
              var curRentInfo = this['props'].curRentInfo;
              if (curRentInfo && curRentInfo.orderId) {
                var payobj = this.props.location.query['payobj'];
                if(!payobj){
                  var c = confirm('您有未支付的订单，请先支付！');
                  if(c){
                    var userId = curRentInfo.userId;
                    var orderId = curRentInfo.orderId;
                    payrent().then(result=>{
                      if(result){
                        var info = {
                          orderId : orderId,
                          path : '/rent',
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
              }
              else {
                window.location = `${urlDomain}/qrScan`;
              }
            })
          }
          else{
            window.location = `${urlDomain}/authority`;
          }
        })
      }
    });
  }

  onBridgeReady(){
    var payobj = this.props.location.query['payobj'];
    if(payobj){
      if(payobj&&payobj.length>0){
        var obj = JSON.parse(payobj);
        WeixinJSBridge.invoke('getBrandWCPayRequest', obj, res=>{
          if(res['err_msg'] == "get_brand_wcpay_request:ok"){

            alert("支付成功");
            this.closeWeb();
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

  render(){
    return(
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
      </div>
    )
  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }


  //{curRentInfo['chestLogicId']}_
  renderAction(){
    return(
      <View />
    )
  }
}

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispatchToProps = function(dispatch){
  return {
    getCurRentInfo:(callback)=>{
      dispatch({type:'user/getCurRentInfo',callback:callback})
    },
    checkUserAuthority:(callback)=>{
      // alert(JSON.stringify(dispatch));
      dispatch({type:'user/checkUserAuthority',callback:callback})
    },
    checkNeedBind:(callback)=>{
      dispatch({type:'user/checkNeedBind',callback:callback})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RentPage);


