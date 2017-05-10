/**
 * Created by magiclizi on 2017/4/5.
 */
import request from '../utils/request';

export async function refreshUserInfo(){
  return await request('/user',{});
}

export async function getCurRentInfo(){
  return await request('/user/curRentInfo',{});
}

export async function checkAuthority(){
  // alert('check');
  return await request('/user/checkAuthority',{});
}

export async function payAuthority(){
  return await request('/user/payAuthority',{
    method:'POST'
  });
}

export async function tryCancelAuthority(){
  return await request('/user/tryCancelAuthority',{
    method:'POST'
  });
}

export async function getOrders(){
  return await request('/user/orders',{});
}

export async function getVerifyCode(mobile){
  return await request(`/user/getVerifyCode?mobile=${mobile}`,{});
}

export async function checkNeedBind(){
  return await request(`/user/userneedbind`,{});
}

export async function bind(mobile,verifyCode){
  return await request(`/user/bind`,{
    method:'POST',
    body:JSON.stringify({
      mobile:mobile,
      verifyCode:verifyCode
    })
  });
}


export async function checkNeedRechargeable(){
  return await request(`/user/checkNeedRechargeable`,{});
}


export async function createRechargeOrder(rechargeId){
  return await request('/user/createRechargeOrder',{
    method:'POST',
    body:JSON.stringify({
      rechargeId:rechargeId
    })
  })
}

export async function getBoxOpenState(chestLogicId,boxId){
  return await request('/user/rentBoxOpenState',{
    method:'POST',
    body:JSON.stringify({
      chestLogicId:chestLogicId,boxId:boxId
    })
  });
}
