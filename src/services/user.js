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

export function wxUserLogin(){
  var uri = `http://rentapi.magiclizi.com/user/wxlogin`;
  var redirect_uri = encodeURI(uri);
  var appId = 'wx4188036aadb09af1';
  var newUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  window.location = newUri;
}
