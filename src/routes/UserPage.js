/**
 * Created by magiclizi on 2017/4/5.
 */
import React from 'react';
import {connect} from 'dva';
class UserPage extends React.Component{

  constructor() {
    super();
  }

  componentWillMount() {
    let appId = 'wx4188036aadb09af1';
    let redirectUrl = 'http://localhost:8000';
    let newUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}
    &response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    window.location = newUri;
  }


  render(){
    return(
      <div>
        userinfo
      </div>
    )
  }
}

export default connect()(UserPage);


