/**
 * Created by magiclizi on 2017/4/5.
 */
import {refreshUserInfo} from '../services/user';
export default{
  namespace:'user',
  state:{
    nickname:'',
    headImg:'',
    token:null,
    orders:[]
  },

  effects:{
    *refreshUserInfo(action,{call,put}){
      console.log(action);
    }
  }
}
