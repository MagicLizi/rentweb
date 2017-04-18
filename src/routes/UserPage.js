/**
 * Created by magiclizi on 2017/4/5.
 */
import React from 'react';
import {connect} from 'dva';
import userPageCss from './UserPage.css';
import {setCurPath} from '../models/path';
import {tryCancelAuthority} from '../services/user';
import {repay,payrent} from '../services/action';
class UserPage extends React.Component{

  constructor() {
    super();
  }

  componentWillMount() {
    setCurPath('/user');
    this.props.refreshUserInfo();
  }

  cancelAuthority(){
    tryCancelAuthority().then(result=>{
      if(result){
        if(result['rentInfo']){
          alert('您有未支付的订单，请先支付！');
          payrent().then(result=>{
            if(result){
              var orderId = result['orderId'];
              var userId = result['userId'];
              var info = {
                orderId : orderId,
                path : '/user',
                userId:userId
              }
              var uri = `http://rentapi.magiclizi.com/pay/payment?info=${JSON.stringify(info)}`;
              var redirect_uri = encodeURI(uri);
              var newUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4188036aadb09af1&redirect_uri='
                + uri + '&response_type=code&scope=snsapi_base#wechat_redirect';
              window.location = newUri;
            }
          })
        }
        else{
          alert('退还押金申请成功，押金将会在1个工作日内返还到您的支付账户中！');
        }
      }
    })
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
            <span style = {{fontSize:26,color:'white',fontWeight:400}}>¥{balance}</span>
            <span style = {{fontSize:15,color:'white',fontWeight:400}}>可用余额</span>
          </div>
        </div>

        <div className = {userPageCss['cellContainer']}>

          <div onClick={()=>{this.props.showUserOrders()}} className = {userPageCss['cell']} style = {{marginTop:'5vh'}}>
            <span style = {{fontSize:15,color:'#2b2c2d',width:'46.5vw',marginLeft:'3.5vw'}}>我的订单</span>
            <div style = {{width:'50vw',height:'8vh',display:'flex',
              alignItems:'center',justifyContent:'flex-end'}}>
              <img src = {require('../assets/right.png')} style = {{width:'1.05vh',height:'2vh',marginRight:'3.5vw'}}/>
            </div>
          </div>

          <div onClick={()=>{this.cancelAuthority()}} className = {userPageCss['cell']} style = {{marginTop:'5vh'}}>
            <span style = {{fontSize:15,color:'#2b2c2d',width:'46.5vw',marginLeft:'3.5vw'}}>我的押金
              <span style = {{fontSize:15,color:'red'}}>{hasAuthority===0?'「未支付」':' 「点击退还」'}</span>
            </span>
            <div style = {{width:'50vw',height:'8vh',display:'flex',
              alignItems:'center',justifyContent:'flex-end'}}>
              <img src = {require('../assets/right.png')} style = {{width:'1.05vh',height:'2vh',marginRight:'3.5vw'}}/>
            </div>
          </div>

          <div className = {userPageCss['cellline']}/>
          <div onClick={()=>{this.props.showHelp()}} className = {userPageCss['cell']}>
            <span style = {{fontSize:15,color:'#2b2c2d',width:'46.5vw',marginLeft:'3.5vw'}}>使用帮助</span>
            <div style = {{width:'50vw',height:'8vh',display:'flex',
              alignItems:'center',justifyContent:'flex-end'}}>
              <img src = {require('../assets/right.png')} style = {{width:'1.05vh',height:'2vh',marginRight:'3.5vw'}}/>
            </div>
          </div>

          <div className = {userPageCss['cell']} style = {{marginTop:'5vh'}}>
            <a style = {{fontSize:15,width:'46.5vw',marginLeft:'3.5vw',color:'#2b2c2d'}} href="tel:18858317326">客服电话</a>
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

var mapDispatchToProps = function(dispatch){
  return{
    refreshUserInfo:()=>{
      dispatch({
        type:'user/refreshUserInfo'
      })
    },
    showHelp:()=>{
      dispatch({
        type:'user/showHelp'
      })
    },
    showUserOrders:()=>{
      dispatch({
        type:'user/showUserOrders'
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPage);


