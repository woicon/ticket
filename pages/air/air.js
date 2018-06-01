// pages/air/air.js
const api = require('../../api/api.js')
Page({
    data: {
        dpt: "北京",
        ept: "上海",
        searchData: {
            date: '2018-06-12',
            clientId: "/lItIoqTVIQ=",//wx.getStorageSync("clientId"),
            dstAirportCode: 'PEK', //起飞
            orgAirportCode: 'CTU' //到达
        },
        pageLoading:false
    },
    toggleAir: function () {
        this.setData({
            dpt: this.data.ept,
            ept: this.data.dpt
        })
    },
    onShow: function (options) {

        try {
            let air = wx.getStorageSync("air")

            for (let i in air) {
                console.log(air[i])
                let n = air[i]
                for (let t in n) {
                    if (t == 'dptime' || t == 'eptime') {
                        let s = "fdf"
                        let ars = n[t].split(" ")
                        console.log(ars)
                        n[t] = ars[1]
                    }
                }
            }

            this.setData({
                air: air,
                pageLoading: false
            })

        }catch (error){

        }


    },
    toCity: function () {
        wx.navigateTo({
            url: '/pages/airCity/airCity',
        })
    },
    airSearch: function (e) {
        const parmas = this.data.searchData
        this.setData({
            pageLoading:true
        })
        wx.showLoading({
            title: 'loading',
        })
        api.airSearch(parmas)
            .then(res => {
                console.log(res)
                let air = res.dataList
                
                // for (let i in air) {
                //     console.log(air[i])
                //     let n = air[i]
                //     for (let t in n) {
                //         if (t == 'dptime' || t == 'eptime') {
                //             let s = "fdf"
                //             let ars = n[t].split(" ")
                //             console.log(ars)
                //             n[t] = ars[1]
                //         }
                //     }
                // }
                // console.log(air)
                this.setData({
                    //air: air,
                    pageLoading:false
                })
                wx.setStorageSync('air', air)
                wx.hideLoading()
            })
    },
    onReady: function () {

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