/**
 * Created by magiclizi on 2017/4/5.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {setCurPath} from '../models/path';
import {getRentFee} from '../services/user';
import {urlDomain} from '../utils/request';
class RentPage extends React.Component{

  constructor() {
    super();
    this.state = {
      orderInfo:null
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
              if (curRentInfo) {
                getRentFee().then(result=>{
                  this.setState({orderInfo:result});
                })
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
    if(this.state.orderInfo){
      var duration = this.state.orderInfo?this.state.orderInfo.duration:0;
      var orderPrice = this.state.orderInfo?(this.state.orderInfo['orderPrice']/100).toFixed(2):0;

      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repay.jpeg!w640)'}}>
          <span style = {{fontSize:25,color:'white'}}>
            您本次租用时长：{duration} 分钟
          </span>
          <span style = {{fontSize:25,color:'white',marginBottom:'24vh'}}>
            费用共计：{orderPrice}元
          </span>
          <div onClick={()=>{this.goPay()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
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


