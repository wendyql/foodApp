// pages/carts/carts.js
const _arrayProvince = ["海外", "北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "台湾省", "香港特别行政区", "澳门特别行政区"];
const _citiyLists = ["石家庄市", "邯郸市", "唐山市", "保定市 ", "秦皇岛市", "邢台市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市", "辛集市", "晋州市", "新乐市", "遵化市", "迁安市", "霸州市", "三河市", "定州市", "涿州市", "安国市", "高碑店市", "泊头市"]
const _countiyLists = ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "滨海新区", "宁河区", "静海区", "蓟州区"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartLists: [],
    amount: 0,
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const carts = wx.getStorageSync('cartStorage') || [];
    this.setData({
      cartLists: carts,
    })
    this.changeAmount();


    //缓存里添加收货地址
    const detailAddress = wx.getStorageSync('detailAddress');
    const receiverMobile = wx.getStorageSync('receiverMobile');
    const receiverName = wx.getStorageSync('receiverName');
    const currentIndex = wx.getStorageSync('currentProvinceCityCountyIndex');

    this.setData({
      address: {
        detailAddress: detailAddress,
        receiveName: receiverName,
        receiveMobile: receiverMobile,
        currentProvinceCityCounty: `${_arrayProvince[currentIndex[0]]} ${_citiyLists[currentIndex[1]]} ${_countiyLists[currentIndex[2]]}`
      }
    })
  },


  /**
   * 添加数量
   */
  addQuantity: function (event) {
    const id = event.currentTarget.dataset.id;
    this.onchangeNumber(id, '+');
  },

  /**
   * 
   * 减数量
   */
  minusQuantity: function (event) {
    const id = event.currentTarget.dataset.id;
    this.onchangeNumber(id, '-');
  },

  /**
   * 数量输入框转变
   */
  bindChangeQuantity: function (event) {
    const id = event.currentTarget.dataset.id;
    const inputValue = event.detail.value; //接收键盘输入值
    const cartLists = [...this.data.cartLists];
    const cartItem = cartLists.filter(item => item.id === id)[0];
    cartItem.number = inputValue;
    this.setData({
      cartLists
    });

    //写入数据缓存
    wx.setStorage({
      key: 'cartStorage',
      data: cartLists,
    });
    this.changeAmount();
  },


  /**
   * 更改总价
   */
  changeAmount: function () {
    const carts = wx.getStorageSync('cartStorage') || [];
    let amount = 0; //总价
    carts.forEach(item => {
      amount = amount + item.price * item.number;

    });

    this.setData({
      amount
    })
  },




  /**
   * 
   * 封装
   */
  onchangeNumber: function (_id, opt) {
    const id = _id;
    const cartLists = [...this.data.cartLists];
    const cartItem = cartLists.filter(item => item.id === id)[0];
    console.log(`cartItem: ${JSON.stringify(cartItem)}`);
    if (opt === '+') {
      cartItem.number++;
    } else if (cartItem.number-- === 1) {
      cartItem.number = 1
    }

    this.setData({
      cartLists
    });

    //写入数据缓存
    wx.setStorage({
      key: 'cartStorage',
      data: cartLists
    });
    this.changeAmount();
  },


  /**
   * 清除购物车购物项
   */
  onDeleteHandeler: function (event) {
    let that = this;
    const index = event.currentTarget.dataset.index;
    wx.showModal({
      title: '删除提示',
      content: '确定要移除购物项吗?',
      success: res => {
        if (res.confirm) {
          let cartLists = [...this.data.cartLists];
          cartLists.splice(index, 1);

          //更新界面数据
          this.setData({
            cartLists
          });

          wx.setStorageSync('cartStorage', cartLists);
          this.changeAmount();
        } else if (res.cancel) {
          //取消
        }
      }
    })
  },
  bindTapAddress: function () {
    wx.navigateTo({
      url: '../address/address'
    });
  },
  

  /**
   * 去支付
   */
  bindBilling:function(){
    wx.showModal({
      title: '支付',
      content: '支付成功',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.removeStorageSync('cartStorage');
          //更新界面数据
          this.setData({
            cartLists:[],
            amount:0
          });
        }
      },
    })
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