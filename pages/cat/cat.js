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

  },

  onShow: function(option){
    //var that = this;
    //console.log(app.globalData.cat_id.target.dataset.key);

    //requert
    //set app.globalData.cat_id.target.dataset.key == null

    

  },

  onLoad: function() {
    var that = this;
    wx.request({
      url: app.data.host + 'brand/list',
      method: 'GET',
      success: function(res) {
        console.log(res.data);
        var brandList = res.data;
        for (var i = 0; i < brandList.length; i++) {
          var catelist = brandList[i].cateList;
          if (catelist) {
            for (var j = 0; j < catelist.length; j++) {
              if (catelist[j].imageSrc) {
                catelist[j].imageSrc = app.globalData.host + catelist[j].imageSrc;
              } else {
                catelist[j].imageSrc = '/images/defaultCate.jpeg';
              }
            }
          }
        }
        that.setData({
          brands: brandList,
        });
      }
    });
    this.loadProducts();
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
    wx.request({
      method: 'GET',
      url: app.globalData.host + "product/list/" + selectIndex,
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
          products: productList
        })
      }
    });
    
  },

  loadProducts: function () {
    var that = this;
    wx.request({
      method: 'GET',
      url: app.globalData.host + "product/list/1",
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
          products: productList
        })
      }
    });
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