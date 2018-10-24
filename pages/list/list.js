//获取应用实例  
var app = getApp();
Page({
  data: {
    products: [],
    searchValue: ''
  },

  onLoad: function (options) {
    var cat_id = options.cat_id;
    var searchKey = options.key;
    console.log("cat id is " + cat_id);
    console.log("search key is " + searchKey);
    if(cat_id){
      this.getDataByCatId(cat_id);
    }else if(searchKey){
      this.setData({
        searchValue: searchKey
      })
      this.searchDataByKey(searchKey);
    }  
  },
  getDataByCatId: function(cat_id){
    var that = this;
    wx.request({
      url: app.data.host+'product/list/' + cat_id,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        var productList = res.data;
        for (var i = 0; i < productList.length; i++) {
          if (productList[i].imageSrc) {
            productList[i].imageSrc = app.globalData.host + productList[i].imageSrc;
          }else {
            productList[i].imageSrc = '/images/defaultCate.jpeg';
          }
        }
        that.setData({
          products: res.data,
        });
      }
    });
  },
  
  goToSearchPage: function (evt) {
    wx.navigateTo({
      url: '../searchBar/searchBar'
    })
  },
  searchDataByKey: function(searchKey){
    var that = this;
    wx.request({
      url: app.data.host + 'product/search/'+ searchKey,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('product'+ res);
        that.setData({
          products: res.data,
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  }


})