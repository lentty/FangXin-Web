//获取应用实例  
var app = getApp();
Page({
  data: {
    shoppingList: [],
    total: 0,
    isSelectAll: true
  },
  onLoad: function(options) {
    console.log('on Load');
    this.loadProducts();
  },
  loadProducts: function() {
    var that = this;
    wx.request({
      url: app.data.host + 'shoppingCart/list/1',
      method: 'GET',
      success: function(res) {
        console.log(res.data);
        that.setData({
          shoppingList: res.data
        });
        that.sum();
      }
    });
  },
  switchSelect: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.shoppingList[index].selected;
    var list = this.data.shoppingList;
    // 对勾选状态取反
    list[index].selected = !selected;
    // 写回经点击修改后的数组
    var selectedAllStatus = true;
    for (var i = 0; i < list.length; i++) {
      if (!list[i].selected) {
        selectedAllStatus = false;
        break;
      }
    }
    this.setData({
      shoppingList: list,
      isSelectAll: selectedAllStatus,
    });
    this.sum();
  },
  sum: function() {
    var list = this.data.shoppingList;
    // 计算总金额
    var totalMoney = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].selected) {
        totalMoney += list[i].amount * list[i].product.retailPrice;
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      total: totalMoney.toFixed(2)
    });
  },
  bindSelectAll: function() {
    // 环境中目前已选状态
    var selectedAllStatus = this.data.isSelectAll;
    // 取反操作
    selectedAllStatus = !selectedAllStatus;
    // 购物车数据，关键是处理selected值
    var list = this.data.shoppingList;
    // 遍历
    for (var i = 0; i < list.length; i++) {
      list[i].selected = selectedAllStatus;
    }
    this.setData({
      shoppingList: list,
      isSelectAll: selectedAllStatus,
    });
    this.sum()
  },
  changeNum: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var list = this.data.shoppingList;
    if (e.target.dataset.alphaBeta == 0) {
      if (list[index].amount <= 1) {
        list[index].amount = 1;
      } else {
        list[index].amount--;
      };
    } else {
      list[index].amount++;
    }
    this.setData({
      shoppingList: list
    });
    this.sum();
  },
  bindDelete: function(e) {
    var that = this;
    var itemId = parseInt(e.currentTarget.dataset.id);
    var list = this.data.shoppingList;
    wx.request({
      url: app.data.host + 'shoppingCart/' + itemId,
      method: 'DELETE',
      success: function(res) {
        console.log('res' + res.data);
        if (res.data) {
          var newList = [];
          for (var i = 0; i < list.length; i++) {
            if (itemId != list[i].id) {
              newList.push(list[i]);
            }
          }
          console.log('new list' + newList);
          that.setData({
            shoppingList: newList
          });
          that.sum();
        }
      }
    });
  },
  onHide: function() {
    console.log('on hide');
  },
  onUnload: function() {
    console.log('on unload');
  },
  onShow: function() {
    console.log('on show');
    this.loadProducts();
  },

  accountOrder: function() {
    wx.showModal({
      title: '提示',
      content: '请拨打电话确认订单123456789',
    })
  },

  deleteCartItem: function() {
    wx.showModal({
      title: '提示',
      content: '移除所选商品？',
      success: function (res) {
        if (res.confirm) {
          this.batchDelete();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }  
    })
  }

})