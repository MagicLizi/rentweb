/**
 * Created by magiclizi on 2017/6/12.
 */
import React from 'react';
import Style from './userInvitation.css';
import {getUserInvitation} from '../services/user';
var QRCode = require('qrcode.react');
class UserInvitation extends React.Component{

  constructor(){
    super();
    this.state = {
      qr:null
    }
  }

  componentWillMount() {
    getUserInvitation().then(result=>{
      this.setState({qr:result.qr})
    })
  }

  render(){
    return(
      <div className = {Style.container}>
        {this.state.qr?(
        <div>
          <div className={Style.title}>分享邀请码给你的朋友，你们都能获得3元充值奖励</div>
          <QRCode value={this.state.qr} size = {256}/>
        </div>
        ):null}
      </div>
    )
  }
}

export default UserInvitation

