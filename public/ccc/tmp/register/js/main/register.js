(function(n){"use strict";if(n.BCP&&"function"===typeof n.BCP.prelude)return n.BCP.prelude;var e=n.requestAnimationFrame||n.setImmediate||function(n){return setTimeout(n,1)};this.QAS=function(n){var e=n.requestAnimationFrame||n.setImmediate||function(n){return setTimeout(n,1)};var r=[].concat(n._qas_queue||[]);if(n._qas_queue)delete n._qas_queue;var t=Array.prototype.slice;var u=function(n){var e=t.call(arguments,1);if(u.loaded)o(n,e);else r.push([n,e]);return u};u.sync=function(n){n.sync=true;return u.apply(null,arguments)};u.ready=i;u.sync.ready=i;function i(){u.loaded=true;var n;while(n=r.shift()){o(n[0],n[1])}}function o(r,t){if(typeof r!="function")return;r.sync?r.apply(n,t):e(function(){r.apply(n,t)})}return u}(this);var r=n.BCP=t;function t(n){QAS(n,l([]))}t.sync=function(n){QAS.sync(n,l([]))};r.prelude=c;r.mergeModules=a;var u=0;var i=r.cache={};var o=r.modules={};return c;function a(n){n=n||{};for(var e in n){if(typeof e!=="number"&&n.hasOwnProperty(e)){if(!(e in o)){o[e]=n[e];if(e[0]!=="/")o["/"+e]=n[e]}}}}function f(){u+=1;e(function(){if(u>=document.querySelectorAll("script[data-common]").length){QAS.ready()}})}function c(n,e,t){r.mergeModules(n);var u=l(t);if(!t||!t.length){f()}else{var i;QAS(function(n){while(i=n.shift()){u(i)}},t)}return u}function l(n){return function e(r){if(!QAS.loaded){throw new Error("external libs not ready!")}var t=r;if(typeof t==="string"&&t[0]==="/"){t=t.replace(/^\//,"")}var u;if(!i[t]){if(!(u=o[t])){if(!(u=o[r==="/"+t?r:t="/"+t])){if(!(u=o[t="/node_modules"+t])){var a=new Error("Cannot find module '"+r+"'\n\nall available modules:\n"+s().join("\n"));a.code="MODULE_NOT_FOUND";throw a}}}var f=i[t]=i[r]={exports:{}};u[0].call(f.exports,function(n){var r=u[1][n];return e(r?r:"/"+n)},f,f.exports,c,o,i,n)}return i[t].exports}}function s(){var n={};p(o,function(e,r){if((""+r).match(/^\/?\d+$/))return;n[r.replace(/^\/(node_modules\/)?/,"")]=1});return m(n)}function d(n,e){var r,t;for(r=0,t=n.length;r<t;r++){e.call(n,n[r],k,n)}}function p(n,e){for(var r in n){if(n.hasOwnProperty(r)){e.call(n,n[r],r,n)}}}function m(n){var e=[];p(n,function(n,r){e.push(r)});return e}}).call(this,this)({"/ccc/register/js/main/register.js":[function(require,module,exports){
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
            password: data.postedData.password
        }
    }).end();
    var left = 3;
    var interval = setInterval(function () {
        --left;
        if (left == 0) {
            console.log(left);
            clearInterval(interval);
            window.location.href = "/newAccount/settings/authentication";
        }
    }, 1000);
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
});

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

},{"@ccc/register":"/node_modules/@ccc/register/index.js","ccc/register/partials/steps.html":"/ccc/register/partials/steps.html"}],"/ccc/register/partials/steps.html":[function(require,module,exports){
module.exports = '<div id="register-wrapper" class="on-step-{{onStep}}">\n    <Step>\n        <div class="register-step-0">\n            <div class="register-frame">\n                <RInput field="mobile">\n                    <div class="rinput">\n                        <label for="{{rinputId}}" class="pi-placeholder {{#if value}}pi-placeholder__filled{{/if}}"><em>*</em>手机号码:</label>\n                        <input class="phone" name="phone" id="{{rinputId}}" value="{{value}}" placeholder="输入手机号码">\n                        <span class="tip-loading">{{#loading}}<img src=\'/ccc/global/img/loading.gif\' style="width:20px;"/>{{/loading}}  \n                        </span>\n                        <span class="tip">{{#errMsg}}{{errMsg}}{{/if}}</span>\n                    </div>\n                </RInput>\n                <RInput field="imgCaptcha">\n                    <div class="rinput picnum">\n                        <label for="{{rinputId}}" class="pi-placeholder {{#if value}}pi-placeholder__filled{{/if}}"><em>*</em>验证码:</label>\n                        <input class="register-test" id="{{rinputId}}" value="{{value}}" placeholder="验证码">\n                        <span on-click=\'changeImgCaptcha\'>\n                            <img src="{{imgCaptchaBase64}}" alt="">\n                        </span>\n                        <span id="cannot-see">看不清?</span>\n                        <span on-click=\'changeImgCaptcha\' id="refresh-captcha">换一张</span>\n                    </div>\n                    <div class="tip01" id="password-pic" style="margin-top: -30px;margin-bottom: 10px;float:left">\n                        {{#errMsg}}{{errMsg}}{{/errMsg}}\n                    </div>\n                </RInput>\n                <RInput field="smsCaptcha">\n                    <div class="rinput message-confirm bring-in">\n                        <label for="{{rinputId}}" class="pi-placeholder {{#if value}}pi-placeholder__filled{{/if}}">短信验证码:</label>\n                        <input id="{{rinputId}}" value="{{value}}" placeholder="短信验证码" class="message-brame"> \n                        {{#if !smsCaptchaReady}}\n                            <button on-click=\'sendSmsCaptcha\' id="get-message">\n                                获取短信验证码\n                            </button>\n                        {{else}}\n                        <button on-click=\'sendSmsCaptcha\' {{#if !smsCaptchaReady || smsCaptchaCountDown}}disabled{{/if}}>\n\n                            {{#if smsCaptchaCountDown}} {{smsCaptchaCountDown}}秒后重新发送 {{else}} 获取短信验证码 {{/if}}\n                        </button>\n                        {{/if}}\n                        <span class="tip-loading">{{#loading}}<img src=\'/ccc/global/img/loading.gif\' style="width:20px;"/>{{/loading}}</span>\n                        <span class="tip">{{#errMsg}}{{errMsg}}{{/errMsg}}</span>\n                    </div>\n                </RInput>\n\n                <RInput field="password" valueStableDuration=200>\n                    <div class="rinput">\n                        <label for="{{rinputId}}" class="pi-placeholder {{#if value}}pi-placeholder__filled{{/if}}"><em>*</em>密码:</label>\n                        <input class="password" id="{{rinputId}}" type="password" value="{{value}}" placeholder="输入密码，6-16位字符" maxlength="16">\n                        <span class="tip-loading">{{#loading}}<img src=\'/ccc/global/img/loading.gif\' style="width:20px;"/>{{/loading}}</span>\n                        <span class="tip">\n        {{#errMsg}}{{errMsg}}{{/errMsg}}\n    </span>\n                    </div>\n                </RInput>\n                <RInput field="repassword" valueStableDuration=200>\n                    <div class="rinput">\n                        <label for="{{rinputId}}" class="pi-placeholder {{#if value}}pi-placeholder__filled{{/if}}"><em>*</em>确认密码:</label>\n                        <input class="repassword" id="{{rinputId}}" type="password" value="{{value}}" placeholder="再次输入密码" maxlength="16">\n                        <span class="tip-loading">{{#loading}}<img src=\'/ccc/global/img/loading.gif\' style="width:20px;"/>{{/loading}}</span>\n                        <span class="tip">{{#errMsg}}{{errMsg}}{{/errMsg}}</span>\n                    </div>\n                </RInput>\n                {{#HIDE}}\n                <RInput field="refm">\n                    <div class="rinput">\n                        <label style="padding-top: 10px;" for="{{rinputId}}" class="pi-placeholder {{#if value}}pi-placeholder__filled{{/if}}">推荐人:</label>\n                        <input id="{{rinputId}}" name="refm" value="{{value}}" placeholder="请输入推荐人的手机号码，可不填">\n                        <span class="tip-loading">{{#loading}}<img src=\'/ccc/global/img/loading.gif\' style="width:20px;"/>{{/loading}}</span>\n                        <span class="tip">{{#errMsg}}{{errMsg}}{{/errMsg}}</span>\n                    </div>\n                </RInput>\n                {{/HIDE}}\n               <RInput field="inviteCode">\n                    <div class="rinput">\n                        <label style="padding-top: 10px;" for="{{rinputId}}" class="pi-placeholder {{#if value}}pi-placeholder__filled{{/if}}">推荐码:</label>\n                        <input id="{{rinputId}}" name="inviteCode" value="{{value}}" placeholder="请输入推荐码，可不填">\n                        <span class="tip-loading">{{#loading}}<img src=\'/ccc/global/img/loading.gif\' style="width:20px;"/>{{/loading}}</span>\n                        <span class="tip">{{#errMsg}}{{errMsg}}{{/errMsg}}</span>\n                    </div>\n                </RInput>\n                \n<!--                <RInput field="agreement" valueStableDuration=100>-->\n                    <div class="rinput agreement-div">\n                         {{#if stepLoading}}\n                        <input class="next-step" type="button" value="请稍等" disabled /> {{else}}\n                        <input on-click=\'nextStep\' class="next-step" type="button" value="立即注册" /> {{/if}}\n                        <label class="agree-register-protocol">\n                             <span>点击“立即注册”按钮即表示已阅读并同意<span class="i-agree"><a href="/agreement/mobile/regist" target="_blank" class="ccc-agreement">《奇乐融用户注册协议》</a></span></span>\n<!--                            <input type="checkbox" id="{{rinputId}}" checked="{{value}}" />-->\n                            \n                            <br>\n\n<!--                            <span class="tip" style="left:22px;top:20px;line-height:normal;"> {{#errMsg}}{{errMsg}}{{/errMsg}}</span>-->\n                        </label>\n                    </div>\n<!--                </RInput>-->\n                \n            </div>\n            <div class="register-banner">\n                <p><img src="/ccc/register/img/gray-line.png" />\n                    <span>已有账号，立即<a href="/login">登录</a></span>\n                    <img src="/ccc/register/img/gray-line.png" />\n                </p>\n                <div class="register-pic"></div>\n            </div>\n        </div>\n    </Step>\n\n    <Step>\n        <div class="register-step-1">\n            <div class="regist-left">\n            <p class="success"><img src="/ccc/register/img/right-icon.png"/>恭喜您，注册成功！<span class="go-to-account"></span></p>\n            <a href="/newAccount/settings/authentication"><button class="go-account">前往我的账户</button></a>\n            </div>\n            <img class="regist-right" src="/ccc/register/img/regist-success-banner.png"/>\n        </div>\n        \n    </Step>\n</div>\n\n<script>\n    $(".register-frame").on("click", "#get-message", function () {\n        $(".message-brame").val("");\n    })\n</script>\n';
},{}],"/node_modules/@ccc/register/index.js":[function(require,module,exports){
'use strict';

exports.RegisterRactive = require('./js/lib/ractive').RegisterRactive;
exports.validation = require('./js/lib/validation');
exports.errmsgs = require('@ccc/validation').errmsgs;

},{"./js/lib/ractive":"/node_modules/@ccc/register/js/lib/ractive.js","./js/lib/validation":"/node_modules/@ccc/register/js/lib/validation.js","@ccc/validation":"/node_modules/@ccc/validation/index.js"}],"/node_modules/@ccc/register/js/lib/components.js":[function(require,module,exports){
'use strict';
var Ractive = require('ractive');
var _ = require('lodash');

exports.RInput = Ractive.extend({
    isolated: true,
    template: '{{>content}}',
    oninit: function () {
        this.set('rinputId', 'rinput-' + Math.random().toString().substring(2, 8));
        var lazy = Number(this.get('valueStableDuration')) || 600;
        this.observe('value', function () {
            this.fire('startEditing');
        });
        this.observe('value', _.debounce(function (value) {
            this.fire('valueStable', value);
        }, lazy));
    },
    data: {
        value: ''
    }
});

exports.Step = Ractive.extend({
    isolated: true,
    template: '{{>content}}',
    init: function () {
    },
    components: {
        RInput: exports.RInput
    },
    data: {
        loading: true
        // stepIndex: '', // should be set by root
    }
});

},{"lodash":"/lodash","ractive":"/ractive"}],"/node_modules/@ccc/register/js/lib/ractive.js":[function(require,module,exports){
'use strict';
var components = require('./components');
var flux = require('baconflux');
var Ractive = require('ractive');
var _ = require('lodash');
var action = flux.action.bind(null, 'register');
var store = flux.store.bind(null, 'register');
var services = require('./services');
require('./reactive'); // reactive logic in this file
var validation = require('./validation');

exports.RegisterRactive = Ractive.extend({
    components: components,
    init: function () {
        var root = this;
        root.set('onStep', 0);
        var steps = root.steps = root.findAllComponents('Step');
        var rinputs = root.rinputs = {};
        root.observe('onStep', function (newValue) {
            _.each(root.steps, function (step) {
                step.set('onStep', newValue);
            });
        });
        root.steps.forEach(function (step, stepIndex) {
            step.fields = {};
            step.set('stepIndex', stepIndex);
            step.observe('loading', function (newValue) {
                step.set('stepLoading', newValue);
            });
            step.set('loading', false);
            step.findAllComponents('RInput').forEach(function (rinput) {
                step.observe('loading', function (newValue) {
                    rinput.set('stepLoading', newValue);
                });
                rinput.on('nextStep', function () {
                    step.fire('nextStep');
                });
                var initData = rinput.get();
                var field = initData.field;
                if (!field) {
                    throw(new Error('rinput field required'));
                }
                if (initData.defaultValue) {
                    rinput.set('value', initData.defaultValue);
                }
                step.fields[field] = rinput;
                root.rinputs[field] = rinput;

                // set initial values
                var initValue;
                if ((initValue = root.get(field + '.data.value'))) {
                    rinput.set('value', initValue);
                }

                // delegates data
                root.observe(field + '.data.*', function (newValue, oldValue, keypath, rfield) {
                    if ('value loading errCode errMsg strength smsCaptchaDisabled smsCaptchaReady smsCaptchaCountDown imgCaptchaBase64 imgCaptchaToken'.split(' ').indexOf(rfield) > -1) {
                        rinput.set(rfield, newValue);
                        _.each(root.steps, function (step) {
                            step.set('fields.'+keypath, newValue);
                        });
                        _.each(root.rinputs, function (rinput) {
                            rinput.set('fields.'+keypath, newValue);
                        });
                    }
                });
            });
        });
        var imgCaptcha = rinputs.imgCaptcha;
        if (imgCaptcha) {
            imgCaptcha.on('changeImgCaptcha', function () {
                services.imgCaptcha().then(function (body) {
                    root.set('imgCaptcha.data.imgCaptchaBase64', body.captcha);
                    root.set('imgCaptcha.data.imgCaptchaToken', body.token);
                    validation.imgCaptcha.async = validation.genAsyncValidator(
                        '/api/v2/captcha?token=' + body.token,
                        'captcha'
                    );
                    store('value', 'imgCaptcha').push('');
                    store('errCode', 'imgCaptcha').push(false);
                    store('errMsg', 'imgCaptcha').push(false);
                })
            });
            action('changeImgCaptcha').onValue(function () {
                imgCaptcha.fire('changeImgCaptcha');
            });
            action('changeImgCaptcha').push();
        }
        // 后面的事情交给 这个 action 的 listener 做
        action('inited').push(root);
    }
});

},{"./components":"/node_modules/@ccc/register/js/lib/components.js","./reactive":"/node_modules/@ccc/register/js/lib/reactive.js","./services":"/node_modules/@ccc/register/js/lib/services.js","./validation":"/node_modules/@ccc/register/js/lib/validation.js","baconflux":"/baconflux","lodash":"/lodash","ractive":"/ractive"}],"/node_modules/@ccc/register/js/lib/reactive.js":[function(require,module,exports){
'use strict';

window.Promise = require('bluebird');
var globalValidator = require('@ccc/validation').validator;
var Bacon = require('baconjs');
var _ = require('lodash');
var flux = require('baconflux');
var errmsgs = require('@ccc/validation').errmsgs;
var action = flux.action.bind(null, 'register');
var async = flux.store.bind(null, 'register');
var store = flux.store.bind(null, 'register');
var validation = require('./validation');
var services = require('./services');
errmsgs.INVALID_CAPTCHA = errmsgs.IMGCAPTCHA_INVALID = errmsgs.IMG_CAPTCHA_INVALID = '图片验证码错误或已失效'
errmsgs.INVALID_REQUIRED = errmsgs.IMGCAPTCHA_NULL = errmsgs.IMG_CAPTCHA_NULL = '请填写图片验证码'
errmsgs.REFM_NOT_EXISTS = '此手机号码未在本站注册'
errmsgs.REFM_INVALID = '请正确填写推荐人手机号码'
errmsgs.EMP_REFERRAL_NOT_EXISTS = '未找到此号码关联的财富经理'
errmsgs.EMAIL_ALREADY_EXISTED = '此邮箱已在本站注册'

action('inited').onValue(function (registerRactive) {
    var rinputs = registerRactive.rinputs;
    var steps = registerRactive.steps;

    // 密码相关检查
    store('value', 'password').onValue(function (password) {
        var strength = validation.passwordStrength(password);
        registerRactive.set('passwordStrength', strength);
        registerRactive.set('password.data.strength', strength);
        registerRactive.set('repassword.data.strength', strength); // 有的奇葩设计可能把密码强弱放这，更奇葩的就不支持了
        if (rinputs.repassword) {
            validation.repassword.sync = globalValidator.repassword.bind(null, password);
            store('value', 'repassword').push(registerRactive.get('repassword.data.value'));
        }
    });
    function trimmedValue(value, field) {
        value = value || '';
        if (!(field||'').match(/password$/)) { // skip password or repassword
            return (''+value).trim();
        }
        return value;
    }
    // 通用项检查
    _.each(rinputs, function (rinput, field) {
        var validator = validation[field] || {};
        if (!validator) {
            return;
        }

        // 转换从 ractive 的事件成 stream
        action('startEditing', field).plug(Bacon.fromEvent(rinput, 'startEditing'));
        store('value', field).plug(Bacon.fromEvent(rinput, 'valueStable'));

        var asyncCheck = async('check', field);
        function currentAsyncCheckPromise() {
            var promise = asyncCheck.currentPromise;
            if (promise) {
                return promise;
            }
            var resolve;
            promise = asyncCheck.currentPromise = new Promise(function () {
                resolve = arguments[0];
            });
            promise.resolveSelf = resolve;
            asyncCheck.push(promise);
            return promise;
        }
        action('startEditing', field).onValue(currentAsyncCheckPromise);
        store('value', field).onValue(function (value) {
            // promise 的 resolve 值是 errCode
            value = trimmedValue(value, field);
            var promise = currentAsyncCheckPromise();
            var errCode;
            delete asyncCheck.currentPromise; // 考虑异步检查还没返回就又 startEditing 的情况，在这里就 delete
            if (!value) {
                // 未填写先不在这验证，点击下一步时才做
                promise.resolveSelf(false);
                return;
            }
            if (validator.sync && (errCode = validator.sync(value))) {
                // 先做同步检查
                promise.resolveSelf(errCode);
                return;
            }
            if (validator.async) {
                // 同步检查没问题后做异步检查
                validator.async(value, promise.resolveSelf.bind(promise));
                return;
            }
            // 异步检查不存在，并且同步检查通过或也不存在的时候
            return promise.resolveSelf(false);

        });
        store('checkResult', field).plug(asyncCheck.flatMapLatest(Bacon.fromPromise));

        // 先设置依赖关系
        store('loading', field).plug(async('check', field).map(true));
        store('loading', field).plug(store('checkResult', field).map(false));

        store('errCode', field).plug(action('startEditing', field).map(false));
        store('errCode', field).plug(store('checkResult', field)); // checkResult 的结果就是 errCode

        store('errMsg', field).plug(store('errCode', field).map(errmsgs.getFromErrCode));

        // 最后 push 上默认值
        store('loading', field).push(false);
        store('errCode', field).push(false);

        store(field).plug(Bacon.combineTemplate({
            loading: store('loading', field),
            value: store('value', field),
            errCode: store('errCode', field),
            errMsg: store('errMsg', field)
        }));

        var countdown = (function() {
            var currentValue = 61;
            function tick() {
                currentValue -= 1;
                if (!currentValue) {
                    return reset();
                }
                store(field, 'smsCaptchaCountDown').push(currentValue);
            }
            var timer;
            function reset() {
                currentValue = 61;
                store(field, 'smsCaptchaCountDown').push(0);
                clearInterval(timer);
                timer = null;
            }
            function start() {
                timer = setInterval(tick, 1000);
            }
            reset();
            var obj = {
                timer: null,
                tick: tick,
                reset: reset,
                start: start,
                isRunning: function () { return !!timer; }
            };
            return obj;
        }());

        if (field === 'mobile' || field === 'smsCaptcha') {
            var sendSmsCaptcha = action(field, 'sendSmsCaptcha');
            sendSmsCaptcha.plug(store('value', 'mobile').sampledBy(Bacon.fromEvent(rinput, 'sendSmsCaptcha')));
            var smsCaptchaReady = store(field, 'smsCaptchaReady');
            smsCaptchaReady.plug(async('check', 'mobile').map(false));
            smsCaptchaReady.plug(store('value', 'mobile').sampledBy(async('check', 'mobile').flatMapLatest(Bacon.fromPromise), function (value, checkResult) {
                if (value && !checkResult) {
                    countdown.reset();
                    return value;
                }
            }));
            smsCaptchaReady.onValue(registerRactive, 'set', field+'.data.smsCaptchaReady');

            var smsCaptchaCountDown = store(field, 'smsCaptchaCountDown');
            var smsCaptchaDisabled = store(field, 'smsCaptchaDisabled');
            smsCaptchaReady.onValue(function (ready) {
                smsCaptchaDisabled.push(!ready);
            });
            smsCaptchaCountDown.onValue(function (countdown) {
                smsCaptchaDisabled.push(countdown > 0);
            });
            smsCaptchaDisabled.onValue(registerRactive, 'set', field+'.data.smsCaptchaDisabled');
            smsCaptchaDisabled.push(true);
            if (!rinputs.imgCaptcha) {
                smsCaptchaDisabled.sampledBy(sendSmsCaptcha, function (disabled, mobile) {
                    if (disabled || !mobile || countdown.isRunning()) {
                        return false;
                    }
                    return mobile;
                }).filter(Boolean).onValue(function (mobile) {
                    services.sendSmsCaptcha(mobile);
                    countdown.start();
                });
            } else {
                var iccrs = async(field, 'imgCaptchaCheckResultSampledByClick');
                iccrs.plug(async('check', 'imgCaptcha').sampledBy(sendSmsCaptcha));
                iccrs.sampledBy(sendSmsCaptcha, function (resultPromise, mobile) {
                    var mobileErrCode = rinputs.mobile.get('errCode');
                    if (!mobile || mobileErrCode) {
                        return Promise.resolve(mobileErrCode || 'MOBILE_NULL');
                    }
                    return resultPromise;
                }).flatMapLatest(Bacon.fromPromise).onValue(function (result) {
                    store('errCode', field).push(false);
                    var captcha = rinputs.imgCaptcha.get('value');
                    if (result || !captcha) {
                        store('errCode', field).push(result || 'IMG_CAPTCHA_NULL');
                        // action('changeImgCaptcha').push();
                        return;
                    }
                    var token = rinputs.imgCaptcha.get('imgCaptchaToken');
                    var mobile = rinputs.mobile.get('value');
                    services.smsCaptcha(token, captcha, mobile).then(function (body) {
                        if (!body.success) {
                            store('errCode', field).push(result || 'IMG_CAPTCHA_INVALID');
                            action('changeImgCaptcha').push();
                            return;
                        }
                        countdown.start();
                    });
                });
            }
            smsCaptchaCountDown.onValue(registerRactive, 'set', field+'.data.smsCaptchaCountDown');
        }
        store('errCode', 'smsCaptcha').plug(action('startEditing', 'mobile').map(false));
        store(field).onValue(registerRactive, 'set', field + '.data');
    });

    var firstStepWithoutRInputReached = false;
    var doSubmit = [];
    steps.forEach(function (step, stepIndex) {
        if (stepIndex && !_.keys(step.fields).length && !firstStepWithoutRInputReached) {
            firstStepWithoutRInputReached = true;
            doSubmit[stepIndex - 1] = true;
        }

        var stepAsyncCheck = async('step', stepIndex, 'asyncCheck');
        stepAsyncCheck.plug(Bacon.combineTemplate(_.transform(step.fields, function (result, rinput, field) {
            result[field] = async('check', field);
        })).map(Promise.props)); // 输入后自动触发的检查
        var ac = async('step', stepIndex, 'check'); // 这一步所有 input 的结果，点击下一步后需要的必填项修正
        ac.plug(stepAsyncCheck.map(function (checkResultPromise) {
            return checkResultPromise.then(function (checkResult) {
                return _.transform(checkResult, function (result, asyncErrCode, field) {
                    // 输入时忽略了未填错误，这里补上
                    value = trimmedValue(value, field);
                    var validator = validation[field] || {};
                    var value = rinputs[field].get('value');
                    var errCode;
                    if (validator.sync && (errCode = validator.sync(value))) {
                        result[field] = errCode;
                        fixRequired(result, field, value, errCode);
                        return;
                    }
                    result[field] = asyncErrCode;
                    fixRequired(result, field, value, errCode);
                });
            });
        }));
        function fixRequired(result, field, value, errCode) {
            var validator = validation[field] || {};
            if (validator.required === false && (errCode || '').match(/_NULL$/)) {
                result[field] = false;
            } else if (validator.required && !errCode && !value) {
                result[field] = field.toUpperCase() + '_NULL';
            }
        }
        action('nextStep', stepIndex).plug(Bacon.fromEvent(step, 'nextStep'));
        var ans = async('nextStep', stepIndex);
        ans.plug(ac.sampledBy(action('nextStep', stepIndex), function (checkResultPromise, nextStep) {
            step.set('loading', true);
            // 这个回掉相当于点击下一步时得到 cr 的最新结果
            return checkResultPromise.then(function (cr) {
                var letsGo = true;
                _.each(cr, function (cr, field) {
                    if (!cr) {
                        return;
                    }
                    store('errCode', field).push(cr);
                    letsGo = false;
                });
                return letsGo;
            });
        }));
        ans.flatMapLatest(Bacon.fromPromise).onValue(function (shouldGoNext) {
            step.set('loading', false);
            if (shouldGoNext) {
                if (!doSubmit[stepIndex]) {
                    action('switchStep').push(stepIndex + 1);
                    return;
                }
                var user = _.transform(rinputs, function (result, rinput, field) {
                    var propAlter = {
                        smsCaptcha: 'mobile_captcha',
                        refm: 'referral',
                        refl: 'referral',
                        refc: 'referral',
                        reftf: registerRactive.get('whatTheRefFuck') || 'referral',
                        refi: 'inviteCode'
                    };
                    result[propAlter[field] || field] = trimmedValue(rinput.get('value'), field);
                    if (field === 'email' && result.email && validation.email.vermail) {
                        result.vermail = '1';
                    }
                });
                // 可以不要 loginName 这一项 field, 默认填写上，设置了 CC.config.clientCode 的话就以这个为前缀
                if (!user.loginName) {
                    var prefix;
                    if (window.CC && CC.config && CC.config.clientCode) {
                        prefix = CC.config.clientCode.toLowerCase() + '_';
                    } else if (registerRactive.get('mobilePrefix')) {
                        prefix = registerRactive.get('mobilePrefix');
                    } else {
                        prefix = '手机用户';
                    }
                    user.loginName = prefix + user.mobile;
                }
                doRegister(user, stepIndex);
            }
        });
    });
    action('switchStep').onValue(registerRactive, 'set', 'onStep');
    var fieldInWhichStep = (function() {
        var result = {};
        steps.slice().reverse().slice(1).forEach(function (step) {
            _.each(step.fields, function (rinputs, field) {
                result[field] = step.get('stepIndex');
            });
        });
        return result;
    }());
    function doRegister(user, currentStep) {
        services.register(user)
        .then(function (body) {
            var goStep = currentStep + 1;
            if (body.success) {
                store('success').push(_.assign(body.data, {postedData: user}));
            } else {
                var goStep = _(body.error)
                    .map(function (err) {
                        store('errCode', err.type).push(err.message);
                        return fieldInWhichStep[err.type];
                    })
                    .uniq()
                    .min();
            }
            action('switchStep').push(goStep);
        });
    }
});
window.rstore = store;
window.raction = action;

},{"./services":"/node_modules/@ccc/register/js/lib/services.js","./validation":"/node_modules/@ccc/register/js/lib/validation.js","@ccc/validation":"/node_modules/@ccc/validation/index.js","baconflux":"/baconflux","baconjs":"/baconjs","bluebird":"/bluebird","lodash":"/lodash"}],"/node_modules/@ccc/register/js/lib/services.js":[function(require,module,exports){
'use strict';
var request = require('promisingagent');

exports.sendSmsCaptcha = function (mobile) {
    return request('GET', '/api/v2/users/smsCaptcha?mobile=' + mobile).get('body');
}

exports.imgCaptcha = function () {
    return request('/api/v2/captcha', {query: {v: (new Date).valueOf()}})
    .get('body');
}

exports.smsCaptcha = function (token, captcha, mobile) {
    return request('/register/ajax/smsCaptcha', {
        query: {
            captcha_token: token,
            captcha_answer: captcha,
            mobile: mobile
        }
    }).get('body');
}

exports.register = function (user) {
    return request('POST', '/register/ajax/submit', {
        body: user
    }).get('body');
}

},{"promisingagent":"/promisingagent"}],"/node_modules/@ccc/register/js/lib/validation.js":[function(require,module,exports){
'use strict';
var validator = require('@ccc/validation').validator;
var request = require('promisingagent');

exports.passwordStrength = validator.passwordStrength;

exports.genAsyncValidator = genAsyncValidator;
function genAsyncValidator(url, field) {
    return function (value, cb) {
        var body = {};
        body[field] = value;
        request('POST', url, {body: body})
            .then(function (r) {
                if (!r.body) {
                    throw new Error;
                }
                cb(r.body.success ? false : r.body.error[0].message);
            })[
            "catch"](function () {
                cb('UNKNOWN_ERROR');
            });
    };
}

exports.loginName = {
    required: true,
    sync: validator.loginName,
    async: genAsyncValidator('/api/v2/users/check/login_name', 'loginName')
};

exports.password = {
    required: true,
    sync: validator.password
};

exports.repassword = {
    required: true
};

exports.mobile = {
    required: true,
    sync: validator.mobile,
    async: genAsyncValidator('/api/v2/users/check/mobile', 'mobile')
};

exports.refi = {
    required: false,
    sync: validator.refi,
    async: genAsyncValidator('/api/v2/users/check/inviteCode', 'inviteCode')
};

exports.refm = {
    required: false,
    sync: function (mobile) {
        var result = validator.mobile(mobile);
        if (result === 'MOBILE_INVALID') {
            return 'REFM_INVALID';
        }
        return false;
    },
    async: (function() {
        var av = genAsyncValidator('/api/v2/users/check/mobile', 'mobile');
        return function (value, cb) {
            av(value, function (result) {
                if (result === false) {
                    cb('REFM_NOT_EXISTS');
                } else if (result === 'MOBILE_INVALID') {
                    cb('REFM_INVALID');
                } else if (result === 'UNKNOWN_ERROR') {
                    cb('UNKNOWN_ERROR');
                }
                cb(false);
            });
        };
    }())
};

exports.imgCaptcha = {
    required: false
};

exports.smsCaptcha = {
    required: true,
    sync: validator.smsCaptcha,
    async: genAsyncValidator('/api/v2/users/smsCaptcha', 'smsCaptcha')
};

exports.email = {
    required: false,
    sync: validator.email,
    async: genAsyncValidator('/api/v2/users/check/email', 'email')
};

exports.empReferral = {
    required: false,
    async: genAsyncValidator('/api/v2/users/check/emp_referral', 'empReferral')
};

exports.agreement = {
    required: true
};

},{"@ccc/validation":"/node_modules/@ccc/validation/index.js","promisingagent":"/promisingagent"}],"/node_modules/@ccc/validation/index.js":[function(require,module,exports){
'use strict';
exports.errmsgs = require('./js/lib/errmsgs');
exports.validator = require('./js/lib/validator');

},{"./js/lib/errmsgs":"/node_modules/@ccc/validation/js/lib/errmsgs.js","./js/lib/validator":"/node_modules/@ccc/validation/js/lib/validator.js"}],"/node_modules/@ccc/validation/js/lib/errmsgs.js":[function(require,module,exports){
'use strict';

exports = module.exports = {
    PASSWORD_NULL: '请填写密码,不能为空字符',
    PASSWORD_LENGTH: '请填写至少 6 位密码',
    PASSWORD_AGAIN_NULL: '请填写密码确认',
    PASSWORD_AGAIN_INVALID: '两次输入的密码不一致',
    REPASSWORD_NULL: '请填写密码确认',
    REPASSWORD_INVALID: '两次输入的密码不一致',
    MOBILE_USED: '手机号码已被使用',
    MOBILE_EXISTS: '手机号码已被使用',
    MOBILE_CAPTCHA_NULL: '请填写手机短信验证码',
    MOBILE_CAPTCHA_INVALID: '验证码无效或已过期，请尝试重新发送',
    MOBILE_CAPTCHA_EXPIRED: '验证码过期，请尝试重新发送',
    AGREEMENT_NULL: '注册需先同意服务条款',
    CAPTCHA_NULL: '请填写验证码',
    CAPTCHA_INVALID: '验证码不正确',
    MOBILE_NULL: '请填写手机号码',
    MOBILE_INVALID: '请输入正确的手机号',
    LOGINNAME_EXISTS: '用户名已存在',
    LOGINNAME_STRICT: '2至16位中英文字符、数字或下划线',
    LOGINNAME_NULL: '请填写用户名',
    LOGINNAME_INVALID: '2至16位中英文字符、数字或下划线',
    LOGINNAME_SIZE: '2至16位中英文字符、数字或下划线',
    LOGINNAME_NOT_MOBILE: '用户名不能是手机号（注册后可以用手机号登录）',
    NAME_NULL: '请填写真实姓名',
    NAME_INVALID: '真实姓名错误，应为2-16位中文汉字',
    EMAIL_NULL: '请填写电子邮箱',
    EMAIL_INVALID: '请输入正确的邮箱',
    IDNUMBER_INVALID: '请正确填写 18 位身份证号码',
    LOGIN_INVALID: '手机号或密码错误',
    INVALID_CAPTCHA: '验证码错误',
    LOGINNAME_NOT_MATCH: '手机号码与登录名不匹配',
    INVITATION_INVALID: 'H码无效',
    INVITATION_NULL: 'H码为空',
    PAYMENT_ACCOUNT_CREATE_ERROR: '国政通实名认证校验未通过',
    SMSCAPTCHA_INVALID: '验证码为6位',
    SMSCAPTCHA_NULL: '验证码不能为空',
    INVITECODE_INVALID:'邀请码无效'
};

exports.getFromErrCode = function (errCode) {
    return errCode ? (exports[errCode] || '出错了，请稍后重试') : '';
};

},{}],"/node_modules/@ccc/validation/js/lib/validator.js":[function(require,module,exports){
'use strict';

exports.loginName = function (loginName) {
    var reg = /^(?!([\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+))([0-9a-zA-Z_\u4E00-\u9FBF]+)/;

    if (!loginName || !loginName.length) {
        return 'LOGINNAME_NULL';
    }

    if (loginName.length < 2 || loginName.length > 16) {
        return 'LOGINNAME_SIZE';
    }

    if (!exports.mobile(loginName)) {
        return 'LOGINNAME_NOT_MOBILE';
    }

    if (!('' + loginName).match(reg)) {
        return 'LOGINNAME_INVALID';
    }

    return false;
};

exports.password = function (password) {
    if (!password || !password.length) {
        return 'PASSWORD_NULL';
    }

    if (password.length < 6) {
        return 'PASSWORD_LENGTH';
    }

    return false;
};

exports.repassword = function (password, repassword) {
    if (!repassword || !repassword.length) {
        return 'REPASSWORD_NULL';
    }

    if (repassword !== password) {
        return 'REPASSWORD_INVALID';
    }

    return false;
};

exports.passwordStrength = function (password) {
    var upperReg = /[A-Z]/;
    var lowerReg = /[a-z]/;
    var numReg = /[0-9]/;
    var symbolReg = /\W/;

    if ((password || '').length < 6) {
        return 0;
    }

    var score = 0;
    if (upperReg.test(password)) {
        score += 0.6;
    }
    if (lowerReg.test(password)) {
        score += 0.6;
    }
    if (numReg.test(password)) {
        score += 0.6;
    }
    if (symbolReg.test(password)) {
        score += 0.9;
    }
    return Math.ceil(score);
};

exports.email = function (email) {
    if (!email || !email.length) {
        return 'EMAIL_NULL';
    }

    if (!('' + email).match(/[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+/)) {
        return 'EMAIL_INVALID';
    }

    return false;
};

exports.mobile = function (mobile) {
    if (!mobile || !mobile.length) {
        return 'MOBILE_NULL';
    }

    if (!('' + mobile)
        .match(/^1\d{10}$/)) {
        return 'MOBILE_INVALID';
    }

    return false;
};

exports.checkIdNumber = function (idNumber) {
    idNumber = ('' + idNumber).replace(/^\s+|\s+$/g, '');
    var pcode = []; //只有这些数字开头的代码才是合法的
    pcode.push('11'); //北京
    pcode.push('12'); //天津
    pcode.push('13'); //河北
    pcode.push('14'); //山西
    pcode.push('15'); //内蒙古
    pcode.push('21'); //辽宁
    pcode.push('22'); //吉林
    pcode.push('23'); //黑龙江
    pcode.push('31'); //上海
    pcode.push('32'); //江苏
    pcode.push('33'); //浙江
    pcode.push('34'); //安徽
    pcode.push('35'); //福建
    pcode.push('36'); //江西
    pcode.push('37'); //山东
    pcode.push('41'); //河南
    pcode.push('42'); //湖北
    pcode.push('43'); //湖南
    pcode.push('44'); //广东
    pcode.push('45'); //广西
    pcode.push('46'); //海南
    pcode.push('50'); //重庆
    pcode.push('51'); //四川
    pcode.push('52'); //贵州
    pcode.push('53'); //云南
    pcode.push('54'); //西藏
    pcode.push('61'); //陕西
    pcode.push('62'); //甘肃
    pcode.push('63'); //青海
    pcode.push('64'); //宁夏
    pcode.push('65'); //新疆
    if (!~pcode.indexOf(idNumber.substring(0, 2))) {
        return 'IDNUMBER_INVALID';
    }

    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var validEnding = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var result = _.reduce(factor, function (r, n, i) { return r + n * ~~idNumber[i]; }, 0) % 11;

    if (idNumber[17] != validEnding[result]) {
        return 'IDNUMBER_INVALID';
    }
    return false;
};

exports.name = function (name) {
    if (!name || !name.length) {
        return 'NAME_NULL';
    }

    if (!('' + name)
        .match(/[\u4E00-\u9FBF]{2,15}/)) {
        return 'NAME_INVALID';
    }

    return false;
};

exports.smsCaptcha = function (sms) {
    if (!sms || !sms.length) {
        return 'SMSCAPTCHA_NULL';
    }

    if (sms.length !== 6) {
        return 'SMSCAPTCHA_INVALID';
    }

    return false;
};

},{}]},{},["/ccc/register/js/main/register.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvemZjbS93b3JrL3Byb2plY3QtenFqci10bXAvd2ViL2NjYy9yZWdpc3Rlci9qcy9tYWluL3JlZ2lzdGVyLmpzIiwiLy0vY2NjL3JlZ2lzdGVyL3BhcnRpYWxzL3N0ZXBzLmh0bWwiLCIvLS9ub2RlX21vZHVsZXMvQGNjYy9yZWdpc3Rlci9pbmRleC5qcyIsIi8tL25vZGVfbW9kdWxlcy9AY2NjL3JlZ2lzdGVyL2pzL2xpYi9jb21wb25lbnRzLmpzIiwiLy0vbm9kZV9tb2R1bGVzL0BjY2MvcmVnaXN0ZXIvanMvbGliL3JhY3RpdmUuanMiLCIvLS9ub2RlX21vZHVsZXMvQGNjYy9yZWdpc3Rlci9qcy9saWIvcmVhY3RpdmUuanMiLCIvLS9ub2RlX21vZHVsZXMvQGNjYy9yZWdpc3Rlci9qcy9saWIvc2VydmljZXMuanMiLCIvLS9ub2RlX21vZHVsZXMvQGNjYy9yZWdpc3Rlci9qcy9saWIvdmFsaWRhdGlvbi5qcyIsIi8tL25vZGVfbW9kdWxlcy9AY2NjL3ZhbGlkYXRpb24vaW5kZXguanMiLCIvLS9ub2RlX21vZHVsZXMvQGNjYy92YWxpZGF0aW9uL2pzL2xpYi9lcnJtc2dzLmpzIiwiLy0vbm9kZV9tb2R1bGVzL0BjY2MvdmFsaWRhdGlvbi9qcy9saWIvdmFsaWRhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDO0FBQ2IsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGVBQWUsQ0FBQztBQUMvRCxJQUFJLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQztBQUN0QyxNQUFFLEVBQUUscUJBQXFCO0FBQ3pCLFlBQVEsRUFBRSxPQUFPLENBQUMsa0NBQWtDLENBQUM7Q0FDeEQsQ0FBQyxDQUFDOztBQUVILFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRTs7QUFFM0QsV0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDeEIsWUFBSSxFQUFFO0FBQ0YscUJBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVM7QUFDcEMsb0JBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVE7U0FDckM7S0FDSixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDUixRQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixRQUFJLFFBQVEsR0FBRyxXQUFXLENBQUUsWUFBWTtBQUNwQyxVQUFFLElBQUksQ0FBQztBQUNQLFlBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtBQUNYLG1CQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLHlCQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEIsa0JBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLHFDQUFxQyxDQUFDO1NBQ2hFO0tBQ0osRUFBRyxJQUFJLENBQUMsQ0FBQztDQUNiLENBQUMsQ0FBQzs7QUFFSCxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO0FBQ2pDLFdBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDekIsQ0FBQyxDQUFDOzs7QUFJSCxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDekMsS0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQy9CLENBQUMsQ0FBQzs7O0FBS0gsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVk7O0FBRW5ELEtBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUM3RSxDQUFDLENBQUE7OztBQUlGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDbkYsUUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUM7QUFDcEIsVUFBRSxFQUFFLGVBQWU7QUFDbkIsZ0JBQVEsRUFBRSx3RkFBd0Y7QUFDbEcsWUFBSSxFQUFFO0FBQ0YsaUJBQUssRUFBRSxHQUFHLENBQUMsSUFBSTtTQUNsQjtLQUNKLENBQUMsQ0FBQztDQUNOLENBQUMsQ0FBQzs7QUFFSCxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7QUFDaEIsbUJBQWUsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQ2hFOzs7QUMxREQ7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24obil7XCJ1c2Ugc3RyaWN0XCI7aWYobi5CQ1AmJlwiZnVuY3Rpb25cIj09PXR5cGVvZiBuLkJDUC5wcmVsdWRlKXJldHVybiBuLkJDUC5wcmVsdWRlO3ZhciBlPW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxuLnNldEltbWVkaWF0ZXx8ZnVuY3Rpb24obil7cmV0dXJuIHNldFRpbWVvdXQobiwxKX07dGhpcy5RQVM9ZnVuY3Rpb24obil7dmFyIGU9bi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fG4uc2V0SW1tZWRpYXRlfHxmdW5jdGlvbihuKXtyZXR1cm4gc2V0VGltZW91dChuLDEpfTt2YXIgcj1bXS5jb25jYXQobi5fcWFzX3F1ZXVlfHxbXSk7aWYobi5fcWFzX3F1ZXVlKWRlbGV0ZSBuLl9xYXNfcXVldWU7dmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlO3ZhciB1PWZ1bmN0aW9uKG4pe3ZhciBlPXQuY2FsbChhcmd1bWVudHMsMSk7aWYodS5sb2FkZWQpbyhuLGUpO2Vsc2Ugci5wdXNoKFtuLGVdKTtyZXR1cm4gdX07dS5zeW5jPWZ1bmN0aW9uKG4pe24uc3luYz10cnVlO3JldHVybiB1LmFwcGx5KG51bGwsYXJndW1lbnRzKX07dS5yZWFkeT1pO3Uuc3luYy5yZWFkeT1pO2Z1bmN0aW9uIGkoKXt1LmxvYWRlZD10cnVlO3ZhciBuO3doaWxlKG49ci5zaGlmdCgpKXtvKG5bMF0sblsxXSl9fWZ1bmN0aW9uIG8ocix0KXtpZih0eXBlb2YgciE9XCJmdW5jdGlvblwiKXJldHVybjtyLnN5bmM/ci5hcHBseShuLHQpOmUoZnVuY3Rpb24oKXtyLmFwcGx5KG4sdCl9KX1yZXR1cm4gdX0odGhpcyk7dmFyIHI9bi5CQ1A9dDtmdW5jdGlvbiB0KG4pe1FBUyhuLGwoW10pKX10LnN5bmM9ZnVuY3Rpb24obil7UUFTLnN5bmMobixsKFtdKSl9O3IucHJlbHVkZT1jO3IubWVyZ2VNb2R1bGVzPWE7dmFyIHU9MDt2YXIgaT1yLmNhY2hlPXt9O3ZhciBvPXIubW9kdWxlcz17fTtyZXR1cm4gYztmdW5jdGlvbiBhKG4pe249bnx8e307Zm9yKHZhciBlIGluIG4pe2lmKHR5cGVvZiBlIT09XCJudW1iZXJcIiYmbi5oYXNPd25Qcm9wZXJ0eShlKSl7aWYoIShlIGluIG8pKXtvW2VdPW5bZV07aWYoZVswXSE9PVwiL1wiKW9bXCIvXCIrZV09bltlXX19fX1mdW5jdGlvbiBmKCl7dSs9MTtlKGZ1bmN0aW9uKCl7aWYodT49ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFtkYXRhLWNvbW1vbl1cIikubGVuZ3RoKXtRQVMucmVhZHkoKX19KX1mdW5jdGlvbiBjKG4sZSx0KXtyLm1lcmdlTW9kdWxlcyhuKTt2YXIgdT1sKHQpO2lmKCF0fHwhdC5sZW5ndGgpe2YoKX1lbHNle3ZhciBpO1FBUyhmdW5jdGlvbihuKXt3aGlsZShpPW4uc2hpZnQoKSl7dShpKX19LHQpfXJldHVybiB1fWZ1bmN0aW9uIGwobil7cmV0dXJuIGZ1bmN0aW9uIGUocil7aWYoIVFBUy5sb2FkZWQpe3Rocm93IG5ldyBFcnJvcihcImV4dGVybmFsIGxpYnMgbm90IHJlYWR5IVwiKX12YXIgdD1yO2lmKHR5cGVvZiB0PT09XCJzdHJpbmdcIiYmdFswXT09PVwiL1wiKXt0PXQucmVwbGFjZSgvXlxcLy8sXCJcIil9dmFyIHU7aWYoIWlbdF0pe2lmKCEodT1vW3RdKSl7aWYoISh1PW9bcj09PVwiL1wiK3Q/cjp0PVwiL1wiK3RdKSl7aWYoISh1PW9bdD1cIi9ub2RlX21vZHVsZXNcIit0XSkpe3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrcitcIidcXG5cXG5hbGwgYXZhaWxhYmxlIG1vZHVsZXM6XFxuXCIrcygpLmpvaW4oXCJcXG5cIikpO2EuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIjt0aHJvdyBhfX19dmFyIGY9aVt0XT1pW3JdPXtleHBvcnRzOnt9fTt1WzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKG4pe3ZhciByPXVbMV1bbl07cmV0dXJuIGUocj9yOlwiL1wiK24pfSxmLGYuZXhwb3J0cyxjLG8saSxuKX1yZXR1cm4gaVt0XS5leHBvcnRzfX1mdW5jdGlvbiBzKCl7dmFyIG49e307cChvLGZ1bmN0aW9uKGUscil7aWYoKFwiXCIrcikubWF0Y2goL15cXC8/XFxkKyQvKSlyZXR1cm47bltyLnJlcGxhY2UoL15cXC8obm9kZV9tb2R1bGVzXFwvKT8vLFwiXCIpXT0xfSk7cmV0dXJuIG0obil9ZnVuY3Rpb24gZChuLGUpe3ZhciByLHQ7Zm9yKHI9MCx0PW4ubGVuZ3RoO3I8dDtyKyspe2UuY2FsbChuLG5bcl0sayxuKX19ZnVuY3Rpb24gcChuLGUpe2Zvcih2YXIgciBpbiBuKXtpZihuLmhhc093blByb3BlcnR5KHIpKXtlLmNhbGwobixuW3JdLHIsbil9fX1mdW5jdGlvbiBtKG4pe3ZhciBlPVtdO3AobixmdW5jdGlvbihuLHIpe2UucHVzaChyKX0pO3JldHVybiBlfX0pLmNhbGwodGhpcyx0aGlzKSIsIid1c2Ugc3RyaWN0JztcbnZhciBSZWdpc3RlclJhY3RpdmUgPSByZXF1aXJlKCdAY2NjL3JlZ2lzdGVyJykuUmVnaXN0ZXJSYWN0aXZlO1xudmFyIHJlZ2lzdGVyUmFjdGl2ZSA9IG5ldyBSZWdpc3RlclJhY3RpdmUoe1xuICAgIGVsOiAnI3JlZ2lzdGVyLWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJ2NjYy9yZWdpc3Rlci9wYXJ0aWFscy9zdGVwcy5odG1sJylcbn0pO1xuXG5iYWNvbmZsdXguc3RvcmUoJ3JlZ2lzdGVyJywgJ3N1Y2Nlc3MnKS5vblZhbHVlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgLy8g5rOo5YaM5ZCO6Ieq5Yqo55m75b2VXG4gICAgcmVxdWVzdC5wb3N0KCcvbG9naW4vYWpheCcsIHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgICAgbG9naW5OYW1lOiBkYXRhLnBvc3RlZERhdGEubG9naW5OYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IGRhdGEucG9zdGVkRGF0YS5wYXNzd29yZCxcbiAgICAgICAgfVxuICAgIH0pLmVuZCgpXG4gICAgdmFyIGxlZnQgPSAzO1xuICAgIHZhciBpbnRlcnZhbCA9IHNldEludGVydmFsKChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC0tbGVmdDtcbiAgICAgICAgaWYgKGxlZnQgPT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGVmdClcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9uZXdBY2NvdW50L3NldHRpbmdzL2F1dGhlbnRpY2F0aW9uXCI7XG4gICAgICAgIH1cbiAgICB9KSwgMTAwMCk7XG59KTtcblxuJChcIiNnZXRTbXNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCdzZGZzZGYnKTtcbn0pO1xuXG5cbi8v6aqM6K+B56CB55qE5Zu+54mH5YiH5o2iXG4kKFwiI3JlZnJlc2gtY2FwdGNoYVwiKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAkKFwiLnJlZ2lzdGVyLXRlc3RcIikudmFsKFwiXCIpO1xufSk7XG5cblxuXG4vL+mqjOivgeeggeeahOWMl+S6rOWbvueJh+makOiXj1xuJChcIi5mb3JtLWdyb3VwIC5pbnB1dHRlc3QtcGljIHNwYW5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgJChcIi5mb3JtLWdyb3VwIC5pbnB1dHRlc3QtcGljIC5wdWxscmlnaHRcIikuY3NzKFwiYmFja2dyb3VuZEltYWdlXCIsIFwibm9uZVwiKTtcbn0pXG5cblxuLy/ms6jlhozlm77niYdcbnJlcXVlc3QuZ2V0KGVuY29kZVVSSSgnL2FwaS92Mi9jbXMvY2F0ZWdvcnkvSU1BR0UvbmFtZS/ms6jlhownKSkuZW5kKCkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgdmFyIGNvdW50ID0gbmV3IFJhY3RpdmUoe1xuICAgICAgICBlbDogJy5yZWdpc3Rlci1waWMnLFxuICAgICAgICB0ZW1wbGF0ZTogJ3t7I2VhY2ggaXRlbXN9fTxhIGhyZWY9XCJ7e3VybH19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCJ7e2NvbnRlbnR9fVwiLz48L2E+e3svZWFjaH19JyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaXRlbXM6IHJlcy5ib2R5XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5pZiAoQ0MucmVnaXN0ZXJSZWwpIHtcbiAgICByZWdpc3RlclJhY3RpdmUuc2V0KCdpbnZpdGVDb2RlLmRhdGEudmFsdWUnLCBDQy5yZWdpc3RlclJlbCk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGlkPVwicmVnaXN0ZXItd3JhcHBlclwiIGNsYXNzPVwib24tc3RlcC17e29uU3RlcH19XCI+XFxuICAgIDxTdGVwPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cInJlZ2lzdGVyLXN0ZXAtMFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWdpc3Rlci1mcmFtZVwiPlxcbiAgICAgICAgICAgICAgICA8UklucHV0IGZpZWxkPVwibW9iaWxlXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlucHV0XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInt7cmlucHV0SWR9fVwiIGNsYXNzPVwicGktcGxhY2Vob2xkZXIge3sjaWYgdmFsdWV9fXBpLXBsYWNlaG9sZGVyX19maWxsZWR7ey9pZn19XCI+PGVtPio8L2VtPuaJi+acuuWPt+eggTo8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInBob25lXCIgbmFtZT1cInBob25lXCIgaWQ9XCJ7e3JpbnB1dElkfX1cIiB2YWx1ZT1cInt7dmFsdWV9fVwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl5omL5py65Y+356CBXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXAtbG9hZGluZ1wiPnt7I2xvYWRpbmd9fTxpbWcgc3JjPVxcJy9jY2MvZ2xvYmFsL2ltZy9sb2FkaW5nLmdpZlxcJyBzdHlsZT1cIndpZHRoOjIwcHg7XCIvPnt7L2xvYWRpbmd9fSAgXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGlwXCI+e3sjZXJyTXNnfX17e2Vyck1zZ319e3svaWZ9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L1JJbnB1dD5cXG4gICAgICAgICAgICAgICAgPFJJbnB1dCBmaWVsZD1cImltZ0NhcHRjaGFcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaW5wdXQgcGljbnVtXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInt7cmlucHV0SWR9fVwiIGNsYXNzPVwicGktcGxhY2Vob2xkZXIge3sjaWYgdmFsdWV9fXBpLXBsYWNlaG9sZGVyX19maWxsZWR7ey9pZn19XCI+PGVtPio8L2VtPumqjOivgeeggTo8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInJlZ2lzdGVyLXRlc3RcIiBpZD1cInt7cmlucHV0SWR9fVwiIHZhbHVlPVwie3t2YWx1ZX19XCIgcGxhY2Vob2xkZXI9XCLpqozor4HnoIFcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBvbi1jbGljaz1cXCdjaGFuZ2VJbWdDYXB0Y2hhXFwnPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cInt7aW1nQ2FwdGNoYUJhc2U2NH19XCIgYWx0PVwiXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiY2Fubm90LXNlZVwiPueci+S4jea4hT88L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gb24tY2xpY2s9XFwnY2hhbmdlSW1nQ2FwdGNoYVxcJyBpZD1cInJlZnJlc2gtY2FwdGNoYVwiPuaNouS4gOW8oDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpcDAxXCIgaWQ9XCJwYXNzd29yZC1waWNcIiBzdHlsZT1cIm1hcmdpbi10b3A6IC0zMHB4O21hcmdpbi1ib3R0b206IDEwcHg7ZmxvYXQ6bGVmdFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7I2Vyck1zZ319e3tlcnJNc2d9fXt7L2Vyck1zZ319XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9SSW5wdXQ+XFxuICAgICAgICAgICAgICAgIDxSSW5wdXQgZmllbGQ9XCJzbXNDYXB0Y2hhXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlucHV0IG1lc3NhZ2UtY29uZmlybSBicmluZy1pblwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ7e3JpbnB1dElkfX1cIiBjbGFzcz1cInBpLXBsYWNlaG9sZGVyIHt7I2lmIHZhbHVlfX1waS1wbGFjZWhvbGRlcl9fZmlsbGVke3svaWZ9fVwiPuefreS/oemqjOivgeeggTo8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInt7cmlucHV0SWR9fVwiIHZhbHVlPVwie3t2YWx1ZX19XCIgcGxhY2Vob2xkZXI9XCLnn63kv6Hpqozor4HnoIFcIiBjbGFzcz1cIm1lc3NhZ2UtYnJhbWVcIj4gXFxuICAgICAgICAgICAgICAgICAgICAgICAge3sjaWYgIXNtc0NhcHRjaGFSZWFkeX19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb24tY2xpY2s9XFwnc2VuZFNtc0NhcHRjaGFcXCcgaWQ9XCJnZXQtbWVzc2FnZVwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg6I635Y+W55+t5L+h6aqM6K+B56CBXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7ZWxzZX19XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbi1jbGljaz1cXCdzZW5kU21zQ2FwdGNoYVxcJyB7eyNpZiAhc21zQ2FwdGNoYVJlYWR5IHx8IHNtc0NhcHRjaGFDb3VudERvd259fWRpc2FibGVke3svaWZ9fT5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sjaWYgc21zQ2FwdGNoYUNvdW50RG93bn19IHt7c21zQ2FwdGNoYUNvdW50RG93bn1956eS5ZCO6YeN5paw5Y+R6YCBIHt7ZWxzZX19IOiOt+WPluefreS/oemqjOivgeeggSB7ey9pZn19XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAge3svaWZ9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGlwLWxvYWRpbmdcIj57eyNsb2FkaW5nfX08aW1nIHNyYz1cXCcvY2NjL2dsb2JhbC9pbWcvbG9hZGluZy5naWZcXCcgc3R5bGU9XCJ3aWR0aDoyMHB4O1wiLz57ey9sb2FkaW5nfX08L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXBcIj57eyNlcnJNc2d9fXt7ZXJyTXNnfX17ey9lcnJNc2d9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L1JJbnB1dD5cXG5cXG4gICAgICAgICAgICAgICAgPFJJbnB1dCBmaWVsZD1cInBhc3N3b3JkXCIgdmFsdWVTdGFibGVEdXJhdGlvbj0yMDA+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlucHV0XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInt7cmlucHV0SWR9fVwiIGNsYXNzPVwicGktcGxhY2Vob2xkZXIge3sjaWYgdmFsdWV9fXBpLXBsYWNlaG9sZGVyX19maWxsZWR7ey9pZn19XCI+PGVtPio8L2VtPuWvhueggTo8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInBhc3N3b3JkXCIgaWQ9XCJ7e3JpbnB1dElkfX1cIiB0eXBlPVwicGFzc3dvcmRcIiB2YWx1ZT1cInt7dmFsdWV9fVwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl5a+G56CB77yMNi0xNuS9jeWtl+esplwiIG1heGxlbmd0aD1cIjE2XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXAtbG9hZGluZ1wiPnt7I2xvYWRpbmd9fTxpbWcgc3JjPVxcJy9jY2MvZ2xvYmFsL2ltZy9sb2FkaW5nLmdpZlxcJyBzdHlsZT1cIndpZHRoOjIwcHg7XCIvPnt7L2xvYWRpbmd9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpcFwiPlxcbiAgICAgICAge3sjZXJyTXNnfX17e2Vyck1zZ319e3svZXJyTXNnfX1cXG4gICAgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvUklucHV0PlxcbiAgICAgICAgICAgICAgICA8UklucHV0IGZpZWxkPVwicmVwYXNzd29yZFwiIHZhbHVlU3RhYmxlRHVyYXRpb249MjAwPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpbnB1dFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ7e3JpbnB1dElkfX1cIiBjbGFzcz1cInBpLXBsYWNlaG9sZGVyIHt7I2lmIHZhbHVlfX1waS1wbGFjZWhvbGRlcl9fZmlsbGVke3svaWZ9fVwiPjxlbT4qPC9lbT7noa7orqTlr4bnoIE6PC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJyZXBhc3N3b3JkXCIgaWQ9XCJ7e3JpbnB1dElkfX1cIiB0eXBlPVwicGFzc3dvcmRcIiB2YWx1ZT1cInt7dmFsdWV9fVwiIHBsYWNlaG9sZGVyPVwi5YaN5qyh6L6T5YWl5a+G56CBXCIgbWF4bGVuZ3RoPVwiMTZcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpcC1sb2FkaW5nXCI+e3sjbG9hZGluZ319PGltZyBzcmM9XFwnL2NjYy9nbG9iYWwvaW1nL2xvYWRpbmcuZ2lmXFwnIHN0eWxlPVwid2lkdGg6MjBweDtcIi8+e3svbG9hZGluZ319PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGlwXCI+e3sjZXJyTXNnfX17e2Vyck1zZ319e3svZXJyTXNnfX08L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9SSW5wdXQ+XFxuICAgICAgICAgICAgICAgIHt7I0hJREV9fVxcbiAgICAgICAgICAgICAgICA8UklucHV0IGZpZWxkPVwicmVmbVwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpbnB1dFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT1cInBhZGRpbmctdG9wOiAxMHB4O1wiIGZvcj1cInt7cmlucHV0SWR9fVwiIGNsYXNzPVwicGktcGxhY2Vob2xkZXIge3sjaWYgdmFsdWV9fXBpLXBsYWNlaG9sZGVyX19maWxsZWR7ey9pZn19XCI+5o6o6I2Q5Lq6OjwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwie3tyaW5wdXRJZH19XCIgbmFtZT1cInJlZm1cIiB2YWx1ZT1cInt7dmFsdWV9fVwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5o6o6I2Q5Lq655qE5omL5py65Y+356CB77yM5Y+v5LiN5aGrXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXAtbG9hZGluZ1wiPnt7I2xvYWRpbmd9fTxpbWcgc3JjPVxcJy9jY2MvZ2xvYmFsL2ltZy9sb2FkaW5nLmdpZlxcJyBzdHlsZT1cIndpZHRoOjIwcHg7XCIvPnt7L2xvYWRpbmd9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpcFwiPnt7I2Vyck1zZ319e3tlcnJNc2d9fXt7L2Vyck1zZ319PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvUklucHV0PlxcbiAgICAgICAgICAgICAgICB7ey9ISURFfX1cXG4gICAgICAgICAgICAgICA8UklucHV0IGZpZWxkPVwiaW52aXRlQ29kZVwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpbnB1dFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT1cInBhZGRpbmctdG9wOiAxMHB4O1wiIGZvcj1cInt7cmlucHV0SWR9fVwiIGNsYXNzPVwicGktcGxhY2Vob2xkZXIge3sjaWYgdmFsdWV9fXBpLXBsYWNlaG9sZGVyX19maWxsZWR7ey9pZn19XCI+5o6o6I2Q56CBOjwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwie3tyaW5wdXRJZH19XCIgbmFtZT1cImludml0ZUNvZGVcIiB2YWx1ZT1cInt7dmFsdWV9fVwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5o6o6I2Q56CB77yM5Y+v5LiN5aGrXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXAtbG9hZGluZ1wiPnt7I2xvYWRpbmd9fTxpbWcgc3JjPVxcJy9jY2MvZ2xvYmFsL2ltZy9sb2FkaW5nLmdpZlxcJyBzdHlsZT1cIndpZHRoOjIwcHg7XCIvPnt7L2xvYWRpbmd9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpcFwiPnt7I2Vyck1zZ319e3tlcnJNc2d9fXt7L2Vyck1zZ319PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvUklucHV0PlxcbiAgICAgICAgICAgICAgICBcXG48IS0tICAgICAgICAgICAgICAgIDxSSW5wdXQgZmllbGQ9XCJhZ3JlZW1lbnRcIiB2YWx1ZVN0YWJsZUR1cmF0aW9uPTEwMD4tLT5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaW5wdXQgYWdyZWVtZW50LWRpdlwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICB7eyNpZiBzdGVwTG9hZGluZ319XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwibmV4dC1zdGVwXCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6K+356iN562JXCIgZGlzYWJsZWQgLz4ge3tlbHNlfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgb24tY2xpY2s9XFwnbmV4dFN0ZXBcXCcgY2xhc3M9XCJuZXh0LXN0ZXBcIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLnq4vljbPms6jlhoxcIiAvPiB7ey9pZn19XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYWdyZWUtcmVnaXN0ZXItcHJvdG9jb2xcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPueCueWHu+KAnOeri+WNs+azqOWGjOKAneaMiemSruWNs+ihqOekuuW3sumYheivu+W5tuWQjOaEjzxzcGFuIGNsYXNzPVwiaS1hZ3JlZVwiPjxhIGhyZWY9XCIvYWdyZWVtZW50L21vYmlsZS9yZWdpc3RcIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImNjYy1hZ3JlZW1lbnRcIj7jgIrlpYfkuZDono3nlKjmiLfms6jlhozljY/orq7jgIs8L2E+PC9zcGFuPjwvc3Bhbj5cXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInt7cmlucHV0SWR9fVwiIGNoZWNrZWQ9XCJ7e3ZhbHVlfX1cIiAvPi0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyPlxcblxcbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXBcIiBzdHlsZT1cImxlZnQ6MjJweDt0b3A6MjBweDtsaW5lLWhlaWdodDpub3JtYWw7XCI+IHt7I2Vyck1zZ319e3tlcnJNc2d9fXt7L2Vyck1zZ319PC9zcGFuPi0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG48IS0tICAgICAgICAgICAgICAgIDwvUklucHV0Pi0tPlxcbiAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVnaXN0ZXItYmFubmVyXCI+XFxuICAgICAgICAgICAgICAgIDxwPjxpbWcgc3JjPVwiL2NjYy9yZWdpc3Rlci9pbWcvZ3JheS1saW5lLnBuZ1wiIC8+XFxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7lt7LmnInotKblj7fvvIznq4vljbM8YSBocmVmPVwiL2xvZ2luXCI+55m75b2VPC9hPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NjYy9yZWdpc3Rlci9pbWcvZ3JheS1saW5lLnBuZ1wiIC8+XFxuICAgICAgICAgICAgICAgIDwvcD5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlZ2lzdGVyLXBpY1wiPjwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvU3RlcD5cXG5cXG4gICAgPFN0ZXA+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwicmVnaXN0ZXItc3RlcC0xXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlZ2lzdC1sZWZ0XCI+XFxuICAgICAgICAgICAgPHAgY2xhc3M9XCJzdWNjZXNzXCI+PGltZyBzcmM9XCIvY2NjL3JlZ2lzdGVyL2ltZy9yaWdodC1pY29uLnBuZ1wiLz7mga3llpzmgqjvvIzms6jlhozmiJDlip/vvIE8c3BhbiBjbGFzcz1cImdvLXRvLWFjY291bnRcIj48L3NwYW4+PC9wPlxcbiAgICAgICAgICAgIDxhIGhyZWY9XCIvbmV3QWNjb3VudC9zZXR0aW5ncy9hdXRoZW50aWNhdGlvblwiPjxidXR0b24gY2xhc3M9XCJnby1hY2NvdW50XCI+5YmN5b6A5oiR55qE6LSm5oi3PC9idXR0b24+PC9hPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJyZWdpc3QtcmlnaHRcIiBzcmM9XCIvY2NjL3JlZ2lzdGVyL2ltZy9yZWdpc3Qtc3VjY2Vzcy1iYW5uZXIucG5nXCIvPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcXG4gICAgPC9TdGVwPlxcbjwvZGl2PlxcblxcbjxzY3JpcHQ+XFxuICAgICQoXCIucmVnaXN0ZXItZnJhbWVcIikub24oXCJjbGlja1wiLCBcIiNnZXQtbWVzc2FnZVwiLCBmdW5jdGlvbiAoKSB7XFxuICAgICAgICAkKFwiLm1lc3NhZ2UtYnJhbWVcIikudmFsKFwiXCIpO1xcbiAgICB9KVxcbjwvc2NyaXB0Plxcbic7IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLlJlZ2lzdGVyUmFjdGl2ZSA9IHJlcXVpcmUoJy4vanMvbGliL3JhY3RpdmUnKS5SZWdpc3RlclJhY3RpdmU7XG5leHBvcnRzLnZhbGlkYXRpb24gPSByZXF1aXJlKCcuL2pzL2xpYi92YWxpZGF0aW9uJyk7XG5leHBvcnRzLmVycm1zZ3MgPSByZXF1aXJlKCdAY2NjL3ZhbGlkYXRpb24nKS5lcnJtc2dzO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFJhY3RpdmUgPSByZXF1aXJlKCdyYWN0aXZlJyk7XG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5leHBvcnRzLlJJbnB1dCA9IFJhY3RpdmUuZXh0ZW5kKHtcbiAgICBpc29sYXRlZDogdHJ1ZSxcbiAgICB0ZW1wbGF0ZTogJ3t7PmNvbnRlbnR9fScsXG4gICAgb25pbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0KCdyaW5wdXRJZCcsICdyaW5wdXQtJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMiwgOCkpO1xuICAgICAgICB2YXIgbGF6eSA9IE51bWJlcih0aGlzLmdldCgndmFsdWVTdGFibGVEdXJhdGlvbicpKSB8fCA2MDA7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSgndmFsdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmUoJ3N0YXJ0RWRpdGluZycpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vYnNlcnZlKCd2YWx1ZScsIF8uZGVib3VuY2UoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmUoJ3ZhbHVlU3RhYmxlJywgdmFsdWUpO1xuICAgICAgICB9LCBsYXp5KSk7XG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICAgIHZhbHVlOiAnJ1xuICAgIH1cbn0pO1xuXG5leHBvcnRzLlN0ZXAgPSBSYWN0aXZlLmV4dGVuZCh7XG4gICAgaXNvbGF0ZWQ6IHRydWUsXG4gICAgdGVtcGxhdGU6ICd7ez5jb250ZW50fX0nLFxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgUklucHV0OiBleHBvcnRzLlJJbnB1dFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICAgIC8vIHN0ZXBJbmRleDogJycsIC8vIHNob3VsZCBiZSBzZXQgYnkgcm9vdFxuICAgIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNvbXBvbmVudHMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMnKTtcbnZhciBmbHV4ID0gcmVxdWlyZSgnYmFjb25mbHV4Jyk7XG52YXIgUmFjdGl2ZSA9IHJlcXVpcmUoJ3JhY3RpdmUnKTtcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG52YXIgYWN0aW9uID0gZmx1eC5hY3Rpb24uYmluZChudWxsLCAncmVnaXN0ZXInKTtcbnZhciBzdG9yZSA9IGZsdXguc3RvcmUuYmluZChudWxsLCAncmVnaXN0ZXInKTtcbnZhciBzZXJ2aWNlcyA9IHJlcXVpcmUoJy4vc2VydmljZXMnKTtcbnJlcXVpcmUoJy4vcmVhY3RpdmUnKTsgLy8gcmVhY3RpdmUgbG9naWMgaW4gdGhpcyBmaWxlXG52YXIgdmFsaWRhdGlvbiA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvbicpO1xuXG5leHBvcnRzLlJlZ2lzdGVyUmFjdGl2ZSA9IFJhY3RpdmUuZXh0ZW5kKHtcbiAgICBjb21wb25lbnRzOiBjb21wb25lbnRzLFxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJvb3QgPSB0aGlzO1xuICAgICAgICByb290LnNldCgnb25TdGVwJywgMCk7XG4gICAgICAgIHZhciBzdGVwcyA9IHJvb3Quc3RlcHMgPSByb290LmZpbmRBbGxDb21wb25lbnRzKCdTdGVwJyk7XG4gICAgICAgIHZhciByaW5wdXRzID0gcm9vdC5yaW5wdXRzID0ge307XG4gICAgICAgIHJvb3Qub2JzZXJ2ZSgnb25TdGVwJywgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBfLmVhY2gocm9vdC5zdGVwcywgZnVuY3Rpb24gKHN0ZXApIHtcbiAgICAgICAgICAgICAgICBzdGVwLnNldCgnb25TdGVwJywgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByb290LnN0ZXBzLmZvckVhY2goZnVuY3Rpb24gKHN0ZXAsIHN0ZXBJbmRleCkge1xuICAgICAgICAgICAgc3RlcC5maWVsZHMgPSB7fTtcbiAgICAgICAgICAgIHN0ZXAuc2V0KCdzdGVwSW5kZXgnLCBzdGVwSW5kZXgpO1xuICAgICAgICAgICAgc3RlcC5vYnNlcnZlKCdsb2FkaW5nJywgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3RlcC5zZXQoJ3N0ZXBMb2FkaW5nJywgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdGVwLnNldCgnbG9hZGluZycsIGZhbHNlKTtcbiAgICAgICAgICAgIHN0ZXAuZmluZEFsbENvbXBvbmVudHMoJ1JJbnB1dCcpLmZvckVhY2goZnVuY3Rpb24gKHJpbnB1dCkge1xuICAgICAgICAgICAgICAgIHN0ZXAub2JzZXJ2ZSgnbG9hZGluZycsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByaW5wdXQuc2V0KCdzdGVwTG9hZGluZycsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByaW5wdXQub24oJ25leHRTdGVwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzdGVwLmZpcmUoJ25leHRTdGVwJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIGluaXREYXRhID0gcmlucHV0LmdldCgpO1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGluaXREYXRhLmZpZWxkO1xuICAgICAgICAgICAgICAgIGlmICghZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKCdyaW5wdXQgZmllbGQgcmVxdWlyZWQnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbml0RGF0YS5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmlucHV0LnNldCgndmFsdWUnLCBpbml0RGF0YS5kZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGVwLmZpZWxkc1tmaWVsZF0gPSByaW5wdXQ7XG4gICAgICAgICAgICAgICAgcm9vdC5yaW5wdXRzW2ZpZWxkXSA9IHJpbnB1dDtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBpbml0aWFsIHZhbHVlc1xuICAgICAgICAgICAgICAgIHZhciBpbml0VmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKChpbml0VmFsdWUgPSByb290LmdldChmaWVsZCArICcuZGF0YS52YWx1ZScpKSkge1xuICAgICAgICAgICAgICAgICAgICByaW5wdXQuc2V0KCd2YWx1ZScsIGluaXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZGVsZWdhdGVzIGRhdGFcbiAgICAgICAgICAgICAgICByb290Lm9ic2VydmUoZmllbGQgKyAnLmRhdGEuKicsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgb2xkVmFsdWUsIGtleXBhdGgsIHJmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ3ZhbHVlIGxvYWRpbmcgZXJyQ29kZSBlcnJNc2cgc3RyZW5ndGggc21zQ2FwdGNoYURpc2FibGVkIHNtc0NhcHRjaGFSZWFkeSBzbXNDYXB0Y2hhQ291bnREb3duIGltZ0NhcHRjaGFCYXNlNjQgaW1nQ2FwdGNoYVRva2VuJy5zcGxpdCgnICcpLmluZGV4T2YocmZpZWxkKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaW5wdXQuc2V0KHJmaWVsZCwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHJvb3Quc3RlcHMsIGZ1bmN0aW9uIChzdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcC5zZXQoJ2ZpZWxkcy4nK2tleXBhdGgsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHJvb3QucmlucHV0cywgZnVuY3Rpb24gKHJpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpbnB1dC5zZXQoJ2ZpZWxkcy4nK2tleXBhdGgsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBpbWdDYXB0Y2hhID0gcmlucHV0cy5pbWdDYXB0Y2hhO1xuICAgICAgICBpZiAoaW1nQ2FwdGNoYSkge1xuICAgICAgICAgICAgaW1nQ2FwdGNoYS5vbignY2hhbmdlSW1nQ2FwdGNoYScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlcy5pbWdDYXB0Y2hhKCkudGhlbihmdW5jdGlvbiAoYm9keSkge1xuICAgICAgICAgICAgICAgICAgICByb290LnNldCgnaW1nQ2FwdGNoYS5kYXRhLmltZ0NhcHRjaGFCYXNlNjQnLCBib2R5LmNhcHRjaGEpO1xuICAgICAgICAgICAgICAgICAgICByb290LnNldCgnaW1nQ2FwdGNoYS5kYXRhLmltZ0NhcHRjaGFUb2tlbicsIGJvZHkudG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLmltZ0NhcHRjaGEuYXN5bmMgPSB2YWxpZGF0aW9uLmdlbkFzeW5jVmFsaWRhdG9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy9hcGkvdjIvY2FwdGNoYT90b2tlbj0nICsgYm9keS50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICdjYXB0Y2hhJ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBzdG9yZSgndmFsdWUnLCAnaW1nQ2FwdGNoYScpLnB1c2goJycpO1xuICAgICAgICAgICAgICAgICAgICBzdG9yZSgnZXJyQ29kZScsICdpbWdDYXB0Y2hhJykucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JlKCdlcnJNc2cnLCAnaW1nQ2FwdGNoYScpLnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFjdGlvbignY2hhbmdlSW1nQ2FwdGNoYScpLm9uVmFsdWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGltZ0NhcHRjaGEuZmlyZSgnY2hhbmdlSW1nQ2FwdGNoYScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhY3Rpb24oJ2NoYW5nZUltZ0NhcHRjaGEnKS5wdXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5ZCO6Z2i55qE5LqL5oOF5Lqk57uZIOi/meS4qiBhY3Rpb24g55qEIGxpc3RlbmVyIOWBmlxuICAgICAgICBhY3Rpb24oJ2luaXRlZCcpLnB1c2gocm9vdCk7XG4gICAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbndpbmRvdy5Qcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcbnZhciBnbG9iYWxWYWxpZGF0b3IgPSByZXF1aXJlKCdAY2NjL3ZhbGlkYXRpb24nKS52YWxpZGF0b3I7XG52YXIgQmFjb24gPSByZXF1aXJlKCdiYWNvbmpzJyk7XG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xudmFyIGZsdXggPSByZXF1aXJlKCdiYWNvbmZsdXgnKTtcbnZhciBlcnJtc2dzID0gcmVxdWlyZSgnQGNjYy92YWxpZGF0aW9uJykuZXJybXNncztcbnZhciBhY3Rpb24gPSBmbHV4LmFjdGlvbi5iaW5kKG51bGwsICdyZWdpc3RlcicpO1xudmFyIGFzeW5jID0gZmx1eC5zdG9yZS5iaW5kKG51bGwsICdyZWdpc3RlcicpO1xudmFyIHN0b3JlID0gZmx1eC5zdG9yZS5iaW5kKG51bGwsICdyZWdpc3RlcicpO1xudmFyIHZhbGlkYXRpb24gPSByZXF1aXJlKCcuL3ZhbGlkYXRpb24nKTtcbnZhciBzZXJ2aWNlcyA9IHJlcXVpcmUoJy4vc2VydmljZXMnKTtcbmVycm1zZ3MuSU5WQUxJRF9DQVBUQ0hBID0gZXJybXNncy5JTUdDQVBUQ0hBX0lOVkFMSUQgPSBlcnJtc2dzLklNR19DQVBUQ0hBX0lOVkFMSUQgPSAn5Zu+54mH6aqM6K+B56CB6ZSZ6K+v5oiW5bey5aSx5pWIJ1xuZXJybXNncy5JTlZBTElEX1JFUVVJUkVEID0gZXJybXNncy5JTUdDQVBUQ0hBX05VTEwgPSBlcnJtc2dzLklNR19DQVBUQ0hBX05VTEwgPSAn6K+35aGr5YaZ5Zu+54mH6aqM6K+B56CBJ1xuZXJybXNncy5SRUZNX05PVF9FWElTVFMgPSAn5q2k5omL5py65Y+356CB5pyq5Zyo5pys56uZ5rOo5YaMJ1xuZXJybXNncy5SRUZNX0lOVkFMSUQgPSAn6K+35q2j56Gu5aGr5YaZ5o6o6I2Q5Lq65omL5py65Y+356CBJ1xuZXJybXNncy5FTVBfUkVGRVJSQUxfTk9UX0VYSVNUUyA9ICfmnKrmib7liLDmraTlj7fnoIHlhbPogZTnmoTotKLlr4znu4/nkIYnXG5lcnJtc2dzLkVNQUlMX0FMUkVBRFlfRVhJU1RFRCA9ICfmraTpgq7nrrHlt7LlnKjmnKznq5nms6jlhownXG5cbmFjdGlvbignaW5pdGVkJykub25WYWx1ZShmdW5jdGlvbiAocmVnaXN0ZXJSYWN0aXZlKSB7XG4gICAgdmFyIHJpbnB1dHMgPSByZWdpc3RlclJhY3RpdmUucmlucHV0cztcbiAgICB2YXIgc3RlcHMgPSByZWdpc3RlclJhY3RpdmUuc3RlcHM7XG5cbiAgICAvLyDlr4bnoIHnm7jlhbPmo4Dmn6VcbiAgICBzdG9yZSgndmFsdWUnLCAncGFzc3dvcmQnKS5vblZhbHVlKGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgICAgICB2YXIgc3RyZW5ndGggPSB2YWxpZGF0aW9uLnBhc3N3b3JkU3RyZW5ndGgocGFzc3dvcmQpO1xuICAgICAgICByZWdpc3RlclJhY3RpdmUuc2V0KCdwYXNzd29yZFN0cmVuZ3RoJywgc3RyZW5ndGgpO1xuICAgICAgICByZWdpc3RlclJhY3RpdmUuc2V0KCdwYXNzd29yZC5kYXRhLnN0cmVuZ3RoJywgc3RyZW5ndGgpO1xuICAgICAgICByZWdpc3RlclJhY3RpdmUuc2V0KCdyZXBhc3N3b3JkLmRhdGEuc3RyZW5ndGgnLCBzdHJlbmd0aCk7IC8vIOacieeahOWlh+iRqeiuvuiuoeWPr+iDveaKiuWvhueggeW8uuW8seaUvui/me+8jOabtOWlh+iRqeeahOWwseS4jeaUr+aMgeS6hlxuICAgICAgICBpZiAocmlucHV0cy5yZXBhc3N3b3JkKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJlcGFzc3dvcmQuc3luYyA9IGdsb2JhbFZhbGlkYXRvci5yZXBhc3N3b3JkLmJpbmQobnVsbCwgcGFzc3dvcmQpO1xuICAgICAgICAgICAgc3RvcmUoJ3ZhbHVlJywgJ3JlcGFzc3dvcmQnKS5wdXNoKHJlZ2lzdGVyUmFjdGl2ZS5nZXQoJ3JlcGFzc3dvcmQuZGF0YS52YWx1ZScpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHRyaW1tZWRWYWx1ZSh2YWx1ZSwgZmllbGQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSB8fCAnJztcbiAgICAgICAgaWYgKCEoZmllbGR8fCcnKS5tYXRjaCgvcGFzc3dvcmQkLykpIHsgLy8gc2tpcCBwYXNzd29yZCBvciByZXBhc3N3b3JkXG4gICAgICAgICAgICByZXR1cm4gKCcnK3ZhbHVlKS50cmltKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICAvLyDpgJrnlKjpobnmo4Dmn6VcbiAgICBfLmVhY2gocmlucHV0cywgZnVuY3Rpb24gKHJpbnB1dCwgZmllbGQpIHtcbiAgICAgICAgdmFyIHZhbGlkYXRvciA9IHZhbGlkYXRpb25bZmllbGRdIHx8IHt9O1xuICAgICAgICBpZiAoIXZhbGlkYXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g6L2s5o2i5LuOIHJhY3RpdmUg55qE5LqL5Lu25oiQIHN0cmVhbVxuICAgICAgICBhY3Rpb24oJ3N0YXJ0RWRpdGluZycsIGZpZWxkKS5wbHVnKEJhY29uLmZyb21FdmVudChyaW5wdXQsICdzdGFydEVkaXRpbmcnKSk7XG4gICAgICAgIHN0b3JlKCd2YWx1ZScsIGZpZWxkKS5wbHVnKEJhY29uLmZyb21FdmVudChyaW5wdXQsICd2YWx1ZVN0YWJsZScpKTtcblxuICAgICAgICB2YXIgYXN5bmNDaGVjayA9IGFzeW5jKCdjaGVjaycsIGZpZWxkKTtcbiAgICAgICAgZnVuY3Rpb24gY3VycmVudEFzeW5jQ2hlY2tQcm9taXNlKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBhc3luY0NoZWNrLmN1cnJlbnRQcm9taXNlO1xuICAgICAgICAgICAgaWYgKHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXNvbHZlO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFzeW5jQ2hlY2suY3VycmVudFByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlU2VsZiA9IHJlc29sdmU7XG4gICAgICAgICAgICBhc3luY0NoZWNrLnB1c2gocHJvbWlzZSk7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBhY3Rpb24oJ3N0YXJ0RWRpdGluZycsIGZpZWxkKS5vblZhbHVlKGN1cnJlbnRBc3luY0NoZWNrUHJvbWlzZSk7XG4gICAgICAgIHN0b3JlKCd2YWx1ZScsIGZpZWxkKS5vblZhbHVlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgLy8gcHJvbWlzZSDnmoQgcmVzb2x2ZSDlgLzmmK8gZXJyQ29kZVxuICAgICAgICAgICAgdmFsdWUgPSB0cmltbWVkVmFsdWUodmFsdWUsIGZpZWxkKTtcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gY3VycmVudEFzeW5jQ2hlY2tQcm9taXNlKCk7XG4gICAgICAgICAgICB2YXIgZXJyQ29kZTtcbiAgICAgICAgICAgIGRlbGV0ZSBhc3luY0NoZWNrLmN1cnJlbnRQcm9taXNlOyAvLyDogIPomZHlvILmraXmo4Dmn6Xov5jmsqHov5Tlm57lsLHlj4ggc3RhcnRFZGl0aW5nIOeahOaDheWGte+8jOWcqOi/memHjOWwsSBkZWxldGVcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyDmnKrloavlhpnlhYjkuI3lnKjov5npqozor4HvvIzngrnlh7vkuIvkuIDmraXml7bmiY3lgZpcbiAgICAgICAgICAgICAgICBwcm9taXNlLnJlc29sdmVTZWxmKGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yLnN5bmMgJiYgKGVyckNvZGUgPSB2YWxpZGF0b3Iuc3luYyh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAgICAgLy8g5YWI5YGa5ZCM5q2l5qOA5p+lXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlU2VsZihlcnJDb2RlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgLy8g5ZCM5q2l5qOA5p+l5rKh6Zeu6aKY5ZCO5YGa5byC5q2l5qOA5p+lXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLmFzeW5jKHZhbHVlLCBwcm9taXNlLnJlc29sdmVTZWxmLmJpbmQocHJvbWlzZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOW8guatpeajgOafpeS4jeWtmOWcqO+8jOW5tuS4lOWQjOatpeajgOafpemAmui/h+aIluS5n+S4jeWtmOWcqOeahOaXtuWAmVxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2UucmVzb2x2ZVNlbGYoZmFsc2UpO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBzdG9yZSgnY2hlY2tSZXN1bHQnLCBmaWVsZCkucGx1Zyhhc3luY0NoZWNrLmZsYXRNYXBMYXRlc3QoQmFjb24uZnJvbVByb21pc2UpKTtcblxuICAgICAgICAvLyDlhYjorr7nva7kvp3otZblhbPns7tcbiAgICAgICAgc3RvcmUoJ2xvYWRpbmcnLCBmaWVsZCkucGx1Zyhhc3luYygnY2hlY2snLCBmaWVsZCkubWFwKHRydWUpKTtcbiAgICAgICAgc3RvcmUoJ2xvYWRpbmcnLCBmaWVsZCkucGx1ZyhzdG9yZSgnY2hlY2tSZXN1bHQnLCBmaWVsZCkubWFwKGZhbHNlKSk7XG5cbiAgICAgICAgc3RvcmUoJ2VyckNvZGUnLCBmaWVsZCkucGx1ZyhhY3Rpb24oJ3N0YXJ0RWRpdGluZycsIGZpZWxkKS5tYXAoZmFsc2UpKTtcbiAgICAgICAgc3RvcmUoJ2VyckNvZGUnLCBmaWVsZCkucGx1ZyhzdG9yZSgnY2hlY2tSZXN1bHQnLCBmaWVsZCkpOyAvLyBjaGVja1Jlc3VsdCDnmoTnu5PmnpzlsLHmmK8gZXJyQ29kZVxuXG4gICAgICAgIHN0b3JlKCdlcnJNc2cnLCBmaWVsZCkucGx1ZyhzdG9yZSgnZXJyQ29kZScsIGZpZWxkKS5tYXAoZXJybXNncy5nZXRGcm9tRXJyQ29kZSkpO1xuXG4gICAgICAgIC8vIOacgOWQjiBwdXNoIOS4ium7mOiupOWAvFxuICAgICAgICBzdG9yZSgnbG9hZGluZycsIGZpZWxkKS5wdXNoKGZhbHNlKTtcbiAgICAgICAgc3RvcmUoJ2VyckNvZGUnLCBmaWVsZCkucHVzaChmYWxzZSk7XG5cbiAgICAgICAgc3RvcmUoZmllbGQpLnBsdWcoQmFjb24uY29tYmluZVRlbXBsYXRlKHtcbiAgICAgICAgICAgIGxvYWRpbmc6IHN0b3JlKCdsb2FkaW5nJywgZmllbGQpLFxuICAgICAgICAgICAgdmFsdWU6IHN0b3JlKCd2YWx1ZScsIGZpZWxkKSxcbiAgICAgICAgICAgIGVyckNvZGU6IHN0b3JlKCdlcnJDb2RlJywgZmllbGQpLFxuICAgICAgICAgICAgZXJyTXNnOiBzdG9yZSgnZXJyTXNnJywgZmllbGQpXG4gICAgICAgIH0pKTtcblxuICAgICAgICB2YXIgY291bnRkb3duID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IDYxO1xuICAgICAgICAgICAgZnVuY3Rpb24gdGljaygpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgLT0gMTtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RvcmUoZmllbGQsICdzbXNDYXB0Y2hhQ291bnREb3duJykucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRpbWVyO1xuICAgICAgICAgICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFZhbHVlID0gNjE7XG4gICAgICAgICAgICAgICAgc3RvcmUoZmllbGQsICdzbXNDYXB0Y2hhQ291bnREb3duJykucHVzaCgwKTtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICAgICAgICB0aW1lciA9IHNldEludGVydmFsKHRpY2ssIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgdGltZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgdGljazogdGljayxcbiAgICAgICAgICAgICAgICByZXNldDogcmVzZXQsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGlzUnVubmluZzogZnVuY3Rpb24gKCkgeyByZXR1cm4gISF0aW1lcjsgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0oKSk7XG5cbiAgICAgICAgaWYgKGZpZWxkID09PSAnbW9iaWxlJyB8fCBmaWVsZCA9PT0gJ3Ntc0NhcHRjaGEnKSB7XG4gICAgICAgICAgICB2YXIgc2VuZFNtc0NhcHRjaGEgPSBhY3Rpb24oZmllbGQsICdzZW5kU21zQ2FwdGNoYScpO1xuICAgICAgICAgICAgc2VuZFNtc0NhcHRjaGEucGx1ZyhzdG9yZSgndmFsdWUnLCAnbW9iaWxlJykuc2FtcGxlZEJ5KEJhY29uLmZyb21FdmVudChyaW5wdXQsICdzZW5kU21zQ2FwdGNoYScpKSk7XG4gICAgICAgICAgICB2YXIgc21zQ2FwdGNoYVJlYWR5ID0gc3RvcmUoZmllbGQsICdzbXNDYXB0Y2hhUmVhZHknKTtcbiAgICAgICAgICAgIHNtc0NhcHRjaGFSZWFkeS5wbHVnKGFzeW5jKCdjaGVjaycsICdtb2JpbGUnKS5tYXAoZmFsc2UpKTtcbiAgICAgICAgICAgIHNtc0NhcHRjaGFSZWFkeS5wbHVnKHN0b3JlKCd2YWx1ZScsICdtb2JpbGUnKS5zYW1wbGVkQnkoYXN5bmMoJ2NoZWNrJywgJ21vYmlsZScpLmZsYXRNYXBMYXRlc3QoQmFjb24uZnJvbVByb21pc2UpLCBmdW5jdGlvbiAodmFsdWUsIGNoZWNrUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmICFjaGVja1Jlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGRvd24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHNtc0NhcHRjaGFSZWFkeS5vblZhbHVlKHJlZ2lzdGVyUmFjdGl2ZSwgJ3NldCcsIGZpZWxkKycuZGF0YS5zbXNDYXB0Y2hhUmVhZHknKTtcblxuICAgICAgICAgICAgdmFyIHNtc0NhcHRjaGFDb3VudERvd24gPSBzdG9yZShmaWVsZCwgJ3Ntc0NhcHRjaGFDb3VudERvd24nKTtcbiAgICAgICAgICAgIHZhciBzbXNDYXB0Y2hhRGlzYWJsZWQgPSBzdG9yZShmaWVsZCwgJ3Ntc0NhcHRjaGFEaXNhYmxlZCcpO1xuICAgICAgICAgICAgc21zQ2FwdGNoYVJlYWR5Lm9uVmFsdWUoZnVuY3Rpb24gKHJlYWR5KSB7XG4gICAgICAgICAgICAgICAgc21zQ2FwdGNoYURpc2FibGVkLnB1c2goIXJlYWR5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc21zQ2FwdGNoYUNvdW50RG93bi5vblZhbHVlKGZ1bmN0aW9uIChjb3VudGRvd24pIHtcbiAgICAgICAgICAgICAgICBzbXNDYXB0Y2hhRGlzYWJsZWQucHVzaChjb3VudGRvd24gPiAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc21zQ2FwdGNoYURpc2FibGVkLm9uVmFsdWUocmVnaXN0ZXJSYWN0aXZlLCAnc2V0JywgZmllbGQrJy5kYXRhLnNtc0NhcHRjaGFEaXNhYmxlZCcpO1xuICAgICAgICAgICAgc21zQ2FwdGNoYURpc2FibGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICBpZiAoIXJpbnB1dHMuaW1nQ2FwdGNoYSkge1xuICAgICAgICAgICAgICAgIHNtc0NhcHRjaGFEaXNhYmxlZC5zYW1wbGVkQnkoc2VuZFNtc0NhcHRjaGEsIGZ1bmN0aW9uIChkaXNhYmxlZCwgbW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCB8fCAhbW9iaWxlIHx8IGNvdW50ZG93bi5pc1J1bm5pbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2JpbGU7XG4gICAgICAgICAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pLm9uVmFsdWUoZnVuY3Rpb24gKG1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlcy5zZW5kU21zQ2FwdGNoYShtb2JpbGUpO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGRvd24uc3RhcnQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGljY3JzID0gYXN5bmMoZmllbGQsICdpbWdDYXB0Y2hhQ2hlY2tSZXN1bHRTYW1wbGVkQnlDbGljaycpO1xuICAgICAgICAgICAgICAgIGljY3JzLnBsdWcoYXN5bmMoJ2NoZWNrJywgJ2ltZ0NhcHRjaGEnKS5zYW1wbGVkQnkoc2VuZFNtc0NhcHRjaGEpKTtcbiAgICAgICAgICAgICAgICBpY2Nycy5zYW1wbGVkQnkoc2VuZFNtc0NhcHRjaGEsIGZ1bmN0aW9uIChyZXN1bHRQcm9taXNlLCBtb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vYmlsZUVyckNvZGUgPSByaW5wdXRzLm1vYmlsZS5nZXQoJ2VyckNvZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtb2JpbGUgfHwgbW9iaWxlRXJyQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtb2JpbGVFcnJDb2RlIHx8ICdNT0JJTEVfTlVMTCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRQcm9taXNlO1xuICAgICAgICAgICAgICAgIH0pLmZsYXRNYXBMYXRlc3QoQmFjb24uZnJvbVByb21pc2UpLm9uVmFsdWUoZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBzdG9yZSgnZXJyQ29kZScsIGZpZWxkKS5wdXNoKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhcHRjaGEgPSByaW5wdXRzLmltZ0NhcHRjaGEuZ2V0KCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0IHx8ICFjYXB0Y2hhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZSgnZXJyQ29kZScsIGZpZWxkKS5wdXNoKHJlc3VsdCB8fCAnSU1HX0NBUFRDSEFfTlVMTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWN0aW9uKCdjaGFuZ2VJbWdDYXB0Y2hhJykucHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IHJpbnB1dHMuaW1nQ2FwdGNoYS5nZXQoJ2ltZ0NhcHRjaGFUb2tlbicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbW9iaWxlID0gcmlucHV0cy5tb2JpbGUuZ2V0KCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlcy5zbXNDYXB0Y2hhKHRva2VuLCBjYXB0Y2hhLCBtb2JpbGUpLnRoZW4oZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYm9keS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmUoJ2VyckNvZGUnLCBmaWVsZCkucHVzaChyZXN1bHQgfHwgJ0lNR19DQVBUQ0hBX0lOVkFMSUQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oJ2NoYW5nZUltZ0NhcHRjaGEnKS5wdXNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRkb3duLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc21zQ2FwdGNoYUNvdW50RG93bi5vblZhbHVlKHJlZ2lzdGVyUmFjdGl2ZSwgJ3NldCcsIGZpZWxkKycuZGF0YS5zbXNDYXB0Y2hhQ291bnREb3duJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcmUoJ2VyckNvZGUnLCAnc21zQ2FwdGNoYScpLnBsdWcoYWN0aW9uKCdzdGFydEVkaXRpbmcnLCAnbW9iaWxlJykubWFwKGZhbHNlKSk7XG4gICAgICAgIHN0b3JlKGZpZWxkKS5vblZhbHVlKHJlZ2lzdGVyUmFjdGl2ZSwgJ3NldCcsIGZpZWxkICsgJy5kYXRhJyk7XG4gICAgfSk7XG5cbiAgICB2YXIgZmlyc3RTdGVwV2l0aG91dFJJbnB1dFJlYWNoZWQgPSBmYWxzZTtcbiAgICB2YXIgZG9TdWJtaXQgPSBbXTtcbiAgICBzdGVwcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGVwLCBzdGVwSW5kZXgpIHtcbiAgICAgICAgaWYgKHN0ZXBJbmRleCAmJiAhXy5rZXlzKHN0ZXAuZmllbGRzKS5sZW5ndGggJiYgIWZpcnN0U3RlcFdpdGhvdXRSSW5wdXRSZWFjaGVkKSB7XG4gICAgICAgICAgICBmaXJzdFN0ZXBXaXRob3V0UklucHV0UmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgICBkb1N1Ym1pdFtzdGVwSW5kZXggLSAxXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RlcEFzeW5jQ2hlY2sgPSBhc3luYygnc3RlcCcsIHN0ZXBJbmRleCwgJ2FzeW5jQ2hlY2snKTtcbiAgICAgICAgc3RlcEFzeW5jQ2hlY2sucGx1ZyhCYWNvbi5jb21iaW5lVGVtcGxhdGUoXy50cmFuc2Zvcm0oc3RlcC5maWVsZHMsIGZ1bmN0aW9uIChyZXN1bHQsIHJpbnB1dCwgZmllbGQpIHtcbiAgICAgICAgICAgIHJlc3VsdFtmaWVsZF0gPSBhc3luYygnY2hlY2snLCBmaWVsZCk7XG4gICAgICAgIH0pKS5tYXAoUHJvbWlzZS5wcm9wcykpOyAvLyDovpPlhaXlkI7oh6rliqjop6blj5HnmoTmo4Dmn6VcbiAgICAgICAgdmFyIGFjID0gYXN5bmMoJ3N0ZXAnLCBzdGVwSW5kZXgsICdjaGVjaycpOyAvLyDov5nkuIDmraXmiYDmnIkgaW5wdXQg55qE57uT5p6c77yM54K55Ye75LiL5LiA5q2l5ZCO6ZyA6KaB55qE5b+F5aGr6aG55L+u5q2jXG4gICAgICAgIGFjLnBsdWcoc3RlcEFzeW5jQ2hlY2subWFwKGZ1bmN0aW9uIChjaGVja1Jlc3VsdFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGVja1Jlc3VsdFByb21pc2UudGhlbihmdW5jdGlvbiAoY2hlY2tSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy50cmFuc2Zvcm0oY2hlY2tSZXN1bHQsIGZ1bmN0aW9uIChyZXN1bHQsIGFzeW5jRXJyQ29kZSwgZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6L6T5YWl5pe25b+955Wl5LqG5pyq5aGr6ZSZ6K+v77yM6L+Z6YeM6KGl5LiKXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHJpbW1lZFZhbHVlKHZhbHVlLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWxpZGF0b3IgPSB2YWxpZGF0aW9uW2ZpZWxkXSB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcmlucHV0c1tmaWVsZF0uZ2V0KCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyQ29kZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRvci5zeW5jICYmIChlcnJDb2RlID0gdmFsaWRhdG9yLnN5bmModmFsdWUpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ZpZWxkXSA9IGVyckNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXhSZXF1aXJlZChyZXN1bHQsIGZpZWxkLCB2YWx1ZSwgZXJyQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ZpZWxkXSA9IGFzeW5jRXJyQ29kZTtcbiAgICAgICAgICAgICAgICAgICAgZml4UmVxdWlyZWQocmVzdWx0LCBmaWVsZCwgdmFsdWUsIGVyckNvZGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgZnVuY3Rpb24gZml4UmVxdWlyZWQocmVzdWx0LCBmaWVsZCwgdmFsdWUsIGVyckNvZGUpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZGF0b3IgPSB2YWxpZGF0aW9uW2ZpZWxkXSB8fCB7fTtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IucmVxdWlyZWQgPT09IGZhbHNlICYmIChlcnJDb2RlIHx8ICcnKS5tYXRjaCgvX05VTEwkLykpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbZmllbGRdID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci5yZXF1aXJlZCAmJiAhZXJyQ29kZSAmJiAhdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbZmllbGRdID0gZmllbGQudG9VcHBlckNhc2UoKSArICdfTlVMTCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYWN0aW9uKCduZXh0U3RlcCcsIHN0ZXBJbmRleCkucGx1ZyhCYWNvbi5mcm9tRXZlbnQoc3RlcCwgJ25leHRTdGVwJykpO1xuICAgICAgICB2YXIgYW5zID0gYXN5bmMoJ25leHRTdGVwJywgc3RlcEluZGV4KTtcbiAgICAgICAgYW5zLnBsdWcoYWMuc2FtcGxlZEJ5KGFjdGlvbignbmV4dFN0ZXAnLCBzdGVwSW5kZXgpLCBmdW5jdGlvbiAoY2hlY2tSZXN1bHRQcm9taXNlLCBuZXh0U3RlcCkge1xuICAgICAgICAgICAgc3RlcC5zZXQoJ2xvYWRpbmcnLCB0cnVlKTtcbiAgICAgICAgICAgIC8vIOi/meS4quWbnuaOieebuOW9k+S6jueCueWHu+S4i+S4gOatpeaXtuW+l+WIsCBjciDnmoTmnIDmlrDnu5PmnpxcbiAgICAgICAgICAgIHJldHVybiBjaGVja1Jlc3VsdFByb21pc2UudGhlbihmdW5jdGlvbiAoY3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGV0c0dvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfLmVhY2goY3IsIGZ1bmN0aW9uIChjciwgZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0b3JlKCdlcnJDb2RlJywgZmllbGQpLnB1c2goY3IpO1xuICAgICAgICAgICAgICAgICAgICBsZXRzR28gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGV0c0dvO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgYW5zLmZsYXRNYXBMYXRlc3QoQmFjb24uZnJvbVByb21pc2UpLm9uVmFsdWUoZnVuY3Rpb24gKHNob3VsZEdvTmV4dCkge1xuICAgICAgICAgICAgc3RlcC5zZXQoJ2xvYWRpbmcnLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoc2hvdWxkR29OZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkb1N1Ym1pdFtzdGVwSW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbignc3dpdGNoU3RlcCcpLnB1c2goc3RlcEluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHVzZXIgPSBfLnRyYW5zZm9ybShyaW5wdXRzLCBmdW5jdGlvbiAocmVzdWx0LCByaW5wdXQsIGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wQWx0ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbXNDYXB0Y2hhOiAnbW9iaWxlX2NhcHRjaGEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmbTogJ3JlZmVycmFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmw6ICdyZWZlcnJhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZjOiAncmVmZXJyYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmdGY6IHJlZ2lzdGVyUmFjdGl2ZS5nZXQoJ3doYXRUaGVSZWZGdWNrJykgfHwgJ3JlZmVycmFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmk6ICdpbnZpdGVDb2RlJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbcHJvcEFsdGVyW2ZpZWxkXSB8fCBmaWVsZF0gPSB0cmltbWVkVmFsdWUocmlucHV0LmdldCgndmFsdWUnKSwgZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQgPT09ICdlbWFpbCcgJiYgcmVzdWx0LmVtYWlsICYmIHZhbGlkYXRpb24uZW1haWwudmVybWFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnZlcm1haWwgPSAnMSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyDlj6/ku6XkuI3opoEgbG9naW5OYW1lIOi/meS4gOmhuSBmaWVsZCwg6buY6K6k5aGr5YaZ5LiK77yM6K6+572u5LqGIENDLmNvbmZpZy5jbGllbnRDb2RlIOeahOivneWwseS7pei/meS4quS4uuWJjee8gFxuICAgICAgICAgICAgICAgIGlmICghdXNlci5sb2dpbk5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZWZpeDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5DQyAmJiBDQy5jb25maWcgJiYgQ0MuY29uZmlnLmNsaWVudENvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWZpeCA9IENDLmNvbmZpZy5jbGllbnRDb2RlLnRvTG93ZXJDYXNlKCkgKyAnXyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVnaXN0ZXJSYWN0aXZlLmdldCgnbW9iaWxlUHJlZml4JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWZpeCA9IHJlZ2lzdGVyUmFjdGl2ZS5nZXQoJ21vYmlsZVByZWZpeCcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4ID0gJ+aJi+acuueUqOaItyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXNlci5sb2dpbk5hbWUgPSBwcmVmaXggKyB1c2VyLm1vYmlsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9SZWdpc3Rlcih1c2VyLCBzdGVwSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBhY3Rpb24oJ3N3aXRjaFN0ZXAnKS5vblZhbHVlKHJlZ2lzdGVyUmFjdGl2ZSwgJ3NldCcsICdvblN0ZXAnKTtcbiAgICB2YXIgZmllbGRJbldoaWNoU3RlcCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICBzdGVwcy5zbGljZSgpLnJldmVyc2UoKS5zbGljZSgxKS5mb3JFYWNoKGZ1bmN0aW9uIChzdGVwKSB7XG4gICAgICAgICAgICBfLmVhY2goc3RlcC5maWVsZHMsIGZ1bmN0aW9uIChyaW5wdXRzLCBmaWVsZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtmaWVsZF0gPSBzdGVwLmdldCgnc3RlcEluZGV4Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSgpKTtcbiAgICBmdW5jdGlvbiBkb1JlZ2lzdGVyKHVzZXIsIGN1cnJlbnRTdGVwKSB7XG4gICAgICAgIHNlcnZpY2VzLnJlZ2lzdGVyKHVzZXIpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChib2R5KSB7XG4gICAgICAgICAgICB2YXIgZ29TdGVwID0gY3VycmVudFN0ZXAgKyAxO1xuICAgICAgICAgICAgaWYgKGJvZHkuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHN0b3JlKCdzdWNjZXNzJykucHVzaChfLmFzc2lnbihib2R5LmRhdGEsIHtwb3N0ZWREYXRhOiB1c2VyfSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZ29TdGVwID0gXyhib2R5LmVycm9yKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlKCdlcnJDb2RlJywgZXJyLnR5cGUpLnB1c2goZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkSW5XaGljaFN0ZXBbZXJyLnR5cGVdO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudW5pcSgpXG4gICAgICAgICAgICAgICAgICAgIC5taW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjdGlvbignc3dpdGNoU3RlcCcpLnB1c2goZ29TdGVwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG53aW5kb3cucnN0b3JlID0gc3RvcmU7XG53aW5kb3cucmFjdGlvbiA9IGFjdGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSgncHJvbWlzaW5nYWdlbnQnKTtcblxuZXhwb3J0cy5zZW5kU21zQ2FwdGNoYSA9IGZ1bmN0aW9uIChtb2JpbGUpIHtcbiAgICByZXR1cm4gcmVxdWVzdCgnR0VUJywgJy9hcGkvdjIvdXNlcnMvc21zQ2FwdGNoYT9tb2JpbGU9JyArIG1vYmlsZSkuZ2V0KCdib2R5Jyk7XG59XG5cbmV4cG9ydHMuaW1nQ2FwdGNoYSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmVxdWVzdCgnL2FwaS92Mi9jYXB0Y2hhJywge3F1ZXJ5OiB7djogKG5ldyBEYXRlKS52YWx1ZU9mKCl9fSlcbiAgICAuZ2V0KCdib2R5Jyk7XG59XG5cbmV4cG9ydHMuc21zQ2FwdGNoYSA9IGZ1bmN0aW9uICh0b2tlbiwgY2FwdGNoYSwgbW9iaWxlKSB7XG4gICAgcmV0dXJuIHJlcXVlc3QoJy9yZWdpc3Rlci9hamF4L3Ntc0NhcHRjaGEnLCB7XG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICBjYXB0Y2hhX3Rva2VuOiB0b2tlbixcbiAgICAgICAgICAgIGNhcHRjaGFfYW5zd2VyOiBjYXB0Y2hhLFxuICAgICAgICAgICAgbW9iaWxlOiBtb2JpbGVcbiAgICAgICAgfVxuICAgIH0pLmdldCgnYm9keScpO1xufVxuXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKHVzZXIpIHtcbiAgICByZXR1cm4gcmVxdWVzdCgnUE9TVCcsICcvcmVnaXN0ZXIvYWpheC9zdWJtaXQnLCB7XG4gICAgICAgIGJvZHk6IHVzZXJcbiAgICB9KS5nZXQoJ2JvZHknKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcbnZhciB2YWxpZGF0b3IgPSByZXF1aXJlKCdAY2NjL3ZhbGlkYXRpb24nKS52YWxpZGF0b3I7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJ3Byb21pc2luZ2FnZW50Jyk7XG5cbmV4cG9ydHMucGFzc3dvcmRTdHJlbmd0aCA9IHZhbGlkYXRvci5wYXNzd29yZFN0cmVuZ3RoO1xuXG5leHBvcnRzLmdlbkFzeW5jVmFsaWRhdG9yID0gZ2VuQXN5bmNWYWxpZGF0b3I7XG5mdW5jdGlvbiBnZW5Bc3luY1ZhbGlkYXRvcih1cmwsIGZpZWxkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSwgY2IpIHtcbiAgICAgICAgdmFyIGJvZHkgPSB7fTtcbiAgICAgICAgYm9keVtmaWVsZF0gPSB2YWx1ZTtcbiAgICAgICAgcmVxdWVzdCgnUE9TVCcsIHVybCwge2JvZHk6IGJvZHl9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXIuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNiKHIuYm9keS5zdWNjZXNzID8gZmFsc2UgOiByLmJvZHkuZXJyb3JbMF0ubWVzc2FnZSk7XG4gICAgICAgICAgICB9KVtcbiAgICAgICAgICAgIFwiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNiKCdVTktOT1dOX0VSUk9SJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5leHBvcnRzLmxvZ2luTmFtZSA9IHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBzeW5jOiB2YWxpZGF0b3IubG9naW5OYW1lLFxuICAgIGFzeW5jOiBnZW5Bc3luY1ZhbGlkYXRvcignL2FwaS92Mi91c2Vycy9jaGVjay9sb2dpbl9uYW1lJywgJ2xvZ2luTmFtZScpXG59O1xuXG5leHBvcnRzLnBhc3N3b3JkID0ge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHN5bmM6IHZhbGlkYXRvci5wYXNzd29yZFxufTtcblxuZXhwb3J0cy5yZXBhc3N3b3JkID0ge1xuICAgIHJlcXVpcmVkOiB0cnVlXG59O1xuXG5leHBvcnRzLm1vYmlsZSA9IHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBzeW5jOiB2YWxpZGF0b3IubW9iaWxlLFxuICAgIGFzeW5jOiBnZW5Bc3luY1ZhbGlkYXRvcignL2FwaS92Mi91c2Vycy9jaGVjay9tb2JpbGUnLCAnbW9iaWxlJylcbn07XG5cbmV4cG9ydHMucmVmaSA9IHtcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgc3luYzogdmFsaWRhdG9yLnJlZmksXG4gICAgYXN5bmM6IGdlbkFzeW5jVmFsaWRhdG9yKCcvYXBpL3YyL3VzZXJzL2NoZWNrL2ludml0ZUNvZGUnLCAnaW52aXRlQ29kZScpXG59O1xuXG5leHBvcnRzLnJlZm0gPSB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHN5bmM6IGZ1bmN0aW9uIChtb2JpbGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHZhbGlkYXRvci5tb2JpbGUobW9iaWxlKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gJ01PQklMRV9JTlZBTElEJykge1xuICAgICAgICAgICAgcmV0dXJuICdSRUZNX0lOVkFMSUQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGFzeW5jOiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhdiA9IGdlbkFzeW5jVmFsaWRhdG9yKCcvYXBpL3YyL3VzZXJzL2NoZWNrL21vYmlsZScsICdtb2JpbGUnKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSwgY2IpIHtcbiAgICAgICAgICAgIGF2KHZhbHVlLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoJ1JFRk1fTk9UX0VYSVNUUycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSAnTU9CSUxFX0lOVkFMSUQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKCdSRUZNX0lOVkFMSUQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gJ1VOS05PV05fRVJST1InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKCdVTktOT1dOX0VSUk9SJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0oKSlcbn07XG5cbmV4cG9ydHMuaW1nQ2FwdGNoYSA9IHtcbiAgICByZXF1aXJlZDogZmFsc2Vcbn07XG5cbmV4cG9ydHMuc21zQ2FwdGNoYSA9IHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBzeW5jOiB2YWxpZGF0b3Iuc21zQ2FwdGNoYSxcbiAgICBhc3luYzogZ2VuQXN5bmNWYWxpZGF0b3IoJy9hcGkvdjIvdXNlcnMvc21zQ2FwdGNoYScsICdzbXNDYXB0Y2hhJylcbn07XG5cbmV4cG9ydHMuZW1haWwgPSB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHN5bmM6IHZhbGlkYXRvci5lbWFpbCxcbiAgICBhc3luYzogZ2VuQXN5bmNWYWxpZGF0b3IoJy9hcGkvdjIvdXNlcnMvY2hlY2svZW1haWwnLCAnZW1haWwnKVxufTtcblxuZXhwb3J0cy5lbXBSZWZlcnJhbCA9IHtcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgYXN5bmM6IGdlbkFzeW5jVmFsaWRhdG9yKCcvYXBpL3YyL3VzZXJzL2NoZWNrL2VtcF9yZWZlcnJhbCcsICdlbXBSZWZlcnJhbCcpXG59O1xuXG5leHBvcnRzLmFncmVlbWVudCA9IHtcbiAgICByZXF1aXJlZDogdHJ1ZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmV4cG9ydHMuZXJybXNncyA9IHJlcXVpcmUoJy4vanMvbGliL2Vycm1zZ3MnKTtcbmV4cG9ydHMudmFsaWRhdG9yID0gcmVxdWlyZSgnLi9qcy9saWIvdmFsaWRhdG9yJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBQQVNTV09SRF9OVUxMOiAn6K+35aGr5YaZ5a+G56CBLOS4jeiDveS4uuepuuWtl+espicsXG4gICAgUEFTU1dPUkRfTEVOR1RIOiAn6K+35aGr5YaZ6Iez5bCRIDYg5L2N5a+G56CBJyxcbiAgICBQQVNTV09SRF9BR0FJTl9OVUxMOiAn6K+35aGr5YaZ5a+G56CB56Gu6K6kJyxcbiAgICBQQVNTV09SRF9BR0FJTl9JTlZBTElEOiAn5Lik5qyh6L6T5YWl55qE5a+G56CB5LiN5LiA6Ie0JyxcbiAgICBSRVBBU1NXT1JEX05VTEw6ICfor7floavlhpnlr4bnoIHnoa7orqQnLFxuICAgIFJFUEFTU1dPUkRfSU5WQUxJRDogJ+S4pOasoei+k+WFpeeahOWvhueggeS4jeS4gOiHtCcsXG4gICAgTU9CSUxFX1VTRUQ6ICfmiYvmnLrlj7fnoIHlt7Looqvkvb/nlKgnLFxuICAgIE1PQklMRV9FWElTVFM6ICfmiYvmnLrlj7fnoIHlt7Looqvkvb/nlKgnLFxuICAgIE1PQklMRV9DQVBUQ0hBX05VTEw6ICfor7floavlhpnmiYvmnLrnn63kv6Hpqozor4HnoIEnLFxuICAgIE1PQklMRV9DQVBUQ0hBX0lOVkFMSUQ6ICfpqozor4HnoIHml6DmlYjmiJblt7Lov4fmnJ/vvIzor7flsJ3or5Xph43mlrDlj5HpgIEnLFxuICAgIE1PQklMRV9DQVBUQ0hBX0VYUElSRUQ6ICfpqozor4HnoIHov4fmnJ/vvIzor7flsJ3or5Xph43mlrDlj5HpgIEnLFxuICAgIEFHUkVFTUVOVF9OVUxMOiAn5rOo5YaM6ZyA5YWI5ZCM5oSP5pyN5Yqh5p2h5qy+JyxcbiAgICBDQVBUQ0hBX05VTEw6ICfor7floavlhpnpqozor4HnoIEnLFxuICAgIENBUFRDSEFfSU5WQUxJRDogJ+mqjOivgeeggeS4jeato+ehricsXG4gICAgTU9CSUxFX05VTEw6ICfor7floavlhpnmiYvmnLrlj7fnoIEnLFxuICAgIE1PQklMRV9JTlZBTElEOiAn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+3JyxcbiAgICBMT0dJTk5BTUVfRVhJU1RTOiAn55So5oi35ZCN5bey5a2Y5ZyoJyxcbiAgICBMT0dJTk5BTUVfU1RSSUNUOiAnMuiHszE25L2N5Lit6Iux5paH5a2X56ym44CB5pWw5a2X5oiW5LiL5YiS57q/JyxcbiAgICBMT0dJTk5BTUVfTlVMTDogJ+ivt+Whq+WGmeeUqOaIt+WQjScsXG4gICAgTE9HSU5OQU1FX0lOVkFMSUQ6ICcy6IezMTbkvY3kuK3oi7HmloflrZfnrKbjgIHmlbDlrZfmiJbkuIvliJLnur8nLFxuICAgIExPR0lOTkFNRV9TSVpFOiAnMuiHszE25L2N5Lit6Iux5paH5a2X56ym44CB5pWw5a2X5oiW5LiL5YiS57q/JyxcbiAgICBMT0dJTk5BTUVfTk9UX01PQklMRTogJ+eUqOaIt+WQjeS4jeiDveaYr+aJi+acuuWPt++8iOazqOWGjOWQjuWPr+S7peeUqOaJi+acuuWPt+eZu+W9le+8iScsXG4gICAgTkFNRV9OVUxMOiAn6K+35aGr5YaZ55yf5a6e5aeT5ZCNJyxcbiAgICBOQU1FX0lOVkFMSUQ6ICfnnJ/lrp7lp5PlkI3plJnor6/vvIzlupTkuLoyLTE25L2N5Lit5paH5rGJ5a2XJyxcbiAgICBFTUFJTF9OVUxMOiAn6K+35aGr5YaZ55S15a2Q6YKu566xJyxcbiAgICBFTUFJTF9JTlZBTElEOiAn6K+36L6T5YWl5q2j56Gu55qE6YKu566xJyxcbiAgICBJRE5VTUJFUl9JTlZBTElEOiAn6K+35q2j56Gu5aGr5YaZIDE4IOS9jei6q+S7veivgeWPt+eggScsXG4gICAgTE9HSU5fSU5WQUxJRDogJ+aJi+acuuWPt+aIluWvhueggemUmeivrycsXG4gICAgSU5WQUxJRF9DQVBUQ0hBOiAn6aqM6K+B56CB6ZSZ6K+vJyxcbiAgICBMT0dJTk5BTUVfTk9UX01BVENIOiAn5omL5py65Y+356CB5LiO55m75b2V5ZCN5LiN5Yy56YWNJyxcbiAgICBJTlZJVEFUSU9OX0lOVkFMSUQ6ICdI56CB5peg5pWIJyxcbiAgICBJTlZJVEFUSU9OX05VTEw6ICdI56CB5Li656m6JyxcbiAgICBQQVlNRU5UX0FDQ09VTlRfQ1JFQVRFX0VSUk9SOiAn5Zu95pS/6YCa5a6e5ZCN6K6k6K+B5qCh6aqM5pyq6YCa6L+HJyxcbiAgICBTTVNDQVBUQ0hBX0lOVkFMSUQ6ICfpqozor4HnoIHkuLo25L2NJyxcbiAgICBTTVNDQVBUQ0hBX05VTEw6ICfpqozor4HnoIHkuI3og73kuLrnqbonLFxuICAgIElOVklURUNPREVfSU5WQUxJRDon6YKA6K+356CB5peg5pWIJ1xufTtcblxuZXhwb3J0cy5nZXRGcm9tRXJyQ29kZSA9IGZ1bmN0aW9uIChlcnJDb2RlKSB7XG4gICAgcmV0dXJuIGVyckNvZGUgPyAoZXhwb3J0c1tlcnJDb2RlXSB8fCAn5Ye66ZSZ5LqG77yM6K+356iN5ZCO6YeN6K+VJykgOiAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMubG9naW5OYW1lID0gZnVuY3Rpb24gKGxvZ2luTmFtZSkge1xuICAgIHZhciByZWcgPSAvXig/IShbXFx3LV0rKFxcLltcXHctXSspKkBbXFx3LV0rKFxcLltcXHctXSspKykpKFswLTlhLXpBLVpfXFx1NEUwMC1cXHU5RkJGXSspLztcblxuICAgIGlmICghbG9naW5OYW1lIHx8ICFsb2dpbk5hbWUubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnTE9HSU5OQU1FX05VTEwnO1xuICAgIH1cblxuICAgIGlmIChsb2dpbk5hbWUubGVuZ3RoIDwgMiB8fCBsb2dpbk5hbWUubGVuZ3RoID4gMTYpIHtcbiAgICAgICAgcmV0dXJuICdMT0dJTk5BTUVfU0laRSc7XG4gICAgfVxuXG4gICAgaWYgKCFleHBvcnRzLm1vYmlsZShsb2dpbk5hbWUpKSB7XG4gICAgICAgIHJldHVybiAnTE9HSU5OQU1FX05PVF9NT0JJTEUnO1xuICAgIH1cblxuICAgIGlmICghKCcnICsgbG9naW5OYW1lKS5tYXRjaChyZWcpKSB7XG4gICAgICAgIHJldHVybiAnTE9HSU5OQU1FX0lOVkFMSUQnO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydHMucGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICBpZiAoIXBhc3N3b3JkIHx8ICFwYXNzd29yZC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICdQQVNTV09SRF9OVUxMJztcbiAgICB9XG5cbiAgICBpZiAocGFzc3dvcmQubGVuZ3RoIDwgNikge1xuICAgICAgICByZXR1cm4gJ1BBU1NXT1JEX0xFTkdUSCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0cy5yZXBhc3N3b3JkID0gZnVuY3Rpb24gKHBhc3N3b3JkLCByZXBhc3N3b3JkKSB7XG4gICAgaWYgKCFyZXBhc3N3b3JkIHx8ICFyZXBhc3N3b3JkLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJ1JFUEFTU1dPUkRfTlVMTCc7XG4gICAgfVxuXG4gICAgaWYgKHJlcGFzc3dvcmQgIT09IHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiAnUkVQQVNTV09SRF9JTlZBTElEJztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnRzLnBhc3N3b3JkU3RyZW5ndGggPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICB2YXIgdXBwZXJSZWcgPSAvW0EtWl0vO1xuICAgIHZhciBsb3dlclJlZyA9IC9bYS16XS87XG4gICAgdmFyIG51bVJlZyA9IC9bMC05XS87XG4gICAgdmFyIHN5bWJvbFJlZyA9IC9cXFcvO1xuXG4gICAgaWYgKChwYXNzd29yZCB8fCAnJykubGVuZ3RoIDwgNikge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB2YXIgc2NvcmUgPSAwO1xuICAgIGlmICh1cHBlclJlZy50ZXN0KHBhc3N3b3JkKSkge1xuICAgICAgICBzY29yZSArPSAwLjY7XG4gICAgfVxuICAgIGlmIChsb3dlclJlZy50ZXN0KHBhc3N3b3JkKSkge1xuICAgICAgICBzY29yZSArPSAwLjY7XG4gICAgfVxuICAgIGlmIChudW1SZWcudGVzdChwYXNzd29yZCkpIHtcbiAgICAgICAgc2NvcmUgKz0gMC42O1xuICAgIH1cbiAgICBpZiAoc3ltYm9sUmVnLnRlc3QocGFzc3dvcmQpKSB7XG4gICAgICAgIHNjb3JlICs9IDAuOTtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguY2VpbChzY29yZSk7XG59O1xuXG5leHBvcnRzLmVtYWlsID0gZnVuY3Rpb24gKGVtYWlsKSB7XG4gICAgaWYgKCFlbWFpbCB8fCAhZW1haWwubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnRU1BSUxfTlVMTCc7XG4gICAgfVxuXG4gICAgaWYgKCEoJycgKyBlbWFpbCkubWF0Y2goL1tcXHctXSsoXFwuW1xcdy1dKykqQFtcXHctXSsoXFwuW1xcdy1dKykrLykpIHtcbiAgICAgICAgcmV0dXJuICdFTUFJTF9JTlZBTElEJztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnRzLm1vYmlsZSA9IGZ1bmN0aW9uIChtb2JpbGUpIHtcbiAgICBpZiAoIW1vYmlsZSB8fCAhbW9iaWxlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJ01PQklMRV9OVUxMJztcbiAgICB9XG5cbiAgICBpZiAoISgnJyArIG1vYmlsZSlcbiAgICAgICAgLm1hdGNoKC9eMVxcZHsxMH0kLykpIHtcbiAgICAgICAgcmV0dXJuICdNT0JJTEVfSU5WQUxJRCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0cy5jaGVja0lkTnVtYmVyID0gZnVuY3Rpb24gKGlkTnVtYmVyKSB7XG4gICAgaWROdW1iZXIgPSAoJycgKyBpZE51bWJlcikucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIHZhciBwY29kZSA9IFtdOyAvL+WPquaciei/meS6m+aVsOWtl+W8gOWktOeahOS7o+eggeaJjeaYr+WQiOazleeahFxuICAgIHBjb2RlLnB1c2goJzExJyk7IC8v5YyX5LqsXG4gICAgcGNvZGUucHVzaCgnMTInKTsgLy/lpKnmtKVcbiAgICBwY29kZS5wdXNoKCcxMycpOyAvL+ays+WMl1xuICAgIHBjb2RlLnB1c2goJzE0Jyk7IC8v5bGx6KW/XG4gICAgcGNvZGUucHVzaCgnMTUnKTsgLy/lhoXokpnlj6RcbiAgICBwY29kZS5wdXNoKCcyMScpOyAvL+i+veWugVxuICAgIHBjb2RlLnB1c2goJzIyJyk7IC8v5ZCJ5p6XXG4gICAgcGNvZGUucHVzaCgnMjMnKTsgLy/pu5HpvpnmsZ9cbiAgICBwY29kZS5wdXNoKCczMScpOyAvL+S4iua1t1xuICAgIHBjb2RlLnB1c2goJzMyJyk7IC8v5rGf6IuPXG4gICAgcGNvZGUucHVzaCgnMzMnKTsgLy/mtZnmsZ9cbiAgICBwY29kZS5wdXNoKCczNCcpOyAvL+WuieW+vVxuICAgIHBjb2RlLnB1c2goJzM1Jyk7IC8v56aP5bu6XG4gICAgcGNvZGUucHVzaCgnMzYnKTsgLy/msZ/opb9cbiAgICBwY29kZS5wdXNoKCczNycpOyAvL+WxseS4nFxuICAgIHBjb2RlLnB1c2goJzQxJyk7IC8v5rKz5Y2XXG4gICAgcGNvZGUucHVzaCgnNDInKTsgLy/muZbljJdcbiAgICBwY29kZS5wdXNoKCc0MycpOyAvL+a5luWNl1xuICAgIHBjb2RlLnB1c2goJzQ0Jyk7IC8v5bm/5LicXG4gICAgcGNvZGUucHVzaCgnNDUnKTsgLy/lub/opb9cbiAgICBwY29kZS5wdXNoKCc0NicpOyAvL+a1t+WNl1xuICAgIHBjb2RlLnB1c2goJzUwJyk7IC8v6YeN5bqGXG4gICAgcGNvZGUucHVzaCgnNTEnKTsgLy/lm5vlt51cbiAgICBwY29kZS5wdXNoKCc1MicpOyAvL+i0teW3nlxuICAgIHBjb2RlLnB1c2goJzUzJyk7IC8v5LqR5Y2XXG4gICAgcGNvZGUucHVzaCgnNTQnKTsgLy/opb/ol49cbiAgICBwY29kZS5wdXNoKCc2MScpOyAvL+mZleilv1xuICAgIHBjb2RlLnB1c2goJzYyJyk7IC8v55SY6IKDXG4gICAgcGNvZGUucHVzaCgnNjMnKTsgLy/pnZLmtbdcbiAgICBwY29kZS5wdXNoKCc2NCcpOyAvL+WugeWkj1xuICAgIHBjb2RlLnB1c2goJzY1Jyk7IC8v5paw55aGXG4gICAgaWYgKCF+cGNvZGUuaW5kZXhPZihpZE51bWJlci5zdWJzdHJpbmcoMCwgMikpKSB7XG4gICAgICAgIHJldHVybiAnSUROVU1CRVJfSU5WQUxJRCc7XG4gICAgfVxuXG4gICAgdmFyIGZhY3RvciA9IFs3LCA5LCAxMCwgNSwgOCwgNCwgMiwgMSwgNiwgMywgNywgOSwgMTAsIDUsIDgsIDQsIDJdO1xuICAgIHZhciB2YWxpZEVuZGluZyA9IFsnMScsICcwJywgJ1gnLCAnOScsICc4JywgJzcnLCAnNicsICc1JywgJzQnLCAnMycsICcyJ107XG4gICAgdmFyIHJlc3VsdCA9IF8ucmVkdWNlKGZhY3RvciwgZnVuY3Rpb24gKHIsIG4sIGkpIHsgcmV0dXJuIHIgKyBuICogfn5pZE51bWJlcltpXTsgfSwgMCkgJSAxMTtcblxuICAgIGlmIChpZE51bWJlclsxN10gIT0gdmFsaWRFbmRpbmdbcmVzdWx0XSkge1xuICAgICAgICByZXR1cm4gJ0lETlVNQkVSX0lOVkFMSUQnO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnRzLm5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICghbmFtZSB8fCAhbmFtZS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICdOQU1FX05VTEwnO1xuICAgIH1cblxuICAgIGlmICghKCcnICsgbmFtZSlcbiAgICAgICAgLm1hdGNoKC9bXFx1NEUwMC1cXHU5RkJGXXsyLDE1fS8pKSB7XG4gICAgICAgIHJldHVybiAnTkFNRV9JTlZBTElEJztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnRzLnNtc0NhcHRjaGEgPSBmdW5jdGlvbiAoc21zKSB7XG4gICAgaWYgKCFzbXMgfHwgIXNtcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICdTTVNDQVBUQ0hBX05VTEwnO1xuICAgIH1cblxuICAgIGlmIChzbXMubGVuZ3RoICE9PSA2KSB7XG4gICAgICAgIHJldHVybiAnU01TQ0FQVENIQV9JTlZBTElEJztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuIl19
