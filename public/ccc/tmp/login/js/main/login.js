(function(n){"use strict";if(n.BCP&&"function"===typeof n.BCP.prelude)return n.BCP.prelude;var e=n.requestAnimationFrame||n.setImmediate||function(n){return setTimeout(n,1)};this.QAS=function(n){var e=n.requestAnimationFrame||n.setImmediate||function(n){return setTimeout(n,1)};var r=[].concat(n._qas_queue||[]);if(n._qas_queue)delete n._qas_queue;var t=Array.prototype.slice;var u=function(n){var e=t.call(arguments,1);if(u.loaded)o(n,e);else r.push([n,e]);return u};u.sync=function(n){n.sync=true;return u.apply(null,arguments)};u.ready=i;u.sync.ready=i;function i(){u.loaded=true;var n;while(n=r.shift()){o(n[0],n[1])}}function o(r,t){if(typeof r!="function")return;r.sync?r.apply(n,t):e(function(){r.apply(n,t)})}return u}(this);var r=n.BCP=t;function t(n){QAS(n,l([]))}t.sync=function(n){QAS.sync(n,l([]))};r.prelude=c;r.mergeModules=a;var u=0;var i=r.cache={};var o=r.modules={};return c;function a(n){n=n||{};for(var e in n){if(typeof e!=="number"&&n.hasOwnProperty(e)){if(!(e in o)){o[e]=n[e];if(e[0]!=="/")o["/"+e]=n[e]}}}}function f(){u+=1;e(function(){if(u>=document.querySelectorAll("script[data-common]").length){QAS.ready()}})}function c(n,e,t){r.mergeModules(n);var u=l(t);if(!t||!t.length){f()}else{var i;QAS(function(n){while(i=n.shift()){u(i)}},t)}return u}function l(n){return function e(r){if(!QAS.loaded){throw new Error("external libs not ready!")}var t=r;if(typeof t==="string"&&t[0]==="/"){t=t.replace(/^\//,"")}var u;if(!i[t]){if(!(u=o[t])){if(!(u=o[r==="/"+t?r:t="/"+t])){if(!(u=o[t="/node_modules"+t])){var a=new Error("Cannot find module '"+r+"'\n\nall available modules:\n"+s().join("\n"));a.code="MODULE_NOT_FOUND";throw a}}}var f=i[t]=i[r]={exports:{}};u[0].call(f.exports,function(n){var r=u[1][n];return e(r?r:"/"+n)},f,f.exports,c,o,i,n)}return i[t].exports}}function s(){var n={};p(o,function(e,r){if((""+r).match(/^\/?\d+$/))return;n[r.replace(/^\/(node_modules\/)?/,"")]=1});return m(n)}function d(n,e){var r,t;for(r=0,t=n.length;r<t;r++){e.call(n,n[r],k,n)}}function p(n,e){for(var r in n){if(n.hasOwnProperty(r)){e.call(n,n[r],r,n)}}}function m(n){var e=[];p(n,function(n,r){e.push(r)});return e}}).call(this,this)({"/ccc/global/js/modules/common.js":[function(require,module,exports){
/**
 * @file 公用的数据交互层
 * @author huip(hui.peng@creditcloud.com)
 */

'use strict';

var cache = {};

exports.CommonService = {
    getCaptcha: function getCaptcha(next) {
        var timestamp = new Date() - 0;
        request('GET', '/api/v2/register/captcha?timestamp=' + timestamp).end().then(function (res) {
            next(res.body);
        });
    },
    checkCaptcha: function checkCaptcha(captcha, next) {
        request('POST', '/api/v2/register/captcha?token=' + captcha.token).type('form').send(captcha).end().then(function (res) {
            next(res.body);
        });
    },
    getSmsCaptcha: function getSmsCaptcha(mobile, next) {
        request('GET', '/api/v2/register/smsCaptcha?mobile=' + mobile).end().then(function (res) {
            next(res.body);
        });
    },
    getUserInfo: function getUserInfo(next) {
        return cache.userInfo ? cache.userInfo : cache.userInfo = request('GET', '/user/info').end().then(function (res) {
            if (typeof next === 'function') {
                next(res.body);
            }
            return res.body;
        });
    },
    articles: function articles(cate, name, next) {
        return request('GET', '/api/v2/cms/' + cate + '/' + name).end().then(function (res) {
            if (typeof next === 'function') {
                next(res.body);
            }
            return res.body;
        });
    },
    getSmsCaptchaForResetPassword: function getSmsCaptchaForResetPassword(mobile, next) {
        request('GET', '/api/v2/users/smsCaptcha/changePwd?mobile=' + mobile).end().then(function (res) {
            next(res.body);
        });
    },
    getMessage: function getMessage(smsType, next) {
        request('POST', '/api/v2/smsCaptcha/MYSELF').type('form').send({ smsType: smsType }).end().then(function (res) {
            next(res.body);
        });
    },
    checkMessage: function checkMessage(smsType, smsCaptcha, next) {
        request('POST', '/api/v2/checkSMSCaptcha/MYSELF').type('form').send({ smsCaptcha: smsCaptcha, smsType: smsType }).end().then(function (res) {
            next(res.body);
        });
    }
};

},{}],"/ccc/login/js/main/login.js":[function(require,module,exports){
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
                location.href = r.redirect ? r.redirect : '/';
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

},{"ccc/global/js/modules/common":"/ccc/global/js/modules/common.js","ccc/login/partials/error.html":"/ccc/login/partials/error.html"}],"/ccc/login/partials/error.html":[function(require,module,exports){
module.exports = '{{#if error}}\n<div class="error-content">\n    {{error}}\n</div>\n{{/if}}';
},{}]},{},["/ccc/login/js/main/login.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvemZjbS93b3JrL3Byb2plY3QtenFqci10bXAvd2ViL2NjYy9nbG9iYWwvanMvbW9kdWxlcy9jb21tb24uanMiLCIvVXNlcnMvemZjbS93b3JrL3Byb2plY3QtenFqci10bXAvd2ViL2NjYy9sb2dpbi9qcy9tYWluL2xvZ2luLmpzIiwiLy0vY2NjL2xvZ2luL3BhcnRpYWxzL2Vycm9yLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0tBLFlBQVksQ0FBQzs7QUFFYixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRWYsT0FBTyxDQUFDLGFBQWEsR0FBRztBQUNwQixjQUFVLEVBQUUsb0JBQVUsSUFBSSxFQUFFO0FBQ3hCLFlBQUksU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLGVBQU8sQ0FBQyxLQUFLLEVBQUUscUNBQXFDLEdBQUcsU0FBUyxDQUFDLENBQzVELEdBQUcsRUFBRSxDQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNqQixnQkFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQixDQUFDLENBQUM7S0FDVjtBQUNELGdCQUFZLEVBQUUsc0JBQVUsT0FBTyxFQUFFLElBQUksRUFBRTtBQUNuQyxlQUFPLENBQUMsTUFBTSxFQUFFLGlDQUFpQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FDYixHQUFHLEVBQUUsQ0FDTCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDakIsZ0JBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEIsQ0FBQyxDQUFDO0tBQ1Y7QUFDRCxpQkFBYSxFQUFFLHVCQUFVLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDbkMsZUFBTyxDQUFD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QUFDbkQsb0JBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9DO0tBQ0osQ0FBQyxDQUFDOztBQUVILFdBQU8sS0FBSyxDQUFDO0NBQ2hCLENBQUMsQ0FBQzs7QUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ25GLFFBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDO0FBQ3BCLFVBQUUsRUFBRSxjQUFjO0FBQ2xCLGdCQUFRLEVBQUUsd0ZBQXdGO0FBQ2xHLFlBQUksRUFBRTtBQUNGLGlCQUFLLEVBQUUsR0FBRyxDQUFDLElBQUk7U0FDbEI7S0FDSixDQUFDLENBQUM7Q0FDTixDQUFDLENBQUM7OztBQ3pGSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKG4pe1widXNlIHN0cmljdFwiO2lmKG4uQkNQJiZcImZ1bmN0aW9uXCI9PT10eXBlb2Ygbi5CQ1AucHJlbHVkZSlyZXR1cm4gbi5CQ1AucHJlbHVkZTt2YXIgZT1uLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8bi5zZXRJbW1lZGlhdGV8fGZ1bmN0aW9uKG4pe3JldHVybiBzZXRUaW1lb3V0KG4sMSl9O3RoaXMuUUFTPWZ1bmN0aW9uKG4pe3ZhciBlPW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxuLnNldEltbWVkaWF0ZXx8ZnVuY3Rpb24obil7cmV0dXJuIHNldFRpbWVvdXQobiwxKX07dmFyIHI9W10uY29uY2F0KG4uX3Fhc19xdWV1ZXx8W10pO2lmKG4uX3Fhc19xdWV1ZSlkZWxldGUgbi5fcWFzX3F1ZXVlO3ZhciB0PUFycmF5LnByb3RvdHlwZS5zbGljZTt2YXIgdT1mdW5jdGlvbihuKXt2YXIgZT10LmNhbGwoYXJndW1lbnRzLDEpO2lmKHUubG9hZGVkKW8obixlKTtlbHNlIHIucHVzaChbbixlXSk7cmV0dXJuIHV9O3Uuc3luYz1mdW5jdGlvbihuKXtuLnN5bmM9dHJ1ZTtyZXR1cm4gdS5hcHBseShudWxsLGFyZ3VtZW50cyl9O3UucmVhZHk9aTt1LnN5bmMucmVhZHk9aTtmdW5jdGlvbiBpKCl7dS5sb2FkZWQ9dHJ1ZTt2YXIgbjt3aGlsZShuPXIuc2hpZnQoKSl7byhuWzBdLG5bMV0pfX1mdW5jdGlvbiBvKHIsdCl7aWYodHlwZW9mIHIhPVwiZnVuY3Rpb25cIilyZXR1cm47ci5zeW5jP3IuYXBwbHkobix0KTplKGZ1bmN0aW9uKCl7ci5hcHBseShuLHQpfSl9cmV0dXJuIHV9KHRoaXMpO3ZhciByPW4uQkNQPXQ7ZnVuY3Rpb24gdChuKXtRQVMobixsKFtdKSl9dC5zeW5jPWZ1bmN0aW9uKG4pe1FBUy5zeW5jKG4sbChbXSkpfTtyLnByZWx1ZGU9YztyLm1lcmdlTW9kdWxlcz1hO3ZhciB1PTA7dmFyIGk9ci5jYWNoZT17fTt2YXIgbz1yLm1vZHVsZXM9e307cmV0dXJuIGM7ZnVuY3Rpb24gYShuKXtuPW58fHt9O2Zvcih2YXIgZSBpbiBuKXtpZih0eXBlb2YgZSE9PVwibnVtYmVyXCImJm4uaGFzT3duUHJvcGVydHkoZSkpe2lmKCEoZSBpbiBvKSl7b1tlXT1uW2VdO2lmKGVbMF0hPT1cIi9cIilvW1wiL1wiK2VdPW5bZV19fX19ZnVuY3Rpb24gZigpe3UrPTE7ZShmdW5jdGlvbigpe2lmKHU+PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRbZGF0YS1jb21tb25dXCIpLmxlbmd0aCl7UUFTLnJlYWR5KCl9fSl9ZnVuY3Rpb24gYyhuLGUsdCl7ci5tZXJnZU1vZHVsZXMobik7dmFyIHU9bCh0KTtpZighdHx8IXQubGVuZ3RoKXtmKCl9ZWxzZXt2YXIgaTtRQVMoZnVuY3Rpb24obil7d2hpbGUoaT1uLnNoaWZ0KCkpe3UoaSl9fSx0KX1yZXR1cm4gdX1mdW5jdGlvbiBsKG4pe3JldHVybiBmdW5jdGlvbiBlKHIpe2lmKCFRQVMubG9hZGVkKXt0aHJvdyBuZXcgRXJyb3IoXCJleHRlcm5hbCBsaWJzIG5vdCByZWFkeSFcIil9dmFyIHQ9cjtpZih0eXBlb2YgdD09PVwic3RyaW5nXCImJnRbMF09PT1cIi9cIil7dD10LnJlcGxhY2UoL15cXC8vLFwiXCIpfXZhciB1O2lmKCFpW3RdKXtpZighKHU9b1t0XSkpe2lmKCEodT1vW3I9PT1cIi9cIit0P3I6dD1cIi9cIit0XSkpe2lmKCEodT1vW3Q9XCIvbm9kZV9tb2R1bGVzXCIrdF0pKXt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3IrXCInXFxuXFxuYWxsIGF2YWlsYWJsZSBtb2R1bGVzOlxcblwiK3MoKS5qb2luKFwiXFxuXCIpKTthLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCI7dGhyb3cgYX19fXZhciBmPWlbdF09aVtyXT17ZXhwb3J0czp7fX07dVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihuKXt2YXIgcj11WzFdW25dO3JldHVybiBlKHI/cjpcIi9cIituKX0sZixmLmV4cG9ydHMsYyxvLGksbil9cmV0dXJuIGlbdF0uZXhwb3J0c319ZnVuY3Rpb24gcygpe3ZhciBuPXt9O3AobyxmdW5jdGlvbihlLHIpe2lmKChcIlwiK3IpLm1hdGNoKC9eXFwvP1xcZCskLykpcmV0dXJuO25bci5yZXBsYWNlKC9eXFwvKG5vZGVfbW9kdWxlc1xcLyk/LyxcIlwiKV09MX0pO3JldHVybiBtKG4pfWZ1bmN0aW9uIGQobixlKXt2YXIgcix0O2ZvcihyPTAsdD1uLmxlbmd0aDtyPHQ7cisrKXtlLmNhbGwobixuW3JdLGssbil9fWZ1bmN0aW9uIHAobixlKXtmb3IodmFyIHIgaW4gbil7aWYobi5oYXNPd25Qcm9wZXJ0eShyKSl7ZS5jYWxsKG4sbltyXSxyLG4pfX19ZnVuY3Rpb24gbShuKXt2YXIgZT1bXTtwKG4sZnVuY3Rpb24obixyKXtlLnB1c2gocil9KTtyZXR1cm4gZX19KS5jYWxsKHRoaXMsdGhpcykiLCIvKipcbiAqIEBmaWxlIOWFrOeUqOeahOaVsOaNruS6pOS6kuWxglxuICogQGF1dGhvciBodWlwKGh1aS5wZW5nQGNyZWRpdGNsb3VkLmNvbSlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYWNoZSA9IHt9O1xuXG5leHBvcnRzLkNvbW1vblNlcnZpY2UgPSB7XG4gICAgZ2V0Q2FwdGNoYTogZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgdmFyIHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkgLSAwO1xuICAgICAgICByZXF1ZXN0KCdHRVQnLCAnL2FwaS92Mi9yZWdpc3Rlci9jYXB0Y2hhP3RpbWVzdGFtcD0nICsgdGltZXN0YW1wKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyZXMuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNoZWNrQ2FwdGNoYTogZnVuY3Rpb24gKGNhcHRjaGEsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnUE9TVCcsICcvYXBpL3YyL3JlZ2lzdGVyL2NhcHRjaGE/dG9rZW49JyArIGNhcHRjaGEudG9rZW4pXG4gICAgICAgICAgICAudHlwZSgnZm9ybScpXG4gICAgICAgICAgICAuc2VuZChjYXB0Y2hhKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyZXMuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFNtc0NhcHRjaGE6IGZ1bmN0aW9uIChtb2JpbGUsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnR0VUJywgJy9hcGkvdjIvcmVnaXN0ZXIvc21zQ2FwdGNoYT9tb2JpbGU9JyArIG1vYmlsZSlcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIG5leHQocmVzLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mbzogZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlLnVzZXJJbmZvID8gY2FjaGUudXNlckluZm8gOlxuICAgICAgICAgICAgKGNhY2hlLnVzZXJJbmZvID0gcmVxdWVzdCgnR0VUJywgJy91c2VyL2luZm8nKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQocmVzLmJvZHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmJvZHk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfSxcbiAgICBhcnRpY2xlczogZnVuY3Rpb24gKGNhdGUsIG5hbWUsIG5leHQpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QoJ0dFVCcsICcvYXBpL3YyL2Ntcy8nK2NhdGUrJy8nK25hbWUpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChyZXMuYm9keSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuYm9keTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0U21zQ2FwdGNoYUZvclJlc2V0UGFzc3dvcmQ6IGZ1bmN0aW9uIChtb2JpbGUsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnR0VUJywgJy9hcGkvdjIvdXNlcnMvc21zQ2FwdGNoYS9jaGFuZ2VQd2Q/bW9iaWxlPScgKyBtb2JpbGUpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHJlcy5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0TWVzc2FnZTogZnVuY3Rpb24gKHNtc1R5cGUsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnUE9TVCcsICcvYXBpL3YyL3Ntc0NhcHRjaGEvTVlTRUxGJylcbiAgICAgICAgICAgIC50eXBlKCdmb3JtJylcbiAgICAgICAgICAgIC5zZW5kKHtzbXNUeXBlOiBzbXNUeXBlfSlcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIG5leHQocmVzLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjaGVja01lc3NhZ2U6IGZ1bmN0aW9uIChzbXNUeXBlLCBzbXNDYXB0Y2hhLCBuZXh0KSB7XG4gICAgICAgIHJlcXVlc3QoJ1BPU1QnLCAnL2FwaS92Mi9jaGVja1NNU0NhcHRjaGEvTVlTRUxGJylcbiAgICAgICAgICAgIC50eXBlKCdmb3JtJylcbiAgICAgICAgICAgIC5zZW5kKHtzbXNDYXB0Y2hhOiBzbXNDYXB0Y2hhLCBzbXNUeXBlOiBzbXNUeXBlfSlcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIG5leHQocmVzLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIENvbW1vblNlcnZpY2UgPSByZXF1aXJlKCdjY2MvZ2xvYmFsL2pzL21vZHVsZXMvY29tbW9uJykuQ29tbW9uU2VydmljZTtcbnZhciBjYXB0Q2hhSW1nID0gJCgnLmNhcHRjaGEtaW1nJyk7XG52YXIgY2FwdGNoYSA9IHt9O1xuXG5cbmdldENhcHRDaGEoKTtcblxuJCgnLmNoYW5nZS1jYXB0Y2hhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZ2V0Q2FwdENoYSgpO1xufSk7XG5cbmZ1bmN0aW9uIGdldENhcHRDaGEoKSB7XG4gICAgQ29tbW9uU2VydmljZS5nZXRDYXB0Y2hhKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGNhcHRjaGEgPSBkYXRhO1xuICAgICAgICBjYXB0Q2hhSW1nLmF0dHIoJ3NyYycsIGRhdGEuY2FwdGNoYSk7XG4gICAgfSk7XG59XG5cbnZhciBlcnJvclJhYyA9IG5ldyBSYWN0aXZlKHtcbiAgICBlbDogJCgnLmVycm9yLXdyYXAnKSxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnY2NjL2xvZ2luL3BhcnRpYWxzL2Vycm9yLmh0bWwnKSxcbiAgICBkYXRhOiB7XG4gICAgICAgIGVycm9yOiBudWxsXG4gICAgfVxufSk7XG5cbiQoJyNsb2dpbkZvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgJGxvZ2luTmFtZSA9ICQoJ2lucHV0W25hbWU9bG9naW5OYW1lXScpO1xuICAgIHZhciAkcGFzc3dvcmQgPSAkKCdpbnB1dFtuYW1lPXBhc3N3b3JkXScpO1xuICAgIHZhciAkcG9zdEJ0biA9ICQoJyNsb2dpbl9idXR0b24nKTtcbiAgICB2YXIgJGVycm9yID0gJCgnLmxvZ2luLWVycm9yJyk7XG5cbiAgICAkZXJyb3IuZW1wdHkoKTtcblxuICAgIGlmICgkbG9naW5OYW1lLnZhbCgpID09PSAnJykge1xuICAgICAgICAkZXJyb3IudGV4dCgn5omL5py65Y+35LiN6IO95Li656m6Jyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCRwYXNzd29yZC52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgJGVycm9yLnRleHQoJ+WvhueggeS4jeiDveS4uuepuicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGVycm9yTWFwcyA9IHtcbiAgICAgICAgVVNFUl9ESVNBQkxFRDogJ+W4kOWPt+WvhueggemUmeivr+asoeaVsOi/h+Wkmu+8jOaCqOeahOW4kOaIt+W3suiiq+mUgeWumu+8jOivt+iBlOezu+WuouacjTQwMC04NzItNzY3Nuino+mUgeOAgicsXG4gICAgICAgIEZBSUxFRDogJ+aJi+acuuWPt+aIluWvhueggemUmeivrydcbiAgICB9O1xuXG4gICAgaWYgKCRwb3N0QnRuLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkcG9zdEJ0bi5hZGRDbGFzcygnZGlzYWJsZWQnKS5odG1sKCfnmbvlvZXkuK0uLi4nKTtcblxuICAgIHJlcXVlc3QucG9zdCgnL2xvZ2luL2FqYXgnKS50eXBlKCdmb3JtJykuc2VuZCgkdGhpcy5zZXJpYWxpemUoKSkuZW5kKCkuZ2V0KCdib2R5JykudGhlbihmdW5jdGlvbiAocikge1xuLy8gICAgICAgIGNvbnNvbGUubG9nKHIpO1xuICAgICAgICBpZiAoci5zdWNjZXNzKSB7XG4gICAgICAgICAgICAkcG9zdEJ0bi50ZXh0KCfnmbvlvZXmiJDlip8nKTtcbiAgICAgICAgICAgIHZhciB1cmwgPSAvKGxvYW4pLztcbiAgICAgICAgICAgIGlmICh1cmwudGVzdChkb2N1bWVudC5yZWZlcnJlcikpIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQucmVmZXJyZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKENDLnVzZXIuZW50ZXJwcmlzZSkge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gXCIvbmV3QWNjb3VudC9ob21lXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAoci5yZWRpcmVjdCkgPyByLnJlZGlyZWN0IDogJy8nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGVycm9yLnRleHQoZXJyb3JNYXBzW3IuZXJyb3JfZGVzY3JpcHRpb24ucmVzdWx0XSk7XG4gICAgICAgICAgICAkcG9zdEJ0bi5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS50ZXh0KCfnmbvlvZUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xufSk7XG5cbnJlcXVlc3QuZ2V0KGVuY29kZVVSSSgnL2FwaS92Mi9jbXMvY2F0ZWdvcnkvSU1BR0UvbmFtZS/nmbvlvZUnKSkuZW5kKCkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgdmFyIGNvdW50ID0gbmV3IFJhY3RpdmUoe1xuICAgICAgICBlbDogJy5sb2dpbkJhbm5lcicsXG4gICAgICAgIHRlbXBsYXRlOiAne3sjZWFjaCBpdGVtc319PGEgaHJlZj1cInt7dXJsfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj48aW1nIHNyYz1cInt7Y29udGVudH19XCIvPjwvYT57ey9lYWNofX0nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpdGVtczogcmVzLmJvZHlcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cblxuXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gJ3t7I2lmIGVycm9yfX1cXG48ZGl2IGNsYXNzPVwiZXJyb3ItY29udGVudFwiPlxcbiAgICB7e2Vycm9yfX1cXG48L2Rpdj5cXG57ey9pZn19JzsiXX0=
