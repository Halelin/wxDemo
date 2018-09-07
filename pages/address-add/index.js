//var commonCityData = require('../../utils/city.js')
//获取应用实例
var app = getApp()
var hasChange = 0
var apiCode
Page({
  data: {
    addressData:{},
    region: ['省/直辖市','市','区']
  },
  bindCancel:function () {
    wx.navigateBack({})
  },
  bindSave: function(e) {
    var that = this;
    console.log(e)
    var name = e.detail.value.name
    var phoneNum = e.detail.value.phoneNum
    var address = e.detail.value.address
    var mailCode = e.detail.value.mailCode
    if (name == ""){
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel:false
      })
      return
    }
    var regx =/^1[3|4|5|8][0-9]\d{4,8}$/
    if (phoneNum==""){
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel:false
      })
      return
    } else if (!regx.test(phoneNum)){
      wx.showModal({
        title: '提示',
        content: '手机号码格式错误',
        showCancel: false
      })
      return
    }
    console.log(that.data.region[2])
    if (that.data.region[2] =="区"){
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel:false
      })
      return
    }   
    if (address == ""){
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel:false
      })
      return
    }
    regx = /^[0-9]{6}$/
    if (!regx.test(mailCode)){
      wx.showModal({
        title: '提示',
        content: '邮编格式错误',
        showCancel: false
      })
      return
    } else if (mailCode == ""){
      wx.showModal({
        title: '提示',
        content: '请填写邮编',
        showCancel: false
      })
      return
    }
   
    wx.request({
      url: 'http://localhost:8080/ms2/address/'+apiCode,
      data: {
        //token: wx.getStorageSync('token'),    
        id : that.id,
        openId:wx.getStorageSync('openid'),
        isDefault:'false',
        name:name,
        phoneNum: phoneNum,
        address: address,
        mailCode: mailCode,
        province: that.data.region[0],
        city: that.data.region[1],
        district: that.data.region[2],
      },
      success: function(res) {
       wx.navigateBack({})
      }
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)   
    this.setData({
      region: e.detail.value
    })
  },
  onLoad: function (e) {
    console.log(e)
    var that = this;    
    var index = e.index;//index为address的下标
    that.id = e.id;//id为address主键
    console.log(index+"index")
    console.log(that.id+"id")
    if (index) { 
      //将保存选项设置为更新而不是插入
      apiCode="update"
      // 初始化原数据
      wx.showLoading();
      //先读取缓存中的地址，不存在则发送请求获取详细地址
      var tempAddress = wx.getStorageSync('addressList')
      console.log(tempAddress)
      if (tempAddress){
        that.setData({
          addressData:tempAddress[index],
          region: [tempAddress[index].province, tempAddress[index].city, tempAddress[index].district]
        })
        wx.hideLoading();
      }else{
        wx.request({
          url: '',
          data: {
            token: wx.getStorageSync('token'),
            id: id,
          },
          success: function (res) {
            wx.hideLoading();
            if (res.data.code == 0) {

            } else {
              wx.showModal({
                title: '提示',
                content: '无法获取快递地址数据',
                showCancel: false
              })
            }
          }
        })
      }      
    }else{
      apiCode = "save"
    }    
  },
  deleteAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: '',
            data: {
              token: wx.getStorageSync('token'),
              id: id
            },
            success: (res) => {
              wx.navigateBack({})
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  readFromWx : function () {
    let that = this;
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
        let provinceName = res.provinceName;
        let cityName = res.cityName;
        let diatrictName = res.countyName;
        let retSelIdx = 0;

        for (var i = 0; i < commonCityData.cityData.length; i++) {
          if (provinceName == commonCityData.cityData[i].name) {
            let eventJ = { detail: { value:i }};
            that.bindPickerProvinceChange(eventJ);
            that.data.selProvinceIndex = i;
            for (var j = 0; j < commonCityData.cityData[i].cityList.length; j++) {
              if (cityName == commonCityData.cityData[i].cityList[j].name) {
                //that.data.selCityIndex = j;
                eventJ = { detail: { value: j } };
                that.bindPickerCityChange(eventJ);
                for (var k = 0; k < commonCityData.cityData[i].cityList[j].districtList.length; k++) {
                  if (diatrictName == commonCityData.cityData[i].cityList[j].districtList[k].name) {
                    //that.data.selDistrictIndex = k;
                    eventJ = { detail: { value: k } };
                    that.bindPickerChange(eventJ);
                  }
                }
              }
            }
            
          }
        }
        that.setData({
          wxaddress: res,
        });
      }
    })
  }
})
