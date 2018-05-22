var md5 = require('../libs/md5.min.js')
var sign = require('../libs/getSign.js')
const API = 'http://www.51bib.com/wxapp/wxappbusiness.ashx'
function ajax(url, parmas) {
    try{
        let ext = wx.getStorageSync("ext")
        // if (parmas.sign){
        //     delete parmas.sign
        // }
        const method = {
            method: url,
            retailId: ext.retailId,
            retailCode: ext.retailCode
        }
        const par = parmas ? Object.assign(method, parmas) : method
        const signParmas = sign.getSign(par)
        return new Promise((res, rej) => {
            wx.request({
                url: API,
                data: signParmas,
                success: data => {
                    res(data.data)
                },
                fail: error => {
                    rej(error)
                }
            })
        })
    }catch(error){

    }
}
const api = [
    "getSupplierInfo",  //机票查询
    "sendRegMobile",    //用户发送短信验证码
    "userReg",          //用户注册
    "getUserIsReg",     //获取用户是否注册
    "getAirCity",       //获取机场三字码
    "getTrainCity",     //获取火车票三字码
    "getAuthInfo",      //微信 登录凭证校验
    "airSearch",        //机票查询
]
let apiList = arr => {
    let api = {}
    let s = arr.map(i => {
        api[i] = parmas => ajax(i, parmas)
    })
    return api
}
const allApi = apiList(api)
module.exports = allApi