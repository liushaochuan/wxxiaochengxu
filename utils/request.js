var app = getApp();
export function httpGet(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    data: {},
    header: {
      "Content-Type": "application/json"
    },
    success: (res)=> {
      return callback(res)
    },
    fail: (error)=>{
      console.log(error)
    }
  });
}
export function wxPromise(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = res => {
        resolve(res)
      };
      obj.fail = res => {
        reject(res)
      };
      fn(obj)
    })
  }
}
export function post(url, data={}){
  return new Promise((resolve, reject) => {
     //网络请求
     wx.request({
        url: app.globalData.baseUrl + url,
        data,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {//服务器返回数据
          resolve(res);
        },
        fail: function (e) {
          reject('网络出错');
        }
     })
  });
}
export function get(url, data={}){
  return new Promise((resolve, reject) => {
     //网络请求
     wx.request({
        url: app.globalData.baseUrl + url,
        data,
        method: 'GET',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {//服务器返回数据
          resolve(res);
        },
        fail: function (e) {
           reject('网络出错');
        }
     })
  });
}