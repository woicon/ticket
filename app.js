//app.js
const base = require('./utils/util.js')
const api = require('./api/api.js')
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
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    console.log("userinfo")
                }
            }
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
    api:api,
    loginSys:function(arg){
        console.log(arg)
        let autoInfo = wx.getStorageSync("autoInfo")
        let userInfo = wx.getStorageSync("userInfo")
        let parmas = {
            headImgUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,//string 是 用户微信昵称
            openId: autoInfo.openId,//string 是 用户微信openid
            unionId: autoInfo.unionId
        }
        let _parmas = Object.assign(parmas,arg)
        api.userReg(_parmas)
            .then(res => {
                console.log(res)
        })
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