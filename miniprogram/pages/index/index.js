//Page Object
const api=require('../../utils/api');
const app= getApp();
const util = require('../../utils/util');
//const foodAPI=require('../../utils/foodapi.js');

Page({
  data: {
    imgUrls: [
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=321213877,414526045&fm=26&gp=0.jpg',
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cur:"#f40",
    list: []
  },


  //options(Object)
  onLoad: function (options) {
    
    api.getProductList(res=>{
      console.log(res);
      this.setData({
        list:res.result
      });
    })
    // foodAPI.getTodayMovie(res => {
    //   console.log(res.data);
    //   this.setData({
    //     movieLists: res.data.result
    //   });
    // });
  },

/**
* 进入商品详情页
*/
onProductDetailHandler:function(event){
const productId=event.target.dataset.id;
const productList=[...this.data.list];
const product = productList.filter(item=>{
  if(item.id===productId){
    return item;
  }
});

//缓存商品数据
wx.setStorageSync('product', product[0]);
//跳转到商品详情页
wx.navigateTo({
  url: '../detail/detail',
});
},

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();

    api.getProductList(res=>{
      this.setData({
        list: res.data
      });
      //停止导航加载进度并停止下拉刷新
      setTimeout(function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }, 2000)
    });
  },
    /**
   * 上拉加载更多
   */
  onReachBottom: function () {
    wx.showLoading();

    api.getProductList(res=>{   
        const newList=res.data;
        const list=[...this.data.list,...newList];
        // 数据请求成功
        this.setData({list});
        //停止导航加载进度并停止下拉刷新
        setTimeout(function () {
          wx.hideLoading();
        }, 2000)
    });
  },


  
});