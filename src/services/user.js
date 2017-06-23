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
    method:'POST',
    body:JSON.stringify({
      v2:true
    })
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

export async function bind(mobile,verifyCode,qr){
  return await request(`/user/bind`,{
    method:'POST',
    body:JSON.stringify({
      mobile:mobile,
      verifyCode:verifyCode,
      qr:qr
    })
  });
}


export async function checkNeedRechargeable(qrCode){
  return await request(`/user/checkNeedRechargeable?qrCode=${qrCode}`,{});
}


export async function createRechargeOrder(rechargeId){
  return await request('/user/createRechargeOrder',{
    method:'POST',
    body:JSON.stringify({
      rechargeId:rechargeId
    })
  })
}

export async function createMemberOrder(){
  return await request('/user/createMemberOrder',{
    method:'POST'
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

export async function getRentFeeV2(rId){
  return await request(`/user/getRentFeeV2`,{
    method:'POST',
    body:JSON.stringify({
      rId:rId
    })
  });
}

export async function getRentFee(){
  return await request(`/user/getRentFee`,{});
}

export async function payRecharge(){
  return await request(`/user/payRecharge`,{});
}


export async function queryZhima(){
  return await request(`/user/queryZhima`,{});
}

export async function tryRepay(){
  return await request(`/user/tryRepay`,{method:'POST'});
}

export async function getUserMemberInfo(){
  return await request(`/user/userMemberInfo`,{});
}

export async function checkCancel(){
  return await request(`/user/checkCancel`,{});
}

export async function stopCancel(){
  return await request(`/user/stopCancel`,{method:'POST'});
}

export async function getRechargeConfig(){
  return await request(`/user/rechargeConfig`,{})
}

export async function getUserInvitation(){
  return await request(`/user/userInvitation`,{})
}

export async function applyStudent(creUrl){
  return await request(`/user/applyStudent`,{
    method:'POST',
    body:JSON.stringify({
      creUrl:creUrl
    })
  });
}


export async function isStudent(){
  return await request(`/user/isStudent`,{})
}
