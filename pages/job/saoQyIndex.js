// pages/job/saoQyIndex.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    jobId:'',
    botmtype: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid: !app.globalData.cookie,
      botmtype: options.botmtype
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
  /**
   * 点击扫一扫
   */
  onSao: function () {
    console.log("sao")
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log("1234" + res.result)
        let newData = {
          device: app.globalData.openId
        }
        wx.request({
          url: app.globalData.contentpath + 'weixin/api/jobs/jobfair/corp/checkin?fair_id=' + app.globalData.fairId + '&corpid=' + res.result + '&device=' + app.globalData.openId, //仅为示例
          data: newData,
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: "POST",
          success(res) {
            console.log(res.data)
            if (res.data.errcode == 0) {
              wx.navigateTo({
                url: '/pages/job/greenQy?botmtype=2&name=' + res.data.data.corpname // 希望跳转过去的页面
              })
            } else {
              wx.navigateTo({
                url: '/pages/job/redQy?botmtype=2&errmsg=' + res.data.errmsg // 希望跳转过去的页面
              })
            }
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onIndex: function () {
    wx.navigateTo({
      url: '/pages/job/saoIndex?botmtype=1' // 希望跳转过去的页面
    })
  },
  /**
   * 用户点击右上角分享
   */
  onJobInList: function () {
    wx.navigateTo({
      url: '/pages/job/saoQyIndex?botmtype=2' // 希望跳转过去的页面
    })
  }
})