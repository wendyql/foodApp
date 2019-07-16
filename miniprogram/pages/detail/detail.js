// pages/detail/detail.js
const api = require('../../utils/api.js');
const util = require('../../utils/util');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    common_value: '',
    ratevalue: 5,
    pic: null,
    fileID: null,
    commonLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const product = wx.getStorageSync('product');
    //console.log(`product:${JSON.stringify(product)}`);
    this.setData({
      product
    });
    this.getCommon();
  },

  getCommon: function () {
    const db = wx.cloud.database();
    db.collection('common').get().then(res => {
      console.log(res);
      this.setData({
        commonLists: res.data
      });
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 评论
   */
  onCommonChange: function (event) {

    this.setData({
      common_value: event.detail
    });
    //console.log(this.data.common_value);
  },

  /**
   * 评分
   */
  onRateChange: function (event) {
    this.setData({
      ratevalue: event.detail
    })
  },

  /**
   * 上传图片
   */
  uploadFilePic: function () {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          pic: tempFilePaths[0]
        })
        wx.showLoading({
          title: '上传中...',
        })
        wx.cloud.uploadFile({
          cloudPath: `${new Date().getTime()}.png`, // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            that.setData({
              fileID: res.fileID
            });
            wx.hideLoading();
          },
          fail: console.error
        })
      }
    })

  },

  /**
   * 提交评论
   */
  onConfirmCommon: function () {
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '提示信息',
        content: '您还没有登录，请在我的模块登录',
      })
      return;
    }

    const db = wx.cloud.database();
    wx.showLoading({
      title: '加载中...',
    })

    db.collection('common').add({
      data: {
        content: this.data.common_value,
        rate: this.data.ratevalue,
        fileId: this.data.fileID,
        time: util.formatTime(new Date()),
        user: app.globalData.userInfo.nickName
      }
    }).then(res => {
      console.log(res);
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })

    this.getCommon();

  },



  /**
   * 加入购物车
   */
  addCartClick: function () {
    //购物车集合
    const carts = wx.getStorageSync('cartStorage') || [];
    const product = this.data.product;

    //判断商品是否已经添加到购物车中
    const cartProduct = carts.filter(item => item.id === product.id)[0];
    if (cartProduct === null || typeof (cartProduct) === 'undefined') {
      //添加商品到购物车
      const cartItem = {
        id: product.id,
        picture: product.picture,
        productName: product.product,
        price: product.price,
        number: 1
      }
      carts.push(cartItem);
    } else {
      cartProduct.number = cartProduct.number + 1;
    }

    //购物车数据缓存
    wx.setStorage({
      key: 'cartStorage',
      data: carts
    });
    wx.showToast({
      title: '添加成功',
      duration: 1500,
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

  }
})