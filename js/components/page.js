/**
 * @file page.js
 * @author zhangzhiqiang(zhiqiangzhang37@gmail.com)
 */

define(function (require) {
    var pageScrollTop = {};
    var firstPaint = true;
    var activeClass = 'active';

    return {
        template: '<div v-html="html" class="page-component"></div>',
        data: function () {
            return {
                /* eslint-disable */
                html: ''
                /* eslint-enable */
            };
        },
        methods: {
            insertContent: function ($body) {
                var me = this;
                var mainOuter = $body.find('.main-outer')[0];
                mainOuter.style.display = '';
                me.html = mainOuter.outerHTML;
            },
            setTitle: function (title) {

                if (!title) {
                    return;
                }

                document.title = title;
            },
            getPageContent: function () {
                var me = this;

                if (firstPaint) {
                    me.insertContent($('body'));
                    return;
                }

                $.ajax({
                    url: this.$route.path
                })
                .then(function (html) {

                    if (!html) {
                        return;
                    }

                    var bodyMatchRes = /<body>(.|\n)*?<\/body>/.exec(html);
                    var titleMatchRes = /<title>(.*?)<\/title>/.exec(html);

                    if (!bodyMatchRes) {
                        return;
                    }

                    var body = bodyMatchRes[0];
                    body = body.replace(/<body>(\s|\n)*/, '<body>');
                    body = body.replace(/(\s|\n)*<\/body>/, '</body>');
                    var $body = $(body);

                    me.insertContent($body);
                    me.setTitle(titleMatchRes ? titleMatchRes[1] : '');
                    setTimeout(function () {
                        me.setScroll();
                    }, 0);

                });
            },
            setScroll: function (scrollTop) {
                scrollTop = scrollTop !== undefined ? scrollTop : pageScrollTop[this.$route.path];
                document.body.scrollTop = document.documentElement.scrollTop = scrollTop || 0;
            }
        },
        created: function () {
            this.getPageContent();

        },
        beforeRouteUpdate: function (to, from, next) {console.log(99)
            this.html = '';
            firstPaint = false;
            pageScrollTop[this.$route.path] = document.body.scrollTop || document.documentElement.scrollTop;
            this.setScroll(0);
            next();
            this.getPageContent();

            // 处理main-nav
            var $mainNavLink = $('.main-nav-link');
            var toPath = to.path;
            $mainNavLink.removeClass(activeClass);
            if (toPath === '/') {
                $mainNavLink.eq(0).addClass(activeClass);
            }
            else {
                for (var i = 0; i < $mainNavLink.length; i++) {
                    var pathName = $mainNavLink[i].pathname;
                    if (pathName !== '/' && toPath.indexOf(pathName) !== -1) {
                        $mainNavLink.eq(i).addClass(activeClass);
                    }
                };
            }

        }
    };
});
