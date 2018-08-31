// pages/authorize/authorize.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {// 获取用户信息判断是否已经授权//未授权，则不跳转，显示授权页面
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
   bindGetUserInfo: function (e) {
     var that =this
    if (!e.detail.userInfo) {
      console.log(e)
      return;
    }
     console.log(e)
    wx.setStorageSync('userInfo', e.detail.userInfo)    
    // 删除授权信息会导致重新注册，需要判读是否已经注册过了，再去注册该用户
     that.registe()
    //this.login();
  },

  //后台注册用户
  registe :function(){
    var opid = wx.getStorageSync("openid")
    //判断是否已经注册过
    wx.request({
      url: 'http://localhost:8080/ms2/wxRegiste/checkRegiste',
      data: { id: opid },
      success: res => {
        console.log("重新判断用户是否已经注册：" + res.data)        
        if (res.data) {//若用户已经注册则跳转回去        
          wx.switchTab({
            url: '/pages/start/start',
          })
        } else { //注册用户：         
          wx.request({
            url: 'http://localhost:8080/ms2/wxRegiste/registe',
            data: {
              nickname: wx.getStorageSync('userInfo').nickName,
              id: wx.getStorageSync("openid")
            },
            success: (res) => {
              console.log('注册成功')
              //跳转首页
              wx.switchTab({
                url: '/pages/start/start',
              })
            },
            fail : () =>{
              console.log('注册失败')
            }
          })
        }
      },
      fail: res => {
        console.log("请求失败")
      }
    })
  }
})