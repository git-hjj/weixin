// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   shopList:[],
   //因为第一次就自增1，所以设置为0；
   pageIndex:0,
   pageSize:20,
   catId:1,
   hasMore:true,
  },
 //自定义封装函数-加载更多
  loadMore:function(){
   if(!this.data.hasMore) return;
    wx.request({
      url:'https://locally.uieee.com/categories/'+this.data.catId +'/shops',
      data:{_limit:this.data.pageSize,_page:++this.data.pageIndex},
      success:(res)=>{
        //console.log(res.data);
        //连接数组，把新的数据拼接起来
        var newList = this.data.shopList.concat(res.data);
        //获取当前已经展示条数
        var count = res.header['x-total-count'];
        var flag = this.data.pageIndex * this.data.pageSize < count ;
        console.log(flag);
        this.setData({
          shopList : newList,
           hasMore : flag
        })
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options);
   if(options.title){ 
       wx.setNavigationBarTitle({
         title: options.title
       })     
   }
   // 把获取的参数设置到data里以便调用
   this.setData({
     catId:options.cat
   })
   
   //调用加载函数
   this.loadMore();

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
    //下拉刷新，把数据设置为默认值
    this.setData({
      shopList:[],
      pageIndex:0,
      hasMore:true
    })
    //重新请求数据
    this.loadMore();
    //记得停止，否则在手机端一直显示加载
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})