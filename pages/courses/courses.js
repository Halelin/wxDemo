// pages/courses/courses.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursesInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    //有页面缓存则读取缓存，否则发送请求获取数据
  //  var temp = wx.getStorageSync('coursesInfo')
    console.log("页面传递的id" + options.courseDirectionId)
    console.log("courseDirectionId" + options.courseContentId)

      that.setData({
        //coursesInfo: temp,
        courseDirectionId: options.courseDirectionId,
        courseContentId: options.courseContentId
      })
   
      wx.request({
        url: 'http://localhost:8080/ms2/mainwx/toCourseJson',
        data: {
          courseDirectionId: that.data.courseDirectionId,
          courseContentId: that.data.courseContentId
        },
        success: (res) => {
          //更新缓存数据
         // wx.setStorageSync('coursesInfo', res.data)
         that.setData({
           coursesInfo:res.data
         })
        }
      })
   
    console.log(that.data.coursesInfo)
   
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

//切换课程内容
  clickOnCourseContents:function(e){
    var that =this
    wx.redirectTo({
      url: '/pages/courses/courses?courseDirectionId=' + that.data.courseDirectionId
        + '&courseContentId=' + e.currentTarget.dataset.coursecontentid,
    })
  },

//查找课程
  clickOnCourses:function(e){
    console.log(e.currentTarget.dataset.courseid)
    wx.navigateTo({
      url: '/pages/playmedia/video?courseId=' + e.currentTarget.dataset.courseid
    })
  },

//切换课程方向
  clickOnCourseDirections:function(e){
    var that =this
    console.log(that.data.courseDirectionId +"sdafsdfadsf")
    wx.redirectTo({
      url: '/pages/courses/courses?courseDirectionId=' + e.currentTarget.dataset.coursedirectionid
        +'&courseContentId=0',
    })
  }

})