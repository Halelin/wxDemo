//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    addressList:[]
  },

  selectTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'https://api.it120.cc/'+ app.globalData.subDomain +'/user/shipping-address/update',
      data: {
        token: wx.getStorageSync('token'),
        id:id,
        isDefault:'true'
      },
      success: (res) =>{
        wx.navigateBack({})
      }
    })
  },

  addAddess : function () {
    wx.navigateTo({
      url:"/pages/address-add/index"
    })
  },
  
  editAddess: function (e) {
    console.log(e);
    wx.navigateTo({
      url: "/pages/address-add/index?index=" + e.currentTarget.dataset.index+"&id="+e.currentTarget.dataset.id
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
   
  },
  onShow : function () {
    this.initShippingAddress();
  },
  initShippingAddress: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/ms2/address/selectAddressByOpenId',
      data: {
        openId: wx.getStorageSync('openid'),
       // token: wx.getStorageSync('token')
      },
      success: (res) =>{
        if (res.statusCode == 200){
          console.log(res.data)
          that.setData({
            addressList:res.data
          })
          //缓存用户地址
          wx.setStorageSync('addressList', res.data)
        }else{
          wx.redirectTo({
            url: '/pages/error/error',
          })
        }
        
        
      }
    })
  }

})
