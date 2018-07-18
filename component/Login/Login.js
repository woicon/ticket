// component/Login/Login.js
Component({
    properties: {
        loginParmas: {
            type: Object,
            value: {
                code:"3", //string 是 手机验证码 1234
                headImgUrl:"3" ,//string 是 可为空 用户微信头像
                mobile: "3",//string 是 注册手机号码 18911110000
                nickName: "3",//string 是 用户微信昵称
                openId: "2",//string 是 用户微信openid
                // sign	string	是	request key从小到大排序 排除sign节点 value值进行md5()		
                // retailId	string	是	ext_json节点下的ext节点中的retailId		
                // retailCode	string	是	ext_json节点下的ext节点中的retailCode		
                unionId:"45"
            },
        }
    },

    data: {
        formData:{},
    },
    attached:function(options){
        const api = require('../../api/api.js')
        this.setData({
            api:api
        })
    },
    methods: {
        inputValue:function(e){
            console.log(this.data)
            console.log(e)
            let formData = this.data.formData
            formData[e.target.id] = e.detail.value
            this.setData(formData)
        },
        loginSubmit:function(e){
            console.log(e)
        },
        getUserInfo: function (e) {
            const api = this.data.api
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
        getCode:function(e){
            const api = this.data.api
            // let parmas = {
            //     mobile:,
            //     openId:,
            // }
        },
        login: function (e) {
            const api = this.data.api 
            var myEventOption = {
            } // 触发事件的选项
            var loginDetail = {}
            var formData = this.data.formData
            if (formData.mobile == '' || !formData.mobile){
                wx.showToast({
                    title: '请输入手机号',
                    icon:"none"
                })
            } else if (formData.code == '' || !formData.code){
                wx.showToast({
                    title: '请输入验证码',
                    icon: "none"
                })
            } else{
                let authInfo = wx.getStorageSync("authInfo")
                let userInfo = wx.getStorageSync("userInfo")
                let parmas = {
                    headImgUrl: userInfo.avatarUrl,
                    nickName: userInfo.nickName,
                    openId: authInfo.openid,
                    unionId: authInfo.unionid
                }
                let _parmas = Object.assign(parmas, formData)
                api.userReg(_parmas)
                    .then(res => {
                        console.log(res)
                        loginDetail = res.dataList
                        wx.setStorageSync("clientId", loginDetail)
                        this.triggerEvent('login', loginDetail, myEventOption)
                    })
            }   

            
        }
    }
})