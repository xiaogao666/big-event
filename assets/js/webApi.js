// 所有的请求都会经过这里


$.ajaxPrefilter(function (op) {
    op.url = 'http://ajax.frontend.itheima.net' + op.url
})