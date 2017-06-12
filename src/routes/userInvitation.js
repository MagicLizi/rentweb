/**
 * Created by magiclizi on 2017/6/12.
 */
import React from 'react';
import Style from './userInvitation.css';
import {getUserInvitation} from '../services/user';
class UserInvitation extends React.Component{

  componentWillMount() {
    getUserInvitation().then(result=>{

    })
  }

  render(){
    return(
      <div className = {Style.container}>邀请</div>
    )
  }
}

export default UserInvitation

