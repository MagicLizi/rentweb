/**
 * Created by magiclizi on 2017/4/5.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {setCurPath} from '../models/path';
import {payrent} from '../services/action';
class RentPage extends React.Component{

  constructor() {
    super();
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

    this['props'].checkNeedBind(()=>{
      this['props'].getCurRentInfo(()=>{
        var curRentInfo = this['props'].curRentInfo;
        if(curRentInfo.orderId){
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
      });
    })
  }

  onBridgeReady(){
    var payobj = this.props.location.query['payobj'];
    if(payobj){
      if(payobj&&payobj.length>0){
        var obj = JSON.parse(payobj);
        WeixinJSBridge.invoke('getBrandWCPayRequest', obj, res=>{
          if(res['err_msg'] == "get_brand_wcpay_request:ok"){

            alert("支付成功");

            setTimeout(()=>{
              this.checkAuthority();
            },500);
            // this.closeWeb();
            // this.props.goQR();
          }
          else if(res['err_msg'] == "get_brand_wcpay_request:cancel"){
            // alert("支付取消");
            // this.props.cancelPay();
            // this.setState({showPay:true});
          }
          else{
            alert("支付失败:"+res);
            // this.setState({showPay:true});
            // this.props.cancelPay();
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
    var curRentInfo = this['props'].curRentInfo;
    if(curRentInfo){
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentinservice.jpg!w640)'}}>
          <span style = {{fontSize:30,color:'white',marginBottom:'28vh'}}>亲的柜号是{curRentInfo['boxId']}号
          </span>
          <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
    else{
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentwarning.jpg!w640)'}}>
          <div onClick={()=>{this.checkAuthority()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
  }

  checkAuthority(){
    this.props.checkUserAuthority();
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
    checkUserAuthority:()=>{
      dispatch({type:'user/checkAuthority'})
    },
    checkNeedBind:(callback)=>{
      dispatch({type:'user/checkNeedBind',callback:callback})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RentPage);


