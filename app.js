//app.js
App({
  onLaunch: function () {
    wx.login({
      success(res) {
        console.log(res.code)
      }
    })
  },
  globalData: {
    baseUrl: "http://t.yushu.im"
  },
})