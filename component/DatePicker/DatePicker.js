// compontent/DatePicker/DatePicker.js
Component({
    properties: {

    },
    data: {
        week: ['日', '一', '二', '三', '四', '五', '六'],

    },
    methods: {
        init: function() {

        }
    },
    attached: function() {
        const DatePicker = require('./DateClass.js')
        let dates = new DatePicker()
        const dateList = dates.init()
        let nowDate = dates.systemDate()
        this.setData({
            picker: dateList,
            nowDate: `${nowDate.year}${nowDate.month+1}${nowDate.day}`
        })
    }
})