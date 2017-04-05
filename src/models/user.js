/**
 * Created by magiclizi on 2017/4/5.
 */
import {refreshUserInfo} from '../services/user';
export default{
  namespace:'user',
  state:{
    nickname:'神奇的梨子',
    headImg:"http://webresources.b0.upaiyun.com/WechatIMG2.jpeg",
    token:null,
    balance:0,
    orders:[],
    hasAuthority:false
  },

  effects:{
    *refreshUserInfo(action,{call,put}){
      console.log(action);
    }
  }
}
