// pages/airDetail/airDetail.js
Page({

    data: {

    },

    onLoad: function (options) {
        let air = wx.getStorageSync("airDetail")
        this.setData({
            air:air
        })

    },

    onReady: function () {

    },

    onShow: function () {

    },

    onHide: function () {

    },
    onUnload: function () {

    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },

    onShareAppMessage: function () {

    }
})