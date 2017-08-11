define(function (require) {

    var Vue = require('./lib/vue.min');
    var VueRouter = require('./lib/vue-router.min');
    var App = require('./components/app');
    var router = require('./router');

    Vue.use(VueRouter);

    function init(opt) {
        var options = $.extend({
            router: router({
                needPageTransition: opt.needPageTransition
            })
        }, App);
        new Vue(options).$mount('#container');
    }

    return init;

});
