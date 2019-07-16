// components/OderItem/OrderItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    picture:{
      type:String,
      value:'图片'
    },
    product:{
      type:String,
      value:'产品'
    },
    shop:{
      type:String,
      value:'店铺'
    },
    price:{
      type:Number,
      value:20
    },
    ifCommented:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
  _commentEvent:function(){
    this.triggerEvent('commentEvent');
  }
  }
})
