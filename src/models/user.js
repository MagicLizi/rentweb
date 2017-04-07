/**
 * Created by magiclizi on 2017/4/5.
 */
import {refreshUserInfo,getCurRentInfo,checkAuthority,getOrders} from '../services/user';
import { routerRedux } from 'dva/router';
export default{
  namespace:'user',
  state:{
    nickname:'',
    headImg:'',
    token:null,
    balance:0,
    orders:[
      {"id":28,"orderId":"authority_201704071491541369","userId":"oUewqwjS-hj8Sj61oCOESgJgdRjk","orderType":"authority","orderPrice":1,"payType":"wx","outOrderId":"4008152001201704076165416651","paidAt":1491541373,"createAt":"1491541369"},
      {"id":21,"orderId":"rent_201704071491540400_2","userId":"oUewqwjS-hj8Sj61oCOESgJgdRjk","orderType":"rent","orderPrice":1,"payType":"wx","outOrderId":"4008152001201704076164874309","paidAt":1491540407,"createAt":"1491540400"}
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

    *checkAuthority(action,{call,put}){
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
        routerRedux.replace({pathname:'/orders'})
      )
    }
  }
}
