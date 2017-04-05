/**
 * Created by magiclizi on 2017/4/5.
 */
import React from 'react';
import {connect} from 'dva';
import userPageCss from './UserPage.css';

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
    var nickname = this.props['nickname'];
    var avata = `url(${this.props['headImg']})`;
    var hasAuthority = this.props['hasAuthority'];
    var balance = this.props['balance'];
    return(
      <div className = {userPageCss['container']}>
        <div className = {userPageCss['userInfo']}>
          <div className = {userPageCss['userInfoTop']}>
            <div className = {userPageCss['avata']} style = {{backgroundImage:avata}}></div>
            <span style = {{fontSize:15,color:'white',marginTop:'1.5vh',fontWeight:400}}>{nickname}</span>
          </div>
          <div className = {userPageCss['line']}></div>
          <div className = {userPageCss['userInfoBottom']}>
            <span style = {{fontSize:26,color:'white',fontWeight:400}}>¥ {balance}</span>
            <span style = {{fontSize:15,color:'white',fontWeight:400}}>可用余额</span>
          </div>
        </div>

        <div className = {userPageCss['cellContainer']}>

          <div className = {userPageCss['cell']} style = {{marginTop:'5vh'}}>
            <span style = {{fontSize:15,color:'#2b2c2d',width:'46.5vw',marginLeft:'3.5vw'}}>我的订单</span>
            <div style = {{width:'50vw',height:'8vh',display:'flex',
              alignItems:'center',justifyContent:'flex-end'}}>
              <img src = {require('../assets/right.png')} style = {{width:'1.05vh',height:'2vh',marginRight:'3.5vw'}}/>
            </div>
          </div>

          <div className = {userPageCss['cell']} style = {{marginTop:'5vh'}}>
            <span style = {{fontSize:15,color:'#2b2c2d',width:'46.5vw',marginLeft:'3.5vw'}}>我的押金</span>
            <div style = {{width:'50vw',height:'8vh',display:'flex',
              alignItems:'center',justifyContent:'flex-end'}}>
              <img src = {require('../assets/right.png')} style = {{width:'1.05vh',height:'2vh',marginRight:'3.5vw'}}/>
            </div>
          </div>
          <div className = {userPageCss['cellline']}/>
          <div className = {userPageCss['cell']}>
            <span style = {{fontSize:15,color:'#2b2c2d',width:'46.5vw',marginLeft:'3.5vw'}}>关于我们</span>
            <div style = {{width:'50vw',height:'8vh',display:'flex',
              alignItems:'center',justifyContent:'flex-end'}}>
              <img src = {require('../assets/right.png')} style = {{width:'1.05vh',height:'2vh',marginRight:'3.5vw'}}/>
            </div>
          </div>
          <div className = {userPageCss['cellline']}/>
          <div className = {userPageCss['cell']}>
            <span style = {{fontSize:15,color:'#2b2c2d',width:'46.5vw',marginLeft:'3.5vw'}}>使用帮助</span>
            <div style = {{width:'50vw',height:'8vh',display:'flex',
              alignItems:'center',justifyContent:'flex-end'}}>
              <img src = {require('../assets/right.png')} style = {{width:'1.05vh',height:'2vh',marginRight:'3.5vw'}}/>
            </div>
          </div>

          <div className = {userPageCss['cell']} style = {{marginTop:'5vh'}}>
            <span style = {{fontSize:15,color:'#2b2c2d',width:'46.5vw',marginLeft:'3.5vw'}}>客服电话     4008000000</span>
            <div style = {{width:'50vw',height:'8vh',display:'flex',
              alignItems:'center',justifyContent:'flex-end'}}>
              <img src = {require('../assets/right.png')} style = {{width:'1.05vh',height:'2vh',marginRight:'3.5vw'}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

var mapStateToProps = function(state){
  return state['user'];
}

export default connect(mapStateToProps)(UserPage);


