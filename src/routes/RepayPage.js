/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {repay,payrent} from '../services/action';
import {setCurPath} from '../models/path';
import Loading from '../components/Loading';
import PLoading from '../components/PayLoading';
class RepayPage extends React.Component {

  constructor() {
    super();
    this['state'] = {
      orderInfo:null,
      showloading:false,
      showPay:false,
      showPayLoading:false
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
    setCurPath('/repay');

    this.props.getCurRentInfo(()=>{
      if(this.props.curRentInfo){
        var payobj = this.props.location.query['payobj'];
        if(!payobj){
          this.setState({showloading:true});
          setTimeout(()=>{
            this.repay(true,()=>{

            });
          },8000)
        }
        else{
          this.repay(false,()=>{
            this.setState({showPay:true});
          });
        }
      }
    });
    // var payobj = this.props.location.query['payobj'];
    // if(!payobj) {
    //   this.setState({showloading:true});
    // }
    // else{
    //   this.setState({showPay:true});
    // }
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
            // this.props.goQR();
          }
          else if(res['err_msg'] == "get_brand_wcpay_request:cancel"){
            // alert("支付取消");
            this.props.cancelPay();
            this.setState({showPay:true});
          }
          else{
            alert("支付失败:"+res);
            this.setState({showPay:true});
            this.props.cancelPay();
          }
        });
      }
    }
  }


  repay(needOpen,callback){
    repay(needOpen).then(result=>{
      if(result){
        var orderInfo = result['orderInfo'];
        this.setState({orderInfo:orderInfo});
        callback();
      }
    })
  }

  payRent(){
    payrent().then(result=>{
      if(result){
        var orderId = result['orderId'];
        var userId = result['userId'];
        var info = {
          orderId : orderId,
          path : '/repay',
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

  goPay(){
    this.setState({showPay:true});
  }

  renderAction(){
    // alert(this.state.showPay);
    if(this.state.showPay){
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repay.jpeg!w640)'}}>
          <span style = {{fontSize:25,color:'white'}}>
            您本次租用时长：{this.state.orderInfo.duration} 分钟
          </span>
          <span style = {{fontSize:25,color:'white',marginBottom:'24vh'}}>
            费用共计：{(this.state.orderInfo['orderPrice']/100).toFixed(2)}元
          </span>
          <div onClick={()=>{this.setState({showPayLoading:true})}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
    else{
      //this.props.curRentInfo['chestLogicId']}_
      if(this.props.curRentInfo){
        return(
          <div className = {rentPageCss['bg']}
               style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repaynew1.jpg!w640)'}}>
            <div onClick={()=>{this.goPay()}} className = {rentPageCss['ball1']}/>
          </div>
        )
      }
      else{
        return(
          <div className = {rentPageCss['bg']}
               style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/openRentingError.jpg!w640)'}}>
            <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['ball']}/>
          </div>
        )
      }
    }
  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }

  render(){
    return(
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
        {this.state.showloading?(<Loading duration = {16} closeLoading = {()=>{
          this.setState({showloading:false})
        }}/>):null}
        {this.state.showPayLoading?(<PLoading closeLoading = {()=>{
          this.setState({showPayLoading:false})
          this.payRent();
        }}/>):null}
      </div>
    )
  }
}

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispathchToProps = function(dispatch){
  return{
    getCurRentInfo:(callback)=>{
      dispatch({type:'user/getCurRentInfo',callback:callback})
    },
    cancelPay:()=>{
      dispatch({type:'user/rentCancelPay'})
    }
  }
}

export default connect(mapStateToProps,mapDispathchToProps)(RepayPage)
