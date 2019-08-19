/**
 * Created by admin on 2017/3/14.
 */
$(function(){
    $('#dropdown-menu li').click(function(){
        $('#positionShow').text($(this).text());
        $('#position option').val($(this).attr('data-value'));
        $('#position').val($(this).attr('data-value'));
        $('#position').parent().siblings('.errorMessage').html('');
    });

//表单验证
    var warning = $('#warning');

    var workId = $('#workId');
    var username = $('#username');
    var position = $('#position');
    var password = $('#password');
    var confirmPassword = $('#confirmPassword');

    time = 100;

    //员工编号验证
    workId.blur(function(){
        var workIdValue = $(this).val();
        var $this = $(this);
        //员工编号为4位或者5位数字
        if($.trim(workIdValue).length == 0){
            $(this).siblings('.errorMessage').html('员工编号不能为空！');
            workId.parent().removeClass('has-success');
            workId.parent().addClass('has-warning');
            $this.attr('data-validate-success', 0);
        }else if(!(/^\d{4}$/.test(workIdValue)) && !(/^\d{5}$/.test(workIdValue))){
            $(this).siblings('.errorMessage').html('员工编号不正确！');
            workId.parent().removeClass('has-success');
            workId.parent().addClass('has-warning');
            $this.attr('data-validate-success', 0);
        }else{
            $.post('/register/'+ workIdValue, function(data){
                if(data){
                    $this.siblings('.errorMessage').html('员工编号已注册，如有问题，请联系管理员！');
                    workId.parent().removeClass('has-success');
                    workId.parent().addClass('has-warning');
                    $this.attr('data-validate-success', 0);
                }else{
                    $this.siblings('.errorMessage').html('');
                    workId.parent().removeClass('has-warning');
                    workId.parent().addClass('has-success');
                    $this.attr('data-validate-success', 1);
                }
            });
        }
    });

    //姓名验证
    username.blur(function(){
        var usernameValue  = $(this).val();
        //员工编号为4位或者5位数字
        if($.trim(usernameValue).length == 0){
            $(this).siblings('.errorMessage').html('姓名不能为空！');
            username.parent().removeClass('has-success');
            username.parent().addClass('has-warning');
            $(this).attr('data-validate-success', 0);
        }else if(!(/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(usernameValue))){
            $(this).siblings('.errorMessage').html('只可输入中文姓名！');
            username.parent().removeClass('has-success');
            username.parent().addClass('has-warning');
            $(this).attr('data-validate-success', 0);
        }else{
            $(this).siblings('.errorMessage').html('');
            username.parent().removeClass('has-warning');
            username.parent().addClass('has-success');
            $(this).attr('data-validate-success', 1);
        }
    });

    //密码验证
    password.blur(function(){
        var passwordValue = $(this).val();
        if($.trim(passwordValue).length == 0){
            $(this).siblings('.errorMessage').html('密码不能为空！');
            password.parent().removeClass('has-success');
            password.parent().addClass('has-warning');
            $(this).attr('data-validate-success', 0);
        }else if(!(/^(\w){6,12}$/.test(passwordValue))){
            $(this).siblings('.errorMessage').html('密码必须为6-12位字母、数字或下划线！');
            password.parent().removeClass('has-success');
            password.parent().addClass('has-warning');
            $(this).attr('data-validate-success', 0);
        }else{
            $(this).siblings('.errorMessage').html('');
            password.parent().removeClass('has-warning');
            password.parent().addClass('has-success');
            $(this).attr('data-validate-success', 1);
        }
    });

    //确认密码验证
    confirmPassword.blur(function(){
        if($(this).val() !== $('#password').val()){
            $(this).siblings('.errorMessage').html('两次密码输入不一致！');
            password.val("");
            confirmPassword.val("");
            password.parent().removeClass('has-success');
            password.parent().addClass('has-warning');
            $(this).attr('data-validate-success', 0);
        }else{
            $(this).siblings('.errorMessage').html('');
            confirmPassword.parent().removeClass('has-warning');
            confirmPassword.parent().addClass('has-success');
            $(this).attr('data-validate-success', 1);
        }
    });

    $('#registerForm').submit(function(){
        if(!parseInt($('#workId').attr('data-validate-success'))){
            return false;
        }
        if(!parseInt($('#username').attr('data-validate-success'))){
            return false;
        }
        if($('#position').val().length == 0){
            $('#position').parent().siblings('.errorMessage').html('请选择职位！');
            return false;
        }
        if(!parseInt($('#password').attr('data-validate-success'))){
            return false;
        }
        if(!parseInt($('#confirmPassword').attr('data-validate-success'))){
            return false;
        }
    });
    $(document).keyup(function(e){
        if(e.keyCode == 13){
            $('#login, #submit').trigger('click');
        }
    })

    $('#login').click(function(){
        if($('#workId1').val() && $('#password1').val()){
            $.post('/loginState', { workId: $('#workId1').val(), password: $('#password1').val()}, function(data){
                if(data){
                    window.location.href = '/';
                }else{
                    $('.errorMessage').html('工号或密码错误！');
                }
            })
        }else{
            $('.errorMessage').html('工号/密码不能为空！');
        }

    });
});

