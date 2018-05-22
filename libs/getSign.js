var md5 = require('../libs/md5.min.js')
//对象排序
function sortObj(obj) {
    var arr = []
    for (let i in obj) {
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
function getSign(parmas, key) {
    //let newParmas = parmas
    delete parmas.sign
    let storeParmas = sortObj(parmas)
    let _parmas = parseParam(storeParmas) //url
    console.log("排序前:::", parmas)
    console.log("排序后:::", storeParmas)
    const sign = md5(_parmas)
    console.log("MD5:::", sign)
    const MD5 = sign.toUpperCase()
    parmas.sign = MD5
    console.log("混淆后的MD5::::", parmas.sign)
    return parmas
}

module.exports = {
    getSign: getSign
}
