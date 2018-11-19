// pages/job/loginPage.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['请选择学校', '长春理工大学', '长春工业大学', '长春师范大学', '吉林工师', '东北师范大学'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    username:'',
    password:''
  },


  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  onLoad: function (options) {
    this.setData({
      username: options.id
    });
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
  passWdInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  onSave() {
    console.log('用户点击了确定')
    console.log(this.data.username+"11111")
    if (this.data.username == ''){
      console.log(222)
      wx.showToast({
        title: '请输入用户名',
        icon: 'loading',
        mask: true
      })
      return
    }
    if (this.data.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'loading',
        mask: true
      })
      return
    }
    let newData = {
      fair_id: this.data.username,
      password: this.data.password
    }
    var that = this;
    wx.request({
      url: app.globalData.contentpath + 'weixin/api/jobs/jobfair/ticket/login?device=' + app.globalData.openId, //仅为示例，并非真实的接口地址
      
      data: newData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        if (res.data.errcode == 0){
          app.globalData.fairId = that.data.username;
          wx.navigateTo({
            url: '/pages/job/saoIndex?botmtype=1&jobId=' + that.data.username // 希望跳转过去的页面
          })
        } else{
          wx.showToast({
            title: res.data.errmsg,
            icon: 'loading',
            mask: true
          })
          return
        }
      }
    })
  }


})