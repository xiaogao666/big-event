$(function () {
    var form = layui.form

    // 自定义表单验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1~6个字符之间'
            }
        }
    })

    // 获取用户基本信息
    getUserInfo()

    // 重置按钮事件
    $('#btn').click(function(e) {
        // e.preventDefault()
        e.preventDefault()
        getUserInfo()
    })

    // 点击提交表单信息
    $('#fm').submit(function(e)  {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success (res) {
                // console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新成功')
                window.parent.getUserInfo()
            }
        })
    })
})

var form = layui.form
var layer = layui.layer
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败  ')
            }

            form.val('fuzhi', res.data)
        }
    })
}