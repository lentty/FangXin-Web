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
      url: 'http://localhost:8080/product/list/' + cat_id,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          products: res.data,
        });
      }
    });
  },
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },
  doSearch: function () {
    var searchKey = this.data.searchValue;
    this.searchDataByKey(searchKey);
  },
  searchDataByKey: function(searchKey){
    var that = this;
    wx.request({
      url: 'http://localhost:8080/product/search/'+ searchKey,
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