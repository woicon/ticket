
//MD5


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

function formatDate(dates, types) {
    return new Date(dates || '').Format(types)
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function getNowDate() {
    return formatTime(new Date());
}
function sedMsg() {

}

//获取某个对象值
function getValue(obj, name) {
    let objValue = null
    function letVal(obj, name) {
        for (let i in obj) {
            if (obj[i] instanceof Object) {
                letVal(obj[i], name)
            } else if (i == name) {
                objValue = obj[i]
                break
            }
        }
        return objValue
    }
    return letVal(obj, name)
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

//转URL参数
function parseParam(obj, encode) {
    function toQueryPair(key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        if (encode) {
            return key + '=' + encodeURIComponent(value === null ? '' : String(value));
        } else {
            return key + '=' + (value === null ? '' : String(value));
        }
    }
    var ret = [];
    for (var key in obj) {
        key = encode ? encodeURIComponent(key) : key;
        var values = obj[key];
        if (values && values.constructor == Array) {
            //数组
            var queryValues = [];
            for (var i = 0, len = values.length, value; i < len; i++) {
                value = values[i];
                queryValues.push(toQueryPair(key, value));
            }
            ret = ret.concat(queryValues);
            console.log(ret);
        } else { //字符串
            ret.push(toQueryPair(key, values));
        }
    }
    return ret.join('&');
}

function toQueryParams(par) {
    var search = par.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/);
    if (!search) {
        return {};
    }
    var searchStr = search[1];
    var searchHash = searchStr.split('&');
    var ret = {};
    searchHash.forEach(function (pair) {
        var temp = '';
        if (temp = (pair.split('=', 1))[0]) {
            var key = decodeURIComponent(temp);
            var value = pair.substring(key.length + 1);
            if (value != undefined) {
                value = decodeURIComponent(value);
            }
            if (key in ret) {
                if (ret[key].constructor != Array) {
                    ret[key] = [ret[key]];
                }
                ret[key].push(value);
            } else {
                ret[key] = value;
            }
        }
    });
    return ret
}


//低版本支持
function values(obj) {
    let arr = [];
    for (var key in obj) {
        arr.push(obj[key]);
    }
    return arr;
}

function keys(obj) {
    let arr = [];
    for (var key in obj) {
        arr.push(key);
    }
    return arr;
}

function validation(str, reg) {
    let res = reg.test(str);
    return res;
}

//生成签名参数
function getSign(parmas, key, isSi) {
    //let newParmas = parmas
    delete parmas.sign
    let storeParmas = sortObj(parmas)
    let _parmas = parseParam(storeParmas) //url
    console.log("排序前:::", parmas)
    console.log("排序后:::", storeParmas)
    const sign = md5(_parmas)
        console.log("MD5:::",sign)
        const MD5 = sign.toUpperCase()
        // let MD5_array = MD5.split('')
        // let convertMD5 = chars => {
        //     return String.fromCharCode(chars.charCodeAt() ^ 't'.charCodeAt())
        // }
        // parmas.sign = MD5_array.map(convertMD5).join('')
         parmas.sign = MD5
        console.log("混淆后的MD5::::",parmas.sign)
        return parmas
}

module.exports = {
    formatTime: formatTime,
    getValue: getValue,
    toQueryParams: toQueryParams,
    parseParam: parseParam,
    sortObj: sortObj,
    getSign: getSign,
}
