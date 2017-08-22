/**
 * @file router.js
 * @author zhangzhiqiang(zhiqiangzhang37@gmail.com)
 */

define(function (require) {

    var VueRouter = require('./lib/vue-router.min');
    var Page = require('./components/page');

    var routes = [
        {
            path: '*',
            name: 'page',
            component: Page
        }
    ];

    function initRouter(opt) {

        opt = opt || {};
        var router = new VueRouter({
            mode: 'history',
            routes: routes
        });

        // 代理所有链接的点击，使用vue-router进行跳转
        $(document.body).on('click', 'a', function (e) {
            if (this.origin === location.origin) {
                router.push(this.href.replace(location.origin, ''));
                return false;
            }
        });

        return router;
    }

    return initRouter;

});
