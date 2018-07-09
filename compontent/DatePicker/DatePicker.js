// compontent/DatePicker/DatePicker.js
Component({
    properties: {

    },
    data: {
        week: ['日', '一', '二', '三', '四', '五', '六'],

    },
    methods: {
        init: function () {

        }
    },
    created: function () {
        const DatePicker = require('./DateClass.js')
        let date = new DatePicker.DatePicker()
    },
    attached: function () {

    }

})