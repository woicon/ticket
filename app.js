//app.js
const base = require('./utils/util.js')
const api = require('./api/api.js')
console.log(api)
App({
    onLaunch: function (options) {

        let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
        //console.log(extConfig)
        this.ext = extConfig
        wx.setStorageSync("ext", extConfig)
        api.getSupplierInfo().then(res => {
            console.log(res)
            wx.setStorage({
                key: 'supplierInfo',
                data: res.dataList,
            })
        })
        
        this.login()
    },
    login: function () {
        wx.login({
            success: res => {
                console.log(res)
                const parmas = {
                    authType: 'wx',
                    jsCode: res.code
                }
                api.getAuthInfo(parmas)

                    .then(res => {
                        console.log(res)
                        wx.setStorageSync("authInfo", res.dataList)
                        this.getUserIsReg()
                    })
            }
        })
    },
    globalData: {
        userInfo: null
    },
    //检测是否注册
    getUserIsReg: function () {
        try {
            let authInfo = wx.getStorageSync("authInfo")
            let parmas = {
                openId: authInfo.openid,
                unionid: authInfo.unionid
            }
            api.getUserIsReg(parmas)
                .then(res => {
                    console.log("isReg:::",res)
                    wx.setStorageSync("isReg", res.dataList.isReg)
                    wx.setStorageSync("clientId", res.dataList.clientId)
                })
        } catch (err) {
            console.log(err)
        }
    }
})