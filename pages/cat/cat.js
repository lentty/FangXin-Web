//获取应用实例  
var app = getApp();
Page({
  data: {
     brands: [],
     curNav: 1,
     curIndex: 0,
     searchValue: ''
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/brand/list',
      method: 'GET',
      success: function (res) {
        console.log(res.data);
          that.setData({
            brands: res.data,
          });
      }
    });
  },

  switchTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
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