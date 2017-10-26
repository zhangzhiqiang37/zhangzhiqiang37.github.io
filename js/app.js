/**
 * @file app.js
 * @author zhangzhiqiang(zhiqiangzhang37@gmail.com)
 */

define(function (require) {

    var Vue = require('./lib/vue.min');
    var VueRouter = require('./lib/vue-router.min');
    var App = require('./components/app');
    var router = require('./router');

    Vue.use(VueRouter);

    function init() {

        var options = $.extend({
            router: router()
        }, App);
        new Vue(options).$mount('#container');
    }

    return init;

});
