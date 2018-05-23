//app.js
const base = require('./utils/util.js')
const api = require('./api/api.js')
console.log(api)
App({
    onLaunch: function (options) {
     
        let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
        //console.log(extConfig)
        this.ext = extConfig
        wx.setStorageSync("ext",extConfig)
        api.getSupplierInfo().then(res => {
            console.log(res)
            wx.setStorage({
                key: 'supplierInfo',
                data: res.dataList,
            })
        })
        this.login()
    },
    login:function(){
        wx.login({
            success:res=>{
                console.log(res)
                const parmas = {
                    authType:'wx',
                    jsCode:res.code
                }
                api.getAuthInfo(parmas)
                .then(res=>{
                    console.log(res)
                    wx.setStorageSync("authInfo", res.dataList)
                })
            }
        })
    },
    globalData: {
        userInfo: null
    }
})