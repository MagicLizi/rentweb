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
  return await request('/user/checkAuthority',{});
}

export async function payAuthority(){
  return await request('/user/payAuthority',{
    method:'POST'
  });
}

