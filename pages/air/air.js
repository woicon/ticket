// pages/air/air.js
const api = require('../../api/api.js')
Page({
    data: {
        dpt: "北京",
        ept: "成都",
        filterTime: ['从早到晚', '从晚到早'],
        filterPrice: ['从低到高', '从高到低'],
        currentPrice: null,
        currentTime: null,
        imgUrl: 'http://pic.c-ctrip.com/flight_intl/airline_logo/40x35/',
        searchData: {
            date: '2018-07-14',
            clientId: "/lItIoqTVIQ=",//wx.getStorageSync("clientId"),
            dstAirportCode: 'PEK', //起飞
            orgAirportCode: 'CTU' //到达
        },
        pageLoading: false,
        currentAirLine: 0,
        airLineStatus: false
    },
    filterAir: function (e) {
        console.log(e)

        switch (e.currentTarget.id) {
            case 'price':
                let currst = this.data.currentPrice
                this.setData({
                    currentPrice: currst < 1 ? (currst + 1) : 0
                })
                break
            case 'date':
                // let times = this.data.filterTime.length - 1
                let currs = this.data.currentTime
                this.setData({
                    currentTime: currs < 1 ? (currs + 1) : 0
                })
                break
            case 'airline':
                let status = this.data.airLineStatus
                this.animation.rotate(45).scale(2, 2).step()

                this.setData({
                    airLineStatus: !status,
                    animationData: this.animation.export()
                })
                break
        }

    },
    toggleAir: function () {
        this.setData({
            dpt: this.data.ept,
            ept: this.data.dpt
        })
    },
    toDatePicker:function(){
        wx.navigateTo({
            url: '/pages/datePicker/datePicker',
        })
    },
    onShow: function (options) {
        var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
        })
        wx.setStorageSync('clientId','/lItIoqTVIQ=')
        try {
            let air = wx.getStorageSync("air")
            let airline = wx.getStorageSync("airline")
            //时间处理
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
            // for(let n in air){
            //     let item = air[n]
            //     let airline = { 
            //         airlineName: item.airlineName,
            //         alcode: item.alcode
            //     }
            //     let st = flight[n - 1]

            //     // if (flight[n - 1].alcode != airline.alcode){
            //     //     flight.push(airline)
            //     // }
            //     flight.push(airline)
            //     console.log(flight.pop(),":::",airline)
            //     //let ss = Object.assign({}, flight[n - 1]||{},airline)
            //     //console.log(ss)
            //     //flight[n]=ss
            // }
            this.setData({
                air: air,
                pageLoading: false,
                airLine: airline
            })

        } catch (error) {
            console.log(error)
        }
    },
    toggleAirLine: function (e) {
        console.log(e)

        let air = wx.getStorageSync("air")
        let newAir = []
        for (let i in air) {
            if (air[i].alcode == e.target.dataset.id) {
                newAir.push(air[i])
            }
        }

        console.log(newAir)
        this.setData({
            currentAirLine: e.target.dataset.index,
            air: newAir,
            airLineStatus: false,
        })

    },

    toCity: function (e) {
        wx.navigateTo({
            url: `/pages/airCity/airCity?title=${e.currentTarget.dataset.tip}`,
        })
    },
    filterCompany: function () {

    },
    airSearch: function () {
        const parmas = this.data.searchData
        this.setData({
            pageLoading: true
        })
        wx.showLoading({
            title: 'loading',
        })
        api.airSearch(parmas, 'POST', 'application/x-www-form-urlencoded')
            .then(res => {
                console.log(res)
                let air = res.dataList

                //时间处理
                for (let i in air) {
                    console.log(air[i])
                    let n = air[i]
                    for (let t in n) {
                        if (t == 'dptime' || t == 'eptime') {
                            let ars = n[t].split(" ")
                            console.log(ars)
                            n[t] = ars[1]
                        }
                    }
                }
                //航司选择
                var airline = []
                for (let s in air) {
                    let status = true
                    for (let i in airline) {
                        if (airline[i].alcode == air[s].alcode) {
                            status = false
                        }
                    }
                    if (status) {
                        airline.push({
                            airlineName: air[s].airlineName,
                            alcode: air[s].alcode
                        })
                    }
                }
                airline.unshift({
                    airlineName: "全部航空公司"
                })
                this.setData({
                    air: air,
                    pageLoading: false,
                    airLine: airline
                })
                wx.setStorageSync('air', air)
                wx.setStorageSync("airline", airline)
                wx.hideLoading()
            })
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '国内机票查询',
        })
    },
    goDetail: function (e) {
        console.log(e)
        wx.setStorageSync("airDetail", this.data.air[e.currentTarget.dataset.index])
        wx.setStorageSync("airDate", this.data.searchData.date)
        wx.setStorageSync("airDetail", this.data.air[e.currentTarget.dataset.index])
        wx.setStorageSync("flightId",e.currentTarget.id)
        wx.navigateTo({
            url: '/pages/airDetail/airDetail',
        })
    },
    onHide: function () {

    },
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