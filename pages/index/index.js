// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 31.4,
    longitude: 121.48
  },
  bindcontroltap:function(e){
    console.log(e)
    switch(e.controlId){
      case 1:
        this.movetoCenter();
        break;
      case 2:
      if(this.timer){
        wx.navigateBack({
          delta:1
        })
      }else{
        wx.scanCode({
          success: () => {
            wx.showLoading({
              title: '正在获取密码',
            })
            console.log(1111)
            wx.request({
              url: 'https://www.easy-mock.com/mock/5b9df11bcea0cb6b8af5df18/demo/getName',
              success: (res) => {
                wx.hideLoading()
                wx.redirectTo({
                  url: '../scanReasult/index?password=' + res.data.data.password + '&number=' + res.data.data.number,
                  success: () => {
                    wx.showToast({
                      title: '获取密码成功',
                      duration: 1000
                    })
                  }
                })
              }
            })
          },
          fail: () => {

          }
        })
      }
      break;
      case 3:
      wx.navigateTo({
        url: '../warn/index',
      })

      

    }
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    this.timer = options.timer
    //页面初始化 options为页面跳转所带来的参数
    wx.getLocation({
      type: 'wgs84', //默认为 wgs84 返回 gps坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success:(res)=>{
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
    })
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          controls:[{
            id:1,
            iconPath:"/images/location.png",
            position:{
              width:50,
              height:50,
              left:20,
              top:res.windowHeight-80,

            },
            clickable:true
          },{
            id:2,
              iconPath: "/images/use.png",
              position: {
                width: 90,
                height: 90,
                left:res.windowWidth/2 - 45,
                top:res.windowHeight - 100
              },
              clickable: true
          },{
            id:3,
            iconPath:"/images/warn.png",
            position:{
              width:40,
              height:40,
              top:res.windowHeight - 80,
              left:res.windowWidth - 70
            },
            clickable: true
          },{
            id:4,
            iconPath: "/images/markers.png",
            position:{
              width:50,
              height:50,
              top:res.windowHeight - 155,
              left:res.windowWidth -70
            }
            }, {
              id: 5,
              iconPath: "/images/marker.png",
              position: {
                width: 26,
                height: 40,
                top: res.windowHeight/2 - 40,
                left: res.windowWidth/2 - 13
              }
            }
          
          ]
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  movetoCenter:function(){
    this.mapctx.moveToLocation();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.mapctx = wx.createMapContext("ofo-map");
    this.movetoCenter()
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