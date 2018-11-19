// pages/job/jobFairListPage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobFairList: [],
    pageNum: 0,
    pageSize: 5,
    hasMoreData: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getJobInList('正在加载数据...')
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
  getJobInList: function (message) {
    wx.showLoading({
      title: message,
    })
    var that = this;
    wx.request({
      url: app.globalData.contentpath + 'weixin/api/jobs/jobfair/today', //仅为示例
      data: {
        skip: that.data.pageNum,
        limit: that.data.pageSize
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.errcode == '0') {
          console.log(res.data.data)
          if (that.data.pageNum >= res.data.pageCount) {
            that.setData({
              jobFairList: res.data.data,
              hasMoreData: false
            })
          } else {
            that.setData({
              jobFairList: res.data.data,
              hasMoreData: true,
              pageNum: that.data.pageNum + 1
            })
          }
        }
      },
      complete: function () {
        wx.hideLoading();
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    console.log('下拉');
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.data.pageNum = 0
    this.getJobInList('正在刷新数据')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getJobInList('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  onDetail: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/job/loginPage?id=' + e.currentTarget.id // 希望跳转过去的页面    
    })
  },
  /**
   * 用户点击右上角分享
   */
  onIndex: function () {
    wx.navigateTo({
      url: '/pages/job/saoIndex' // 希望跳转过去的页面
    })
  },
  /**
   * 用户点击右上角分享
   */
  onJobInList: function () {
    wx.navigateTo({
      url: '/pages/job/saoQyIndex' // 希望跳转过去的页面
    })
  }
})