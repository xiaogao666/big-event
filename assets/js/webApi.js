// 所有的请求都会经过这里


$.ajaxPrefilter(function (op) {
    op.url = 'http://ajax.frontend.itheima.net' + op.url

    if(op.url.indexOf('/my/') !== -1) {
        op.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 不论成功失败都会调用complete函数
    op.complete = function (res) {
        // console.log(res);
        // if(!res.responseJSON) {
        //     res.responseJSON = 1
        // }
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 1. 强制清空 token
        localStorage.removeItem('token')
        // 2. 强制跳转到登录页面
        location.href = '/login.html'
        }
    }
})