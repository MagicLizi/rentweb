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
    WeixinJSBridge.invoke('scanQRCode',{
      'appid': 'wx4188036aadb09af1', // 公众号appID
      'desc' : 'desc', // 描述
      'needResult' : 0, // 非必填，扫码处理方式。1：直接返回扫描结果，0：扫码结果由微信处理。默认为0
      'scanType':['qrCode'] // 非必填，扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，默认全选
    },function(res){
      alert(res);
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
