const app= getApp();
/**
 * 获取商品列表接口
 * resolve成功回调函数
 */
function getProductList(resolve){
    // wx.request({
    //     url: `${app.globalData.API_URL}/orders.json`,
    //     header: {'content-type':'application/json'},
    //     success: resolve,
    //     fail: ()=>{},
    // });
    wx.cloud.callFunction({
      name:'getProductList',
      success: resolve,
      fail: (err)=>{console.log(err)},
    })
}

/**
 * 商品详情接口
 */
function getProductById(resolve,id){
    wx.request({
        url: `${app.globalData.API_URL}/product/detail.do`,
        data: id,
        header: {'content-type':'application/json'},
        success: resolve,
        fail: ()=>{}
    });
}


module.exports={
    getProductList(resolve){
        return getProductList(resolve);
    },
    getProductById(resolve,id){
        return getProductById(resolve,id);
    }
}