// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const messages = this.data.messages
    for (var i = 0;i<18;i++) {
      messages.push({
        title: '免费送票！',
        date: i + ' June',
        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564372688678&di=a3bd1149f39a8fc5de83e2aafa77c888&imgtype=0&src=http%3A%2F%2Fimg.travelstimes.com%2F14%2Fa5%2F72%2F5e%2F14a5725e0b45c36ed65c6f5e5c0e3bef.jpg',
        summary: '欢乐谷门票领取'
      })
    }
    this.setData({ messages })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const query = wx.createSelectorQuery()
    query.select('#bottom').boundingClientRect()
    query.exec(res => wx.pageScrollTo({ scrollTop: res[0].top + 200 }))
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

  }
})