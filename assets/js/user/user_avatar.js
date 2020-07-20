$(function () {
  var layer = layui.layer

      // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 点击上传选择文件
  $('#btnsubmit').click(function() {
    $('#file').click()
  })

  // 更换剪裁区图片
  $('#file').on('change', function (e) {
    // 判断用户是否需选择图片
    var piclist = e.target.files
    if(piclist.length < 1) {
      return layer.msg('请选择图片')
    }

    var file = piclist[0];

    var imgURL = URL.createObjectURL(file)

    $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgURL) // 重新设置图片路径
    .cropper(options) // 重新初始化裁剪区域


  })
})