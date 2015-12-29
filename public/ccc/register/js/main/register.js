'use strict';
var RegisterRactive = require('@ccc/register').RegisterRactive;
var registerRactive = new RegisterRactive({
    el: '#register-container',
    template: require('ccc/register/partials/steps.html')
});

baconflux.store('register', 'success').onValue(function (data) {
    // 注册后自动登录
    request.post('/login/ajax', {
        body: {
            loginName: data.postedData.loginName,
            password: data.postedData.password,
        }
    }).end()
    var left = 3;
    var interval = setInterval((function () {
        --left;
        if (left == 0) {
            console.log(left)
            clearInterval(interval);
            window.location.href = "/newAccount/settings/authentication";
        }
    }), 1000);
});

$("#getSms").on('click', function () {
    console.log('sdfsdf');
});


//验证码的图片切换
$("#refresh-captcha").click(function (event) {
    $(".register-test").val("");
});



//验证码的北京图片隐藏
$(".form-group .inputtest-pic span").click(function () {

    $(".form-group .inputtest-pic .pullright").css("backgroundImage", "none");
})


//注册图片
request.get(encodeURI('/api/v2/cms/category/IMAGE/name/注册')).end().then(function (res) {
    var count = new Ractive({
        el: '.register-pic',
        template: '{{#each items}}<a href="{{url}}" target="_blank"><img src="{{content}}"/></a>{{/each}}',
        data: {
            items: res.body
        }
    });
});

if (CC.registerRel) {
    registerRactive.set('inviteCode.data.value', CC.registerRel);
}
