// pages/job/saoIndex.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    jobId:'',
    botmtype: 1
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
		let botmtype = this.data.botmtype
		console.log(botmtype)
		wx.navigateTo({
			url: '/pages/job/green?botmtype='+botmtype // 希望跳转过去的页面
		})
// 		console.log(this.data.bottype)
//     // 只允许从相机扫码
// 		if (this.data.bottype == 0) {
// 			 wx.scanCode({
// 				onlyFromCamera: true,
// 				success(res) {
// 					let newData = {
// 						ticket_id: res.result,
// 						device: app.globalData.openId
// 					}
// 					wx.request({
// 						url: app.globalData.contentpath + 'weixin/api/jobs/jobfair/ticket/verify?ticket_id=' + res.result, //仅为示例
// 						data: newData,
// 						header: {
// 							'content-type': 'application/json' // 默认值
// 						},
// 						method: "POST",
// 						success(res) {
// 							console.log(res.data)
// 							if (res.data.errcode == 0) {
// // 								wx.navigateTo({
// // 									url: '/pages/job/green?botmtype=1&errmsg=0&name=' + res.data.data.user.name // 希望跳转过去的页面
// // 								})
// 							} else{
// // 								wx.navigateTo({
// // 									url: '/pages/job/green?botmtype=2&errmsg=-1&name='+'' // 希望跳转过去的页面
// // 								})
// 							}
// 						}
// 					})
// 				}
// 			})
// 		}else {
// 			wx.scanCode({
// 				onlyFromCamera: true,
// 				success(res) {
// 					console.log("1234" + res.result)
// 					let newData = {
// 						device: app.globalData.openId
// 					}
// 					wx.request({
// 						url: app.globalData.contentpath + 'weixin/api/jobs/jobfair/corp/checkin?fair_id=' + app.globalData.fairId + '&corpid=' + res.result + '&device=' + app.globalData.openId, //仅为示例
// 						data: newData,
// 						header: {
// 							'content-type': 'application/json' // 默认值
// 						},
// 						method: "POST",
// 						success(res) {
// 							console.log(res.data)
// 							if (res.data.errcode == 0) {
// // 								wx.navigateTo({
// // 									url: '/pages/job/green?botmtype=2&errmsg=0&name=' + res.data.data.corpname // 希望跳转过去的页面
// // 								})
// 							} else {
// // 								wx.navigateTo({
// // 									url: '/pages/job/green?botmtype=2&errmsg=-1&name='+'' // 希望跳转过去的页面
// // 								})
// 							}
// 						}
// 					})
// 				}
// 			})
// 		}
  },
	// 个人
  onIndex: function () {
		this.setData({
			botmtype: 1
		})
  },
	// 企业
  onJobInList: function () {
		this.setData({
			botmtype: 2
		})
  }
})