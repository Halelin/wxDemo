// pages/playmedia/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    that.setData({
      courseId: options.courseId
    })
    console.log("视频id" + that.data.courseId)
    //从数据库查找视频地址
    wx.request({
      url: 'http://localhost:8080/ms2/mainwx/toVideoJson',
      data: { courseId: that.data.courseId},
      success:res=>{
        console.log(res.data.picture_url)
        console.log(res.data.video_url)
        that.setData({
          videosrc: res.data.video_url,
          picturesrc: res.data.picture_url
        })
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
  
  }
})