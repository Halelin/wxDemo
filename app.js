//app.js
App({
  mynum: 777,
  myString: 'string',
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var that = this
        console.log(res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:8080/ms2/wxLogin/Login',
            method: 'GET',
            data: {
              code: res.code
            },
            //登陆成功
            success: function (res) {              
              if (res.statusCode == 200) {
                console.log("获取到的openid为：" + res.data.openid)
                wx.setStorageSync('openid', res.data.openid)               
              } else {
                console.log(res.errMsg)
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

    // 获取用户信息判断是否已经授权//未授权，则不跳转，显示授权页面
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // // 可以将 res 发送给后台解码出 unionId
              // that.globalData.userInfo = res.userInfo
              // // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // // 所以此处加入 callback 以防止这种情况
              // if (that.userInfoReadyCallback) {
              //   that.userInfoReadyCallback(res)
              // }                         
              wx.setStorageSync('userInfo', res.userInfo)
            }
          })
          //跳转首页
          wx.switchTab({
            url: "/pages/start/start"
          })
        }        
      }
    })
  },

  globalData: {
    userInfo: null
  }
  // onError: function(){
  //   wx.redirectTo({
  //     url: '/pages/error/error',
  //   })
  // }



})

