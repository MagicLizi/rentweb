/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {dealQRResult,wxConfig,boxPrice} from '../services/action';
import {setCurPath} from '../models/path';
import {urlDomain} from '../utils/request';
var wx = require('weixin-js-sdk');
import Loading from '../components/Loading';
class QRScanPage extends React.Component {

  constructor() {
    super();
    this['state'] = {
      boxInfo:null,
      showloading:false,
      step:-1,
      price:null
    }
  }

  componentWillMount() {
    var self = this;
    setCurPath('/qrScan');
    var path = this.props.location.pathname;
    var search = this.props.location.search;

    var fullpath = `${urlDomain}${path}${search}`;
    // alert(fullpath);
    wxConfig(fullpath).then(result=>{
      // alert(JSON.stringify(result.config));

      wx.config(result.config);

      wx.ready(function(){
        // if(self.props.location.query.direction){
        //   self.openQRScan();
        // }
        self.openQRScan();
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
      window.location = `${urlDomain}/recharge?showQR=true`;
    }
    else{
      this.props.checkNeedRechargeable(r=>{
        if(r['need']){
          window.location = `${urlDomain}/recharge?showQR=true`;
        }
        else{
          var self = this;
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              if(res.resultStr){
                boxPrice(res.resultStr).then(r=>{
                  var price = r['price'].split('_');
                  self.qr = res.resultStr
                  if(price.length < 3){
                    self.setState({step:1,price:r['price']});
                  }
                  else{
                    self.setState({step:2,price:r['price']});
                  }
                })

                // dealQRResult(res.resultStr).then(result=>{
                //   if(result){
                //     self.setState({boxInfo:result.boxInfo});
                //     self.setState({showloading:true});
                //   }
                // })
              }
            }
          });
        }
      })
    }
  }

  renderAction(){
    // console.log(this.state.boxInfo);
    var self = this;
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
      if(this.state.step === -1){
        return(
          <div className = {rentPageCss['bg']}
               style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repay.jpeg!w640)'}}>
          <span style = {{marginBottom:'40vh',fontSize:25,color:'white'}}>
            点击扫码
          </span>
            <div onClick={()=>{this.openQRScan()}} className = {rentPageCss['ball']}/>
          </div>
        )
      }
      else{
        if(this.state.step === 1){
          return(
            <div className = {rentPageCss['bg']}
                 style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentDetail5.jpg!w640)'}}>
              <div onClick={()=>{
                dealQRResult(self.qr).then(result=>{
                  if(result){
                    self.setState({boxInfo:result.boxInfo});
                    self.setState({showloading:true});
                  }
                })
              }} className = {rentPageCss['ball']}/>
            </div>
          )
        }
        else if(this.state.step === 2){
          var prices = this.state.price.split('_');
          return(
            <div className = {rentPageCss['bg']}
                 style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repay.jpeg!w640)'}}>
              <span style = {{fontSize:25,color:'white'}}>
                {`第一小时:${~~prices[0]/100*60}元`}
              </span>

              <span style = {{fontSize:25,color:'white'}}>
                {`之后每小时:${~~prices[1]/100*60}元`}
              </span>

              <span style = {{marginBottom:'28vh',fontSize:28,color:'white'}}>
                {`封顶:${~~prices[2]/100}元`}
              </span>

              <div onClick={()=>{this.openQRScan()}} className = {rentPageCss['ball']}/>
            </div>
          )
        }
      }
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
