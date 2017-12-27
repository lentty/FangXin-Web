//获取应用实例  
var app = getApp();
Page({
  data: {
    product: [],
    isOpen: false,
    isShow: false,
    buynum: 1,
    userId: 1
  },

  onLoad: function (options) {
    var product_id = options.productId;
    var that = this;
    wx.request({
      url: 'http://localhost:8080/product/' + product_id,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          product: res.data,
        });
      }
    });
  },

  kindToggle: function (e) {
    var status = e.currentTarget.dataset.status;
    this.setData({
      isOpen: !status
    });
  },

  isShow: function () {
    this.setData({
      isShow: true
    })
  },
  isClose: function () {
    this.setData({
      isShow: false
    })
  },
  toastTap: function (e) {
    var that = this;
    console.log(that.data);
    wx.request({
      url: 'http://localhost:8080/shoppingCart', 
      method: 'POST',
      data: {
        userId: that.data.userId,
        productId: that.data.product.id,
        amount: that.data.buynum
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        if(res.data == 1){
          wx.showToast({
            title: "加入购物车成功",
            icon: 'success',
            duration: 2000
          });
          that.setData({
            isShow: false
          })
        }
      }
    });
  },
  changeNum: function (e) {
    var that = this;
    if (e.target.dataset.alphaBeta == 0) {
      if (this.data.buynum <= 1) {
        buynum: 1
      } else {
        this.setData({
          buynum: this.data.buynum - 1
        })
      };
    } else {
      this.setData({
        buynum: this.data.buynum + 1
      })
    };
  }
})