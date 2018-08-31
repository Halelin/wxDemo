// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    var that = this
    var user =wx.getStorageSync("userInfo")
    that.setData({
      user :user
    })
    wx.request({
      url: 'http://localhost:8080/ms2/mainwx/toIndexJson',
      method: 'post',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          data: res.data,
        });
        console.log("Success")
      }
    })
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

//跳转具体课程方向
  click: function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/courses/courses?courseDirectionId=' + e.currentTarget.dataset.coursedirectionid
        + '&courseContentId=0',
    })
  },

  openCamera :function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
        console.log("打开摄像头")
      }
    })
  },
  checkSession: function(){
    wx.checkSession({
      success: function () {
        console.log("登陆状态有效")
        //session 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        //登录态过期
        console.log("登陆过期")
        wx.login() //重新登录   
      }
    })
  }
})