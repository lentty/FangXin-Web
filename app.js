//app.js
App({
  globalData: {
    host: "https://api.fangxincq.com/",
    //host: "http://localhost:8080/",
    userId: '',
    brandId:null
   
  },
  data: {
    host: "https://api.fangxincq.com/"
    //host: "http://localhost:8080/"
  },    
  onLaunch: function () {
    let userId = wx.getStorageSync('userId');
    console.log('userId from storage: ' + userId);
    if (!userId) {
      var that = this
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            wx.request({
              url: that.globalData.host + 'user/login/' + res.code,
              method: 'GET',
              success: res => {
                console.log(res.data);
                if (res.data.object) {
                  that.globalData.userId = res.data.object
                  wx.setStorageSync('userId', res.data.object);
                }
              }
            })
          }
        }
      })
    } else {
      this.globalData.userId = userId
    }
  }
})