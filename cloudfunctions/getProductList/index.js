// 云函数入口函数
const list = [{
  "id": 1,
  "shop": "张姐烤肉饭脆皮饭",
  "picture": "https://fuss10.elemecdn.com/0/85/8c35871b76aee22028071ab5f946ejpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/",
  "product": "黑椒脆皮鸡+时蔬+米饭",
  "price": "18",
  "ifCommented": false
},
{
  "id": 2,
  "shop": "和风食堂(万达店)",
  "picture": "https://fuss10.elemecdn.com/8/38/64d61e8602fa655ae5e91e782a014jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
  "product": "照烧猪排饭套餐",
  "price": "25",
  "ifCommented": false
},
{
  "id": 3,
  "shop": "三个先森的韩国炸鸡(茶南店)",
  "picture": "https://fuss10.elemecdn.com/8/23/95c7071dab35af98d4d98330e2addjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
  "product": "辣味往事炸鸡中份",
  "price": "27",
  "ifCommented": true
},
{
  "id": 4,
  "shop": "必胜客宅急送（南京南湖店）",
  "picture": "https://fuss10.elemecdn.com/a/05/a080fb38089da473d9c1738047a69jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
  "product": "超级至尊比萨S[芝心]",
  "price": "94",
  "ifCommented": false
},
{
  "id": 6,
  "shop": "陈记状元拌面（集庆门大街店）",
  "picture": "https://fuss10.elemecdn.com/b/10/2803c97d60ce45c490c773e064ca8jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
  "product": "黑椒牛肉状元面",
  "price": "38",
  "ifCommented": true
},
{
  "id": 7,
  "shop": "丽塔丝烤猪蹄（狮子桥）",
  "picture": "https://fuss10.elemecdn.com/7/9a/203d94b035b3e2fa6b0f13aba5964jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
  "product": "招牌烤猪蹄",
  "price": "25",
  "ifCommented": false
},
{
  "id": 8,
  "shop": "老妈烫饭(新街口店)",
  "picture": "https://fuss10.elemecdn.com/e/82/c98fec55c30021b85ab608718b66ajpeg.jpeg?imageMogr/format/webp/thumbnail/240x/",
  "product": "酸菜肥牛烫饭",
  "price": "35",
  "ifCommented": true
},
{
  "id": 9,
  "shop": "潘记粥铺",
  "picture": "https://fuss10.elemecdn.com/4/de/77ac131935dc594db4b658b8c3d23jpeg.jpeg?imageMogr/format/webp/thumbnail/240x/",
  "product": "皮蛋鸡丝粥",
  "price": "16",
  "ifCommented": true
},
{
  "id": 10,
  "shop": "七星椒菜馆",
  "picture": "https://fuss10.elemecdn.com/0/73/64ed45043082e410abad6f18ce0aajpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
  "product": "酸菜鱼",
  "price": "28",
  "ifCommented": false
}

]
exports.main = async (event, context) => {
  return list;
}