/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {dealQRResult} from '../services/action';
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
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        var result = res['resultStr']; // 当needResult 为 1 时，扫码返回的结果
        this.dealScanResult(result);
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
