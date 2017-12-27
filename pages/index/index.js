//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    promotedIamges: [],
    promotedProducts: [],
    searchValue:'',
    focus: true
  },
  onLoad: function () {
    this.loadProducts();
  },
  onShow: function(){
    this.loadProducts();
  },
  loadProducts: function(){
    var that = this;
    wx.request({
      method: 'GET',
      url: "http://localhost:8080/product/promotedImages",
      success: function (res) {
        console.log('promotedImages' + res.data);
        that.setData({
          promotedIamges: res.data
        })
      }
    });
    wx.request({
      method: 'GET',
      url: "http://localhost:8080/product/promoted",
      success: function (res) {
        console.log('promoted' + res.data);
        that.setData({
          promotedProducts: res.data
        })
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
    this.searchProductData(searchKey);
  },
  searchProductData: function (searchKey) {
    var that = this;
    wx.navigateTo({
      url: '../list/list?key=' + searchKey
    })
  }

})


