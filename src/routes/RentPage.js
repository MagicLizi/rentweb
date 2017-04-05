/**
 * Created by magiclizi on 2017/4/5.
 */
import React from 'react';
import {connect} from 'dva';
import {rent} from '../services/action';
class RentPage extends React.Component{

  constructor() {
    super();
  }

  componentWillMount() {
    // var appId = 'wx4188036aadb09af1';
    // var newUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}
    // &response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

  }

  rent(){

  }

  render(){
    return(
      <div>
        <button onClick={()=>{this.rent()}}>rent</button>
      </div>
    )
  }
}

export default connect()(RentPage);


