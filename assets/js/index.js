$(function () {

    // 调用获取用户信息
    getUserInfo()
})

var layer = layui.layer

// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success (res) {
            // console.log(res);
            if(res.status !== 0 ) return layer.msg('获取用户信息失败');

            renderAvatar(res.data)
        }
    })
}


// 获取用户头像
 function renderAvatar (user) {
    //  获取用户昵称
    var name = user.nickname || user.username
    // console.log(name);
    // 设置用户昵称
    $('#welcome').html('欢迎 &nbsp;' + name);
    // 判断用户是否有头像
    if(user.user_pic !== null) {
        // 渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        // console.log(name[0]);
        var one = name[0].toUpperCase();
        $('.text-avatar').html(one).show()
    }
}

// 实现退出功能
$('#tuichu').click(function () {
    // 弹出层  询问是否退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
    function(index) {

    localStorage.removeItem('token')

    location.href = '/login.html'

    layer.close(index);

     })
})