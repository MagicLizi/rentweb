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
  alert('check');
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
