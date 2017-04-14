/**
 * Created by magiclizi on 2017/4/5.
 */
import request from '../utils/request';

export async function dealQRResult(qrResult){
  return await request('/action/dealQRResult',{
    method:'POST',
    body:JSON.stringify({
      qrResult:qrResult
    })
  });
}

export async function openInRenting(){
  return await request('/action/openInRenting',{
    method:'POST',
  });
}

export async function repay(needOpen){
  return await request('/action/repay',{
    method:'POST',
    body:JSON.stringify({
      needOpen:needOpen
    })
  });
}

export async function wxConfig(url){
  return await request('/action/wxConfig',{
    method:'POST',
    body:JSON.stringify({
      url:url
    })
  })
}

export async function payrent(){
  return await request('/action/payrent',{
    method:'POST'
  })
}

