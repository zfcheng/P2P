(function(n){"use strict";if(n.BCP&&"function"===typeof n.BCP.prelude)return n.BCP.prelude;var e=n.requestAnimationFrame||n.setImmediate||function(n){return setTimeout(n,1)};this.QAS=function(n){var e=n.requestAnimationFrame||n.setImmediate||function(n){return setTimeout(n,1)};var r=[].concat(n._qas_queue||[]);if(n._qas_queue)delete n._qas_queue;var t=Array.prototype.slice;var u=function(n){var e=t.call(arguments,1);if(u.loaded)o(n,e);else r.push([n,e]);return u};u.sync=function(n){n.sync=true;return u.apply(null,arguments)};u.ready=i;u.sync.ready=i;function i(){u.loaded=true;var n;while(n=r.shift()){o(n[0],n[1])}}function o(r,t){if(typeof r!="function")return;r.sync?r.apply(n,t):e(function(){r.apply(n,t)})}return u}(this);var r=n.BCP=t;function t(n){QAS(n,l([]))}t.sync=function(n){QAS.sync(n,l([]))};r.prelude=c;r.mergeModules=a;var u=0;var i=r.cache={};var o=r.modules={};return c;function a(n){n=n||{};for(var e in n){if(typeof e!=="number"&&n.hasOwnProperty(e)){if(!(e in o)){o[e]=n[e];if(e[0]!=="/")o["/"+e]=n[e]}}}}function f(){u+=1;e(function(){if(u>=document.querySelectorAll("script[data-common]").length){QAS.ready()}})}function c(n,e,t){r.mergeModules(n);var u=l(t);if(!t||!t.length){f()}else{var i;QAS(function(n){while(i=n.shift()){u(i)}},t)}return u}function l(n){return function e(r){if(!QAS.loaded){throw new Error("external libs not ready!")}var t=r;if(typeof t==="string"&&t[0]==="/"){t=t.replace(/^\//,"")}var u;if(!i[t]){if(!(u=o[t])){if(!(u=o[r==="/"+t?r:t="/"+t])){if(!(u=o[t="/node_modules"+t])){var a=new Error("Cannot find module '"+r+"'\n\nall available modules:\n"+s().join("\n"));a.code="MODULE_NOT_FOUND";throw a}}}var f=i[t]=i[r]={exports:{}};u[0].call(f.exports,function(n){var r=u[1][n];return e(r?r:"/"+n)},f,f.exports,c,o,i,n)}return i[t].exports}}function s(){var n={};p(o,function(e,r){if((""+r).match(/^\/?\d+$/))return;n[r.replace(/^\/(node_modules\/)?/,"")]=1});return m(n)}function d(n,e){var r,t;for(r=0,t=n.length;r<t;r++){e.call(n,n[r],k,n)}}function p(n,e){for(var r in n){if(n.hasOwnProperty(r)){e.call(n,n[r],r,n)}}}function m(n){var e=[];p(n,function(n,r){e.push(r)});return e}}).call(this,this)({"/ccc/account/js/main/service/account.js":[function(require,module,exports){
/**
 * @file 账户数据对接模块交互逻辑
 * @author huip(hui.peng@creditcloud.com)
 */

'use strict';

exports.accountService = {
    registerUmpay: function registerUmpay(user, next) {
        request('POST', '/api/v2/upayment/register/MYSELF').type('form').send(user).end().then(function (r) {
            next(r.body);
        });
    },
    bindAgrement: function bindAgrement(agreementList, next) {
        request('POST', '/api/v2/upayment/bindAgreement/MYSELF').type('form').send({ agreementList: agreementList }).end().then(function (r) {
            next(r.body);
        });
    },

    getLoanCount: function getLoanCount(status, next) {
        var api = '/api/v2/user/MYSELF/loan/count';
        api = api + status;
        request('GET', api).end().then(function (r) {
            if (r.body.data > 0) {
                next(r.body.data);
            } else {
                next(0);
            }
        });
    },
    authenticateUser: function authenticateUser(user, next) {
        request('POST', '/api/v2/lianlianpay/authenticateUser/MYSELF').type('form').send(user).end().then(function (r) {
            next(r.body);
        });
    },
    checkAuthenticate: function checkAuthenticate(next) {
        request('GET', '/api/v2/user/MYSELF/authenticates').end().then(function (r) {
            next(r.body);
        });
    },
    getProvince: function getProvince(next) {
        request('GET', '/api/v2/lianlianpay/provinceCodes').end().then(function (r) {
            next(r.body);
        });
    },
    getCity: function getCity(provinceName, next) {
        request('GET', '/api/v2/lianlianpay/provinceCityCodes/' + provinceName).end().then(function (r) {
            next(r.body);
        });
    },
    getUserInfo: function getUserInfo(next) {
        request('GET', '/api/v2/user/MYSELF/userinfo').end().then(function (r) {
            next(r.body);
        });
    },
    getAccount: function getAccount(next) {
        request('GET', '/api/v2/user/MYSELF/fundaccounts').end().then(function (r) {
            next(r.body);
        });
    },
    feedback: function feedback(userId, params, next) {
        request('POST', '/api/v2/user/' + userId + '/feedback').type('form').send(params).end().then(function (r) {
            next(r.body);
        });
    },
    saveAutoBidConfig: function saveAutoBidConfig(params, next) {
        $.post('/api/v2/user/MYSELF/save_autobid_config', params, function (r) {
            next(r);
            return r;
        });
    },
    getTotalInters: function getTotalInters(next) {
        request('GET', '/api/v2/points/user/' + CC.user.id + '/getTotalPoints').end().then(function (r) {
            next(r.body);
        });
    },
    initialPassword: function initialPassword(password, next) {
        request('POST', '/api/v2/user/MYSELF/setPaymentPassword').type('form').send({ password: password }).end().then(function (r) {
            next(r.body);
        });
    },
    updatePassword: function updatePassword(oldPassword, newPassword, next) {
        request('POST', '/api/v2/user/MYSELF/updatePaymentPassword').type('form').send({
            oldPassword: oldPassword,
            newPassword: newPassword
        }).end().then(function (r) {
            next(r.body);
        });
    },
    resetPassword: function resetPassword(password, next) {
        request('POST', '/api/v2/user/MYSELF/resetPaymentPassword').type('form').send({
            password: password
        }).end().then(function (r) {
            next(r.body);
        });
    },
    checkPassword: function checkPassword(password, next) {
        request('GET', '/api/v2/user/MYSELF/validatePaymentPassword?password=' + password).end().then(function (r) {
            next(r.body);
        });
    },
    getNewMessageNum: function getNewMessageNum(next) {
        request('GET', '/api/v2/message/countNewNotifications/MYSELF').end().then(function (r) {
            next(r.body);
        });
    }
};

},{}],"/ccc/global/js/lib/utils.js":[function(require,module,exports){
"use strict";
module.exports = (function () {

    // 公用表单验证组件

    var FormValidator = function FormValidator() {};

    FormValidator.prototype = {

        checkLoginName: function checkLoginName(loginName, next) {
            var reg = /^(?!(([1][3|5|7|8][0-9]{9})|([\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+)))([0-9a-zA-Z_\u4E00-\u9FBF]+)/;

            if (!loginName || !loginName.length) {
                next(false, 'LOGINNAME_NULL');
                return;
            }

            if (loginName.length < 2 || loginName.length > 30) {
                next(false, 'LOGINNAME_SIZE');
                return;
            }

            if (!!('' + loginName).match(/[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+/)) {
                next(false, 'LOGINNAME_NOT_EMAIL');
                return;
            }

            if (!!('' + loginName).match(/^[1][3|5|7|8][0-9]{9}$/)) {
                next(false, 'LOGINNAME_NOT_MOBILE');
                return;
            }

            next(true, null);
        },

        checkRegisterName: function checkRegisterName(registerName, next) {
            var reg = /^(?!(([1][3|5|7|8][0-9]{9})|([\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+)))([0-9a-zA-Z_\u4E00-\u9FBF]+)/;

            if (!registerName || !registerName.length) {
                next(false, 'LOGINNAME_NULL');
                return;
            }

            if (!('' + registerName).match(reg)) {
                next(false, 'LOGINNAME_INVALID');
                return;
            }

            if (registerName.indexOf('-') >= 0) {
                next(false, 'LOGINNAME_INVALID');
                return;
            }

            if (registerName.length < 2 || registerName.length > 30) {
                next(false, 'LOGINNAME_SIZE');
                return;
            }

            next(true, null);
        },

        checkPassword: function checkPassword(password, next) {

            if (!password || !password.length) {
                next(false, 'PASSWORD_NULL');
                return;
            }

            if (password.length < 6) {
                next(false, 'PASSWORD_LENGTH');
                return;
            }

            next(true, null);
        },
        checkRePassword: function checkRePassword(password, repassword, next) {

            if (!repassword || !repassword.length) {
                next(false, 'REPASSWROD_NULL');
                return;
            }

            if (repassword !== password) {
                next(false, 'REPASSWORD_INVALID');
                return;
            }

            next(true, null);
        },

        checkEmail: function checkEmail(email, next) {
            if (!email || !email.length) {
                next(false, 'EMAIL_NULL');
                return;
            }
            if (!('' + email).match(/[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+/)) {
                next(false, 'EMAIL_INVALID');
                return;
            }
            next(true, null);
        },
        checkMobile: function checkMobile(mobile, next) {
            if (!mobile || !mobile.length) {
                next(false, 'MOBILE_NULL');
                return;
            }
            if (!('' + mobile).match(/^[1][3|5|7|8][0-9]{9}$/)) {
                next(false, 'MOBILE_INVALID');
                return;
            }
            next(true, null);
        },
        checkIdNumber: function checkIdNumber(idNumber, next) {
            idNumber = ('' + idNumber).replace(/^\s+|\s+$/g, '');
            var pcode = []; //只有这些数字开头的代码才是合法的
            pcode.push("11"); //北京
            pcode.push("12"); //天津
            pcode.push("13"); //河北
            pcode.push("14"); //山西
            pcode.push("15"); //内蒙古
            pcode.push("21"); //辽宁
            pcode.push("22"); //吉林
            pcode.push("23"); //黑龙江
            pcode.push("31"); //上海
            pcode.push("32"); //江苏
            pcode.push("33"); //浙江
            pcode.push("34"); //安徽
            pcode.push("35"); //福建
            pcode.push("36"); //江西
            pcode.push("37"); //山东
            pcode.push("41"); //河南
            pcode.push("42"); //湖北
            pcode.push("43"); //湖南
            pcode.push("44"); //广东
            pcode.push("45"); //广西
            pcode.push("46"); //海南
            pcode.push("50"); //重庆
            pcode.push("51"); //四川
            pcode.push("52"); //贵州
            pcode.push("53"); //云南
            pcode.push("54"); //西藏
            pcode.push("61"); //陕西
            pcode.push("62"); //甘肃
            pcode.push("63"); //青海
            pcode.push("64"); //宁夏
            pcode.push("65"); //新疆
            if (! ~pcode.indexOf(idNumber.substring(0, 2))) {
                if (next) {
                    next(false, 'IDNUMBER_INVALID');
                    return;
                } else {
                    return {
                        success: false,
                        data: 'IDNUMBER_INVALID'
                    };
                }
            }

            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var validEnding = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

            if (idNumber[17] != validEnding[_.reduce(factor, function (r, n, i) {
                return r + n * ~ ~idNumber[i];
            }, 0) % 11]) {
                if (next) {
                    next(false, 'IDNUMBER_INVALID');
                    return;
                } else {
                    return {
                        success: false,
                        data: 'IDNUMBER_INVALID'
                    };
                }
            }
            if (next) {
                next(true, null);
                return;
            } else {
                return {
                    success: true,
                    data: null
                };
            }
        },
        checkName: function checkName(name, next) {
            if (!name || !name.length) {
                next(false, 'NAME_NULL');
                return;
            }
            if (!('' + name).match(/[\u4E00-\u9FBF]{2,15}/)) {
                next(false, 'NAME_INVALID');
                return;
            }
            next(true, null);
        },
        checkSmsCaptcha: function checkSmsCaptcha(sms, next) {
            if (!sms || !sms.length) {
                next(false, 'SMSCAPTCHA_NULL');
                return;
            }

            if (sms.length !== 6) {
                next(false, 'SMSCAPTCHA_INVALID');
                return;
            }
            next(true, null);
        }
    };

    var ErrorMsg = {
        PASSWORD_NULL: '请填写密码,不能为空字符',
        PASSWORD_LENGTH: '密码由6-20位数字和字母组成，区分大小写，不能包含空字符',
        PASSWORD_AGAIN_NULL: '请填写密码确认',
        PASSWORD_AGAIN_INVALID: '两次输入的密码不一致',
        REPASSWORD_NULL: '请填写密码确认',
        REPASSWORD_INVALID: '两次输入的密码不一致',
        MOBILE_USED: '手机号码已被使用',
        MOBILE_CAPTCHA_NULL: '请填写手机短信验证码',
        MOBILE_CAPTCHA_INVALID: '验证码无效或已过期，请尝试重新发送',
        MOBILE_CAPTCHA_EXPIRED: '验证码过期，请尝试重新发送',
        AGREEMENT_NULL: '注册需先同意服务条款',
        CAPTCHA_NULL: '请填写验证码',
        CAPTCHA_INVALID: '验证码不正确',
        MOBILE_NULL: '请填写手机号码',
        MOBILE_INVALID: '请输入正确的手机号',
        LOGINNAME_EXISTS: '用户名已存在',
        LOGINNAME_STRICT: '2至15位中英文字符、数字或下划线',
        LOGINNAME_NULL: '请填写用户名',
        LOGINNAME_INVALID: '2至15位中英文字符、数字或下划线',
        LOGINNAME_SIZE: '2至15位中英文字符、数字或下划线',
        LOGINNAME_NOT_MOBILE: '用户名不能是手机号（注册后可以用手机号登录）',
        LOGINNAME_NOT_EMAIL: '用户名不能是邮箱',
        NAME_NULL: '请填写真实姓名',
        NAME_INVALID: '真实姓名错误，应为2-15位中文汉字',
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
        IDNUMBER_NULL: '身份证号不能为空'
    };

    var CountDown = function CountDown() {};

    CountDown.prototype = {
        getCountDownTime: function getCountDownTime(time, serverDate, next) {
            time = parseInt(time, 10);
            if (!time || time === null) {
                return;
            }

            var checkTime = function checkTime(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            };
            var leftTime = new Date(time) - new Date(serverDate);
            if (leftTime < 0) {
                return;
            }
            var dd = Math.floor(leftTime / 1000 / 60 / 60 / 24);
            leftTime -= dd * 1000 * 60 * 60 * 24;
            var hh = Math.floor(leftTime / 1000 / 60 / 60);
            leftTime -= hh * 1000 * 60 * 60;
            var mm = Math.floor(leftTime / 1000 / 60);
            leftTime -= mm * 1000 * 60;
            var ss = Math.floor(leftTime / 1000);

            // 倒计时完成后刷新页面
            if (hh === 0 && mm === 0 && ss === 0) {
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            }
            leftTime -= ss * 1000;
            dd = checkTime(dd);
            hh = checkTime(hh);
            mm = checkTime(mm);
            ss = checkTime(ss);
            var o = {
                day: dd,
                hour: parseInt(hh, 10) + (dd > 0 ? dd * 24 : 0),
                min: mm,
                sec: ss
            };
            if (next) {
                next(o);
            } else {
                return o;
            }
        },
        getCountDownTime2: function getCountDownTime2(time, serverDate, next) {
            time = parseInt(time, 10);
            if (!time || time === null) {
                return;
            }

            var checkTime = function checkTime(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            };
            var leftTime = new Date(time) - new Date(serverDate);
            if (leftTime < 0) {
                return;
            }
            var dd = Math.floor(leftTime / 1000 / 60 / 60 / 24);
            leftTime -= dd * 1000 * 60 * 60 * 24;
            var hh = Math.floor(leftTime / 1000 / 60 / 60);
            leftTime -= hh * 1000 * 60 * 60;
            var mm = Math.floor(leftTime / 1000 / 60);
            leftTime -= mm * 1000 * 60;
            var ss = Math.floor(leftTime / 1000);
            leftTime -= ss * 1000;
            //dd = checkTime(dd);
            hh = checkTime(hh);
            mm = checkTime(mm);
            ss = checkTime(ss);
            var o = {
                day: dd,
                hour: hh,
                min: mm,
                sec: ss
            };
            if (next) {
                next(o);
            } else {
                return o;
            }
        }
    };

    // 格式化duration
    var formateDuration = function formateDuration(dur) {
        var _month = 0;
        if (dur.days > 0) {
            if (typeof dur.totalDays === "undefined") {
                _month = dur.days + "天";
            } else {
                _month = dur.totalDays + "天";
            }
        } else {
            if (dur.years > 0) {
                _month += dur.years * 12;
            }
            if (dur.months > 0) {
                _month += dur.months;
            }
            _month = _month + "个月";
        }
        return _month;
    };

    // 格式化银行卡号
    var bankAccount = function bankAccount(str) {
        str = str.toString();
        str = str.trim();
        var result = '';
        if (str.length === 16) {
            result = str.substring(0, 4) + ' ' + '**** ****' + ' ' + str.substring(12);
        } else if (str.length === 19) {
            result = str.substring(0, 6) + ' ' + '*******' + ' ' + str.substring(13);
        } else {
            console.error('Bank account number ' + str + ' is invalid');
            result = str;
        }
        //return result.replace(/\s/g, '&nbsp;')
        return result;
    };

    // format amount
    var formatAmount = function formatAmount(s, n) {
        n = n > 0 && n <= 20 ? n : 0;
        if (s < 0) {
            var _s = 0;
            return _s.toFixed(n);
        }
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse();
        var r = s.split(".")[1];
        var t = "",
            i;
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? "," : "");
        }
        if (r) {
            return t.split("").reverse().join("") + "." + r; // 99.99
        } else {
                return t.split("").reverse().join("");
            }
    };

    // format percent
    var formatPercent = function formatPercent(percent, offset) {
        percent = percent.toString();
        if (offset === undefined || offset === null) {
            offset = 2;
        }
        if (percent.indexOf('.') === -1) {
            return percent;
        } else {
            if (offset === 0) {
                return percent.substring(0, percent.indexOf("."));
            } else {
                return percent.substring(0, percent.indexOf(".") + (offset + 1));
            }
        }
    };

    // format timeElapsed

    var timeElapsed = function timeElapsed(_timeElapsed, isobj) {
        if (_timeElapsed < 0) {
            return;
        }
        var s = ~ ~(_timeElapsed / 1000),
            m = 0,
            h = 0,
            d = 0;
        var result = '';

        if (s > 59) {
            m = ~ ~(s / 60);
            s = s % 60;
        }
        if (m > 59) {
            h = ~ ~(m / 60);
            m = m % 60;
        }
        if (h > 24) {
            d = ~ ~(h / 24);
            h = h % 24;
        }

        if (s < 0) {
            s = 0;
        }
        result = '' + s + '秒';
        if (m) {
            result = '' + m + '分' + result;
        }
        if (h) {
            result = '' + h + '小时' + result;
        }
        if (d) {
            result = '' + d + '天' + result;
        }
        return !isobj ? result : {
            day: d,
            hour: h,
            min: m,
            sec: parseInt(s)
        };
    };

    var ieCheck = function ieCheck() {
        var version = typeof navigator !== 'undefined' && navigator.appVersion && navigator.appVersion.match(/MSIE ([\d.]+)/);

        return version ? Number(version[1]) || 0 : 0;
    };

    var match = {
        mobile: function mobile(_mobile) {
            var req = /^[1][3|5|7|8][0-9]{9}$/;
            return !!_mobile.toString().match(req);
        },
        amount: function amount(_amount) {
            var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
            return exp.test(_amount);
        },
        email: function email(_email) {
            var exp = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
            return exp.test(_email);
        },
        // 6到20位数字字母密码
        password: function password(s) {
            return !!s.match(/[0-9a-zA-Z]{6,20}/);
        }
    };

    var tool = {
        jsonToParams: function jsonToParams(params) {
            var str = '';
            for (var key in params) {
                if (typeof params[key] === 'object') {
                    for (var i = 0; i < params[key].length; i++) {
                        str += '&' + key + '=' + params[key][i];
                    }
                } else {
                    if (params.hasOwnProperty(key)) {
                        str += '&' + key + '=' + params[key];
                    }
                }
            }
            return str;
        },
        setDate: function setDate(date) {
            var _date, y, m, d;
            _date = date.split("-");
            y = parseInt(_date[0]);
            m = parseInt(_date[1]);
            d = parseInt(_date[2]);
            if (m < 10) {
                m = '0' + m;
            }
            if (d < 10) {
                d = '0' + d;
            }
            return y + '-' + m + '-' + d;
        },

        loadScript: function loadScript(url, callback) {
            var _script = document.createElement("script");
            _script.setAttribute('type', 'text/javascript');
            _script.setAttribute('src', url);
            document.getElementsByTagName("head")[0].appendChild(_script);
            if (_script.readyState) {
                //IE
                _script.onreadystatechange = function () {
                    if (_script.readyState == "loaded" || _script.readyState == "complete") {
                        _script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                //非IE
                _script.onload = function () {
                    callback();
                };
            }
        }
    };

    // 暴露接口
    return {
        formValidator: new FormValidator(),
        errorMsg: ErrorMsg,
        countDown: new CountDown(),
        format: {
            amount: formatAmount,
            duration: formateDuration,
            percent: formatPercent,
            timeElapsed: timeElapsed
        },
        bankAccount: bankAccount,
        i18n: require('@ds/i18n')['zh-cn'].enums,
        ieCheck: ieCheck,
        match: match,
        tool: tool
    };
})();

},{"@ds/i18n":"/node_modules/@ds/i18n/index.js"}],"/ccc/global/js/main/header.js":[function(require,module,exports){
/**
 * @file 头部控件的交互逻辑层
 * @author huip(hui.peng@creditcloud.com)
 */
"use strict";

var accountService = require('ccc/account/js/main/service/account').accountService;

var utils = require('ccc/global/js/lib/utils');

$('.s__top15').mouseover(function () {
    $(this).next().css('display', '');
}).mouseout(function () {
    $(this).next().css('display', 'none');
});

if (CC.user) {

    accountService.getUserInfo(function (res) {
        if (!res.user) {
            res.user = {};
            res.user.name = '';
        }
        new Ractive({
            el: "#head-ractive-container",
            template: '<img src="/ccc/newAccount/img/user.png" style="position:relative;bottom:2px;"/>{{#if !name}}{{mobile}}{{else}}{{name}}{{/if}}',
            data: {
                name: res.user.name,
                loginName: CC.user.loginName,
                mobile: res.user.mobile
            }
        });
    });
    accountService.getNewMessageNum(function (res) {
        var messageRactive = new Ractive({
            el: '#head-message-container',
            template: '({{num}})',
            data: {
                num: res
            }
        });
    });
};

$(function () {
    utils.tool.loadScript('http://wpa.b.qq.com/cgi/wpa.php', function () {
        BizQQWPA.addCustom({ aty: '0', a: '0', nameAccount: 4001000099, selector: 'BizQQWPA1' });
        BizQQWPA.addCustom({ aty: '0', a: '0', nameAccount: 4001000099, selector: 'BizQQWPA2' });
    });
    var sideUp = $('#sideUp');
    window.onscroll = function () {
        var scrollTopOffset = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTopOffset >= 500) {
            //document.documentElement.clientWidth
            sideUp.show();
        } else {
            sideUp.hide();
        }
    };
});

//var Cal = require('ccc/global/js/modules/cccCalculator');
//$('#calculator-create').on('click', function () {
//    Cal.create();
//});
$(".back-top").click(function () {
    $('body,html').animate({ scrollTop: 0 }, 200);
    return false;
});

//导航状态
var path = window.location.pathname;

if (new RegExp("^/$").test(path)) {
    $(".u-nolist-ul li a#index").addClass("navactive");
} else if (new RegExp("^/invest").test(path)) {
    $(".u-nolist-ul li a#touzi").addClass("navactive");
} else if (new RegExp("^/applyloan").test(path)) {
    $(".u-nolist-ul li a#jiekuan").addClass("navactive");
} else if (new RegExp("^/newAccount/*").test(path)) {
    $(".u-nolist-ul li a#safety").addClass("navactive");
} else if (new RegExp("^/guide").test(path)) {
    $(".u-nolist-ul li a#help").addClass("navactive");
} else if (new RegExp("^/aboutus/*").test(path)) {
    $(".u-nolist-ul li a#aboutus").addClass("navactive");
}

var Cal = require('ccc/global/js/modules/cccCalculator');
$('.calculator-create').on('click', function () {
    Cal.create();
});

//导航移动在上面出现微信
//$('.erweima').hide();
$('.weixin-icon').mouseenter(function () {
    $('.erweima-act2').show();
}).mouseleave(function () {
    $('.erweima-act2').hide();
});

$('.weixin-icon').mouseenter(function () {
    $('.erweima-act').show();
}).mouseleave(function () {
    $('.erweima-act').hide();
});

//控股下拉菜单

$("#family").hover(function () {
    $(this).find("p").css("background", "url(/ccc/global/img/slideOn.png) no-repeat");
    $(this).find("ul").stop().slideDown();
}, function () {
    $(this).find("ul").stop().slideUp();
    $(this).find("p").css("background", "url(/ccc/global/img/slide.png) no-repeat");
});

},{"ccc/account/js/main/service/account":"/ccc/account/js/main/service/account.js","ccc/global/js/lib/utils":"/ccc/global/js/lib/utils.js","ccc/global/js/modules/cccCalculator":"/ccc/global/js/modules/cccCalculator.js"}],"/ccc/global/js/modules/cccBox.js":[function(require,module,exports){
'use strict';

var $ = require('jquery');

function Dialog(content, options) {
    Dialog.__zindex = 9000;
    Dialog.__count = 1;
    var defaults = {
        title: '',
        showTitle: true,
        // 是否显示标题栏。
        width: '500px',
        height: '200px',
        draggable: false,
        // 是否移动
        modal: true,
        // 是否是模态对话框
        center: true,
        // 是否居中。
        fixed: true,
        // 是否跟随页面滚动。
        time: 0,
        // 自动关闭时间，为0表示不会自动关闭。
        top: null,
        cla: '', // dialog wrap的扩展class
        id: false // 对话框的id，若为false，则由系统自动产生一个唯一id。
    };

    options = $.extend(defaults, options);
    options.title = options.title || '';
    options.time = options.time || 0;
    options.id = options.id ? options.id : 'dialog-' + Dialog.__count; // 唯一ID
    var overlayId = options.id + '-overlay'; // 遮罩层ID
    var timeId = null; // 自动关闭计时器
    var isShow = false;

    options.top = content.top || '20%';
    options.cla = content.cla || '';
    options.overlay = content.overlay || true;

    //var isIe = $.browser.msie;
    //var isIe6 = $.browser.msie && ('6.0' == $.browser.version);

    //var isIe = document.all && window.external;
    var isIe6 = false;
    var getWrap = function getWrap() {
        return {
            width: $(window).width() + $(document).scrollLeft(),
            height: $(document).height()
        };
    };
    /*
       var wrap = {
           width: $(window).width() + $(document).scrollLeft(),
           height: $(document).height()
       };
    */
    var wrap = getWrap();

    /* 对话框的布局及标题内容。*/
    options.title = content.title || "";
    var barHtml = !options.showTitle ? '' : '<div class="bar"><span class="title">' + (options.title === "" || options.title === false ? "" : options.title) + '</span><a class="close"></a></div>';
    var theDialog = $('<div id="' + options.id + '" class="dialog ccc-box-wrap ' + options.cla + '">' + barHtml + '<div class="Dcontent"></div></div>').hide();
    $('body').append(theDialog);

    /**
     * 重置对话框的位置。
     *
     * 主要是在需要居中的时候，每次加载完内容，都要重新定位
     *
     * @return void
     */
    this.resetPos = function () {
        /* 是否需要居中定位，必需在已经知道了dialog元素大小的情况下，才能正确居中，也就是要先设置dialog的内容。 */
        if (options.center) {
            var width = $(".Dcontent", theDialog).outerWidth();

            theDialog.css("width", width);

            var left = ($(window).width() - theDialog.width()) / 2;
            var top = ($(window).height() - theDialog.height()) / 2;
            if (top < 0) {
                top = 0;
            }

            if (!isIe6 && options.fixed) {
                theDialog.css({
                    top: options.top ? options.top : top,
                    left: left
                });
            } else {
                theDialog.css({
                    top: top + $(document).scrollTop(),
                    left: left + $(document).scrollLeft()
                });
            }
        }
    };

    /**
     * 初始化位置及一些事件函数。
     *
     * 其中的this表示Dialog对象而不是init函数。
     */
    var init = function init() {
        /* 是否需要初始化背景遮罩层 */

        if (options.modal) {
            $('body').append('<div id="' + overlayId + '" class="dialog-overlay ccc-box-overlay"></div>');
            $('#' + overlayId).css('width', wrap.width).css('height', wrap.height).css('z-index', ++Dialog.__zindex);
            $('#' + overlayId).css({
                'left': 0,
                'top': 0,
                'position': 'absolute'
            }).hide();
        }

        theDialog.css({
            'z-index': ++Dialog.__zindex,
            'position': options.fixed ? 'fixed' : 'absolute'
        });

        /*  IE6 兼容fixed代码 */
        if (isIe6 && options.fixed) {
            theDialog.css('position', 'absolute');
            // resetPos();
            $(window).scroll(function () {
                var dia = {
                    top: $(document).scrollTop() + $(window).height() / 2 - theDialog.height() / 2 + 'px',
                    left: $(document).scrollLeft() + $(window).width() / 2 - theDialog.outerWidth() / 2 + 'px'
                };
                theDialog.css({
                    'top': dia.top,
                    'left': dia.left
                });
            });
        }

        /* 以下代码处理框体是否可以移动 */
        var mouse = {
            x: 0,
            y: 0
        };

        function moveDialog(event) {
            var e = window.event || event;
            var top = parseInt(theDialog.css('top')) + (e.clientY - mouse.y);
            var left = parseInt(theDialog.css('left')) + (e.clientX - mouse.x);
            theDialog.css({
                top: top,
                left: left
            });
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }
        theDialog.find('.bar').mousedown(function (event) {
            if (!options.draggable) {
                return;
            }

            var e = window.event || event;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            $(document).bind('mousemove', moveDialog);
        });
        $(document).mouseup(function () {
            $(document).unbind('mousemove', moveDialog);
        });

        /* 绑定一些相关事件。 */
        theDialog.find('.close').bind('click', this.close);
        theDialog.bind('mousedown', function () {
            theDialog.css('z-index', ++Dialog.__zindex);
        });

        // 自动关闭
        if (0 !== options.time) {
            timeId = setTimeout(this.close, options.time);
        }
    };

    /**
     * 设置对话框的内容。
     *
     * @param string c 可以是HTML文本。
     * @return void
     */
    this.setContent = function (c) {
        if (c.time) {
            options.time = c.time;
        }
        var div = theDialog.find('.Dcontent');
        var width = c.width ? c.width : defaults.width,
            height = c.height ? c.height : defaults.height;

        if (c.alert) {
            c.value = '<div class="box-alert-wrap" style="padding-top:80px;">' + c.value + '</div>';
        }
        if (c.confirm) {
            c.value = '<div class="box-alert-wrap"><p>' + c.value + '</p>' + '<button class="btn btn-yes btn-long btn-close">确定</button><span></span>' + '<button class="btn btn-cancel btn-long btn-gray btn-close">取消</button></div>';
        }
        var that = this;
        if ('object' === typeof c) {
            c.type = c.type || "";
            switch (c.type.toLowerCase()) {
                case 'id':
                    // 将ID的内容复制过来，原来的还在。
                    div.append($('#' + c.value));
                    $('#' + c.value).css("display", "block");
                    break;
                case 'img':
                    div.html('加载中...');
                    $('<img alt="" />').load(function () {
                        div.empty().append($(this));
                        that.resetPos();
                    }).attr('src', c.value);
                    break;
                case 'url':
                    div.html('加载中...');
                    $.ajax({
                        url: c.value,
                        success: function success(html) {
                            div.html(html);
                            that.resetPos();
                        },
                        error: function error() {
                            div.html('出错啦');
                        }
                    });
                    break;
                case 'iframe':
                    div.append($('<iframe src="' + c.value + '" width=' + width + ' height=' + height + ' />'));
                    break;
                case 'text':
                    break;
                default:
                    !!width && div.width(width);!!height && div.height(height);

                    div.html(c.value);
                    break;
            }
        } else {
            div.html(c);
        }

        // 主动显示弹窗
        if (c.showed) {
            this.show(c.showed);
        }

        if (c.alert || c.confirm) {
            theDialog.find('.btn-close').bind('click', this.close);
        }
    };

    /**
     * 显示对话框
     */
    this.show = function (callback) {
        if (undefined !== options.beforeShow && !options.beforeShow()) {
            return;
        }

        /**
         * 获得某一元素的透明度。IE从滤境中获得。
         *
         * @return float
         */

        /* 是否显示背景遮罩层 */
        if (options.modal) {
            $('#' + overlayId).css("display", "block");
        }
        theDialog.css("display", "block");
        if (undefined !== options.afterShow) {
            options.afterShow();
        }
        isShow = true;
        // 自动关闭
        if (0 !== options.time) {
            timeId = setTimeout(this.close, options.time);
        }
        this.resetPos();

        // 设置overlay背景
        if (options.overlay) {
            $(".dialog-overlay").css("background", "#D3D3D3");
        }

        //回调
        if (callback) {
            var d = theDialog.find(".Dcontent");
            callback(d[0], this);
        }

        var that = this;

        $(window).keydown(function (e) {
            var tag = e.target.tagName.toLowerCase();
            if (!e.target) {
                return false;
            };
            if (tag === 'input' || tag === 'textarea') {} else {
                if (e.keyCode === 27) {
                    that.close();
                }
            }
        });
    };
    /*
     * 隐藏对话框。但并不取消窗口内容。
     */
    this.hide = function (callback) {
        if (!isShow) {
            return;
        }

        if (undefined !== options.beforeHide && !options.beforeHide()) {
            return;
        }

        theDialog.css('display', "none");
        if (undefined !== options.afterHide) {
            options.afterHide();
        }

        if (options.modal) {
            $('#' + overlayId).css('display', "none");
        }

        isShow = false;

        if (callback) {
            callback();
        }
    };

    /**
     * 关闭对话框
     *
     * @return void
     */
    this.close = function (e, real) {
        $("body").find(".dialog").remove();
        if (undefined !== options.beforeClose && !options.beforeClose()) {
            return;
        }
        if (!real) {
            theDialog.find(".Dcontent:eq(0)").appendTo("body").css("display", "none");
        }
        theDialog.remove();
        isShow = false;
        if (undefined !== options.afterClose) {
            options.afterClose();
        }

        if (options.modal) {
            $('#' + overlayId).css('display', "none").remove();
        }
        clearTimeout(timeId);
        $("body").find(".Dcontent").remove();
    };

    this.resetOverlay = function () {
        $('#' + overlayId).css({
            'width': $(window).width() + $(document).scrollLeft(),
            'height': $(document).height(),
            'left': 0,
            'top': 0
        });
    };

    init.call(this);
    this.setContent(content);

    Dialog.__count++;
    Dialog.__zindex++;
}
module.exports = Dialog;

},{"jquery":"/jquery"}],"/ccc/global/js/modules/cccCalculator.js":[function(require,module,exports){
'use strict';

/**
 * 收益计算器 (cccCalculator)
 *
 * <link rel="stylesheet" href="/assets/css/modules/cccCalculator.css">
 * var Cal = require('assets/js/modules/cccCalculator');
 * Cal.create();
 */
var utils = require('ccc/global/js/lib/utils');
var tpl = {
    wrap: require('ccc/global/partials/modules/cccCalculator.html'),
    list: '{{#each list}}\
			<div class="clearfix backgr-f tdContent">\
				<div class="ccc-f tdCell backgr-f">{{dueDate}}</div>\
				<div class="tdCell backgr-f">{{amount}}</div>\
				<div class="tdCell backgr-f">{{amountPrincipal}}</div>\
				<div class="tdCell backgr-f">{{amountInterest}}</div>\
				<div class="ccc-l tdCell backgr-f">{{amountOutstanding}}</div>\
			</div>\
		{{/each}}'
};

var Dialog = require("ccc/global/js/modules/cccBox");

// 缓存部分数据
window.CC_CACHE = {};

var reg = /^([1-9][\d]{0,7}|0)$/;
var reg1 = /^([1-9][\d]{0,1}|0)(\.[\d]{1,8})?$/;

module.exports.create = function (p) {
    p = p || {};
    var defaults = {
        title: p.title || '收益计算器',
        tpl: p.tpl || tpl.wrap,
        width: 850,
        height: 400,
        top: '20%',
        callback: function callback() {}
    };

    $.extend(defaults, p);
    var o = defaults;

    // get data
    var renderPurpose = function renderPurpose() {
        //var P = T('zh-cn').enums.RepaymentMethod;
        var _option = '';

        $.each(utils.i18n.RepaymentMethod, function (k, v) {
            _option += '<option value="' + k + '">' + v[0] + '</option>';
        });

        //过滤还款方式
        return '<option value="EqualInstallment">按月等额本息</option>\
				<option value="EqualPrincipal">按月等额本金</option>\
				<option value="MonthlyInterest">按月付息到期还本</option>\
				<option value="BulletRepayment">一次性还本付息</option>';
    };

    if (!CC_CACHE.options) {
        CC_CACHE.options = renderPurpose();
    }

    new Dialog({
        title: o.title,
        value: o.tpl,
        width: o.width,
        height: o.height,
        top: o.top,
        showed: function showed(ele, box) {
            // set list tpl
            //tpl.list = $(ele).find('.ccc-calculator-tpl-list').html();

            var date_cal = new Date();
            var date_cal1 = new Date(date_cal);
            date_cal1.setDate(date_cal.getDate() + 3);
            var last_date = date_cal1.getFullYear() + '-' + (date_cal1.getMonth() + 1) + '-' + date_cal1.getDate();

            // render options
            $(ele).find('select[name=paymentMethod]').html(CC_CACHE.options);
            $(ele).find('form[name=ccCalculatorForm]').submit(function (e) {
                if (e && e.preventDefault) {
                    e.preventDefault();
                } else {
                    window.event.returnValue = false;
                }
                var $this = $(this);
                var datas = $this.serializeArray();
                var nc = function nc(msg) {
                    $(ele).find('#cc-cal-list-wp').html('<p>' + msg + '</p>');
                };

                for (var i = 0; i < datas.length; i++) {
                    if (datas[i].name === 'paymentMethod') {
                        continue;
                    }
                    var calValue = datas[i].value;
                    var isLegal = reg.test(calValue);
                    var tex = $(ele).find('[name=' + datas[i].name + ']').parent().prev().text();
                    if (calValue === '') {
                        $(ele).find('[name=' + datas[i].name + ']').addClass('nc').focus();
                        nc('请输入' + tex);
                        return;
                    } else if (!isLegal && datas[i].name !== 'annualRate') {
                        $(ele).find('[name=' + datas[i].name + ']').addClass('nc').focus();
                        if (datas[i].name === 'amountValue' && calValue > 99999999) {
                            nc(tex + '不能超过8位数字');
                        } else {
                            nc(tex + '必须为整数');
                        }
                        return;
                    } else if (datas[i].name === 'annualRate' && !reg1.test(calValue)) {
                        $(ele).find('[name=' + datas[i].name + ']').addClass('nc').focus();
                        nc(tex + '必须为小于100的数字');
                        return;
                    } else {
                        $(ele).find('[name=' + datas[i].name + ']').removeClass('nc');
                    }
                }

                var $postBtn = $(ele).find('.btn-cal');
                $postBtn.addClass('disabled').text('计算中…');

                var url = '/api/v2/loan/request/analyse';
                $.post(url, datas, function (res) {
                    if (res.success) {
                        $postBtn.removeClass('disabled').text('计算收益');
                        $(ele).find('.Tamount').text(res.data.interest + res.data.principal);
                        $(ele).find('.Famount').html('￥' + utils.format.amount(res.data.interest + res.data.principal, 2) + '<span style="padding-left:20px;">假设起息日为' + last_date + '</span>');
                        $(ele).find('.TamountPrincipal').text(res.data.principal);
                        $(ele).find('.TamountInterest').text(res.data.interest);
                        $(ele).find('.cc-talbe-total').removeClass('hide');
                        //$(ele).find('.Frate').text(datas[2].value+'%');

                        new Ractive({
                            el: $(ele).find('#cc-cal-list-wp'),
                            template: tpl.list,
                            data: {
                                list: res.data.repayments
                            }
                        });
                    } else {
                        nc('请求出错~');
                    }
                }).error(function () {
                    $postBtn.removeClass('disabled').text('计算收益');
                    nc('请求出错~');
                });
            });
            o.callback(ele, box);
        }
    });
};

},{"ccc/global/js/lib/utils":"/ccc/global/js/lib/utils.js","ccc/global/js/modules/cccBox":"/ccc/global/js/modules/cccBox.js","ccc/global/partials/modules/cccCalculator.html":"/ccc/global/partials/modules/cccCalculator.html"}],"/ccc/global/partials/modules/cccCalculator.html":[function(require,module,exports){
module.exports = '<link rel="stylesheet" href="/ccc/global/css/modules/cccCalculator.css">\n<div class="cc-calculator-wp">\n    <div class="calculator-title">\n        <p class="calculator-title-left">收益计算器</p>\n        <div class="calculator-line">\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-md-4" style="width:33%;float:left;">\n            <form name="ccCalculatorForm" class="form-horizontal" role="form">\n                <div class="form-group">\n                    <label for="cc-cal-f2" class="col-sm-4 control-label">投资金额</label>\n                    <div class="col-sm-8" style="float:right;margin-top:-30px;">\n                        <input type="text" class="form-control" id="cc-cal-f2" name="amountValue" value="" placeholder="您的投资金额">\n                        <span>元</span>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="cc-cal-f3" class="col-sm-4 control-label" placeholder="">投资期限</label>\n                    <div class="col-sm-8" style="float:right;margin-top:-30px;">\n                        <input type="text" class="form-control" id="cc-cal-f3" name="dueMonth" value="" placeholder="期望时间长度">\n                        <span>月</span>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="cc-cal-f4" class="col-sm-4 control-label">年化利率</label>\n                    <div class="col-sm-8" style="float:right;margin-top:-30px;">\n                        <input type="text" class="form-control" id="cc-cal-f4" name="annualRate" value="" placeholder="年化利率">\n                        <span>%</span>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="cc-cal-f5" class="col-sm-4 control-label">还款方式</label>\n                    <div class="col-sm-8" style="float:right;margin-top:-30px;">\n                        <select class="form-control" name="paymentMethod" id="cc-cal-f5">\n                            <option value="">loading...</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="col-sm-offset-4 col-sm-8">\n                        <button type="submit" class="btn btn-orange btn-cal">计算收益</button>\n                        <button type="reset" class="reset">重置</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n        <div class="col-md-8" style="width:64%;float:left;">\n            <div class="cc-cal-results-box">\n                <div class="cc-res table table-bordered1 tdContent">\n                    <div class="ccc-f tdCell">收款日期</div>\n                    <div class="tdCell">收款金额</div>\n                    <div class="tdCell">收回本金</div>\n                    <div class="tdCell">收回利息</div>\n                    <div class="ccc-l tdCell">剩余本金</div>\n                </div>\n                <div class="cc-res cc-table-container">\n                    <div class="table_wrap">\n                        <div class="table table-bordered table-hover">\n                            <div id="cc-cal-list-wp">\n\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="cc-res table-bordered1 cc-talbe-total hide">\n                    <div id="cc-cal-total table-bordered1 tdContent">\n                        <div class="cc-total-tr clearfix cc-total-tr-b">\n                            <div class="ccc-f tdCell">总计</div>\n                            <div class="Tamount tdCell"></div>\n                            <div class="TamountPrincipal tdCell"></div>\n                            <div class="TamountInterest tdCell"></div>\n                            <div class="ccc-l TamountOutstanding tdCell"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="cc-total">\n                <span>本息合计：<em class="Famount"></em></span>\n            </div>\n        </div>\n    </div>\n</div>';
},{}],"/node_modules/@ds/i18n/index.js":[function(require,module,exports){
module.exports = {
  'zh-cn': require('./zh-cn')
}

},{"./zh-cn":"/node_modules/@ds/i18n/zh-cn.json"}],"/node_modules/@ds/i18n/zh-cn.json":[function(require,module,exports){
module.exports={
  "enums": {
    "FundRecordType": {
      "INVEST": "投标",
      "WITHDRAW": "取现",
      "DEPOSIT": "充值",
      "LOAN": "放款",
      "LOAN_REPAY": "贷款还款",
      "DISBURSE": "垫付还款",
      "INVEST_REPAY": "投资还款",
      "CREDIT_ASSIGN": "债权转让",
      "TRANSFER": "转账扣款",
      "REWARD_REGISTER": "注册奖励",
      "REWARD_INVEST": "投标奖励",
      "REWARD_DEPOSIT": "充值奖励",
      "FEE_WITHDRAW": "提现手续费",
      "FEE_AUTHENTICATE": "身份验证手续费",
      "FEE_INVEST_INTEREST": "回款利息管理费",
      "FEE_LOAN_SERVICE": "借款服务费",
      "FEE_LOAN_MANAGE": "借款管理费",
      "FEE_LOAN_INTEREST": "还款利息管理费",
      "FEE_LOAN_VISIT": "实地考察费",
      "FEE_LOAN_GUARANTEE": "担保费",
      "FEE_LOAN_RISK": "风险管理费",
      "FEE_LOAN_OVERDUE": "逾期管理费",
      "FEE_LOAN_PENALTY": "逾期罚息(给商户)",
      "FEE_LOAN_PENALTY_INVEST": "逾期罚息(给投资人)",
      "FEE_DEPOSIT": "充值手续费",
      "FEE_ADVANCE_REPAY": "提前还款违约金(给商户)",
      "FEE_ADVANCE_REPAY_INVEST": "提前还款违约金(给投资人)",
      "FSS": "生利宝"
    },
    "FundRecordOperation": {
      "FREEZE": "冻结",
      "RELEASE": "解冻",
      "IN": "资金转入",
      "OUT": "资金转出"
    },
    "FundRecordStatus": {
      "INITIALIZED": "初始",
      "PROCESSING": "处理中",
      "AUDITING": "审核中",
      "SUCCESSFUL": "成功",
      "FAILED": "失败",
      "REJECTED": "拒绝",
      "CANCELED": "取消"
    },
    "MaritalStatus": {
      "MARRIED": "已婚",
      "SINGLE": "未婚",
      "DIVORCED": "离异",
      "WIDOWED": "丧偶"
    },
    "EducationLevel": {
      "HIGHSCHOOL": "高中及以下",
      "TECHNICALSCHOOL": "中专",
      "JUNIORCOLLEGE": "大专",
      "UNDERGRADUATE": "本科",
      "MASTER": "硕士",
      "DOCTOR": "博士"
    },
    "CareerStatus": {
      "EMPLOYEE": "普通员工",
      "MANAGER": "管理人员",
      "SHAREHOLDER": "股东",
      "PRIVATE_ENTREPRENEUR": "私营企业主",
      "OTHER": "其他"
    },
    "CompanyType": {
      "GOVERNMENT_OFFICES": "国家及地方政府行政机构",
      "PUBLIC_INSTITUTION": "事业单位",
      "EDUCATION_RESEARCH_INSTITUTION": "学校及科研机构",
      "STATEOWNED_KEY_ENTERPRISES": "央企(包括下级单位)",
      "STATEOWNED_ENTERPRISES": "一般国企(包括下级单位)",
      "OVERSEAS_FUNDED_ENTERPRISES": "外资企业",
      "TAIWAN_HONGKONG_MACAU": "台港澳企业",
      "JOINT_VENTURE": "合资企业",
      "PRIVATE_ENTERPRISES": "民营企业",
      "SELF_EMPLOYED": "个体经营",
      "OTHER": "其他"
    },
    "CompanyIndustry": {
      "EXCAVATE": "采掘业",
      "GEO_SURVEY": "地质勘查业",
      "RESEARCH": "科学研究/技术服务",
      "IRRIGATION_ENVIRONMENT": "水利/环境/公共设施管理",
      "RENTAL": "租赁/商务服务",
      "MILITARY": "军队/武警",
      "INTERNATIONAL": "国际组织",
      "MANUFACTURE": "制造业",
      "IT": "电信/通信/计算机/软件/互联网",
      "GOVERNMENT": "国家机关/政党机关/社会团体",
      "MEDIA_ADVERTISEMENT": "媒体/广告/广播/电影/电视",
      "RETAIL_WHOLESALE": "零售/批发",
      "EDUCATION_TRAINING": "教育/培训 ",
      "PUBLIC_SERVICES": "社会服务业",
      "FINANCE_LAW": "金融/保险/法律",
      "TRANSPORTATION": "交通运输/仓储/邮政",
      "REAL_ESTATE": "房地产业",
      "ENERGY": "水/电/煤/气/能源生产供应",
      "CATERING_HOTEL": "住宿/餐饮",
      "MEDICAL_HEALTH_CARE": "医疗/卫生/保健",
      "CONSTRUCTION_ENGINERRING": "建筑/工程",
      "AGRICULTURE": "农/林/牧/渔",
      "ENTERTAIMENT": "文化/娱乐服务业",
      "SPORT_ART": "体育/艺术",
      "UTILITY": "社会福利/公益事业",
      "OTHER": "其他"
    },
    "CompanySize": {
      "SIZE_BELOW_10": "10人以下",
      "SIZE_11_100": "11﹣100人",
      "SIZE_101_500": "101﹣500人",
      "SIZE_501_2000": "501-2000人",
      "SIZE_2001_10000": "2001-10000人",
      "SIZE_10001_100000": "10000人以上"
    },
    "MonthlySalary": {
      "SALARY_BELOW_2000": "2000以下",
      "SALARY_2001_50000": "2001﹣5000",
      "SALARY_5001_10000": "5001﹣10000",
      "SALARY_10001_20000": "10001﹣20000",
      "SALARY_20001_50000": "20001﹣50000",
      "SALARY_ABOVE_50001": "50001以上"
    },
    "YearOfService": {
      "YEAR_BELOW_1": "1年以下",
      "YEAR_1_3": "1-3年(含)",
      "YEAR_3_5": "3-5年(含)",
      "YEAR_5_10": "5-10年(含)",
      "YEAR_10_20": "10-20年(含)",
      "YEAR_ABOVE_20": "20年以上"
    },
    "EthnicGroup": {
      "Han": "汉族",
      "Zhuang": "壮族",
      "Manchu": "满族",
      "Hui": "回族",
      "Miao": "苗族",
      "Uighur": "维吾尔族",
      "Yi": "彝族",
      "Tujia": "土家族",
      "Mongol": "蒙古族",
      "Tibetan": "藏族",
      "Buyi": "布依族",
      "Dong": "侗族",
      "Yao": "瑶族",
      "Korean": "朝鲜族",
      "Bai": "白族",
      "Hani": "哈尼族",
      "Li": "黎族",
      "Kazakh": "哈萨克族",
      "Dai": "傣族",
      "She": "畲族",
      "Lisu": "僳僳族",
      "Gelao": "仡佬族",
      "Lahu": "拉祜族",
      "Dongxiang": "东乡族",
      "Wa": "佤族",
      "Shui": "水族",
      "Naxi": "纳西族",
      "Qiang": "羌族",
      "Du": "土族",
      "Xibe": "锡伯族",
      "Mulam": "仫佬族",
      "Kirghiz": "柯尔克孜族",
      "Daur": "达斡尔族",
      "Jingpo": "景颇族",
      "Salar": "撒拉族",
      "Blang": "布朗族",
      "Maonan": "毛南族",
      "Tajik": "塔吉克族",
      "Pumi": "普米族",
      "Achang": "阿昌族",
      "Nu": "怒族",
      "Evenki": "鄂温克族",
      "Gin": "京族",
      "Jino": "基诺族",
      "Deang": "德昂族",
      "Uzbek": "乌孜别克族",
      "Russian": "俄罗斯族",
      "Yugur": "裕固族",
      "Bonan": "保安族",
      "Menba": "门巴族",
      "Oroqin": "鄂伦春族",
      "Drung": "独龙族",
      "Tatar": "塔塔尔族",
      "Hezhen": "赫哲族",
      "Lhoba": "珞巴族",
      "Gaoshan": "高山族"
    },
    "MaritalStatus": {
      "MARRIED": "已婚",
      "SINGLE": "未婚",
      "DIVORCED": "离异",
      "WIDOWED": "丧偶"
    },
    "CertificateType": {
      "ID": "身份认证",
      "CREDITREPORT": "信用报告",
      "FAMILY": "家庭情况认证",
      "EDUCATION": "学历认证",
      "INCOME": "收入认证",
      "CAREER": "工作认证",
      "REALESTATE": "房产认证",
      "LOCATION": "居住地认证",
      "VEHICLE": "购车认证",
      "LOANPURPOSE": "借款用途认证",
      "GUARANTEE": "担保认证",
      "OTHERS": "其他认证"
    },
    "CertificateStatus": {
      "UNCHECKED": "未审核",
      "CHECKED": "审核通过",
      "DENIED": "审核未通过",
      "ARCHIVED": "已存档",
      "DELETED": "已刪除"
    },
    "ProofType": {
      "ID_CARD": ["身份证", "ID"],
      "ID_HUKOU": ["户口本", "ID"],
      "ID_SOCIAL_SECURITY": ["社保", "ID"],
      "ID_DRIVE_LICENCE": ["驾照", "ID"],
      "ID_MARITAL": ["结婚证", "ID"],
      "ID_DIVORSE": ["离婚证", "ID"],
      "ID_VIDEO": ["本人视频", "ID"],
      "ID_OTHER": ["其他个人身份证明", "ID"],
      "CAREER_LABOUR_CONTRACT": ["劳动合同", "CAREER"],
      "CAREER_LABOUR_CERTIFICATE": ["技术职称及技能认证", "CAREER"],
      "CAREER_BUSINESS_LICENCE": ["营业执照", "CAREER"],
      "CAREER_TAX_REGISTRATION": ["税务登记证", "CAREER"],
      "CAREER_ORGANIZATION_REGISTRATION": ["组织机构代码证", "CAREER"],
      "CAREER_SANITARY_LICENCE": ["卫生许可证", "CAREER"],
      "CAREER_BUSINESS_CONTRACT": ["经营相关合同及合作协议", "CAREER"],
      "CAREER_BUSINESS_CERTIFICATE": ["经营相关许可证", "CAREER"],
      "CAREER_BUSINESS_PLACE": ["经营或施工场所", "CAREER"],
      "CAREER_CORP_COVER": ["企业大图", "CAREER"],
      "CAREER_CORP_LOGO": ["企业Logo", "CAREER"],
      "CAREER_CORP_ICON": ["企业Icon", "CAREER"],
      "CAREER_CORP_COMMITMENT_LETTER": ["企业承诺函", "CAREER"],
      "CAREER_OTHER": ["其他工作相关证明", "CAREER"],
      "INCOME_BANKACCOUNT": ["银行流水", "INCOME"],
      "INCOME_SALARY": ["工资证明", "INCOME"],
      "INCOME_OTHER": ["其他收入证明", "INCOME"],
      "RE_HOUSE_PROPERTY": ["住房权证或合同", "REALESTATE"],
      "RE_HOUSE_PICTURE": ["住房照片", "REALESTATE"],
      "RE_LAND_PROPERTY": ["土地权证或合同", "REALESTATE"],
      "RE_LAND_PICTURE": ["土地照片", "REALESTATE"],
      "RE_FACTORY_PROPERTY": ["厂房仓库权证或合同", "REALESTATE"],
      "RE_FACTORY_PICTURE": ["厂房仓库照片", "REALESTATE"],
      "RF_OTHER": ["其他房产相关证明", "REALESTATE"],
      "VEHICLE_LICENCE": ["行驶证", "VEHICLE"],
      "VEHICLE_PROPERTY": ["车辆权证或合同发票", "VEHICLE"],
      "VEHICLE_PLATE": ["车牌号", "VEHICLE"],
      "VEHICLE_PICTURE": ["车辆照片", "VEHICLE"],
      "VEHICLE_OTHER": ["其他车辆相关证明", "VEHICLE"],
      "GUARANTEE_ID": ["借款担保人身份", "GUARANTEE"],
      "GUARANTEE_REALESTATE": ["借款担保人房产", "GUARANTEE"],
      "GUARANTEE_CONTRACT": ["借款担保合同或文件", "GUARANTEE"],
      "GUARANTEE_OTHER": ["其他借款担保相关证明", "GUARANTEE"],
      "FACTORING_HISTORY": ["历史交易", "FACTORING"],
      "FACTORING_PROJECT": ["保理项目", "FACTORING"],
      "FACTORING_ANTI": ["反保理措施", "FACTORING"],
      "FACTORING_FINANCE_CORP": ["融资企业", "FACTORING"],
      "CREDITREPORT": ["信用报告", "CREDITREPORT"],
      "LOANPURPOSE": ["贷款用途", "LOANPURPOSE"],
      "FAMILY": ["家庭情况", "FAMILY"],
      "EDUCATION": ["学历", "EDUCATION"],
      "LOCATION": ["居住地", "LOCATION"],
      "OTHER_SINA_WEIBO": ["新浪微博", "OTHERS"],
      "OTHER_TECENT_WEIBO": ["腾讯微博", "OTHERS"],
      "OTHER_QQ": ["腾讯QQ", "OTHERS"],
      "FUNDINGPROJECT_BANNER": ["首屏图片", "CROWDFUNDING"],
      "FUNDINGPROJECT_PRE": ["预热图片", "CROWDFUNDING"],
      "FUNDINGPROJECT_PROJECT": ["项目图片", "CROWDFUNDING"],
      "FUNDINGPROJECT_MOBILE": ["移动端图片", "CROWDFUNDING"],
      "INVESTMENT_FUND_OVERVIEW": ["基金概况", "INVESTMENTFUND"],
      "INVESTMENT_FUND_CHART": ["基金图表", "INVESTMENTFUND"],
      "INVESTMENT_FUND_ASSET_MANAGE": ["资产管理", "INVESTMENTFUND"],
      "INVESTMENT_FUND_FEES_LEVEL": ["费率水平", "INVESTMENTFUND"],
      "INSURANCE_OVERVIEW": ["保险概况", "INSURANCE"],
      "INSURANCE_CHART": ["投资方向及资产配置", "INSURANCE"],
      "INSURANCE_CASE_DEMO": ["案例演示", "INSURANCE"],
      "ORDER_ID_CARD_FRONT": ["身份证正面", "ORDER_DATA"],
      "ORDER_ID_CARD_BACK": ["身份证反面", "ORDER_DATA"],
      "ORDER_BANK_ACCOUNT_FRONT": ["银行卡正面", "ORDER_DATA"],
      "ORDER_PAID_DATA": ["打款凭证", "ORDER_DATA"],
      "ORDER_CONTRACT": ["订单合同", "ORDER_DATA"],
      "WEALTHPRODUCT_OVERVIEW": ["理财产品概况", "WEALTHPRODUCT"],
      "WEALTHPRODUCT_REPORT": ["理财产品管理报告", "WEALTHPRODUCT"]
    },
    "Bank": {
      "ICBC": "中国工商银行",
      "ABC": "中国农业银行",
      "CMB": "招商银行",
      "CCB": "建设银行",
      "BCCB": "北京银行",
      "BJRCB": "北京农村商业银行",
      "BOC": "中国银行",
      "BOCOM": "交通银行",
      "CMBC": "民生银行",
      "BOS": "上海银行",
      "CBHB": "渤海银行",
      "CEB": "光大银行",
      "CIB": "兴业银行",
      "CITIC": "中信银行",
      "CZB": "浙商银行",
      "GDB": "广发银行",
      "HKBEA": "东亚银行",
      "HXB": "华夏银行",
      "HZCB": "杭州银行",
      "NJCB": "南京银行",
      "PINGAN": "平安银行",
      "PSBC": "邮政储蓄银行",
      "SDB": "深发银行",
      "SPDB": "浦发银行",
      "SRCB": "上海农村商业银行"
    },
    "CreditRank": {
      "HR": "99-0",
      "E": "109-100",
      "D": "119-110",
      "C": "129-120",
      "B": "144-130",
      "A": "159-145",
      "AA": "160及以上"
    },
    "LoanPurpose": {
      "SHORTTERM": "短期周转",
      "PERSONAL": "个人消费",
      "INVESTMENT": "投资创业",
      "CAR": "车辆融资",
      "HOUSE": "房产融资",
      "CORPORATION": "企业融资",
      "OTHER": "其它借款"
    },
    "RepaymentMethod": {
      "MonthlyInterest": ["按月付息到期还本", "还款压力小"],
      "EqualInstallment": ["按月等额本息", "还款便捷"],
      "EqualPrincipal": ["按月等额本金", "总利息最低"],
      "BulletRepayment": ["一次性还本付息", "短期首选"],
      "EqualInterest": ["月平息", "实际利率最高"],
      "YearlyInterest": ["按年付息到期还本", "还款压力小"]
    },
	"RepaymentStatus": {
      "UNDUE": "未到期",
      "OVERDUE": "逾期",
      "BREACH": "违约",
      "REPAYED": "已还清"
    },
    "LoanStatus": {
      "UNASSIGNED": "未处理",
      "INITIATED": "初始",
      "SCHEDULED": "已安排",
      "OPENED": "开放投标",
      "FAILED": "流标",
      "FINISHED": "已满标",
      "CANCELED": "已取消",
      "SETTLED": "已结算",
      "CLEARED": "已还清",
      "OVERDUE": "逾期",
      "BREACH": "违约",
      "ARCHIVED": "已存档"
    },
    "BidMethod": {
      "AUTO": "自动投标",
      "MANUAL": "手动投标",
      "WEALTHPRODUCT": "理财产品"
    },
    "MortgageType": {
      "RE_HOUSE": "房产",
      "RE_LAND": "土地(包括山林渔牧)",
      "RE_FACTORY": "厂房库房",
      "COMMONDITY": "商品库存",
      "VEHICLE": "车辆",
      "EQUIPMENT": "设备器材",
      "SECURITIES": "证券",
      "BOND": "债券",
      "STOCK": "股票",
      "DEPOSIT_RECEIPT": "银行存单",
      "OTHER": "其他"
    },
    "LoanRequestStatus": {
      "UNASSIGNED": "未处理",
      "ASSIGNED": "处理中",
      "CANCELED": "已取消",
      "PENDING_VISIT": "实地征信",
      "PENDING_RISK": "风控审核",
      "PENDING_APPORVE": "待批准",
      "APPROVED": "已批准",
      "REJECTED": "已驳回",
      "PUBLISHED": "已发放",
      "ARCHIVED": "已存档",
      "DELETED": "已刪除"
    },
    "HukouType": {
      "AGRICULTURE": "农业户口",
      "URBAN": "城镇户口"
    },
    "HouseStatus": {
      "COMMERCIAL_LOAN": "商业贷款",
      "HAF_LOAN": "公积金贷款",
      "COMPOSITE_LOAN": "组合贷款",
      "SELF_OWNED": "自有住房",
      "RENT": "租房",
      "OTHER": "其他"
    },
    "InvestStatus": {
      "PROPOSED": "申请投标",
      "FROZEN": "账户资金冻结",
      "FROZEN_FAILED": "资金冻结失败",
      "FAILED": "流标",
      "FINISHED": "投标成功",
      "CANCELED": "已取消",
      "SETTLED": "已结算",
      "CLEARED": "还款完成",
      "OVERDUE": "逾期",
      "BREACH": "违约"
    }
  }
}

},{}]},{},["/ccc/global/js/main/header.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvemZjbS93b3JrL3Byb2plY3QtenFqci10bXAvd2ViL2NjYy9hY2NvdW50L2pzL21haW4vc2VydmljZS9hY2NvdW50LmpzIiwiL1VzZXJzL3pmY20vd29yay9wcm9qZWN0LXpxanItdG1wL3dlYi9jY2MvZ2xvYmFsL2pzL2xpYi91dGlscy5qcyIsIi9Vc2Vycy96ZmNtL3dvcmsvcHJvamVjdC16cWpyLXRtcC93ZWIvY2NjL2dsb2JhbC9qcy9tYWluL2hlYWRlci5qcyIsIi9Vc2Vycy96ZmNtL3dvcmsvcHJvamVjdC16cWpyLXRtcC93ZWIvY2NjL2dsb2JhbC9qcy9tb2R1bGVzL2NjY0JveC5qcyIsIi9Vc2Vycy96ZmNtL3dvcmsvcHJvamVjdC16cWpyLXRtcC93ZWIvY2NjL2dsb2JhbC9qcy9tb2R1bGVzL2NjY0NhbGN1bGF0b3IuanMiLCIvLS9jY2MvZ2xvYmFsL3BhcnRpYWxzL21vZHVsZXMvY2NjQ2FsY3VsYXRvci5odG1sIiwiLy0vbm9kZV9tb2R1bGVzL0Bkcy9pMThuL2luZGV4LmpzIiwiLy0vbm9kZV9tb2R1bGVzL0Bkcy9pMThuL3poLWNuLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0tBLFlBQVksQ0FBQzs7QUFFYixPQUFPLENBQUMsY0FBYyxHQUFHO0FBQ3JCLGlCQUFhLEVBQUUsdUJBQVUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNqQyxlQUFPLENBQUMsTUFBTSxFQUFFLGtDQUFrQyxDQUFDLENBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDWixJQUFJLENBQUMsSUFBSSxDQUFDLENBQ1YsR0FBRyxFQUFFLENBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ2YsZ0JBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEIsQ0FBQyxDQUFDO0tBQ1Y7QUFDRCxnQkFBWSxFQUFFLHNCQUFTLGFBQWEsRUFB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RUFBRSx1QkFBVSxRQUFRLEVBQUUsSUFBSSxFQUFFO0FBQ3JDLG9CQUFRLEdBQUcsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFBLENBQUUsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNyRCxnQkFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24obil7XCJ1c2Ugc3RyaWN0XCI7aWYobi5CQ1AmJlwiZnVuY3Rpb25cIj09PXR5cGVvZiBuLkJDUC5wcmVsdWRlKXJldHVybiBuLkJDUC5wcmVsdWRlO3ZhciBlPW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxuLnNldEltbWVkaWF0ZXx8ZnVuY3Rpb24obil7cmV0dXJuIHNldFRpbWVvdXQobiwxKX07dGhpcy5RQVM9ZnVuY3Rpb24obil7dmFyIGU9bi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fG4uc2V0SW1tZWRpYXRlfHxmdW5jdGlvbihuKXtyZXR1cm4gc2V0VGltZW91dChuLDEpfTt2YXIgcj1bXS5jb25jYXQobi5fcWFzX3F1ZXVlfHxbXSk7aWYobi5fcWFzX3F1ZXVlKWRlbGV0ZSBuLl9xYXNfcXVldWU7dmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlO3ZhciB1PWZ1bmN0aW9uKG4pe3ZhciBlPXQuY2FsbChhcmd1bWVudHMsMSk7aWYodS5sb2FkZWQpbyhuLGUpO2Vsc2Ugci5wdXNoKFtuLGVdKTtyZXR1cm4gdX07dS5zeW5jPWZ1bmN0aW9uKG4pe24uc3luYz10cnVlO3JldHVybiB1LmFwcGx5KG51bGwsYXJndW1lbnRzKX07dS5yZWFkeT1pO3Uuc3luYy5yZWFkeT1pO2Z1bmN0aW9uIGkoKXt1LmxvYWRlZD10cnVlO3ZhciBuO3doaWxlKG49ci5zaGlmdCgpKXtvKG5bMF0sblsxXSl9fWZ1bmN0aW9uIG8ocix0KXtpZih0eXBlb2YgciE9XCJmdW5jdGlvblwiKXJldHVybjtyLnN5bmM/ci5hcHBseShuLHQpOmUoZnVuY3Rpb24oKXtyLmFwcGx5KG4sdCl9KX1yZXR1cm4gdX0odGhpcyk7dmFyIHI9bi5CQ1A9dDtmdW5jdGlvbiB0KG4pe1FBUyhuLGwoW10pKX10LnN5bmM9ZnVuY3Rpb24obil7UUFTLnN5bmMobixsKFtdKSl9O3IucHJlbHVkZT1jO3IubWVyZ2VNb2R1bGVzPWE7dmFyIHU9MDt2YXIgaT1yLmNhY2hlPXt9O3ZhciBvPXIubW9kdWxlcz17fTtyZXR1cm4gYztmdW5jdGlvbiBhKG4pe249bnx8e307Zm9yKHZhciBlIGluIG4pe2lmKHR5cGVvZiBlIT09XCJudW1iZXJcIiYmbi5oYXNPd25Qcm9wZXJ0eShlKSl7aWYoIShlIGluIG8pKXtvW2VdPW5bZV07aWYoZVswXSE9PVwiL1wiKW9bXCIvXCIrZV09bltlXX19fX1mdW5jdGlvbiBmKCl7dSs9MTtlKGZ1bmN0aW9uKCl7aWYodT49ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFtkYXRhLWNvbW1vbl1cIikubGVuZ3RoKXtRQVMucmVhZHkoKX19KX1mdW5jdGlvbiBjKG4sZSx0KXtyLm1lcmdlTW9kdWxlcyhuKTt2YXIgdT1sKHQpO2lmKCF0fHwhdC5sZW5ndGgpe2YoKX1lbHNle3ZhciBpO1FBUyhmdW5jdGlvbihuKXt3aGlsZShpPW4uc2hpZnQoKSl7dShpKX19LHQpfXJldHVybiB1fWZ1bmN0aW9uIGwobil7cmV0dXJuIGZ1bmN0aW9uIGUocil7aWYoIVFBUy5sb2FkZWQpe3Rocm93IG5ldyBFcnJvcihcImV4dGVybmFsIGxpYnMgbm90IHJlYWR5IVwiKX12YXIgdD1yO2lmKHR5cGVvZiB0PT09XCJzdHJpbmdcIiYmdFswXT09PVwiL1wiKXt0PXQucmVwbGFjZSgvXlxcLy8sXCJcIil9dmFyIHU7aWYoIWlbdF0pe2lmKCEodT1vW3RdKSl7aWYoISh1PW9bcj09PVwiL1wiK3Q/cjp0PVwiL1wiK3RdKSl7aWYoISh1PW9bdD1cIi9ub2RlX21vZHVsZXNcIit0XSkpe3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrcitcIidcXG5cXG5hbGwgYXZhaWxhYmxlIG1vZHVsZXM6XFxuXCIrcygpLmpvaW4oXCJcXG5cIikpO2EuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIjt0aHJvdyBhfX19dmFyIGY9aVt0XT1pW3JdPXtleHBvcnRzOnt9fTt1WzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKG4pe3ZhciByPXVbMV1bbl07cmV0dXJuIGUocj9yOlwiL1wiK24pfSxmLGYuZXhwb3J0cyxjLG8saSxuKX1yZXR1cm4gaVt0XS5leHBvcnRzfX1mdW5jdGlvbiBzKCl7dmFyIG49e307cChvLGZ1bmN0aW9uKGUscil7aWYoKFwiXCIrcikubWF0Y2goL15cXC8/XFxkKyQvKSlyZXR1cm47bltyLnJlcGxhY2UoL15cXC8obm9kZV9tb2R1bGVzXFwvKT8vLFwiXCIpXT0xfSk7cmV0dXJuIG0obil9ZnVuY3Rpb24gZChuLGUpe3ZhciByLHQ7Zm9yKHI9MCx0PW4ubGVuZ3RoO3I8dDtyKyspe2UuY2FsbChuLG5bcl0sayxuKX19ZnVuY3Rpb24gcChuLGUpe2Zvcih2YXIgciBpbiBuKXtpZihuLmhhc093blByb3BlcnR5KHIpKXtlLmNhbGwobixuW3JdLHIsbil9fX1mdW5jdGlvbiBtKG4pe3ZhciBlPVtdO3AobixmdW5jdGlvbihuLHIpe2UucHVzaChyKX0pO3JldHVybiBlfX0pLmNhbGwodGhpcyx0aGlzKSIsIi8qKlxuICogQGZpbGUg6LSm5oi35pWw5o2u5a+55o6l5qih5Z2X5Lqk5LqS6YC76L6RXG4gKiBAYXV0aG9yIGh1aXAoaHVpLnBlbmdAY3JlZGl0Y2xvdWQuY29tKVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5hY2NvdW50U2VydmljZSA9IHtcbiAgICByZWdpc3RlclVtcGF5OiBmdW5jdGlvbiAodXNlciwgbmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdQT1NUJywgJy9hcGkvdjIvdXBheW1lbnQvcmVnaXN0ZXIvTVlTRUxGJylcbiAgICAgICAgICAgIC50eXBlKCdmb3JtJylcbiAgICAgICAgICAgIC5zZW5kKHVzZXIpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBiaW5kQWdyZW1lbnQ6IGZ1bmN0aW9uKGFncmVlbWVudExpc3QsbmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdQT1NUJywgJy9hcGkvdjIvdXBheW1lbnQvYmluZEFncmVlbWVudC9NWVNFTEYnKVxuICAgICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICAgICAgICAgICAgLnNlbmQoe2FncmVlbWVudExpc3Q6IGFncmVlbWVudExpc3R9KVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIG5leHQoci5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9LFxuICAgIFxuICAgIGdldExvYW5Db3VudDogZnVuY3Rpb24oc3RhdHVzLG5leHQpeyAgICAgICAgIFxuICAgICAgICB2YXIgYXBpID0gJy9hcGkvdjIvdXNlci9NWVNFTEYvbG9hbi9jb3VudCc7XG4gICAgICAgIGFwaSA9IGFwaStzdGF0dXM7XG4gICAgICAgIHJlcXVlc3QoJ0dFVCcsIGFwaSkgICAgICAgICAgICAgICAgXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggci5ib2R5LmRhdGEgPiAwICl7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbmV4dChyLmJvZHkuZGF0YSk7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgYXV0aGVudGljYXRlVXNlcjogZnVuY3Rpb24odXNlciwgbmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdQT1NUJywgJy9hcGkvdjIvbGlhbmxpYW5wYXkvYXV0aGVudGljYXRlVXNlci9NWVNFTEYnKVxuICAgICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICAgICAgICAgICAgLnNlbmQodXNlcilcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHIuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNoZWNrQXV0aGVudGljYXRlOiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdHRVQnLCAnL2FwaS92Mi91c2VyL01ZU0VMRi9hdXRoZW50aWNhdGVzJylcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHIuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFByb3ZpbmNlOiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdHRVQnLCAnL2FwaS92Mi9saWFubGlhbnBheS9wcm92aW5jZUNvZGVzJylcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHIuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldENpdHk6IGZ1bmN0aW9uIChwcm92aW5jZU5hbWUsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnR0VUJywgJy9hcGkvdjIvbGlhbmxpYW5wYXkvcHJvdmluY2VDaXR5Q29kZXMvJyArIHByb3ZpbmNlTmFtZSlcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHIuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFVzZXJJbmZvOiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdHRVQnLCAnL2FwaS92Mi91c2VyL01ZU0VMRi91c2VyaW5mbycpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRBY2NvdW50OiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdHRVQnLCAnL2FwaS92Mi91c2VyL01ZU0VMRi9mdW5kYWNjb3VudHMnKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIG5leHQoci5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgZmVlZGJhY2s6ZnVuY3Rpb24odXNlcklkLHBhcmFtcyxuZXh0KXtcbiAgICAgICAgICByZXF1ZXN0KCdQT1NUJywgJy9hcGkvdjIvdXNlci8nK3VzZXJJZCsnL2ZlZWRiYWNrJylcbiAgICAgICAgICAgIC50eXBlKCdmb3JtJylcbiAgICAgICAgICAgIC5zZW5kKHBhcmFtcylcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHIuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfSxcbiAgICBzYXZlQXV0b0JpZENvbmZpZzogZnVuY3Rpb24ocGFyYW1zLCBuZXh0KXtcbiAgICAgICAgJC5wb3N0KCcvYXBpL3YyL3VzZXIvTVlTRUxGL3NhdmVfYXV0b2JpZF9jb25maWcnLCBwYXJhbXMsIGZ1bmN0aW9uKHIpe1xuICAgICAgICAgICAgbmV4dChyKTtcbiAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFRvdGFsSW50ZXJzOmZ1bmN0aW9uKG5leHQpe1xuICAgICAgICAgcmVxdWVzdCgnR0VUJywgJy9hcGkvdjIvcG9pbnRzL3VzZXIvJytDQy51c2VyLmlkKycvZ2V0VG90YWxQb2ludHMnKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIG5leHQoci5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgaW5pdGlhbFBhc3N3b3JkOiBmdW5jdGlvbiAocGFzc3dvcmQsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnUE9TVCcsICcvYXBpL3YyL3VzZXIvTVlTRUxGL3NldFBheW1lbnRQYXNzd29yZCcpXG4gICAgICAgICAgICAudHlwZSgnZm9ybScpXG4gICAgICAgICAgICAuc2VuZCh7cGFzc3dvcmQgOiBwYXNzd29yZH0pXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICB1cGRhdGVQYXNzd29yZDogZnVuY3Rpb24gKG9sZFBhc3N3b3JkLCBuZXdQYXNzd29yZCwgbmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdQT1NUJywgJy9hcGkvdjIvdXNlci9NWVNFTEYvdXBkYXRlUGF5bWVudFBhc3N3b3JkJylcbiAgICAgICAgICAgIC50eXBlKCdmb3JtJylcbiAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBvbGRQYXNzd29yZCA6IG9sZFBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIG5ld1Bhc3N3b3JkIDogbmV3UGFzc3dvcmRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNldFBhc3N3b3JkOiBmdW5jdGlvbiAocGFzc3dvcmQsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnUE9TVCcsICcvYXBpL3YyL3VzZXIvTVlTRUxGL3Jlc2V0UGF5bWVudFBhc3N3b3JkJylcbiAgICAgICAgICAgIC50eXBlKCdmb3JtJylcbiAgICAgICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgICAgICBwYXNzd29yZCA6IHBhc3N3b3JkXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIG5leHQoci5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2hlY2tQYXNzd29yZDogZnVuY3Rpb24gKHBhc3N3b3JkLCBuZXh0KSB7XG4gICAgICAgIHJlcXVlc3QoJ0dFVCcsICcvYXBpL3YyL3VzZXIvTVlTRUxGL3ZhbGlkYXRlUGF5bWVudFBhc3N3b3JkP3Bhc3N3b3JkPScgKyBwYXNzd29yZClcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHIuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldE5ld01lc3NhZ2VOdW06IGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgIHJlcXVlc3QoJ0dFVCcsICcvYXBpL3YyL21lc3NhZ2UvY291bnROZXdOb3RpZmljYXRpb25zL01ZU0VMRicpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG5cbiAgICAvLyDlhaznlKjooajljZXpqozor4Hnu4Tku7ZcblxuICAgIHZhciBGb3JtVmFsaWRhdG9yID0gZnVuY3Rpb24gKCkge307XG5cbiAgICBGb3JtVmFsaWRhdG9yLnByb3RvdHlwZSA9IHtcblxuICAgICAgICBjaGVja0xvZ2luTmFtZTogZnVuY3Rpb24gKGxvZ2luTmFtZSwgbmV4dCkge1xuICAgICAgICAgICAgdmFyIHJlZyA9XG4gICAgICAgICAgICAgICAgL14oPyEoKFsxXVszfDV8N3w4XVswLTldezl9KXwoW1xcdy1dKyhcXC5bXFx3LV0rKSpAW1xcdy1dKyhcXC5bXFx3LV0rKSspKSkoWzAtOWEtekEtWl9cXHU0RTAwLVxcdTlGQkZdKykvO1xuXG4gICAgICAgICAgICBpZiAoIWxvZ2luTmFtZSB8fCAhbG9naW5OYW1lLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdMT0dJTk5BTUVfTlVMTCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxvZ2luTmFtZS5sZW5ndGggPCAyIHx8IGxvZ2luTmFtZS5sZW5ndGggPiAzMCkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdMT0dJTk5BTUVfU0laRScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKCcnICsgbG9naW5OYW1lKS5tYXRjaCgvW1xcdy1dKyhcXC5bXFx3LV0rKSpAW1xcdy1dKyhcXC5bXFx3LV0rKSsvKSkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdMT0dJTk5BTUVfTk9UX0VNQUlMJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoJycgKyBsb2dpbk5hbWUpLm1hdGNoKC9eWzFdWzN8NXw3fDhdWzAtOV17OX0kLykpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnTE9HSU5OQU1FX05PVF9NT0JJTEUnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5leHQodHJ1ZSwgbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tSZWdpc3Rlck5hbWU6IGZ1bmN0aW9uIChyZWdpc3Rlck5hbWUsIG5leHQpIHtcbiAgICAgICAgICAgIHZhciByZWcgPVxuICAgICAgICAgICAgICAgIC9eKD8hKChbMV1bM3w1fDd8OF1bMC05XXs5fSl8KFtcXHctXSsoXFwuW1xcdy1dKykqQFtcXHctXSsoXFwuW1xcdy1dKykrKSkpKFswLTlhLXpBLVpfXFx1NEUwMC1cXHU5RkJGXSspLztcblxuICAgICAgICAgICAgaWYgKCFyZWdpc3Rlck5hbWUgfHwgIXJlZ2lzdGVyTmFtZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnTE9HSU5OQU1FX05VTEwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKCcnICsgcmVnaXN0ZXJOYW1lKVxuICAgICAgICAgICAgICAgIC5tYXRjaChyZWcpKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ0xPR0lOTkFNRV9JTlZBTElEJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVnaXN0ZXJOYW1lLmluZGV4T2YoJy0nKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ0xPR0lOTkFNRV9JTlZBTElEJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVnaXN0ZXJOYW1lLmxlbmd0aCA8IDIgfHwgcmVnaXN0ZXJOYW1lLmxlbmd0aCA+XG4gICAgICAgICAgICAgICAgMzApIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnTE9HSU5OQU1FX1NJWkUnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5leHQodHJ1ZSwgbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tQYXNzd29yZDogZnVuY3Rpb24gKHBhc3N3b3JkLCBuZXh0KSB7XG5cbiAgICAgICAgICAgIGlmICghcGFzc3dvcmQgfHwgIXBhc3N3b3JkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdQQVNTV09SRF9OVUxMJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFzc3dvcmQubGVuZ3RoIDwgNikge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdQQVNTV09SRF9MRU5HVEgnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5leHQodHJ1ZSwgbnVsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrUmVQYXNzd29yZDogZnVuY3Rpb24gKHBhc3N3b3JkLCByZXBhc3N3b3JkLCBuZXh0KSB7XG5cbiAgICAgICAgICAgIGlmICghcmVwYXNzd29yZCB8fCAhcmVwYXNzd29yZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnUkVQQVNTV1JPRF9OVUxMJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVwYXNzd29yZCAhPT0gcGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnUkVQQVNTV09SRF9JTlZBTElEJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXh0KHRydWUsIG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNoZWNrRW1haWw6IGZ1bmN0aW9uIChlbWFpbCwgbmV4dCkge1xuICAgICAgICAgICAgaWYgKCFlbWFpbCB8fCAhZW1haWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ0VNQUlMX05VTEwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISgnJyArIGVtYWlsKS5tYXRjaCgvW1xcdy1dKyhcXC5bXFx3LV0rKSpAW1xcdy1dKyhcXC5bXFx3LV0rKSsvKSkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdFTUFJTF9JTlZBTElEJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dCh0cnVlLCBudWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tNb2JpbGU6IGZ1bmN0aW9uIChtb2JpbGUsIG5leHQpIHtcbiAgICAgICAgICAgIGlmICghbW9iaWxlIHx8ICFtb2JpbGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ01PQklMRV9OVUxMJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoJycgKyBtb2JpbGUpXG4gICAgICAgICAgICAgICAgLm1hdGNoKC9eWzFdWzN8NXw3fDhdWzAtOV17OX0kLykpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnTU9CSUxFX0lOVkFMSUQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0KHRydWUsIG51bGwpO1xuICAgICAgICB9LFxuICAgICAgICBjaGVja0lkTnVtYmVyOiBmdW5jdGlvbiAoaWROdW1iZXIsIG5leHQpIHtcbiAgICAgICAgICAgIGlkTnVtYmVyID0gKCcnICsgaWROdW1iZXIpLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICAgICAgICAgIHZhciBwY29kZSA9IFtdOyAvL+WPquaciei/meS6m+aVsOWtl+W8gOWktOeahOS7o+eggeaJjeaYr+WQiOazleeahFxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjExXCIpOyAvL+WMl+S6rFxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjEyXCIpOyAvL+Wkqea0pVxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjEzXCIpOyAvL+ays+WMl1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjE0XCIpOyAvL+Wxseilv1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjE1XCIpOyAvL+WGheiSmeWPpFxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjIxXCIpOyAvL+i+veWugVxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjIyXCIpOyAvL+WQieael1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjIzXCIpOyAvL+m7kem+meaxn1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjMxXCIpOyAvL+S4iua1t1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjMyXCIpOyAvL+axn+iLj1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjMzXCIpOyAvL+a1meaxn1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjM0XCIpOyAvL+WuieW+vVxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjM1XCIpOyAvL+emj+W7ulxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjM2XCIpOyAvL+axn+ilv1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjM3XCIpOyAvL+WxseS4nFxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjQxXCIpOyAvL+ays+WNl1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjQyXCIpOyAvL+a5luWMl1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjQzXCIpOyAvL+a5luWNl1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjQ0XCIpOyAvL+W5v+S4nFxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjQ1XCIpOyAvL+W5v+ilv1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjQ2XCIpOyAvL+a1t+WNl1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjUwXCIpOyAvL+mHjeW6hlxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjUxXCIpOyAvL+Wbm+W3nVxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjUyXCIpOyAvL+i0teW3nlxuICAgICAgICAgICAgcGNvZGUucHVzaChcIjUzXCIpOyAvL+S6keWNl1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjU0XCIpOyAvL+ilv+iXj1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjYxXCIpOyAvL+mZleilv1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjYyXCIpOyAvL+eUmOiCg1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjYzXCIpOyAvL+mdkua1t1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjY0XCIpOyAvL+WugeWkj1xuICAgICAgICAgICAgcGNvZGUucHVzaChcIjY1XCIpOyAvL+aWsOeWhlxuICAgICAgICAgICAgaWYgKCF+cGNvZGUuaW5kZXhPZihpZE51bWJlci5zdWJzdHJpbmcoMCwgMikpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ0lETlVNQkVSX0lOVkFMSUQnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICdJRE5VTUJFUl9JTlZBTElEJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGZhY3RvciA9IFs3LCA5LCAxMCwgNSwgOCwgNCwgMiwgMSwgNiwgMywgNywgOSxcbiAgICAgICAgICAgICAgICAxMCwgNSwgOCwgNCxcbiAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdmFyIHZhbGlkRW5kaW5nID0gW1wiMVwiLCBcIjBcIiwgXCJYXCIsIFwiOVwiLCBcIjhcIiwgXCI3XCIsXG4gICAgICAgICAgICAgICAgXCI2XCIsIFwiNVwiLCBcIjRcIixcbiAgICAgICAgICAgICAgICBcIjNcIiwgXCIyXCJcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpZE51bWJlclsxN10gIT0gdmFsaWRFbmRpbmdbXy5yZWR1Y2UoZmFjdG9yLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyLCBuLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByICsgbiAqIH5+aWROdW1iZXJbaV07XG4gICAgICAgICAgICAgICAgfSwgMCkgJSAxMV0pIHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnSUROVU1CRVJfSU5WQUxJRCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ0lETlVNQkVSX0lOVkFMSUQnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHRydWUsIG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrTmFtZTogZnVuY3Rpb24gKG5hbWUsIG5leHQpIHtcbiAgICAgICAgICAgIGlmICghbmFtZSB8fCAhbmFtZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnTkFNRV9OVUxMJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoJycgKyBuYW1lKVxuICAgICAgICAgICAgICAgIC5tYXRjaCgvW1xcdTRFMDAtXFx1OUZCRl17MiwxNX0vKSkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdOQU1FX0lOVkFMSUQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0KHRydWUsIG51bGwpO1xuICAgICAgICB9LFxuICAgICAgICBjaGVja1Ntc0NhcHRjaGE6IGZ1bmN0aW9uIChzbXMsIG5leHQpIHtcbiAgICAgICAgICAgIGlmICghc21zIHx8ICFzbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ1NNU0NBUFRDSEFfTlVMTCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNtcy5sZW5ndGggIT09IDYpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnU01TQ0FQVENIQV9JTlZBTElEJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dCh0cnVlLCBudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgRXJyb3JNc2cgPSB7XG4gICAgICAgIFBBU1NXT1JEX05VTEw6ICfor7floavlhpnlr4bnoIEs5LiN6IO95Li656m65a2X56ymJyxcbiAgICAgICAgUEFTU1dPUkRfTEVOR1RIOiAn5a+G56CB55SxNi0yMOS9jeaVsOWtl+WSjOWtl+avjee7hOaIkO+8jOWMuuWIhuWkp+Wwj+WGme+8jOS4jeiDveWMheWQq+epuuWtl+espicsXG4gICAgICAgIFBBU1NXT1JEX0FHQUlOX05VTEw6ICfor7floavlhpnlr4bnoIHnoa7orqQnLFxuICAgICAgICBQQVNTV09SRF9BR0FJTl9JTlZBTElEOiAn5Lik5qyh6L6T5YWl55qE5a+G56CB5LiN5LiA6Ie0JyxcbiAgICAgICAgUkVQQVNTV09SRF9OVUxMOiAn6K+35aGr5YaZ5a+G56CB56Gu6K6kJyxcbiAgICAgICAgUkVQQVNTV09SRF9JTlZBTElEOiAn5Lik5qyh6L6T5YWl55qE5a+G56CB5LiN5LiA6Ie0JyxcbiAgICAgICAgTU9CSUxFX1VTRUQ6ICfmiYvmnLrlj7fnoIHlt7Looqvkvb/nlKgnLFxuICAgICAgICBNT0JJTEVfQ0FQVENIQV9OVUxMOiAn6K+35aGr5YaZ5omL5py655+t5L+h6aqM6K+B56CBJyxcbiAgICAgICAgTU9CSUxFX0NBUFRDSEFfSU5WQUxJRDogJ+mqjOivgeeggeaXoOaViOaIluW3sui/h+acn++8jOivt+WwneivlemHjeaWsOWPkemAgScsXG4gICAgICAgIE1PQklMRV9DQVBUQ0hBX0VYUElSRUQ6ICfpqozor4HnoIHov4fmnJ/vvIzor7flsJ3or5Xph43mlrDlj5HpgIEnLFxuICAgICAgICBBR1JFRU1FTlRfTlVMTDogJ+azqOWGjOmcgOWFiOWQjOaEj+acjeWKoeadoeasvicsXG4gICAgICAgIENBUFRDSEFfTlVMTDogJ+ivt+Whq+WGmemqjOivgeeggScsXG4gICAgICAgIENBUFRDSEFfSU5WQUxJRDogJ+mqjOivgeeggeS4jeato+ehricsXG4gICAgICAgIE1PQklMRV9OVUxMOiAn6K+35aGr5YaZ5omL5py65Y+356CBJyxcbiAgICAgICAgTU9CSUxFX0lOVkFMSUQ6ICfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7cnLFxuICAgICAgICBMT0dJTk5BTUVfRVhJU1RTOiAn55So5oi35ZCN5bey5a2Y5ZyoJyxcbiAgICAgICAgTE9HSU5OQU1FX1NUUklDVDogJzLoh7MxNeS9jeS4reiLseaWh+Wtl+espuOAgeaVsOWtl+aIluS4i+WIkue6vycsXG4gICAgICAgIExPR0lOTkFNRV9OVUxMOiAn6K+35aGr5YaZ55So5oi35ZCNJyxcbiAgICAgICAgTE9HSU5OQU1FX0lOVkFMSUQ6ICcy6IezMTXkvY3kuK3oi7HmloflrZfnrKbjgIHmlbDlrZfmiJbkuIvliJLnur8nLFxuICAgICAgICBMT0dJTk5BTUVfU0laRTogJzLoh7MxNeS9jeS4reiLseaWh+Wtl+espuOAgeaVsOWtl+aIluS4i+WIkue6vycsXG4gICAgICAgIExPR0lOTkFNRV9OT1RfTU9CSUxFOiAn55So5oi35ZCN5LiN6IO95piv5omL5py65Y+377yI5rOo5YaM5ZCO5Y+v5Lul55So5omL5py65Y+355m75b2V77yJJyxcbiAgICAgICAgTE9HSU5OQU1FX05PVF9FTUFJTDogJ+eUqOaIt+WQjeS4jeiDveaYr+mCrueusScsXG4gICAgICAgIE5BTUVfTlVMTDogJ+ivt+Whq+WGmeecn+WunuWnk+WQjScsXG4gICAgICAgIE5BTUVfSU5WQUxJRDogJ+ecn+WunuWnk+WQjemUmeivr++8jOW6lOS4ujItMTXkvY3kuK3mlofmsYnlrZcnLFxuICAgICAgICBFTUFJTF9OVUxMOiAn6K+35aGr5YaZ55S15a2Q6YKu566xJyxcbiAgICAgICAgRU1BSUxfSU5WQUxJRDogJ+ivt+i+k+WFpeato+ehrueahOmCrueusScsXG4gICAgICAgIElETlVNQkVSX0lOVkFMSUQ6ICfor7fmraPnoa7loavlhpkgMTgg5L2N6Lqr5Lu96K+B5Y+356CBJyxcbiAgICAgICAgTE9HSU5fSU5WQUxJRDogJ+aJi+acuuWPt+aIluWvhueggemUmeivrycsXG4gICAgICAgIElOVkFMSURfQ0FQVENIQTogJ+mqjOivgeeggemUmeivrycsXG4gICAgICAgIExPR0lOTkFNRV9OT1RfTUFUQ0g6ICfmiYvmnLrlj7fnoIHkuI7nmbvlvZXlkI3kuI3ljLnphY0nLFxuICAgICAgICBJTlZJVEFUSU9OX0lOVkFMSUQ6ICdI56CB5peg5pWIJyxcbiAgICAgICAgSU5WSVRBVElPTl9OVUxMOiAnSOeggeS4uuepuicsXG4gICAgICAgIFBBWU1FTlRfQUNDT1VOVF9DUkVBVEVfRVJST1I6ICflm73mlL/pgJrlrp7lkI3orqTor4HmoKHpqozmnKrpgJrov4cnLFxuICAgICAgICBTTVNDQVBUQ0hBX0lOVkFMSUQ6ICfpqozor4HnoIHkuLo25L2NJyxcbiAgICAgICAgU01TQ0FQVENIQV9OVUxMOiAn6aqM6K+B56CB5LiN6IO95Li656m6JyxcbiAgICAgICAgSUROVU1CRVJfTlVMTDogJ+i6q+S7veivgeWPt+S4jeiDveS4uuepuidcbiAgICB9O1xuXG4gICAgdmFyIENvdW50RG93biA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgQ291bnREb3duLnByb3RvdHlwZSA9IHtcbiAgICAgICAgZ2V0Q291bnREb3duVGltZTogZnVuY3Rpb24gKHRpbWUsIHNlcnZlckRhdGUsIG5leHQpIHtcbiAgICAgICAgICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLCAxMCk7XG4gICAgICAgICAgICBpZiAoIXRpbWUgfHwgdGltZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNoZWNrVGltZSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCAxMCkge1xuICAgICAgICAgICAgICAgICAgICBpID0gXCIwXCIgKyBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgbGVmdFRpbWUgPSAobmV3IERhdGUodGltZSkpIC0gKG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgIHNlcnZlckRhdGUpKTtcbiAgICAgICAgICAgIGlmIChsZWZ0VGltZSA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGQgPSBNYXRoLmZsb29yKGxlZnRUaW1lIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCk7XG4gICAgICAgICAgICBsZWZ0VGltZSAtPSBkZCAqIDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gICAgICAgICAgICB2YXIgaGggPSBNYXRoLmZsb29yKGxlZnRUaW1lIC8gMTAwMCAvIDYwIC8gNjApO1xuICAgICAgICAgICAgbGVmdFRpbWUgLT0gaGggKiAxMDAwICogNjAgKiA2MDtcbiAgICAgICAgICAgIHZhciBtbSA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwIC8gNjApO1xuICAgICAgICAgICAgbGVmdFRpbWUgLT0gbW0gKiAxMDAwICogNjA7XG4gICAgICAgICAgICB2YXIgc3MgPSBNYXRoLmZsb29yKGxlZnRUaW1lIC8gMTAwMCk7XG5cbiAgICAgICAgICAgIC8vIOWAkuiuoeaXtuWujOaIkOWQjuWIt+aWsOmhtemdolxuICAgICAgICAgICAgaWYgKGhoID09PSAwICYmIG1tID09PSAwICYmIHNzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfSksIDIwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGVmdFRpbWUgLT0gc3MgKiAxMDAwO1xuICAgICAgICAgICAgZGQgPSBjaGVja1RpbWUoZGQpO1xuICAgICAgICAgICAgaGggPSBjaGVja1RpbWUoaGgpO1xuICAgICAgICAgICAgbW0gPSBjaGVja1RpbWUobW0pO1xuICAgICAgICAgICAgc3MgPSBjaGVja1RpbWUoc3MpO1xuICAgICAgICAgICAgdmFyIG8gPSB7XG4gICAgICAgICAgICAgICAgZGF5OiBkZCxcbiAgICAgICAgICAgICAgICBob3VyOiBwYXJzZUludChoaCwgMTApICsgKGRkID4gMCA/IGRkICogMjQgOlxuICAgICAgICAgICAgICAgICAgICAwKSxcbiAgICAgICAgICAgICAgICBtaW46IG1tLFxuICAgICAgICAgICAgICAgIHNlYzogc3NcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgICAgIG5leHQobyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRDb3VudERvd25UaW1lMjogZnVuY3Rpb24gKHRpbWUsIHNlcnZlckRhdGUsIG5leHQpIHtcbiAgICAgICAgICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLCAxMCk7XG4gICAgICAgICAgICBpZiAoIXRpbWUgfHwgdGltZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNoZWNrVGltZSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCAxMCkge1xuICAgICAgICAgICAgICAgICAgICBpID0gXCIwXCIgKyBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgbGVmdFRpbWUgPSAobmV3IERhdGUodGltZSkpIC0gKG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgIHNlcnZlckRhdGUpKTtcbiAgICAgICAgICAgIGlmIChsZWZ0VGltZSA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGQgPSBNYXRoLmZsb29yKGxlZnRUaW1lIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCk7XG4gICAgICAgICAgICBsZWZ0VGltZSAtPSBkZCAqIDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gICAgICAgICAgICB2YXIgaGggPSBNYXRoLmZsb29yKGxlZnRUaW1lIC8gMTAwMCAvIDYwIC8gNjApO1xuICAgICAgICAgICAgbGVmdFRpbWUgLT0gaGggKiAxMDAwICogNjAgKiA2MDtcbiAgICAgICAgICAgIHZhciBtbSA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwIC8gNjApO1xuICAgICAgICAgICAgbGVmdFRpbWUgLT0gbW0gKiAxMDAwICogNjA7XG4gICAgICAgICAgICB2YXIgc3MgPSBNYXRoLmZsb29yKGxlZnRUaW1lIC8gMTAwMCk7XG4gICAgICAgICAgICBsZWZ0VGltZSAtPSBzcyAqIDEwMDA7XG4gICAgICAgICAgICAvL2RkID0gY2hlY2tUaW1lKGRkKTtcbiAgICAgICAgICAgIGhoID0gY2hlY2tUaW1lKGhoKTtcbiAgICAgICAgICAgIG1tID0gY2hlY2tUaW1lKG1tKTtcbiAgICAgICAgICAgIHNzID0gY2hlY2tUaW1lKHNzKTtcbiAgICAgICAgICAgIHZhciBvID0ge1xuICAgICAgICAgICAgICAgIGRheTogZGQsXG4gICAgICAgICAgICAgICAgaG91cjogaGgsXG4gICAgICAgICAgICAgICAgbWluOiBtbSxcbiAgICAgICAgICAgICAgICBzZWM6IHNzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBuZXh0KG8pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyDmoLzlvI/ljJZkdXJhdGlvblxuICAgIHZhciBmb3JtYXRlRHVyYXRpb24gPSBmdW5jdGlvbiAoZHVyKSB7XG4gICAgICAgIHZhciBfbW9udGggPSAwO1xuICAgICAgICBpZiAoZHVyLmRheXMgPiAwKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGR1ci50b3RhbERheXMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICBfbW9udGggPSBkdXIuZGF5cyArIFwi5aSpXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9tb250aCA9IGR1ci50b3RhbERheXMgKyBcIuWkqVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGR1ci55ZWFycyA+IDApIHtcbiAgICAgICAgICAgICAgICBfbW9udGggKz0gZHVyLnllYXJzICogMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHVyLm1vbnRocyA+IDApIHtcbiAgICAgICAgICAgICAgICBfbW9udGggKz0gZHVyLm1vbnRocztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9tb250aCA9IF9tb250aCArIFwi5Liq5pyIXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9tb250aDtcbiAgICB9O1xuXG4gICAgLy8g5qC85byP5YyW6ZO26KGM5Y2h5Y+3XG4gICAgdmFyIGJhbmtBY2NvdW50ID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBzdHIgPSBzdHIudG9TdHJpbmcoKTtcbiAgICAgICAgc3RyID0gc3RyLnRyaW0oKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMTYpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHN0ci5zdWJzdHJpbmcoMCwgNCkgKyAnICcgKyAnKioqKiAqKioqJyArICcgJyArXG4gICAgICAgICAgICAgICAgc3RyLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgMTIpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0ci5sZW5ndGggPT09IDE5KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBzdHIuc3Vic3RyaW5nKDAsIDYpICsgJyAnICsgJyoqKioqKionICsgJyAnICtcbiAgICAgICAgICAgICAgICBzdHIuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAxMyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdCYW5rIGFjY291bnQgbnVtYmVyICcgKyBzdHIgK1xuICAgICAgICAgICAgICAgICcgaXMgaW52YWxpZCcpO1xuICAgICAgICAgICAgcmVzdWx0ID0gc3RyO1xuICAgICAgICB9XG4gICAgICAgIC8vcmV0dXJuIHJlc3VsdC5yZXBsYWNlKC9cXHMvZywgJyZuYnNwOycpXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIC8vIGZvcm1hdCBhbW91bnRcbiAgICB2YXIgZm9ybWF0QW1vdW50ID0gZnVuY3Rpb24gKHMsIG4pIHtcbiAgICAgICAgbiA9IG4gPiAwICYmIG4gPD0gMjAgPyBuIDogMDtcbiAgICAgICAgaWYgKHMgPCAwKSB7XG4gICAgICAgICAgICB2YXIgX3MgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIF9zLnRvRml4ZWQobik7XG4gICAgICAgIH1cbiAgICAgICAgcyA9IHBhcnNlRmxvYXQoKHMgKyBcIlwiKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1teXFxkXFwuLV0vZywgXCJcIikpXG4gICAgICAgICAgICAudG9GaXhlZChuKSArIFwiXCI7XG4gICAgICAgIHZhciBsID0gcy5zcGxpdChcIi5cIilbMF0uc3BsaXQoXCJcIilcbiAgICAgICAgICAgIC5yZXZlcnNlKCk7XG4gICAgICAgIHZhciByID0gcy5zcGxpdChcIi5cIilbMV07XG4gICAgICAgIHZhciB0ID0gXCJcIixcbiAgICAgICAgICAgIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0ICs9IGxbaV0gKyAoKGkgKyAxKSAlIDMgPT09IDAgJiYgKGkgKyAxKSAhPT0gbC5sZW5ndGggP1xuICAgICAgICAgICAgICAgIFwiLFwiIDpcbiAgICAgICAgICAgICAgICBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocikge1xuICAgICAgICAgICAgcmV0dXJuIHQuc3BsaXQoXCJcIilcbiAgICAgICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJcIikgKyBcIi5cIiArIHI7IC8vIDk5Ljk5XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgICAgICAuam9pbihcIlwiKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBmb3JtYXQgcGVyY2VudFxuICAgIHZhciBmb3JtYXRQZXJjZW50ID0gZnVuY3Rpb24gKHBlcmNlbnQsIG9mZnNldCkge1xuICAgICAgICBwZXJjZW50ID0gcGVyY2VudC50b1N0cmluZygpO1xuICAgICAgICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQgfHwgb2Zmc2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwZXJjZW50LmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBwZXJjZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwZXJjZW50LnN1YnN0cmluZygwLCBwZXJjZW50LmluZGV4T2YoXCIuXCIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcmNlbnQuc3Vic3RyaW5nKDAsIHBlcmNlbnQuaW5kZXhPZihcIi5cIikgK1xuICAgICAgICAgICAgICAgICAgICAob2Zmc2V0ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBmb3JtYXQgdGltZUVsYXBzZWQgXG5cbiAgICB2YXIgdGltZUVsYXBzZWQgPSBmdW5jdGlvbiAodGltZUVsYXBzZWQsIGlzb2JqKSB7XG4gICAgICAgIGlmICh0aW1lRWxhcHNlZCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcyA9IH5+ICh0aW1lRWxhcHNlZCAvIDEwMDApLFxuICAgICAgICAgICAgbSA9IDAsXG4gICAgICAgICAgICBoID0gMCxcbiAgICAgICAgICAgIGQgPSAwO1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG5cbiAgICAgICAgaWYgKHMgPiA1OSkge1xuICAgICAgICAgICAgbSA9IH5+IChzIC8gNjApO1xuICAgICAgICAgICAgcyA9IHMgJSA2MDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobSA+IDU5KSB7XG4gICAgICAgICAgICBoID0gfn4gKG0gLyA2MCk7XG4gICAgICAgICAgICBtID0gbSAlIDYwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoID4gMjQpIHtcbiAgICAgICAgICAgIGQgPSB+fiAoaCAvIDI0KTtcbiAgICAgICAgICAgIGggPSBoICUgMjQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocyA8IDApIHtcbiAgICAgICAgICAgIHMgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9ICcnICsgcyArICfnp5InO1xuICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gJycgKyBtICsgJ+WIhicgKyByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGgpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9ICcnICsgaCArICflsI/ml7YnICsgcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAnJyArIGQgKyAn5aSpJyArIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gIWlzb2JqID8gcmVzdWx0IDoge1xuICAgICAgICAgICAgZGF5OiBkLFxuICAgICAgICAgICAgaG91cjogaCxcbiAgICAgICAgICAgIG1pbjogbSxcbiAgICAgICAgICAgIHNlYzogcGFyc2VJbnQocylcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGllQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIG5hdmlnYXRvci5hcHBWZXJzaW9uICYmXG4gICAgICAgICAgICBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5tYXRjaCgvTVNJRSAoW1xcZC5dKykvKTtcblxuICAgICAgICByZXR1cm4gdmVyc2lvbiA/IE51bWJlcih2ZXJzaW9uWzFdKSB8fCAwIDogMDtcbiAgICB9O1xuICAgIFxuICAgIHZhciBtYXRjaCA9IHtcbiAgICAgICAgbW9iaWxlOiBmdW5jdGlvbiAobW9iaWxlKSB7XG4gICAgICAgICAgICB2YXIgcmVxID0gL15bMV1bM3w1fDd8OF1bMC05XXs5fSQvO1xuICAgICAgICAgICAgcmV0dXJuICEhbW9iaWxlLnRvU3RyaW5nKCkubWF0Y2gocmVxKTtcbiAgICAgICAgfSxcbiAgICAgICAgYW1vdW50OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICB2YXIgZXhwID0gL14oWzEtOV1bXFxkXXswLDd9fDApKFxcLltcXGRdezEsMn0pPyQvO1xuICAgICAgICAgICAgcmV0dXJuIGV4cC50ZXN0KGFtb3VudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVtYWlsOiBmdW5jdGlvbiAoZW1haWwpIHtcbiAgICAgICAgICAgIHZhciBleHAgPSAvXltcXHctXSsoXFwuW1xcdy1dKykqQFtcXHctXSsoXFwuW1xcdy1dKykrJC87XG4gICAgICAgICAgICByZXR1cm4gZXhwLnRlc3QoZW1haWwpO1xuICAgICAgICB9LFxuICAgICAgICAvLyA25YiwMjDkvY3mlbDlrZflrZfmr43lr4bnoIFcbiAgICAgICAgcGFzc3dvcmQ6IGZ1bmN0aW9uIChzKXtcbiAgICAgICAgICAgIHJldHVybiAhIXMubWF0Y2goL1swLTlhLXpBLVpdezYsMjB9Lyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIFxuICAgIHZhciB0b29sID0ge1xuICAgICAgICBqc29uVG9QYXJhbXM6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtc1trZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8cGFyYW1zW2tleV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSAnJicgKyBrZXkgKyAnPScgKyBwYXJhbXNba2V5XVtpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICcmJyArIGtleSArICc9JyArIHBhcmFtc1trZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGF0ZTogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICAgdmFyIF9kYXRlLCB5LCBtLCBkO1xuICAgICAgICAgICAgX2RhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICAgIHkgPSBwYXJzZUludChfZGF0ZVswXSk7XG4gICAgICAgICAgICBtID0gcGFyc2VJbnQoX2RhdGVbMV0pO1xuICAgICAgICAgICAgZCA9IHBhcnNlSW50KF9kYXRlWzJdKTtcbiAgICAgICAgICAgIGlmIChtIDwgMTApIHtcbiAgICAgICAgICAgICAgICBtID0gJzAnICsgbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkIDwgMTApIHtcbiAgICAgICAgICAgICAgICBkID0gJzAnICsgZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5ICsgJy0nICsgbSArICctJyArIGQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZFNjcmlwdDogZnVuY3Rpb24odXJsLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIF9zY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgX3NjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCd0ZXh0L2phdmFzY3JpcHQnKTtcbiAgICAgICAgICAgIF9zY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLHVybCk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoX3NjcmlwdCk7XG4gICAgICAgICAgICBpZiAoX3NjcmlwdC5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgLy9JRVxuICAgICAgICAgICAgICAgIF9zY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3NjcmlwdC5yZWFkeVN0YXRlID09IFwibG9hZGVkXCIgfHwgX3NjcmlwdC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v6Z2eSUVcbiAgICAgICAgICAgICAgICBfc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIOaatOmcsuaOpeWPo1xuICAgIHJldHVybiB7XG4gICAgICAgIGZvcm1WYWxpZGF0b3I6IG5ldyBGb3JtVmFsaWRhdG9yKCksXG4gICAgICAgIGVycm9yTXNnOiBFcnJvck1zZyxcbiAgICAgICAgY291bnREb3duOiBuZXcgQ291bnREb3duKCksXG4gICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgYW1vdW50OiBmb3JtYXRBbW91bnQsXG4gICAgICAgICAgICBkdXJhdGlvbjogZm9ybWF0ZUR1cmF0aW9uLFxuICAgICAgICAgICAgcGVyY2VudDogZm9ybWF0UGVyY2VudCxcbiAgICAgICAgICAgIHRpbWVFbGFwc2VkOiB0aW1lRWxhcHNlZFxuICAgICAgICB9LFxuICAgICAgICBiYW5rQWNjb3VudDogYmFua0FjY291bnQsXG4gICAgICAgIGkxOG46IHJlcXVpcmUoJ0Bkcy9pMThuJylbJ3poLWNuJ10uZW51bXMsXG4gICAgICAgIGllQ2hlY2s6IGllQ2hlY2ssXG4gICAgICAgIG1hdGNoOiBtYXRjaCxcbiAgICAgICAgdG9vbDogdG9vbFxuICAgIH07XG5cbn0pKCk7XG4iLCIvKipcbiAqIEBmaWxlIOWktOmDqOaOp+S7tueahOS6pOS6kumAu+i+keWxglxuICogQGF1dGhvciBodWlwKGh1aS5wZW5nQGNyZWRpdGNsb3VkLmNvbSlcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhY2NvdW50U2VydmljZSA9IHJlcXVpcmUoJ2NjYy9hY2NvdW50L2pzL21haW4vc2VydmljZS9hY2NvdW50JykuYWNjb3VudFNlcnZpY2U7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJ2NjYy9nbG9iYWwvanMvbGliL3V0aWxzJyk7XG5cbiQoJy5zX190b3AxNScpLm1vdXNlb3ZlcihmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLm5leHQoKS5jc3MoJ2Rpc3BsYXknLCAnJyk7XG59KS5tb3VzZW91dChmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLm5leHQoKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xufSk7XG5cblxuXG5pZihDQy51c2VyKXtcblxuXG4gICAgYWNjb3VudFNlcnZpY2UuZ2V0VXNlckluZm8oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZighcmVzLnVzZXIpe1xuICAgICAgICAgICAgcmVzLnVzZXI9e307XG4gICAgICAgICAgICByZXMudXNlci5uYW1lPScnO31cbiAgICAgICAgICAgIG5ldyBSYWN0aXZlKHtcbiAgICAgICAgICAgIGVsOiBcIiNoZWFkLXJhY3RpdmUtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTonPGltZyBzcmM9XCIvY2NjL25ld0FjY291bnQvaW1nL3VzZXIucG5nXCIgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTtib3R0b206MnB4O1wiLz57eyNpZiAhbmFtZX19e3ttb2JpbGV9fXt7ZWxzZX19e3tuYW1lfX17ey9pZn19JywgXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICBuYW1lOnJlcy51c2VyLm5hbWUsXG4gICAgICAgICAgICAgICBsb2dpbk5hbWU6Q0MudXNlci5sb2dpbk5hbWUsXG4gICAgICAgICAgICAgICAgbW9iaWxlOnJlcy51c2VyLm1vYmlsZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgICAgIFxuICAgIH0pO1xuICAgIGFjY291bnRTZXJ2aWNlLmdldE5ld01lc3NhZ2VOdW0oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB2YXIgbWVzc2FnZVJhY3RpdmUgPSBuZXcgUmFjdGl2ZSh7XG4gICAgICAgICAgICBlbDogJyNoZWFkLW1lc3NhZ2UtY29udGFpbmVyJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnKHt7bnVtfX0pJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBudW06IHJlc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAgXG59O1xuXG4gXG5cbiQoZnVuY3Rpb24oKXtcbiAgICB1dGlscy50b29sLmxvYWRTY3JpcHQoJ2h0dHA6Ly93cGEuYi5xcS5jb20vY2dpL3dwYS5waHAnLGZ1bmN0aW9uKCl7XG4gICAgICAgIEJpelFRV1BBLmFkZEN1c3RvbSh7YXR5OiAnMCcsIGE6ICcwJywgbmFtZUFjY291bnQ6IDQwMDEwMDAwOTksIHNlbGVjdG9yOiAnQml6UVFXUEExJ30pO1xuICAgICAgICBCaXpRUVdQQS5hZGRDdXN0b20oe2F0eTogJzAnLCBhOiAnMCcsIG5hbWVBY2NvdW50OiA0MDAxMDAwMDk5LCBzZWxlY3RvcjogJ0JpelFRV1BBMid9KTtcbiAgICB9KTtcbiAgICB2YXIgc2lkZVVwID0gJCgnI3NpZGVVcCcpO1xuICAgIHdpbmRvdy5vbnNjcm9sbD1mdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2Nyb2xsVG9wT2Zmc2V0PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICBpZihzY3JvbGxUb3BPZmZzZXQgID49IDUwMCl7IMKgLy9kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICAgICAgICAgIHNpZGVVcC5zaG93KCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2lkZVVwLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59KTtcblxuXG4vL3ZhciBDYWwgPSByZXF1aXJlKCdjY2MvZ2xvYmFsL2pzL21vZHVsZXMvY2NjQ2FsY3VsYXRvcicpO1xuLy8kKCcjY2FsY3VsYXRvci1jcmVhdGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4vLyAgICBDYWwuY3JlYXRlKCk7XG4vL30pO1xuJChcIi5iYWNrLXRvcFwiKS5jbGljayhmdW5jdGlvbigpe1xuJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOjB9LDIwMCk7XG5yZXR1cm4gZmFsc2U7XG59KVxuXG4vL+WvvOiIqueKtuaAgVxudmFyIHBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbmlmIChuZXcgUmVnRXhwKFwiXi8kXCIpXG4gICAgLnRlc3QocGF0aCkpIHtcbiAgICAkKFwiLnUtbm9saXN0LXVsIGxpIGEjaW5kZXhcIilcbiAgICAgICAgLmFkZENsYXNzKFwibmF2YWN0aXZlXCIpO1xuXG59IGVsc2UgaWYgKG5ldyBSZWdFeHAoXCJeL2ludmVzdFwiKVxuICAgIC50ZXN0KHBhdGgpKSB7XG4gICAgJChcIi51LW5vbGlzdC11bCBsaSBhI3RvdXppXCIpXG4gICAgICAgIC5hZGRDbGFzcyhcIm5hdmFjdGl2ZVwiKTtcblxufSBlbHNlIGlmIChuZXcgUmVnRXhwKFwiXi9hcHBseWxvYW5cIilcbiAgICAudGVzdChwYXRoKSkge1xuICAgICQoXCIudS1ub2xpc3QtdWwgbGkgYSNqaWVrdWFuXCIpXG4gICAgICAgIC5hZGRDbGFzcyhcIm5hdmFjdGl2ZVwiKTtcblxufSBlbHNlIGlmIChuZXcgUmVnRXhwKFwiXi9uZXdBY2NvdW50LypcIilcbiAgICAudGVzdChwYXRoKSkge1xuICAgICQoXCIudS1ub2xpc3QtdWwgbGkgYSNzYWZldHlcIilcbiAgICAgICAgLmFkZENsYXNzKFwibmF2YWN0aXZlXCIpO1xuXG59IGVsc2UgaWYgKG5ldyBSZWdFeHAoXCJeL2d1aWRlXCIpXG4gICAgLnRlc3QocGF0aCkpIHtcbiAgICAkKFwiLnUtbm9saXN0LXVsIGxpIGEjaGVscFwiKVxuICAgICAgICAuYWRkQ2xhc3MoXCJuYXZhY3RpdmVcIik7XG5cbn0gZWxzZSBpZiAobmV3IFJlZ0V4cChcIl4vYWJvdXR1cy8qXCIpXG4gICAgLnRlc3QocGF0aCkpIHtcbiAgICAkKFwiLnUtbm9saXN0LXVsIGxpIGEjYWJvdXR1c1wiKVxuICAgICAgICAuYWRkQ2xhc3MoXCJuYXZhY3RpdmVcIik7XG59XG5cblxudmFyIENhbCA9IHJlcXVpcmUoJ2NjYy9nbG9iYWwvanMvbW9kdWxlcy9jY2NDYWxjdWxhdG9yJyk7XG4kKCcuY2FsY3VsYXRvci1jcmVhdGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgQ2FsLmNyZWF0ZSgpO1xufSk7XG5cblxuLy/lr7zoiKrnp7vliqjlnKjkuIrpnaLlh7rnjrDlvq7kv6Fcbi8vJCgnLmVyd2VpbWEnKS5oaWRlKCk7XG4kKCcud2VpeGluLWljb24nKS5tb3VzZWVudGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLmVyd2VpbWEtYWN0MicpLnNob3coKTtcbiAgICB9KS5tb3VzZWxlYXZlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLmVyd2VpbWEtYWN0MicpLmhpZGUoKTtcbiAgICB9KTtcblxuJCgnLndlaXhpbi1pY29uJykubW91c2VlbnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5lcndlaW1hLWFjdCcpLnNob3coKTtcbiAgICB9KS5tb3VzZWxlYXZlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLmVyd2VpbWEtYWN0JykuaGlkZSgpO1xuICAgIH0pO1xuXG4vL+aOp+iCoeS4i+aLieiPnOWNlVxuICAgIFx0XG5cdFx0JChcIiNmYW1pbHlcIikuaG92ZXIoZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykuZmluZChcInBcIikuY3NzKFwiYmFja2dyb3VuZFwiLFwidXJsKC9jY2MvZ2xvYmFsL2ltZy9zbGlkZU9uLnBuZykgbm8tcmVwZWF0XCIpO1xuXHRcdFx0JCh0aGlzKS5maW5kKFwidWxcIikuc3RvcCgpLnNsaWRlRG93bigpO1xuXHRcdH0sZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykuZmluZChcInVsXCIpLnN0b3AoKS5zbGlkZVVwKCk7XG5cdFx0XHQkKHRoaXMpLmZpbmQoXCJwXCIpLmNzcyhcImJhY2tncm91bmRcIixcInVybCgvY2NjL2dsb2JhbC9pbWcvc2xpZGUucG5nKSBuby1yZXBlYXRcIik7XG5cdFx0fSk7XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuZnVuY3Rpb24gRGlhbG9nKGNvbnRlbnQsIG9wdGlvbnMpIHtcbiAgICBEaWFsb2cuX196aW5kZXggPSA5MDAwO1xuICAgIERpYWxvZy5fX2NvdW50ID0gMTtcbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgc2hvd1RpdGxlOiB0cnVlLFxuICAgICAgICAvLyDmmK/lkKbmmL7npLrmoIfpopjmoI/jgIJcbiAgICAgICAgd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIGhlaWdodDogJzIwMHB4JyxcbiAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgLy8g5piv5ZCm56e75YqoIFxuICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgLy8g5piv5ZCm5piv5qih5oCB5a+56K+d5qGGIFxuICAgICAgICBjZW50ZXI6IHRydWUsXG4gICAgICAgIC8vIOaYr+WQpuWxheS4reOAgiBcbiAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgIC8vIOaYr+WQpui3n+maj+mhtemdoua7muWKqOOAglxuICAgICAgICB0aW1lOiAwLFxuICAgICAgICAvLyDoh6rliqjlhbPpl63ml7bpl7TvvIzkuLow6KGo56S65LiN5Lya6Ieq5Yqo5YWz6Zet44CCIFxuICAgICAgICB0b3A6IG51bGwsXG4gICAgICAgIGNsYTogJycsIC8vIGRpYWxvZyB3cmFw55qE5omp5bGVY2xhc3NcbiAgICAgICAgaWQ6IGZhbHNlIC8vIOWvueivneahhueahGlk77yM6Iul5Li6ZmFsc2XvvIzliJnnlLHns7vnu5/oh6rliqjkuqfnlJ/kuIDkuKrllK/kuIBpZOOAgiBcbiAgICB9O1xuXG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICBvcHRpb25zLnRpdGxlID0gb3B0aW9ucy50aXRsZSB8fCAnJztcbiAgICBvcHRpb25zLnRpbWUgPSBvcHRpb25zLnRpbWUgfHwgMDtcbiAgICBvcHRpb25zLmlkID0gb3B0aW9ucy5pZCA/IG9wdGlvbnMuaWQgOiAnZGlhbG9nLScgKyBEaWFsb2cuX19jb3VudDsgLy8g5ZSv5LiASURcbiAgICB2YXIgb3ZlcmxheUlkID0gb3B0aW9ucy5pZCArICctb3ZlcmxheSc7IC8vIOmBrue9qeWxgklEXG4gICAgdmFyIHRpbWVJZCA9IG51bGw7IC8vIOiHquWKqOWFs+mXreiuoeaXtuWZqCBcbiAgICB2YXIgaXNTaG93ID0gZmFsc2U7XG5cbiAgICBvcHRpb25zLnRvcCA9IGNvbnRlbnQudG9wIHx8ICcyMCUnO1xuICAgIG9wdGlvbnMuY2xhID0gY29udGVudC5jbGEgfHwgJyc7XG5cdG9wdGlvbnMub3ZlcmxheSA9IGNvbnRlbnQub3ZlcmxheSB8fCB0cnVlO1xuXG4gICAgLy92YXIgaXNJZSA9ICQuYnJvd3Nlci5tc2llO1xuICAgIC8vdmFyIGlzSWU2ID0gJC5icm93c2VyLm1zaWUgJiYgKCc2LjAnID09ICQuYnJvd3Nlci52ZXJzaW9uKTtcblxuICAgIC8vdmFyIGlzSWUgPSBkb2N1bWVudC5hbGwgJiYgd2luZG93LmV4dGVybmFsO1xuICAgIHZhciBpc0llNiA9IGZhbHNlO1xuXHR2YXIgZ2V0V3JhcCA9IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR3aWR0aDogJCh3aW5kb3cpLndpZHRoKCkgKyAkKGRvY3VtZW50KS5zY3JvbGxMZWZ0KCksXG5cdFx0XHRoZWlnaHQ6ICQoZG9jdW1lbnQpLmhlaWdodCgpXG5cdFx0fTtcblx0fTtcblx0LypcbiAgICB2YXIgd3JhcCA9IHtcbiAgICAgICAgd2lkdGg6ICQod2luZG93KS53aWR0aCgpICsgJChkb2N1bWVudCkuc2Nyb2xsTGVmdCgpLFxuICAgICAgICBoZWlnaHQ6ICQoZG9jdW1lbnQpLmhlaWdodCgpXG4gICAgfTtcblx0Ki9cblx0dmFyIHdyYXAgPSBnZXRXcmFwKCk7XG5cbiAgICAvKiDlr7nor53moYbnmoTluIPlsYDlj4rmoIfpopjlhoXlrrnjgIIqL1xuICAgIG9wdGlvbnMudGl0bGUgPSBjb250ZW50LnRpdGxlIHx8IFwiXCI7XG4gICAgdmFyIGJhckh0bWwgPSAhb3B0aW9ucy5zaG93VGl0bGUgPyAnJyA6XG4gICAgICAgICc8ZGl2IGNsYXNzPVwiYmFyXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPicgKyAoKG9wdGlvbnMudGl0bGUgPT09IFwiXCIgfHxcbiAgICAgICAgICAgIG9wdGlvbnMudGl0bGUgPT09IGZhbHNlKSA/IFwiXCIgOiBvcHRpb25zLnRpdGxlKSArXG4gICAgICAgICc8L3NwYW4+PGEgY2xhc3M9XCJjbG9zZVwiPjwvYT48L2Rpdj4nO1xuICAgIHZhciB0aGVEaWFsb2cgPSAkKCc8ZGl2IGlkPVwiJyArIG9wdGlvbnMuaWQgKyAnXCIgY2xhc3M9XCJkaWFsb2cgY2NjLWJveC13cmFwICcgKyBvcHRpb25zLmNsYSArXG4gICAgICAgICdcIj4nICsgYmFySHRtbCArICc8ZGl2IGNsYXNzPVwiRGNvbnRlbnRcIj48L2Rpdj48L2Rpdj4nKVxuICAgICAgICAuaGlkZSgpO1xuICAgICQoJ2JvZHknKVxuICAgICAgICAuYXBwZW5kKHRoZURpYWxvZyk7XG5cblxuICAgIC8qKlxuICAgICAqIOmHjee9ruWvueivneahhueahOS9jee9ruOAglxuICAgICAqXG4gICAgICog5Li76KaB5piv5Zyo6ZyA6KaB5bGF5Lit55qE5pe25YCZ77yM5q+P5qyh5Yqg6L295a6M5YaF5a6577yM6YO96KaB6YeN5paw5a6a5L2NXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgKi9cbiAgICB0aGlzLnJlc2V0UG9zID0gZnVuY3Rpb24gKCkgeyAvKiDmmK/lkKbpnIDopoHlsYXkuK3lrprkvY3vvIzlv4XpnIDlnKjlt7Lnu4/nn6XpgZPkuoZkaWFsb2flhYPntKDlpKflsI/nmoTmg4XlhrXkuIvvvIzmiY3og73mraPnoa7lsYXkuK3vvIzkuZ/lsLHmmK/opoHlhYjorr7nva5kaWFsb2fnmoTlhoXlrrnjgIIgKi9cbiAgICAgICAgaWYgKG9wdGlvbnMuY2VudGVyKSB7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSAkKFwiLkRjb250ZW50XCIsIHRoZURpYWxvZylcbiAgICAgICAgICAgICAgICAub3V0ZXJXaWR0aCgpO1xuXG4gICAgICAgICAgICB0aGVEaWFsb2cuY3NzKFwid2lkdGhcIiwgd2lkdGgpO1xuXG4gICAgICAgICAgICB2YXIgbGVmdCA9ICgkKHdpbmRvdylcbiAgICAgICAgICAgICAgICAud2lkdGgoKSAtIHRoZURpYWxvZy53aWR0aCgpKSAvIDI7XG4gICAgICAgICAgICB2YXIgdG9wID0gKCQod2luZG93KVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoKSAtIHRoZURpYWxvZy5oZWlnaHQoKSkgLyAyO1xuICAgICAgICAgICAgaWYgKHRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzSWU2ICYmIG9wdGlvbnMuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGVEaWFsb2cuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBvcHRpb25zLnRvcCA/IG9wdGlvbnMudG9wIDogdG9wLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoZURpYWxvZy5jc3Moe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCArICQoZG9jdW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2Nyb2xsVG9wKCksXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQgKyAkKGRvY3VtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNjcm9sbExlZnQoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMluS9jee9ruWPiuS4gOS6m+S6i+S7tuWHveaVsOOAglxuICAgICAqXG4gICAgICog5YW25Lit55qEdGhpc+ihqOekukRpYWxvZ+WvueixoeiAjOS4jeaYr2luaXTlh73mlbDjgIJcbiAgICAgKi9cbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHsgLyog5piv5ZCm6ZyA6KaB5Yid5aeL5YyW6IOM5pmv6YGu572p5bGCICovXG5cbiAgICAgICAgaWYgKG9wdGlvbnMubW9kYWwpIHtcbiAgICAgICAgICAgICQoJ2JvZHknKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxkaXYgaWQ9XCInICsgb3ZlcmxheUlkICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGNsYXNzPVwiZGlhbG9nLW92ZXJsYXkgY2NjLWJveC1vdmVybGF5XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAkKCcjJyArIG92ZXJsYXlJZClcbiAgICAgICAgICAgICAgICAuY3NzKCd3aWR0aCcsIHdyYXAud2lkdGgpXG4gICAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0Jywgd3JhcC5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsICsrRGlhbG9nLl9femluZGV4KTtcbiAgICAgICAgICAgICQoJyMnICsgb3ZlcmxheUlkKVxuICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IDAsXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAwLFxuICAgICAgICAgICAgICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuaGlkZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGVEaWFsb2cuY3NzKHtcbiAgICAgICAgICAgICd6LWluZGV4JzogKytEaWFsb2cuX196aW5kZXgsXG4gICAgICAgICAgICAncG9zaXRpb24nOiBvcHRpb25zLmZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyogIElFNiDlhbzlrrlmaXhlZOS7o+eggSAqL1xuICAgICAgICBpZiAoaXNJZTYgJiYgb3B0aW9ucy5maXhlZCkge1xuICAgICAgICAgICAgdGhlRGlhbG9nLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgIC8vIHJlc2V0UG9zKCk7XG4gICAgICAgICAgICAkKHdpbmRvdylcbiAgICAgICAgICAgICAgICAuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpYSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJChkb2N1bWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGVpZ2h0KCkgLyAyIC0gdGhlRGlhbG9nLmhlaWdodCgpIC8gMiArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAkKGRvY3VtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY3JvbGxMZWZ0KCkgKyAkKHdpbmRvdylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAud2lkdGgoKSAvIDIgLSB0aGVEaWFsb2cub3V0ZXJXaWR0aCgpIC8gMiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4J1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGVEaWFsb2cuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd0b3AnOiBkaWEudG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBkaWEubGVmdFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIOS7peS4i+S7o+eggeWkhOeQhuahhuS9k+aYr+WQpuWPr+S7peenu+WKqCAqL1xuICAgICAgICB2YXIgbW91c2UgPSB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVEaWFsb2coZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBlID0gd2luZG93LmV2ZW50IHx8IGV2ZW50O1xuICAgICAgICAgICAgdmFyIHRvcCA9IHBhcnNlSW50KHRoZURpYWxvZy5jc3MoJ3RvcCcpKSArIChlLmNsaWVudFkgLSBtb3VzZS55KTtcbiAgICAgICAgICAgIHZhciBsZWZ0ID0gcGFyc2VJbnQodGhlRGlhbG9nLmNzcygnbGVmdCcpKSArIChlLmNsaWVudFggLSBtb3VzZS54KTtcbiAgICAgICAgICAgIHRoZURpYWxvZy5jc3Moe1xuICAgICAgICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW91c2UueCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgIG1vdXNlLnkgPSBlLmNsaWVudFk7XG4gICAgICAgIH1cbiAgICAgICAgdGhlRGlhbG9nLmZpbmQoJy5iYXInKVxuICAgICAgICAgICAgLm1vdXNlZG93bihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZSA9IHdpbmRvdy5ldmVudCB8fCBldmVudDtcbiAgICAgICAgICAgICAgICBtb3VzZS54ID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgIG1vdXNlLnkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgJChkb2N1bWVudClcbiAgICAgICAgICAgICAgICAgICAgLmJpbmQoJ21vdXNlbW92ZScsIG1vdmVEaWFsb2cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICQoZG9jdW1lbnQpXG4gICAgICAgICAgICAubW91c2V1cChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJChkb2N1bWVudClcbiAgICAgICAgICAgICAgICAgICAgLnVuYmluZCgnbW91c2Vtb3ZlJywgbW92ZURpYWxvZyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvKiDnu5HlrprkuIDkupvnm7jlhbPkuovku7bjgIIgKi9cbiAgICAgICAgdGhlRGlhbG9nLmZpbmQoJy5jbG9zZScpXG4gICAgICAgICAgICAuYmluZCgnY2xpY2snLCB0aGlzLmNsb3NlKTtcbiAgICAgICAgdGhlRGlhbG9nLmJpbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoZURpYWxvZy5jc3MoJ3otaW5kZXgnLCArK0RpYWxvZy5fX3ppbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIOiHquWKqOWFs+mXrSBcbiAgICAgICAgaWYgKDAgIT09IG9wdGlvbnMudGltZSkge1xuICAgICAgICAgICAgdGltZUlkID0gc2V0VGltZW91dCh0aGlzLmNsb3NlLCBvcHRpb25zLnRpbWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICog6K6+572u5a+56K+d5qGG55qE5YaF5a6544CCXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RyaW5nIGMg5Y+v5Lul5pivSFRNTOaWh+acrOOAglxuICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAqL1xuICAgIHRoaXMuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGlmIChjLnRpbWUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMudGltZSA9IGMudGltZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGl2ID0gdGhlRGlhbG9nLmZpbmQoJy5EY29udGVudCcpO1xuICAgICAgICB2YXIgd2lkdGggPSBjLndpZHRoID8gYy53aWR0aCA6IGRlZmF1bHRzLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0ID0gYy5oZWlnaHQgPyBjLmhlaWdodCA6IGRlZmF1bHRzLmhlaWdodDtcblxuICAgICAgICBpZiAoYy5hbGVydCkge1xuICAgICAgICAgICAgYy52YWx1ZSA9ICc8ZGl2IGNsYXNzPVwiYm94LWFsZXJ0LXdyYXBcIiBzdHlsZT1cInBhZGRpbmctdG9wOjgwcHg7XCI+JyArXG4gICAgICAgICAgICAgICAgYy52YWx1ZSArICc8L2Rpdj4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIGMudmFsdWUgPSAnPGRpdiBjbGFzcz1cImJveC1hbGVydC13cmFwXCI+PHA+JyArIGMudmFsdWUgKyAnPC9wPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi15ZXMgYnRuLWxvbmcgYnRuLWNsb3NlXCI+56Gu5a6aPC9idXR0b24+PHNwYW4+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1jYW5jZWwgYnRuLWxvbmcgYnRuLWdyYXkgYnRuLWNsb3NlXCI+5Y+W5raIPC9idXR0b24+PC9kaXY+JztcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIChjKSkge1xuICAgICAgICAgICAgYy50eXBlID0gYy50eXBlIHx8IFwiXCI7XG4gICAgICAgICAgICBzd2l0Y2ggKGMudHlwZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICBjYXNlICdpZCc6XG4gICAgICAgICAgICAgICAgLy8g5bCGSUTnmoTlhoXlrrnlpI3liLbov4fmnaXvvIzljp/mnaXnmoTov5jlnKjjgIJcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kKCQoJyMnICsgYy52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICQoJyMnICsgYy52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ltZyc6XG4gICAgICAgICAgICAgICAgZGl2Lmh0bWwoJ+WKoOi9veS4rS4uLicpO1xuICAgICAgICAgICAgICAgICQoJzxpbWcgYWx0PVwiXCIgLz4nKVxuICAgICAgICAgICAgICAgICAgICAubG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuZW1wdHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlc2V0UG9zKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBjLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgICAgICAgICAgZGl2Lmh0bWwoJ+WKoOi9veS4rS4uLicpO1xuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5odG1sKGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZXNldFBvcygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGl2Lmh0bWwoJ+WHuumUmeWVpicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpZnJhbWUnOlxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmQoJCgnPGlmcmFtZSBzcmM9XCInICsgYy52YWx1ZSArICdcIiB3aWR0aD0nICsgd2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAnIGhlaWdodD0nICsgaGVpZ2h0ICsgJyAvPicpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAhISB3aWR0aCAmJiBkaXYud2lkdGgod2lkdGgpOyAhISBoZWlnaHQgJiYgZGl2LmhlaWdodChoZWlnaHQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGl2Lmh0bWwoYy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXYuaHRtbChjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOS4u+WKqOaYvuekuuW8ueeql1xuICAgICAgICBpZiAoYy5zaG93ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdyhjLnNob3dlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYy5hbGVydCB8fCBjLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHRoZURpYWxvZy5maW5kKCcuYnRuLWNsb3NlJylcbiAgICAgICAgICAgICAgICAuYmluZCgnY2xpY2snLCB0aGlzLmNsb3NlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLrlr7nor53moYZcbiAgICAgKi9cbiAgICB0aGlzLnNob3cgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gb3B0aW9ucy5iZWZvcmVTaG93ICYmICFvcHRpb25zLmJlZm9yZVNob3coKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiOt+W+l+afkOS4gOWFg+e0oOeahOmAj+aYjuW6puOAgklF5LuO5ruk5aKD5Lit6I635b6X44CCXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gZmxvYXRcbiAgICAgICAgICovXG5cbiAgICAgICAgLyog5piv5ZCm5pi+56S66IOM5pmv6YGu572p5bGCICovXG4gICAgICAgIGlmIChvcHRpb25zLm1vZGFsKSB7XG4gICAgICAgICAgICAkKCcjJyArIG92ZXJsYXlJZClcbiAgICAgICAgICAgICAgICAuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoZURpYWxvZy5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuYWZ0ZXJTaG93KSB7XG4gICAgICAgICAgICBvcHRpb25zLmFmdGVyU2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGlzU2hvdyA9IHRydWU7XG4gICAgICAgIC8vIOiHquWKqOWFs+mXrSBcbiAgICAgICAgaWYgKDAgIT09IG9wdGlvbnMudGltZSkge1xuICAgICAgICAgICAgdGltZUlkID0gc2V0VGltZW91dCh0aGlzLmNsb3NlLCBvcHRpb25zLnRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRQb3MoKTtcblx0XHRcblx0XHQvLyDorr7nva5vdmVybGF56IOM5pmvXG5cdFx0aWYgKG9wdGlvbnMub3ZlcmxheSkge1xuXHRcdFx0JChcIi5kaWFsb2ctb3ZlcmxheVwiKS5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwiI0QzRDNEM1wiKTtcblx0XHR9XG5cbiAgICAgICAgLy/lm57osINcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgZCA9IHRoZURpYWxvZy5maW5kKFwiLkRjb250ZW50XCIpO1xuICAgICAgICAgICAgY2FsbGJhY2soZFswXSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgJCh3aW5kb3cpXG4gICAgICAgICAgICAua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB0YWcgPSBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFlLnRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodGFnID09PSAnaW5wdXQnIHx8IHRhZyA9PT0gJ3RleHRhcmVhJykge30gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgIH07XG4gICAgLypcbiAgICAgKiDpmpDol4/lr7nor53moYbjgILkvYblubbkuI3lj5bmtojnqpflj6PlhoXlrrnjgIJcbiAgICAgKi9cbiAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCFpc1Nob3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuYmVmb3JlSGlkZSAmJiAhb3B0aW9ucy5iZWZvcmVIaWRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoZURpYWxvZy5jc3MoJ2Rpc3BsYXknLCBcIm5vbmVcIik7XG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuYWZ0ZXJIaWRlKSB7XG4gICAgICAgICAgICBvcHRpb25zLmFmdGVySGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubW9kYWwpIHtcbiAgICAgICAgICAgICQoJyMnICsgb3ZlcmxheUlkKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCBcIm5vbmVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpc1Nob3cgPSBmYWxzZTtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63lr7nor53moYZcbiAgICAgKlxuICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAqL1xuICAgIHRoaXMuY2xvc2UgPSBmdW5jdGlvbiAoZSwgcmVhbCkge1xuICAgICAgICAkKFwiYm9keVwiKVxuICAgICAgICAgICAgLmZpbmQoXCIuZGlhbG9nXCIpXG4gICAgICAgICAgICAucmVtb3ZlKCk7XG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuYmVmb3JlQ2xvc2UgJiYgIW9wdGlvbnMuYmVmb3JlQ2xvc2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVhbCkge1xuICAgICAgICAgICAgdGhlRGlhbG9nLmZpbmQoXCIuRGNvbnRlbnQ6ZXEoMClcIilcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oXCJib2R5XCIpXG4gICAgICAgICAgICAgICAgLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoZURpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgaXNTaG93ID0gZmFsc2U7XG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuYWZ0ZXJDbG9zZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5hZnRlckNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5tb2RhbCkge1xuICAgICAgICAgICAgJCgnIycgKyBvdmVybGF5SWQpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVvdXQodGltZUlkKTtcbiAgICAgICAgJChcImJvZHlcIilcbiAgICAgICAgICAgIC5maW5kKFwiLkRjb250ZW50XCIpXG4gICAgICAgICAgICAucmVtb3ZlKCk7XG4gICAgfTtcblxuICAgIHRoaXMucmVzZXRPdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjJyArIG92ZXJsYXlJZClcbiAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICd3aWR0aCc6ICQod2luZG93KVxuICAgICAgICAgICAgICAgICAgICAud2lkdGgoKSArICQoZG9jdW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIC5zY3JvbGxMZWZ0KCksXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6ICQoZG9jdW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIC5oZWlnaHQoKSxcbiAgICAgICAgICAgICAgICAnbGVmdCc6IDAsXG4gICAgICAgICAgICAgICAgJ3RvcCc6IDBcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpbml0LmNhbGwodGhpcyk7XG4gICAgdGhpcy5zZXRDb250ZW50KGNvbnRlbnQpO1xuXG4gICAgRGlhbG9nLl9fY291bnQrKztcbiAgICBEaWFsb2cuX196aW5kZXgrKztcbn1cbm1vZHVsZS5leHBvcnRzID0gRGlhbG9nOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiDmlLbnm4rorqHnrpflmaggKGNjY0NhbGN1bGF0b3IpXG4gKlxuICogPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9tb2R1bGVzL2NjY0NhbGN1bGF0b3IuY3NzXCI+XG4gKiB2YXIgQ2FsID0gcmVxdWlyZSgnYXNzZXRzL2pzL21vZHVsZXMvY2NjQ2FsY3VsYXRvcicpO1xuICogQ2FsLmNyZWF0ZSgpO1xuICovXG52YXIgdXRpbHMgPSByZXF1aXJlKCdjY2MvZ2xvYmFsL2pzL2xpYi91dGlscycpO1xudmFyIHRwbCA9IHtcblx0d3JhcDogcmVxdWlyZSgnY2NjL2dsb2JhbC9wYXJ0aWFscy9tb2R1bGVzL2NjY0NhbGN1bGF0b3IuaHRtbCcpLFxuXHRsaXN0OiAne3sjZWFjaCBsaXN0fX1cXFxuXHRcdFx0PGRpdiBjbGFzcz1cImNsZWFyZml4IGJhY2tnci1mIHRkQ29udGVudFwiPlxcXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJjY2MtZiB0ZENlbGwgYmFja2dyLWZcIj57e2R1ZURhdGV9fTwvZGl2PlxcXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZENlbGwgYmFja2dyLWZcIj57e2Ftb3VudH19PC9kaXY+XFxcblx0XHRcdFx0PGRpdiBjbGFzcz1cInRkQ2VsbCBiYWNrZ3ItZlwiPnt7YW1vdW50UHJpbmNpcGFsfX08L2Rpdj5cXFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGRDZWxsIGJhY2tnci1mXCI+e3thbW91bnRJbnRlcmVzdH19PC9kaXY+XFxcblx0XHRcdFx0PGRpdiBjbGFzcz1cImNjYy1sIHRkQ2VsbCBiYWNrZ3ItZlwiPnt7YW1vdW50T3V0c3RhbmRpbmd9fTwvZGl2PlxcXG5cdFx0XHQ8L2Rpdj5cXFxuXHRcdHt7L2VhY2h9fSdcbn07XG5cbnZhciBEaWFsb2cgPSByZXF1aXJlKFwiY2NjL2dsb2JhbC9qcy9tb2R1bGVzL2NjY0JveFwiKTtcblxuLy8g57yT5a2Y6YOo5YiG5pWw5o2uXG53aW5kb3cuQ0NfQ0FDSEUgPSB7fTtcblxudmFyIHJlZyA9IC9eKFsxLTldW1xcZF17MCw3fXwwKSQvO1xudmFyIHJlZzEgPSAvXihbMS05XVtcXGRdezAsMX18MCkoXFwuW1xcZF17MSw4fSk/JC87XG5cbm1vZHVsZS5leHBvcnRzLmNyZWF0ZSA9IGZ1bmN0aW9uIChwKSB7XG4gICAgcCA9IHAgfHwge307XG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICB0aXRsZTogcC50aXRsZSB8fCAn5pS255uK6K6h566X5ZmoJyxcbiAgICAgICAgdHBsOiBwLnRwbCB8fCB0cGwud3JhcCxcbiAgICAgICAgd2lkdGg6IDg1MCxcbiAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgIHRvcDogJzIwJScsXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7fVxuICAgIH07XG5cbiAgICAkLmV4dGVuZChkZWZhdWx0cywgcCk7XG4gICAgdmFyIG8gPSBkZWZhdWx0cztcblxuICAgIC8vIGdldCBkYXRhXG4gICAgdmFyIHJlbmRlclB1cnBvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vdmFyIFAgPSBUKCd6aC1jbicpLmVudW1zLlJlcGF5bWVudE1ldGhvZDtcbiAgICAgICAgdmFyIF9vcHRpb24gPSAnJztcblx0XHRcblx0XHQkLmVhY2godXRpbHMuaTE4bi5SZXBheW1lbnRNZXRob2QsIGZ1bmN0aW9uKGssIHYpIHtcblx0XHRcdF9vcHRpb24gKz0gJzxvcHRpb24gdmFsdWU9XCInICsgayArICdcIj4nICsgdlswXSArICc8L29wdGlvbj4nO1xuXHRcdH0pO1xuXHRcdFxuICAgICAgICAvL+i/h+a7pOi/mOasvuaWueW8j1xuICAgICAgICByZXR1cm4gJzxvcHRpb24gdmFsdWU9XCJFcXVhbEluc3RhbGxtZW50XCI+5oyJ5pyI562J6aKd5pys5oGvPC9vcHRpb24+XFxcblx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkVxdWFsUHJpbmNpcGFsXCI+5oyJ5pyI562J6aKd5pys6YeRPC9vcHRpb24+XFxcblx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIk1vbnRobHlJbnRlcmVzdFwiPuaMieaciOS7mOaBr+WIsOacn+i/mOacrDwvb3B0aW9uPlxcXG5cdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJCdWxsZXRSZXBheW1lbnRcIj7kuIDmrKHmgKfov5jmnKzku5jmga88L29wdGlvbj4nO1xuICAgIH07XG5cbiAgICBpZiAoIUNDX0NBQ0hFLm9wdGlvbnMpIHtcbiAgICAgICAgQ0NfQ0FDSEUub3B0aW9ucyA9IHJlbmRlclB1cnBvc2UoKTtcbiAgICB9XG5cbiAgICBuZXcgRGlhbG9nKHtcbiAgICAgICAgdGl0bGU6IG8udGl0bGUsXG4gICAgICAgIHZhbHVlOiBvLnRwbCxcbiAgICAgICAgd2lkdGg6IG8ud2lkdGgsXG4gICAgICAgIGhlaWdodDogby5oZWlnaHQsXG4gICAgICAgIHRvcDogby50b3AsXG4gICAgICAgIHNob3dlZDogZnVuY3Rpb24gKGVsZSwgYm94KSB7XG5cdFx0XHQvLyBzZXQgbGlzdCB0cGxcblx0XHRcdC8vdHBsLmxpc3QgPSAkKGVsZSkuZmluZCgnLmNjYy1jYWxjdWxhdG9yLXRwbC1saXN0JykuaHRtbCgpO1xuXHRcdFx0XG4gICAgICAgICAgICB2YXIgZGF0ZV9jYWwgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdmFyIGRhdGVfY2FsMSA9IG5ldyBEYXRlKGRhdGVfY2FsKTtcbiAgICAgICAgICAgIGRhdGVfY2FsMS5zZXREYXRlKGRhdGVfY2FsLmdldERhdGUoKSArIDMpO1xuICAgICAgICAgICAgdmFyIGxhc3RfZGF0ZSA9IGRhdGVfY2FsMS5nZXRGdWxsWWVhcigpICsgJy0nICsgKGRhdGVfY2FsMS5nZXRNb250aCgpICsgMSkgKyAnLScgKyBkYXRlX2NhbDEuZ2V0RGF0ZSgpO1xuXHRcdFx0XG4gICAgICAgICAgICAvLyByZW5kZXIgb3B0aW9uc1xuICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ3NlbGVjdFtuYW1lPXBheW1lbnRNZXRob2RdJylcbiAgICAgICAgICAgICAgICAuaHRtbChDQ19DQUNIRS5vcHRpb25zKTtcbiAgICAgICAgICAgICQoZWxlKVxuICAgICAgICAgICAgICAgIC5maW5kKCdmb3JtW25hbWU9Y2NDYWxjdWxhdG9yRm9ybV0nKVxuICAgICAgICAgICAgICAgIC5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUgJiYgZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFzID0gJHRoaXMuc2VyaWFsaXplQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5jID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJyNjYy1jYWwtbGlzdC13cCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJzxwPicgKyBtc2cgKyAnPC9wPicpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhc1tpXS5uYW1lID09PSAncGF5bWVudE1ldGhvZCcpIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsVmFsdWUgPSBkYXRhc1tpXS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0xlZ2FsID0gcmVnLnRlc3QoY2FsVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleCA9ICQoZWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdbbmFtZT0nICsgZGF0YXNbaV0ubmFtZSArICddJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxWYWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ1tuYW1lPScgKyBkYXRhc1tpXS5uYW1lICsgJ10nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ25jJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmMoJ+ivt+i+k+WFpScgKyB0ZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzTGVnYWwgJiYgZGF0YXNbaV0ubmFtZSAhPT0gJ2FubnVhbFJhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdbbmFtZT0nICsgZGF0YXNbaV0ubmFtZSArICddJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCduYycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhc1tpXS5uYW1lID09PSAnYW1vdW50VmFsdWUnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbFZhbHVlID4gOTk5OTk5OTkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmModGV4ICsgJ+S4jeiDvei2hei/hzjkvY3mlbDlrZcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYyh0ZXggKyAn5b+F6aG75Li65pW05pWwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YXNbaV0ubmFtZSA9PT0gJ2FubnVhbFJhdGUnICYmICFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWcxLnRlc3QoY2FsVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdbbmFtZT0nICsgZGF0YXNbaV0ubmFtZSArICddJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCduYycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5jKHRleCArICflv4XpobvkuLrlsI/kuo4xMDDnmoTmlbDlrZcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnW25hbWU9JyArIGRhdGFzW2ldLm5hbWUgKyAnXScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbmMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciAkcG9zdEJ0biA9ICQoZWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idG4tY2FsJyk7XG4gICAgICAgICAgICAgICAgICAgICRwb3N0QnRuLmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn6K6h566X5Lit4oCmJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcvYXBpL3YyL2xvYW4vcmVxdWVzdC9hbmFseXNlJztcbiAgICAgICAgICAgICAgICAgICAgJC5wb3N0KHVybCwgZGF0YXMsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwb3N0QnRuLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCforqHnrpfmlLbnm4onKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5UYW1vdW50JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocmVzLmRhdGEuaW50ZXJlc3QgKyByZXMuZGF0YS5wcmluY2lwYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLkZhbW91bnQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgn77+lJyArIHV0aWxzLmZvcm1hdC5hbW91bnQoKHJlcy5kYXRhLmludGVyZXN0ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZGF0YS5wcmluY2lwYWwpLCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJwYWRkaW5nLWxlZnQ6MjBweDtcIj7lgYforr7otbfmga/ml6XkuLonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfZGF0ZSArICc8L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuVGFtb3VudFByaW5jaXBhbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHJlcy5kYXRhLnByaW5jaXBhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuVGFtb3VudEludGVyZXN0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocmVzLmRhdGEuaW50ZXJlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNjLXRhbGJlLXRvdGFsJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKGVsZSkuZmluZCgnLkZyYXRlJykudGV4dChkYXRhc1syXS52YWx1ZSsnJScpO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0bmV3IFJhY3RpdmUoe1xuXHRcdFx0XHRcdFx0XHRcdGVsOiAkKGVsZSkuZmluZCgnI2NjLWNhbC1saXN0LXdwJyksXG5cdFx0XHRcdFx0XHRcdFx0dGVtcGxhdGU6IHRwbC5saXN0LFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3Q6IHJlcy5kYXRhLnJlcGF5bWVudHNcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYygn6K+35rGC5Ye66ZSZficpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcG9zdEJ0bi5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn6K6h566X5pS255uKJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmMoJ+ivt+axguWHuumUmX4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgby5jYWxsYmFjayhlbGUsIGJveCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9jY2MvZ2xvYmFsL2Nzcy9tb2R1bGVzL2NjY0NhbGN1bGF0b3IuY3NzXCI+XFxuPGRpdiBjbGFzcz1cImNjLWNhbGN1bGF0b3Itd3BcIj5cXG4gICAgPGRpdiBjbGFzcz1cImNhbGN1bGF0b3ItdGl0bGVcIj5cXG4gICAgICAgIDxwIGNsYXNzPVwiY2FsY3VsYXRvci10aXRsZS1sZWZ0XCI+5pS255uK6K6h566X5ZmoPC9wPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbGN1bGF0b3ItbGluZVwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTRcIiBzdHlsZT1cIndpZHRoOjMzJTtmbG9hdDpsZWZ0O1wiPlxcbiAgICAgICAgICAgIDxmb3JtIG5hbWU9XCJjY0NhbGN1bGF0b3JGb3JtXCIgY2xhc3M9XCJmb3JtLWhvcml6b250YWxcIiByb2xlPVwiZm9ybVwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNjLWNhbC1mMlwiIGNsYXNzPVwiY29sLXNtLTQgY29udHJvbC1sYWJlbFwiPuaKlei1hOmHkeminTwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLThcIiBzdHlsZT1cImZsb2F0OnJpZ2h0O21hcmdpbi10b3A6LTMwcHg7XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImNjLWNhbC1mMlwiIG5hbWU9XCJhbW91bnRWYWx1ZVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCLmgqjnmoTmipXotYTph5Hpop1cIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7lhYM8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2MtY2FsLWYzXCIgY2xhc3M9XCJjb2wtc20tNCBjb250cm9sLWxhYmVsXCIgcGxhY2Vob2xkZXI9XCJcIj7mipXotYTmnJ/pmZA8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS04XCIgc3R5bGU9XCJmbG9hdDpyaWdodDttYXJnaW4tdG9wOi0zMHB4O1wiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJjYy1jYWwtZjNcIiBuYW1lPVwiZHVlTW9udGhcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwi5pyf5pyb5pe26Ze06ZW/5bqmXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+5pyIPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNjLWNhbC1mNFwiIGNsYXNzPVwiY29sLXNtLTQgY29udHJvbC1sYWJlbFwiPuW5tOWMluWIqeeOhzwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLThcIiBzdHlsZT1cImZsb2F0OnJpZ2h0O21hcmdpbi10b3A6LTMwcHg7XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImNjLWNhbC1mNFwiIG5hbWU9XCJhbm51YWxSYXRlXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIuW5tOWMluWIqeeOh1wiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiU8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2MtY2FsLWY1XCIgY2xhc3M9XCJjb2wtc20tNCBjb250cm9sLWxhYmVsXCI+6L+Y5qy+5pa55byPPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOFwiIHN0eWxlPVwiZmxvYXQ6cmlnaHQ7bWFyZ2luLXRvcDotMzBweDtcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cInBheW1lbnRNZXRob2RcIiBpZD1cImNjLWNhbC1mNVwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+bG9hZGluZy4uLjwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS1vZmZzZXQtNCBjb2wtc20tOFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1vcmFuZ2UgYnRuLWNhbFwiPuiuoeeul+aUtuebijwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCIgY2xhc3M9XCJyZXNldFwiPumHjee9rjwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZm9ybT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC04XCIgc3R5bGU9XCJ3aWR0aDo2NCU7ZmxvYXQ6bGVmdDtcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtY2FsLXJlc3VsdHMtYm94XCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYy1yZXMgdGFibGUgdGFibGUtYm9yZGVyZWQxIHRkQ29udGVudFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjYy1mIHRkQ2VsbFwiPuaUtuasvuaXpeacnzwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRkQ2VsbFwiPuaUtuasvumHkeminTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRkQ2VsbFwiPuaUtuWbnuacrOmHkTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRkQ2VsbFwiPuaUtuWbnuWIqeaBrzwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjYy1sIHRkQ2VsbFwiPuWJqeS9meacrOmHkTwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjLXJlcyBjYy10YWJsZS1jb250YWluZXJcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV93cmFwXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWhvdmVyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjYy1jYWwtbGlzdC13cFwiPlxcblxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjLXJlcyB0YWJsZS1ib3JkZXJlZDEgY2MtdGFsYmUtdG90YWwgaGlkZVwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImNjLWNhbC10b3RhbCB0YWJsZS1ib3JkZXJlZDEgdGRDb250ZW50XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjLXRvdGFsLXRyIGNsZWFyZml4IGNjLXRvdGFsLXRyLWJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjYy1mIHRkQ2VsbFwiPuaAu+iuoTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiVGFtb3VudCB0ZENlbGxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIlRhbW91bnRQcmluY2lwYWwgdGRDZWxsXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJUYW1vdW50SW50ZXJlc3QgdGRDZWxsXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjY2MtbCBUYW1vdW50T3V0c3RhbmRpbmcgdGRDZWxsXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjLXRvdGFsXCI+XFxuICAgICAgICAgICAgICAgIDxzcGFuPuacrOaBr+WQiOiuoe+8mjxlbSBjbGFzcz1cIkZhbW91bnRcIj48L2VtPjwvc3Bhbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L2Rpdj4nOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAnemgtY24nOiByZXF1aXJlKCcuL3poLWNuJylcbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJlbnVtc1wiOiB7XG4gICAgXCJGdW5kUmVjb3JkVHlwZVwiOiB7XG4gICAgICBcIklOVkVTVFwiOiBcIuaKleagh1wiLFxuICAgICAgXCJXSVRIRFJBV1wiOiBcIuWPlueOsFwiLFxuICAgICAgXCJERVBPU0lUXCI6IFwi5YWF5YC8XCIsXG4gICAgICBcIkxPQU5cIjogXCLmlL7mrL5cIixcbiAgICAgIFwiTE9BTl9SRVBBWVwiOiBcIui0t+asvui/mOasvlwiLFxuICAgICAgXCJESVNCVVJTRVwiOiBcIuWeq+S7mOi/mOasvlwiLFxuICAgICAgXCJJTlZFU1RfUkVQQVlcIjogXCLmipXotYTov5jmrL5cIixcbiAgICAgIFwiQ1JFRElUX0FTU0lHTlwiOiBcIuWAuuadg+i9rOiuqVwiLFxuICAgICAgXCJUUkFOU0ZFUlwiOiBcIui9rOi0puaJo+asvlwiLFxuICAgICAgXCJSRVdBUkRfUkVHSVNURVJcIjogXCLms6jlhozlpZblirFcIixcbiAgICAgIFwiUkVXQVJEX0lOVkVTVFwiOiBcIuaKleagh+WlluWKsVwiLFxuICAgICAgXCJSRVdBUkRfREVQT1NJVFwiOiBcIuWFheWAvOWlluWKsVwiLFxuICAgICAgXCJGRUVfV0lUSERSQVdcIjogXCLmj5DnjrDmiYvnu63otLlcIixcbiAgICAgIFwiRkVFX0FVVEhFTlRJQ0FURVwiOiBcIui6q+S7vemqjOivgeaJi+e7rei0uVwiLFxuICAgICAgXCJGRUVfSU5WRVNUX0lOVEVSRVNUXCI6IFwi5Zue5qy+5Yip5oGv566h55CG6LS5XCIsXG4gICAgICBcIkZFRV9MT0FOX1NFUlZJQ0VcIjogXCLlgJ/mrL7mnI3liqHotLlcIixcbiAgICAgIFwiRkVFX0xPQU5fTUFOQUdFXCI6IFwi5YCf5qy+566h55CG6LS5XCIsXG4gICAgICBcIkZFRV9MT0FOX0lOVEVSRVNUXCI6IFwi6L+Y5qy+5Yip5oGv566h55CG6LS5XCIsXG4gICAgICBcIkZFRV9MT0FOX1ZJU0lUXCI6IFwi5a6e5Zyw6ICD5a+f6LS5XCIsXG4gICAgICBcIkZFRV9MT0FOX0dVQVJBTlRFRVwiOiBcIuaLheS/nei0uVwiLFxuICAgICAgXCJGRUVfTE9BTl9SSVNLXCI6IFwi6aOO6Zmp566h55CG6LS5XCIsXG4gICAgICBcIkZFRV9MT0FOX09WRVJEVUVcIjogXCLpgL7mnJ/nrqHnkIbotLlcIixcbiAgICAgIFwiRkVFX0xPQU5fUEVOQUxUWVwiOiBcIumAvuacn+e9muaBryjnu5nllYbmiLcpXCIsXG4gICAgICBcIkZFRV9MT0FOX1BFTkFMVFlfSU5WRVNUXCI6IFwi6YC+5pyf572a5oGvKOe7meaKlei1hOS6uilcIixcbiAgICAgIFwiRkVFX0RFUE9TSVRcIjogXCLlhYXlgLzmiYvnu63otLlcIixcbiAgICAgIFwiRkVFX0FEVkFOQ0VfUkVQQVlcIjogXCLmj5DliY3ov5jmrL7ov53nuqbph5Eo57uZ5ZWG5oi3KVwiLFxuICAgICAgXCJGRUVfQURWQU5DRV9SRVBBWV9JTlZFU1RcIjogXCLmj5DliY3ov5jmrL7ov53nuqbph5Eo57uZ5oqV6LWE5Lq6KVwiLFxuICAgICAgXCJGU1NcIjogXCLnlJ/liKnlrp1cIlxuICAgIH0sXG4gICAgXCJGdW5kUmVjb3JkT3BlcmF0aW9uXCI6IHtcbiAgICAgIFwiRlJFRVpFXCI6IFwi5Ya757uTXCIsXG4gICAgICBcIlJFTEVBU0VcIjogXCLop6PlhrtcIixcbiAgICAgIFwiSU5cIjogXCLotYTph5HovazlhaVcIixcbiAgICAgIFwiT1VUXCI6IFwi6LWE6YeR6L2s5Ye6XCJcbiAgICB9LFxuICAgIFwiRnVuZFJlY29yZFN0YXR1c1wiOiB7XG4gICAgICBcIklOSVRJQUxJWkVEXCI6IFwi5Yid5aeLXCIsXG4gICAgICBcIlBST0NFU1NJTkdcIjogXCLlpITnkIbkuK1cIixcbiAgICAgIFwiQVVESVRJTkdcIjogXCLlrqHmoLjkuK1cIixcbiAgICAgIFwiU1VDQ0VTU0ZVTFwiOiBcIuaIkOWKn1wiLFxuICAgICAgXCJGQUlMRURcIjogXCLlpLHotKVcIixcbiAgICAgIFwiUkVKRUNURURcIjogXCLmi5Lnu51cIixcbiAgICAgIFwiQ0FOQ0VMRURcIjogXCLlj5bmtohcIlxuICAgIH0sXG4gICAgXCJNYXJpdGFsU3RhdHVzXCI6IHtcbiAgICAgIFwiTUFSUklFRFwiOiBcIuW3suWpmlwiLFxuICAgICAgXCJTSU5HTEVcIjogXCLmnKrlqZpcIixcbiAgICAgIFwiRElWT1JDRURcIjogXCLnprvlvIJcIixcbiAgICAgIFwiV0lET1dFRFwiOiBcIuS4p+WBtlwiXG4gICAgfSxcbiAgICBcIkVkdWNhdGlvbkxldmVsXCI6IHtcbiAgICAgIFwiSElHSFNDSE9PTFwiOiBcIumrmOS4reWPiuS7peS4i1wiLFxuICAgICAgXCJURUNITklDQUxTQ0hPT0xcIjogXCLkuK3kuJNcIixcbiAgICAgIFwiSlVOSU9SQ09MTEVHRVwiOiBcIuWkp+S4k1wiLFxuICAgICAgXCJVTkRFUkdSQURVQVRFXCI6IFwi5pys56eRXCIsXG4gICAgICBcIk1BU1RFUlwiOiBcIuehleWjq1wiLFxuICAgICAgXCJET0NUT1JcIjogXCLljZrlo6tcIlxuICAgIH0sXG4gICAgXCJDYXJlZXJTdGF0dXNcIjoge1xuICAgICAgXCJFTVBMT1lFRVwiOiBcIuaZrumAmuWRmOW3pVwiLFxuICAgICAgXCJNQU5BR0VSXCI6IFwi566h55CG5Lq65ZGYXCIsXG4gICAgICBcIlNIQVJFSE9MREVSXCI6IFwi6IKh5LicXCIsXG4gICAgICBcIlBSSVZBVEVfRU5UUkVQUkVORVVSXCI6IFwi56eB6JCl5LyB5Lia5Li7XCIsXG4gICAgICBcIk9USEVSXCI6IFwi5YW25LuWXCJcbiAgICB9LFxuICAgIFwiQ29tcGFueVR5cGVcIjoge1xuICAgICAgXCJHT1ZFUk5NRU5UX09GRklDRVNcIjogXCLlm73lrrblj4rlnLDmlrnmlL/lupzooYzmlL/mnLrmnoRcIixcbiAgICAgIFwiUFVCTElDX0lOU1RJVFVUSU9OXCI6IFwi5LqL5Lia5Y2V5L2NXCIsXG4gICAgICBcIkVEVUNBVElPTl9SRVNFQVJDSF9JTlNUSVRVVElPTlwiOiBcIuWtpuagoeWPiuenkeeglOacuuaehFwiLFxuICAgICAgXCJTVEFURU9XTkVEX0tFWV9FTlRFUlBSSVNFU1wiOiBcIuWkruS8gSjljIXmi6zkuIvnuqfljZXkvY0pXCIsXG4gICAgICBcIlNUQVRFT1dORURfRU5URVJQUklTRVNcIjogXCLkuIDoiKzlm73kvIEo5YyF5ous5LiL57qn5Y2V5L2NKVwiLFxuICAgICAgXCJPVkVSU0VBU19GVU5ERURfRU5URVJQUklTRVNcIjogXCLlpJbotYTkvIHkuJpcIixcbiAgICAgIFwiVEFJV0FOX0hPTkdLT05HX01BQ0FVXCI6IFwi5Y+w5riv5r6z5LyB5LiaXCIsXG4gICAgICBcIkpPSU5UX1ZFTlRVUkVcIjogXCLlkIjotYTkvIHkuJpcIixcbiAgICAgIFwiUFJJVkFURV9FTlRFUlBSSVNFU1wiOiBcIuawkeiQpeS8geS4mlwiLFxuICAgICAgXCJTRUxGX0VNUExPWUVEXCI6IFwi5Liq5L2T57uP6JClXCIsXG4gICAgICBcIk9USEVSXCI6IFwi5YW25LuWXCJcbiAgICB9LFxuICAgIFwiQ29tcGFueUluZHVzdHJ5XCI6IHtcbiAgICAgIFwiRVhDQVZBVEVcIjogXCLph4fmjpjkuJpcIixcbiAgICAgIFwiR0VPX1NVUlZFWVwiOiBcIuWcsOi0qOWLmOafpeS4mlwiLFxuICAgICAgXCJSRVNFQVJDSFwiOiBcIuenkeWtpueglOepti/mioDmnK/mnI3liqFcIixcbiAgICAgIFwiSVJSSUdBVElPTl9FTlZJUk9OTUVOVFwiOiBcIuawtOWIqS/njq/looMv5YWs5YWx6K6+5pa9566h55CGXCIsXG4gICAgICBcIlJFTlRBTFwiOiBcIuenn+i1gS/llYbliqHmnI3liqFcIixcbiAgICAgIFwiTUlMSVRBUllcIjogXCLlhpvpmJ8v5q2m6K2mXCIsXG4gICAgICBcIklOVEVSTkFUSU9OQUxcIjogXCLlm73pmYXnu4Tnu4dcIixcbiAgICAgIFwiTUFOVUZBQ1RVUkVcIjogXCLliLbpgKDkuJpcIixcbiAgICAgIFwiSVRcIjogXCLnlLXkv6Ev6YCa5L+hL+iuoeeul+acui/ova/ku7Yv5LqS6IGU572RXCIsXG4gICAgICBcIkdPVkVSTk1FTlRcIjogXCLlm73lrrbmnLrlhbMv5pS/5YWa5py65YWzL+ekvuS8muWbouS9k1wiLFxuICAgICAgXCJNRURJQV9BRFZFUlRJU0VNRU5UXCI6IFwi5aqS5L2TL+W5v+WRii/lub/mkq0v55S15b2xL+eUteinhlwiLFxuICAgICAgXCJSRVRBSUxfV0hPTEVTQUxFXCI6IFwi6Zu25ZSuL+aJueWPkVwiLFxuICAgICAgXCJFRFVDQVRJT05fVFJBSU5JTkdcIjogXCLmlZnogrIv5Z+56K6tIFwiLFxuICAgICAgXCJQVUJMSUNfU0VSVklDRVNcIjogXCLnpL7kvJrmnI3liqHkuJpcIixcbiAgICAgIFwiRklOQU5DRV9MQVdcIjogXCLph5Hono0v5L+d6ZmpL+azleW+i1wiLFxuICAgICAgXCJUUkFOU1BPUlRBVElPTlwiOiBcIuS6pOmAmui/kOi+ky/ku5Plgqgv6YKu5pS/XCIsXG4gICAgICBcIlJFQUxfRVNUQVRFXCI6IFwi5oi/5Zyw5Lqn5LiaXCIsXG4gICAgICBcIkVORVJHWVwiOiBcIuawtC/nlLUv54WkL+awlC/og73mupDnlJ/kuqfkvpvlupRcIixcbiAgICAgIFwiQ0FURVJJTkdfSE9URUxcIjogXCLkvY/lrr8v6aSQ6aWuXCIsXG4gICAgICBcIk1FRElDQUxfSEVBTFRIX0NBUkVcIjogXCLljLvnlpcv5Y2r55SfL+S/neWBpVwiLFxuICAgICAgXCJDT05TVFJVQ1RJT05fRU5HSU5FUlJJTkdcIjogXCLlu7rnrZEv5bel56iLXCIsXG4gICAgICBcIkFHUklDVUxUVVJFXCI6IFwi5YacL+aely/niacv5riUXCIsXG4gICAgICBcIkVOVEVSVEFJTUVOVFwiOiBcIuaWh+WMli/lqLHkuZDmnI3liqHkuJpcIixcbiAgICAgIFwiU1BPUlRfQVJUXCI6IFwi5L2T6IKyL+iJuuacr1wiLFxuICAgICAgXCJVVElMSVRZXCI6IFwi56S+5Lya56aP5YipL+WFrOebiuS6i+S4mlwiLFxuICAgICAgXCJPVEhFUlwiOiBcIuWFtuS7llwiXG4gICAgfSxcbiAgICBcIkNvbXBhbnlTaXplXCI6IHtcbiAgICAgIFwiU0laRV9CRUxPV18xMFwiOiBcIjEw5Lq65Lul5LiLXCIsXG4gICAgICBcIlNJWkVfMTFfMTAwXCI6IFwiMTHvuaMxMDDkurpcIixcbiAgICAgIFwiU0laRV8xMDFfNTAwXCI6IFwiMTAx77mjNTAw5Lq6XCIsXG4gICAgICBcIlNJWkVfNTAxXzIwMDBcIjogXCI1MDEtMjAwMOS6ulwiLFxuICAgICAgXCJTSVpFXzIwMDFfMTAwMDBcIjogXCIyMDAxLTEwMDAw5Lq6XCIsXG4gICAgICBcIlNJWkVfMTAwMDFfMTAwMDAwXCI6IFwiMTAwMDDkurrku6XkuIpcIlxuICAgIH0sXG4gICAgXCJNb250aGx5U2FsYXJ5XCI6IHtcbiAgICAgIFwiU0FMQVJZX0JFTE9XXzIwMDBcIjogXCIyMDAw5Lul5LiLXCIsXG4gICAgICBcIlNBTEFSWV8yMDAxXzUwMDAwXCI6IFwiMjAwMe+5ozUwMDBcIixcbiAgICAgIFwiU0FMQVJZXzUwMDFfMTAwMDBcIjogXCI1MDAx77mjMTAwMDBcIixcbiAgICAgIFwiU0FMQVJZXzEwMDAxXzIwMDAwXCI6IFwiMTAwMDHvuaMyMDAwMFwiLFxuICAgICAgXCJTQUxBUllfMjAwMDFfNTAwMDBcIjogXCIyMDAwMe+5ozUwMDAwXCIsXG4gICAgICBcIlNBTEFSWV9BQk9WRV81MDAwMVwiOiBcIjUwMDAx5Lul5LiKXCJcbiAgICB9LFxuICAgIFwiWWVhck9mU2VydmljZVwiOiB7XG4gICAgICBcIllFQVJfQkVMT1dfMVwiOiBcIjHlubTku6XkuItcIixcbiAgICAgIFwiWUVBUl8xXzNcIjogXCIxLTPlubQo5ZCrKVwiLFxuICAgICAgXCJZRUFSXzNfNVwiOiBcIjMtNeW5tCjlkKspXCIsXG4gICAgICBcIllFQVJfNV8xMFwiOiBcIjUtMTDlubQo5ZCrKVwiLFxuICAgICAgXCJZRUFSXzEwXzIwXCI6IFwiMTAtMjDlubQo5ZCrKVwiLFxuICAgICAgXCJZRUFSX0FCT1ZFXzIwXCI6IFwiMjDlubTku6XkuIpcIlxuICAgIH0sXG4gICAgXCJFdGhuaWNHcm91cFwiOiB7XG4gICAgICBcIkhhblwiOiBcIuaxieaXj1wiLFxuICAgICAgXCJaaHVhbmdcIjogXCLlo67ml49cIixcbiAgICAgIFwiTWFuY2h1XCI6IFwi5ruh5pePXCIsXG4gICAgICBcIkh1aVwiOiBcIuWbnuaXj1wiLFxuICAgICAgXCJNaWFvXCI6IFwi6IuX5pePXCIsXG4gICAgICBcIlVpZ2h1clwiOiBcIue7tOWQvuWwlOaXj1wiLFxuICAgICAgXCJZaVwiOiBcIuW9neaXj1wiLFxuICAgICAgXCJUdWppYVwiOiBcIuWcn+WutuaXj1wiLFxuICAgICAgXCJNb25nb2xcIjogXCLokpnlj6Tml49cIixcbiAgICAgIFwiVGliZXRhblwiOiBcIuiXj+aXj1wiLFxuICAgICAgXCJCdXlpXCI6IFwi5biD5L6d5pePXCIsXG4gICAgICBcIkRvbmdcIjogXCLkvpfml49cIixcbiAgICAgIFwiWWFvXCI6IFwi55G25pePXCIsXG4gICAgICBcIktvcmVhblwiOiBcIuacnemynOaXj1wiLFxuICAgICAgXCJCYWlcIjogXCLnmb3ml49cIixcbiAgICAgIFwiSGFuaVwiOiBcIuWTiOWwvOaXj1wiLFxuICAgICAgXCJMaVwiOiBcIum7juaXj1wiLFxuICAgICAgXCJLYXpha2hcIjogXCLlk4jokKjlhYvml49cIixcbiAgICAgIFwiRGFpXCI6IFwi5YKj5pePXCIsXG4gICAgICBcIlNoZVwiOiBcIueVsuaXj1wiLFxuICAgICAgXCJMaXN1XCI6IFwi5YOz5YOz5pePXCIsXG4gICAgICBcIkdlbGFvXCI6IFwi5Luh5L2s5pePXCIsXG4gICAgICBcIkxhaHVcIjogXCLmi4nnpZzml49cIixcbiAgICAgIFwiRG9uZ3hpYW5nXCI6IFwi5Lic5Lmh5pePXCIsXG4gICAgICBcIldhXCI6IFwi5L2k5pePXCIsXG4gICAgICBcIlNodWlcIjogXCLmsLTml49cIixcbiAgICAgIFwiTmF4aVwiOiBcIue6s+ilv+aXj1wiLFxuICAgICAgXCJRaWFuZ1wiOiBcIue+jOaXj1wiLFxuICAgICAgXCJEdVwiOiBcIuWcn+aXj1wiLFxuICAgICAgXCJYaWJlXCI6IFwi6ZSh5Lyv5pePXCIsXG4gICAgICBcIk11bGFtXCI6IFwi5Lur5L2s5pePXCIsXG4gICAgICBcIktpcmdoaXpcIjogXCLmn6/lsJTlhYvlrZzml49cIixcbiAgICAgIFwiRGF1clwiOiBcIui+vuaWoeWwlOaXj1wiLFxuICAgICAgXCJKaW5ncG9cIjogXCLmma/poofml49cIixcbiAgICAgIFwiU2FsYXJcIjogXCLmkpLmi4nml49cIixcbiAgICAgIFwiQmxhbmdcIjogXCLluIPmnJfml49cIixcbiAgICAgIFwiTWFvbmFuXCI6IFwi5q+b5Y2X5pePXCIsXG4gICAgICBcIlRhamlrXCI6IFwi5aGU5ZCJ5YWL5pePXCIsXG4gICAgICBcIlB1bWlcIjogXCLmma7nsbPml49cIixcbiAgICAgIFwiQWNoYW5nXCI6IFwi6Zi/5piM5pePXCIsXG4gICAgICBcIk51XCI6IFwi5oCS5pePXCIsXG4gICAgICBcIkV2ZW5raVwiOiBcIumEgua4qeWFi+aXj1wiLFxuICAgICAgXCJHaW5cIjogXCLkuqzml49cIixcbiAgICAgIFwiSmlub1wiOiBcIuWfuuivuuaXj1wiLFxuICAgICAgXCJEZWFuZ1wiOiBcIuW+t+aYguaXj1wiLFxuICAgICAgXCJVemJla1wiOiBcIuS5jOWtnOWIq+WFi+aXj1wiLFxuICAgICAgXCJSdXNzaWFuXCI6IFwi5L+E572X5pav5pePXCIsXG4gICAgICBcIll1Z3VyXCI6IFwi6KOV5Zu65pePXCIsXG4gICAgICBcIkJvbmFuXCI6IFwi5L+d5a6J5pePXCIsXG4gICAgICBcIk1lbmJhXCI6IFwi6Zeo5be05pePXCIsXG4gICAgICBcIk9yb3FpblwiOiBcIumEguS8puaYpeaXj1wiLFxuICAgICAgXCJEcnVuZ1wiOiBcIueLrOm+meaXj1wiLFxuICAgICAgXCJUYXRhclwiOiBcIuWhlOWhlOWwlOaXj1wiLFxuICAgICAgXCJIZXpoZW5cIjogXCLotavlk7Lml49cIixcbiAgICAgIFwiTGhvYmFcIjogXCLnj57lt7Tml49cIixcbiAgICAgIFwiR2Fvc2hhblwiOiBcIumrmOWxseaXj1wiXG4gICAgfSxcbiAgICBcIk1hcml0YWxTdGF0dXNcIjoge1xuICAgICAgXCJNQVJSSUVEXCI6IFwi5bey5amaXCIsXG4gICAgICBcIlNJTkdMRVwiOiBcIuacquWpmlwiLFxuICAgICAgXCJESVZPUkNFRFwiOiBcIuemu+W8glwiLFxuICAgICAgXCJXSURPV0VEXCI6IFwi5Lin5YG2XCJcbiAgICB9LFxuICAgIFwiQ2VydGlmaWNhdGVUeXBlXCI6IHtcbiAgICAgIFwiSURcIjogXCLouqvku73orqTor4FcIixcbiAgICAgIFwiQ1JFRElUUkVQT1JUXCI6IFwi5L+h55So5oql5ZGKXCIsXG4gICAgICBcIkZBTUlMWVwiOiBcIuWutuW6reaDheWGteiupOivgVwiLFxuICAgICAgXCJFRFVDQVRJT05cIjogXCLlrabljoborqTor4FcIixcbiAgICAgIFwiSU5DT01FXCI6IFwi5pS25YWl6K6k6K+BXCIsXG4gICAgICBcIkNBUkVFUlwiOiBcIuW3peS9nOiupOivgVwiLFxuICAgICAgXCJSRUFMRVNUQVRFXCI6IFwi5oi/5Lqn6K6k6K+BXCIsXG4gICAgICBcIkxPQ0FUSU9OXCI6IFwi5bGF5L2P5Zyw6K6k6K+BXCIsXG4gICAgICBcIlZFSElDTEVcIjogXCLotK3ovaborqTor4FcIixcbiAgICAgIFwiTE9BTlBVUlBPU0VcIjogXCLlgJ/mrL7nlKjpgJTorqTor4FcIixcbiAgICAgIFwiR1VBUkFOVEVFXCI6IFwi5ouF5L+d6K6k6K+BXCIsXG4gICAgICBcIk9USEVSU1wiOiBcIuWFtuS7luiupOivgVwiXG4gICAgfSxcbiAgICBcIkNlcnRpZmljYXRlU3RhdHVzXCI6IHtcbiAgICAgIFwiVU5DSEVDS0VEXCI6IFwi5pyq5a6h5qC4XCIsXG4gICAgICBcIkNIRUNLRURcIjogXCLlrqHmoLjpgJrov4dcIixcbiAgICAgIFwiREVOSUVEXCI6IFwi5a6h5qC45pyq6YCa6L+HXCIsXG4gICAgICBcIkFSQ0hJVkVEXCI6IFwi5bey5a2Y5qGjXCIsXG4gICAgICBcIkRFTEVURURcIjogXCLlt7LliKrpmaRcIlxuICAgIH0sXG4gICAgXCJQcm9vZlR5cGVcIjoge1xuICAgICAgXCJJRF9DQVJEXCI6IFtcIui6q+S7veivgVwiLCBcIklEXCJdLFxuICAgICAgXCJJRF9IVUtPVVwiOiBbXCLmiLflj6PmnKxcIiwgXCJJRFwiXSxcbiAgICAgIFwiSURfU09DSUFMX1NFQ1VSSVRZXCI6IFtcIuekvuS/nVwiLCBcIklEXCJdLFxuICAgICAgXCJJRF9EUklWRV9MSUNFTkNFXCI6IFtcIumpvueFp1wiLCBcIklEXCJdLFxuICAgICAgXCJJRF9NQVJJVEFMXCI6IFtcIue7k+WpmuivgVwiLCBcIklEXCJdLFxuICAgICAgXCJJRF9ESVZPUlNFXCI6IFtcIuemu+WpmuivgVwiLCBcIklEXCJdLFxuICAgICAgXCJJRF9WSURFT1wiOiBbXCLmnKzkurrop4bpopFcIiwgXCJJRFwiXSxcbiAgICAgIFwiSURfT1RIRVJcIjogW1wi5YW25LuW5Liq5Lq66Lqr5Lu96K+B5piOXCIsIFwiSURcIl0sXG4gICAgICBcIkNBUkVFUl9MQUJPVVJfQ09OVFJBQ1RcIjogW1wi5Yqz5Yqo5ZCI5ZCMXCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJDQVJFRVJfTEFCT1VSX0NFUlRJRklDQVRFXCI6IFtcIuaKgOacr+iBjOensOWPiuaKgOiDveiupOivgVwiLCBcIkNBUkVFUlwiXSxcbiAgICAgIFwiQ0FSRUVSX0JVU0lORVNTX0xJQ0VOQ0VcIjogW1wi6JCl5Lia5omn54WnXCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJDQVJFRVJfVEFYX1JFR0lTVFJBVElPTlwiOiBbXCLnqI7liqHnmbvorrDor4FcIiwgXCJDQVJFRVJcIl0sXG4gICAgICBcIkNBUkVFUl9PUkdBTklaQVRJT05fUkVHSVNUUkFUSU9OXCI6IFtcIue7hOe7h+acuuaehOS7o+eggeivgVwiLCBcIkNBUkVFUlwiXSxcbiAgICAgIFwiQ0FSRUVSX1NBTklUQVJZX0xJQ0VOQ0VcIjogW1wi5Y2r55Sf6K645Y+v6K+BXCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJDQVJFRVJfQlVTSU5FU1NfQ09OVFJBQ1RcIjogW1wi57uP6JCl55u45YWz5ZCI5ZCM5Y+K5ZCI5L2c5Y2P6K6uXCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJDQVJFRVJfQlVTSU5FU1NfQ0VSVElGSUNBVEVcIjogW1wi57uP6JCl55u45YWz6K645Y+v6K+BXCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJDQVJFRVJfQlVTSU5FU1NfUExBQ0VcIjogW1wi57uP6JCl5oiW5pa95bel5Zy65omAXCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJDQVJFRVJfQ09SUF9DT1ZFUlwiOiBbXCLkvIHkuJrlpKflm75cIiwgXCJDQVJFRVJcIl0sXG4gICAgICBcIkNBUkVFUl9DT1JQX0xPR09cIjogW1wi5LyB5LiaTG9nb1wiLCBcIkNBUkVFUlwiXSxcbiAgICAgIFwiQ0FSRUVSX0NPUlBfSUNPTlwiOiBbXCLkvIHkuJpJY29uXCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJDQVJFRVJfQ09SUF9DT01NSVRNRU5UX0xFVFRFUlwiOiBbXCLkvIHkuJrmib/or7rlh71cIiwgXCJDQVJFRVJcIl0sXG4gICAgICBcIkNBUkVFUl9PVEhFUlwiOiBbXCLlhbbku5blt6XkvZznm7jlhbPor4HmmI5cIiwgXCJDQVJFRVJcIl0sXG4gICAgICBcIklOQ09NRV9CQU5LQUNDT1VOVFwiOiBbXCLpk7booYzmtYHmsLRcIiwgXCJJTkNPTUVcIl0sXG4gICAgICBcIklOQ09NRV9TQUxBUllcIjogW1wi5bel6LWE6K+B5piOXCIsIFwiSU5DT01FXCJdLFxuICAgICAgXCJJTkNPTUVfT1RIRVJcIjogW1wi5YW25LuW5pS25YWl6K+B5piOXCIsIFwiSU5DT01FXCJdLFxuICAgICAgXCJSRV9IT1VTRV9QUk9QRVJUWVwiOiBbXCLkvY/miL/mnYPor4HmiJblkIjlkIxcIiwgXCJSRUFMRVNUQVRFXCJdLFxuICAgICAgXCJSRV9IT1VTRV9QSUNUVVJFXCI6IFtcIuS9j+aIv+eFp+eJh1wiLCBcIlJFQUxFU1RBVEVcIl0sXG4gICAgICBcIlJFX0xBTkRfUFJPUEVSVFlcIjogW1wi5Zyf5Zyw5p2D6K+B5oiW5ZCI5ZCMXCIsIFwiUkVBTEVTVEFURVwiXSxcbiAgICAgIFwiUkVfTEFORF9QSUNUVVJFXCI6IFtcIuWcn+WcsOeFp+eJh1wiLCBcIlJFQUxFU1RBVEVcIl0sXG4gICAgICBcIlJFX0ZBQ1RPUllfUFJPUEVSVFlcIjogW1wi5Y6C5oi/5LuT5bqT5p2D6K+B5oiW5ZCI5ZCMXCIsIFwiUkVBTEVTVEFURVwiXSxcbiAgICAgIFwiUkVfRkFDVE9SWV9QSUNUVVJFXCI6IFtcIuWOguaIv+S7k+W6k+eFp+eJh1wiLCBcIlJFQUxFU1RBVEVcIl0sXG4gICAgICBcIlJGX09USEVSXCI6IFtcIuWFtuS7luaIv+S6p+ebuOWFs+ivgeaYjlwiLCBcIlJFQUxFU1RBVEVcIl0sXG4gICAgICBcIlZFSElDTEVfTElDRU5DRVwiOiBbXCLooYzpqbbor4FcIiwgXCJWRUhJQ0xFXCJdLFxuICAgICAgXCJWRUhJQ0xFX1BST1BFUlRZXCI6IFtcIui9pui+huadg+ivgeaIluWQiOWQjOWPkeelqFwiLCBcIlZFSElDTEVcIl0sXG4gICAgICBcIlZFSElDTEVfUExBVEVcIjogW1wi6L2m54mM5Y+3XCIsIFwiVkVISUNMRVwiXSxcbiAgICAgIFwiVkVISUNMRV9QSUNUVVJFXCI6IFtcIui9pui+hueFp+eJh1wiLCBcIlZFSElDTEVcIl0sXG4gICAgICBcIlZFSElDTEVfT1RIRVJcIjogW1wi5YW25LuW6L2m6L6G55u45YWz6K+B5piOXCIsIFwiVkVISUNMRVwiXSxcbiAgICAgIFwiR1VBUkFOVEVFX0lEXCI6IFtcIuWAn+asvuaLheS/neS6uui6q+S7vVwiLCBcIkdVQVJBTlRFRVwiXSxcbiAgICAgIFwiR1VBUkFOVEVFX1JFQUxFU1RBVEVcIjogW1wi5YCf5qy+5ouF5L+d5Lq65oi/5LqnXCIsIFwiR1VBUkFOVEVFXCJdLFxuICAgICAgXCJHVUFSQU5URUVfQ09OVFJBQ1RcIjogW1wi5YCf5qy+5ouF5L+d5ZCI5ZCM5oiW5paH5Lu2XCIsIFwiR1VBUkFOVEVFXCJdLFxuICAgICAgXCJHVUFSQU5URUVfT1RIRVJcIjogW1wi5YW25LuW5YCf5qy+5ouF5L+d55u45YWz6K+B5piOXCIsIFwiR1VBUkFOVEVFXCJdLFxuICAgICAgXCJGQUNUT1JJTkdfSElTVE9SWVwiOiBbXCLljoblj7LkuqTmmJNcIiwgXCJGQUNUT1JJTkdcIl0sXG4gICAgICBcIkZBQ1RPUklOR19QUk9KRUNUXCI6IFtcIuS/neeQhumhueebrlwiLCBcIkZBQ1RPUklOR1wiXSxcbiAgICAgIFwiRkFDVE9SSU5HX0FOVElcIjogW1wi5Y+N5L+d55CG5o6q5pa9XCIsIFwiRkFDVE9SSU5HXCJdLFxuICAgICAgXCJGQUNUT1JJTkdfRklOQU5DRV9DT1JQXCI6IFtcIuiejei1hOS8geS4mlwiLCBcIkZBQ1RPUklOR1wiXSxcbiAgICAgIFwiQ1JFRElUUkVQT1JUXCI6IFtcIuS/oeeUqOaKpeWRilwiLCBcIkNSRURJVFJFUE9SVFwiXSxcbiAgICAgIFwiTE9BTlBVUlBPU0VcIjogW1wi6LS35qy+55So6YCUXCIsIFwiTE9BTlBVUlBPU0VcIl0sXG4gICAgICBcIkZBTUlMWVwiOiBbXCLlrrbluq3mg4XlhrVcIiwgXCJGQU1JTFlcIl0sXG4gICAgICBcIkVEVUNBVElPTlwiOiBbXCLlrabljoZcIiwgXCJFRFVDQVRJT05cIl0sXG4gICAgICBcIkxPQ0FUSU9OXCI6IFtcIuWxheS9j+WcsFwiLCBcIkxPQ0FUSU9OXCJdLFxuICAgICAgXCJPVEhFUl9TSU5BX1dFSUJPXCI6IFtcIuaWsOa1quW+ruWNmlwiLCBcIk9USEVSU1wiXSxcbiAgICAgIFwiT1RIRVJfVEVDRU5UX1dFSUJPXCI6IFtcIuiFvuiur+W+ruWNmlwiLCBcIk9USEVSU1wiXSxcbiAgICAgIFwiT1RIRVJfUVFcIjogW1wi6IW+6K6vUVFcIiwgXCJPVEhFUlNcIl0sXG4gICAgICBcIkZVTkRJTkdQUk9KRUNUX0JBTk5FUlwiOiBbXCLpppblsY/lm77niYdcIiwgXCJDUk9XREZVTkRJTkdcIl0sXG4gICAgICBcIkZVTkRJTkdQUk9KRUNUX1BSRVwiOiBbXCLpooTng63lm77niYdcIiwgXCJDUk9XREZVTkRJTkdcIl0sXG4gICAgICBcIkZVTkRJTkdQUk9KRUNUX1BST0pFQ1RcIjogW1wi6aG555uu5Zu+54mHXCIsIFwiQ1JPV0RGVU5ESU5HXCJdLFxuICAgICAgXCJGVU5ESU5HUFJPSkVDVF9NT0JJTEVcIjogW1wi56e75Yqo56uv5Zu+54mHXCIsIFwiQ1JPV0RGVU5ESU5HXCJdLFxuICAgICAgXCJJTlZFU1RNRU5UX0ZVTkRfT1ZFUlZJRVdcIjogW1wi5Z+66YeR5qaC5Ya1XCIsIFwiSU5WRVNUTUVOVEZVTkRcIl0sXG4gICAgICBcIklOVkVTVE1FTlRfRlVORF9DSEFSVFwiOiBbXCLln7rph5Hlm77ooahcIiwgXCJJTlZFU1RNRU5URlVORFwiXSxcbiAgICAgIFwiSU5WRVNUTUVOVF9GVU5EX0FTU0VUX01BTkFHRVwiOiBbXCLotYTkuqfnrqHnkIZcIiwgXCJJTlZFU1RNRU5URlVORFwiXSxcbiAgICAgIFwiSU5WRVNUTUVOVF9GVU5EX0ZFRVNfTEVWRUxcIjogW1wi6LS5546H5rC05bmzXCIsIFwiSU5WRVNUTUVOVEZVTkRcIl0sXG4gICAgICBcIklOU1VSQU5DRV9PVkVSVklFV1wiOiBbXCLkv53pmanmpoLlhrVcIiwgXCJJTlNVUkFOQ0VcIl0sXG4gICAgICBcIklOU1VSQU5DRV9DSEFSVFwiOiBbXCLmipXotYTmlrnlkJHlj4rotYTkuqfphY3nva5cIiwgXCJJTlNVUkFOQ0VcIl0sXG4gICAgICBcIklOU1VSQU5DRV9DQVNFX0RFTU9cIjogW1wi5qGI5L6L5ryU56S6XCIsIFwiSU5TVVJBTkNFXCJdLFxuICAgICAgXCJPUkRFUl9JRF9DQVJEX0ZST05UXCI6IFtcIui6q+S7veivgeato+mdolwiLCBcIk9SREVSX0RBVEFcIl0sXG4gICAgICBcIk9SREVSX0lEX0NBUkRfQkFDS1wiOiBbXCLouqvku73or4Hlj43pnaJcIiwgXCJPUkRFUl9EQVRBXCJdLFxuICAgICAgXCJPUkRFUl9CQU5LX0FDQ09VTlRfRlJPTlRcIjogW1wi6ZO26KGM5Y2h5q2j6Z2iXCIsIFwiT1JERVJfREFUQVwiXSxcbiAgICAgIFwiT1JERVJfUEFJRF9EQVRBXCI6IFtcIuaJk+asvuWHreivgVwiLCBcIk9SREVSX0RBVEFcIl0sXG4gICAgICBcIk9SREVSX0NPTlRSQUNUXCI6IFtcIuiuouWNleWQiOWQjFwiLCBcIk9SREVSX0RBVEFcIl0sXG4gICAgICBcIldFQUxUSFBST0RVQ1RfT1ZFUlZJRVdcIjogW1wi55CG6LSi5Lqn5ZOB5qaC5Ya1XCIsIFwiV0VBTFRIUFJPRFVDVFwiXSxcbiAgICAgIFwiV0VBTFRIUFJPRFVDVF9SRVBPUlRcIjogW1wi55CG6LSi5Lqn5ZOB566h55CG5oql5ZGKXCIsIFwiV0VBTFRIUFJPRFVDVFwiXVxuICAgIH0sXG4gICAgXCJCYW5rXCI6IHtcbiAgICAgIFwiSUNCQ1wiOiBcIuS4reWbveW3peWVhumTtuihjFwiLFxuICAgICAgXCJBQkNcIjogXCLkuK3lm73lhpzkuJrpk7booYxcIixcbiAgICAgIFwiQ01CXCI6IFwi5oub5ZWG6ZO26KGMXCIsXG4gICAgICBcIkNDQlwiOiBcIuW7uuiuvumTtuihjFwiLFxuICAgICAgXCJCQ0NCXCI6IFwi5YyX5Lqs6ZO26KGMXCIsXG4gICAgICBcIkJKUkNCXCI6IFwi5YyX5Lqs5Yac5p2R5ZWG5Lia6ZO26KGMXCIsXG4gICAgICBcIkJPQ1wiOiBcIuS4reWbvemTtuihjFwiLFxuICAgICAgXCJCT0NPTVwiOiBcIuS6pOmAmumTtuihjFwiLFxuICAgICAgXCJDTUJDXCI6IFwi5rCR55Sf6ZO26KGMXCIsXG4gICAgICBcIkJPU1wiOiBcIuS4iua1t+mTtuihjFwiLFxuICAgICAgXCJDQkhCXCI6IFwi5rik5rW36ZO26KGMXCIsXG4gICAgICBcIkNFQlwiOiBcIuWFieWkp+mTtuihjFwiLFxuICAgICAgXCJDSUJcIjogXCLlhbTkuJrpk7booYxcIixcbiAgICAgIFwiQ0lUSUNcIjogXCLkuK3kv6Hpk7booYxcIixcbiAgICAgIFwiQ1pCXCI6IFwi5rWZ5ZWG6ZO26KGMXCIsXG4gICAgICBcIkdEQlwiOiBcIuW5v+WPkemTtuihjFwiLFxuICAgICAgXCJIS0JFQVwiOiBcIuS4nOS6mumTtuihjFwiLFxuICAgICAgXCJIWEJcIjogXCLljY7lpI/pk7booYxcIixcbiAgICAgIFwiSFpDQlwiOiBcIuadreW3numTtuihjFwiLFxuICAgICAgXCJOSkNCXCI6IFwi5Y2X5Lqs6ZO26KGMXCIsXG4gICAgICBcIlBJTkdBTlwiOiBcIuW5s+WuiemTtuihjFwiLFxuICAgICAgXCJQU0JDXCI6IFwi6YKu5pS/5YKo6JOE6ZO26KGMXCIsXG4gICAgICBcIlNEQlwiOiBcIua3seWPkemTtuihjFwiLFxuICAgICAgXCJTUERCXCI6IFwi5rWm5Y+R6ZO26KGMXCIsXG4gICAgICBcIlNSQ0JcIjogXCLkuIrmtbflhpzmnZHllYbkuJrpk7booYxcIlxuICAgIH0sXG4gICAgXCJDcmVkaXRSYW5rXCI6IHtcbiAgICAgIFwiSFJcIjogXCI5OS0wXCIsXG4gICAgICBcIkVcIjogXCIxMDktMTAwXCIsXG4gICAgICBcIkRcIjogXCIxMTktMTEwXCIsXG4gICAgICBcIkNcIjogXCIxMjktMTIwXCIsXG4gICAgICBcIkJcIjogXCIxNDQtMTMwXCIsXG4gICAgICBcIkFcIjogXCIxNTktMTQ1XCIsXG4gICAgICBcIkFBXCI6IFwiMTYw5Y+K5Lul5LiKXCJcbiAgICB9LFxuICAgIFwiTG9hblB1cnBvc2VcIjoge1xuICAgICAgXCJTSE9SVFRFUk1cIjogXCLnn63mnJ/lkajovaxcIixcbiAgICAgIFwiUEVSU09OQUxcIjogXCLkuKrkurrmtojotLlcIixcbiAgICAgIFwiSU5WRVNUTUVOVFwiOiBcIuaKlei1hOWIm+S4mlwiLFxuICAgICAgXCJDQVJcIjogXCLovabovobono3otYRcIixcbiAgICAgIFwiSE9VU0VcIjogXCLmiL/kuqfono3otYRcIixcbiAgICAgIFwiQ09SUE9SQVRJT05cIjogXCLkvIHkuJrono3otYRcIixcbiAgICAgIFwiT1RIRVJcIjogXCLlhbblroPlgJ/mrL5cIlxuICAgIH0sXG4gICAgXCJSZXBheW1lbnRNZXRob2RcIjoge1xuICAgICAgXCJNb250aGx5SW50ZXJlc3RcIjogW1wi5oyJ5pyI5LuY5oGv5Yiw5pyf6L+Y5pysXCIsIFwi6L+Y5qy+5Y6L5Yqb5bCPXCJdLFxuICAgICAgXCJFcXVhbEluc3RhbGxtZW50XCI6IFtcIuaMieaciOetiemineacrOaBr1wiLCBcIui/mOasvuS+v+aNt1wiXSxcbiAgICAgIFwiRXF1YWxQcmluY2lwYWxcIjogW1wi5oyJ5pyI562J6aKd5pys6YeRXCIsIFwi5oC75Yip5oGv5pyA5L2OXCJdLFxuICAgICAgXCJCdWxsZXRSZXBheW1lbnRcIjogW1wi5LiA5qyh5oCn6L+Y5pys5LuY5oGvXCIsIFwi55+t5pyf6aaW6YCJXCJdLFxuICAgICAgXCJFcXVhbEludGVyZXN0XCI6IFtcIuaciOW5s+aBr1wiLCBcIuWunumZheWIqeeOh+acgOmrmFwiXSxcbiAgICAgIFwiWWVhcmx5SW50ZXJlc3RcIjogW1wi5oyJ5bm05LuY5oGv5Yiw5pyf6L+Y5pysXCIsIFwi6L+Y5qy+5Y6L5Yqb5bCPXCJdXG4gICAgfSxcblx0XCJSZXBheW1lbnRTdGF0dXNcIjoge1xuICAgICAgXCJVTkRVRVwiOiBcIuacquWIsOacn1wiLFxuICAgICAgXCJPVkVSRFVFXCI6IFwi6YC+5pyfXCIsXG4gICAgICBcIkJSRUFDSFwiOiBcIui/nee6plwiLFxuICAgICAgXCJSRVBBWUVEXCI6IFwi5bey6L+Y5riFXCJcbiAgICB9LFxuICAgIFwiTG9hblN0YXR1c1wiOiB7XG4gICAgICBcIlVOQVNTSUdORURcIjogXCLmnKrlpITnkIZcIixcbiAgICAgIFwiSU5JVElBVEVEXCI6IFwi5Yid5aeLXCIsXG4gICAgICBcIlNDSEVEVUxFRFwiOiBcIuW3suWuieaOklwiLFxuICAgICAgXCJPUEVORURcIjogXCLlvIDmlL7mipXmoIdcIixcbiAgICAgIFwiRkFJTEVEXCI6IFwi5rWB5qCHXCIsXG4gICAgICBcIkZJTklTSEVEXCI6IFwi5bey5ruh5qCHXCIsXG4gICAgICBcIkNBTkNFTEVEXCI6IFwi5bey5Y+W5raIXCIsXG4gICAgICBcIlNFVFRMRURcIjogXCLlt7Lnu5PnrpdcIixcbiAgICAgIFwiQ0xFQVJFRFwiOiBcIuW3sui/mOa4hVwiLFxuICAgICAgXCJPVkVSRFVFXCI6IFwi6YC+5pyfXCIsXG4gICAgICBcIkJSRUFDSFwiOiBcIui/nee6plwiLFxuICAgICAgXCJBUkNISVZFRFwiOiBcIuW3suWtmOaho1wiXG4gICAgfSxcbiAgICBcIkJpZE1ldGhvZFwiOiB7XG4gICAgICBcIkFVVE9cIjogXCLoh6rliqjmipXmoIdcIixcbiAgICAgIFwiTUFOVUFMXCI6IFwi5omL5Yqo5oqV5qCHXCIsXG4gICAgICBcIldFQUxUSFBST0RVQ1RcIjogXCLnkIbotKLkuqflk4FcIlxuICAgIH0sXG4gICAgXCJNb3J0Z2FnZVR5cGVcIjoge1xuICAgICAgXCJSRV9IT1VTRVwiOiBcIuaIv+S6p1wiLFxuICAgICAgXCJSRV9MQU5EXCI6IFwi5Zyf5ZywKOWMheaLrOWxseael+a4lOeJpylcIixcbiAgICAgIFwiUkVfRkFDVE9SWVwiOiBcIuWOguaIv+W6k+aIv1wiLFxuICAgICAgXCJDT01NT05ESVRZXCI6IFwi5ZWG5ZOB5bqT5a2YXCIsXG4gICAgICBcIlZFSElDTEVcIjogXCLovabovoZcIixcbiAgICAgIFwiRVFVSVBNRU5UXCI6IFwi6K6+5aSH5Zmo5p2QXCIsXG4gICAgICBcIlNFQ1VSSVRJRVNcIjogXCLor4HliLhcIixcbiAgICAgIFwiQk9ORFwiOiBcIuWAuuWIuFwiLFxuICAgICAgXCJTVE9DS1wiOiBcIuiCoeelqFwiLFxuICAgICAgXCJERVBPU0lUX1JFQ0VJUFRcIjogXCLpk7booYzlrZjljZVcIixcbiAgICAgIFwiT1RIRVJcIjogXCLlhbbku5ZcIlxuICAgIH0sXG4gICAgXCJMb2FuUmVxdWVzdFN0YXR1c1wiOiB7XG4gICAgICBcIlVOQVNTSUdORURcIjogXCLmnKrlpITnkIZcIixcbiAgICAgIFwiQVNTSUdORURcIjogXCLlpITnkIbkuK1cIixcbiAgICAgIFwiQ0FOQ0VMRURcIjogXCLlt7Llj5bmtohcIixcbiAgICAgIFwiUEVORElOR19WSVNJVFwiOiBcIuWunuWcsOW+geS/oVwiLFxuICAgICAgXCJQRU5ESU5HX1JJU0tcIjogXCLpo47mjqflrqHmoLhcIixcbiAgICAgIFwiUEVORElOR19BUFBPUlZFXCI6IFwi5b6F5om55YeGXCIsXG4gICAgICBcIkFQUFJPVkVEXCI6IFwi5bey5om55YeGXCIsXG4gICAgICBcIlJFSkVDVEVEXCI6IFwi5bey6amz5ZueXCIsXG4gICAgICBcIlBVQkxJU0hFRFwiOiBcIuW3suWPkeaUvlwiLFxuICAgICAgXCJBUkNISVZFRFwiOiBcIuW3suWtmOaho1wiLFxuICAgICAgXCJERUxFVEVEXCI6IFwi5bey5Yiq6ZmkXCJcbiAgICB9LFxuICAgIFwiSHVrb3VUeXBlXCI6IHtcbiAgICAgIFwiQUdSSUNVTFRVUkVcIjogXCLlhpzkuJrmiLflj6NcIixcbiAgICAgIFwiVVJCQU5cIjogXCLln47plYfmiLflj6NcIlxuICAgIH0sXG4gICAgXCJIb3VzZVN0YXR1c1wiOiB7XG4gICAgICBcIkNPTU1FUkNJQUxfTE9BTlwiOiBcIuWVhuS4mui0t+asvlwiLFxuICAgICAgXCJIQUZfTE9BTlwiOiBcIuWFrOenr+mHkei0t+asvlwiLFxuICAgICAgXCJDT01QT1NJVEVfTE9BTlwiOiBcIue7hOWQiOi0t+asvlwiLFxuICAgICAgXCJTRUxGX09XTkVEXCI6IFwi6Ieq5pyJ5L2P5oi/XCIsXG4gICAgICBcIlJFTlRcIjogXCLnp5/miL9cIixcbiAgICAgIFwiT1RIRVJcIjogXCLlhbbku5ZcIlxuICAgIH0sXG4gICAgXCJJbnZlc3RTdGF0dXNcIjoge1xuICAgICAgXCJQUk9QT1NFRFwiOiBcIueUs+ivt+aKleagh1wiLFxuICAgICAgXCJGUk9aRU5cIjogXCLotKbmiLfotYTph5Hlhrvnu5NcIixcbiAgICAgIFwiRlJPWkVOX0ZBSUxFRFwiOiBcIui1hOmHkeWGu+e7k+Wksei0pVwiLFxuICAgICAgXCJGQUlMRURcIjogXCLmtYHmoIdcIixcbiAgICAgIFwiRklOSVNIRURcIjogXCLmipXmoIfmiJDlip9cIixcbiAgICAgIFwiQ0FOQ0VMRURcIjogXCLlt7Llj5bmtohcIixcbiAgICAgIFwiU0VUVExFRFwiOiBcIuW3sue7k+eul1wiLFxuICAgICAgXCJDTEVBUkVEXCI6IFwi6L+Y5qy+5a6M5oiQXCIsXG4gICAgICBcIk9WRVJEVUVcIjogXCLpgL7mnJ9cIixcbiAgICAgIFwiQlJFQUNIXCI6IFwi6L+d57qmXCJcbiAgICB9XG4gIH1cbn1cbiJdfQ==
