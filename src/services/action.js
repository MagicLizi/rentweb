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

export async function repay(){
  return await request('/action/repay',{
    method:'POST',
  });
}

export async function wxConfig(){
  return await request('/action/wxConfig',{
    method:'POST'
  })
}

