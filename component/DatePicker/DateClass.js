var DatePicker = function(options) {
    // console.log(this)
}
//是否闰年
DatePicker.isLeapYear = function(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
DatePicker.prototype.init = function() {
    let nowDate = new Date()
    return this.calendar(nowDate)
}
DatePicker.prototype.calendar = function(dates) {
    let dateTime = new Date()
    let year = dateTime.getFullYear()
    let month = dateTime.getMonth()

    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate()
    }
    let calendar = []
    var nextYearMonth = 0
    let getMonthDate = function(month, year) {
        let firstDay = new Date(year, month, 1) //每个月的第一天
        let dayInMonth = daysInMonth(month, year)
        let lastDay = new Date(year, month, dayInMonth) // 每个月的最后一天
        let startWeek = firstDay.getDay() // 第一天星期几(0-6)
        let endWeek = lastDay.getDay()
        let days = daysInMonth(month, year)
        let isNextYear = month+1 > 12 ? true : false
        nextYearMonth = isNextYear ? nextYearMonth + 1 : nextYearMonth


        console.log(isNextYear, nextYearMonth)
        let prevLastDay = daysInMonth(month - 1, year)
        let dayList = []
        for (let s = 0; s < startWeek; s++) {
            dayList.push("")
        }
        for (let i = 1; i <= days; i++) {
            let num = i<10 ? "0"+i : i
            dayList.push(num)
        }
        return {
            days: days, //总天数
            startDay: 1,
            year: isNextYear ? year + 1 : year,
            month: isNextYear ? nextYearMonth : month + 1,
            dayList: dayList,
            endWeek: endWeek,
            startWeek: startWeek,
            prevLastDay: prevLastDay,
        }
    }
    for (let i = 0; i <= 2; i++) {
        console.log(month + i)
        calendar.push(getMonthDate(month + i, year))
    }
    console.log(calendar)
    return calendar
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
        day: thisDate.getDate(), //日
    }
}
module.exports = DatePicker