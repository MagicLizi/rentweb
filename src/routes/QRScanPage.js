/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {dealQRResult,wxConfig} from '../services/action';
import {setCurPath} from '../models/path';
var wx = require('weixin-js-sdk');
class QRScanPage extends React.Component {

  constructor() {
    super();
    this['state'] = {
      boxInfo:null
    }
  }

  componentWillMount() {
    setCurPath('/qrScan');

    // alert(this.props.location.pathname);
    // var path = this.props.location.pathname;
    wxConfig(`http://rent.magiclizi.com/rent`).then(result=>{
      // alert(JSON.stringify(result.config));

      wx.config(result.config);

      wx.ready(function(){
        // alert('ready');
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });

      wx.error(function(res){
        // alert(JSON.stringify(res));
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

      });
    })
  }

  dealScanResult(qrResult){
    alert(qrResult);
    // dealQRResult(qrResult).then(result=>{
    //   if(result){
    //     this.setState({boxInfo:result.boxInfo});
    //   }
    // })
  }

  scanSuccess(){
    this.setState({curQRResult:'6c35ebf52cccf52b2d50f17ed439d10e'})
  }

  scanCancel(){
    this.setState({curQRResult:null})
  }

  render(){
    return(
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
      </div>
    )
  }

  openQRScan(){
    wx.scanQRCode({
      needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        alert(result);
      }
    });
  }

  renderAction(){
    // console.log(this.state.boxInfo);
    if(this.state.boxInfo){
      return(
        <div onClick={()=>this.closeWeb()} className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentsuccess.jpg)'}}></div>
      )
    }
    else{
      return(
        <div onClick={()=>this.openQRScan()} className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rent2.jpg)'}}></div>
      )
    }
  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }
}

export default connect()(QRScanPage);
