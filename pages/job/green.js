// pages/job/green.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		botmtype: '',
		list: [],
		array: [],
		aa: true,
		h: '',
		z: 5,
		s: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.upload()
		this.setData({
			botmtype: options.botmtype
		});
		wx.setKeepScreenOn({
			keepScreenOn: true
		})
		wx.getSetting({
			success(res) {
				console.log(res)
				if (!res.authSetting['scope.record']) {
					wx.authorize({
						scope: 'scope.camera',
						success (res) {
							console.log('用户同意使用摄像头')
						},
						fail (err) {
							wx.navigateTo({
								url: '/pages/job/saoIndex?botmtype=1'
							})
						}
					})
				}
			}
		})
  },


  /**
   * 扫码成功回调
   */
  success: function (res) {
		if (this.data.aa == true) {
			this.dwload()
			this.data.aa = false
			let tach = this
			var myDate = new Date();
			let a = myDate.getMonth();
			let b = myDate.getDate();
			let c = myDate.getHours();
			let d = myDate.getMinutes(); 
			let e = myDate.getSeconds();
			let date = a+'/'+b+'/'+c+':'+d+':'+e
			if (this.data.botmtype == 1) {
						let newData = {
							ticket_id: res.detail.result,
							device: app.globalData.openId
						}
						wx.request({
							url: app.globalData.contentpath + 'weixin/api/jobs/jobfair/ticket/verify?ticket_id=' + res.detail.result,
							data: newData,
							header: {
								'content-type': 'application/json' // 默认值
							},
							method: "POST",
							success(res) {
								tach.upload()
								if (tach.data.list.length > 100) {
									tach.data.list.splice(tach.data.list.length,1)
								}
								if (res.data.errcode == 0) {
									let name = res.data.data.user.name // 获取name
									tach.data.array = [{name:name,date:date,arr:'成功',id:newData.ticket_id,color:'green'}] // 创建信息
									for (let i=0; i<tach.data.list.length; i++) { // 循环源数组
										tach.data.array.push(tach.data.list[i]) // 添加到新的数组
									}
									tach.setData({
										list:tach.data.array
									})
									tach.data.aa = true
								}else if(res.data.errcode == -11){
									let msg = res.data.errmsg// 获取错误信息
									let _id = newData.ticket_id
									if (tach.data.list.length > 0) {// 判断数组长度
										let msgx = tach.data.list[0].id// 获取数组第一个元素
										if (_id !== msgx) { // 判断上一个和当前是否不一样
											tach.data.array = [{name:msg,date:date,arr:'失败',id:newData.ticket_id,color:'red'}] // 创建信息
											for (let i=0; i<tach.data.list.length; i++) { // 循环源数组
												tach.data.array.push(tach.data.list[i]) // 添加到新的数组
											}
											tach.setData({ // 不一样输出信息
												list:tach.data.array
											})
										}
									}else { // 如果是第一次直接输出
										tach.data.array = [{name:msg,date:date,arr:'失败',id:newData.ticket_id,color:'red'}]
										tach.setData({
											list:tach.data.array
										})
									}
									tach.data.aa = true
								}else {
									let msg2 = res.data.errmsg // 获取错误信息
									let _id = newData.ticket_id // 获取当前的id
									tach.data.array = [{name:msg2,date:date,arr:'失败',id:newData.ticket_id,color:'red'}] // 创建信息
									for (let i=0; i<tach.data.list.length; i++) { // 循环源数组
										tach.data.array.push(tach.data.list[i]) // 添加到新的数组
									}
									if (tach.data.list.length > 0) { // 判断数组长度
										let msgx = tach.data.list[0].id // 获取数组第一个元素
										if (_id !== msgx) { // 判断上一个和当前是否不一样
											tach.setData({ // 不一样输出信息
												list:tach.data.array
											})
										}
									}else { // 如果是第一次直接输出
										tach.setData({
											list:tach.data.array
										})
									}
									tach.data.aa = true
								}
							},
							error(err){
								console.log(err)
							}
						})
					}else {
						let newData = {
							device: app.globalData.openId
						}
						let _id = res.detail.result // 获取当前的id
						wx.request({
							url: app.globalData.contentpath + 'weixin/api/jobs/jobfair/corp/checkin?fair_id=' + app.globalData.fairId + '&corpid=' + res.detail.result + '&device=' + app.globalData.openId, //仅为示例
							data: newData,
							header: {
								'content-type': 'application/json' // 默认值
							},
							method: "POST",
							success(res) {
								tach.upload()
								if (res.data.errcode == 0) {
									tach.data.array = [{name:name,date:date,arr:'成功',id:newData.ticket_id,color:'green'}] // 创建信息
									for (let i=0; i<tach.data.list.length; i++) { // 循环源数组
										tach.data.array.push(tach.data.list[i]) // 添加到新的数组
									}
									tach.setData({
										list:tach.data.array
									})
									tach.data.aa = true
								}else if(res.data.errcode == -11){
									let msg = res.data.errmsg // 获取错误信息
									if (tach.data.list.length > 0) { // 判断数组长度
									let msgx = tach.data.list[0].id // 获取数组第一个元素
										if (_id !== msgx) { // 判断上一个和当前是否不一样
											tach.data.array = [{name:msg,date:date,arr:'失败',id:newData.ticket_id,color:'red'}] // 创建信息
											for (let i=0; i<tach.data.list.length; i++) { // 循环源数组
												tach.data.array.push(tach.data.list[i]) // 添加到新的数组
											}
											tach.setData({ // 不一样输出信息
												list:tach.data.array
											})
										}
									}else { // 如果是第一次直接输出
										tach.data.array = [{name:msg,date:date,arr:'失败',id:newData.ticket_id,color:'red'}] // 创建信息
										tach.setData({
											list:tach.data.array
										})
									}
									tach.data.aa = true
								}else {
									let msg2 = res.data.errmsg // 获取错误信息
									if (tach.data.list.length > 0) { // 判断数组长度
										let msgx = tach.data.list[0].id // 获取数组第一个元素
										if (_id !== msgx) { // 判断上一个和当前是否不一样
											tach.data.array = [{name:msg2,date:date,arr:'失败',id:newData.ticket_id,color:'red'}] // 创建信息
											for (let i=0; i<tach.data.list.length; i++) { // 循环源数组
												tach.data.array.push(tach.data.list[i]) // 添加到新的数组
											}
											tach.setData({ // 不一样输出信息
												list:tach.data.array
											})
										}
									}else { // 如果是第一次直接输出
										tach.data.array = [{name:msg2,date:date,arr:'失败',id:newData.ticket_id,color:'red'}] // 创建信息
										tach.setData({
											list:tach.data.array
										})
									}
									tach.data.aa = true
								}
							}
						})
					}
		}
  },

  /**
   * 动画
   */
  dh: function (){
		if (this.data.z < this.data.h-5) {
			this.setData({
				z:this.data.z+=5
			});
			
		}else {
			this.setData({
				z:5
			});
		}
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  upload: function () {
		let tach = this.data
		wx.getSystemInfo({
			success: function(res) {
				tach.h = (res.windowWidth/100)*70
			}
		})
		tach.s = setInterval(this.dh,50)
	
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  dwload: function () {
		clearInterval(this.data.s)
		let innerAudioContext = wx.createInnerAudioContext()
		innerAudioContext.src = '/pages/img/lyq171123.mp3'
		innerAudioContext.onError = function (err) {
			console.log(err)
		}
		innerAudioContext.onEnded = function () {
			console.log('play end')
		}
		innerAudioContext.play()
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
        let newData = {
          ticket_id: res.result,
          device: app.globalData.openId
        }
        wx.request({
          url: app.globalData.contentpath + 'weixin/api/jobs/jobfair/ticket/verify?ticket_id=' + res.result, //仅为示例
          data: newData,
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: "POST",
          success(res) {
            console.log(res.data)
            if (res.data.errcode == 0) {
              wx.navigateTo({
                url: '/pages/job/green?botmtype=1&name=' + res.data.data.user.name // 希望跳转过去的页面
              })
            } else {
              wx.navigateTo({
                url: '/pages/job/red?botmtype=1&errmsg=' + res.data.errmsg // 希望跳转过去的页面
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
    	url: '/pages/job/saoIndex?botmtype=1'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onJobInList: function () {
    wx.navigateTo({
    	url: '/pages/job/saoIndex?botmtype=2'
    })
  }
})