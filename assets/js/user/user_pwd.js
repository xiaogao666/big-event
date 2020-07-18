$(function() {
    var form = layui.form
    var layer = layui.layer

    // 自定义验证规则
    form.verify({ 
        nickname: function (value){ 
            if (value.length > 6) { 
                return '昵称长度必须在 1 ~ 6 个字符之间！' 
            }
     },
    //  新旧密码验证规则
     oldnewpwd: function(value) {
         if(value === $('[name=oldPwd]').val()) {
             return '新旧密码不能相同'
         }
     },
    //  两次新密码验证规则
     newrepwd: function (value) {
         if(value !== $('[name=newPwd]').val()) {
             return '两次输入密码不一样'
         }
     }
    })

    // 修改密码
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        // var asd = $(this).serialize();
        // console.log(asd);
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success (res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新成功')
                window.parent.closeTc()
            }
        })
    })
})