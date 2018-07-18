const app = getApp()
const base = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({
    data: {

    },

    onLoad: function (options) {
        try {
            let UserInfo = wx.getStorageSync("userInfo")
            
            this.setData({
                userInfo: UserInfo,
                isReg:wx.getStorageSync("isReg")
            })
        } catch (error) {
            console.log("error::::", error)
        }
        wx.setNavigationBarTitle({
            title: '个人中心',
        })
    },
    
    getUserInfo: function (e) {
        console.log(e.detail)
        const userInfo = e.detail
        wx.setStorageSync("userInfo", e.detail.userInfo)
        const authInfo = wx.getStorageSync("authInfo")
        const parmas = {
            iv: userInfo.iv,
            encryptedData: userInfo.encryptedData,
            sessionKey: authInfo.session_key
        }
        api.wxencryptedData(parmas)
            .then((res) => {
                console.log(res)
            })
        this.setData({
            userInfo: e.detail.userInfo
        })
    },
    onReady: function () {

    },

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