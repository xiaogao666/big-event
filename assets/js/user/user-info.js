$(function () {
    var form = layui.form

    form.verify({ 
        nickname: function (value){ 
            if (value.length > 6) { 
                return '昵称长度必须在 1 ~ 6 个字符之间！' 
            }
     } 
    })

    // 获取用户基本信息
    initUserInfo()
    // 重置表单
    $('#btnReset').click(function(e) {
        e.preventDefault()
        initUserInfo()
    })

    // 发请求跟新用户信息
    $('.layui-form').submit(function (e) {
        e.preventDefault()

        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success (res) {
                // console.log(res);
                if(res.status !== 0 ) return layer.msg('修改失败')
                layer.msg('修改成功')
                window.parent.getUserInfo()
            }   
        })
    })
})

var form = layui.form
function initUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success (res) {
            // console.log(res);
            if(res.status !== 0 ) return layer.msg('获取信息失败')

            form.val('formUserInfo', res.data)
        }
    })
}