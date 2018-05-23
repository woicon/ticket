function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    let d = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    }
    return [d.y, d.m, d.d].map(formatNumber).join('-') + ' ' + [d.h, d.m, d.s].map(formatNumber).join(':')
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt
}
//对象排序
function sortObj(obj) {
    var arr = []
    for ( let i in obj) {
        arr.push([i, obj[i]])
    };
    arr.sort()
    console.log(arr)
    var len = arr.length,
        obj = {}
    for (let i = 0; i < len; i++) {
        obj[arr[i][0]] = arr[i][1];
    }
    return obj
}
//对象排序
function sortObj(obj) {
    var arr = []
    for (let i in obj) {
        arr.push([i, obj[i]])
    };
    arr.sort()
    var len = arr.length,
        obj = {}
    for (let i = 0; i < len; i++) {
        obj[arr[i][0]] = arr[i][1];
    }
    return obj
}
module.exports = {
    formatTime: formatTime,
    sortObj: sortObj
}
