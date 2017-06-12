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
          <QRCode value={this.state.qr} size = {256}/>
        ):null}
      </div>
    )
  }
}

export default UserInvitation

