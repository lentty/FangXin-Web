//获取应用实例  
var app = getApp();
Page({
  data: {
    brands: [],
    curNav: 1,
    curIndex: 0,
    searchValue: '',
    focus: true,
    inputShowed: false,
    inputVal: "",
    products: [],
    brandId: 0
  },

  onShow: function(){
    var globalBrandId = app.globalData.brandId;
    if (globalBrandId != null && globalBrandId != this.data.brandId){
      this.setCurrentIndex(this.data.brands, globalBrandId);
      this.setData({
        brandId: globalBrandId
      })
      this.loadProducts();
    }
  },

  onLoad: function() {
    this.loadBrands();
  },

  loadBrands: function(){
    var that = this;
    wx.request({
      url: app.data.host + 'brand/list',
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          brands: res.data,
        });
        if (app.globalData.brandId == null) {
          app.globalData.brandId = res.data[0].id
        }
        that.setCurrentIndex(res.data, app.globalData.brandId);
        that.setData({
          brandId: app.globalData.brandId
        })
        that.loadProducts();
      }
    });
  },

  onPullDownRefresh: function () {
    this.loadBrands();
    wx.stopPullDownRefresh();
  },

  switchTab: function(e) {
    var that = this;
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id;
    var index = parseInt(e.target.dataset.index);
    //console.log("e.target.dataset.index is " + e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
    var selectIndex = that.data.brands[that.data.curIndex].id;
    app.globalData.brandId = selectIndex;
    this.setData({
      brandId: selectIndex
    })
    wx.request({
      method: 'GET',
      url: app.globalData.host + "product/list/" + selectIndex,
      success: function (res) {
        that.setData({
          products: res.data
        })
      }
    }); 
  },

  loadProducts: function () {
    var that = this;
    var globalBrandId = app.globalData.brandId;
    this.data.products = [];
    wx.request({
      method: 'GET',
      url: app.globalData.host + "product/list/" + globalBrandId,
      success: function (res) {
        that.setData({
          products: res.data
        })
      }
    });
  },
 
  setCurrentIndex: function(brands, brandId){
    var size = brands.length;
    for(var i = 0; i < size; i++){
      if(brands[i].id == brandId){
        this.setData({
          curNav: brandId,
          curIndex: i
        })
        break;
      }
    }
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
    this.setData({
      inputVal: e.detail.value
    });
  },
  searchValueInput: function(e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },
  doSearch: function() {
    var searchKey = this.data.searchValue;
    this.searchProductData(searchKey);
  },
  searchProductData: function(searchKey) {
    var that = this;
    wx.navigateTo({
      url: '../list/list?key=' + searchKey
    })
  },
  goToSearchPage: function (evt) {
    wx.navigateTo({
      url: '../searchBar/searchBar'
    })
  },
})