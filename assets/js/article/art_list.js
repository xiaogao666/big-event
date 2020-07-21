$(function () {
        var form = layui.form
        var layer = layui.layer
        var laypage = layui.laypage

    // 定义参数
    var q = {
        pagenum: 1,  // 页码值
        pagesize: 2, // 每页显示几条数据
        cate_id: '', // 文章分类的id
        state: '' // 文章发布状态
    }

    initTable()  

    // 定义美化时间过滤器
    template.defaults.imports.dateFormat = function (date) {
        return moment(date).format('YYYY-MM-DD hh:mm:ss')
    }

    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
        method: 'GET',
        url: '/my/article/list',
        data: q,
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
            return layer.msg('获取文章列表失败！')
            }
            // 使用模板引擎渲染页面的数据
            var htmlStr = template('muban', res)
            $('tbody').html(htmlStr)
            renderPage(res.total)
        }
        })
    }

        // 获取下拉框文章类别
    initCate() 
    function initCate () {

        $.ajax({
            type: 'GET',
            url:'/my/article/cates',
            success (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                  }
                  var htmlStr = template('tpl-cate', res)
                  $('[name=cate_id]').html(htmlStr)
                 form.render()
            } 
        })
     }

    //  为刷选表单绑定submit事件
    $("#form-search").submit(function (e){
        e.preventDefault()
        var cata_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

       q.cate_id = cata_id
       q.state = state

       initTable()

    })

    // 定义渲染分页
    function renderPage(total) {
        // console.log(total)
         // 调用 laypage.render() 方法来渲染分页的结构
    laypage.render({
        elem: 'pageBox', // 分页容器的 Id
        count: total, // 总数据条数
        limit: q.pagesize, // 每页显示几条数据
        curr: q.pagenum,// 设置默认被选中的分页
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],
        jump: function (obj,frist) {
            // console.log(obj.curr);
            q.pagenum = obj.curr
            // console.log(1);
            // console.log(frist);
            q.pagesize = obj.limit
            // console.log(obj.limit);
            if(!frist) {
                initTable()
            }
            

        }
      })
    }

    // 删除文章
    $('tbody').on('click', '.btn-delete', function() {
        console.log($(".btn-delete"));
        var len = $(".btn-delete").length
        console.log(len);
        // 获取到文章的 id
        var id = $(this).attr('data-id')
        // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
          $.ajax({
            method: 'GET',
            url: '/my/article/delete/' + id,
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('删除文章失败！')
              }
              layer.msg('删除文章成功！')

              if(len === 1) {
                q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1 ;
              }
              initTable()
            }
          })
    
          layer.close(index)
        })
    })
    
})