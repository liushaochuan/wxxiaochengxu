// pages/movies/movies.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const top250Url = {url: "/v2/movie/top250" + "?start=0" + "&count=3", headerTitle: "口碑榜", index: 0}; // 口碑榜
    const comingUrl =  {url: "/v2/movie/coming_soon" + "?start=0" + "&count=3", headerTitle: "即将上映", index: 1}; // 即将上映
    const inTheatersUrl =  {url: "/v2/movie/in_theaters" + "?start=0" + "&count=3", headerTitle: "正在热映", index: 2}; // 正在热映
    const urlList = [top250Url, comingUrl, inTheatersUrl]
    urlList.forEach(data => {
      this.getMovieListData(data)
    })
    // this.getMovieListData(top250Url);
    // this.getMovieListData(comingUrl);
    // this.getMovieListData(inTheatersUrl);
  },
  // 请求电影列表
  getMovieListData(data) {
    const that = this;
    const url = app.globalData.baseUrl + data.url
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        res.data.headerTitle = data.headerTitle;
        res.data.index = data.index;
        res.data.url = data.url.split('?')[0]
        that.processData(res.data);
      },
      fail(err) {
        console.log(err)
      },
      complete() {}
    })
  },
  // 数据处理
  processData (data) {
    const movies = [];
    data.subjects.forEach(movie => {
      var title = movie.title.length >= 6 ? movie.title.substring(0,6) + '...' : movie.title
      movie.rating.stars = parseInt(movie.rating.stars)
      movies.push ({
        title,
        coverUrl: movie.images.large,
        movieId: movie.id,
        rating: movie.rating
      })
    });
    var key =  "moviesList[" + data.index + "]"
    this.setData({
      [key] : {movies, headerTitle: data.headerTitle, url: data.url}
    })
    // 对象处理方式
    // var str = 'person.name';
    // this.setData({
    //   [str]: 'fxjzzyo'
    // })
  },
  // 跳转到更多页面
  gotoMore(event) {
    wx.navigateTo({
      url: '/pages/more-movies/more-movies?' + 'url=' + event.target.dataset.url + '&title=' + event.target.dataset.title,
      // success(res) {
      //   console.log(res)
      // },
      // fail(error) {
      //   console.log(error)
      // }
    })
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
  
  }
})