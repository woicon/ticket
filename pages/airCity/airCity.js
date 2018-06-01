
const app = getApp()
const base = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({
    data: {
        selectTxt:'',
        cityFuzzy:[],
    },
    onLoad: function (options) {
        //获取城市二字码
        api.getAirCity()
            .then(res => {
                console.log(res)
                const city = res.dataList
                let s = Object.keys(city)
                const citys = base.sortObj(city)
                delete citys.domesticHot
                const news = s.map(i => {
                    return i == 'domesticHot' ? '#' : i
                })
                console.log(news.sort())
                this.setData({
                    city: citys,
                    cityLetter: news.sort()
                })
            })
    },
    cityInput:function(e){
        console.log("newTXT:::",e.detail.value)
        console.log(this.inputCity(e.detail.value))
        const fuzzy = this.inputCity(e.detail.value)
        this.setData({
            cityFuzzy: fuzzy
        })
    },
    inputCity:function(txt){
        const city = this.data.city
        let fuzzy = []
        for(let i in city){
            let elm = city[i]
            for(let n in elm){
                //console.log(elm[n])
                let ins = elm[n]
                for(let s in ins){
                    //console.log(ins[s])
                    let t = ins[s]
                    for(let v in t ){
                        if (t[v] == txt){
                            if (fuzzy.length<8){
                                fuzzy.push(elm[n])
                            }
                        }
                    }
                }
            }
        }
        // let objRund = obj =>{
        //     for(let i in obj){
        //         console.log(typeof obj[i])
        //         if (typeof obj[i] == 'Array'){
        //             objRund(obj[i])
        //             let arr = obj[i]
        //         }
        //         else if (typeof obj[i] == "String"){
        //             objRund(obj[i])
        //             if(obj[i]==txt){
        //                 console.log(obj[i])
        //             }
        //         }
        //         break
        //        // return obj[i]
        //     }
        // }
        // objRund(city)
        return fuzzy
    },
    touchLetter: function (e) {
        console.log(e)
        const elmId = e.target.dataset.id
        this.setData({
            scrollLetter: elmId,
            currLetter: e.target.dataset.index
        })
    },
    selectCity:function(){
        
    },
    cityScrolling:function(e){
        var query = wx.createSelectorQuery()
        query.selectAll('.city-letter').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec( res => {
            //console.log(res[0])
            let elm = res[0]
            let s = null
            for(let i in elm){
                console.log(elm[i])
                if(elm[i].top == 0){
                    console.log(elm[i])
                    // this.setData({
                    //     currLetter:i
                    // })
                }
            }
            res[0].top       // #the-id节点的上边界坐标
            res[1].scrollTop // 显示区域的竖直滚动位置
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