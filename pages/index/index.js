//index.js
//获取应用实例
const app = getApp()
const base = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    getPhoneNumber:function(e){
        console.log(e)
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onShow: function () {
       
    },
    onLoad: function () {

    },
    getUserInfo: function (e) {

    }
})
