// pages/courses/courses.js

//防止多次点击
var taplock = false;

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
    console.log("onload")
    var that =this
    //有页面缓存则读取缓存，之后再发送请求获取数据异步刷新，第一次访问，去白屏
   var temp = wx.getStorageSync('coursesInfo')
   if(temp){    
     that.setData({
       coursesInfo:temp
     })
   }

    console.log("页面传递的id" + options.courseDirectionId)
    console.log("courseDirectionId" + options.courseContentId)
      that.setData({
        //coursesInfo: temp,
        courseDirectionId: options.courseDirectionId,
        courseContentId: options.courseContentId
      })   
    that.refrashpage();      
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
    // wx.redirectTo({
    //   url: '/pages/courses/courses?courseDirectionId=' + that.data.courseDirectionId
    //     + '&courseContentId=' + e.currentTarget.dataset.coursecontentid,
    // })
    that.setData({
      //coursesInfo: temp,
      courseDirectionId: that.data.courseDirectionId,
      courseContentId: e.currentTarget.dataset.coursecontentid
    })
    that.refrashpage();

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
    if (taplock) {
      return
    }
    var that =this
    console.log(e.target.dataset.coursedirectionid)
    // console.log(e.data.courseDirectionId +"sdafsdfadsf")

    //将页面刷新改为异步方式
    // wx.redirectTo({
    //   url: '/pages/courses/courses?courseDirectionId=' + e.currentTarget.dataset.coursedirectionid
    //     +'&courseContentId=0',
    // })

    that.setData({
      //coursesInfo: temp,
      courseDirectionId: e.target.dataset.coursedirectionid,
      courseContentId:0
    })
    that.refrashpage();
  },

  refrashpage:function(){  
    taplock = true
    console.log("refrash")
    var that = this
    wx.showLoading({
      title: '加载中……',
    })   
    wx.request({
      url: 'http://localhost:8080/ms2/mainwx/toCourseJson',
      data: {
        courseDirectionId: that.data.courseDirectionId,
         courseContentId: that.data.courseContentId
        // courseContentId:undefined 模拟异常
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode != 200) {  
          wx.navigateTo({
            url: '/pages/error/error',
          })
        } else {  //获取courseInfo成功
          wx.setStorageSync("coursesInfo", res.data)//写入缓存
          that.setData({
            coursesInfo: res.data
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '系统错误',
          icon: 'success',
          duration: 1000
        })
      },
      complete:function(){
        wx.hideLoading();
        taplock = false;
      }
    })
  },
  onPullDownRefresh: function () {
      console.log("刷新中")
    // 用户触发了下拉刷新操作

    // 拉取新数据重新渲染界面

     wx.stopPullDownRefresh() // 可以停止当前页面的下拉刷新。

  }
})