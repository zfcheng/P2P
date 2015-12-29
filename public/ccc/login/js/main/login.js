'use strict';
var CommonService = require('ccc/global/js/modules/common').CommonService;
var captChaImg = $('.captcha-img');
var captcha = {};


getCaptCha();

$('.change-captcha').on('click', function (e) {
    e.preventDefault();
    getCaptCha();
});

function getCaptCha() {
    CommonService.getCaptcha(function (data) {
        captcha = data;
        captChaImg.attr('src', data.captcha);
    });
}

var errorRac = new Ractive({
    el: $('.error-wrap'),
    template: require('ccc/login/partials/error.html'),
    data: {
        error: null
    }
});

$('#loginForm').submit(function (e) {
    var $this = $(this);
    e.preventDefault();
    var $loginName = $('input[name=loginName]');
    var $password = $('input[name=password]');
    var $postBtn = $('#login_button');
    var $error = $('.login-error');

    $error.empty();

    if ($loginName.val() === '') {
        $error.text('手机号不能为空');
        return;
    }
    if ($password.val() === '') {
        $error.text('密码不能为空');
        return;
    }

    var errorMaps = {
        USER_DISABLED: '帐号密码错误次数过多，您的帐户已被锁定，请联系客服400-872-7676解锁。',
        FAILED: '手机号或密码错误'
    };

    if ($postBtn.hasClass('disabled')) {
        return;
    }

    $postBtn.addClass('disabled').html('登录中...');

    request.post('/login/ajax').type('form').send($this.serialize()).end().get('body').then(function (r) {
//        console.log(r);
        if (r.success) {
            $postBtn.text('登录成功');
            var url = /(loan)/;
            if (url.test(document.referrer)) {
                location.href = document.referrer;
                return;
            }
            if (CC.user.enterprise) {
                location.pathname = "/newAccount/home";
            } else {
                location.href = (r.redirect) ? r.redirect : '/';
            }
        } else {
            $error.text(errorMaps[r.error_description.result]);
            $postBtn.removeClass('disabled').text('登录');
        }
    });

    return false;
});

request.get(encodeURI('/api/v2/cms/category/IMAGE/name/登录')).end().then(function (res) {
    var count = new Ractive({
        el: '.loginBanner',
        template: '{{#each items}}<a href="{{url}}" target="_blank"><img src="{{content}}"/></a>{{/each}}',
        data: {
            items: res.body
        }
    });
});




