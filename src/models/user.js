/**
 * Created by magiclizi on 2017/4/5.
 */
import {refreshUserInfo,getCurRentInfo,checkAuthority} from '../services/user';
import { routerRedux } from 'dva/router';
export default{
  namespace:'user',
  state:{
    nickname:'',
    headImg:'',
    token:null,
    balance:0,
    orders:[],
    hasAuthority:0,
    curRentInfo:null
  },

  reducers:{
    setCurUserInfo(state,action){
      return Object.assign({},state,action['curUserInfo'])
    },
    setCurRentInfo(state,action){
      return Object.assign({},state,{curRentInfo:action['curRentInfo']})
    },
    refreshAuthority(state,action){
      return Object.assign({},state,{hasAuthority:action['authority']})
    }
  },

  effects:{
    *refreshUserInfo(action,{call,put}){
      var result = yield call(refreshUserInfo);
      if(result){
        yield put({
          type:'setCurUserInfo',
          curUserInfo:{
            nickname:result['nickname'],
            headImg:result['headImg'],
            hasAuthority:result['authority'],
            balance:parseFloat(result['balance']/100).toFixed(2)
          }
        })
      }
    },

    *getCurRentInfo(action,{call,put}){
      var result = yield call(getCurRentInfo);
      if(result){
        yield put({
          type:'setCurRentInfo',
          curRentInfo:result['curRentInfo']
        })
      }
    },

    *checkAuthority(action,{call,put}){
      var result = yield call(checkAuthority);
      if(result){
        var authority = result['authority'];
        if(authority === 1){
          yield put(
            routerRedux.push({pathname:'/qrScan'})
          )
        }
        else{
          yield put(
            routerRedux.push({pathname:'/authority'})
          )
        }
        yield put({
          type:'refreshAuthority',
          hasAuthority:~~authority
        })
      }
    },
    *cancelPay(action,{call,put}){
      yield put(
        routerRedux.replace({pathname:'/authority'})
      )
    },
    *goQR(action,{call,put}){
      yield put(
        routerRedux.replace({pathname:'/qrScan'})
      )
    },
  }
}
