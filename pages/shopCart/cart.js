//获取应用实例  
var app = getApp();
Page({
  data: {
    shoppingList: [],
    total: 0,
    isSelectAll: true,
    isButtonDisabled: false,
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
      success: function (res) {
        var shoppingList = res.data;
        for (var i = 0; i < shoppingList.length; i++) {
          if (shoppingList[i].product.imageSrc) {
            shoppingList[i].imageSrc = app.globalData.host + shoppingList[i].product.imageSrc;
          } else {
            shoppingList[i].imageSrc = '/images/defaultProduct.jpeg';
          }
        }
        that.setData({
          shoppingList: shoppingList
        })
        //console.log(shoppingList);
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
    var buttonDisabled = false;
    if (list.length === 0) {
      buttonDisabled = true;
    }
    for (var i = 0; i < list.length; i++) {
      if (list[i].selected) {
        totalMoney += list[i].amount * list[i].product.retailPrice;
      }
    }
    console.log("total money:" + totalMoney);
    if (totalMoney === 0) {
      console.log("in my method");
      buttonDisabled = true;
    }
    // 写回经点击修改后的数组
    this.setData({
      total: totalMoney.toFixed(2),
      isButtonDisabled: buttonDisabled
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
  bindDelete: function(itemId) {
    var that = this;
    //var itemId = parseInt(e.currentTarget.dataset.id);
    var list = this.data.shoppingList;
    wx.request({
      url: app.data.host + 'shoppingCart/' + itemId,
      method: 'DELETE',
      success: function(res) {
        console.log('res' + res.data);
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
      showCancel: false,
      content: 'App价格为零售价, 购买和咨询团购价请拨打13101210006, 可以享受更多优惠哦！配送限重庆地区',
    })
  },

  deleteCartItem: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '移除所选商品？',
      success: function(res) {
        if (res.confirm) {
          that.batchDelete();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  batchDelete: function() {
    var that=this;
    var list = this.data.shoppingList;
    // 计算总金额
    var newList = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].selected) {
        this.bindDelete(list[i].id);
      }else{
        newList.push(list[i]);
      }
    }

    // 写回经点击修改后的数组
    console.log('new list' + newList);
    that.setData({
      shoppingList: newList
    });
    this.sum();

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

  }

})