/**
 * Created by magiclizi on 2017/6/12.
 */
import React from 'react';
import Style from './userInvitation.css';
import {getUserInvitation} from '../services/user';
var qrCode = require('qrcode-npm')
var QRCode = require('qrcode.react');
import {setCurPath} from '../models/path';
class UserInvitation extends React.Component{

  constructor(){
    super();
    this.state = {
      qr:null,
      imgTag:null
    }
  }

  componentWillMount() {
    setCurPath('/userInvitation');
    // var qr = qrCode.qrcode(6, 'M');
    // qr.addData('32132131231');
    // qr.make();
    // var imgTag = qr.createImgTag(6);
    // this.setState({imgTag:imgTag});
  }

  componentDidMount() {
    getUserInvitation().then(result=>{
      var qr = qrCode.qrcode(6, 'M');
      qr.addData(result.qr.toString());
      qr.make();
      var imgTag = qr.createImgTag(6);
      alert(imgTag);
      this.setState({imgTag:imgTag});
    })
  }

  render(){
    return(
      <div className = {Style.container}>
        {this.state.imgTag?(
        <div className={Style['qrContainer']}>
          <div className={Style.title}>分享邀请码给你的朋友，你们分别能获得0.5元和3元的余额奖励哦！</div>
          <div dangerouslySetInnerHTML={{ __html: this.state.imgTag }} />
        </div>
        ):null}
      </div>
    )
  }
}

export default UserInvitation

