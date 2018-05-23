// pages/air/air.js
const api = require('../../api/api.js')
Page({
    data: {
        dpt: "北京",
        ept: "上海"
    },
    toggleAir:function(){
        this.setData({
            dpt:this.data.ept,
            ept: this.data.dpt
        })
    },
    onLoad: function (options) {
        //获取城市二字码
        api.getAirCity()
            .then(res => {
                console.log(res)
                this.setData({
                    city: res.dataList
                })
            })
    },
    toCity: function () {
        wx.navigateTo({
            url: '/pages/airCity/airCity',
        })
    },
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})