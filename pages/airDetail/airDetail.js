// pages/airDetail/airDetail.js
const api = require('../../api/api.js')
Page({

    data: {
        imgUrl: 'http://pic.c-ctrip.com/flight_intl/airline_logo/40x35/',
        week: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    },

    onLoad: function (options) {
        let parmas = {
            flightId: wx.getStorageSync("flightId"),
            clientId: wx.getStorageSync("clientId")
        }
        api.airFlightDetail(parmas).then(res => {
            console.log(res)
            if (res.getStatus) {
                let air = res.dataList
                let dptime = air.dptime.split(' ')
                let eptime = air.eptime.split(' ')
                console.log(dptime)
                air.dptime = dptime[1]
                air.eptime = eptime[1]
                let airDate = new Date(wx.getStorageSync("airDate"))
                let dateWeek = airDate.getDay()
                this.setData({
                    air: air,
                    airDate: wx.getStorageSync("airDate"),
                    dateWeek: dateWeek
                })
            } else {
                this.setData({
                    empty: res.errorMsg
                })
            }
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