var DatePicker = function(options) {
    // console.log(this)
    this.init()
}
//是否闰年
DatePicker.isLeapYear = function(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

DatePicker.prototype.init = function() {
    console.log(this)
    let nowDate = new Date()
    //this.config
    console.log(this.calendar("2018-07-01"))

}

DatePicker.prototype.calendar = function(date) {
    var thisDate = new Date(date) // 今天的年份
    let startDay, endDay, days, endWeek
    let dateTime = this.systemDate(thisDate)
    return {
        days: thisDate.getDate(), //总天数
        startWeek: thisDate.getDay(),//开始星期
        year:dateTime.year,
        month:dateTime.month,
        prevMaxDate: this.getEndDate(dateTime.month, dateTime.year),
        endDay: this.getEndDate(dateTime.month + 1, dateTime.year),
        //mark:mark
    }
}
//得到某月的最后一天
DatePicker.prototype.getEndDate = function (month, year) {
    var thisDate = new Date()
    //设置日期为下个月的第一天
    thisDate.setFullYear(
        year || thisDate.getFullYear(), month || (thisDate.getMonth() + 1), 1)
    //减去一天，得到当前月最后一天
    return new Date(thisDate.getTime() - 1000 * 60 * 60 * 24).getDate()
}
DatePicker.prototype.config = {
    type: 'date', //控件类型，支持：year/month/date/time/datetime,
    range: false, //是否开启范围选择，即双控件
    format: 'yyyy-MM-dd', //默认日期格式
    min: '1900-1-1', //有效最小日期，年月日必须用“-”分割，时分秒必须用“:”分割。注意：它并不是遵循 format 设定的格式。
    max: '2099-12-31', //有效最大日期，同上
    theme: 'default'
}
DatePicker.prototype.text = {
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    time: ['时', '分', '秒'],
    timeTips: '选择时间',
    startTime: '开始时间',
    endTime: '结束时间',
    dateTips: '返回日期',
    month: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    tools: {
        confirm: '确定',
        clear: '清空',
        now: '现在'
    }
}
//系统时间
DatePicker.prototype.systemDate = function(newDate) {
    var thisDate = newDate || new Date()
 
    return {
        year: thisDate.getFullYear(), //年
        month: thisDate.getMonth(), //月
        date: thisDate.getDate(), //日
    }
}

module.exports = {
    DatePicker: DatePicker
}