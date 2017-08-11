define(function (require) {

    var EventBus = require('../lib/event-bus');

    return {
        template: $('body').html(),
        data: function () {
            return {
                pageTransitionName: '',
                animationActive: false,
                headerWidth: ''
            };
        },
        created: function () {
            var me = this;

            EventBus.$on('SET_PAGE_TRANSITION_NAME', function (transitionName) {
                me.pageTransitionName = transitionName;
            });

            // 代理所有链接的点击，将站内重定向都改成hash定位
            $(document.body).on('click', 'a', function (e) {
                if (this.origin === location.origin) {
                    location.href = '#' + this.href.replace(location.origin, '');
                    return false;
                }
            });

        },
        methods: {
            handleBeforeEnter: function () {
                this.animationActive = true;
            },
            handleAfterEnter: function () {
                this.animationActive = false;
                EventBus.$emit('AFTER_ENTER');
            }
        }
    };
});
