/**
 * Created by magiclizi on 2017/4/5.
 */
import {refreshUserInfo,getCurRentInfo,checkAuthority,getOrders,checkNeedBind} from '../services/user';
import { routerRedux } from 'dva/router';
export default{
  namespace:'user',
  state:{
    nickname:'',
    headImg:'',
    token:null,
    balance:0,
    orders:[

    ],
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
    },
    setCurOrders(state,action){
      return Object.assign({},state,{orders:action['orders']})
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

        action['callback']&&action['callback']();
      }
    },

    *getUserOrders(action,{call,put}){
      var result = yield call(getOrders);
      if(result){
        yield put({
          type:'setCurOrders',
          orders:result['orders']
        })
      }
    },

    *checkUserAuthority(action,{call,put}){
      alert('213');
      var result = yield call(checkAuthority);
      if(result){
        var authority = result['authority'];
        yield put({
          type:'refreshAuthority',
          hasAuthority:~~authority
        })
        if(authority === 1){
          window.location = 'http://rent.magiclizi.com/qrScan'
        }
        else{
          yield put(
            routerRedux.push({pathname:'/authority'})
          )
        }
      }
    },
    *cancelPay(action,{call,put}){
      yield put(
        routerRedux.replace({pathname:'/authority',query:{}})
      )
    },
    *goQR(action,{call,put}){
      yield put(
        routerRedux.replace({pathname:'/qrScan'})
      )
    },

    *showHelp(action,{call,put}){
      yield put(
        routerRedux.push({pathname:'/help'})
      )
    },
    *rentCancelPay(action,{call,put}){
      yield put(
        routerRedux.replace({pathname:'/repay'})
      )
    },
    *showUserOrders(action,{call,put}){
      yield put(
        routerRedux.push({pathname:'/orders'})
      )
    },

    *checkNeedBind(action,{call,put}){
      var result = yield call(checkNeedBind);
      if(result){
        if(result['need']){
          yield put(
            routerRedux.push({pathname:'/bind'})
          )
        }
        else{
          action['callback']&&action['callback']();
        }
      }
    }
  }
}
