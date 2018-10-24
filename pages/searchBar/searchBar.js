// pages/searchBar/searchBar.js


var app = getApp()
Page({
  data: {
    searchValue: '',
    focus: true,
    inputShowed: false,
    inputVal: "",
  },

  onLoad: function() {
    this.loadProducts();
  },

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    console.log(e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  },
  onShow: function() {
    //this.loadProducts();
  },
  loadProducts: function() {
    var that = this;
    wx.request({
      method: 'GET',
      url: app.globalData.host + "product/promotedImages",
      success: function(res) {
        var images = res.data;
        if (images.length != 0) {
          for (var i = 0; i < images.length; i++) {
            images[i].fileLocation = app.globalData.host + images[i].fileLocation;
          }
        } else {
          images = [];
          var image = {
            fileLocation: '/images/defaultProduct.gif'
          };
          images.push(image);
        }
        that.setData({
          promotedIamges: images
        })
      }
    });
    wx.request({
      method: 'GET',
      url: app.globalData.host + "product/promoted",
      success: function(res) {
        var productList = res.data;
        for (var i = 0; i < productList.length; i++) {
          if (productList[i].imageSrc) {
            productList[i].imageSrc = app.globalData.host + productList[i].imageSrc;
          } else {
            productList[i].imageSrc = '/images/test.jpg';
          }
        }
        that.setData({
          promotedProducts: productList
        })
      }
    });
  },

  doSearch: function() {
    var searchKey = this.data.inputVal;
    this.searchProductData(searchKey);
  },
  searchProductData: function(searchKey) {
    var that = this;
    wx.navigateTo({
      url: '../list/list?key=' + searchKey
    })
  }

})