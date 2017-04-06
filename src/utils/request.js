import fetch from 'dva/fetch';
var domain = 'http://localhost:5002';
domain = 'http://rentapi.magiclizi.com'

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
export default function request(url, options) {
  var lastUrl = domain + url;
  options = Object.assign({},options,{
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    // credentials :"include"
  })
  return fetch(lastUrl, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if(data.code === 200){
        return data.data;
      }
      else{
        alert(data.message);
        console.error(`请求出错:${JSON.stringify(data)}`);
        return null;
      }
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}
