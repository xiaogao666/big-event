$(function() {
    var layer = layui.layer

    // 登录页面与注册的切换
    $('#link_reg').on('click', () => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', () => {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 获取layui的from对象
    var form = layui.form

    // 自定义验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码长度必须为6-12位，并且不允许出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
              return '两次密码不一致！'
            }
          }
    })

    // 注册页面的提交事件
    $('#form-reg').submit(function (e) {
        // alert(111)
        e.preventDefault()
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        // console.log(data);
        // 注册请求
        $.ajax({
            type: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data,
            success (res) {
                console.log(res)
                if( res.status != 0) return layer.msg(res.message);
                layer.msg('注册成功')
                $('#link_login').click()
            }
        })

    })

    // 登录表单的提交事件
    $('#form-login').on('submit', function (e) {
        e.preventDefault()

        var data = $(this).serialize()
        // console.log(data)

        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data,
            success (res) {
                if(res.status != 0) return layer.msg('res.message')
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})