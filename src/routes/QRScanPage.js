/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {dealQRResult,wxConfig} from '../services/action';
import {setCurPath} from '../models/path';
import {urlDomain} from '../utils/request';
var wx = require('weixin-js-sdk');
import Loading from '../components/Loading';
class QRScanPage extends React.Component {

  constructor() {
    super();
    this['state'] = {
      boxInfo:null,
      showloading:false
    }
  }

  componentWillMount() {
    setCurPath('/qrScan');
    var self = this;
    // alert(this.props.location.pathname);
    var path = this.props.location.pathname;
    var search = this.props.location.search;

    var fullpath = `${urlDomain}${path}${search}`;
    // alert(fullpath);
    wxConfig(fullpath).then(result=>{
      // alert(JSON.stringify(result.config));

      wx.config(result.config);

      wx.ready(function(){
        if(this.props.location.query.direction){
          self.openQRScan();
        }
        // alert('ready');
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });

      wx.error(function(res){
        alert(JSON.stringify(res));
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    })
  }


  render(){
    return(
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
        {this.state.showloading?(<Loading closeLoading = {()=>{
          this.setState({showloading:false})
        }}/>):null}
      </div>
    )
  }

  openQRScan(){
    //检查是否需要充值
    if(this.props.location.query.first){

      //第一次需要跳转充值页面
      window.location = `${urlDomain}/recharge`;
    }
    else{
      this.props.checkNeedRechargeable(r=>{

      })
    }
    // var self = this;
    // wx.scanQRCode({
    //   needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    //   scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
    //   success: function (res) {
    //     if(res.resultStr){
    //       dealQRResult(res.resultStr).then(result=>{
    //         if(result){
    //           self.setState({boxInfo:result.boxInfo});
    //           self.setState({showloading:true});
    //         }
    //       })
    //     }
    //   }
    // });
  }

  renderAction(){
    // console.log(this.state.boxInfo);

    if(this.state.boxInfo){
      var boxId = this.state.boxInfo.split('_')[1];
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentSuccessNew.jpg!w640)'}}>
          <span style = {{fontSize : 24,color:'white'}}>亲的柜号是{boxId}</span>
          <span style = {{fontSize : 24,color:'white'}}>租球期间点时时开门，</span>
          <span style = {{fontSize : 24,color:'white',marginBottom:'20vh'}}>可存取物品哦！</span>
          <div onClick={()=>this.closeWeb()}  className = {rentPageCss['ball']}/>
        </div>
      )
    }
    else{
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentDetail5.jpg!w640)'}}>
          <div onClick={()=>{this.openQRScan()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }
}

var mapDispatchToProps = function(dispatch){
  return{
    checkNeedRechargeable:(callback)=>{
      dispatch({type:'user/checkNeedRechargeable',callback:callback})
    }
  }
}

export default connect(null,mapDispatchToProps)(QRScanPage);
