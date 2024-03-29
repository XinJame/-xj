const fetch = require('../../utils/fetch')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: null,
    shops: [],
    pageIndex: 0,
    pageSize: 20,
    hasMore: true
  },


  loadMore() {
    

    let{ pageIndex,pageSize,searchText } = this.data
    const params = { _page: ++pageIndex , _limit:pageSize}
    if (searchText) params.q = searchText
    return fetch(`categories/${this.data.category.id}/shops`, params)
    .then(res => {
      const totalCount = parseInt(res.header['X-Total-Count'])
      const hasMore = pageIndex * pageSize < totalCount
      const shops = this.data.shops.concat(res.data)
      this.setData({shops,pageIndex,hasMore})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`categories/${options.cat}`)
      .then(res => {
        this.setData({ category: res.data })
        wx.setNavigationBarTitle({ title: res.data.name })

        this.loadMore()
      })
  },

  onPullDownRefresh: function(){
    this.setData({
      shops: [],
      pageIndex: 0,
      hasMore: true
    })
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    // 判断是否正在加载

    this.loadMore()
  },

  searchHandle () {
    // console.log(this.data.searchText)
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore()
  },

  showSearchHandle () {
    this.setData({ searchShowed: true })
  },
  hideSearchHandle () {
    this.setData({ searchText: '', searchShowed: false })
  },
  clearSearchHandle () {
    this.setData({ searchText: '' })
  },
  searchChangeHandle (e) {
    console.log(e)
    this.setData({ searchText: e.detail.value })
  }

})

