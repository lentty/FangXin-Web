//index.js
//获取应用实例   
const BRAND_PER_PAGE = 10;
var app = getApp()
Page({
  data: {
    promotedIamges: [],
    promotedProducts: [],
    searchValue:'',
    focus: true,
    inputShowed: false,
    inputVal: "",
    brands: [],
    products: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  onLoad: function () {
    this.loadBrands();
    this.loadProducts();
  },

  loadBrands: function(){
    var that = this;
    wx.request({
      method: 'GET',
      url: app.globalData.host + "brand/list",
      success: function (res) {  
        var brandData = res.data;
        var size = brandData.length;
        var pages = Math.ceil(size / BRAND_PER_PAGE);
        var arrays = new Array();
        for (var i = 0; i < pages; i++){
          arrays[i] = new Array();
          for (var j = 0; j < BRAND_PER_PAGE; j++){
            if (i * BRAND_PER_PAGE + j < size){
              arrays[i][j] = brandData[i * BRAND_PER_PAGE + j];
            }
          }
        }
        that.setData({
          brands: arrays
        })
      }
    });
  },

  goToSearchPage: function(evt) {
    wx.navigateTo({
      url: '../searchBar/searchBar'
    })
  },

  onBrandImageClick: function(event) {
    app.globalData.brandId = event.target.dataset.brandid;
    wx.switchTab({
      url: '../cat/cat'
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onShow: function(){
    //this.loadProducts();
  },
  loadProducts: function(){
    var that = this;
    wx.request({
      method: 'GET',
      url: app.globalData.host + "product/promoted",
      success: function (res) {
        var productList = res.data;
        for (var i = 0; i < productList.length; i++) {
          if (productList[i].imageSrc) {
            productList[i].imageSrc = app.globalData.host + productList[i].imageSrc;
          } else {
            productList[i].imageSrc = '/images/defaultCate.jpeg';
          }
        }
        that.setData({
          promotedProducts: productList
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


