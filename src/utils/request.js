import fetch from 'dva/fetch';
import {curPath} from '../models/path';
export {urlDomain}
var domain = `http://localhost:5002`;
domain = 'http://rentapi.magiclizi.com';
var urlDomain = `http://172.26.132.156:8000`;
urlDomain =`http://rent.magiclizi.com`;
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options,without) {
  var lastUrl = domain + url;
  console.log(lastUrl);
  if(without){
    lastUrl = url;
  }
  options = Object.assign({},options,{
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    credentials :"include"
  })
  return fetch(lastUrl, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if(data.code === 200){
        return data.data;
      }
      else{
        if(data.code === 9999){
          var uri = `http://rentapi.magiclizi.com/user/wxlogin?path=${curPath}`;
          var redirect_uri = encodeURI(uri);
          var appId = 'wx4188036aadb09af1';
          var newUri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
          window.location = newUri;
          // request(newUri,{},true);
        }
        else{
          alert(data.message);
          console.error(`请求出错:${JSON.stringify(data)}`);
          return null;
        }
      }
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}
