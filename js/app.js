define(function(require) {
    var Vue = require('./vue.min');
    var VueRouter = require('./vue-router.min');
    Vue.use(VueRouter);
    var Page = {
        template: '<div v-html="html"></div>',
        data: function () {
            return {
                html: ''
            }
        },
        created: function () {
            var me = this;

            $.ajax({
                url: this.$route.path
            }).then(function (html) {
                // me.html = html;
                var body = /<body>(.|\n)*<\/body>/.exec(html)[0];
                body = body.replace(/<body>(\s|\n)*/, '<body>');
                body = body.replace(/(\s|\n)*<\/body>/, '</body>');
                var $body = $(body);
                var mainOuter = $body.find('.main-outer')[0];
                mainOuter.style.display = '';
                me.html = mainOuter.outerHTML;
            })

        }
    };
    var router = new VueRouter({
        routes: [
            {
                path: '*',
                name: 'page',
                component: Page
            }
        ]
    });
    new Vue({
        router: router,
        template: $('body').html()
    }).$mount('#container');

    $(document.body).on('click', 'a', function (e) {
        if (this.origin === location.origin) {
            location.href = '#' + this.href.replace(location.origin, '');
            return false;
        }
    });

});
