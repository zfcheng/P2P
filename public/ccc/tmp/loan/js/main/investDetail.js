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

},{}],"/ccc/global/js/lib/jquery.easy-pie-chart.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
"use strict";

(function ($) {
  $.easyPieChart = function (el, options) {
    var addScaleLine,
        animateLine,
        drawLine,
        easeInOutQuad,
        rAF,
        renderBackground,
        renderScale,
        renderTrack,
        _this = this;
    this.el = el;
    this.$el = $(el);
    this.$el.data("easyPieChart", this);
    this.init = function () {
      var percent, scaleBy;
      _this.options = $.extend({}, $.easyPieChart.defaultOptions, options);
      percent = parseInt(_this.$el.data('percent'), 10);
      _this.percentage = 0;
      _this.canvas = $("<canvas width='" + _this.options.size + "' height='" + _this.options.size + "'></canvas>").get(0);
      _this.$el.append(_this.canvas);
      if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) {
        G_vmlCanvasManager.initElement(_this.canvas);
      }
      _this.ctx = _this.canvas.getContext('2d');
      if (window.devicePixelRatio > 1) {
        scaleBy = window.devicePixelRatio;
        $(_this.canvas).css({
          width: _this.options.size,
          height: _this.options.size
        });
        _this.canvas.width *= scaleBy;
        _this.canvas.height *= scaleBy;
        _this.ctx.scale(scaleBy, scaleBy);
      }
      _this.ctx.translate(_this.options.size / 2, _this.options.size / 2);
      _this.ctx.rotate(_this.options.rotate * Math.PI / 180);
      _this.$el.addClass('easyPieChart');
      _this.$el.css({
        width: _this.options.size,
        height: _this.options.size,
        lineHeight: "" + _this.options.size + "px"
      });
      _this.update(percent);
      return _this;
    };
    this.update = function (percent) {
      percent = parseFloat(percent) || 0;
      if (_this.options.animate === false) {
        drawLine(percent);
      } else {
        animateLine(_this.percentage, percent);
      }
      return _this;
    };
    renderScale = function () {
      var i, _i, _results;
      _this.ctx.fillStyle = _this.options.scaleColor;
      _this.ctx.lineWidth = 1;
      _results = [];
      for (i = _i = 0; _i <= 24; i = ++_i) {
        _results.push(addScaleLine(i));
      }
      return _results;
    };
    addScaleLine = function (i) {
      var offset;
      offset = i % 6 === 0 ? 0 : _this.options.size * 0.017;
      _this.ctx.save();
      _this.ctx.rotate(i * Math.PI / 12);
      _this.ctx.fillRect(_this.options.size / 2 - offset, 0, -_this.options.size * 0.05 + offset, 1);
      _this.ctx.restore();
    };
    renderTrack = function () {
      var offset;
      offset = _this.options.size / 2 - _this.options.lineWidth / 2;
      if (_this.options.scaleColor !== false) {
        offset -= _this.options.size * 0.08;
      }
      _this.ctx.beginPath();
      _this.ctx.arc(0, 0, offset, 0, Math.PI * 2, true);
      _this.ctx.closePath();
      _this.ctx.strokeStyle = _this.options.trackColor;
      _this.ctx.lineWidth = _this.options.lineWidth;
      _this.ctx.stroke();
    };
    renderBackground = function () {
      if (_this.options.scaleColor !== false) {
        renderScale();
      }
      if (_this.options.trackColor !== false) {
        renderTrack();
      }
    };
    drawLine = function (percent) {
      var offset;
      renderBackground();
      _this.ctx.strokeStyle = $.isFunction(_this.options.barColor) ? _this.options.barColor(percent) : _this.options.barColor;
      _this.ctx.lineCap = _this.options.lineCap;
      _this.ctx.lineWidth = _this.options.lineWidth;
      offset = _this.options.size / 2 - _this.options.lineWidth / 2;
      if (_this.options.scaleColor !== false) {
        offset -= _this.options.size * 0.08;
      }
      _this.ctx.save();
      _this.ctx.rotate(-Math.PI / 2);
      _this.ctx.beginPath();
      _this.ctx.arc(0, 0, offset, 0, Math.PI * 2 * percent / 100, false);
      _this.ctx.stroke();
      _this.ctx.restore();
    };
    rAF = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    })();
    animateLine = function (from, to) {
      var anim, startTime;
      _this.options.onStart.call(_this);
      _this.percentage = to;
      Date.now || (Date.now = function () {
        return +new Date();
      });
      startTime = Date.now();
      anim = function () {
        var currentValue, process;
        process = Date.now() - startTime;
        if (process < _this.options.animate) {
          rAF(anim);
        }
        _this.ctx.clearRect(-_this.options.size / 2, -_this.options.size / 2, _this.options.size, _this.options.size);
        renderBackground.call(_this);
        currentValue = [easeInOutQuad(process, from, to - from, _this.options.animate)];
        _this.options.onStep.call(_this, currentValue);
        drawLine.call(_this, currentValue);
        if (process >= _this.options.animate) {
          return _this.options.onStop.call(_this, currentValue, to);
        }
      };
      rAF(anim);
    };
    easeInOutQuad = function (t, b, c, d) {
      var easeIn, easing;
      easeIn = function (t) {
        return Math.pow(t, 2);
      };
      easing = function (t) {
        if (t < 1) {
          return easeIn(t);
        } else {
          return 2 - easeIn(t / 2 * -2 + 2);
        }
      };
      t /= d / 2;
      return c / 2 * easing(t) + b;
    };
    return this.init();
  };
  $.easyPieChart.defaultOptions = {
    barColor: '#ef1e25',
    trackColor: '#f2f2f2',
    scaleColor: '#dfe0e0',
    lineCap: 'round',
    rotate: 0,
    size: 110,
    lineWidth: 3,
    animate: false,
    onStart: $.noop,
    onStop: $.noop,
    onStep: $.noop
  };
  $.fn.easyPieChart = function (options) {
    return $.each(this, function (i, el) {
      var $el, instanceOptions;
      $el = $(el);
      if (!$el.data('easyPieChart')) {
        instanceOptions = $.extend({}, options, $el.data());
        return $el.data('easyPieChart', new $.easyPieChart(el, instanceOptions));
      }
    });
  };
  return void 0;
})(jQuery);
/*
Easy pie chart is a jquery plugin to display simple animated pie charts for only one value

Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

Built on top of the jQuery library (http://jquery.com)

@source: http://github.com/rendro/easy-pie-chart/
@autor: Robert Fleischmann
@version: 1.2.3

Inspired by: http://dribbble.com/shots/631074-Simple-Pie-Charts-II?list=popular&offset=210
Thanks to Philip Thrasher for the jquery plugin boilerplate for coffee script
*/

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

},{"@ds/i18n":"/node_modules/@ds/i18n/index.js"}],"/ccc/global/js/modules/cccBox.js":[function(require,module,exports){
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

},{"ccc/global/js/lib/utils":"/ccc/global/js/lib/utils.js","ccc/global/js/modules/cccBox":"/ccc/global/js/modules/cccBox.js","ccc/global/partials/modules/cccCalculator.html":"/ccc/global/partials/modules/cccCalculator.html"}],"/ccc/global/js/modules/cccConfirm.js":[function(require,module,exports){
'use strict';

/**
 * cccBox -> confirm
 *
 *	Confirm.create({
 *		msg: '操作是否成功？',
 *		okText: '成功',
 *		cancelText: '失败',
 *		ok: function($btn, $el, box) {
 *			// fire ok btn
 *		},
 *		cancel: function($btn, $el, box) {
 *			// fire cancel btn
 *		}
 *	});
 */
var Box = require('ccc/global/js/modules/cccBox');
var tpl = require('ccc/global/partials/modules/cccConfirm.html');

function CccConfirm(options) {

	// defaults
	var defaults = {
		title: '信息提示',
		tpl: tpl,
		width: 400,
		height: 150,
		overlay: false,
		msg: '确定要这么做？',
		complete: function complete() {},
		okText: '确定',
		cancelText: '取消',
		ok: function ok() {},
		cancel: function cancel() {},
		debug: false
	};

	var config = {};
	$.extend(config, defaults, options);

	if (config.debug) {
		console.log('debug:cccConfirm:config', config);
	}

	var before = function before() {
		config.tpl = config.tpl.replace('{{okText}}', config.okText);
		config.tpl = config.tpl.replace('{{cancelText}}', config.cancelText);
		config.tpl = config.tpl.replace('{{msg}}', config.msg);
	};

	var initialize = function initialize() {

		// before init
		before();
		new Box({
			title: config.title,
			value: config.tpl,
			width: config.width,
			height: config.height,
			overlay: config.overlay,
			showed: function showed(ele, box) {
				// click ok
				$(ele).find('.btn-confirm-ok').on('click', function () {
					config.ok($(this), ele, box);
				});

				// click cancel
				$(ele).find('.btn-confirm-cancel').on('click', function () {
					config.cancel($(this), ele, box);
					box.hide();
				});

				config.complete(ele, box);
			}
		});
	};

	initialize.call(this);
}

module.exports.create = function (options) {
	CccConfirm(options);
};

},{"ccc/global/js/modules/cccBox":"/ccc/global/js/modules/cccBox.js","ccc/global/partials/modules/cccConfirm.html":"/ccc/global/partials/modules/cccConfirm.html"}],"/ccc/global/js/modules/cccOk.js":[function(require,module,exports){
'use strict';

var Box = require('ccc/global/js/modules/cccBox');
var tpl = require('ccc/global/partials/modules/cccOk.html');

function CccOk(options) {

	// defaults
	var defaults = {
		title: '信息提示',
		tpl: tpl,
		width: 400,
		height: 150,
		overlay: false,
		msg: '确定要这么做？',
		complete: function complete() {},
		okText: '确定',
		cancelText: '取消',
		ok: function ok() {},
		cancel: function cancel() {},
		debug: false
	};

	var config = {};
	$.extend(config, defaults, options);

	if (config.debug) {
		console.log('debug:cccConfirm:config', config);
	}

	var before = function before() {
		config.tpl = config.tpl.replace('{{okText}}', config.okText);
		config.tpl = config.tpl.replace('{{msg}}', config.msg);
	};

	var initialize = function initialize() {

		// before init
		before();

		new Box({
			title: config.title,
			value: config.tpl,
			width: config.width,
			height: config.height,
			overlay: config.overlay,
			showed: function showed(ele, box) {
				// click ok
				$(ele).find('.btn-confirm-ok').on('click', function () {
					config.ok($(this), ele, box);
				});

				// click cancel
				$(ele).find('.btn-confirm-cancel').on('click', function () {
					config.cancel($(this), ele, box);
					box.hide();
				});

				config.complete(ele, box);
			}
		});
	};

	initialize.call(this);
}

module.exports.create = function (options) {
	CccOk(options);
};

},{"ccc/global/js/modules/cccBox":"/ccc/global/js/modules/cccBox.js","ccc/global/partials/modules/cccOk.html":"/ccc/global/partials/modules/cccOk.html"}],"/ccc/global/js/modules/common.js":[function(require,module,exports){
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

},{}],"/ccc/global/js/modules/tooltip.js":[function(require,module,exports){
'use strict';
require('bootstrap/js/transition');
require('bootstrap/js/tooltip');

/**
 * 初始化 tooltip
 *
 * 给标签加上.ccc-tips-{arrow}和title，就可以自动调用tooltip
 * 如：<button class="ccc-tips-bottom" title="tips显示内容">test</button>
 */
['top', 'bottom', 'left', 'right'].forEach(function (arrow) {
    $('.ccc-tips-' + arrow).tooltip({
        container: 'body',
        html: true,
        placement: arrow
    });
});

},{"bootstrap/js/tooltip":"/node_modules/bootstrap/js/tooltip.js","bootstrap/js/transition":"/node_modules/bootstrap/js/transition.js"}],"/ccc/global/partials/modules/cccCalculator.html":[function(require,module,exports){
module.exports = '<link rel="stylesheet" href="/ccc/global/css/modules/cccCalculator.css">\n<div class="cc-calculator-wp">\n    <div class="calculator-title">\n        <p class="calculator-title-left">收益计算器</p>\n        <div class="calculator-line">\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-md-4" style="width:33%;float:left;">\n            <form name="ccCalculatorForm" class="form-horizontal" role="form">\n                <div class="form-group">\n                    <label for="cc-cal-f2" class="col-sm-4 control-label">投资金额</label>\n                    <div class="col-sm-8" style="float:right;margin-top:-30px;">\n                        <input type="text" class="form-control" id="cc-cal-f2" name="amountValue" value="" placeholder="您的投资金额">\n                        <span>元</span>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="cc-cal-f3" class="col-sm-4 control-label" placeholder="">投资期限</label>\n                    <div class="col-sm-8" style="float:right;margin-top:-30px;">\n                        <input type="text" class="form-control" id="cc-cal-f3" name="dueMonth" value="" placeholder="期望时间长度">\n                        <span>月</span>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="cc-cal-f4" class="col-sm-4 control-label">年化利率</label>\n                    <div class="col-sm-8" style="float:right;margin-top:-30px;">\n                        <input type="text" class="form-control" id="cc-cal-f4" name="annualRate" value="" placeholder="年化利率">\n                        <span>%</span>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="cc-cal-f5" class="col-sm-4 control-label">还款方式</label>\n                    <div class="col-sm-8" style="float:right;margin-top:-30px;">\n                        <select class="form-control" name="paymentMethod" id="cc-cal-f5">\n                            <option value="">loading...</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="col-sm-offset-4 col-sm-8">\n                        <button type="submit" class="btn btn-orange btn-cal">计算收益</button>\n                        <button type="reset" class="reset">重置</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n        <div class="col-md-8" style="width:64%;float:left;">\n            <div class="cc-cal-results-box">\n                <div class="cc-res table table-bordered1 tdContent">\n                    <div class="ccc-f tdCell">收款日期</div>\n                    <div class="tdCell">收款金额</div>\n                    <div class="tdCell">收回本金</div>\n                    <div class="tdCell">收回利息</div>\n                    <div class="ccc-l tdCell">剩余本金</div>\n                </div>\n                <div class="cc-res cc-table-container">\n                    <div class="table_wrap">\n                        <div class="table table-bordered table-hover">\n                            <div id="cc-cal-list-wp">\n\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="cc-res table-bordered1 cc-talbe-total hide">\n                    <div id="cc-cal-total table-bordered1 tdContent">\n                        <div class="cc-total-tr clearfix cc-total-tr-b">\n                            <div class="ccc-f tdCell">总计</div>\n                            <div class="Tamount tdCell"></div>\n                            <div class="TamountPrincipal tdCell"></div>\n                            <div class="TamountInterest tdCell"></div>\n                            <div class="ccc-l TamountOutstanding tdCell"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="cc-total">\n                <span>本息合计：<em class="Famount"></em></span>\n            </div>\n        </div>\n    </div>\n</div>';
},{}],"/ccc/global/partials/modules/cccConfirm.html":[function(require,module,exports){
module.exports = '<div class="ccc-confirm-wrap">\n	<div class="space space-30"></div>\n	<div class="align-center">\n		<p style="padding:0px 20px;font-size:16px;color:#4a4a4a;">{{msg}}</p>\n	</div>\n	<div class="space space-30"></div>\n	<div class="row" style="left:0px;">\n		<div class="col-md-6 align-right">\n			<button class="btn btn-success btn-confirm-ok">{{okText}}</button>\n		</div>\n		<div class="col-md-6">\n			<button class="btn btn-confirm-cancel">{{cancelText}}</button>\n		</div>\n	</div>\n</div>';
},{}],"/ccc/global/partials/modules/cccOk.html":[function(require,module,exports){
module.exports = '<div class="ccc-confirm-wrap">\n	<div class="space space-30"></div>\n	<div class="align-center">\n		<p>{{msg}}</p>\n		<!-- <p>请重新登录</p> -->\n	</div>\n	<div class="space space-30"></div>\n	<div class="row">\n		<div class="col-md-12 align-center">\n			<button class="btn btn-success btn-confirm-ok">{{okText}}</button>\n		</div>\n	</div>\n</div>';
},{}],"/ccc/loan/js/main/bigPic.js":[function(require,module,exports){
/**
 * @file 点击查看大图的交互逻辑层
 * @author lilulu(lilulu@hanhua.com)
 */

"use strict";

exports.popupBigPic = {
    instance: false,
    init: function init() {

        this.popupBigPicRactive = new Ractive({
            el: '#big-pic-container',
            template: require('ccc/loan/partials/bigPic.html'),
            data: {
                visible: false,
                imgs: [],
                currentIndex: 0,
                selectorsMarginLeft: 0,
                stageLen: 5,
                imgLen: 0
            }
        });

        var popupBigPicRactive = this.popupBigPicRactive;

        popupBigPicRactive.on('end-big-pic', function () {
            this.set('visible', false);
            //             $('body')
            //           .removeClass('over-flow-hidden');
            $("#mask-layer-wraper").hide();
        });

        // 大图浏览时切换
        var timer;
        popupBigPicRactive.on("prev-big next-big", function (e) {
            console.log(this.get("currentIndex"));

            if (e.name === "prev-big") {
                this.set("currentIndex", this.get("currentIndex") - 1);
            } else {
                this.set("currentIndex", this.get("currentIndex") + 1);
            }

            if (timer) {
                clearTimeout(timer);
            }

            console.log(this.get("currentIndex"));

            // 定时隐藏
            this.set("showTip", true);
            //            timer = setTimeout(function () {
            //                popupBigPicRactive.set("showTip", false);
            //            }, 5000);

            return false;
        });
    },

    show: function show(options, postCloseHook) {
        console.log(options);
        if (!this.instance) {
            this.init();
            this.instance = true;
        }
        if (typeof postCloseHook === 'function') {
            var listener = this.popupBigPicRactive.on('close', function () {
                postCloseHook();
                listener.cancel();
            });
        }
        this.popupBigPicRactive.set('visible', true);
        this.popupBigPicRactive.set('currentIndex', options.currentIndex || this.popupBigPicRactive.get('currentIndex'));
        this.popupBigPicRactive.set('imgs', options.imgs || this.popupBigPicRactive.get('imgs'));
        //         $('body')
        //           .addClass('over-flow-hidden');
        $("#mask-layer-wraper").show();
    }
};

},{"ccc/loan/partials/bigPic.html":"/ccc/loan/partials/bigPic.html"}],"/ccc/loan/js/main/investDetail.js":[function(require,module,exports){
"use strict";
var loanService = require('./service/loans.js').loanService;
var utils = require('ccc/global/js/lib/utils');
var accountService = require('ccc/account/js/main/service/account').accountService;
var CommonService = require('ccc/global/js/modules/common').CommonService;
var CccOk = require('ccc/global/js/modules/cccOk');
var i18n = require('@ds/i18n')['zh-cn'];
var format = require('@ds/format');

require('ccc/global/js/modules/tooltip');
require('ccc/global/js/lib/jquery.easy-pie-chart.js');
require('bootstrap/js/carousel');

require('bootstrap/js/transition');
require('bootstrap/js/tooltip');

var Cal = require('ccc/global/js/modules/cccCalculator');

// cccConfirm
var Confirm = require('ccc/global/js/modules/cccConfirm');

var popupBigPic = require('ccc/loan/js/main/bigPic').popupBigPic;
var statusMap = {
    SCHEDULED: '开标时间:{{timeOpen}}',
    SETTLED: '结标时间:{{timeFinished}}',
    OPENED: '',
    FINISHED: '',
    CLEARED: ''
};

var template = statusMap[CC.loan.status];

new Ractive({
    el: ".openTime",
    template: template,
    data: {
        timeOpen: moment(CC.loan.timeOpen).format('YYYY-MM-DD HH:mm'),
        timeFinished: moment(new Date(parseInt(CC.loan.timeFinished))).format('YYYY-MM-DD HH:mm')
    }
});

function initailEasyPieChart() {
    ///////////////////////////////////////////////////////////
    // 初始化饼状图
    ///////////////////////////////////////////////////////////
    $(function () {
        var oldie = /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase());
        $(".easy-pie-chart").each(function () {
            var percentage = $(this).data("percent");
            var percentageNum = CC.loan.rule.leftAmount;
            // 100%进度条颜色显示为背景色
            var color = percentage === 100 ? "#f58220" : '#009ada';
            $(this).easyPieChart({
                barColor: color,
                trackColor: '#ddd',
                scaleColor: false,
                lineCap: 'butt',
                lineWidth: 4,
                animate: oldie ? false : 1000,
                size: 130,
                onStep: function onStep(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });

            $(this).find("span.percentageNum").html('<span style="color:#f58220;font-size:24px;">' + percentageNum + '</span>' + '<span style="color:#4b4b4b;">' + CC.loan.rule.dw + '</span>');

            var width = $(this).find("span.percentageNum").width();
            $(this).find("span.percentageNum").css({ 'left': '50%', 'margin-left': -width / 2 });
            //			console.log(width);
        });
    });
};

initailEasyPieChart();

$("[data-toggle=tooltip]").each(function () {
    $(this).tooltip({
        // 同级的 tooltip-container
        container: $(this).parent().find('.tooltip-container')
    });
});
setTimeout(function () {
    CC.loan.timeElapsed = utils.format.timeElapsed(CC.loan.timeElapsed);
    console.log(CC.loan.timeElapsed);
    CC.loan.timeLeft = JSON.parse(CC.loan.timeLeft);
    var leftTime = CC.loan.timeLeft;
    var timeLeftToal = leftTime.ss + leftTime.mm * 60 + leftTime.hh * 60 * 60 + leftTime.dd * 60 * 60 * 24;
    setInterval(function () {
        timeLeftToal -= 1;
        var dd = parseInt(timeLeftToal / (60 * 60 * 24), 10),
            hh = parseInt((timeLeftToal - dd * 60 * 60 * 24) / (60 * 60), 10),
            mm = parseInt((timeLeftToal - dd * 60 * 60 * 24 - hh * 60 * 60) / 60, 10),
            ss = parseInt(timeLeftToal - dd * 60 * 60 * 24 - hh * 60 * 60 - mm * 60, 10);
        var newTimeleftTotal = {
            dd: dd,
            hh: hh,
            mm: mm,
            ss: ss
        };
        var days = newTimeleftTotal.dd ? '<i>' + newTimeleftTotal.dd + '</i>日' : '';
        $('.time>span').html(days + '<i>' + newTimeleftTotal.hh + '</i>时<i>' + newTimeleftTotal.mm + '</i>分<i>' + newTimeleftTotal.ss + '</i>秒');
    }, 1000);
    //获取最后还款日期
    if (CC.repayments instanceof Array && CC.repayments.length > 0) {
        CC.loan.lastRepaymentsDate = CC.repayments[0].dueDate;
        for (var i = 0; i < CC.repayments.length; i++) {
            if (CC.loan.lastRepaymentsDate < CC.repayments[i].dueDate) {
                CC.loan.lastRepaymentsDate = CC.repayments[i].dueDate;
            }
        };
    }

    var investRactive = new Ractive({
        el: ".do-invest-wrapper",
        template: require('ccc/loan/partials/doInvestOnDetail.html'),
        data: {
            name: '',
            user: CC.user,
            loan: CC.loan,
            inputNum: CC.loan.rule.min,
            rate: utils.format.percent(CC.loan.investPercent * 100, 2),
            agreement: CC.user ? CC.user.agreement ? CC.user.agreement : false : false,
            errors: {
                visible: false,
                msg: ''
            },
            serverDate: CC.serverDate,
            isSend: false,
            backUrl: CC.backUrl
        },
        oninit: function oninit() {
            console.log(CC.loan.rule.balance);
            console.log(CC.loan.rule.min);
            if (CC.loan.rule.balance < CC.loan.rule.min) {
                this.set('inputNum', CC.loan.rule.balance);
            }
        }
    });
    var serverDate = CC.serverDate;
    var openTime = CC.loan.timeOpen;
    serverDate += 1000;
    if (CC.loan.status === 'SCHEDULED') {
        var interval = setInterval(function () {
            var leftTime = utils.countDown.getCountDownTime2(openTime, serverDate);
            var textDay = leftTime.day ? leftTime.day : '';
            if (! +leftTime.day && ! +leftTime.hour && ! +leftTime.min && ! +leftTime.sec) {
                clearInterval(interval);
            } else {
                $('.left-time-start').html('<span class="text">距离开标时间还有<span style="color:#009ada">' + textDay + '</span>天<span style="color:#009ada;">' + leftTime.hour + '</span>时<span style="color:#009ada">' + leftTime.min + '</span>分<span style="color:#009ada">' + leftTime.sec + '</span>秒</span>');
            }
        }, 1000);
    }

    if (CC.user) {
        accountService.getUserInfo(function (res) {
            investRactive.set('name', res.user.name);
        });
    }

    investRactive.set('user', CC.user);
    if ($('.invest-submit').length > 0) {}

    investRactive.on('reduce', function (e) {
        if (CC.loan.rule.balance < CC.loan.rule.min) {
            this.set('inputNum', CC.loan.rule.balance);
            showErrors('投资金额必须为标的剩余金额');
            return;
        }
        var num = parseInt(this.get('inputNum'));
        num = num - parseInt(CC.loan.rule.step);
        if (num < CC.loan.rule.min) {
            return;
        }
        investRactive.set('inputNum', num);
        showSelect(num);
    });

    investRactive.on('add', function (e) {
        if (CC.loan.rule.balance < CC.loan.rule.min) {
            this.set('inputNum', CC.loan.rule.balance);
            showErrors('投资金额必须为标的剩余金额');
            return;
        }
        var num = parseInt(this.get('inputNum'));
        if (num < CC.loan.rule.min) {
            num = CC.loan.rule.min;
        } else {
            num = num + parseInt(CC.loan.rule.step);
        }
        if (num > CC.loan.rule.max) {
            return;
        }
        investRactive.set('inputNum', num);
        showSelect(num);
    });

    investRactive.on('maxNumber', function (e) {
        if (CC.loan.rule.balance < CC.loan.rule.min) {
            this.set('inputNum', CC.loan.rule.balance);
            showErrors('投资金额必须为标的剩余金额');
            return;
        }
        var lmount = CC.loan.rule.leftAmount;
        if (CC.loan.rule.dw === '万') {
            lmount = lmount * 10000;
        }
        var minNum = Math.min(CC.user.availableAmount, CC.loan.rule.max, lmount);

        investRactive.set('inputNum', Math.floor(parseInt(minNum / CC.loan.rule.step) * CC.loan.rule.step));
        showSelect(Math.floor(parseInt(minNum / CC.loan.rule.step) * CC.loan.rule.step));
    });

    investRactive.on("invest-submit", function (e) {
        e.original.preventDefault();

        var num = parseInt(this.get('inputNum'), 10); // 输入的值
        var smsCaptcha = this.get('smsCaptcha');
        var paymentPassword = this.get('paymentPassword');
        var couponSelection = $("#couponSelection").find("option:selected").text();
        var indexnum = couponSelection.indexOf("最低投资额：");
        var minnum = couponSelection.substring(indexnum + 6, couponSelection.length - 1);
        if (num < minnum) {
            showErrors('投资额小于奖券最低投资额');
            return false;
        }
        if (CC.loan.userId === CC.user.userId) {
            showErrors('该标为您本人借款，无法投标 ');
            return false;
        }

        if (isNaN(num)) {
            showErrors('输入有误，请重新输入 ! ');
            return false;
        }

        if (CC.loan.rule.balance < CC.loan.rule.min) {
            if (this.get('inputNum') != CC.loan.rule.balance) {
                this.set('inputNum', CC.loan.rule.balance);
                showErrors('投资金额必须为标的剩余金额');
                return false;
            } else {
                disableErrors();
            }
        } else {
            if (num < CC.loan.rule.min) {
                showErrors('单次投标金额不可少于' + CC.loan.rule.min + '元 !');
                return false;
            }

            if ((num - CC.loan.rule.min) % CC.loan.rule.step !== 0) {
                showErrors('不符合投资规则!最少为' + CC.loan.rule.min + '元，且投资增量为' + CC.loan.rule.step + "元");
                return false;
            }
        }
        if (num > CC.loan.rule.balance) {
            showErrors('投标金额不可超过剩余额度 !');
            return false;
        }

        if (num > CC.loan.rule.max) {
            showErrors('单次投标金额不可超过' + CC.loan.rule.max + '元!');
            return false;
        }

        if (num > CC.user.availableAmount) {
            showErrors('账户余额不足，请先充值 !');
            return false;
        }

        if (paymentPassword === '') {
            showErrors('请输入交易密码!');
            return false;
        } else {
            accountService.checkPassword(paymentPassword, function (r) {
                if (!r) {
                    showErrors('请输入正确的交易密码!');
                } else {
                    var num = investRactive.get('inputNum');
                    disableErrors();
                    var couponText = '';
                    if ($("#couponSelection")) {
                        var value = $("#couponSelection").find("option:selected").val();

                        if (investRactive.get('selectOption') == null) {
                            if (value == '') {
                                couponText = '未使用任何奖券,';
                            } else {

                                couponText = '将使用' + $("#couponSelection").find("option:selected").text();
                            }
                        }
                    }

                    if (document.getElementById('agree').checked == true) {
                        $('.agree-error').css('visibility', 'hidden');
                        Confirm.create({
                            msg: '您本次投资的金额为' + num + '元，' + couponText + '是否确认投资？',
                            okText: '确定',
                            cancelText: '取消',

                            ok: function ok() {
                                $.post('/lianlianpay/tender', {
                                    amount: num,
                                    loanId: investRactive.get('loan.id'),
                                    placementId: investRactive.get('coupon'),
                                    paymentPassword: investRactive.get('paymentPassword')
                                }, function (res) {
                                    if (res.success) {
                                        CccOk.create({
                                            msg: '投资成功，<a href="/invest" style="color:#009ada;text-decoration:none">继续浏览其他项目</a>',
                                            okText: '确定',
                                            // cancelText: '重新登录',
                                            ok: function ok() {
                                                window.location.reload();
                                            },
                                            cancel: function cancel() {
                                                window.location.reload();
                                            }
                                        });
                                    } else {
                                        var errType = res.error && res.error[0] && res.error[0].message || '';
                                        var errMsg = ({
                                            TOO_CROWD: '投资者过多您被挤掉了，请点击投资按钮重试。'
                                        })[errType] || errType;
                                        CccOk.create({
                                            msg: '投资失败，' + errMsg,
                                            okText: '确定',
                                            // cancelText: '重新登录',
                                            ok: function ok() {
                                                window.location.reload();
                                            },
                                            cancel: function cancel() {
                                                window.location.reload();
                                            }
                                        });
                                    }
                                });
                                $('.dialog').hide();
                            },
                            cancel: function cancel() {
                                $('.dialog').hide();
                            }
                        });
                    } else {
                        $('.agree-error').css('visibility', 'visible');
                        $('.agree-error').html('请先同意奇乐融投资协议');
                    }
                }
            });
        };
    });

    // 初始化倒计时
    if (CC.loan.timeOpen > 0) {
        var serverDate = CC.loan.serverDate;
        var leftTime = utils.countDown.getCountDownTime2(CC.loan.timeOpen, serverDate);
        if (leftTime) {
            var countDownRactive = new Ractive({
                el: ".next-time",
                template: require('ccc/loan/partials/countDown.html'),
                data: {
                    countDown: {
                        days: leftTime.day,
                        hours: leftTime.hour,
                        minutes: leftTime.min,
                        seconds: leftTime.sec
                    }
                }
            });
            var interval = setInterval(function () {
                serverDate += 1000;
                var leftTime = utils.countDown.getCountDownTime2(CC.loan.timeOpen, serverDate);
                if (! +leftTime.day && ! +leftTime.hour && ! +leftTime.min && ! +leftTime.sec) {
                    clearInterval(interval);
                    window.location.reload();
                } else {
                    countDownRactive.set('countDown', {
                        days: leftTime.day,
                        hours: leftTime.hour,
                        minutes: leftTime.min,
                        seconds: leftTime.sec
                    });
                }
            }, 1000);
        }
    }

    function parsedata(o) {
        var type = {
            'CASH': '现金券',
            'INTEREST': '加息券',
            'PRINCIPAL': '增值券',
            'REBATE': '返现券'
        };
        for (var i = 0; i < o.length; i++) {
            var canuse = o[i].disabled;
            o[i] = o[i].placement;
            if (o[i].couponPackage.type === 'INTEREST') {
                o[i].interest = true;
                o[i].displayValue = (parseFloat(o[i].couponPackage.parValue) / 100).toFixed(1) + '%';
            } else if (o[i].couponPackage.type === 'CASH') {
                o[i].displayValue = parseInt(o[i].couponPackage.parValue) + "元";
                o[i].hide = true;
            } else if (o[i].couponPackage.type === 'PRINCIPAL') {
                o[i].displayValue = parseInt(o[i].couponPackage.parValue) + "元";
            } else if (o[i].couponPackage.type === 'REBATE') {
                o[i].displayValue = parseInt(o[i].couponPackage.parValue) + "元";
            };
            o[i].value = parseInt(o[i].couponPackage.parValue);
            o[i].id = o[i].id;
            o[i].typeKey = type[o[i].couponPackage.type];
            o[i].minimumInvest = o[i].couponPackage.minimumInvest + "元";
            o[i].canuse = canuse;
        }
        return o;
    };

    function showErrors(error) {
        investRactive.set('errors', {
            visible: true,
            msg: error
        });
    }

    function disableErrors() {
        investRactive.set('errors', {
            visible: false,
            msg: ''
        });
    }

    $('.benefit-calculator').on('click', function () {
        Cal.create();
    });

    function showSelect(amount) {
        $('#couponSelection').val('');
        var months = CC.loan.duration;
        investRactive.set('inum', parseFloat(amount));
        disableErrors();
        loanService.getMyCoupon(amount, months, function (coupon) {
            if (coupon.success) {
                investRactive.set('selectOption', parsedata(coupon.data));
            }
        });
    }
    //初始化选项
    showSelect(CC.loan.rule.min);

    investRactive.on('getCoupon', function () {
        var inputNum = this.get('inputNum');
        var inum = this.get('inum');
        if (parseFloat(inputNum) !== parseFloat(inum)) {
            showSelect(inputNum);
        }
    });
}, 100);

$('.investInput').on('keyup', function () {
    showSelect($(this).val());
});

loanService.getLoanProof(CC.loan.requestId, function (r1) {
    loanService.getCareerProof(CC.loan.LuserId, function (r2) {
        //		console.log(r2);
        //		console.log(r1);
        for (var j = 0; j < r1.length; j++) {
            if (r1[j].proof.proofType !== '') {
                r1[j].proofType = i18n.enums.ProofType[r1[j].proof.proofType][0];
            } else {
                r1[j].proofType = '暂无认证信息';
            }
        }
        //		console.log(r1);
        var proofTypeArr = r2.proofs.CAREER;
        for (var i = 0; i < proofTypeArr.length; i++) {
            if (proofTypeArr[i].proof.proofType !== '') {
                proofTypeArr[i].proofType = i18n.enums.ProofType[proofTypeArr[i].proof.proofType][0];
            } else {
                proofTypeArr[i].proofType = '暂无认证信息';
            }
        };
        //		console.log(proofTypeArr);

        var relateDataRactive = new Ractive({
            // insurance 担保
            el: ".insurance-wrapper",
            template: require('ccc/loan/partials/relateDataOnDetail.html'),
            data: {
                loanPurpose: r1,
                career: proofTypeArr,
                currentIndex: 0,
                currentIndexB: 0,
                selectorsMarginLeft: 0,
                stageLen: 5

            }
        });

        relateDataRactive.on("prev-pic next-pic", function (e) {
            var self = this;
            console.log(self.get("currentIndex"));
            if (e.name === 'prev-pic') {
                self.set("currentIndex", self.get("currentIndex") - 1);
                if (self.get('currentIndex') < 0) {
                    self.set('currentIndex', self.get('career').length - 1);
                }
            } else {
                self.set("currentIndex", self.get("currentIndex") + 1);
                if (self.get('currentIndex') >= self.get('career').length) {
                    self.set('currentIndex', 0);
                }
            }
        });

        relateDataRactive.on("prev-picB next-picB", function (e) {
            var self = this;
            console.log(self.get("currentIndexB"));
            if (e.name === 'prev-picB') {
                self.set("currentIndexB", self.get("currentIndexB") - 1);
                if (self.get('currentIndexB') < 0) {
                    self.set('currentIndexB', self.get('loanPurpose').length - 1);
                }
            } else {
                self.set("currentIndexB", self.get("currentIndexB") + 1);
                if (self.get('currentIndexB') >= self.get('loanPurpose').length) {
                    self.set('currentIndexB', 0);
                }
            }
        });

        relateDataRactive.on('begin-big-pic-career', function (e) {
            console.log(e);
            var index = Number(e.keypath.substr(-1));
            var options = {
                imgs: r2.proofs.CAREER,
                currentIndex: index,
                selectorsMarginLeft: 0,
                stageLen: 5,
                imgLen: r2.proofs.CAREER.length
            };
            popupBigPic.show(options);
            //			console.log(r2);
            return false;
        });

        relateDataRactive.on('begin-big-pic-loan', function (e) {
            console.log(e);
            var index = Number(e.keypath.substr(-1));
            console.log('*********');
            console.log(index);
            var options = {
                imgs: r1,
                currentIndex: index,
                selectorsMarginLeft: 0,
                stageLen: 5,
                imgLen: r1.length
            };
            popupBigPic.show(options);
            return false;
        });
    });
});

$('.nav-tabs > li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.tab-panel').eq($(this).data('step')).addClass('active').siblings().removeClass('active');
});

function add() {
    var getNum = parseInt(document.getElementById("calculatorText").value);
    if (getNum > 0) {
        document.getElementById("calculatorText").value = getNum + 100;
    } else {}
}

var recordRactive = new Ractive({
    el: '.invest-record',
    template: require('ccc/loan/partials/record.html'),
    page: 1,
    pageSize: 40,
    api: '/api/v2/loan/' + CC.loan.id + '/invests/',
    data: {
        loading: true,
        list: [],
        totalSize: 0
    },
    oninit: function oninit() {
        this.getRecord();
    },
    getRecord: function getRecord() {
        var self = this;
        var api = self.api + self.page + '/' + self.pageSize;
        console.log(api);
        request(api).get('body').then(function (r) {
            self.setData(r);
        });
    },
    setData: function setData(r) {
        var self = this;
        console.log(r);
        self.set('loading', false);
        self.set('list', self.parseData(r.results));
        self.set('totalSize', r.totalSize);
        self.renderPager();
    },
    parseData: function parseData(list) {
        for (var i = 0, l = list.length; i < l; i++) {
            list[i].submitTime = moment(list[i].submitTime).format('YYYY-MM-DD HH:mm:ss');

            if (/^ZQJR_/.test(list[i].userLoginName)) {
                list[i].userLoginName = list.userLoginName.replace('ZQJR_', '手机用户');
            } else if (list[i].userLoginName.indexOf('手机用户') === 0) {
                var _name = list[i].userLoginName.substring(4).replace(/(\d{2})\d{7}(\d{2})/, '$1*******$2');
            } else {
                if (list[i].userLoginName.length === 2) {
                    var _name = mask(list[i].userLoginName, 1);
                } else {
                    var _name = mask(list[i].userLoginName, 2);
                }
            }

            list[i].userLoginName = _name;
        }
        return list;
    },
    renderPager: function renderPager() {
        var self = this;
        var totalSize = self.get('totalSize');

        if (totalSize != 0) {
            self.totalPage = Math.ceil(totalSize / self.pageSize);
        }

        var totalPage = [];
        console.log("===>> totalPage = " + self.totalPage);
        for (var i = 0; i < self.totalPage; i++) {
            totalPage.push(i + 1);
        }

        _renderPager(totalPage, self.page);
    }
});

function _renderPager(totalPage, current) {
    console.log("===>render");
    if (!current) {
        current = 1;
    }
    var pagerRactive = new Ractive({
        el: '#record-pager',
        template: require('ccc/loan/partials/pagerRecord.html'),
        data: {
            totalPage: totalPage,
            current: current
        }
    });

    pagerRactive.on('previous', function (e) {
        e.original.preventDefault();
        var current = this.get('current');
        if (current > 1) {
            current -= 1;
            this.set('current', current);
            recordRactive.page = current;
            recordRactive.getRecord();
        }
    });

    pagerRactive.on('page', function (e, page) {
        e.original.preventDefault();
        if (page) {
            current = page;
        } else {
            current = e.context;
        }
        this.set('current', current);
        recordRactive.page = current;
        recordRactive.getRecord();
    });
    pagerRactive.on('next', function (e) {
        e.original.preventDefault();
        var current = this.get('current');
        if (current < this.get('totalPage')[this.get('totalPage').length - 1]) {
            current += 1;
            this.set('current', current);
            recordRactive.page = current;
            recordRactive.getRecord();
        }
    });
}

function mask(str, s, l) {
    if (!str) {
        return '';
    }
    var len = str.length;
    if (!len) {
        return '';
    }
    if (!l || l < 0) {
        l = len === 2 ? 1 : len - 2;
    } else if (l > len - 1) {
        l = len - 1;
        s = !!s ? 1 : 0;
    }
    if (s > len) {
        s = len - 1;
    }
    str = str.substring(0, s) + new Array(l + 1).join('*') + str.substring(s + l);
    str = str.substring(0, len);
    return str;
}

},{"./service/loans.js":"/ccc/loan/js/main/service/loans.js","@ds/format":"/node_modules/@ds/format/index.js","@ds/i18n":"/node_modules/@ds/i18n/index.js","bootstrap/js/carousel":"/node_modules/bootstrap/js/carousel.js","bootstrap/js/tooltip":"/node_modules/bootstrap/js/tooltip.js","bootstrap/js/transition":"/node_modules/bootstrap/js/transition.js","ccc/account/js/main/service/account":"/ccc/account/js/main/service/account.js","ccc/global/js/lib/jquery.easy-pie-chart.js":"/ccc/global/js/lib/jquery.easy-pie-chart.js","ccc/global/js/lib/utils":"/ccc/global/js/lib/utils.js","ccc/global/js/modules/cccCalculator":"/ccc/global/js/modules/cccCalculator.js","ccc/global/js/modules/cccConfirm":"/ccc/global/js/modules/cccConfirm.js","ccc/global/js/modules/cccOk":"/ccc/global/js/modules/cccOk.js","ccc/global/js/modules/common":"/ccc/global/js/modules/common.js","ccc/global/js/modules/tooltip":"/ccc/global/js/modules/tooltip.js","ccc/loan/js/main/bigPic":"/ccc/loan/js/main/bigPic.js","ccc/loan/partials/countDown.html":"/ccc/loan/partials/countDown.html","ccc/loan/partials/doInvestOnDetail.html":"/ccc/loan/partials/doInvestOnDetail.html","ccc/loan/partials/pagerRecord.html":"/ccc/loan/partials/pagerRecord.html","ccc/loan/partials/record.html":"/ccc/loan/partials/record.html","ccc/loan/partials/relateDataOnDetail.html":"/ccc/loan/partials/relateDataOnDetail.html"}],"/ccc/loan/js/main/service/loans.js":[function(require,module,exports){
/**
 * @file 首页数据交互逻辑
 * @author huip(hui.peng@creditcloud.com)
 */

'use strict';

exports.loanService = {
    getLoanProof: function getLoanProof(requestId, next) {
        request.get('/api/v2/loan/request/' + requestId + '/proofs').end().then(function (res) {
            next(res.body);
        });
    },
    getCareerProof: function getCareerProof(userId, next) {
        request.get('/api/v2/user/' + userId + '/certificates/proofs').end().then(function (res) {
            next(res.body);
        });
    },
    getMyCoupon: function getMyCoupon(amount, months, next) {
        var sendObj = {
            amount: amount,
            months: months
        };
        request('POST', '/api/v2/coupon/MYSELF/listCoupon').type('form').send(sendObj).end().then(function (r) {
            next(r.body);
        });
    }
};

},{}],"/ccc/loan/partials/bigPic.html":[function(require,module,exports){
module.exports = '<!--全屏大图-->\n{{#if visible}}\n<div class="big-pic-wrapper">\n    <div class="img-wrapper">\n\n        <!--关闭按钮-->\n        <div class="close" on-click="end-big-pic"></div>\n        <p class="big-pic-box">\n        <img src="{{ imgs[currentIndex].uri }}" alt="" class="big">\n</p>\n        <!-- 左右按钮 -->\n        {{#if currentIndex > 0}}\n        <a class="prev-big control" href="#" on-click="prev-big" title="前一张">\n            <span class="glyphicon glyphicon-chevron-left"></span>\n        </a>\n        {{/if}} \n		{{#if imgs.length-1>currentIndex}} <a class="next-big control" href="#" on-click="next-big" title="后一张">\n            <span class="glyphicon glyphicon-chevron-right"></span>\n            </a>\n            {{/if}} {{#if showTip}}\n            <div class="status">当前第 {{ currentIndex+1 }}/{{ imgs.length }} 张</div>\n            {{/if}}\n    </div>\n</div>\n{{/if}}\n';
},{}],"/ccc/loan/partials/countDown.html":[function(require,module,exports){
module.exports = '<span class="next-invest-time">\n	{{#if countDown.days !=0 }}\n    <span class="num">{{{countDown.days}}}</span>天\n    {{/if}}\n    <span class="num">{{{countDown.hours}}}</span>时\n    <span class="num">{{countDown.minutes}}</span>分\n    <span class="num">{{countDown.seconds}}</span>秒\n</span>';
},{}],"/ccc/loan/partials/doInvestOnDetail.html":[function(require,module,exports){
module.exports = '<!--{{JSON.stringify(loan)}}-->\n{{timeOpen}} {{#if loan.status == "FINISHED"||loan.status == "SETTLED"||loan.status == "CLEARED"}}\n<div class="firstLine">\n    <div class="tip">投资金额 </div>\n<!--    <div class="tip">{{loan.rule.min}}元起投 </div>-->\n<!--    <div class="highAmount">最高投资限额：{{loan.rule.max}}元</div>-->\n<!--    <div class="highAmount">可投¥0.00元</div>-->\n</div>\n<p class="finished-money">可投金额&nbsp;&nbsp;&nbsp;<span style="color:#ff7200;font-size:20px;">0.00</span><span style="font-size:14px;">元</span></p>\n<p class="finished-money">剩余时间&nbsp;&nbsp;&nbsp;<span style="font-size:14px;">已完成</span></p>\n<p class="finished-money">可用余额&nbsp;&nbsp;&nbsp;<span style="font-size:14px;">{{#if user.availableAmount}}{{user.availableAmount}}{{else}}0{{/if}}元</span></p>\n               <div class="col-sm-8" style="width:300px;padding:0;margin-left:24px;line-height:38px;text-align:right;border:1px solid #ccc;border-radius:3px;background-color:#eee;">\n                    <input type="text" class="form-control col-sm-8 form_input loanmoney" {{#if loan.status == "FINISHED"||loan.status == "SETTLED" || loan.status == "CLEARED" }} disabled{{/if}} placeholder="请输入投资金额"  style="width:274px;border: 0;border-radius: 0;box-shadow:none;text-align:left;height:38px;"/><span>元&nbsp;&nbsp;</span>\n                </div>\n<p class="finished-money">预期收益&nbsp;&nbsp;&nbsp;<span style="color:#ff7200;">0.00</span><span style="font-size:14px;">元</span></p>\n{{#if loan.status == "FINISHED"}}\n<button class="finished-btn">已满标</button>{{/if}}{{#if loan.status == "SETTLED"}}\n<button class="finished-btn">还款中</button>{{/if}}{{#if loan.status == "CLEARED"}}\n<button class="finished-btn">还款结束</button>{{/if}}\n<!--<button class="finished-btn">还款结束</button>-->\n<!--<img src="/ccc/loan/img/full.png" class="finishBlock"> -->\n{{/if}} \n {{#if loan.status == "ARCHIVED" }}\n<div class="firstLine">\n    <div class="tip">{{loan.rule.min}}元起投 </div>\n    <div class="highAmount">最高投资限额：{{loan.rule.max}}元</div>\n</div>\n<img src="/ccc/loan/img/over.png" class="cleared"> \n{{/if}}  \n{{#if loan.status == "SCHEDULED" }}\n<div class="status">\n    <div class="info">\n		 <div class="leftMoney">\n			<h1 class="red"> 账户余额：¥<span class="left-money">\n				{{#if user.availableAmount}}\n				{{#if user.availableAmount.length>8}}\n					{{user.availableAmount.substr(0,5)}}...\n                {{else}}\n                    {{user.availableAmount}}\n				{{/if}}\n				{{else}}0{{/if}}\n                </span>\n			 </h1>\n         	<a href="/newAccount/recharge" class="recharge">充值</a>\n         </div>\n<!--\n        <div class="firstLine">\n            <div class="tip">{{loan.rule.min}}元起投 </div>\n            <div class="highAmount">最高投资限额：{{loan.rule.max}}元</div>\n			\n        </div>\n-->\n        <div class="userBlock" id="userBlock">\n           \n            <div class="input">\n                <div class="calculatorBox calculatorBox1">\n                    <div class="calculator">\n                        <span class="glyphicon glyphicon-minus" style="top:0;" on-click="reduce"></span>\n                        <input type="hidden" name="loanId" value="{{loan.id}}">\n                        <input placeholder="{{loan.rule.min}}" type="text" value="{{ inputNum }}">\n                        <span class="glyphicon glyphicon-plus" style="top:0;" on-click="add"></span>\n                    </div>\n					 <span class="topAmount" on-click="maxNumber">最大可投金额</span>\n                </div>\n<!--                <p class="totalInterest">预估总收益 {{(loan.totalInterest * (inum||0) / loan.originalAmount).toFixed(2)}}元</p>-->\n				<p class="rule-max">单笔最多可投：{{loan.rule.max}}元</p>\n                {{#if user}}\n               \n                    <input type="submit" class="finished-btn" value="即将开始" />\n               \n                {{else}}\n                <a href="/login">\n                    <input type="submit" class="btn btn-warning invest-button" value="立即登录" />\n                </a>\n                {{/if}}\n            </div>\n            <div class="investbtn" data-id="{{ loan.id }}" data-status="{{ loan.status }}" data-open="{{ loan.timeOpen }}" data-serv="{{serverDate}}" style="color: black;width: 155px;text-align: center;background:#fff;margin-left:-25px"></div>\n\n            <p class="left-time-start">距离开标时间还有xx小时xx分xx秒</p>\n        </div>\n    </div>\n</div>\n{{/if}} \n\n{{#if loan.status == "OPENED"}}\n<div class="status">\n    <div class="info">\n      \n        <div class="userBlock" id="userBlock">\n            {{#if user}} {{! 已登录,但是没开第三方支付 }} \n			{{#if !name}}\n               <div class="leftMoney-open">账户余额：¥&nbsp;<i class="red">{{user.availableAmount}}</i>\n                <a href="/newAccount/recharge" class="recharge"><button>充值</button></a>\n            </div>\n			<div class="calculatorBox">\n			 <div class="calculator">\n                            <span class="glyphicon glyphicon-minus" style="top:0;" on-click="reduce"></span>\n                            <input type="hidden" name="loanId" value="{{loan.id}}">\n                            <input placeholder="{{loan.rule.min}}"  name="amount" type="text" value="{{ inputNum }}" on-blur="getCoupon" />\n                            <span class="glyphicon glyphicon-plus" style="top:0;" on-click="add"></span>\n                        </div>\n				 <span class="topAmount" on-click="maxNumber">最大可投金额</span>\n			</div>\n			<p class="one-time-max">单笔最多可投：{{loan.rule.max}}元</p>\n                       \n                        <div class="clearfix"></div>\n            <div class="prompt-open-3rdpay">\n                <p class="shiming">您的账户尚未实名认证，认证后可投资</p>\n            </div>\n            <div class="invest-button-wrapper">\n                <a class="btn btn-warning open-button"  href="/newAccount/settings/authentication">立即认证</a>\n            </div>\n            {{else}} {{! 已登录 }} {{! 未签订无密投资}}\n\n            <div class="leftMoney-open">账户余额：¥&nbsp;<i class="red">{{user.availableAmount}}</i>\n                <a href="/newAccount/recharge" class="recharge"><button>充值</button></a>\n            </div>\n            <div class="input">\n                <form action="/lianlianpay/tender" name="investForm" method="POST" class="invest-form" target="_blank" on-submit="invest-submit">\n                    <div class="calculatorBox">\n                        <div class="calculator">\n                            <span class="glyphicon glyphicon-minus" style="top:0;" on-click="reduce"></span>\n                            <input type="hidden" name="loanId" value="{{loan.id}}">\n                            <input placeholder="{{loan.rule.min}}"  name="amount" type="text" value="{{ inputNum }}" on-blur="getCoupon" autocomplete="off"/>\n                            <span class="glyphicon glyphicon-plus" style="top:0;" on-click="add"></span>\n                        </div>\n                        <span class="topAmount" on-click="maxNumber">最大可投金额</span>\n                        <div class="clearfix"></div>\n                        <p class="p-max">单笔最多可投：{{loan.rule.max}}元</p>\n\n                    <div class="selectOption">\n                        <select name="placementId" id="couponSelection" value="{{coupon}}">                       \n                            {{#if selectOption}}\n                                <option value="">请选择可用的红包</option>\n                                {{#each selectOption}}\n                                    {{#if !hide&&!canuse}}\n                                        <option value="{{ id }}" {{#if canuse}}disabled{{/if}}>{{ displayValue }}{{ typeKey }} - 最低投资额：{{ minimumInvest }}</option>\n                                    {{/if}}\n                                {{/each}}\n                            {{else}}\n                                <option value="">暂无可用券</option>\n                            {{/if}}\n                        </select>\n                    </div>\n						<div class="password-box">\n					<div class="password">\n                    	<input class="trade-password" type="password" placeholder="请输入交易密码" name="paymentPassword" value="{{paymentPassword}}" autocomplete="off"/>\n					</div>\n						<p><a href="/newAccount/settings/password" style="font-size:14px">忘记交易密码？</a></p>\n						</div>\n                    <input style="display:none" type="password" placeholder="请输入交易密码" />                  \n                        <input type="submit" class="btn btn-warning invest-button" value="确认投资" />\n						<p class="agree-box">\n							<input type="checkbox" class="agree" checked id="agree"/>\n							<span>我同意\n                                    {{#if loan.productKey==="LTB"}}\n                                <a href="/agreement/mobile/protocolltb" target="_blank">《乐投保投资服务协议》</a>\n                                   {{elseif loan.productKey==="LXY"}}\n                                 <a href="/agreement/mobile/protocollxy" target="_blank">《乐享盈投资服务协议》</a>\n                                 {{else}}\n                                 <a href="/agreement/mobile/protocol" target="_blank">《用户投资服务协议》</a>\n                                 {{/if}}\n                            </span>\n						</p>\n						<p class="agree-error"></p>\n                    </div>\n  \n                    {{#if errors.visible}}\n                    <div class="tooltip">\n                        <div class="tooltip-arrow"></div>\n                        <div class="tooltip-inner">\n                            <span class="glyphicon glyphicon-exclamation-sign icon"></span>\n                            <span class="text">{{ errors.msg }}</span>\n                        </div>\n                    </div>\n                    {{/if}}\n                </form>\n            </div>\n\n            {{/if}} {{else}}\n			\n			<p class="left-money login-see">\n                账户余额：<a href="/login" style="color:#009ada;">登录</a> 后可见\n            </p>\n            <div class="firstLine" style="padding:0px;">\n<!--\n				<div class="tip">{{loan.rule.min}}元起投 </div>\n				<div class="highAmount">最高投资限额：{{loan.rule.max}}元</div>\n-->\n        	</div>\n            \n\n            <div class="calculatorBox">\n                <div class="calculator">\n                    <span class="glyphicon glyphicon-minus" style="padding:0;margin:0;top:0;" on-click="reduce"></span>\n                    <input placeholder="{{loan.rule.min}}" type="text" value="{{ inputNum }}">\n                    <span class="glyphicon glyphicon-plus" style="top:0;" on-click="add"></span>\n                </div>\n                <span class="topAmount" on-click="">最大可投金额</span>\n            </div>\n			<p class="one-time-max">单笔最多可投：{{loan.rule.max}}元</p>\n<!--            <p class="totalInterest">预估总收益 {{(loan.totalInterest * (inum||0) / loan.originalAmount).toFixed(2)}}元</p>-->\n\n            <a href="/login?url={{backUrl}}" class="loginBtn">\n                            立即登录\n                        </a> {{/if}}\n        </div>\n    </div>\n</div>\n{{/if}}\n';
},{}],"/ccc/loan/partials/pagerRecord.html":[function(require,module,exports){
module.exports = '{{# totalPage.length }}\n<ul class="invest-pager">\n   <!-- <li class="page-first">\n       <a href="" on-click="page:1">首页</a>\n   </li> -->\n    <li class="page-prev"><a href="#" on-click="previous">上一页</a>\n    </li>\n    {{#each totalPage}}    \n        <li class="{{#if current == totalPage[@key]}} current-page {{/if}}"><a href="#"  on-click="page:{{this}}">{{totalPage[@key]}}</a></li>        \n    {{/each}}\n    <li class="page-next"><a href="#" on-click="next">下一页</a>\n    </li>\n    <div class="clearfix"></div>\n</ul>\n{{/if}}\n<div style="height:20px;"></div>';
},{}],"/ccc/loan/partials/record.html":[function(require,module,exports){
module.exports = '{{#if loading}}\n      <div>加载中..</div>\n{{else}}\n   <table class="table repay-plan repay-record">\n        <thead>\n            <tr>\n                <th style="border-top-left-radius: 3px;">投标人</th>\n                <th>投标金额(元)</th>\n                <th style="border-top-right-radius: 3px;">投标时间</th>\n            </tr>\n        </thead>\n        {{#list}}\n        <tr>\n            <th style="text-align: center;font-size: 14px;line-height: 60px;color: #666;border-bottom: 1px solid #ddd;">{{userLoginName}}</th>\n            <th style="text-align: center;font-size: 14px;line-height: 60px;color: #666;border-bottom: 1px solid #ddd;">{{amount}}</th>\n            <th style="text-align: center;font-size: 14px;line-height: 60px;color: #666;border-bottom: 1px solid #ddd;">{{submitTime}}</th>\n        </tr>\n        {{/list}}\n    </table>\n{{/if}}';
},{}],"/ccc/loan/partials/relateDataOnDetail.html":[function(require,module,exports){
module.exports = '<p class="controler-title">企业认证图片</p>\n{{#if career.length}}\n<div class="controler" style="margin-left:10px;margin-right:10px">\n    <div id="carousel-com-career" class="carousel slide li-content" data-ride="carousel" data-interval="5000">\n        <div class="carousel-inner" role="listbox">\n            {{#career}}\n            <div class="item item-pic {{#if @index===0}} active {{/if}}" style="background-image:url({{uri}});" on-click="begin-big-pic-career" title="认证类型：{{proofType}}">\n            </div>\n            {{/career}}\n<!--\n			<div class="proof">\n				<lable style="color:#999;">认证类型：</lable>\n				<input type="text" value="{{career[currentIndex].proofType}}" disabled style="border:1px solid #999;text-align:center;color:#999;"/>\n			</div>\n-->\n        </div>\n\n        <a class="left carousel-control" href="#carousel-com-career" role="button" data-slide="prev" style="width:10%;" on-click="prev-pic">\n            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n            <span class="sr-only">Previous</span>\n        </a>\n        <a class="right carousel-control" href="#carousel-com-career" role="button" data-slide="next" style="width:10%;" on-click="next-pic">\n            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n            <span class="sr-only">Next</span>\n        </a>\n    </div>\n</div>\n\n{{ else }}\n<div class="no-pics">\n    暂无相关资料\n</div>\n{{/if}}\n\n<p class="controler-title">风控认证图片</p>\n{{#if loanPurpose.length}}\n<div class="controler" style="margin-left:10px;margin-right:10px">\n    <div id="carousel-com-loan" class="carousel slide li-content" data-ride="carousel" data-interval="5000">\n        <div class="carousel-inner" role="listbox">\n            {{#loanPurpose}}\n            <div class="item item-pic {{#if @index===0}} active {{/if}}" style="background-image:url({{uri}});" on-click="begin-big-pic-loan" title="认证类型：{{proofType}}">\n            </div>\n            {{/loanPurpose}} \n        </div>\n<!--\n		<div class="proof">\n			<lable style="color:#999;">认证类型：</lable>\n			<input type="text" value="{{loanPurpose[currentIndexB].proofType}}" disabled style="border:1px solid #999;text-align:center;color:#999;"/>\n		</div>\n-->\n        <a class="left carousel-control" href="#carousel-com-loan" role="button" data-slide="prev" style="width:10%;" on-click="prev-picB">\n            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n            <span class="sr-only">Previous</span>\n        </a>\n        <a class="right carousel-control" href="#carousel-com-loan" role="button" data-slide="next" style="width:10%;" on-click="next-picB">\n            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n            <span class="sr-only">Next</span>\n        </a>\n    </div>\n</div>\n\n{{ else }}\n<div class="no-pics">\n    暂无相关资料\n</div>\n{{/if}}';
},{}],"/node_modules/@ds/format/index.js":[function(require,module,exports){
'use strict';

var moment = require('moment');
require('moment/locale/zh-cn');
var i18n = require('@ds/i18n')['zh-cn'].enums;

exports.mask = mask;

function mask(str, s, l) {
    if (!str) {
        return '';
    }
    var len = str.length;
    if (!len) {
        return '';
    }
    if (!l || l < 0) {
        l = len === 2 ? 1 : len - 2;
        s = s || 1;
    } else if (l > len - 1) {
        l = len - 1;
        s = !! s ? 1 : 0;
    }
    if (s > len) {
        s = len - 1;
    }
    str = str.substring(0, s) + (new Array(l + 1))
        .join('*') + str.substring(s + l);
    str = str.substring(0, len);
    return str;
}

exports.loan = parseLoan;

function parseLoan(loan) {
    loan.rate = loan.rate / 100;
    if (loan.timeSettled) {
        loan.borrowDueDate = formatBorrowDueDate(loan.timeSettled, loan
            .duration);
        loan.timeSettled = moment(loan.timeSettled)
            .format('YYYY-MM-DD');
    } else {
        // 借款成立日
        loan.dueDate = loan.timeout * 60 * 60 * 1000 + loan.timeOpen;
        loan.timeSettled = loan.dueDate + 1 * 24 * 60 * 60 * 1000;
        loan.borrowDueDate = formatBorrowDueDate(loan.timeSettled, loan
            .duration);
        loan.timeSettled = moment(loan.timeSettled)
            .format('YYYY-MM-DD');
    }
    loan.loanRequest.timeSubmit = moment(loan.loanRequest.timeSubmit).format('YYYY-MM-DD');
    loan.dueDate = moment(loan.dueDate || loan.timeSettled).format('YYYY-MM-DD');
    loan.methodZh = i18n.RepaymentMethod[loan.method][0];
    loan.timeLeft = formatLeftTime(loan.timeLeft);
    loan.purpose = i18n.LoanPurpose[loan.purpose];
    //格式化期限
    if (loan.duration.days > 0) {
        if (typeof loan.duration.totalDays === "undefined") {
            loan.fduration = loan.duration.days;
        } else {
            loan.fduration = loan.duration.totalDays;
        }
        loan.fdurunit = "天";
    } else {
        loan.fduration = loan.duration.totalMonths;
        loan.fdurunit = "个月";
    }
    //格式化序列号
    if (loan.providerProjectCode) {
        if (loan.providerProjectCode.indexOf('#') > 0) {
            var hh_project_code = loan.providerProjectCode.split('#');
            loan.fProjectType = hh_project_code[0];
            loan.fProjectCode = hh_project_code[1];
        } else {
            loan.fProjectType = '';
            loan.fProjectCode = loan.providerProjectCode;
        }
    }
    return loan;
}

// TODO 支持format
exports.timeLeft = formatLeftTime;

function formatLeftTime(leftTime) {
    var dd = Math.floor(leftTime / 1000 / 60 / 60 / 24);
    leftTime -= dd * 1000 * 60 * 60 * 24;
    var hh = Math.floor(leftTime / 1000 / 60 / 60);
    leftTime -= hh * 1000 * 60 * 60;
    var mm = Math.floor(leftTime / 1000 / 60);
    leftTime -= mm * 1000 * 60;
    var ss = Math.floor(leftTime / 1000);
    leftTime -= ss * 1000;

    return dd + '天' + hh + '小时' + mm + '分';
}

exports.dueDate = formatBorrowDueDate;

function formatBorrowDueDate(timeSettled, duration) {
    var borrowTime = moment(timeSettled)
        .format('YYYY-MM-DD');
    borrowTime = borrowTime.split('-');
    var year = parseInt(borrowTime[0], 10);
    var month = parseInt(borrowTime[1], 10);
    var day = parseInt(borrowTime[2]);
    var addMonth = month + duration.totalMonths;
    if (duration.days > 0) {
        return moment(timeSettled).add('days', duration.totalDays).format(
            'YYYY-MM-DD');
    } else {
        if (!(addMonth % 12)) {
            //console.log(addMonth);
            year = Math.floor(addMonth / 12) - 1 + year;
            month = addMonth - (Math.floor(addMonth / 12) - 1) * 12;
        } else {
            year = Math.floor(addMonth / 12) + year;
            month = addMonth - Math.floor(addMonth / 12) * 12;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    }
}

exports.repayments = repayments;

function repayments(body) {
    if (Array.isArray(body.data)) {
        var repayments = [];
        for (var i = 0; i < body.data.length; i++) {
            repayments.push(body.data[i].repayment);
        }
        return repayments;
    } else {
        return body.data.repayments;
    }
}

exports.proofsUri = proofsUri;

function proofsUri(body) {
    return body.map(function (p) {
        return {
            src: p.uri
        }
    });
}

exports.timePeriod = timePeriod;

function timePeriod(date) {
    date = date instanceof Date ? date : new Date();
    var hours = date.getHours();
    if (6 < hours && hours < 9) {
        return '早上';
    } else if (9 <= hours && hours < 12) {
        return '上午';
    } else if (12 <= hours && hours < 13) {
        return '中午';
    } else if (13 <= hours && hours < 18) {
        return '下午';
    } else {
        return '晚上';
    }
}

exports.loanList = parseLoanList;

function parseLoanList(loans) {
    var max = 4;
    var loanList = [];
    var openLoanLen = loans.open.length;
    var scheduledLoanLen = loans.scheduled.length;
    var finishedLoanLen = loans.finished.length;

    if (openLoanLen >= max) {
        addItem(loans.open.slice(0, max));
    } else {
        addItem(loans.open.slice(0, openLoanLen));
        if ((max - scheduledLoanLen) <= openLoanLen) {
            addItem(loans.scheduled.slice(0, max - openLoanLen));
        } else {
            addItem(loans.scheduled.slice(0, scheduledLoanLen));
            addItem(loans.finished.slice(0, max - openLoanLen -
                scheduledLoanLen));
            addItem(loans.settled.slice(0, max - openLoanLen -
                scheduledLoanLen - finishedLoanLen));
        }
    }

    function addItem(items) {
        if (!items.length) {
            return;
        }
        for (var i = 0, l = items.length; i < l; i++) {
            loanList.push(formatItem(items[i]));
        }
    }

    function formatItem(item) {
        item.rate = item.rate / 100;
        item.investPercent = parseInt(item.investPercent * 100, 10);
        //格式化期限
        if (item.duration.days > 0) {
            if (typeof item.duration.totalDays === "undefined") {
                item.fduration = item.duration.days;
            } else {
                item.fduration = item.duration.totalDays;
            }
            item.fdurunit = "天";
        } else {
            item.fduration = item.duration.totalMonths;
            item.fdurunit = "个月";
        }

        if (item.amount >= 10000) {
            item.amountUnit = '万';
            item.amount = (item.amount / 10000);
        } else {
            item.amountUnit = '元';
        }
        return item;
    }
    return loanList;
}

exports.date = function (date, fmt) {
    return date ? moment(date).format(fmt) : '';
};

/*
 * Format amount from pure number to money format.
 * e.g. 1234567 -> 1,234,567
 */
exports.amount = function (s, n) {
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
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    if (r) {
        return t.split("").reverse().join("") + "." + r; // 99.99
    } else {
        return t.split("").reverse().join("");
    }
};
//数字转换为带单位的
exports.unit = function (s, f) {
    var u = '',
        unit = '',
        v = '',
        w = 10000,
        y = 100000000,
        v1 = 0;
    s = (s + '').trim();
    if (s < w) {
        s = parseFloat(s).toFixed(0);
    } else if (s >= w && s < y) {
        s = (s / w).toFixed(2);
        u = '万';
    } else {
        s = (s / y).toFixed(2);
        u = '亿';
    }
    //小数点后.00则显示为整数 反之保留两位小数
    if ((s + '').indexOf('.') > -1) {
        v1 = (s + '').substring(parseFloat((s + '').indexOf('.')) + 1);
    }
    if (v1 > 0) {
        s = parseFloat(s).toFixed(2);
    } else {
        s = parseFloat(s).toFixed(0);
    }

    if (f) {
        return {
            v: s,
            unit: u
        }
    } else {
        return s + u;
    }
};
exports.maskEmail = function (email) {
    var match = (email || '').match(/^([^@]+)@([^\.]+)(.+)$/);
    if (!email) return email;
    var m1 = match[1].length > 5 ? match[1].substring(0, 5) : match[1];
    var m2 = match[2].length > 5 ? match[2].substring(0, 5) : match[2];
    return mask(m1, 2) + '@' + mask(m2, 2) + match[3];
};

exports.maskMobile = function (number, left, right) {
    if (!number) {
        return '';
    }
    left = left || 3;
    right = right || 4;
    var tmp = '';
    for (var i = 0; i < number.length; i++) {
        if (i < left || (number.length - right) <= i) {
            tmp += number[i];
        } else {
            tmp += '*';
        }
    }
    return tmp;
};

exports.bankAccount = function (str) {
    str = str.trim();
    var result = '';
    if (str.length == 16) {
        result = str.substring(0, 4) + ' ' + '**** ****' + ' ' + str.substring(12);
    } else if (str.length == 19) {
        result = str.substring(0, 6) + ' ' + '*******' + ' ' + str.substring(13);
    } else {
        console.error('Bank account number ' + str + ' is invalid');
        result = str;
    }
    //return result.replace(/\s/g, '&nbsp;')
    return result;
};

exports.duration = function (d) {
    var result = '';
    if (!d || 'object' != typeof d || (!d.years && !d.months && !d.days)) return result;
    if (d.years) result += d.years + '年';
    if (d.months) result += (result.length && !d.days ? '零' : '') + d.months + '个月';
    if (d.days) result += (result.length ? '零' : '') + d.days + '天';
    return result;
};

exports.cmsDate = function(list) {
    for (var i = 0; i < list.length; i++) {
        list[i].pubDate = moment(list[i].pubDate).format('YYYY-MM-DD');
    }
    return list;
};

/**
 * 格式化 0000000000001 39999999999999 这样的小数
 * 
 * @example 
 *  floatNum(0.300000000001) => 0.3
 *  floatNum(0.399999999999) => 0.4
 *  floatNum(1.999999999999) => 2
 */
exports.floatNum = function(num){
    var parts = String(Number(num)).split('.');
    
    // 没有小数部分
    if(parts.length === 1){
        return num;
    }
    
    // 小数不足6位
    if(parts[1].length < 6){
        return num;
    }
    
    var s = String(num);
    
    if(/\.9{6,}$/.test(s)){
        return Number(parts[0]) + 1;
    }
    
    return Number(s
        .replace(/\.?0{6,}\d$/,'')
        .replace(/(\d)9{6,}$/,function(match,num){ 
            return Number(num)+1; 
        }));
};

},{"@ds/i18n":"/node_modules/@ds/i18n/index.js","moment":"/moment","moment/locale/zh-cn":"/moment/locale/zh-cn"}],"/node_modules/@ds/i18n/index.js":[function(require,module,exports){
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

},{}],"/node_modules/bootstrap/js/carousel.js":[function(require,module,exports){
/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

},{}],"/node_modules/bootstrap/js/tooltip.js":[function(require,module,exports){
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

},{}],"/node_modules/bootstrap/js/transition.js":[function(require,module,exports){
/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

},{}]},{},["/ccc/loan/js/main/investDetail.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvemZjbS93b3JrL3Byb2plY3QtenFqci10bXAvd2ViL2NjYy9hY2NvdW50L2pzL21haW4vc2VydmljZS9hY2NvdW50LmpzIiwiL1VzZXJzL3pmY20vd29yay9wcm9qZWN0LXpxanItdG1wL3dlYi9jY2MvZ2xvYmFsL2pzL2xpYi9qcXVlcnkuZWFzeS1waWUtY2hhcnQuanMiLCIvVXNlcnMvemZjbS93b3JrL3Byb2plY3QtenFqci10bXAvd2ViL2NjYy9nbG9iYWwvanMvbGliL3V0aWxzLmpzIiwiL1VzZXJzL3pmY20vd29yay9wcm9qZWN0LXpxanItdG1wL3dlYi9jY2MvZ2xvYmFsL2pzL21vZHVsZXMvY2NjQm94LmpzIiwiL1VzZXJzL3pmY20vd29yay9wcm9qZWN0LXpxanItdG1wL3dlYi9jY2MvZ2xvYmFsL2pzL21vZHVsZXMvY2NjQ2FsY3VsYXRvci5qcyIsIi9Vc2Vycy96ZmNtL3dvcmsvcHJvamVjdC16cWpyLXRtcC93ZWIvY2NjL2dsb2JhbC9qcy9tb2R1bGVzL2NjY0NvbmZpcm0uanMiLCIvVXNlcnMvemZjbS93b3JrL3Byb2plY3QtenFqci10bXAvd2ViL2NjYy9nbG9iYWwvanMvbW9kdWxlcy9jY2NPay5qcyIsIi9Vc2Vycy96ZmNtL3dvcmsvcHJvamVjdC16cWpyLXRtcC93ZWIvY2NjL2dsb2JhbC9qcy9tb2R1bGVzL2NvbW1vbi5qcyIsIi9Vc2Vycy96ZmNtL3dvcmsvcHJvamVjdC16cWpyLXRtcC93ZWIvY2NjL2dsb2JhbC9qcy9tb2R1bGVzL3Rvb2x0aXAuanMiLCIvLS9jY2MvZ2xvYmFsL3BhcnRpYWxzL21vZHVsZXMvY2NjQ2FsY3VsYXRvci5odG1sIiwiLy0vY2NjL2dsb2JhbC9wYXJ0aWFscy9tb2R1bGVzL2NjY0NvbmZpcm0uaHRtbCIsIi8tL2NjYy9nbG9iYWwvcGFydGlhbHMvbW9kdWxlcy9jY2NPay5odG1sIiwiL1VzZXJzL3pmY20vd29yay9wcm9qZWN0LXpxanItdG1wL3dlYi9jY2MvbG9hbi9qcy9tYWluL2JpZ1BpYy5qcyIsIi9Vc2Vycy96ZmNtL3dvcmsvcHJvamVjdC16cWpyLXRtcC93ZWIvY2NjL2xvYW4vanMvbWFpbi9pbnZlc3REZXRhaWwuanMiLCIvVXNlcnMvemZjbS93b3JrL3Byb2plY3QtenFqci10bXAvd2ViL2NjYy9sb2FuL2pzL21haW4vc2VydmljZS9sb2Fucy5qcyIsIi8tL2NjYy9sb2FuL3BhcnRpYWxzL2JpZ1BpYy5odG1sIiwiLy0vY2NjL2xvYW4vcGFydGlhbHMvY291bnREb3duLmh0bWwiLCIvLS9jY2MvbG9hbi9wYXJ0aWFscy9kb0ludmVzdE9uRGV0YWlsLmh0bWwiLCIvLS9jY2MvbG9hbi9wYXJ0aWFscy9wYWdlclJlY29yZC5odG1sIiwiLy0vY2NjL2xvYW4vcGFydGlhbHMvcmVjb3JkLmh0bWwiLCIvLS9jY2MvbG9hbi9wYXJ0aWFscy9yZWxhdGVEYXRhT25EZXRhaWwuaHRtbCIsIi8tL25vZGVfbW9kdWxlcy9AZHMvZm9ybWF0L2luZGV4LmpzIiwiLy0vbm9kZV9tb2R1bGVzL0Bkcy9pMThuL2luZGV4LmpzIiwiLy0vbm9kZV9tb2R1bGVzL0Bkcy9pMThuL3poLWNuLmpzb24iLCIvLS9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL2Nhcm91c2VsLmpzIiwiLy0vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy90b29sdGlwLmpzIiwiLy0vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy90cmFuc2l0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNLQSxZQUFZLENBQUM7O0FBRWIsT0FBTyxDQUFDLGNBQWMsR0FBRztBQUNyQixpQkFBYSxFQUFFLHVCQUFVLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDakMsZUFBTyxDQUFDLE1BQU0sRUFBRSxrQ0FBa0MsQ0FBQyxDQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNWLEdBQUcsRUFBRSxD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SyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJ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QUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQixDQUFDLENBQUE7S0FDTDtDQUNSLENBQUM7OztBQ3JDRjs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pZQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKG4pe1widXNlIHN0cmljdFwiO2lmKG4uQkNQJiZcImZ1bmN0aW9uXCI9PT10eXBlb2Ygbi5CQ1AucHJlbHVkZSlyZXR1cm4gbi5CQ1AucHJlbHVkZTt2YXIgZT1uLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8bi5zZXRJbW1lZGlhdGV8fGZ1bmN0aW9uKG4pe3JldHVybiBzZXRUaW1lb3V0KG4sMSl9O3RoaXMuUUFTPWZ1bmN0aW9uKG4pe3ZhciBlPW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxuLnNldEltbWVkaWF0ZXx8ZnVuY3Rpb24obil7cmV0dXJuIHNldFRpbWVvdXQobiwxKX07dmFyIHI9W10uY29uY2F0KG4uX3Fhc19xdWV1ZXx8W10pO2lmKG4uX3Fhc19xdWV1ZSlkZWxldGUgbi5fcWFzX3F1ZXVlO3ZhciB0PUFycmF5LnByb3RvdHlwZS5zbGljZTt2YXIgdT1mdW5jdGlvbihuKXt2YXIgZT10LmNhbGwoYXJndW1lbnRzLDEpO2lmKHUubG9hZGVkKW8obixlKTtlbHNlIHIucHVzaChbbixlXSk7cmV0dXJuIHV9O3Uuc3luYz1mdW5jdGlvbihuKXtuLnN5bmM9dHJ1ZTtyZXR1cm4gdS5hcHBseShudWxsLGFyZ3VtZW50cyl9O3UucmVhZHk9aTt1LnN5bmMucmVhZHk9aTtmdW5jdGlvbiBpKCl7dS5sb2FkZWQ9dHJ1ZTt2YXIgbjt3aGlsZShuPXIuc2hpZnQoKSl7byhuWzBdLG5bMV0pfX1mdW5jdGlvbiBvKHIsdCl7aWYodHlwZW9mIHIhPVwiZnVuY3Rpb25cIilyZXR1cm47ci5zeW5jP3IuYXBwbHkobix0KTplKGZ1bmN0aW9uKCl7ci5hcHBseShuLHQpfSl9cmV0dXJuIHV9KHRoaXMpO3ZhciByPW4uQkNQPXQ7ZnVuY3Rpb24gdChuKXtRQVMobixsKFtdKSl9dC5zeW5jPWZ1bmN0aW9uKG4pe1FBUy5zeW5jKG4sbChbXSkpfTtyLnByZWx1ZGU9YztyLm1lcmdlTW9kdWxlcz1hO3ZhciB1PTA7dmFyIGk9ci5jYWNoZT17fTt2YXIgbz1yLm1vZHVsZXM9e307cmV0dXJuIGM7ZnVuY3Rpb24gYShuKXtuPW58fHt9O2Zvcih2YXIgZSBpbiBuKXtpZih0eXBlb2YgZSE9PVwibnVtYmVyXCImJm4uaGFzT3duUHJvcGVydHkoZSkpe2lmKCEoZSBpbiBvKSl7b1tlXT1uW2VdO2lmKGVbMF0hPT1cIi9cIilvW1wiL1wiK2VdPW5bZV19fX19ZnVuY3Rpb24gZigpe3UrPTE7ZShmdW5jdGlvbigpe2lmKHU+PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRbZGF0YS1jb21tb25dXCIpLmxlbmd0aCl7UUFTLnJlYWR5KCl9fSl9ZnVuY3Rpb24gYyhuLGUsdCl7ci5tZXJnZU1vZHVsZXMobik7dmFyIHU9bCh0KTtpZighdHx8IXQubGVuZ3RoKXtmKCl9ZWxzZXt2YXIgaTtRQVMoZnVuY3Rpb24obil7d2hpbGUoaT1uLnNoaWZ0KCkpe3UoaSl9fSx0KX1yZXR1cm4gdX1mdW5jdGlvbiBsKG4pe3JldHVybiBmdW5jdGlvbiBlKHIpe2lmKCFRQVMubG9hZGVkKXt0aHJvdyBuZXcgRXJyb3IoXCJleHRlcm5hbCBsaWJzIG5vdCByZWFkeSFcIil9dmFyIHQ9cjtpZih0eXBlb2YgdD09PVwic3RyaW5nXCImJnRbMF09PT1cIi9cIil7dD10LnJlcGxhY2UoL15cXC8vLFwiXCIpfXZhciB1O2lmKCFpW3RdKXtpZighKHU9b1t0XSkpe2lmKCEodT1vW3I9PT1cIi9cIit0P3I6dD1cIi9cIit0XSkpe2lmKCEodT1vW3Q9XCIvbm9kZV9tb2R1bGVzXCIrdF0pKXt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3IrXCInXFxuXFxuYWxsIGF2YWlsYWJsZSBtb2R1bGVzOlxcblwiK3MoKS5qb2luKFwiXFxuXCIpKTthLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCI7dGhyb3cgYX19fXZhciBmPWlbdF09aVtyXT17ZXhwb3J0czp7fX07dVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihuKXt2YXIgcj11WzFdW25dO3JldHVybiBlKHI/cjpcIi9cIituKX0sZixmLmV4cG9ydHMsYyxvLGksbil9cmV0dXJuIGlbdF0uZXhwb3J0c319ZnVuY3Rpb24gcygpe3ZhciBuPXt9O3AobyxmdW5jdGlvbihlLHIpe2lmKChcIlwiK3IpLm1hdGNoKC9eXFwvP1xcZCskLykpcmV0dXJuO25bci5yZXBsYWNlKC9eXFwvKG5vZGVfbW9kdWxlc1xcLyk/LyxcIlwiKV09MX0pO3JldHVybiBtKG4pfWZ1bmN0aW9uIGQobixlKXt2YXIgcix0O2ZvcihyPTAsdD1uLmxlbmd0aDtyPHQ7cisrKXtlLmNhbGwobixuW3JdLGssbil9fWZ1bmN0aW9uIHAobixlKXtmb3IodmFyIHIgaW4gbil7aWYobi5oYXNPd25Qcm9wZXJ0eShyKSl7ZS5jYWxsKG4sbltyXSxyLG4pfX19ZnVuY3Rpb24gbShuKXt2YXIgZT1bXTtwKG4sZnVuY3Rpb24obixyKXtlLnB1c2gocil9KTtyZXR1cm4gZX19KS5jYWxsKHRoaXMsdGhpcykiLCIvKipcbiAqIEBmaWxlIOi0puaIt+aVsOaNruWvueaOpeaooeWdl+S6pOS6kumAu+i+kVxuICogQGF1dGhvciBodWlwKGh1aS5wZW5nQGNyZWRpdGNsb3VkLmNvbSlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuYWNjb3VudFNlcnZpY2UgPSB7XG4gICAgcmVnaXN0ZXJVbXBheTogZnVuY3Rpb24gKHVzZXIsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnUE9TVCcsICcvYXBpL3YyL3VwYXltZW50L3JlZ2lzdGVyL01ZU0VMRicpXG4gICAgICAgICAgICAudHlwZSgnZm9ybScpXG4gICAgICAgICAgICAuc2VuZCh1c2VyKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIG5leHQoci5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgYmluZEFncmVtZW50OiBmdW5jdGlvbihhZ3JlZW1lbnRMaXN0LG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnUE9TVCcsICcvYXBpL3YyL3VwYXltZW50L2JpbmRBZ3JlZW1lbnQvTVlTRUxGJylcbiAgICAgICAgICAgIC50eXBlKCdmb3JtJylcbiAgICAgICAgICAgIC5zZW5kKHthZ3JlZW1lbnRMaXN0OiBhZ3JlZW1lbnRMaXN0fSlcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHIuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBnZXRMb2FuQ291bnQ6IGZ1bmN0aW9uKHN0YXR1cyxuZXh0KXsgICAgICAgICBcbiAgICAgICAgdmFyIGFwaSA9ICcvYXBpL3YyL3VzZXIvTVlTRUxGL2xvYW4vY291bnQnO1xuICAgICAgICBhcGkgPSBhcGkrc3RhdHVzO1xuICAgICAgICByZXF1ZXN0KCdHRVQnLCBhcGkpICAgICAgICAgICAgICAgIFxuICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIHIuYm9keS5kYXRhID4gMCApeyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIG5leHQoci5ib2R5LmRhdGEpOyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGF1dGhlbnRpY2F0ZVVzZXI6IGZ1bmN0aW9uKHVzZXIsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnUE9TVCcsICcvYXBpL3YyL2xpYW5saWFucGF5L2F1dGhlbnRpY2F0ZVVzZXIvTVlTRUxGJylcbiAgICAgICAgICAgIC50eXBlKCdmb3JtJylcbiAgICAgICAgICAgIC5zZW5kKHVzZXIpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjaGVja0F1dGhlbnRpY2F0ZTogZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnR0VUJywgJy9hcGkvdjIvdXNlci9NWVNFTEYvYXV0aGVudGljYXRlcycpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRQcm92aW5jZTogZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnR0VUJywgJy9hcGkvdjIvbGlhbmxpYW5wYXkvcHJvdmluY2VDb2RlcycpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRDaXR5OiBmdW5jdGlvbiAocHJvdmluY2VOYW1lLCBuZXh0KSB7XG4gICAgICAgIHJlcXVlc3QoJ0dFVCcsICcvYXBpL3YyL2xpYW5saWFucGF5L3Byb3ZpbmNlQ2l0eUNvZGVzLycgKyBwcm92aW5jZU5hbWUpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mbzogZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnR0VUJywgJy9hcGkvdjIvdXNlci9NWVNFTEYvdXNlcmluZm8nKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIG5leHQoci5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0QWNjb3VudDogZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnR0VUJywgJy9hcGkvdjIvdXNlci9NWVNFTEYvZnVuZGFjY291bnRzJylcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHIuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGZlZWRiYWNrOmZ1bmN0aW9uKHVzZXJJZCxwYXJhbXMsbmV4dCl7XG4gICAgICAgICAgcmVxdWVzdCgnUE9TVCcsICcvYXBpL3YyL3VzZXIvJyt1c2VySWQrJy9mZWVkYmFjaycpXG4gICAgICAgICAgICAudHlwZSgnZm9ybScpXG4gICAgICAgICAgICAuc2VuZChwYXJhbXMpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH0sXG4gICAgc2F2ZUF1dG9CaWRDb25maWc6IGZ1bmN0aW9uKHBhcmFtcywgbmV4dCl7XG4gICAgICAgICQucG9zdCgnL2FwaS92Mi91c2VyL01ZU0VMRi9zYXZlX2F1dG9iaWRfY29uZmlnJywgcGFyYW1zLCBmdW5jdGlvbihyKXtcbiAgICAgICAgICAgIG5leHQocik7XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRUb3RhbEludGVyczpmdW5jdGlvbihuZXh0KXtcbiAgICAgICAgIHJlcXVlc3QoJ0dFVCcsICcvYXBpL3YyL3BvaW50cy91c2VyLycrQ0MudXNlci5pZCsnL2dldFRvdGFsUG9pbnRzJylcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHIuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGluaXRpYWxQYXNzd29yZDogZnVuY3Rpb24gKHBhc3N3b3JkLCBuZXh0KSB7XG4gICAgICAgIHJlcXVlc3QoJ1BPU1QnLCAnL2FwaS92Mi91c2VyL01ZU0VMRi9zZXRQYXltZW50UGFzc3dvcmQnKVxuICAgICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICAgICAgICAgICAgLnNlbmQoe3Bhc3N3b3JkIDogcGFzc3dvcmR9KVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIG5leHQoci5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlUGFzc3dvcmQ6IGZ1bmN0aW9uIChvbGRQYXNzd29yZCwgbmV3UGFzc3dvcmQsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnUE9TVCcsICcvYXBpL3YyL3VzZXIvTVlTRUxGL3VwZGF0ZVBheW1lbnRQYXNzd29yZCcpXG4gICAgICAgICAgICAudHlwZSgnZm9ybScpXG4gICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgb2xkUGFzc3dvcmQgOiBvbGRQYXNzd29yZCxcbiAgICAgICAgICAgICAgICBuZXdQYXNzd29yZCA6IG5ld1Bhc3N3b3JkXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIG5leHQoci5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVzZXRQYXNzd29yZDogZnVuY3Rpb24gKHBhc3N3b3JkLCBuZXh0KSB7XG4gICAgICAgIHJlcXVlc3QoJ1BPU1QnLCAnL2FwaS92Mi91c2VyL01ZU0VMRi9yZXNldFBheW1lbnRQYXNzd29yZCcpXG4gICAgICAgICAgICAudHlwZSgnZm9ybScpXG4gICAgICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICAgICAgcGFzc3dvcmQgOiBwYXNzd29yZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHIuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNoZWNrUGFzc3dvcmQ6IGZ1bmN0aW9uIChwYXNzd29yZCwgbmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdHRVQnLCAnL2FwaS92Mi91c2VyL01ZU0VMRi92YWxpZGF0ZVBheW1lbnRQYXNzd29yZD9wYXNzd29yZD0nICsgcGFzc3dvcmQpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXROZXdNZXNzYWdlTnVtOiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdHRVQnLCAnL2FwaS92Mi9tZXNzYWdlL2NvdW50TmV3Tm90aWZpY2F0aW9ucy9NWVNFTEYnKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIG5leHQoci5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNi4zXG4vKlxuRWFzeSBwaWUgY2hhcnQgaXMgYSBqcXVlcnkgcGx1Z2luIHRvIGRpc3BsYXkgc2ltcGxlIGFuaW1hdGVkIHBpZSBjaGFydHMgZm9yIG9ubHkgb25lIHZhbHVlXG5cbkR1YWwgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHApXG5hbmQgR1BMIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL2dwbC1saWNlbnNlLnBocCkgbGljZW5zZXMuXG5cbkJ1aWx0IG9uIHRvcCBvZiB0aGUgalF1ZXJ5IGxpYnJhcnkgKGh0dHA6Ly9qcXVlcnkuY29tKVxuXG5Ac291cmNlOiBodHRwOi8vZ2l0aHViLmNvbS9yZW5kcm8vZWFzeS1waWUtY2hhcnQvXG5AYXV0b3I6IFJvYmVydCBGbGVpc2NobWFublxuQHZlcnNpb246IDEuMi4zXG5cbkluc3BpcmVkIGJ5OiBodHRwOi8vZHJpYmJibGUuY29tL3Nob3RzLzYzMTA3NC1TaW1wbGUtUGllLUNoYXJ0cy1JST9saXN0PXBvcHVsYXImb2Zmc2V0PTIxMFxuVGhhbmtzIHRvIFBoaWxpcCBUaHJhc2hlciBmb3IgdGhlIGpxdWVyeSBwbHVnaW4gYm9pbGVycGxhdGUgZm9yIGNvZmZlZSBzY3JpcHRcbiovXG5cbihmdW5jdGlvbigkKSB7XG4gICQuZWFzeVBpZUNoYXJ0ID0gZnVuY3Rpb24oZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgYWRkU2NhbGVMaW5lLCBhbmltYXRlTGluZSwgZHJhd0xpbmUsIGVhc2VJbk91dFF1YWQsIHJBRiwgcmVuZGVyQmFja2dyb3VuZCwgcmVuZGVyU2NhbGUsIHJlbmRlclRyYWNrLFxuICAgICAgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLiRlbCA9ICQoZWwpO1xuICAgIHRoaXMuJGVsLmRhdGEoXCJlYXN5UGllQ2hhcnRcIiwgdGhpcyk7XG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGVyY2VudCwgc2NhbGVCeTtcbiAgICAgIF90aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC5lYXN5UGllQ2hhcnQuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgcGVyY2VudCA9IHBhcnNlSW50KF90aGlzLiRlbC5kYXRhKCdwZXJjZW50JyksIDEwKTtcbiAgICAgIF90aGlzLnBlcmNlbnRhZ2UgPSAwO1xuICAgICAgX3RoaXMuY2FudmFzID0gJChcIjxjYW52YXMgd2lkdGg9J1wiICsgX3RoaXMub3B0aW9ucy5zaXplICsgXCInIGhlaWdodD0nXCIgKyBfdGhpcy5vcHRpb25zLnNpemUgKyBcIic+PC9jYW52YXM+XCIpLmdldCgwKTtcbiAgICAgIF90aGlzLiRlbC5hcHBlbmQoX3RoaXMuY2FudmFzKTtcbiAgICAgIGlmICh0eXBlb2YgR192bWxDYW52YXNNYW5hZ2VyICE9PSBcInVuZGVmaW5lZFwiICYmIEdfdm1sQ2FudmFzTWFuYWdlciAhPT0gbnVsbCkge1xuICAgICAgICBHX3ZtbENhbnZhc01hbmFnZXIuaW5pdEVsZW1lbnQoX3RoaXMuY2FudmFzKTtcbiAgICAgIH1cbiAgICAgIF90aGlzLmN0eCA9IF90aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuICAgICAgICBzY2FsZUJ5ID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgICQoX3RoaXMuY2FudmFzKS5jc3Moe1xuICAgICAgICAgIHdpZHRoOiBfdGhpcy5vcHRpb25zLnNpemUsXG4gICAgICAgICAgaGVpZ2h0OiBfdGhpcy5vcHRpb25zLnNpemVcbiAgICAgICAgfSk7XG4gICAgICAgIF90aGlzLmNhbnZhcy53aWR0aCAqPSBzY2FsZUJ5O1xuICAgICAgICBfdGhpcy5jYW52YXMuaGVpZ2h0ICo9IHNjYWxlQnk7XG4gICAgICAgIF90aGlzLmN0eC5zY2FsZShzY2FsZUJ5LCBzY2FsZUJ5KTtcbiAgICAgIH1cbiAgICAgIF90aGlzLmN0eC50cmFuc2xhdGUoX3RoaXMub3B0aW9ucy5zaXplIC8gMiwgX3RoaXMub3B0aW9ucy5zaXplIC8gMik7XG4gICAgICBfdGhpcy5jdHgucm90YXRlKF90aGlzLm9wdGlvbnMucm90YXRlICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICBfdGhpcy4kZWwuYWRkQ2xhc3MoJ2Vhc3lQaWVDaGFydCcpO1xuICAgICAgX3RoaXMuJGVsLmNzcyh7XG4gICAgICAgIHdpZHRoOiBfdGhpcy5vcHRpb25zLnNpemUsXG4gICAgICAgIGhlaWdodDogX3RoaXMub3B0aW9ucy5zaXplLFxuICAgICAgICBsaW5lSGVpZ2h0OiBcIlwiICsgX3RoaXMub3B0aW9ucy5zaXplICsgXCJweFwiXG4gICAgICB9KTtcbiAgICAgIF90aGlzLnVwZGF0ZShwZXJjZW50KTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24ocGVyY2VudCkge1xuICAgICAgcGVyY2VudCA9IHBhcnNlRmxvYXQocGVyY2VudCkgfHwgMDtcbiAgICAgIGlmIChfdGhpcy5vcHRpb25zLmFuaW1hdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGRyYXdMaW5lKHBlcmNlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5pbWF0ZUxpbmUoX3RoaXMucGVyY2VudGFnZSwgcGVyY2VudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICByZW5kZXJTY2FsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIF9pLCBfcmVzdWx0cztcbiAgICAgIF90aGlzLmN0eC5maWxsU3R5bGUgPSBfdGhpcy5vcHRpb25zLnNjYWxlQ29sb3I7XG4gICAgICBfdGhpcy5jdHgubGluZVdpZHRoID0gMTtcbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSBfaSA9IDA7IF9pIDw9IDI0OyBpID0gKytfaSkge1xuICAgICAgICBfcmVzdWx0cy5wdXNoKGFkZFNjYWxlTGluZShpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfTtcbiAgICBhZGRTY2FsZUxpbmUgPSBmdW5jdGlvbihpKSB7XG4gICAgICB2YXIgb2Zmc2V0O1xuICAgICAgb2Zmc2V0ID0gaSAlIDYgPT09IDAgPyAwIDogX3RoaXMub3B0aW9ucy5zaXplICogMC4wMTc7XG4gICAgICBfdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgX3RoaXMuY3R4LnJvdGF0ZShpICogTWF0aC5QSSAvIDEyKTtcbiAgICAgIF90aGlzLmN0eC5maWxsUmVjdChfdGhpcy5vcHRpb25zLnNpemUgLyAyIC0gb2Zmc2V0LCAwLCAtX3RoaXMub3B0aW9ucy5zaXplICogMC4wNSArIG9mZnNldCwgMSk7XG4gICAgICBfdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH07XG4gICAgcmVuZGVyVHJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvZmZzZXQ7XG4gICAgICBvZmZzZXQgPSBfdGhpcy5vcHRpb25zLnNpemUgLyAyIC0gX3RoaXMub3B0aW9ucy5saW5lV2lkdGggLyAyO1xuICAgICAgaWYgKF90aGlzLm9wdGlvbnMuc2NhbGVDb2xvciAhPT0gZmFsc2UpIHtcbiAgICAgICAgb2Zmc2V0IC09IF90aGlzLm9wdGlvbnMuc2l6ZSAqIDAuMDg7XG4gICAgICB9XG4gICAgICBfdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICBfdGhpcy5jdHguYXJjKDAsIDAsIG9mZnNldCwgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgICAgX3RoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgX3RoaXMuY3R4LnN0cm9rZVN0eWxlID0gX3RoaXMub3B0aW9ucy50cmFja0NvbG9yO1xuICAgICAgX3RoaXMuY3R4LmxpbmVXaWR0aCA9IF90aGlzLm9wdGlvbnMubGluZVdpZHRoO1xuICAgICAgX3RoaXMuY3R4LnN0cm9rZSgpO1xuICAgIH07XG4gICAgcmVuZGVyQmFja2dyb3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKF90aGlzLm9wdGlvbnMuc2NhbGVDb2xvciAhPT0gZmFsc2UpIHtcbiAgICAgICAgcmVuZGVyU2NhbGUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChfdGhpcy5vcHRpb25zLnRyYWNrQ29sb3IgIT09IGZhbHNlKSB7XG4gICAgICAgIHJlbmRlclRyYWNrKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBkcmF3TGluZSA9IGZ1bmN0aW9uKHBlcmNlbnQpIHtcbiAgICAgIHZhciBvZmZzZXQ7XG4gICAgICByZW5kZXJCYWNrZ3JvdW5kKCk7XG4gICAgICBfdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAkLmlzRnVuY3Rpb24oX3RoaXMub3B0aW9ucy5iYXJDb2xvcikgPyBfdGhpcy5vcHRpb25zLmJhckNvbG9yKHBlcmNlbnQpIDogX3RoaXMub3B0aW9ucy5iYXJDb2xvcjtcbiAgICAgIF90aGlzLmN0eC5saW5lQ2FwID0gX3RoaXMub3B0aW9ucy5saW5lQ2FwO1xuICAgICAgX3RoaXMuY3R4LmxpbmVXaWR0aCA9IF90aGlzLm9wdGlvbnMubGluZVdpZHRoO1xuICAgICAgb2Zmc2V0ID0gX3RoaXMub3B0aW9ucy5zaXplIC8gMiAtIF90aGlzLm9wdGlvbnMubGluZVdpZHRoIC8gMjtcbiAgICAgIGlmIChfdGhpcy5vcHRpb25zLnNjYWxlQ29sb3IgIT09IGZhbHNlKSB7XG4gICAgICAgIG9mZnNldCAtPSBfdGhpcy5vcHRpb25zLnNpemUgKiAwLjA4O1xuICAgICAgfVxuICAgICAgX3RoaXMuY3R4LnNhdmUoKTtcbiAgICAgIF90aGlzLmN0eC5yb3RhdGUoLU1hdGguUEkgLyAyKTtcbiAgICAgIF90aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIF90aGlzLmN0eC5hcmMoMCwgMCwgb2Zmc2V0LCAwLCBNYXRoLlBJICogMiAqIHBlcmNlbnQgLyAxMDAsIGZhbHNlKTtcbiAgICAgIF90aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgIF90aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfTtcbiAgICByQUYgPSAoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgfTtcbiAgICB9KSgpO1xuICAgIGFuaW1hdGVMaW5lID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgICAgIHZhciBhbmltLCBzdGFydFRpbWU7XG4gICAgICBfdGhpcy5vcHRpb25zLm9uU3RhcnQuY2FsbChfdGhpcyk7XG4gICAgICBfdGhpcy5wZXJjZW50YWdlID0gdG87XG4gICAgICBEYXRlLm5vdyB8fCAoRGF0ZS5ub3cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICsobmV3IERhdGUpO1xuICAgICAgfSk7XG4gICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgYW5pbSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3VycmVudFZhbHVlLCBwcm9jZXNzO1xuICAgICAgICBwcm9jZXNzID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAgICAgaWYgKHByb2Nlc3MgPCBfdGhpcy5vcHRpb25zLmFuaW1hdGUpIHtcbiAgICAgICAgICByQUYoYW5pbSk7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuY3R4LmNsZWFyUmVjdCgtX3RoaXMub3B0aW9ucy5zaXplIC8gMiwgLV90aGlzLm9wdGlvbnMuc2l6ZSAvIDIsIF90aGlzLm9wdGlvbnMuc2l6ZSwgX3RoaXMub3B0aW9ucy5zaXplKTtcbiAgICAgICAgcmVuZGVyQmFja2dyb3VuZC5jYWxsKF90aGlzKTtcbiAgICAgICAgY3VycmVudFZhbHVlID0gW2Vhc2VJbk91dFF1YWQocHJvY2VzcywgZnJvbSwgdG8gLSBmcm9tLCBfdGhpcy5vcHRpb25zLmFuaW1hdGUpXTtcbiAgICAgICAgX3RoaXMub3B0aW9ucy5vblN0ZXAuY2FsbChfdGhpcywgY3VycmVudFZhbHVlKTtcbiAgICAgICAgZHJhd0xpbmUuY2FsbChfdGhpcywgY3VycmVudFZhbHVlKTtcbiAgICAgICAgaWYgKHByb2Nlc3MgPj0gX3RoaXMub3B0aW9ucy5hbmltYXRlKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLm9wdGlvbnMub25TdG9wLmNhbGwoX3RoaXMsIGN1cnJlbnRWYWx1ZSwgdG8pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgckFGKGFuaW0pO1xuICAgIH07XG4gICAgZWFzZUluT3V0UXVhZCA9IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgIHZhciBlYXNlSW4sIGVhc2luZztcbiAgICAgIGVhc2VJbiA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucG93KHQsIDIpO1xuICAgICAgfTtcbiAgICAgIGVhc2luZyA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgaWYgKHQgPCAxKSB7XG4gICAgICAgICAgcmV0dXJuIGVhc2VJbih0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gMiAtIGVhc2VJbigodCAvIDIpICogLTIgKyAyKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHQgLz0gZCAvIDI7XG4gICAgICByZXR1cm4gYyAvIDIgKiBlYXNpbmcodCkgKyBiO1xuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuaW5pdCgpO1xuICB9O1xuICAkLmVhc3lQaWVDaGFydC5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBiYXJDb2xvcjogJyNlZjFlMjUnLFxuICAgIHRyYWNrQ29sb3I6ICcjZjJmMmYyJyxcbiAgICBzY2FsZUNvbG9yOiAnI2RmZTBlMCcsXG4gICAgbGluZUNhcDogJ3JvdW5kJyxcbiAgICByb3RhdGU6IDAsXG4gICAgc2l6ZTogMTEwLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgICBhbmltYXRlOiBmYWxzZSxcbiAgICBvblN0YXJ0OiAkLm5vb3AsXG4gICAgb25TdG9wOiAkLm5vb3AsXG4gICAgb25TdGVwOiAkLm5vb3BcbiAgfTtcbiAgJC5mbi5lYXN5UGllQ2hhcnQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuICQuZWFjaCh0aGlzLCBmdW5jdGlvbihpLCBlbCkge1xuICAgICAgdmFyICRlbCwgaW5zdGFuY2VPcHRpb25zO1xuICAgICAgJGVsID0gJChlbCk7XG4gICAgICBpZiAoISRlbC5kYXRhKCdlYXN5UGllQ2hhcnQnKSkge1xuICAgICAgICBpbnN0YW5jZU9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucywgJGVsLmRhdGEoKSk7XG4gICAgICAgIHJldHVybiAkZWwuZGF0YSgnZWFzeVBpZUNoYXJ0JywgbmV3ICQuZWFzeVBpZUNoYXJ0KGVsLCBpbnN0YW5jZU9wdGlvbnMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIHZvaWQgMDtcbn0pKGpRdWVyeSk7XG5cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cblxuICAgIC8vIOWFrOeUqOihqOWNlemqjOivgee7hOS7tlxuXG4gICAgdmFyIEZvcm1WYWxpZGF0b3IgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIEZvcm1WYWxpZGF0b3IucHJvdG90eXBlID0ge1xuXG4gICAgICAgIGNoZWNrTG9naW5OYW1lOiBmdW5jdGlvbiAobG9naW5OYW1lLCBuZXh0KSB7XG4gICAgICAgICAgICB2YXIgcmVnID1cbiAgICAgICAgICAgICAgICAvXig/ISgoWzFdWzN8NXw3fDhdWzAtOV17OX0pfChbXFx3LV0rKFxcLltcXHctXSspKkBbXFx3LV0rKFxcLltcXHctXSspKykpKShbMC05YS16QS1aX1xcdTRFMDAtXFx1OUZCRl0rKS87XG5cbiAgICAgICAgICAgIGlmICghbG9naW5OYW1lIHx8ICFsb2dpbk5hbWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ0xPR0lOTkFNRV9OVUxMJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobG9naW5OYW1lLmxlbmd0aCA8IDIgfHwgbG9naW5OYW1lLmxlbmd0aCA+IDMwKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ0xPR0lOTkFNRV9TSVpFJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoJycgKyBsb2dpbk5hbWUpLm1hdGNoKC9bXFx3LV0rKFxcLltcXHctXSspKkBbXFx3LV0rKFxcLltcXHctXSspKy8pKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ0xPR0lOTkFNRV9OT1RfRU1BSUwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghISgnJyArIGxvZ2luTmFtZSkubWF0Y2goL15bMV1bM3w1fDd8OF1bMC05XXs5fSQvKSkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdMT0dJTk5BTUVfTk9UX01PQklMRScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV4dCh0cnVlLCBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja1JlZ2lzdGVyTmFtZTogZnVuY3Rpb24gKHJlZ2lzdGVyTmFtZSwgbmV4dCkge1xuICAgICAgICAgICAgdmFyIHJlZyA9XG4gICAgICAgICAgICAgICAgL14oPyEoKFsxXVszfDV8N3w4XVswLTldezl9KXwoW1xcdy1dKyhcXC5bXFx3LV0rKSpAW1xcdy1dKyhcXC5bXFx3LV0rKSspKSkoWzAtOWEtekEtWl9cXHU0RTAwLVxcdTlGQkZdKykvO1xuXG4gICAgICAgICAgICBpZiAoIXJlZ2lzdGVyTmFtZSB8fCAhcmVnaXN0ZXJOYW1lLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdMT0dJTk5BTUVfTlVMTCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEoJycgKyByZWdpc3Rlck5hbWUpXG4gICAgICAgICAgICAgICAgLm1hdGNoKHJlZykpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnTE9HSU5OQU1FX0lOVkFMSUQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZWdpc3Rlck5hbWUuaW5kZXhPZignLScpID49IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnTE9HSU5OQU1FX0lOVkFMSUQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZWdpc3Rlck5hbWUubGVuZ3RoIDwgMiB8fCByZWdpc3Rlck5hbWUubGVuZ3RoID5cbiAgICAgICAgICAgICAgICAzMCkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdMT0dJTk5BTUVfU0laRScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV4dCh0cnVlLCBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja1Bhc3N3b3JkOiBmdW5jdGlvbiAocGFzc3dvcmQsIG5leHQpIHtcblxuICAgICAgICAgICAgaWYgKCFwYXNzd29yZCB8fCAhcGFzc3dvcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ1BBU1NXT1JEX05VTEwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXNzd29yZC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ1BBU1NXT1JEX0xFTkdUSCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV4dCh0cnVlLCBudWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tSZVBhc3N3b3JkOiBmdW5jdGlvbiAocGFzc3dvcmQsIHJlcGFzc3dvcmQsIG5leHQpIHtcblxuICAgICAgICAgICAgaWYgKCFyZXBhc3N3b3JkIHx8ICFyZXBhc3N3b3JkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdSRVBBU1NXUk9EX05VTEwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXBhc3N3b3JkICE9PSBwYXNzd29yZCkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdSRVBBU1NXT1JEX0lOVkFMSUQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5leHQodHJ1ZSwgbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tFbWFpbDogZnVuY3Rpb24gKGVtYWlsLCBuZXh0KSB7XG4gICAgICAgICAgICBpZiAoIWVtYWlsIHx8ICFlbWFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnRU1BSUxfTlVMTCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKCcnICsgZW1haWwpLm1hdGNoKC9bXFx3LV0rKFxcLltcXHctXSspKkBbXFx3LV0rKFxcLltcXHctXSspKy8pKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ0VNQUlMX0lOVkFMSUQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0KHRydWUsIG51bGwpO1xuICAgICAgICB9LFxuICAgICAgICBjaGVja01vYmlsZTogZnVuY3Rpb24gKG1vYmlsZSwgbmV4dCkge1xuICAgICAgICAgICAgaWYgKCFtb2JpbGUgfHwgIW1vYmlsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnTU9CSUxFX05VTEwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISgnJyArIG1vYmlsZSlcbiAgICAgICAgICAgICAgICAubWF0Y2goL15bMV1bM3w1fDd8OF1bMC05XXs5fSQvKSkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdNT0JJTEVfSU5WQUxJRCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHQodHJ1ZSwgbnVsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrSWROdW1iZXI6IGZ1bmN0aW9uIChpZE51bWJlciwgbmV4dCkge1xuICAgICAgICAgICAgaWROdW1iZXIgPSAoJycgKyBpZE51bWJlcikucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgICAgICAgICAgdmFyIHBjb2RlID0gW107IC8v5Y+q5pyJ6L+Z5Lqb5pWw5a2X5byA5aS055qE5Luj56CB5omN5piv5ZCI5rOV55qEXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMTFcIik7IC8v5YyX5LqsXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMTJcIik7IC8v5aSp5rSlXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMTNcIik7IC8v5rKz5YyXXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMTRcIik7IC8v5bGx6KW/XG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMTVcIik7IC8v5YaF6JKZ5Y+kXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMjFcIik7IC8v6L695a6BXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMjJcIik7IC8v5ZCJ5p6XXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMjNcIik7IC8v6buR6b6Z5rGfXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMzFcIik7IC8v5LiK5rW3XG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMzJcIik7IC8v5rGf6IuPXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMzNcIik7IC8v5rWZ5rGfXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMzRcIik7IC8v5a6J5b69XG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMzVcIik7IC8v56aP5bu6XG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMzZcIik7IC8v5rGf6KW/XG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiMzdcIik7IC8v5bGx5LicXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNDFcIik7IC8v5rKz5Y2XXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNDJcIik7IC8v5rmW5YyXXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNDNcIik7IC8v5rmW5Y2XXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNDRcIik7IC8v5bm/5LicXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNDVcIik7IC8v5bm/6KW/XG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNDZcIik7IC8v5rW35Y2XXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNTBcIik7IC8v6YeN5bqGXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNTFcIik7IC8v5Zub5bedXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNTJcIik7IC8v6LS15beeXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNTNcIik7IC8v5LqR5Y2XXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNTRcIik7IC8v6KW/6JePXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNjFcIik7IC8v6ZmV6KW/XG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNjJcIik7IC8v55SY6IKDXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNjNcIik7IC8v6Z2S5rW3XG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNjRcIik7IC8v5a6B5aSPXG4gICAgICAgICAgICBwY29kZS5wdXNoKFwiNjVcIik7IC8v5paw55aGXG4gICAgICAgICAgICBpZiAoIX5wY29kZS5pbmRleE9mKGlkTnVtYmVyLnN1YnN0cmluZygwLCAyKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnSUROVU1CRVJfSU5WQUxJRCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJ0lETlVNQkVSX0lOVkFMSUQnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZmFjdG9yID0gWzcsIDksIDEwLCA1LCA4LCA0LCAyLCAxLCA2LCAzLCA3LCA5LFxuICAgICAgICAgICAgICAgIDEwLCA1LCA4LCA0LFxuICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB2YXIgdmFsaWRFbmRpbmcgPSBbXCIxXCIsIFwiMFwiLCBcIlhcIiwgXCI5XCIsIFwiOFwiLCBcIjdcIixcbiAgICAgICAgICAgICAgICBcIjZcIiwgXCI1XCIsIFwiNFwiLFxuICAgICAgICAgICAgICAgIFwiM1wiLCBcIjJcIlxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlkTnVtYmVyWzE3XSAhPSB2YWxpZEVuZGluZ1tfLnJlZHVjZShmYWN0b3IsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHIsIG4sIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIgKyBuICogfn5pZE51bWJlcltpXTtcbiAgICAgICAgICAgICAgICB9LCAwKSAlIDExXSkge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdJRE5VTUJFUl9JTlZBTElEJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAnSUROVU1CRVJfSU5WQUxJRCdcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgICAgIG5leHQodHJ1ZSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tOYW1lOiBmdW5jdGlvbiAobmFtZSwgbmV4dCkge1xuICAgICAgICAgICAgaWYgKCFuYW1lIHx8ICFuYW1lLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdOQU1FX05VTEwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISgnJyArIG5hbWUpXG4gICAgICAgICAgICAgICAgLm1hdGNoKC9bXFx1NEUwMC1cXHU5RkJGXXsyLDE1fS8pKSB7XG4gICAgICAgICAgICAgICAgbmV4dChmYWxzZSwgJ05BTUVfSU5WQUxJRCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHQodHJ1ZSwgbnVsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrU21zQ2FwdGNoYTogZnVuY3Rpb24gKHNtcywgbmV4dCkge1xuICAgICAgICAgICAgaWYgKCFzbXMgfHwgIXNtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlLCAnU01TQ0FQVENIQV9OVUxMJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc21zLmxlbmd0aCAhPT0gNikge1xuICAgICAgICAgICAgICAgIG5leHQoZmFsc2UsICdTTVNDQVBUQ0hBX0lOVkFMSUQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0KHRydWUsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBFcnJvck1zZyA9IHtcbiAgICAgICAgUEFTU1dPUkRfTlVMTDogJ+ivt+Whq+WGmeWvhueggSzkuI3og73kuLrnqbrlrZfnrKYnLFxuICAgICAgICBQQVNTV09SRF9MRU5HVEg6ICflr4bnoIHnlLE2LTIw5L2N5pWw5a2X5ZKM5a2X5q+N57uE5oiQ77yM5Yy65YiG5aSn5bCP5YaZ77yM5LiN6IO95YyF5ZCr56m65a2X56ymJyxcbiAgICAgICAgUEFTU1dPUkRfQUdBSU5fTlVMTDogJ+ivt+Whq+WGmeWvhueggeehruiupCcsXG4gICAgICAgIFBBU1NXT1JEX0FHQUlOX0lOVkFMSUQ6ICfkuKTmrKHovpPlhaXnmoTlr4bnoIHkuI3kuIDoh7QnLFxuICAgICAgICBSRVBBU1NXT1JEX05VTEw6ICfor7floavlhpnlr4bnoIHnoa7orqQnLFxuICAgICAgICBSRVBBU1NXT1JEX0lOVkFMSUQ6ICfkuKTmrKHovpPlhaXnmoTlr4bnoIHkuI3kuIDoh7QnLFxuICAgICAgICBNT0JJTEVfVVNFRDogJ+aJi+acuuWPt+eggeW3suiiq+S9v+eUqCcsXG4gICAgICAgIE1PQklMRV9DQVBUQ0hBX05VTEw6ICfor7floavlhpnmiYvmnLrnn63kv6Hpqozor4HnoIEnLFxuICAgICAgICBNT0JJTEVfQ0FQVENIQV9JTlZBTElEOiAn6aqM6K+B56CB5peg5pWI5oiW5bey6L+H5pyf77yM6K+35bCd6K+V6YeN5paw5Y+R6YCBJyxcbiAgICAgICAgTU9CSUxFX0NBUFRDSEFfRVhQSVJFRDogJ+mqjOivgeeggei/h+acn++8jOivt+WwneivlemHjeaWsOWPkemAgScsXG4gICAgICAgIEFHUkVFTUVOVF9OVUxMOiAn5rOo5YaM6ZyA5YWI5ZCM5oSP5pyN5Yqh5p2h5qy+JyxcbiAgICAgICAgQ0FQVENIQV9OVUxMOiAn6K+35aGr5YaZ6aqM6K+B56CBJyxcbiAgICAgICAgQ0FQVENIQV9JTlZBTElEOiAn6aqM6K+B56CB5LiN5q2j56GuJyxcbiAgICAgICAgTU9CSUxFX05VTEw6ICfor7floavlhpnmiYvmnLrlj7fnoIEnLFxuICAgICAgICBNT0JJTEVfSU5WQUxJRDogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPtycsXG4gICAgICAgIExPR0lOTkFNRV9FWElTVFM6ICfnlKjmiLflkI3lt7LlrZjlnKgnLFxuICAgICAgICBMT0dJTk5BTUVfU1RSSUNUOiAnMuiHszE15L2N5Lit6Iux5paH5a2X56ym44CB5pWw5a2X5oiW5LiL5YiS57q/JyxcbiAgICAgICAgTE9HSU5OQU1FX05VTEw6ICfor7floavlhpnnlKjmiLflkI0nLFxuICAgICAgICBMT0dJTk5BTUVfSU5WQUxJRDogJzLoh7MxNeS9jeS4reiLseaWh+Wtl+espuOAgeaVsOWtl+aIluS4i+WIkue6vycsXG4gICAgICAgIExPR0lOTkFNRV9TSVpFOiAnMuiHszE15L2N5Lit6Iux5paH5a2X56ym44CB5pWw5a2X5oiW5LiL5YiS57q/JyxcbiAgICAgICAgTE9HSU5OQU1FX05PVF9NT0JJTEU6ICfnlKjmiLflkI3kuI3og73mmK/miYvmnLrlj7fvvIjms6jlhozlkI7lj6/ku6XnlKjmiYvmnLrlj7fnmbvlvZXvvIknLFxuICAgICAgICBMT0dJTk5BTUVfTk9UX0VNQUlMOiAn55So5oi35ZCN5LiN6IO95piv6YKu566xJyxcbiAgICAgICAgTkFNRV9OVUxMOiAn6K+35aGr5YaZ55yf5a6e5aeT5ZCNJyxcbiAgICAgICAgTkFNRV9JTlZBTElEOiAn55yf5a6e5aeT5ZCN6ZSZ6K+v77yM5bqU5Li6Mi0xNeS9jeS4reaWh+axieWtlycsXG4gICAgICAgIEVNQUlMX05VTEw6ICfor7floavlhpnnlLXlrZDpgq7nrrEnLFxuICAgICAgICBFTUFJTF9JTlZBTElEOiAn6K+36L6T5YWl5q2j56Gu55qE6YKu566xJyxcbiAgICAgICAgSUROVU1CRVJfSU5WQUxJRDogJ+ivt+ato+ehruWhq+WGmSAxOCDkvY3ouqvku73or4Hlj7fnoIEnLFxuICAgICAgICBMT0dJTl9JTlZBTElEOiAn5omL5py65Y+35oiW5a+G56CB6ZSZ6K+vJyxcbiAgICAgICAgSU5WQUxJRF9DQVBUQ0hBOiAn6aqM6K+B56CB6ZSZ6K+vJyxcbiAgICAgICAgTE9HSU5OQU1FX05PVF9NQVRDSDogJ+aJi+acuuWPt+eggeS4jueZu+W9leWQjeS4jeWMuemFjScsXG4gICAgICAgIElOVklUQVRJT05fSU5WQUxJRDogJ0jnoIHml6DmlYgnLFxuICAgICAgICBJTlZJVEFUSU9OX05VTEw6ICdI56CB5Li656m6JyxcbiAgICAgICAgUEFZTUVOVF9BQ0NPVU5UX0NSRUFURV9FUlJPUjogJ+WbveaUv+mAmuWunuWQjeiupOivgeagoemqjOacqumAmui/hycsXG4gICAgICAgIFNNU0NBUFRDSEFfSU5WQUxJRDogJ+mqjOivgeeggeS4ujbkvY0nLFxuICAgICAgICBTTVNDQVBUQ0hBX05VTEw6ICfpqozor4HnoIHkuI3og73kuLrnqbonLFxuICAgICAgICBJRE5VTUJFUl9OVUxMOiAn6Lqr5Lu96K+B5Y+35LiN6IO95Li656m6J1xuICAgIH07XG5cbiAgICB2YXIgQ291bnREb3duID0gZnVuY3Rpb24gKCkge307XG5cbiAgICBDb3VudERvd24ucHJvdG90eXBlID0ge1xuICAgICAgICBnZXRDb3VudERvd25UaW1lOiBmdW5jdGlvbiAodGltZSwgc2VydmVyRGF0ZSwgbmV4dCkge1xuICAgICAgICAgICAgdGltZSA9IHBhcnNlSW50KHRpbWUsIDEwKTtcbiAgICAgICAgICAgIGlmICghdGltZSB8fCB0aW1lID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2hlY2tUaW1lID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBcIjBcIiArIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBsZWZ0VGltZSA9IChuZXcgRGF0ZSh0aW1lKSkgLSAobmV3IERhdGUoXG4gICAgICAgICAgICAgICAgc2VydmVyRGF0ZSkpO1xuICAgICAgICAgICAgaWYgKGxlZnRUaW1lIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZCA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwIC8gNjAgLyA2MCAvIDI0KTtcbiAgICAgICAgICAgIGxlZnRUaW1lIC09IGRkICogMTAwMCAqIDYwICogNjAgKiAyNDtcbiAgICAgICAgICAgIHZhciBoaCA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwIC8gNjAgLyA2MCk7XG4gICAgICAgICAgICBsZWZ0VGltZSAtPSBoaCAqIDEwMDAgKiA2MCAqIDYwO1xuICAgICAgICAgICAgdmFyIG1tID0gTWF0aC5mbG9vcihsZWZ0VGltZSAvIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICBsZWZ0VGltZSAtPSBtbSAqIDEwMDAgKiA2MDtcbiAgICAgICAgICAgIHZhciBzcyA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwKTtcblxuICAgICAgICAgICAgLy8g5YCS6K6h5pe25a6M5oiQ5ZCO5Yi35paw6aG16Z2iXG4gICAgICAgICAgICBpZiAoaGggPT09IDAgJiYgbW0gPT09IDAgJiYgc3MgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICB9KSwgMjAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZWZ0VGltZSAtPSBzcyAqIDEwMDA7XG4gICAgICAgICAgICBkZCA9IGNoZWNrVGltZShkZCk7XG4gICAgICAgICAgICBoaCA9IGNoZWNrVGltZShoaCk7XG4gICAgICAgICAgICBtbSA9IGNoZWNrVGltZShtbSk7XG4gICAgICAgICAgICBzcyA9IGNoZWNrVGltZShzcyk7XG4gICAgICAgICAgICB2YXIgbyA9IHtcbiAgICAgICAgICAgICAgICBkYXk6IGRkLFxuICAgICAgICAgICAgICAgIGhvdXI6IHBhcnNlSW50KGhoLCAxMCkgKyAoZGQgPiAwID8gZGQgKiAyNCA6XG4gICAgICAgICAgICAgICAgICAgIDApLFxuICAgICAgICAgICAgICAgIG1pbjogbW0sXG4gICAgICAgICAgICAgICAgc2VjOiBzc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbmV4dChvKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldENvdW50RG93blRpbWUyOiBmdW5jdGlvbiAodGltZSwgc2VydmVyRGF0ZSwgbmV4dCkge1xuICAgICAgICAgICAgdGltZSA9IHBhcnNlSW50KHRpbWUsIDEwKTtcbiAgICAgICAgICAgIGlmICghdGltZSB8fCB0aW1lID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2hlY2tUaW1lID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBcIjBcIiArIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBsZWZ0VGltZSA9IChuZXcgRGF0ZSh0aW1lKSkgLSAobmV3IERhdGUoXG4gICAgICAgICAgICAgICAgc2VydmVyRGF0ZSkpO1xuICAgICAgICAgICAgaWYgKGxlZnRUaW1lIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZCA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwIC8gNjAgLyA2MCAvIDI0KTtcbiAgICAgICAgICAgIGxlZnRUaW1lIC09IGRkICogMTAwMCAqIDYwICogNjAgKiAyNDtcbiAgICAgICAgICAgIHZhciBoaCA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwIC8gNjAgLyA2MCk7XG4gICAgICAgICAgICBsZWZ0VGltZSAtPSBoaCAqIDEwMDAgKiA2MCAqIDYwO1xuICAgICAgICAgICAgdmFyIG1tID0gTWF0aC5mbG9vcihsZWZ0VGltZSAvIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICBsZWZ0VGltZSAtPSBtbSAqIDEwMDAgKiA2MDtcbiAgICAgICAgICAgIHZhciBzcyA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwKTtcbiAgICAgICAgICAgIGxlZnRUaW1lIC09IHNzICogMTAwMDtcbiAgICAgICAgICAgIC8vZGQgPSBjaGVja1RpbWUoZGQpO1xuICAgICAgICAgICAgaGggPSBjaGVja1RpbWUoaGgpO1xuICAgICAgICAgICAgbW0gPSBjaGVja1RpbWUobW0pO1xuICAgICAgICAgICAgc3MgPSBjaGVja1RpbWUoc3MpO1xuICAgICAgICAgICAgdmFyIG8gPSB7XG4gICAgICAgICAgICAgICAgZGF5OiBkZCxcbiAgICAgICAgICAgICAgICBob3VyOiBoaCxcbiAgICAgICAgICAgICAgICBtaW46IG1tLFxuICAgICAgICAgICAgICAgIHNlYzogc3NcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgICAgIG5leHQobyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIOagvOW8j+WMlmR1cmF0aW9uXG4gICAgdmFyIGZvcm1hdGVEdXJhdGlvbiA9IGZ1bmN0aW9uIChkdXIpIHtcbiAgICAgICAgdmFyIF9tb250aCA9IDA7XG4gICAgICAgIGlmIChkdXIuZGF5cyA+IDApIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZHVyLnRvdGFsRGF5cyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIF9tb250aCA9IGR1ci5kYXlzICsgXCLlpKlcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX21vbnRoID0gZHVyLnRvdGFsRGF5cyArIFwi5aSpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZHVyLnllYXJzID4gMCkge1xuICAgICAgICAgICAgICAgIF9tb250aCArPSBkdXIueWVhcnMgKiAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkdXIubW9udGhzID4gMCkge1xuICAgICAgICAgICAgICAgIF9tb250aCArPSBkdXIubW9udGhzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX21vbnRoID0gX21vbnRoICsgXCLkuKrmnIhcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX21vbnRoO1xuICAgIH07XG5cbiAgICAvLyDmoLzlvI/ljJbpk7booYzljaHlj7dcbiAgICB2YXIgYmFua0FjY291bnQgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHN0ciA9IHN0ci50b1N0cmluZygpO1xuICAgICAgICBzdHIgPSBzdHIudHJpbSgpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICAgIGlmIChzdHIubGVuZ3RoID09PSAxNikge1xuICAgICAgICAgICAgcmVzdWx0ID0gc3RyLnN1YnN0cmluZygwLCA0KSArICcgJyArICcqKioqICoqKionICsgJyAnICtcbiAgICAgICAgICAgICAgICBzdHIuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAxMik7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyLmxlbmd0aCA9PT0gMTkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHN0ci5zdWJzdHJpbmcoMCwgNikgKyAnICcgKyAnKioqKioqKicgKyAnICcgK1xuICAgICAgICAgICAgICAgIHN0ci5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIDEzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0JhbmsgYWNjb3VudCBudW1iZXIgJyArIHN0ciArXG4gICAgICAgICAgICAgICAgJyBpcyBpbnZhbGlkJyk7XG4gICAgICAgICAgICByZXN1bHQgPSBzdHI7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZXR1cm4gcmVzdWx0LnJlcGxhY2UoL1xccy9nLCAnJm5ic3A7JylcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgLy8gZm9ybWF0IGFtb3VudFxuICAgIHZhciBmb3JtYXRBbW91bnQgPSBmdW5jdGlvbiAocywgbikge1xuICAgICAgICBuID0gbiA+IDAgJiYgbiA8PSAyMCA/IG4gOiAwO1xuICAgICAgICBpZiAocyA8IDApIHtcbiAgICAgICAgICAgIHZhciBfcyA9IDA7XG4gICAgICAgICAgICByZXR1cm4gX3MudG9GaXhlZChuKTtcbiAgICAgICAgfVxuICAgICAgICBzID0gcGFyc2VGbG9hdCgocyArIFwiXCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvW15cXGRcXC4tXS9nLCBcIlwiKSlcbiAgICAgICAgICAgIC50b0ZpeGVkKG4pICsgXCJcIjtcbiAgICAgICAgdmFyIGwgPSBzLnNwbGl0KFwiLlwiKVswXS5zcGxpdChcIlwiKVxuICAgICAgICAgICAgLnJldmVyc2UoKTtcbiAgICAgICAgdmFyIHIgPSBzLnNwbGl0KFwiLlwiKVsxXTtcbiAgICAgICAgdmFyIHQgPSBcIlwiLFxuICAgICAgICAgICAgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHQgKz0gbFtpXSArICgoaSArIDEpICUgMyA9PT0gMCAmJiAoaSArIDEpICE9PSBsLmxlbmd0aCA/XG4gICAgICAgICAgICAgICAgXCIsXCIgOlxuICAgICAgICAgICAgICAgIFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICByZXR1cm4gdC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgICAgICAuam9pbihcIlwiKSArIFwiLlwiICsgcjsgLy8gOTkuOTlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0LnNwbGl0KFwiXCIpXG4gICAgICAgICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiXCIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGZvcm1hdCBwZXJjZW50XG4gICAgdmFyIGZvcm1hdFBlcmNlbnQgPSBmdW5jdGlvbiAocGVyY2VudCwgb2Zmc2V0KSB7XG4gICAgICAgIHBlcmNlbnQgPSBwZXJjZW50LnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCB8fCBvZmZzZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBlcmNlbnQuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHBlcmNlbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcmNlbnQuc3Vic3RyaW5nKDAsIHBlcmNlbnQuaW5kZXhPZihcIi5cIikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVyY2VudC5zdWJzdHJpbmcoMCwgcGVyY2VudC5pbmRleE9mKFwiLlwiKSArXG4gICAgICAgICAgICAgICAgICAgIChvZmZzZXQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGZvcm1hdCB0aW1lRWxhcHNlZCBcblxuICAgIHZhciB0aW1lRWxhcHNlZCA9IGZ1bmN0aW9uICh0aW1lRWxhcHNlZCwgaXNvYmopIHtcbiAgICAgICAgaWYgKHRpbWVFbGFwc2VkIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzID0gfn4gKHRpbWVFbGFwc2VkIC8gMTAwMCksXG4gICAgICAgICAgICBtID0gMCxcbiAgICAgICAgICAgIGggPSAwLFxuICAgICAgICAgICAgZCA9IDA7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcblxuICAgICAgICBpZiAocyA+IDU5KSB7XG4gICAgICAgICAgICBtID0gfn4gKHMgLyA2MCk7XG4gICAgICAgICAgICBzID0gcyAlIDYwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtID4gNTkpIHtcbiAgICAgICAgICAgIGggPSB+fiAobSAvIDYwKTtcbiAgICAgICAgICAgIG0gPSBtICUgNjA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGggPiAyNCkge1xuICAgICAgICAgICAgZCA9IH5+IChoIC8gMjQpO1xuICAgICAgICAgICAgaCA9IGggJSAyNDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzIDwgMCkge1xuICAgICAgICAgICAgcyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gJycgKyBzICsgJ+enkic7XG4gICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAnJyArIG0gKyAn5YiGJyArIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gJycgKyBoICsgJ+Wwj+aXticgKyByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9ICcnICsgZCArICflpKknICsgcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhaXNvYmogPyByZXN1bHQgOiB7XG4gICAgICAgICAgICBkYXk6IGQsXG4gICAgICAgICAgICBob3VyOiBoLFxuICAgICAgICAgICAgbWluOiBtLFxuICAgICAgICAgICAgc2VjOiBwYXJzZUludChzKVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgaWVDaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZlcnNpb24gPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgbmF2aWdhdG9yLmFwcFZlcnNpb24gJiZcbiAgICAgICAgICAgIG5hdmlnYXRvci5hcHBWZXJzaW9uLm1hdGNoKC9NU0lFIChbXFxkLl0rKS8pO1xuXG4gICAgICAgIHJldHVybiB2ZXJzaW9uID8gTnVtYmVyKHZlcnNpb25bMV0pIHx8IDAgOiAwO1xuICAgIH07XG4gICAgXG4gICAgdmFyIG1hdGNoID0ge1xuICAgICAgICBtb2JpbGU6IGZ1bmN0aW9uIChtb2JpbGUpIHtcbiAgICAgICAgICAgIHZhciByZXEgPSAvXlsxXVszfDV8N3w4XVswLTldezl9JC87XG4gICAgICAgICAgICByZXR1cm4gISFtb2JpbGUudG9TdHJpbmcoKS5tYXRjaChyZXEpO1xuICAgICAgICB9LFxuICAgICAgICBhbW91bnQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIHZhciBleHAgPSAvXihbMS05XVtcXGRdezAsN318MCkoXFwuW1xcZF17MSwyfSk/JC87XG4gICAgICAgICAgICByZXR1cm4gZXhwLnRlc3QoYW1vdW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW1haWw6IGZ1bmN0aW9uIChlbWFpbCkge1xuICAgICAgICAgICAgdmFyIGV4cCA9IC9eW1xcdy1dKyhcXC5bXFx3LV0rKSpAW1xcdy1dKyhcXC5bXFx3LV0rKSskLztcbiAgICAgICAgICAgIHJldHVybiBleHAudGVzdChlbWFpbCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIDbliLAyMOS9jeaVsOWtl+Wtl+avjeWvhueggVxuICAgICAgICBwYXNzd29yZDogZnVuY3Rpb24gKHMpe1xuICAgICAgICAgICAgcmV0dXJuICEhcy5tYXRjaCgvWzAtOWEtekEtWl17NiwyMH0vKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgXG4gICAgdmFyIHRvb2wgPSB7XG4gICAgICAgIGpzb25Ub1BhcmFtczogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxwYXJhbXNba2V5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICcmJyArIGtleSArICc9JyArIHBhcmFtc1trZXldW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJyYnICsga2V5ICsgJz0nICsgcGFyYW1zW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9LFxuICAgICAgICBzZXREYXRlOiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgICB2YXIgX2RhdGUsIHksIG0sIGQ7XG4gICAgICAgICAgICBfZGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgeSA9IHBhcnNlSW50KF9kYXRlWzBdKTtcbiAgICAgICAgICAgIG0gPSBwYXJzZUludChfZGF0ZVsxXSk7XG4gICAgICAgICAgICBkID0gcGFyc2VJbnQoX2RhdGVbMl0pO1xuICAgICAgICAgICAgaWYgKG0gPCAxMCkge1xuICAgICAgICAgICAgICAgIG0gPSAnMCcgKyBtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGQgPCAxMCkge1xuICAgICAgICAgICAgICAgIGQgPSAnMCcgKyBkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHkgKyAnLScgKyBtICsgJy0nICsgZDtcbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkU2NyaXB0OiBmdW5jdGlvbih1cmwsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgX3NjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBfc2NyaXB0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3RleHQvamF2YXNjcmlwdCcpO1xuICAgICAgICAgICAgX3NjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsdXJsKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChfc2NyaXB0KTtcbiAgICAgICAgICAgIGlmIChfc2NyaXB0LnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAvL0lFXG4gICAgICAgICAgICAgICAgX3NjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfc2NyaXB0LnJlYWR5U3RhdGUgPT0gXCJsb2FkZWRcIiB8fCBfc2NyaXB0LnJlYWR5U3RhdGUgPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy/pnZ5JRVxuICAgICAgICAgICAgICAgIF9zY3JpcHQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8g5pq06Zyy5o6l5Y+jXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZm9ybVZhbGlkYXRvcjogbmV3IEZvcm1WYWxpZGF0b3IoKSxcbiAgICAgICAgZXJyb3JNc2c6IEVycm9yTXNnLFxuICAgICAgICBjb3VudERvd246IG5ldyBDb3VudERvd24oKSxcbiAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgICBhbW91bnQ6IGZvcm1hdEFtb3VudCxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBmb3JtYXRlRHVyYXRpb24sXG4gICAgICAgICAgICBwZXJjZW50OiBmb3JtYXRQZXJjZW50LFxuICAgICAgICAgICAgdGltZUVsYXBzZWQ6IHRpbWVFbGFwc2VkXG4gICAgICAgIH0sXG4gICAgICAgIGJhbmtBY2NvdW50OiBiYW5rQWNjb3VudCxcbiAgICAgICAgaTE4bjogcmVxdWlyZSgnQGRzL2kxOG4nKVsnemgtY24nXS5lbnVtcyxcbiAgICAgICAgaWVDaGVjazogaWVDaGVjayxcbiAgICAgICAgbWF0Y2g6IG1hdGNoLFxuICAgICAgICB0b29sOiB0b29sXG4gICAgfTtcblxufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuZnVuY3Rpb24gRGlhbG9nKGNvbnRlbnQsIG9wdGlvbnMpIHtcbiAgICBEaWFsb2cuX196aW5kZXggPSA5MDAwO1xuICAgIERpYWxvZy5fX2NvdW50ID0gMTtcbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgc2hvd1RpdGxlOiB0cnVlLFxuICAgICAgICAvLyDmmK/lkKbmmL7npLrmoIfpopjmoI/jgIJcbiAgICAgICAgd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIGhlaWdodDogJzIwMHB4JyxcbiAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgLy8g5piv5ZCm56e75YqoIFxuICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgLy8g5piv5ZCm5piv5qih5oCB5a+56K+d5qGGIFxuICAgICAgICBjZW50ZXI6IHRydWUsXG4gICAgICAgIC8vIOaYr+WQpuWxheS4reOAgiBcbiAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgIC8vIOaYr+WQpui3n+maj+mhtemdoua7muWKqOOAglxuICAgICAgICB0aW1lOiAwLFxuICAgICAgICAvLyDoh6rliqjlhbPpl63ml7bpl7TvvIzkuLow6KGo56S65LiN5Lya6Ieq5Yqo5YWz6Zet44CCIFxuICAgICAgICB0b3A6IG51bGwsXG4gICAgICAgIGNsYTogJycsIC8vIGRpYWxvZyB3cmFw55qE5omp5bGVY2xhc3NcbiAgICAgICAgaWQ6IGZhbHNlIC8vIOWvueivneahhueahGlk77yM6Iul5Li6ZmFsc2XvvIzliJnnlLHns7vnu5/oh6rliqjkuqfnlJ/kuIDkuKrllK/kuIBpZOOAgiBcbiAgICB9O1xuXG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICBvcHRpb25zLnRpdGxlID0gb3B0aW9ucy50aXRsZSB8fCAnJztcbiAgICBvcHRpb25zLnRpbWUgPSBvcHRpb25zLnRpbWUgfHwgMDtcbiAgICBvcHRpb25zLmlkID0gb3B0aW9ucy5pZCA/IG9wdGlvbnMuaWQgOiAnZGlhbG9nLScgKyBEaWFsb2cuX19jb3VudDsgLy8g5ZSv5LiASURcbiAgICB2YXIgb3ZlcmxheUlkID0gb3B0aW9ucy5pZCArICctb3ZlcmxheSc7IC8vIOmBrue9qeWxgklEXG4gICAgdmFyIHRpbWVJZCA9IG51bGw7IC8vIOiHquWKqOWFs+mXreiuoeaXtuWZqCBcbiAgICB2YXIgaXNTaG93ID0gZmFsc2U7XG5cbiAgICBvcHRpb25zLnRvcCA9IGNvbnRlbnQudG9wIHx8ICcyMCUnO1xuICAgIG9wdGlvbnMuY2xhID0gY29udGVudC5jbGEgfHwgJyc7XG5cdG9wdGlvbnMub3ZlcmxheSA9IGNvbnRlbnQub3ZlcmxheSB8fCB0cnVlO1xuXG4gICAgLy92YXIgaXNJZSA9ICQuYnJvd3Nlci5tc2llO1xuICAgIC8vdmFyIGlzSWU2ID0gJC5icm93c2VyLm1zaWUgJiYgKCc2LjAnID09ICQuYnJvd3Nlci52ZXJzaW9uKTtcblxuICAgIC8vdmFyIGlzSWUgPSBkb2N1bWVudC5hbGwgJiYgd2luZG93LmV4dGVybmFsO1xuICAgIHZhciBpc0llNiA9IGZhbHNlO1xuXHR2YXIgZ2V0V3JhcCA9IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR3aWR0aDogJCh3aW5kb3cpLndpZHRoKCkgKyAkKGRvY3VtZW50KS5zY3JvbGxMZWZ0KCksXG5cdFx0XHRoZWlnaHQ6ICQoZG9jdW1lbnQpLmhlaWdodCgpXG5cdFx0fTtcblx0fTtcblx0LypcbiAgICB2YXIgd3JhcCA9IHtcbiAgICAgICAgd2lkdGg6ICQod2luZG93KS53aWR0aCgpICsgJChkb2N1bWVudCkuc2Nyb2xsTGVmdCgpLFxuICAgICAgICBoZWlnaHQ6ICQoZG9jdW1lbnQpLmhlaWdodCgpXG4gICAgfTtcblx0Ki9cblx0dmFyIHdyYXAgPSBnZXRXcmFwKCk7XG5cbiAgICAvKiDlr7nor53moYbnmoTluIPlsYDlj4rmoIfpopjlhoXlrrnjgIIqL1xuICAgIG9wdGlvbnMudGl0bGUgPSBjb250ZW50LnRpdGxlIHx8IFwiXCI7XG4gICAgdmFyIGJhckh0bWwgPSAhb3B0aW9ucy5zaG93VGl0bGUgPyAnJyA6XG4gICAgICAgICc8ZGl2IGNsYXNzPVwiYmFyXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPicgKyAoKG9wdGlvbnMudGl0bGUgPT09IFwiXCIgfHxcbiAgICAgICAgICAgIG9wdGlvbnMudGl0bGUgPT09IGZhbHNlKSA/IFwiXCIgOiBvcHRpb25zLnRpdGxlKSArXG4gICAgICAgICc8L3NwYW4+PGEgY2xhc3M9XCJjbG9zZVwiPjwvYT48L2Rpdj4nO1xuICAgIHZhciB0aGVEaWFsb2cgPSAkKCc8ZGl2IGlkPVwiJyArIG9wdGlvbnMuaWQgKyAnXCIgY2xhc3M9XCJkaWFsb2cgY2NjLWJveC13cmFwICcgKyBvcHRpb25zLmNsYSArXG4gICAgICAgICdcIj4nICsgYmFySHRtbCArICc8ZGl2IGNsYXNzPVwiRGNvbnRlbnRcIj48L2Rpdj48L2Rpdj4nKVxuICAgICAgICAuaGlkZSgpO1xuICAgICQoJ2JvZHknKVxuICAgICAgICAuYXBwZW5kKHRoZURpYWxvZyk7XG5cblxuICAgIC8qKlxuICAgICAqIOmHjee9ruWvueivneahhueahOS9jee9ruOAglxuICAgICAqXG4gICAgICog5Li76KaB5piv5Zyo6ZyA6KaB5bGF5Lit55qE5pe25YCZ77yM5q+P5qyh5Yqg6L295a6M5YaF5a6577yM6YO96KaB6YeN5paw5a6a5L2NXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgKi9cbiAgICB0aGlzLnJlc2V0UG9zID0gZnVuY3Rpb24gKCkgeyAvKiDmmK/lkKbpnIDopoHlsYXkuK3lrprkvY3vvIzlv4XpnIDlnKjlt7Lnu4/nn6XpgZPkuoZkaWFsb2flhYPntKDlpKflsI/nmoTmg4XlhrXkuIvvvIzmiY3og73mraPnoa7lsYXkuK3vvIzkuZ/lsLHmmK/opoHlhYjorr7nva5kaWFsb2fnmoTlhoXlrrnjgIIgKi9cbiAgICAgICAgaWYgKG9wdGlvbnMuY2VudGVyKSB7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSAkKFwiLkRjb250ZW50XCIsIHRoZURpYWxvZylcbiAgICAgICAgICAgICAgICAub3V0ZXJXaWR0aCgpO1xuXG4gICAgICAgICAgICB0aGVEaWFsb2cuY3NzKFwid2lkdGhcIiwgd2lkdGgpO1xuXG4gICAgICAgICAgICB2YXIgbGVmdCA9ICgkKHdpbmRvdylcbiAgICAgICAgICAgICAgICAud2lkdGgoKSAtIHRoZURpYWxvZy53aWR0aCgpKSAvIDI7XG4gICAgICAgICAgICB2YXIgdG9wID0gKCQod2luZG93KVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoKSAtIHRoZURpYWxvZy5oZWlnaHQoKSkgLyAyO1xuICAgICAgICAgICAgaWYgKHRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzSWU2ICYmIG9wdGlvbnMuZml4ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGVEaWFsb2cuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBvcHRpb25zLnRvcCA/IG9wdGlvbnMudG9wIDogdG9wLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoZURpYWxvZy5jc3Moe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHRvcCArICQoZG9jdW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2Nyb2xsVG9wKCksXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQgKyAkKGRvY3VtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNjcm9sbExlZnQoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMluS9jee9ruWPiuS4gOS6m+S6i+S7tuWHveaVsOOAglxuICAgICAqXG4gICAgICog5YW25Lit55qEdGhpc+ihqOekukRpYWxvZ+WvueixoeiAjOS4jeaYr2luaXTlh73mlbDjgIJcbiAgICAgKi9cbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHsgLyog5piv5ZCm6ZyA6KaB5Yid5aeL5YyW6IOM5pmv6YGu572p5bGCICovXG5cbiAgICAgICAgaWYgKG9wdGlvbnMubW9kYWwpIHtcbiAgICAgICAgICAgICQoJ2JvZHknKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxkaXYgaWQ9XCInICsgb3ZlcmxheUlkICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGNsYXNzPVwiZGlhbG9nLW92ZXJsYXkgY2NjLWJveC1vdmVybGF5XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAkKCcjJyArIG92ZXJsYXlJZClcbiAgICAgICAgICAgICAgICAuY3NzKCd3aWR0aCcsIHdyYXAud2lkdGgpXG4gICAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0Jywgd3JhcC5oZWlnaHQpXG4gICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsICsrRGlhbG9nLl9femluZGV4KTtcbiAgICAgICAgICAgICQoJyMnICsgb3ZlcmxheUlkKVxuICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IDAsXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAwLFxuICAgICAgICAgICAgICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuaGlkZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGVEaWFsb2cuY3NzKHtcbiAgICAgICAgICAgICd6LWluZGV4JzogKytEaWFsb2cuX196aW5kZXgsXG4gICAgICAgICAgICAncG9zaXRpb24nOiBvcHRpb25zLmZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyogIElFNiDlhbzlrrlmaXhlZOS7o+eggSAqL1xuICAgICAgICBpZiAoaXNJZTYgJiYgb3B0aW9ucy5maXhlZCkge1xuICAgICAgICAgICAgdGhlRGlhbG9nLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgIC8vIHJlc2V0UG9zKCk7XG4gICAgICAgICAgICAkKHdpbmRvdylcbiAgICAgICAgICAgICAgICAuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpYSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJChkb2N1bWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGVpZ2h0KCkgLyAyIC0gdGhlRGlhbG9nLmhlaWdodCgpIC8gMiArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAkKGRvY3VtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY3JvbGxMZWZ0KCkgKyAkKHdpbmRvdylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAud2lkdGgoKSAvIDIgLSB0aGVEaWFsb2cub3V0ZXJXaWR0aCgpIC8gMiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4J1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGVEaWFsb2cuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd0b3AnOiBkaWEudG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBkaWEubGVmdFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIOS7peS4i+S7o+eggeWkhOeQhuahhuS9k+aYr+WQpuWPr+S7peenu+WKqCAqL1xuICAgICAgICB2YXIgbW91c2UgPSB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVEaWFsb2coZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBlID0gd2luZG93LmV2ZW50IHx8IGV2ZW50O1xuICAgICAgICAgICAgdmFyIHRvcCA9IHBhcnNlSW50KHRoZURpYWxvZy5jc3MoJ3RvcCcpKSArIChlLmNsaWVudFkgLSBtb3VzZS55KTtcbiAgICAgICAgICAgIHZhciBsZWZ0ID0gcGFyc2VJbnQodGhlRGlhbG9nLmNzcygnbGVmdCcpKSArIChlLmNsaWVudFggLSBtb3VzZS54KTtcbiAgICAgICAgICAgIHRoZURpYWxvZy5jc3Moe1xuICAgICAgICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW91c2UueCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgIG1vdXNlLnkgPSBlLmNsaWVudFk7XG4gICAgICAgIH1cbiAgICAgICAgdGhlRGlhbG9nLmZpbmQoJy5iYXInKVxuICAgICAgICAgICAgLm1vdXNlZG93bihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZSA9IHdpbmRvdy5ldmVudCB8fCBldmVudDtcbiAgICAgICAgICAgICAgICBtb3VzZS54ID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgIG1vdXNlLnkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgJChkb2N1bWVudClcbiAgICAgICAgICAgICAgICAgICAgLmJpbmQoJ21vdXNlbW92ZScsIG1vdmVEaWFsb2cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICQoZG9jdW1lbnQpXG4gICAgICAgICAgICAubW91c2V1cChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJChkb2N1bWVudClcbiAgICAgICAgICAgICAgICAgICAgLnVuYmluZCgnbW91c2Vtb3ZlJywgbW92ZURpYWxvZyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvKiDnu5HlrprkuIDkupvnm7jlhbPkuovku7bjgIIgKi9cbiAgICAgICAgdGhlRGlhbG9nLmZpbmQoJy5jbG9zZScpXG4gICAgICAgICAgICAuYmluZCgnY2xpY2snLCB0aGlzLmNsb3NlKTtcbiAgICAgICAgdGhlRGlhbG9nLmJpbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoZURpYWxvZy5jc3MoJ3otaW5kZXgnLCArK0RpYWxvZy5fX3ppbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIOiHquWKqOWFs+mXrSBcbiAgICAgICAgaWYgKDAgIT09IG9wdGlvbnMudGltZSkge1xuICAgICAgICAgICAgdGltZUlkID0gc2V0VGltZW91dCh0aGlzLmNsb3NlLCBvcHRpb25zLnRpbWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICog6K6+572u5a+56K+d5qGG55qE5YaF5a6544CCXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RyaW5nIGMg5Y+v5Lul5pivSFRNTOaWh+acrOOAglxuICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAqL1xuICAgIHRoaXMuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGlmIChjLnRpbWUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMudGltZSA9IGMudGltZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGl2ID0gdGhlRGlhbG9nLmZpbmQoJy5EY29udGVudCcpO1xuICAgICAgICB2YXIgd2lkdGggPSBjLndpZHRoID8gYy53aWR0aCA6IGRlZmF1bHRzLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0ID0gYy5oZWlnaHQgPyBjLmhlaWdodCA6IGRlZmF1bHRzLmhlaWdodDtcblxuICAgICAgICBpZiAoYy5hbGVydCkge1xuICAgICAgICAgICAgYy52YWx1ZSA9ICc8ZGl2IGNsYXNzPVwiYm94LWFsZXJ0LXdyYXBcIiBzdHlsZT1cInBhZGRpbmctdG9wOjgwcHg7XCI+JyArXG4gICAgICAgICAgICAgICAgYy52YWx1ZSArICc8L2Rpdj4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIGMudmFsdWUgPSAnPGRpdiBjbGFzcz1cImJveC1hbGVydC13cmFwXCI+PHA+JyArIGMudmFsdWUgKyAnPC9wPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi15ZXMgYnRuLWxvbmcgYnRuLWNsb3NlXCI+56Gu5a6aPC9idXR0b24+PHNwYW4+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1jYW5jZWwgYnRuLWxvbmcgYnRuLWdyYXkgYnRuLWNsb3NlXCI+5Y+W5raIPC9idXR0b24+PC9kaXY+JztcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIChjKSkge1xuICAgICAgICAgICAgYy50eXBlID0gYy50eXBlIHx8IFwiXCI7XG4gICAgICAgICAgICBzd2l0Y2ggKGMudHlwZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICBjYXNlICdpZCc6XG4gICAgICAgICAgICAgICAgLy8g5bCGSUTnmoTlhoXlrrnlpI3liLbov4fmnaXvvIzljp/mnaXnmoTov5jlnKjjgIJcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kKCQoJyMnICsgYy52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICQoJyMnICsgYy52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ltZyc6XG4gICAgICAgICAgICAgICAgZGl2Lmh0bWwoJ+WKoOi9veS4rS4uLicpO1xuICAgICAgICAgICAgICAgICQoJzxpbWcgYWx0PVwiXCIgLz4nKVxuICAgICAgICAgICAgICAgICAgICAubG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuZW1wdHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlc2V0UG9zKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBjLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgICAgICAgICAgZGl2Lmh0bWwoJ+WKoOi9veS4rS4uLicpO1xuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5odG1sKGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZXNldFBvcygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGl2Lmh0bWwoJ+WHuumUmeWVpicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpZnJhbWUnOlxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmQoJCgnPGlmcmFtZSBzcmM9XCInICsgYy52YWx1ZSArICdcIiB3aWR0aD0nICsgd2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAnIGhlaWdodD0nICsgaGVpZ2h0ICsgJyAvPicpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAhISB3aWR0aCAmJiBkaXYud2lkdGgod2lkdGgpOyAhISBoZWlnaHQgJiYgZGl2LmhlaWdodChoZWlnaHQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGl2Lmh0bWwoYy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXYuaHRtbChjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOS4u+WKqOaYvuekuuW8ueeql1xuICAgICAgICBpZiAoYy5zaG93ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdyhjLnNob3dlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYy5hbGVydCB8fCBjLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHRoZURpYWxvZy5maW5kKCcuYnRuLWNsb3NlJylcbiAgICAgICAgICAgICAgICAuYmluZCgnY2xpY2snLCB0aGlzLmNsb3NlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLrlr7nor53moYZcbiAgICAgKi9cbiAgICB0aGlzLnNob3cgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gb3B0aW9ucy5iZWZvcmVTaG93ICYmICFvcHRpb25zLmJlZm9yZVNob3coKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiOt+W+l+afkOS4gOWFg+e0oOeahOmAj+aYjuW6puOAgklF5LuO5ruk5aKD5Lit6I635b6X44CCXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gZmxvYXRcbiAgICAgICAgICovXG5cbiAgICAgICAgLyog5piv5ZCm5pi+56S66IOM5pmv6YGu572p5bGCICovXG4gICAgICAgIGlmIChvcHRpb25zLm1vZGFsKSB7XG4gICAgICAgICAgICAkKCcjJyArIG92ZXJsYXlJZClcbiAgICAgICAgICAgICAgICAuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoZURpYWxvZy5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuYWZ0ZXJTaG93KSB7XG4gICAgICAgICAgICBvcHRpb25zLmFmdGVyU2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGlzU2hvdyA9IHRydWU7XG4gICAgICAgIC8vIOiHquWKqOWFs+mXrSBcbiAgICAgICAgaWYgKDAgIT09IG9wdGlvbnMudGltZSkge1xuICAgICAgICAgICAgdGltZUlkID0gc2V0VGltZW91dCh0aGlzLmNsb3NlLCBvcHRpb25zLnRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRQb3MoKTtcblx0XHRcblx0XHQvLyDorr7nva5vdmVybGF56IOM5pmvXG5cdFx0aWYgKG9wdGlvbnMub3ZlcmxheSkge1xuXHRcdFx0JChcIi5kaWFsb2ctb3ZlcmxheVwiKS5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwiI0QzRDNEM1wiKTtcblx0XHR9XG5cbiAgICAgICAgLy/lm57osINcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgZCA9IHRoZURpYWxvZy5maW5kKFwiLkRjb250ZW50XCIpO1xuICAgICAgICAgICAgY2FsbGJhY2soZFswXSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgJCh3aW5kb3cpXG4gICAgICAgICAgICAua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB0YWcgPSBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFlLnRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodGFnID09PSAnaW5wdXQnIHx8IHRhZyA9PT0gJ3RleHRhcmVhJykge30gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgIH07XG4gICAgLypcbiAgICAgKiDpmpDol4/lr7nor53moYbjgILkvYblubbkuI3lj5bmtojnqpflj6PlhoXlrrnjgIJcbiAgICAgKi9cbiAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCFpc1Nob3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuYmVmb3JlSGlkZSAmJiAhb3B0aW9ucy5iZWZvcmVIaWRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoZURpYWxvZy5jc3MoJ2Rpc3BsYXknLCBcIm5vbmVcIik7XG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuYWZ0ZXJIaWRlKSB7XG4gICAgICAgICAgICBvcHRpb25zLmFmdGVySGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubW9kYWwpIHtcbiAgICAgICAgICAgICQoJyMnICsgb3ZlcmxheUlkKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCBcIm5vbmVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpc1Nob3cgPSBmYWxzZTtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63lr7nor53moYZcbiAgICAgKlxuICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAqL1xuICAgIHRoaXMuY2xvc2UgPSBmdW5jdGlvbiAoZSwgcmVhbCkge1xuICAgICAgICAkKFwiYm9keVwiKVxuICAgICAgICAgICAgLmZpbmQoXCIuZGlhbG9nXCIpXG4gICAgICAgICAgICAucmVtb3ZlKCk7XG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuYmVmb3JlQ2xvc2UgJiYgIW9wdGlvbnMuYmVmb3JlQ2xvc2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVhbCkge1xuICAgICAgICAgICAgdGhlRGlhbG9nLmZpbmQoXCIuRGNvbnRlbnQ6ZXEoMClcIilcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oXCJib2R5XCIpXG4gICAgICAgICAgICAgICAgLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoZURpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgaXNTaG93ID0gZmFsc2U7XG4gICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuYWZ0ZXJDbG9zZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5hZnRlckNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5tb2RhbCkge1xuICAgICAgICAgICAgJCgnIycgKyBvdmVybGF5SWQpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVvdXQodGltZUlkKTtcbiAgICAgICAgJChcImJvZHlcIilcbiAgICAgICAgICAgIC5maW5kKFwiLkRjb250ZW50XCIpXG4gICAgICAgICAgICAucmVtb3ZlKCk7XG4gICAgfTtcblxuICAgIHRoaXMucmVzZXRPdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjJyArIG92ZXJsYXlJZClcbiAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICd3aWR0aCc6ICQod2luZG93KVxuICAgICAgICAgICAgICAgICAgICAud2lkdGgoKSArICQoZG9jdW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIC5zY3JvbGxMZWZ0KCksXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6ICQoZG9jdW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIC5oZWlnaHQoKSxcbiAgICAgICAgICAgICAgICAnbGVmdCc6IDAsXG4gICAgICAgICAgICAgICAgJ3RvcCc6IDBcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpbml0LmNhbGwodGhpcyk7XG4gICAgdGhpcy5zZXRDb250ZW50KGNvbnRlbnQpO1xuXG4gICAgRGlhbG9nLl9fY291bnQrKztcbiAgICBEaWFsb2cuX196aW5kZXgrKztcbn1cbm1vZHVsZS5leHBvcnRzID0gRGlhbG9nOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiDmlLbnm4rorqHnrpflmaggKGNjY0NhbGN1bGF0b3IpXG4gKlxuICogPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL2Nzcy9tb2R1bGVzL2NjY0NhbGN1bGF0b3IuY3NzXCI+XG4gKiB2YXIgQ2FsID0gcmVxdWlyZSgnYXNzZXRzL2pzL21vZHVsZXMvY2NjQ2FsY3VsYXRvcicpO1xuICogQ2FsLmNyZWF0ZSgpO1xuICovXG52YXIgdXRpbHMgPSByZXF1aXJlKCdjY2MvZ2xvYmFsL2pzL2xpYi91dGlscycpO1xudmFyIHRwbCA9IHtcblx0d3JhcDogcmVxdWlyZSgnY2NjL2dsb2JhbC9wYXJ0aWFscy9tb2R1bGVzL2NjY0NhbGN1bGF0b3IuaHRtbCcpLFxuXHRsaXN0OiAne3sjZWFjaCBsaXN0fX1cXFxuXHRcdFx0PGRpdiBjbGFzcz1cImNsZWFyZml4IGJhY2tnci1mIHRkQ29udGVudFwiPlxcXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJjY2MtZiB0ZENlbGwgYmFja2dyLWZcIj57e2R1ZURhdGV9fTwvZGl2PlxcXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZENlbGwgYmFja2dyLWZcIj57e2Ftb3VudH19PC9kaXY+XFxcblx0XHRcdFx0PGRpdiBjbGFzcz1cInRkQ2VsbCBiYWNrZ3ItZlwiPnt7YW1vdW50UHJpbmNpcGFsfX08L2Rpdj5cXFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGRDZWxsIGJhY2tnci1mXCI+e3thbW91bnRJbnRlcmVzdH19PC9kaXY+XFxcblx0XHRcdFx0PGRpdiBjbGFzcz1cImNjYy1sIHRkQ2VsbCBiYWNrZ3ItZlwiPnt7YW1vdW50T3V0c3RhbmRpbmd9fTwvZGl2PlxcXG5cdFx0XHQ8L2Rpdj5cXFxuXHRcdHt7L2VhY2h9fSdcbn07XG5cbnZhciBEaWFsb2cgPSByZXF1aXJlKFwiY2NjL2dsb2JhbC9qcy9tb2R1bGVzL2NjY0JveFwiKTtcblxuLy8g57yT5a2Y6YOo5YiG5pWw5o2uXG53aW5kb3cuQ0NfQ0FDSEUgPSB7fTtcblxudmFyIHJlZyA9IC9eKFsxLTldW1xcZF17MCw3fXwwKSQvO1xudmFyIHJlZzEgPSAvXihbMS05XVtcXGRdezAsMX18MCkoXFwuW1xcZF17MSw4fSk/JC87XG5cbm1vZHVsZS5leHBvcnRzLmNyZWF0ZSA9IGZ1bmN0aW9uIChwKSB7XG4gICAgcCA9IHAgfHwge307XG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICB0aXRsZTogcC50aXRsZSB8fCAn5pS255uK6K6h566X5ZmoJyxcbiAgICAgICAgdHBsOiBwLnRwbCB8fCB0cGwud3JhcCxcbiAgICAgICAgd2lkdGg6IDg1MCxcbiAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgIHRvcDogJzIwJScsXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7fVxuICAgIH07XG5cbiAgICAkLmV4dGVuZChkZWZhdWx0cywgcCk7XG4gICAgdmFyIG8gPSBkZWZhdWx0cztcblxuICAgIC8vIGdldCBkYXRhXG4gICAgdmFyIHJlbmRlclB1cnBvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vdmFyIFAgPSBUKCd6aC1jbicpLmVudW1zLlJlcGF5bWVudE1ldGhvZDtcbiAgICAgICAgdmFyIF9vcHRpb24gPSAnJztcblx0XHRcblx0XHQkLmVhY2godXRpbHMuaTE4bi5SZXBheW1lbnRNZXRob2QsIGZ1bmN0aW9uKGssIHYpIHtcblx0XHRcdF9vcHRpb24gKz0gJzxvcHRpb24gdmFsdWU9XCInICsgayArICdcIj4nICsgdlswXSArICc8L29wdGlvbj4nO1xuXHRcdH0pO1xuXHRcdFxuICAgICAgICAvL+i/h+a7pOi/mOasvuaWueW8j1xuICAgICAgICByZXR1cm4gJzxvcHRpb24gdmFsdWU9XCJFcXVhbEluc3RhbGxtZW50XCI+5oyJ5pyI562J6aKd5pys5oGvPC9vcHRpb24+XFxcblx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkVxdWFsUHJpbmNpcGFsXCI+5oyJ5pyI562J6aKd5pys6YeRPC9vcHRpb24+XFxcblx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIk1vbnRobHlJbnRlcmVzdFwiPuaMieaciOS7mOaBr+WIsOacn+i/mOacrDwvb3B0aW9uPlxcXG5cdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJCdWxsZXRSZXBheW1lbnRcIj7kuIDmrKHmgKfov5jmnKzku5jmga88L29wdGlvbj4nO1xuICAgIH07XG5cbiAgICBpZiAoIUNDX0NBQ0hFLm9wdGlvbnMpIHtcbiAgICAgICAgQ0NfQ0FDSEUub3B0aW9ucyA9IHJlbmRlclB1cnBvc2UoKTtcbiAgICB9XG5cbiAgICBuZXcgRGlhbG9nKHtcbiAgICAgICAgdGl0bGU6IG8udGl0bGUsXG4gICAgICAgIHZhbHVlOiBvLnRwbCxcbiAgICAgICAgd2lkdGg6IG8ud2lkdGgsXG4gICAgICAgIGhlaWdodDogby5oZWlnaHQsXG4gICAgICAgIHRvcDogby50b3AsXG4gICAgICAgIHNob3dlZDogZnVuY3Rpb24gKGVsZSwgYm94KSB7XG5cdFx0XHQvLyBzZXQgbGlzdCB0cGxcblx0XHRcdC8vdHBsLmxpc3QgPSAkKGVsZSkuZmluZCgnLmNjYy1jYWxjdWxhdG9yLXRwbC1saXN0JykuaHRtbCgpO1xuXHRcdFx0XG4gICAgICAgICAgICB2YXIgZGF0ZV9jYWwgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdmFyIGRhdGVfY2FsMSA9IG5ldyBEYXRlKGRhdGVfY2FsKTtcbiAgICAgICAgICAgIGRhdGVfY2FsMS5zZXREYXRlKGRhdGVfY2FsLmdldERhdGUoKSArIDMpO1xuICAgICAgICAgICAgdmFyIGxhc3RfZGF0ZSA9IGRhdGVfY2FsMS5nZXRGdWxsWWVhcigpICsgJy0nICsgKGRhdGVfY2FsMS5nZXRNb250aCgpICsgMSkgKyAnLScgKyBkYXRlX2NhbDEuZ2V0RGF0ZSgpO1xuXHRcdFx0XG4gICAgICAgICAgICAvLyByZW5kZXIgb3B0aW9uc1xuICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ3NlbGVjdFtuYW1lPXBheW1lbnRNZXRob2RdJylcbiAgICAgICAgICAgICAgICAuaHRtbChDQ19DQUNIRS5vcHRpb25zKTtcbiAgICAgICAgICAgICQoZWxlKVxuICAgICAgICAgICAgICAgIC5maW5kKCdmb3JtW25hbWU9Y2NDYWxjdWxhdG9yRm9ybV0nKVxuICAgICAgICAgICAgICAgIC5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUgJiYgZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFzID0gJHRoaXMuc2VyaWFsaXplQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5jID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJyNjYy1jYWwtbGlzdC13cCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJzxwPicgKyBtc2cgKyAnPC9wPicpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhc1tpXS5uYW1lID09PSAncGF5bWVudE1ldGhvZCcpIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsVmFsdWUgPSBkYXRhc1tpXS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0xlZ2FsID0gcmVnLnRlc3QoY2FsVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleCA9ICQoZWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdbbmFtZT0nICsgZGF0YXNbaV0ubmFtZSArICddJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxWYWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ1tuYW1lPScgKyBkYXRhc1tpXS5uYW1lICsgJ10nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ25jJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmMoJ+ivt+i+k+WFpScgKyB0ZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzTGVnYWwgJiYgZGF0YXNbaV0ubmFtZSAhPT0gJ2FubnVhbFJhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdbbmFtZT0nICsgZGF0YXNbaV0ubmFtZSArICddJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCduYycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhc1tpXS5uYW1lID09PSAnYW1vdW50VmFsdWUnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbFZhbHVlID4gOTk5OTk5OTkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmModGV4ICsgJ+S4jeiDvei2hei/hzjkvY3mlbDlrZcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYyh0ZXggKyAn5b+F6aG75Li65pW05pWwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YXNbaV0ubmFtZSA9PT0gJ2FubnVhbFJhdGUnICYmICFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWcxLnRlc3QoY2FsVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdbbmFtZT0nICsgZGF0YXNbaV0ubmFtZSArICddJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCduYycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5jKHRleCArICflv4XpobvkuLrlsI/kuo4xMDDnmoTmlbDlrZcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnW25hbWU9JyArIGRhdGFzW2ldLm5hbWUgKyAnXScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbmMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciAkcG9zdEJ0biA9ICQoZWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idG4tY2FsJyk7XG4gICAgICAgICAgICAgICAgICAgICRwb3N0QnRuLmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn6K6h566X5Lit4oCmJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcvYXBpL3YyL2xvYW4vcmVxdWVzdC9hbmFseXNlJztcbiAgICAgICAgICAgICAgICAgICAgJC5wb3N0KHVybCwgZGF0YXMsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwb3N0QnRuLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCforqHnrpfmlLbnm4onKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5UYW1vdW50JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocmVzLmRhdGEuaW50ZXJlc3QgKyByZXMuZGF0YS5wcmluY2lwYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLkZhbW91bnQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgn77+lJyArIHV0aWxzLmZvcm1hdC5hbW91bnQoKHJlcy5kYXRhLmludGVyZXN0ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZGF0YS5wcmluY2lwYWwpLCAyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJwYWRkaW5nLWxlZnQ6MjBweDtcIj7lgYforr7otbfmga/ml6XkuLonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfZGF0ZSArICc8L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuVGFtb3VudFByaW5jaXBhbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHJlcy5kYXRhLnByaW5jaXBhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuVGFtb3VudEludGVyZXN0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocmVzLmRhdGEuaW50ZXJlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNjLXRhbGJlLXRvdGFsJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKGVsZSkuZmluZCgnLkZyYXRlJykudGV4dChkYXRhc1syXS52YWx1ZSsnJScpO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0bmV3IFJhY3RpdmUoe1xuXHRcdFx0XHRcdFx0XHRcdGVsOiAkKGVsZSkuZmluZCgnI2NjLWNhbC1saXN0LXdwJyksXG5cdFx0XHRcdFx0XHRcdFx0dGVtcGxhdGU6IHRwbC5saXN0LFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3Q6IHJlcy5kYXRhLnJlcGF5bWVudHNcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYygn6K+35rGC5Ye66ZSZficpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcG9zdEJ0bi5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn6K6h566X5pS255uKJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmMoJ+ivt+axguWHuumUmX4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgby5jYWxsYmFjayhlbGUsIGJveCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogY2NjQm94IC0+IGNvbmZpcm1cbiAqXG4gKlx0Q29uZmlybS5jcmVhdGUoe1xuICpcdFx0bXNnOiAn5pON5L2c5piv5ZCm5oiQ5Yqf77yfJyxcbiAqXHRcdG9rVGV4dDogJ+aIkOWKnycsXG4gKlx0XHRjYW5jZWxUZXh0OiAn5aSx6LSlJyxcbiAqXHRcdG9rOiBmdW5jdGlvbigkYnRuLCAkZWwsIGJveCkge1xuICpcdFx0XHQvLyBmaXJlIG9rIGJ0blxuICpcdFx0fSxcbiAqXHRcdGNhbmNlbDogZnVuY3Rpb24oJGJ0biwgJGVsLCBib3gpIHtcbiAqXHRcdFx0Ly8gZmlyZSBjYW5jZWwgYnRuXG4gKlx0XHR9XG4gKlx0fSk7XG4gKi9cbnZhciBCb3ggPSByZXF1aXJlKCdjY2MvZ2xvYmFsL2pzL21vZHVsZXMvY2NjQm94Jyk7XG52YXIgdHBsID0gcmVxdWlyZSgnY2NjL2dsb2JhbC9wYXJ0aWFscy9tb2R1bGVzL2NjY0NvbmZpcm0uaHRtbCcpO1xuXG5mdW5jdGlvbiBDY2NDb25maXJtKG9wdGlvbnMpIHtcblx0XG5cdC8vIGRlZmF1bHRzXG5cdHZhciBkZWZhdWx0cyA9IHtcblx0XHR0aXRsZTogJ+S/oeaBr+aPkOekuicsXG5cdFx0dHBsOiB0cGwsXG5cdFx0d2lkdGg6IDQwMCxcblx0XHRoZWlnaHQ6IDE1MCxcblx0XHRvdmVybGF5OiBmYWxzZSxcblx0XHRtc2c6ICfnoa7lrpropoHov5nkuYjlgZrvvJ8nLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHt9LFxuXHRcdG9rVGV4dDogJ+ehruWumicsXG5cdFx0Y2FuY2VsVGV4dDogJ+WPlua2iCcsXG5cdFx0b2s6IGZ1bmN0aW9uKCkge30sXG5cdFx0Y2FuY2VsOiBmdW5jdGlvbigpIHt9LFxuXHRcdGRlYnVnOiBmYWxzZSxcblx0fTtcblx0XG5cdHZhciBjb25maWcgPSB7fTtcblx0JC5leHRlbmQoY29uZmlnLCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cdFxuXHRpZiAoY29uZmlnLmRlYnVnKSB7XG5cdFx0Y29uc29sZS5sb2coJ2RlYnVnOmNjY0NvbmZpcm06Y29uZmlnJywgY29uZmlnKTtcblx0fVxuXHRcblx0dmFyIGJlZm9yZSA9IGZ1bmN0aW9uKCkge1xuXHRcdGNvbmZpZy50cGwgPSBjb25maWcudHBsLnJlcGxhY2UoJ3t7b2tUZXh0fX0nLCBjb25maWcub2tUZXh0KTtcblx0XHRjb25maWcudHBsID0gY29uZmlnLnRwbC5yZXBsYWNlKCd7e2NhbmNlbFRleHR9fScsIGNvbmZpZy5jYW5jZWxUZXh0KTtcblx0XHRjb25maWcudHBsID0gY29uZmlnLnRwbC5yZXBsYWNlKCd7e21zZ319JywgY29uZmlnLm1zZyk7XG5cdH07XG5cdFxuXHR2YXIgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdC8vIGJlZm9yZSBpbml0XG5cdFx0YmVmb3JlKCk7XG5cdFx0bmV3IEJveCh7XG5cdFx0XHR0aXRsZTogY29uZmlnLnRpdGxlLFxuXHRcdFx0dmFsdWU6IGNvbmZpZy50cGwsXG5cdFx0XHR3aWR0aDogY29uZmlnLndpZHRoLFxuXHRcdFx0aGVpZ2h0OiBjb25maWcuaGVpZ2h0LFxuXHRcdFx0b3ZlcmxheTogY29uZmlnLm92ZXJsYXksXG5cdFx0XHRzaG93ZWQ6IGZ1bmN0aW9uKGVsZSwgYm94KSB7XG5cdFx0XHRcdC8vIGNsaWNrIG9rXG5cdFx0XHRcdCQoZWxlKS5maW5kKCcuYnRuLWNvbmZpcm0tb2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGNvbmZpZy5vaygkKHRoaXMpLCBlbGUsIGJveCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gY2xpY2sgY2FuY2VsXG5cdFx0XHRcdCQoZWxlKS5maW5kKCcuYnRuLWNvbmZpcm0tY2FuY2VsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRjb25maWcuY2FuY2VsKCQodGhpcyksIGVsZSwgYm94KTtcblx0XHRcdFx0XHRib3guaGlkZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdGNvbmZpZy5jb21wbGV0ZShlbGUsYm94KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblx0XG5cdFxuXHRcblx0aW5pdGlhbGl6ZS5jYWxsKHRoaXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdENjY0NvbmZpcm0ob3B0aW9ucyk7XG59O1xuXG4iLCJ2YXIgQm94ID0gcmVxdWlyZSgnY2NjL2dsb2JhbC9qcy9tb2R1bGVzL2NjY0JveCcpO1xudmFyIHRwbCA9IHJlcXVpcmUoJ2NjYy9nbG9iYWwvcGFydGlhbHMvbW9kdWxlcy9jY2NPay5odG1sJyk7XG5cbmZ1bmN0aW9uIENjY09rKG9wdGlvbnMpIHtcblx0XG5cdC8vIGRlZmF1bHRzXG5cdHZhciBkZWZhdWx0cyA9IHtcblx0XHR0aXRsZTogJ+S/oeaBr+aPkOekuicsXG5cdFx0dHBsOiB0cGwsXG5cdFx0d2lkdGg6IDQwMCxcblx0XHRoZWlnaHQ6IDE1MCxcblx0XHRvdmVybGF5OiBmYWxzZSxcblx0XHRtc2c6ICfnoa7lrpropoHov5nkuYjlgZrvvJ8nLFxuXHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpIHt9LFxuXHRcdG9rVGV4dDogJ+ehruWumicsXG5cdFx0Y2FuY2VsVGV4dDogJ+WPlua2iCcsXG5cdFx0b2s6IGZ1bmN0aW9uKCkge30sXG5cdFx0Y2FuY2VsOiBmdW5jdGlvbigpIHt9LFxuXHRcdGRlYnVnOiBmYWxzZSxcblx0fTtcblx0XG5cdHZhciBjb25maWcgPSB7fTtcblx0JC5leHRlbmQoY29uZmlnLCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cdFxuXHRpZiAoY29uZmlnLmRlYnVnKSB7XG5cdFx0Y29uc29sZS5sb2coJ2RlYnVnOmNjY0NvbmZpcm06Y29uZmlnJywgY29uZmlnKTtcblx0fVxuXHRcblx0dmFyIGJlZm9yZSA9IGZ1bmN0aW9uKCkge1xuXHRcdGNvbmZpZy50cGwgPSBjb25maWcudHBsLnJlcGxhY2UoJ3t7b2tUZXh0fX0nLCBjb25maWcub2tUZXh0KTtcblx0XHRjb25maWcudHBsID0gY29uZmlnLnRwbC5yZXBsYWNlKCd7e21zZ319JywgY29uZmlnLm1zZyk7XG5cdH07XG5cdFxuXHR2YXIgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdC8vIGJlZm9yZSBpbml0XG5cdFx0YmVmb3JlKCk7XG5cdFx0XG5cdFx0bmV3IEJveCh7XG5cdFx0XHR0aXRsZTogY29uZmlnLnRpdGxlLFxuXHRcdFx0dmFsdWU6IGNvbmZpZy50cGwsXG5cdFx0XHR3aWR0aDogY29uZmlnLndpZHRoLFxuXHRcdFx0aGVpZ2h0OiBjb25maWcuaGVpZ2h0LFxuXHRcdFx0b3ZlcmxheTogY29uZmlnLm92ZXJsYXksXG5cdFx0XHRzaG93ZWQ6IGZ1bmN0aW9uKGVsZSwgYm94KSB7XG5cdFx0XHRcdC8vIGNsaWNrIG9rXG5cdFx0XHRcdCQoZWxlKS5maW5kKCcuYnRuLWNvbmZpcm0tb2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGNvbmZpZy5vaygkKHRoaXMpLCBlbGUsIGJveCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gY2xpY2sgY2FuY2VsXG5cdFx0XHRcdCQoZWxlKS5maW5kKCcuYnRuLWNvbmZpcm0tY2FuY2VsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRjb25maWcuY2FuY2VsKCQodGhpcyksIGVsZSwgYm94KTtcblx0XHRcdFx0XHRib3guaGlkZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHRcdGNvbmZpZy5jb21wbGV0ZShlbGUsIGJveCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cdFxuXHRcblx0XG5cdGluaXRpYWxpemUuY2FsbCh0aGlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRDY2NPayhvcHRpb25zKTtcbn07XG5cbiIsIi8qKlxuICogQGZpbGUg5YWs55So55qE5pWw5o2u5Lqk5LqS5bGCXG4gKiBAYXV0aG9yIGh1aXAoaHVpLnBlbmdAY3JlZGl0Y2xvdWQuY29tKVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhY2hlID0ge307XG5cbmV4cG9ydHMuQ29tbW9uU2VydmljZSA9IHtcbiAgICBnZXRDYXB0Y2hhOiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICB2YXIgdGltZXN0YW1wID0gbmV3IERhdGUoKSAtIDA7XG4gICAgICAgIHJlcXVlc3QoJ0dFVCcsICcvYXBpL3YyL3JlZ2lzdGVyL2NhcHRjaGE/dGltZXN0YW1wPScgKyB0aW1lc3RhbXApXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHJlcy5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2hlY2tDYXB0Y2hhOiBmdW5jdGlvbiAoY2FwdGNoYSwgbmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdQT1NUJywgJy9hcGkvdjIvcmVnaXN0ZXIvY2FwdGNoYT90b2tlbj0nICsgY2FwdGNoYS50b2tlbilcbiAgICAgICAgICAgIC50eXBlKCdmb3JtJylcbiAgICAgICAgICAgIC5zZW5kKGNhcHRjaGEpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBuZXh0KHJlcy5ib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0U21zQ2FwdGNoYTogZnVuY3Rpb24gKG1vYmlsZSwgbmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdHRVQnLCAnL2FwaS92Mi9yZWdpc3Rlci9zbXNDYXB0Y2hhP21vYmlsZT0nICsgbW9iaWxlKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyZXMuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFVzZXJJbmZvOiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICByZXR1cm4gY2FjaGUudXNlckluZm8gPyBjYWNoZS51c2VySW5mbyA6XG4gICAgICAgICAgICAoY2FjaGUudXNlckluZm8gPSByZXF1ZXN0KCdHRVQnLCAnL3VzZXIvaW5mbycpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChyZXMuYm9keSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuYm9keTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9LFxuICAgIGFydGljbGVzOiBmdW5jdGlvbiAoY2F0ZSwgbmFtZSwgbmV4dCkge1xuICAgICAgICByZXR1cm4gcmVxdWVzdCgnR0VUJywgJy9hcGkvdjIvY21zLycrY2F0ZSsnLycrbmFtZSlcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KHJlcy5ib2R5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5ib2R5O1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRTbXNDYXB0Y2hhRm9yUmVzZXRQYXNzd29yZDogZnVuY3Rpb24gKG1vYmlsZSwgbmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdHRVQnLCAnL2FwaS92Mi91c2Vycy9zbXNDYXB0Y2hhL2NoYW5nZVB3ZD9tb2JpbGU9JyArIG1vYmlsZSlcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIG5leHQocmVzLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRNZXNzYWdlOiBmdW5jdGlvbiAoc21zVHlwZSwgbmV4dCkge1xuICAgICAgICByZXF1ZXN0KCdQT1NUJywgJy9hcGkvdjIvc21zQ2FwdGNoYS9NWVNFTEYnKVxuICAgICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICAgICAgICAgICAgLnNlbmQoe3Ntc1R5cGU6IHNtc1R5cGV9KVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyZXMuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNoZWNrTWVzc2FnZTogZnVuY3Rpb24gKHNtc1R5cGUsIHNtc0NhcHRjaGEsIG5leHQpIHtcbiAgICAgICAgcmVxdWVzdCgnUE9TVCcsICcvYXBpL3YyL2NoZWNrU01TQ2FwdGNoYS9NWVNFTEYnKVxuICAgICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICAgICAgICAgICAgLnNlbmQoe3Ntc0NhcHRjaGE6IHNtc0NhcHRjaGEsIHNtc1R5cGU6IHNtc1R5cGV9KVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyZXMuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxufTsiLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCdib290c3RyYXAvanMvdHJhbnNpdGlvbicpO1xucmVxdWlyZSgnYm9vdHN0cmFwL2pzL3Rvb2x0aXAnKTtcblxuLyoqXG4gKiDliJ3lp4vljJYgdG9vbHRpcFxuICpcbiAqIOe7meagh+etvuWKoOS4ii5jY2MtdGlwcy17YXJyb3d95ZKMdGl0bGXvvIzlsLHlj6/ku6Xoh6rliqjosIPnlKh0b29sdGlwXG4gKiDlpoLvvJo8YnV0dG9uIGNsYXNzPVwiY2NjLXRpcHMtYm90dG9tXCIgdGl0bGU9XCJ0aXBz5pi+56S65YaF5a65XCI+dGVzdDwvYnV0dG9uPlxuICovXG5bJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCddLmZvckVhY2goZnVuY3Rpb24gKGFycm93KSB7XG4gICAgJCgnLmNjYy10aXBzLScgKyBhcnJvdylcbiAgICAgICAgLnRvb2x0aXAoe1xuICAgICAgICAgICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICAgICAgcGxhY2VtZW50OiBhcnJvd1xuICAgICAgICB9KTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvY2NjL2dsb2JhbC9jc3MvbW9kdWxlcy9jY2NDYWxjdWxhdG9yLmNzc1wiPlxcbjxkaXYgY2xhc3M9XCJjYy1jYWxjdWxhdG9yLXdwXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjYWxjdWxhdG9yLXRpdGxlXCI+XFxuICAgICAgICA8cCBjbGFzcz1cImNhbGN1bGF0b3ItdGl0bGUtbGVmdFwiPuaUtuebiuiuoeeul+WZqDwvcD5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWxjdWxhdG9yLWxpbmVcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCIgc3R5bGU9XCJ3aWR0aDozMyU7ZmxvYXQ6bGVmdDtcIj5cXG4gICAgICAgICAgICA8Zm9ybSBuYW1lPVwiY2NDYWxjdWxhdG9yRm9ybVwiIGNsYXNzPVwiZm9ybS1ob3Jpem9udGFsXCIgcm9sZT1cImZvcm1cIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYy1jYWwtZjJcIiBjbGFzcz1cImNvbC1zbS00IGNvbnRyb2wtbGFiZWxcIj7mipXotYTph5Hpop08L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS04XCIgc3R5bGU9XCJmbG9hdDpyaWdodDttYXJnaW4tdG9wOi0zMHB4O1wiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJjYy1jYWwtZjJcIiBuYW1lPVwiYW1vdW50VmFsdWVcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwi5oKo55qE5oqV6LWE6YeR6aKdXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+5YWDPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNjLWNhbC1mM1wiIGNsYXNzPVwiY29sLXNtLTQgY29udHJvbC1sYWJlbFwiIHBsYWNlaG9sZGVyPVwiXCI+5oqV6LWE5pyf6ZmQPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOFwiIHN0eWxlPVwiZmxvYXQ6cmlnaHQ7bWFyZ2luLXRvcDotMzBweDtcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiY2MtY2FsLWYzXCIgbmFtZT1cImR1ZU1vbnRoXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIuacn+acm+aXtumXtOmVv+W6plwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPuaciDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYy1jYWwtZjRcIiBjbGFzcz1cImNvbC1zbS00IGNvbnRyb2wtbGFiZWxcIj7lubTljJbliKnnjoc8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS04XCIgc3R5bGU9XCJmbG9hdDpyaWdodDttYXJnaW4tdG9wOi0zMHB4O1wiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJjYy1jYWwtZjRcIiBuYW1lPVwiYW5udWFsUmF0ZVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCLlubTljJbliKnnjodcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4lPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNjLWNhbC1mNVwiIGNsYXNzPVwiY29sLXNtLTQgY29udHJvbC1sYWJlbFwiPui/mOasvuaWueW8jzwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLThcIiBzdHlsZT1cImZsb2F0OnJpZ2h0O21hcmdpbi10b3A6LTMwcHg7XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCJwYXltZW50TWV0aG9kXCIgaWQ9XCJjYy1jYWwtZjVcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPmxvYWRpbmcuLi48L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tb2Zmc2V0LTQgY29sLXNtLThcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tb3JhbmdlIGJ0bi1jYWxcIj7orqHnrpfmlLbnm4o8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZXNldFwiIGNsYXNzPVwicmVzZXRcIj7ph43nva48L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Zvcm0+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtOFwiIHN0eWxlPVwid2lkdGg6NjQlO2Zsb2F0OmxlZnQ7XCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjLWNhbC1yZXN1bHRzLWJveFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2MtcmVzIHRhYmxlIHRhYmxlLWJvcmRlcmVkMSB0ZENvbnRlbnRcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjY2MtZiB0ZENlbGxcIj7mlLbmrL7ml6XmnJ88L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZENlbGxcIj7mlLbmrL7ph5Hpop08L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZENlbGxcIj7mlLblm57mnKzph5E8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZENlbGxcIj7mlLblm57liKnmga88L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjY2MtbCB0ZENlbGxcIj7liankvZnmnKzph5E8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYy1yZXMgY2MtdGFibGUtY29udGFpbmVyXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfd3JhcFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1ob3ZlclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY2MtY2FsLWxpc3Qtd3BcIj5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYy1yZXMgdGFibGUtYm9yZGVyZWQxIGNjLXRhbGJlLXRvdGFsIGhpZGVcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjYy1jYWwtdG90YWwgdGFibGUtYm9yZGVyZWQxIHRkQ29udGVudFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYy10b3RhbC10ciBjbGVhcmZpeCBjYy10b3RhbC10ci1iXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjY2MtZiB0ZENlbGxcIj7mgLvorqE8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIlRhbW91bnQgdGRDZWxsXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJUYW1vdW50UHJpbmNpcGFsIHRkQ2VsbFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiVGFtb3VudEludGVyZXN0IHRkQ2VsbFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2NjLWwgVGFtb3VudE91dHN0YW5kaW5nIHRkQ2VsbFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYy10b3RhbFwiPlxcbiAgICAgICAgICAgICAgICA8c3Bhbj7mnKzmga/lkIjorqHvvJo8ZW0gY2xhc3M9XCJGYW1vdW50XCI+PC9lbT48L3NwYW4+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+JzsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwiY2NjLWNvbmZpcm0td3JhcFwiPlxcblx0PGRpdiBjbGFzcz1cInNwYWNlIHNwYWNlLTMwXCI+PC9kaXY+XFxuXHQ8ZGl2IGNsYXNzPVwiYWxpZ24tY2VudGVyXCI+XFxuXHRcdDxwIHN0eWxlPVwicGFkZGluZzowcHggMjBweDtmb250LXNpemU6MTZweDtjb2xvcjojNGE0YTRhO1wiPnt7bXNnfX08L3A+XFxuXHQ8L2Rpdj5cXG5cdDxkaXYgY2xhc3M9XCJzcGFjZSBzcGFjZS0zMFwiPjwvZGl2Plxcblx0PGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwibGVmdDowcHg7XCI+XFxuXHRcdDxkaXYgY2xhc3M9XCJjb2wtbWQtNiBhbGlnbi1yaWdodFwiPlxcblx0XHRcdDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLWNvbmZpcm0tb2tcIj57e29rVGV4dH19PC9idXR0b24+XFxuXHRcdDwvZGl2Plxcblx0XHQ8ZGl2IGNsYXNzPVwiY29sLW1kLTZcIj5cXG5cdFx0XHQ8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1jb25maXJtLWNhbmNlbFwiPnt7Y2FuY2VsVGV4dH19PC9idXR0b24+XFxuXHRcdDwvZGl2Plxcblx0PC9kaXY+XFxuPC9kaXY+JzsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8ZGl2IGNsYXNzPVwiY2NjLWNvbmZpcm0td3JhcFwiPlxcblx0PGRpdiBjbGFzcz1cInNwYWNlIHNwYWNlLTMwXCI+PC9kaXY+XFxuXHQ8ZGl2IGNsYXNzPVwiYWxpZ24tY2VudGVyXCI+XFxuXHRcdDxwPnt7bXNnfX08L3A+XFxuXHRcdDwhLS0gPHA+6K+36YeN5paw55m75b2VPC9wPiAtLT5cXG5cdDwvZGl2Plxcblx0PGRpdiBjbGFzcz1cInNwYWNlIHNwYWNlLTMwXCI+PC9kaXY+XFxuXHQ8ZGl2IGNsYXNzPVwicm93XCI+XFxuXHRcdDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgYWxpZ24tY2VudGVyXCI+XFxuXHRcdFx0PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG4tY29uZmlybS1va1wiPnt7b2tUZXh0fX08L2J1dHRvbj5cXG5cdFx0PC9kaXY+XFxuXHQ8L2Rpdj5cXG48L2Rpdj4nOyIsIi8qKlxuICogQGZpbGUg54K55Ye75p+l55yL5aSn5Zu+55qE5Lqk5LqS6YC76L6R5bGCXG4gKiBAYXV0aG9yIGxpbHVsdShsaWx1bHVAaGFuaHVhLmNvbSlcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5wb3B1cEJpZ1BpYyA9IHtcbiAgICBpbnN0YW5jZTogZmFsc2UsXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMucG9wdXBCaWdQaWNSYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuICAgICAgICAgICAgZWw6ICcjYmlnLXBpYy1jb250YWluZXInLFxuICAgICAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJ2NjYy9sb2FuL3BhcnRpYWxzL2JpZ1BpYy5odG1sJyksICAgICAgICAgICAgXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW1nczogW10sXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yc01hcmdpbkxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgc3RhZ2VMZW46IDUsXG4gICAgICAgICAgICAgICAgaW1nTGVuOjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHBvcHVwQmlnUGljUmFjdGl2ZSA9IHRoaXMucG9wdXBCaWdQaWNSYWN0aXZlO1xuXG4gICAgICAgIHBvcHVwQmlnUGljUmFjdGl2ZS5vbignZW5kLWJpZy1waWMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNldCgndmlzaWJsZScsIGZhbHNlKTtcbi8vICAgICAgICAgICAgICQoJ2JvZHknKVxuLy8gICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3Zlci1mbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgJChcIiNtYXNrLWxheWVyLXdyYXBlclwiKVxuICAgICAgICAgICAgLmhpZGUoKTsgICAgICAgICAgICBcbiAgICAgICAgfSk7ICAgICAgICAgICAgICAgIFxuICAgIFxuICAgICAgICAvLyDlpKflm77mtY/op4jml7bliIfmjaJcbiAgICAgICAgdmFyIHRpbWVyO1xuICAgICAgICBwb3B1cEJpZ1BpY1JhY3RpdmUub24oXCJwcmV2LWJpZyBuZXh0LWJpZ1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5nZXQoXCJjdXJyZW50SW5kZXhcIikpO1xuXG4gICAgICAgICAgICBpZiAoZS5uYW1lID09PSBcInByZXYtYmlnXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldChcImN1cnJlbnRJbmRleFwiLCB0aGlzLmdldChcImN1cnJlbnRJbmRleFwiKSAtIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldChcImN1cnJlbnRJbmRleFwiLCB0aGlzLmdldChcImN1cnJlbnRJbmRleFwiKSArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5nZXQoXCJjdXJyZW50SW5kZXhcIikpO1xuXG4gICAgICAgICAgICAvLyDlrprml7bpmpDol49cbiAgICAgICAgICAgIHRoaXMuc2V0KFwic2hvd1RpcFwiLCB0cnVlKTtcbi8vICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgIHBvcHVwQmlnUGljUmFjdGl2ZS5zZXQoXCJzaG93VGlwXCIsIGZhbHNlKTtcbi8vICAgICAgICAgICAgfSwgNTAwMCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNob3c6IGZ1bmN0aW9uIChvcHRpb25zLHBvc3RDbG9zZUhvb2spIHtcbiAgICAgICAgY29uc29sZS5sb2cob3B0aW9ucyk7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHBvc3RDbG9zZUhvb2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IHRoaXMucG9wdXBCaWdQaWNSYWN0aXZlLm9uKFxuICAgICAgICAgICAgICAgICdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zdENsb3NlSG9vaygpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvcHVwQmlnUGljUmFjdGl2ZS5zZXQoJ3Zpc2libGUnLCB0cnVlKTtcbiAgICAgICAgdGhpcy5wb3B1cEJpZ1BpY1JhY3RpdmUuc2V0KCdjdXJyZW50SW5kZXgnLCBvcHRpb25zLmN1cnJlbnRJbmRleCB8fCB0aGlzLnBvcHVwQmlnUGljUmFjdGl2ZS5nZXQoJ2N1cnJlbnRJbmRleCcpKTtcbiAgICAgICAgdGhpcy5wb3B1cEJpZ1BpY1JhY3RpdmUuc2V0KCdpbWdzJywgb3B0aW9ucy5pbWdzIHx8IHRoaXMucG9wdXBCaWdQaWNSYWN0aXZlLmdldCgnaW1ncycpKTtcbi8vICAgICAgICAgJCgnYm9keScpXG4vLyAgICAgICAgICAgLmFkZENsYXNzKCdvdmVyLWZsb3ctaGlkZGVuJyk7XG4gICAgICAgICQoXCIjbWFzay1sYXllci13cmFwZXJcIilcbiAgICAgICAgICAgIC5zaG93KCk7XG4gICAgfSAgICAgICAgXG59O1xuXG5cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGxvYW5TZXJ2aWNlID0gcmVxdWlyZSgnLi9zZXJ2aWNlL2xvYW5zLmpzJykubG9hblNlcnZpY2U7XG52YXIgdXRpbHMgPSByZXF1aXJlKCdjY2MvZ2xvYmFsL2pzL2xpYi91dGlscycpO1xudmFyIGFjY291bnRTZXJ2aWNlID0gcmVxdWlyZSgnY2NjL2FjY291bnQvanMvbWFpbi9zZXJ2aWNlL2FjY291bnQnKS5hY2NvdW50U2VydmljZTtcbnZhciBDb21tb25TZXJ2aWNlID0gcmVxdWlyZSgnY2NjL2dsb2JhbC9qcy9tb2R1bGVzL2NvbW1vbicpLkNvbW1vblNlcnZpY2U7XG52YXIgQ2NjT2sgPSByZXF1aXJlKCdjY2MvZ2xvYmFsL2pzL21vZHVsZXMvY2NjT2snKTtcbnZhciBpMThuID0gcmVxdWlyZSgnQGRzL2kxOG4nKVsnemgtY24nXTtcbnZhciBmb3JtYXQgPSByZXF1aXJlKCdAZHMvZm9ybWF0JylcblxucmVxdWlyZSgnY2NjL2dsb2JhbC9qcy9tb2R1bGVzL3Rvb2x0aXAnKTtcbnJlcXVpcmUoJ2NjYy9nbG9iYWwvanMvbGliL2pxdWVyeS5lYXN5LXBpZS1jaGFydC5qcycpO1xucmVxdWlyZSgnYm9vdHN0cmFwL2pzL2Nhcm91c2VsJyk7XG5cbnJlcXVpcmUoJ2Jvb3RzdHJhcC9qcy90cmFuc2l0aW9uJyk7XG5yZXF1aXJlKCdib290c3RyYXAvanMvdG9vbHRpcCcpO1xuXG52YXIgQ2FsID0gcmVxdWlyZSgnY2NjL2dsb2JhbC9qcy9tb2R1bGVzL2NjY0NhbGN1bGF0b3InKTtcblxuLy8gY2NjQ29uZmlybVxudmFyIENvbmZpcm0gPSByZXF1aXJlKCdjY2MvZ2xvYmFsL2pzL21vZHVsZXMvY2NjQ29uZmlybScpO1xuXG52YXIgcG9wdXBCaWdQaWMgPSByZXF1aXJlKCdjY2MvbG9hbi9qcy9tYWluL2JpZ1BpYycpXG4gICAgLnBvcHVwQmlnUGljO1xudmFyIHN0YXR1c01hcCA9IHtcbiAgICBTQ0hFRFVMRUQ6ICflvIDmoIfml7bpl7Q6e3t0aW1lT3Blbn19JyxcbiAgICBTRVRUTEVEOiAn57uT5qCH5pe26Ze0Ont7dGltZUZpbmlzaGVkfX0nLFxuICAgIE9QRU5FRDogJycsXG4gICAgRklOSVNIRUQ6ICcnLFxuICAgIENMRUFSRUQ6ICcnXG59O1xuXG5cblxudmFyIHRlbXBsYXRlID0gc3RhdHVzTWFwW0NDLmxvYW4uc3RhdHVzXTtcblxubmV3IFJhY3RpdmUoe1xuICAgIGVsOiBcIi5vcGVuVGltZVwiLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICBkYXRhOiB7XG4gICAgICAgIHRpbWVPcGVuOiBtb21lbnQoQ0MubG9hbi50aW1lT3BlbikuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tJyksXG4gICAgICAgIHRpbWVGaW5pc2hlZDogbW9tZW50KG5ldyBEYXRlKHBhcnNlSW50KENDLmxvYW4udGltZUZpbmlzaGVkKSkpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbScpXG4gICAgfVxufSk7XG5cblxuXG5cblxuZnVuY3Rpb24gaW5pdGFpbEVhc3lQaWVDaGFydCgpIHtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIOWIneWni+WMlumlvOeKtuWbvlxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvbGRpZSA9IC9tc2llXFxzKig4fDd8NikvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgJChcIi5lYXN5LXBpZS1jaGFydFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwZXJjZW50YWdlID0gJCh0aGlzKS5kYXRhKFwicGVyY2VudFwiKTtcblx0XHRcdHZhciBwZXJjZW50YWdlTnVtID0gQ0MubG9hbi5ydWxlLmxlZnRBbW91bnQ7XG4gICAgICAgICAgICAvLyAxMDAl6L+b5bqm5p2h6aKc6Imy5pi+56S65Li66IOM5pmv6ImyXG4gICAgICAgICAgICB2YXIgY29sb3IgPSBwZXJjZW50YWdlID09PSAxMDAgPyBcIiNmNTgyMjBcIiA6ICcjMDA5YWRhJztcbiAgICAgICAgICAgICQodGhpcykuZWFzeVBpZUNoYXJ0KHtcbiAgICAgICAgICAgICAgICBiYXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgICAgdHJhY2tDb2xvcjogJyNkZGQnLFxuICAgICAgICAgICAgICAgIHNjYWxlQ29sb3I6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxpbmVDYXA6ICdidXR0JyxcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDQsXG4gICAgICAgICAgICAgICAgYW5pbWF0ZTogb2xkaWUgPyBmYWxzZSA6IDEwMDAsXG4gICAgICAgICAgICAgICAgc2l6ZTogMTMwLFxuICAgICAgICAgICAgICAgIG9uU3RlcDogZnVuY3Rpb24gKGZyb20sIHRvLCBwZXJjZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcy5lbCkuZmluZCgnLnBlcmNlbnQnKS50ZXh0KE1hdGgucm91bmQocGVyY2VudCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoXCJzcGFuLnBlcmNlbnRhZ2VOdW1cIikuaHRtbCgnPHNwYW4gc3R5bGU9XCJjb2xvcjojZjU4MjIwO2ZvbnQtc2l6ZToyNHB4O1wiPicgKyBwZXJjZW50YWdlTnVtICsgJzwvc3Bhbj4nICsgJzxzcGFuIHN0eWxlPVwiY29sb3I6IzRiNGI0YjtcIj4nICsgIENDLmxvYW4ucnVsZS5kdyArICc8L3NwYW4+Jyk7XG5cblx0XHRcdHZhciB3aWR0aCA9ICQodGhpcykuZmluZChcInNwYW4ucGVyY2VudGFnZU51bVwiKS53aWR0aCgpO1xuXHRcdFx0JCh0aGlzKS5maW5kKFwic3Bhbi5wZXJjZW50YWdlTnVtXCIpLmNzcyh7J2xlZnQnOic1MCUnLCdtYXJnaW4tbGVmdCc6LXdpZHRoLzJ9KTtcbi8vXHRcdFx0Y29uc29sZS5sb2cod2lkdGgpO1xuXHRcdFx0XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59O1xuXG5pbml0YWlsRWFzeVBpZUNoYXJ0KCk7XG5cblxuJChcIltkYXRhLXRvZ2dsZT10b29sdGlwXVwiKVxuICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnRvb2x0aXAoe1xuICAgICAgICAgICAgICAgIC8vIOWQjOe6p+eahCB0b29sdGlwLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy50b29sdGlwLWNvbnRhaW5lcicpXG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcbnNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICBDQy5sb2FuLnRpbWVFbGFwc2VkID0gdXRpbHMuZm9ybWF0LnRpbWVFbGFwc2VkKENDLmxvYW4udGltZUVsYXBzZWQpO1xuICAgIGNvbnNvbGUubG9nKENDLmxvYW4udGltZUVsYXBzZWQpO1xuICAgIENDLmxvYW4udGltZUxlZnQgPSBKU09OLnBhcnNlKENDLmxvYW4udGltZUxlZnQpO1xuICAgIHZhciBsZWZ0VGltZSA9IENDLmxvYW4udGltZUxlZnQ7XG4gICAgdmFyIHRpbWVMZWZ0VG9hbCA9IGxlZnRUaW1lLnNzICsgbGVmdFRpbWUubW0gKiA2MCArIGxlZnRUaW1lLmhoICogNjAgKiA2MCArIGxlZnRUaW1lLmRkICogNjAgKiA2MCAqIDI0O1xuICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRpbWVMZWZ0VG9hbCAtPSAxO1xuICAgICAgICAgICAgdmFyIGRkID0gcGFyc2VJbnQodGltZUxlZnRUb2FsIC8gKDYwICogNjAgKiAyNCksIDEwKSxcbiAgICAgICAgICAgICAgICBoaCA9IHBhcnNlSW50KCh0aW1lTGVmdFRvYWwgLSBkZCAqIDYwICogNjAgKiAyNCkgLyAoNjAgKiA2MCksIDEwKSxcbiAgICAgICAgICAgICAgICBtbSA9IHBhcnNlSW50KCh0aW1lTGVmdFRvYWwgLSBkZCAqIDYwICogNjAgKiAyNCAtIGhoICogNjAgKiA2MCkgLyA2MCwgMTApLFxuICAgICAgICAgICAgICAgIHNzID0gcGFyc2VJbnQodGltZUxlZnRUb2FsIC0gZGQgKiA2MCAqIDYwICogMjQgLSBoaCAqIDYwICogNjAgLSBtbSAqIDYwLCAxMCk7XG4gICAgICAgICAgICB2YXIgbmV3VGltZWxlZnRUb3RhbCA9IHtcbiAgICAgICAgICAgICAgICBkZDogZGQsXG4gICAgICAgICAgICAgICAgaGg6IGhoLFxuICAgICAgICAgICAgICAgIG1tOiBtbSxcbiAgICAgICAgICAgICAgICBzczogc3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkYXlzID0gbmV3VGltZWxlZnRUb3RhbC5kZCA/ICc8aT4nICsgbmV3VGltZWxlZnRUb3RhbC5kZCArICc8L2k+5pelJyA6ICcnO1xuICAgICAgICAgICAgJCgnLnRpbWU+c3BhbicpLmh0bWwoIGRheXMgKyAnPGk+JyArIG5ld1RpbWVsZWZ0VG90YWwuaGggKyAnPC9pPuaXtjxpPicgKyBuZXdUaW1lbGVmdFRvdGFsLm1tICsgJzwvaT7liIY8aT4nICsgbmV3VGltZWxlZnRUb3RhbC5zcyArICc8L2k+56eSJyk7XG4gICAgICAgIH0sIDEwMDApXG4gICAgICAgIC8v6I635Y+W5pyA5ZCO6L+Y5qy+5pel5pyfXG4gICAgaWYgKENDLnJlcGF5bWVudHMgaW5zdGFuY2VvZiBBcnJheSAmJiBDQy5yZXBheW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgQ0MubG9hbi5sYXN0UmVwYXltZW50c0RhdGUgPSBDQy5yZXBheW1lbnRzWzBdLmR1ZURhdGU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQ0MucmVwYXltZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKENDLmxvYW4ubGFzdFJlcGF5bWVudHNEYXRlIDwgQ0MucmVwYXltZW50c1tpXS5kdWVEYXRlKSB7XG4gICAgICAgICAgICAgICAgQ0MubG9hbi5sYXN0UmVwYXltZW50c0RhdGUgPSBDQy5yZXBheW1lbnRzW2ldLmR1ZURhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGludmVzdFJhY3RpdmUgPSBuZXcgUmFjdGl2ZSh7XG4gICAgICAgIGVsOiBcIi5kby1pbnZlc3Qtd3JhcHBlclwiLFxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnY2NjL2xvYW4vcGFydGlhbHMvZG9JbnZlc3RPbkRldGFpbC5odG1sJyksXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgdXNlcjogQ0MudXNlcixcbiAgICAgICAgICAgIGxvYW46IENDLmxvYW4sXG4gICAgICAgICAgICBpbnB1dE51bTogQ0MubG9hbi5ydWxlLm1pbixcbiAgICAgICAgICAgIHJhdGU6IHV0aWxzLmZvcm1hdC5wZXJjZW50KENDLmxvYW4uaW52ZXN0UGVyY2VudCAqXG4gICAgICAgICAgICAgICAgMTAwLCAyKSxcbiAgICAgICAgICAgIGFncmVlbWVudDogQ0MudXNlciA/IChDQy51c2VyLmFncmVlbWVudCA/XG4gICAgICAgICAgICAgICAgQ0MudXNlci5hZ3JlZW1lbnQgOiBmYWxzZSkgOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yczoge1xuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1zZzogJydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJ2ZXJEYXRlOiBDQy5zZXJ2ZXJEYXRlLFxuICAgICAgICAgICAgaXNTZW5kOiBmYWxzZSxcbiAgICAgICAgICAgIGJhY2tVcmw6IENDLmJhY2tVcmxcbiAgICAgICAgfSxcbiAgICAgICAgb25pbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coQ0MubG9hbi5ydWxlLmJhbGFuY2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coQ0MubG9hbi5ydWxlLm1pbik7XG4gICAgICAgICAgICBpZiAoQ0MubG9hbi5ydWxlLmJhbGFuY2UgPCBDQy5sb2FuLnJ1bGUubWluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ2lucHV0TnVtJywgQ0MubG9hbi5ydWxlLmJhbGFuY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFyIHNlcnZlckRhdGUgPSBDQy5zZXJ2ZXJEYXRlO1xuICAgIHZhciBvcGVuVGltZSA9IENDLmxvYW4udGltZU9wZW47XG4gICAgc2VydmVyRGF0ZSArPSAxMDAwO1xuICAgIGlmIChDQy5sb2FuLnN0YXR1cyA9PT0gJ1NDSEVEVUxFRCcpIHtcbiAgICAgICAgdmFyIGludGVydmFsID0gc2V0SW50ZXJ2YWwoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsZWZ0VGltZSA9IHV0aWxzLmNvdW50RG93bi5nZXRDb3VudERvd25UaW1lMihvcGVuVGltZSwgc2VydmVyRGF0ZSk7XG4gICAgICAgICAgICB2YXIgdGV4dERheSA9IGxlZnRUaW1lLmRheSA/IGxlZnRUaW1lLmRheSA6ICcnO1xuICAgICAgICAgICAgaWYgKCErKGxlZnRUaW1lLmRheSkgJiYgISsobGVmdFRpbWUuaG91cikgJiYgISsobGVmdFRpbWUubWluKSAmJiAhKyhsZWZ0VGltZS5zZWMpKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5sZWZ0LXRpbWUtc3RhcnQnKS5odG1sKCc8c3BhbiBjbGFzcz1cInRleHRcIj7ot53nprvlvIDmoIfml7bpl7Tov5jmnIk8c3BhbiBzdHlsZT1cImNvbG9yOiMwMDlhZGFcIj4nICsgdGV4dERheSArICc8L3NwYW4+5aSpPHNwYW4gc3R5bGU9XCJjb2xvcjojMDA5YWRhO1wiPicrIGxlZnRUaW1lLmhvdXIgKyAnPC9zcGFuPuaXtjxzcGFuIHN0eWxlPVwiY29sb3I6IzAwOWFkYVwiPicgKyBsZWZ0VGltZS5taW4gKyAnPC9zcGFuPuWIhjxzcGFuIHN0eWxlPVwiY29sb3I6IzAwOWFkYVwiPicgKyBsZWZ0VGltZS5zZWMgKyAnPC9zcGFuPuenkjwvc3Bhbj4nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgMTAwMCk7XG4gICAgfVxuXG5cblxuICAgIGlmIChDQy51c2VyKSB7XG4gICAgICAgIGFjY291bnRTZXJ2aWNlLmdldFVzZXJJbmZvKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGludmVzdFJhY3RpdmUuc2V0KCduYW1lJywgcmVzLnVzZXIubmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGludmVzdFJhY3RpdmUuc2V0KCd1c2VyJywgQ0MudXNlcik7XG4gICAgaWYgKCQoJy5pbnZlc3Qtc3VibWl0JykubGVuZ3RoID4gMCkge1xuXG4gICAgfVxuXG5cbiAgICBpbnZlc3RSYWN0aXZlLm9uKCdyZWR1Y2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgaWYgKENDLmxvYW4ucnVsZS5iYWxhbmNlIDwgQ0MubG9hbi5ydWxlLm1pbikge1xuICAgICAgICAgICAgdGhpcy5zZXQoJ2lucHV0TnVtJywgQ0MubG9hbi5ydWxlLmJhbGFuY2UpO1xuICAgICAgICAgICAgc2hvd0Vycm9ycygn5oqV6LWE6YeR6aKd5b+F6aG75Li65qCH55qE5Ymp5L2Z6YeR6aKdJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KHRoaXMuZ2V0KCdpbnB1dE51bScpKTtcbiAgICAgICAgbnVtID0gbnVtIC0gcGFyc2VJbnQoQ0MubG9hbi5ydWxlLnN0ZXApO1xuICAgICAgICBpZiAobnVtIDwgQ0MubG9hbi5ydWxlLm1pbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGludmVzdFJhY3RpdmUuc2V0KCdpbnB1dE51bScsIG51bSk7XG4gICAgICAgIHNob3dTZWxlY3QobnVtKTtcbiAgICB9KTtcblxuICAgIGludmVzdFJhY3RpdmUub24oJ2FkZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChDQy5sb2FuLnJ1bGUuYmFsYW5jZSA8IENDLmxvYW4ucnVsZS5taW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KCdpbnB1dE51bScsIENDLmxvYW4ucnVsZS5iYWxhbmNlKTtcbiAgICAgICAgICAgIHNob3dFcnJvcnMoJ+aKlei1hOmHkemineW/hemhu+S4uuagh+eahOWJqeS9memHkeminScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBudW0gPSBwYXJzZUludCh0aGlzLmdldCgnaW5wdXROdW0nKSk7XG4gICAgICAgIGlmIChudW0gPCBDQy5sb2FuLnJ1bGUubWluKSB7XG4gICAgICAgICAgICBudW0gPSBDQy5sb2FuLnJ1bGUubWluO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtID0gbnVtICsgcGFyc2VJbnQoQ0MubG9hbi5ydWxlLnN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChudW0gPiBDQy5sb2FuLnJ1bGUubWF4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaW52ZXN0UmFjdGl2ZS5zZXQoJ2lucHV0TnVtJywgbnVtKTtcbiAgICAgICAgc2hvd1NlbGVjdChudW0pO1xuICAgIH0pO1xuXG5cbiAgICBpbnZlc3RSYWN0aXZlLm9uKCdtYXhOdW1iZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoQ0MubG9hbi5ydWxlLmJhbGFuY2UgPCBDQy5sb2FuLnJ1bGUubWluKSB7XG4gICAgICAgICAgICB0aGlzLnNldCgnaW5wdXROdW0nLCBDQy5sb2FuLnJ1bGUuYmFsYW5jZSk7XG4gICAgICAgICAgICBzaG93RXJyb3JzKCfmipXotYTph5Hpop3lv4XpobvkuLrmoIfnmoTliankvZnph5Hpop0nKTtcbiAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIHZhciBsbW91bnQ9Q0MubG9hbi5ydWxlLmxlZnRBbW91bnQ7XG4gICAgICAgIGlmKENDLmxvYW4ucnVsZS5kdz09PSfkuIcnKXtcbiAgICAgICAgICAgIGxtb3VudD1sbW91bnQqMTAwMDA7XG4gICAgICAgIH1cbiAgICAgICB2YXIgbWluTnVtPU1hdGgubWluKENDLnVzZXIuYXZhaWxhYmxlQW1vdW50LENDLmxvYW4ucnVsZS5tYXgsbG1vdW50KTtcbiAgICAgXG4gICAgICAgIGludmVzdFJhY3RpdmUuc2V0KCdpbnB1dE51bScsIE1hdGguZmxvb3IocGFyc2VJbnQobWluTnVtL0NDLmxvYW4ucnVsZS5zdGVwKSpDQy5sb2FuLnJ1bGUuc3RlcCkpO1xuICAgICAgICBzaG93U2VsZWN0KE1hdGguZmxvb3IocGFyc2VJbnQobWluTnVtL0NDLmxvYW4ucnVsZS5zdGVwKSpDQy5sb2FuLnJ1bGUuc3RlcCkpO1xuICAgIH0pO1xuXG5cbiAgICBpbnZlc3RSYWN0aXZlLm9uKFwiaW52ZXN0LXN1Ym1pdFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLm9yaWdpbmFsLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KHRoaXMuZ2V0KCdpbnB1dE51bScpLCAxMCk7IC8vIOi+k+WFpeeahOWAvFxuICAgICAgICB2YXIgc21zQ2FwdGNoYSA9IHRoaXMuZ2V0KCdzbXNDYXB0Y2hhJyk7XG4gICAgICAgIHZhciBwYXltZW50UGFzc3dvcmQgPSB0aGlzLmdldCgncGF5bWVudFBhc3N3b3JkJyk7XG4gICAgICAgICAgIHZhciBjb3Vwb25TZWxlY3Rpb249JChcIiNjb3Vwb25TZWxlY3Rpb25cIikuZmluZChcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCk7XG4gICAgICAgIHZhciBpbmRleG51bT1jb3Vwb25TZWxlY3Rpb24uaW5kZXhPZihcIuacgOS9juaKlei1hOmine+8mlwiKTtcbiAgICAgICAgdmFyIG1pbm51bT1jb3Vwb25TZWxlY3Rpb24uc3Vic3RyaW5nKGluZGV4bnVtKzYsY291cG9uU2VsZWN0aW9uLmxlbmd0aC0xKTtcbiAgICAgICAgaWYobnVtPG1pbm51bSl7XG4gICAgICAgICAgICBzaG93RXJyb3JzKCfmipXotYTpop3lsI/kuo7lpZbliLjmnIDkvY7mipXotYTpop0nKTtcbiAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoQ0MubG9hbi51c2VySWQ9PT1DQy51c2VyLnVzZXJJZCl7XG4gICAgICAgICAgICBzaG93RXJyb3JzKCfor6XmoIfkuLrmgqjmnKzkurrlgJ/mrL7vvIzml6Dms5XmipXmoIcgJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChpc05hTihudW0pKSB7XG4gICAgICAgICAgICBzaG93RXJyb3JzKCfovpPlhaXmnInor6/vvIzor7fph43mlrDovpPlhaUgISAnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKENDLmxvYW4ucnVsZS5iYWxhbmNlIDwgQ0MubG9hbi5ydWxlLm1pbikge1xuICAgICAgICAgICAgaWYodGhpcy5nZXQoJ2lucHV0TnVtJykgIT0gQ0MubG9hbi5ydWxlLmJhbGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgdGhpcy5zZXQoJ2lucHV0TnVtJywgQ0MubG9hbi5ydWxlLmJhbGFuY2UpO1xuICAgICAgICAgICAgICAgICBzaG93RXJyb3JzKCfmipXotYTph5Hpop3lv4XpobvkuLrmoIfnmoTliankvZnph5Hpop0nKTtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgZGlzYWJsZUVycm9ycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG51bSA8IENDLmxvYW4ucnVsZS5taW4pIHtcbiAgICAgICAgICAgICAgICBzaG93RXJyb3JzKCfljZXmrKHmipXmoIfph5Hpop3kuI3lj6/lsJHkuo4nICsgQ0MubG9hbi5ydWxlXG4gICAgICAgICAgICAgICAgICAgIC5taW4gKyAn5YWDICEnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICgoKG51bSAtIENDLmxvYW4ucnVsZS5taW4pICUgQ0MubG9hbi5ydWxlLnN0ZXApICE9PVxuICAgICAgICAgICAgICAgIDApIHtcbiAgICAgICAgICAgICAgICBzaG93RXJyb3JzKCfkuI3nrKblkIjmipXotYTop4TliJkh5pyA5bCR5Li6JyArIENDLmxvYW4ucnVsZS5taW4gKyAn5YWD77yM5LiU5oqV6LWE5aKe6YeP5Li6JyArIENDLmxvYW4ucnVsZS5zdGVwICsgXCLlhYNcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChudW0gPiBDQy5sb2FuLnJ1bGUuYmFsYW5jZSkge1xuICAgICAgICAgICAgc2hvd0Vycm9ycygn5oqV5qCH6YeR6aKd5LiN5Y+v6LaF6L+H5Ymp5L2Z6aKd5bqmICEnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW0gPiBDQy5sb2FuLnJ1bGUubWF4KSB7XG4gICAgICAgICAgICBzaG93RXJyb3JzKCfljZXmrKHmipXmoIfph5Hpop3kuI3lj6/otoXov4cnICsgQ0MubG9hbi5ydWxlXG4gICAgICAgICAgICAgICAgLm1heCArXG4gICAgICAgICAgICAgICAgJ+WFgyEnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG51bSA+IENDLnVzZXIuYXZhaWxhYmxlQW1vdW50KSB7XG4gICAgICAgICAgICBzaG93RXJyb3JzKCfotKbmiLfkvZnpop3kuI3otrPvvIzor7flhYjlhYXlgLwgIScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAocGF5bWVudFBhc3N3b3JkID09PSAnJykge1xuICAgICAgICAgICAgc2hvd0Vycm9ycygn6K+36L6T5YWl5Lqk5piT5a+G56CBIScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjb3VudFNlcnZpY2UuY2hlY2tQYXNzd29yZChwYXltZW50UGFzc3dvcmQsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dFcnJvcnMoJ+ivt+i+k+WFpeato+ehrueahOS6pOaYk+WvhueggSEnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtID0gaW52ZXN0UmFjdGl2ZS5nZXQoJ2lucHV0TnVtJyk7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVFcnJvcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvdXBvblRleHQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIjY291cG9uU2VsZWN0aW9uXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAkKFwiI2NvdXBvblNlbGVjdGlvblwiKS5maW5kKFwib3B0aW9uOnNlbGVjdGVkXCIpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbnZlc3RSYWN0aXZlLmdldCgnc2VsZWN0T3B0aW9uJyk9PW51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdXBvblRleHQgPSAn5pyq5L2/55So5Lu75L2V5aWW5Yi4LCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291cG9uVGV4dCA9ICflsIbkvb/nlKgnICsgJChcIiNjb3Vwb25TZWxlY3Rpb25cIikuZmluZChcIm9wdGlvbjpzZWxlY3RlZFwiKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlJykuY2hlY2tlZCA9PSB0cnVlKXtcblx0XHRcdFx0XHRcdCQoJy5hZ3JlZS1lcnJvcicpLmNzcygndmlzaWJpbGl0eScsJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICBcdENvbmZpcm0uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZzogJ+aCqOacrOasoeaKlei1hOeahOmHkemineS4uicgKyBudW0gKyAn5YWD77yMJysgY291cG9uVGV4dCArJ+aYr+WQpuehruiupOaKlei1hO+8nycsXG4gICAgICAgICAgICAgICAgICAgICAgICBva1RleHQ6ICfnoa7lrponLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsXG4gIFxuICAgICAgICAgICAgICAgICAgICAgICAgb2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLnBvc3QoJy9saWFubGlhbnBheS90ZW5kZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudCA6IG51bSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hbklkIDogaW52ZXN0UmFjdGl2ZS5nZXQoJ2xvYW4uaWQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50SWQgOiBpbnZlc3RSYWN0aXZlLmdldCgnY291cG9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheW1lbnRQYXNzd29yZCA6IGludmVzdFJhY3RpdmUuZ2V0KCdwYXltZW50UGFzc3dvcmQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDY2NPay5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZzogJ+aKlei1hOaIkOWKn++8jDxhIGhyZWY9XCIvaW52ZXN0XCIgc3R5bGU9XCJjb2xvcjojMDA5YWRhO3RleHQtZGVjb3JhdGlvbjpub25lXCI+57un57ut5rWP6KeI5YW25LuW6aG555uuPC9hPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tUZXh0OiAn56Gu5a6aJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW5jZWxUZXh0OiAn6YeN5paw55m75b2VJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVyclR5cGUgPSByZXMuZXJyb3IgJiYgcmVzLmVycm9yWzBdICYmIHJlcy5lcnJvclswXS5tZXNzYWdlIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVyck1zZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUT09fQ1JPV0Q6ICfmipXotYTogIXov4flpJrmgqjooqvmjKTmjonkuobvvIzor7fngrnlh7vmipXotYTmjInpkq7ph43or5XjgIInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9W2VyclR5cGVdIHx8IGVyclR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDY2NPay5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZzogJ+aKlei1hOWksei0pe+8jCcgKyBlcnJNc2csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tUZXh0OiAn56Gu5a6aJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW5jZWxUZXh0OiAn6YeN5paw55m75b2VJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRpYWxvZycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kaWFsb2cnKS5oaWRlKCk7ICAgICAgICAgICAgICAgICAgICBcblx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHQkKCcuYWdyZWUtZXJyb3InKS5jc3MoJ3Zpc2liaWxpdHknLCd2aXNpYmxlJyk7XG5cdFx0XHRcdFx0XHQkKCcuYWdyZWUtZXJyb3InKS5odG1sKCfor7flhYjlkIzmhI/lpYfkuZDono3mipXotYTljY/orq4nKTtcblx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICBcblxuICAgIC8vIOWIneWni+WMluWAkuiuoeaXtlxuICAgIGlmIChDQy5sb2FuLnRpbWVPcGVuID4gMCkge1xuICAgICAgICB2YXIgc2VydmVyRGF0ZSA9IENDLmxvYW4uc2VydmVyRGF0ZTtcbiAgICAgICAgdmFyIGxlZnRUaW1lID0gdXRpbHMuY291bnREb3duLmdldENvdW50RG93blRpbWUyKENDLmxvYW4udGltZU9wZW4sXG4gICAgICAgICAgICBzZXJ2ZXJEYXRlKTtcbiAgICAgICAgaWYgKGxlZnRUaW1lKSB7XG4gICAgICAgICAgICB2YXIgY291bnREb3duUmFjdGl2ZSA9IG5ldyBSYWN0aXZlKHtcbiAgICAgICAgICAgICAgICBlbDogXCIubmV4dC10aW1lXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJ2NjYy9sb2FuL3BhcnRpYWxzL2NvdW50RG93bi5odG1sJyksXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBjb3VudERvd246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheXM6IGxlZnRUaW1lLmRheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzOiBsZWZ0VGltZS5ob3VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlczogbGVmdFRpbWUubWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kczogbGVmdFRpbWUuc2VjXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBpbnRlcnZhbCA9IHNldEludGVydmFsKChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VydmVyRGF0ZSArPSAxMDAwO1xuICAgICAgICAgICAgICAgIHZhciBsZWZ0VGltZSA9IHV0aWxzLmNvdW50RG93bi5nZXRDb3VudERvd25UaW1lMihcbiAgICAgICAgICAgICAgICAgICAgQ0MubG9hbi50aW1lT3Blbiwgc2VydmVyRGF0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCErKGxlZnRUaW1lLmRheSkgJiYgISsobGVmdFRpbWUuaG91cikgJiYgISsobGVmdFRpbWUubWluKSAmJiAhKyhsZWZ0VGltZS5zZWMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnREb3duUmFjdGl2ZS5zZXQoJ2NvdW50RG93bicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheXM6IGxlZnRUaW1lLmRheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzOiBsZWZ0VGltZS5ob3VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlczogbGVmdFRpbWUubWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kczogbGVmdFRpbWUuc2VjXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gcGFyc2VkYXRhKG8pIHtcbiAgICAgICAgdmFyIHR5cGUgPSB7XG4gICAgICAgICAgICAnQ0FTSCc6ICfnjrDph5HliLgnLFxuICAgICAgICAgICAgJ0lOVEVSRVNUJzogJ+WKoOaBr+WIuCcsXG4gICAgICAgICAgICAnUFJJTkNJUEFMJzogJ+WinuWAvOWIuCcsXG4gICAgICAgICAgICAnUkVCQVRFJzogJ+i/lOeOsOWIuCdcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2FudXNlID0gb1tpXS5kaXNhYmxlZDtcbiAgICAgICAgICAgIG9baV0gPSBvW2ldLnBsYWNlbWVudDtcbiAgICAgICAgICAgIGlmIChvW2ldLmNvdXBvblBhY2thZ2UudHlwZSA9PT0gJ0lOVEVSRVNUJykge1xuICAgICAgICAgICAgICAgIG9baV0uaW50ZXJlc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG9baV0uZGlzcGxheVZhbHVlID0gKHBhcnNlRmxvYXQob1tpXS5jb3Vwb25QYWNrYWdlLnBhclZhbHVlKSAvIDEwMCkudG9GaXhlZCgxKSArICclJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob1tpXS5jb3Vwb25QYWNrYWdlLnR5cGUgPT09ICdDQVNIJykge1xuICAgICAgICAgICAgICAgIG9baV0uZGlzcGxheVZhbHVlID0gcGFyc2VJbnQob1tpXS5jb3Vwb25QYWNrYWdlLnBhclZhbHVlKSArIFwi5YWDXCI7XG4gICAgICAgICAgICAgICAgb1tpXS5oaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob1tpXS5jb3Vwb25QYWNrYWdlLnR5cGUgPT09ICdQUklOQ0lQQUwnKSB7XG4gICAgICAgICAgICAgICAgb1tpXS5kaXNwbGF5VmFsdWUgPSBwYXJzZUludChvW2ldLmNvdXBvblBhY2thZ2UucGFyVmFsdWUpICsgXCLlhYNcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob1tpXS5jb3Vwb25QYWNrYWdlLnR5cGUgPT09ICdSRUJBVEUnKSB7XG4gICAgICAgICAgICAgICAgb1tpXS5kaXNwbGF5VmFsdWUgPSBwYXJzZUludChvW2ldLmNvdXBvblBhY2thZ2UucGFyVmFsdWUpICsgXCLlhYNcIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvW2ldLnZhbHVlID0gcGFyc2VJbnQob1tpXS5jb3Vwb25QYWNrYWdlLnBhclZhbHVlKTtcbiAgICAgICAgICAgIG9baV0uaWQgPSBvW2ldLmlkO1xuICAgICAgICAgICAgb1tpXS50eXBlS2V5ID0gdHlwZVtvW2ldLmNvdXBvblBhY2thZ2UudHlwZV07XG4gICAgICAgICAgICBvW2ldLm1pbmltdW1JbnZlc3QgPSBvW2ldLmNvdXBvblBhY2thZ2UubWluaW11bUludmVzdCArIFwi5YWDXCI7XG4gICAgICAgICAgICBvW2ldLmNhbnVzZSA9IGNhbnVzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbztcbiAgICB9O1xuXG5cblxuXG5cbiAgICBmdW5jdGlvbiBzaG93RXJyb3JzKGVycm9yKSB7XG4gICAgICAgIGludmVzdFJhY3RpdmVcbiAgICAgICAgICAgIC5zZXQoJ2Vycm9ycycsIHtcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1zZzogZXJyb3JcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2FibGVFcnJvcnMoKSB7XG4gICAgICAgIGludmVzdFJhY3RpdmVcbiAgICAgICAgICAgIC5zZXQoJ2Vycm9ycycsIHtcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtc2c6ICcnXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKCcuYmVuZWZpdC1jYWxjdWxhdG9yJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIENhbC5jcmVhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzaG93U2VsZWN0KGFtb3VudCkge1xuICAgICAgICAgICAgJCgnI2NvdXBvblNlbGVjdGlvbicpLnZhbCgnJyk7XG4gICAgICAgICAgICB2YXIgbW9udGhzID0gQ0MubG9hbi5kdXJhdGlvbjtcbiAgICAgICAgICAgIGludmVzdFJhY3RpdmUuc2V0KCdpbnVtJywgcGFyc2VGbG9hdChhbW91bnQpKTtcbiAgICAgICAgICAgIGRpc2FibGVFcnJvcnMoKTtcbiAgICAgICAgICAgIGxvYW5TZXJ2aWNlLmdldE15Q291cG9uKGFtb3VudCwgbW9udGhzLCBmdW5jdGlvbiAoY291cG9uKSB7XG4gICAgICAgICAgICAgICAgaWYoY291cG9uLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaW52ZXN0UmFjdGl2ZS5zZXQoJ3NlbGVjdE9wdGlvbicsIHBhcnNlZGF0YShjb3Vwb24uZGF0YSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8v5Yid5aeL5YyW6YCJ6aG5XG4gICAgc2hvd1NlbGVjdChDQy5sb2FuLnJ1bGUubWluKTtcblxuICAgIGludmVzdFJhY3RpdmUub24oJ2dldENvdXBvbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlucHV0TnVtID0gdGhpcy5nZXQoJ2lucHV0TnVtJyk7XG4gICAgICAgIHZhciBpbnVtID0gdGhpcy5nZXQoJ2ludW0nKTtcbiAgICAgICAgaWYgKHBhcnNlRmxvYXQoaW5wdXROdW0pICE9PSBwYXJzZUZsb2F0KGludW0pKSB7XG4gICAgICAgICAgIHNob3dTZWxlY3QoaW5wdXROdW0pO1xuICAgICAgICB9XG4gICAgfSk7XG59KSwgMTAwKTtcblxuXG5cblxuXG5cbiQoJy5pbnZlc3RJbnB1dCcpXG4gICAgLm9uKCdrZXl1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2hvd1NlbGVjdCgkKHRoaXMpLnZhbCgpKTtcbiAgICB9KTtcblxubG9hblNlcnZpY2UuZ2V0TG9hblByb29mKENDLmxvYW4ucmVxdWVzdElkLCBmdW5jdGlvbiAocjEpIHtcbiAgICBsb2FuU2VydmljZS5nZXRDYXJlZXJQcm9vZihDQy5sb2FuLkx1c2VySWQsIGZ1bmN0aW9uIChyMikge1xuLy9cdFx0Y29uc29sZS5sb2cocjIpO1xuLy9cdFx0Y29uc29sZS5sb2cocjEpO1xuXHRcdGZvciAodmFyIGo9MDtqPHIxLmxlbmd0aDtqKyspe1xuXHRcdFx0aWYocjFbal0ucHJvb2YucHJvb2ZUeXBlICE9PSAnJyl7XG5cdFx0XHRcdHIxW2pdLnByb29mVHlwZSA9IGkxOG4uZW51bXMuUHJvb2ZUeXBlW3IxW2pdLnByb29mLnByb29mVHlwZV1bMF07XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cjFbal0ucHJvb2ZUeXBlID0gJ+aaguaXoOiupOivgeS/oeaBryc7XG5cdFx0XHR9XG5cdFx0fVxuLy9cdFx0Y29uc29sZS5sb2cocjEpO1xuXHRcdHZhciBwcm9vZlR5cGVBcnIgPSByMi5wcm9vZnMuQ0FSRUVSO1xuXHRcdGZvcih2YXIgaT0wO2k8cHJvb2ZUeXBlQXJyLmxlbmd0aDtpKyspe1xuXHRcdFx0aWYocHJvb2ZUeXBlQXJyW2ldLnByb29mLnByb29mVHlwZSAhPT0gJycpe1xuXHRcdFx0XHRwcm9vZlR5cGVBcnJbaV0ucHJvb2ZUeXBlID0gaTE4bi5lbnVtcy5Qcm9vZlR5cGVbcHJvb2ZUeXBlQXJyW2ldLnByb29mLnByb29mVHlwZV1bMF07XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cHJvb2ZUeXBlQXJyW2ldLnByb29mVHlwZSA9ICfmmoLml6DorqTor4Hkv6Hmga8nO1xuXHRcdFx0fVxuXHRcdH07XG4vL1x0XHRjb25zb2xlLmxvZyhwcm9vZlR5cGVBcnIpO1xuXG4gICAgICAgIHZhciByZWxhdGVEYXRhUmFjdGl2ZSA9IG5ldyBSYWN0aXZlKHtcbiAgICAgICAgICAgIC8vIGluc3VyYW5jZSDmi4Xkv51cbiAgICAgICAgICAgIGVsOiBcIi5pbnN1cmFuY2Utd3JhcHBlclwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJ2NjYy9sb2FuL3BhcnRpYWxzL3JlbGF0ZURhdGFPbkRldGFpbC5odG1sJyksXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbG9hblB1cnBvc2U6IHIxLFxuICAgICAgICAgICAgICAgIGNhcmVlcjogcHJvb2ZUeXBlQXJyLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleDogMCxcblx0XHRcdFx0Y3VycmVudEluZGV4QjowLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yc01hcmdpbkxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgc3RhZ2VMZW46IDUsXG5cdFx0XHRcdFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblx0XHRcblx0XHRyZWxhdGVEYXRhUmFjdGl2ZS5vbihcInByZXYtcGljIG5leHQtcGljXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmdldChcImN1cnJlbnRJbmRleFwiKSk7XG5cdFx0XHRpZihlLm5hbWUgPT09ICdwcmV2LXBpYycpe1xuXHRcdFx0XHRzZWxmLnNldChcImN1cnJlbnRJbmRleFwiLCBzZWxmLmdldChcImN1cnJlbnRJbmRleFwiKSAtIDEpO1xuXHRcdFx0IGlmIChzZWxmLmdldCgnY3VycmVudEluZGV4JykgPCAwKSB7XG5cdFx0XHRcdFx0c2VsZi5zZXQoJ2N1cnJlbnRJbmRleCcsc2VsZi5nZXQoJ2NhcmVlcicpLmxlbmd0aCAtIDEpO1xuXHRcdFx0IFx0fSBcblx0XHRcdH1lbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldChcImN1cnJlbnRJbmRleFwiLCBzZWxmLmdldChcImN1cnJlbnRJbmRleFwiKSArIDEpO1xuXHRcdFx0XHRpZihzZWxmLmdldCgnY3VycmVudEluZGV4JykgPj0gc2VsZi5nZXQoJ2NhcmVlcicpLmxlbmd0aCl7XG5cdFx0XHRcdFx0c2VsZi5zZXQoJ2N1cnJlbnRJbmRleCcsMCk7XG5cdFx0XHRcdH1cbiAgICAgICAgICAgIH1cblx0XHRcdFxuXHRcdH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIHJlbGF0ZURhdGFSYWN0aXZlLm9uKFwicHJldi1waWNCIG5leHQtcGljQlwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5nZXQoXCJjdXJyZW50SW5kZXhCXCIpKTtcblx0XHRcdGlmKGUubmFtZSA9PT0gJ3ByZXYtcGljQicpe1xuXHRcdFx0XHRzZWxmLnNldChcImN1cnJlbnRJbmRleEJcIiwgc2VsZi5nZXQoXCJjdXJyZW50SW5kZXhCXCIpIC0gMSk7XG5cdFx0XHQgaWYgKHNlbGYuZ2V0KCdjdXJyZW50SW5kZXhCJykgPCAwKSB7XG5cdFx0XHRcdFx0c2VsZi5zZXQoJ2N1cnJlbnRJbmRleEInLHNlbGYuZ2V0KCdsb2FuUHVycG9zZScpLmxlbmd0aCAtIDEpO1xuXHRcdFx0IFx0fSBcblx0XHRcdH1lbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldChcImN1cnJlbnRJbmRleEJcIiwgc2VsZi5nZXQoXCJjdXJyZW50SW5kZXhCXCIpICsgMSk7XG5cdFx0XHRcdGlmKHNlbGYuZ2V0KCdjdXJyZW50SW5kZXhCJykgPj0gc2VsZi5nZXQoJ2xvYW5QdXJwb3NlJykubGVuZ3RoKXtcblx0XHRcdFx0XHRzZWxmLnNldCgnY3VycmVudEluZGV4QicsMCk7XG5cdFx0XHRcdH1cbiAgICAgICAgICAgIH1cblx0XHRcdFxuXHRcdH0pO1xuXHRcdFxuICAgICAgICByZWxhdGVEYXRhUmFjdGl2ZS5vbignYmVnaW4tYmlnLXBpYy1jYXJlZXInLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Y29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBOdW1iZXIoZS5rZXlwYXRoLnN1YnN0cigtMSkpO1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgaW1nczogcjIucHJvb2ZzLkNBUkVFUixcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yc01hcmdpbkxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgc3RhZ2VMZW46IDUsXG4gICAgICAgICAgICAgICAgaW1nTGVuOiByMi5wcm9vZnMuQ0FSRUVSLmxlbmd0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBvcHVwQmlnUGljLnNob3cob3B0aW9ucyk7XG4vL1x0XHRcdGNvbnNvbGUubG9nKHIyKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJlbGF0ZURhdGFSYWN0aXZlLm9uKCdiZWdpbi1iaWctcGljLWxvYW4nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Y29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBOdW1iZXIoZS5rZXlwYXRoLnN1YnN0cigtMSkpO1xuXHRcdFx0Y29uc29sZS5sb2coJyoqKioqKioqKicpO1xuXHRcdFx0Y29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgaW1nczogcjEsXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnNNYXJnaW5MZWZ0OiAwLFxuICAgICAgICAgICAgICAgIHN0YWdlTGVuOiA1LFxuICAgICAgICAgICAgICAgIGltZ0xlbjogcjEubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcG9wdXBCaWdQaWMuc2hvdyhvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuXG5cbiQoJy5uYXYtdGFicyA+IGxpJylcbiAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCgnLnRhYi1wYW5lbCcpXG4gICAgICAgICAgICAuZXEoJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5kYXRhKCdzdGVwJykpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuZnVuY3Rpb24gYWRkKCkge1xuICAgIHZhciBnZXROdW0gPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGN1bGF0b3JUZXh0XCIpLnZhbHVlKTtcbiAgICBpZiAoZ2V0TnVtID4gMCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGN1bGF0b3JUZXh0XCIpLnZhbHVlID0gZ2V0TnVtICsgMTAwO1xuICAgIH0gZWxzZSB7fVxufVxuXG52YXIgcmVjb3JkUmFjdGl2ZSA9IG5ldyBSYWN0aXZlKHtcbiAgICBlbDogJy5pbnZlc3QtcmVjb3JkJyxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnY2NjL2xvYW4vcGFydGlhbHMvcmVjb3JkLmh0bWwnKSxcbiAgICBwYWdlOiAxLFxuICAgIHBhZ2VTaXplOiA0MCxcbiAgICBhcGk6Jy9hcGkvdjIvbG9hbi8nKyBDQy5sb2FuLmlkICsgJy9pbnZlc3RzLycsXG4gICAgZGF0YToge1xuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICBsaXN0OiBbXSxcbiAgICAgICAgdG90YWxTaXplOiAwXG4gICAgfSxcbiAgICBvbmluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmQoKTtcbiAgICB9LFxuICAgIGdldFJlY29yZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBhcGkgPSBzZWxmLmFwaSArIHNlbGYucGFnZSArICcvJyArIHNlbGYucGFnZVNpemU7XG4gICAgICAgIGNvbnNvbGUubG9nKGFwaSk7XG4gICAgICAgIHJlcXVlc3QoYXBpKVxuICAgICAgICAgICAgLmdldCgnYm9keScpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0YShyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgc2V0RGF0YTogZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBjb25zb2xlLmxvZyhyKTtcbiAgICAgICAgc2VsZi5zZXQoJ2xvYWRpbmcnLCBmYWxzZSk7XG4gICAgICAgIHNlbGYuc2V0KCdsaXN0Jywgc2VsZi5wYXJzZURhdGEoci5yZXN1bHRzKSk7XG4gICAgICAgIHNlbGYuc2V0KCd0b3RhbFNpemUnLCByLnRvdGFsU2l6ZSk7XG4gICAgICAgIHNlbGYucmVuZGVyUGFnZXIoKTtcbiAgICB9LFxuICAgIHBhcnNlRGF0YTogZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbGlzdFtpXS5zdWJtaXRUaW1lID0gbW9tZW50KGxpc3RbaV0uc3VibWl0VGltZSlcbiAgICAgICAgICAgICAgICAuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XG5cbiAgICAgICAgICAgIGlmICgvXlpRSlJfLy50ZXN0KGxpc3RbaV0udXNlckxvZ2luTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBsaXN0W2ldLnVzZXJMb2dpbk5hbWUgPSBsaXN0LnVzZXJMb2dpbk5hbWUucmVwbGFjZSgnWlFKUl8nLCAn5omL5py655So5oi3Jyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpc3RbaV0udXNlckxvZ2luTmFtZS5pbmRleE9mKCfmiYvmnLrnlKjmiLcnKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBfbmFtZSA9IGxpc3RbaV0udXNlckxvZ2luTmFtZS5zdWJzdHJpbmcoNCkucmVwbGFjZSgvKFxcZHsyfSlcXGR7N30oXFxkezJ9KS8sICckMSoqKioqKiokMicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdFtpXS51c2VyTG9naW5OYW1lLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX25hbWUgPSBtYXNrKGxpc3RbaV0udXNlckxvZ2luTmFtZSwgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9uYW1lID0gbWFzayhsaXN0W2ldLnVzZXJMb2dpbk5hbWUsIDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdFtpXS51c2VyTG9naW5OYW1lID0gX25hbWU7XHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9LFxuICAgIHJlbmRlclBhZ2VyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHRvdGFsU2l6ZSA9IHNlbGYuZ2V0KCd0b3RhbFNpemUnKTtcblxuICAgICAgICBpZiAodG90YWxTaXplICE9IDApIHtcbiAgICAgICAgICAgIHNlbGYudG90YWxQYWdlID0gTWF0aC5jZWlsKHRvdGFsU2l6ZSAvIHNlbGYucGFnZVNpemUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdGFsUGFnZSA9IFtdO1xuICAgICAgICBjb25zb2xlLmxvZyhcIj09PT4+IHRvdGFsUGFnZSA9IFwiICsgc2VsZi50b3RhbFBhZ2UpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGYudG90YWxQYWdlOyBpKyspIHtcbiAgICAgICAgICAgIHRvdGFsUGFnZS5wdXNoKGkrMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXJQYWdlcih0b3RhbFBhZ2UsIHNlbGYucGFnZSk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHJlbmRlclBhZ2VyKHRvdGFsUGFnZSwgY3VycmVudCkge1xuICAgIGNvbnNvbGUubG9nKFwiPT09PnJlbmRlclwiKVxuICAgIGlmICghY3VycmVudCkge1xuICAgICAgICBjdXJyZW50ID0gMTtcbiAgICB9XG4gICB2YXIgcGFnZXJSYWN0aXZlID0gbmV3IFJhY3RpdmUoe1xuICAgICAgIGVsOiAnI3JlY29yZC1wYWdlcicsXG4gICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJ2NjYy9sb2FuL3BhcnRpYWxzL3BhZ2VyUmVjb3JkLmh0bWwnKSxcbiAgICAgICBkYXRhOiB7XG4gICAgICAgICAgIHRvdGFsUGFnZTogdG90YWxQYWdlLFxuICAgICAgICAgICBjdXJyZW50OiBjdXJyZW50XG4gICAgICAgfVxuICAgfSk7XG5cbiAgICBwYWdlclJhY3RpdmUub24oJ3ByZXZpb3VzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuZ2V0KCdjdXJyZW50Jyk7XG4gICAgICAgIGlmIChjdXJyZW50ID4gMSkge1xuICAgICAgICAgICAgY3VycmVudCAtPSAxO1xuICAgICAgICAgICAgdGhpcy5zZXQoJ2N1cnJlbnQnLCBjdXJyZW50KTtcbiAgICAgICAgICAgIHJlY29yZFJhY3RpdmUucGFnZSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICByZWNvcmRSYWN0aXZlLmdldFJlY29yZCgpO1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHBhZ2VyUmFjdGl2ZS5vbigncGFnZScsIGZ1bmN0aW9uIChlLCBwYWdlKSB7XG4gICAgICAgIGUub3JpZ2luYWwucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBwYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudCA9IGUuY29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldCgnY3VycmVudCcsIGN1cnJlbnQpO1xuICAgICAgICByZWNvcmRSYWN0aXZlLnBhZ2UgPSBjdXJyZW50O1xuICAgICAgICByZWNvcmRSYWN0aXZlLmdldFJlY29yZCgpO1xuXG4gICAgfSk7XG4gICAgcGFnZXJSYWN0aXZlLm9uKCduZXh0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5vcmlnaW5hbC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuZ2V0KCdjdXJyZW50Jyk7XG4gICAgICAgIGlmIChjdXJyZW50IDwgdGhpcy5nZXQoJ3RvdGFsUGFnZScpW3RoaXMuZ2V0KCd0b3RhbFBhZ2UnKVxuICAgICAgICAgICAgICAgIC5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgY3VycmVudCArPSAxO1xuICAgICAgICAgICAgdGhpcy5zZXQoJ2N1cnJlbnQnLCBjdXJyZW50KTtcbiAgICAgICAgICAgIHJlY29yZFJhY3RpdmUucGFnZSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICByZWNvcmRSYWN0aXZlLmdldFJlY29yZCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIG1hc2sgKHN0ciwgcywgbCkge1xuXHRpZiAoIXN0cikge1xuXHRcdHJldHVybiAnJztcblx0fVxuXHR2YXIgbGVuID0gc3RyLmxlbmd0aDtcblx0aWYgKCFsZW4pIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblx0aWYgKCFsIHx8IGwgPCAwKSB7XG5cdFx0bCA9IGxlbiA9PT0gMiA/IDEgOiBsZW4gLSAyO1xuXHR9IGVsc2UgaWYgKGwgPiBsZW4gLSAxKSB7XG5cdFx0bCA9IGxlbiAtIDE7XG5cdFx0cyA9ICEhIHMgPyAxIDogMDtcblx0fVxuXHRpZiAocyA+IGxlbikge1xuXHRcdHMgPSBsZW4gLSAxO1xuXHR9XG5cdHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgcykgKyAobmV3IEFycmF5KGwgKyAxKSlcblx0XHQuam9pbignKicpICsgc3RyLnN1YnN0cmluZyhzICsgbCk7XG5cdHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbGVuKTtcblx0cmV0dXJuIHN0cjtcbn1cblxuIiwiLyoqXG4gKiBAZmlsZSDpppbpobXmlbDmja7kuqTkupLpgLvovpFcbiAqIEBhdXRob3IgaHVpcChodWkucGVuZ0BjcmVkaXRjbG91ZC5jb20pXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmxvYW5TZXJ2aWNlID0ge1xuICAgIGdldExvYW5Qcm9vZjogZnVuY3Rpb24ocmVxdWVzdElkLG5leHQpIHtcbiAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgLmdldCgnL2FwaS92Mi9sb2FuL3JlcXVlc3QvJysgcmVxdWVzdElkICsgJy9wcm9vZnMnKVxuICAgICAgICAgICAgLmVuZCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgbmV4dChyZXMuYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldENhcmVlclByb29mOiBmdW5jdGlvbiAodXNlcklkLCBuZXh0KSB7XG4gICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgIC5nZXQoJy9hcGkvdjIvdXNlci8nICsgdXNlcklkICsgJy9jZXJ0aWZpY2F0ZXMvcHJvb2ZzJylcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIG5leHQocmVzLmJvZHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRNeUNvdXBvbjogZnVuY3Rpb24gKGFtb3VudCwgbW9udGhzLCBuZXh0KSB7XG4gICAgICAgIHZhciBzZW5kT2JqID0ge1xuICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICBtb250aHM6bW9udGhzXG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3QoJ1BPU1QnLCAnL2FwaS92Mi9jb3Vwb24vTVlTRUxGL2xpc3RDb3Vwb24nKVxuICAgICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICAgICAgICAgICAgLnNlbmQoc2VuZE9iailcbiAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpe1xuICAgICAgICAgICAgICAgIG5leHQoci5ib2R5KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbn07IiwibW9kdWxlLmV4cG9ydHMgPSAnPCEtLeWFqOWxj+Wkp+Wbvi0tPlxcbnt7I2lmIHZpc2libGV9fVxcbjxkaXYgY2xhc3M9XCJiaWctcGljLXdyYXBwZXJcIj5cXG4gICAgPGRpdiBjbGFzcz1cImltZy13cmFwcGVyXCI+XFxuXFxuICAgICAgICA8IS0t5YWz6Zet5oyJ6ZKuLS0+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2VcIiBvbi1jbGljaz1cImVuZC1iaWctcGljXCI+PC9kaXY+XFxuICAgICAgICA8cCBjbGFzcz1cImJpZy1waWMtYm94XCI+XFxuICAgICAgICA8aW1nIHNyYz1cInt7IGltZ3NbY3VycmVudEluZGV4XS51cmkgfX1cIiBhbHQ9XCJcIiBjbGFzcz1cImJpZ1wiPlxcbjwvcD5cXG4gICAgICAgIDwhLS0g5bem5Y+z5oyJ6ZKuIC0tPlxcbiAgICAgICAge3sjaWYgY3VycmVudEluZGV4ID4gMH19XFxuICAgICAgICA8YSBjbGFzcz1cInByZXYtYmlnIGNvbnRyb2xcIiBocmVmPVwiI1wiIG9uLWNsaWNrPVwicHJldi1iaWdcIiB0aXRsZT1cIuWJjeS4gOW8oFwiPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWxlZnRcIj48L3NwYW4+XFxuICAgICAgICA8L2E+XFxuICAgICAgICB7ey9pZn19IFxcblx0XHR7eyNpZiBpbWdzLmxlbmd0aC0xPmN1cnJlbnRJbmRleH19IDxhIGNsYXNzPVwibmV4dC1iaWcgY29udHJvbFwiIGhyZWY9XCIjXCIgb24tY2xpY2s9XCJuZXh0LWJpZ1wiIHRpdGxlPVwi5ZCO5LiA5bygXCI+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tcmlnaHRcIj48L3NwYW4+XFxuICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgIHt7L2lmfX0ge3sjaWYgc2hvd1RpcH19XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXR1c1wiPuW9k+WJjeesrCB7eyBjdXJyZW50SW5kZXgrMSB9fS97eyBpbWdzLmxlbmd0aCB9fSDlvKA8L2Rpdj5cXG4gICAgICAgICAgICB7ey9pZn19XFxuICAgIDwvZGl2PlxcbjwvZGl2Plxcbnt7L2lmfX1cXG4nOyIsIm1vZHVsZS5leHBvcnRzID0gJzxzcGFuIGNsYXNzPVwibmV4dC1pbnZlc3QtdGltZVwiPlxcblx0e3sjaWYgY291bnREb3duLmRheXMgIT0wIH19XFxuICAgIDxzcGFuIGNsYXNzPVwibnVtXCI+e3t7Y291bnREb3duLmRheXN9fX08L3NwYW4+5aSpXFxuICAgIHt7L2lmfX1cXG4gICAgPHNwYW4gY2xhc3M9XCJudW1cIj57e3tjb3VudERvd24uaG91cnN9fX08L3NwYW4+5pe2XFxuICAgIDxzcGFuIGNsYXNzPVwibnVtXCI+e3tjb3VudERvd24ubWludXRlc319PC9zcGFuPuWIhlxcbiAgICA8c3BhbiBjbGFzcz1cIm51bVwiPnt7Y291bnREb3duLnNlY29uZHN9fTwvc3Bhbj7np5JcXG48L3NwYW4+JzsiLCJtb2R1bGUuZXhwb3J0cyA9ICc8IS0te3tKU09OLnN0cmluZ2lmeShsb2FuKX19LS0+XFxue3t0aW1lT3Blbn19IHt7I2lmIGxvYW4uc3RhdHVzID09IFwiRklOSVNIRURcInx8bG9hbi5zdGF0dXMgPT0gXCJTRVRUTEVEXCJ8fGxvYW4uc3RhdHVzID09IFwiQ0xFQVJFRFwifX1cXG48ZGl2IGNsYXNzPVwiZmlyc3RMaW5lXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJ0aXBcIj7mipXotYTph5Hpop0gPC9kaXY+XFxuPCEtLSAgICA8ZGl2IGNsYXNzPVwidGlwXCI+e3tsb2FuLnJ1bGUubWlufX3lhYPotbfmipUgPC9kaXY+LS0+XFxuPCEtLSAgICA8ZGl2IGNsYXNzPVwiaGlnaEFtb3VudFwiPuacgOmrmOaKlei1hOmZkOmine+8mnt7bG9hbi5ydWxlLm1heH195YWDPC9kaXY+LS0+XFxuPCEtLSAgICA8ZGl2IGNsYXNzPVwiaGlnaEFtb3VudFwiPuWPr+aKlcKlMC4wMOWFgzwvZGl2Pi0tPlxcbjwvZGl2PlxcbjxwIGNsYXNzPVwiZmluaXNoZWQtbW9uZXlcIj7lj6/mipXph5Hpop0mbmJzcDsmbmJzcDsmbmJzcDs8c3BhbiBzdHlsZT1cImNvbG9yOiNmZjcyMDA7Zm9udC1zaXplOjIwcHg7XCI+MC4wMDwvc3Bhbj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToxNHB4O1wiPuWFgzwvc3Bhbj48L3A+XFxuPHAgY2xhc3M9XCJmaW5pc2hlZC1tb25leVwiPuWJqeS9meaXtumXtCZuYnNwOyZuYnNwOyZuYnNwOzxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE0cHg7XCI+5bey5a6M5oiQPC9zcGFuPjwvcD5cXG48cCBjbGFzcz1cImZpbmlzaGVkLW1vbmV5XCI+5Y+v55So5L2Z6aKdJm5ic3A7Jm5ic3A7Jm5ic3A7PHNwYW4gc3R5bGU9XCJmb250LXNpemU6MTRweDtcIj57eyNpZiB1c2VyLmF2YWlsYWJsZUFtb3VudH19e3t1c2VyLmF2YWlsYWJsZUFtb3VudH19e3tlbHNlfX0we3svaWZ9feWFgzwvc3Bhbj48L3A+XFxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS04XCIgc3R5bGU9XCJ3aWR0aDozMDBweDtwYWRkaW5nOjA7bWFyZ2luLWxlZnQ6MjRweDtsaW5lLWhlaWdodDozOHB4O3RleHQtYWxpZ246cmlnaHQ7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6I2VlZTtcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGNvbC1zbS04IGZvcm1faW5wdXQgbG9hbm1vbmV5XCIge3sjaWYgbG9hbi5zdGF0dXMgPT0gXCJGSU5JU0hFRFwifHxsb2FuLnN0YXR1cyA9PSBcIlNFVFRMRURcIiB8fCBsb2FuLnN0YXR1cyA9PSBcIkNMRUFSRURcIiB9fSBkaXNhYmxlZHt7L2lmfX0gcGxhY2Vob2xkZXI9XCLor7fovpPlhaXmipXotYTph5Hpop1cIiAgc3R5bGU9XCJ3aWR0aDoyNzRweDtib3JkZXI6IDA7Ym9yZGVyLXJhZGl1czogMDtib3gtc2hhZG93Om5vbmU7dGV4dC1hbGlnbjpsZWZ0O2hlaWdodDozOHB4O1wiLz48c3Bhbj7lhYMmbmJzcDsmbmJzcDs8L3NwYW4+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbjxwIGNsYXNzPVwiZmluaXNoZWQtbW9uZXlcIj7pooTmnJ/mlLbnm4ombmJzcDsmbmJzcDsmbmJzcDs8c3BhbiBzdHlsZT1cImNvbG9yOiNmZjcyMDA7XCI+MC4wMDwvc3Bhbj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToxNHB4O1wiPuWFgzwvc3Bhbj48L3A+XFxue3sjaWYgbG9hbi5zdGF0dXMgPT0gXCJGSU5JU0hFRFwifX1cXG48YnV0dG9uIGNsYXNzPVwiZmluaXNoZWQtYnRuXCI+5bey5ruh5qCHPC9idXR0b24+e3svaWZ9fXt7I2lmIGxvYW4uc3RhdHVzID09IFwiU0VUVExFRFwifX1cXG48YnV0dG9uIGNsYXNzPVwiZmluaXNoZWQtYnRuXCI+6L+Y5qy+5LitPC9idXR0b24+e3svaWZ9fXt7I2lmIGxvYW4uc3RhdHVzID09IFwiQ0xFQVJFRFwifX1cXG48YnV0dG9uIGNsYXNzPVwiZmluaXNoZWQtYnRuXCI+6L+Y5qy+57uT5p2fPC9idXR0b24+e3svaWZ9fVxcbjwhLS08YnV0dG9uIGNsYXNzPVwiZmluaXNoZWQtYnRuXCI+6L+Y5qy+57uT5p2fPC9idXR0b24+LS0+XFxuPCEtLTxpbWcgc3JjPVwiL2NjYy9sb2FuL2ltZy9mdWxsLnBuZ1wiIGNsYXNzPVwiZmluaXNoQmxvY2tcIj4gLS0+XFxue3svaWZ9fSBcXG4ge3sjaWYgbG9hbi5zdGF0dXMgPT0gXCJBUkNISVZFRFwiIH19XFxuPGRpdiBjbGFzcz1cImZpcnN0TGluZVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwidGlwXCI+e3tsb2FuLnJ1bGUubWlufX3lhYPotbfmipUgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJoaWdoQW1vdW50XCI+5pyA6auY5oqV6LWE6ZmQ6aKd77yae3tsb2FuLnJ1bGUubWF4fX3lhYM8L2Rpdj5cXG48L2Rpdj5cXG48aW1nIHNyYz1cIi9jY2MvbG9hbi9pbWcvb3Zlci5wbmdcIiBjbGFzcz1cImNsZWFyZWRcIj4gXFxue3svaWZ9fSAgXFxue3sjaWYgbG9hbi5zdGF0dXMgPT0gXCJTQ0hFRFVMRURcIiB9fVxcbjxkaXYgY2xhc3M9XCJzdGF0dXNcIj5cXG4gICAgPGRpdiBjbGFzcz1cImluZm9cIj5cXG5cdFx0IDxkaXYgY2xhc3M9XCJsZWZ0TW9uZXlcIj5cXG5cdFx0XHQ8aDEgY2xhc3M9XCJyZWRcIj4g6LSm5oi35L2Z6aKd77yawqU8c3BhbiBjbGFzcz1cImxlZnQtbW9uZXlcIj5cXG5cdFx0XHRcdHt7I2lmIHVzZXIuYXZhaWxhYmxlQW1vdW50fX1cXG5cdFx0XHRcdHt7I2lmIHVzZXIuYXZhaWxhYmxlQW1vdW50Lmxlbmd0aD44fX1cXG5cdFx0XHRcdFx0e3t1c2VyLmF2YWlsYWJsZUFtb3VudC5zdWJzdHIoMCw1KX19Li4uXFxuICAgICAgICAgICAgICAgIHt7ZWxzZX19XFxuICAgICAgICAgICAgICAgICAgICB7e3VzZXIuYXZhaWxhYmxlQW1vdW50fX1cXG5cdFx0XHRcdHt7L2lmfX1cXG5cdFx0XHRcdHt7ZWxzZX19MHt7L2lmfX1cXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcblx0XHRcdCA8L2gxPlxcbiAgICAgICAgIFx0PGEgaHJlZj1cIi9uZXdBY2NvdW50L3JlY2hhcmdlXCIgY2xhc3M9XCJyZWNoYXJnZVwiPuWFheWAvDwvYT5cXG4gICAgICAgICA8L2Rpdj5cXG48IS0tXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlyc3RMaW5lXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpcFwiPnt7bG9hbi5ydWxlLm1pbn195YWD6LW35oqVIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWdoQW1vdW50XCI+5pyA6auY5oqV6LWE6ZmQ6aKd77yae3tsb2FuLnJ1bGUubWF4fX3lhYM8L2Rpdj5cXG5cdFx0XHRcXG4gICAgICAgIDwvZGl2Plxcbi0tPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cInVzZXJCbG9ja1wiIGlkPVwidXNlckJsb2NrXCI+XFxuICAgICAgICAgICBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXRcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGN1bGF0b3JCb3ggY2FsY3VsYXRvckJveDFcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxjdWxhdG9yXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLW1pbnVzXCIgc3R5bGU9XCJ0b3A6MDtcIiBvbi1jbGljaz1cInJlZHVjZVwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJsb2FuSWRcIiB2YWx1ZT1cInt7bG9hbi5pZH19XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwie3tsb2FuLnJ1bGUubWlufX1cIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwie3sgaW5wdXROdW0gfX1cIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1wiIHN0eWxlPVwidG9wOjA7XCIgb24tY2xpY2s9XCJhZGRcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG5cdFx0XHRcdFx0IDxzcGFuIGNsYXNzPVwidG9wQW1vdW50XCIgb24tY2xpY2s9XCJtYXhOdW1iZXJcIj7mnIDlpKflj6/mipXph5Hpop08L3NwYW4+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbjwhLS0gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0b3RhbEludGVyZXN0XCI+6aKE5Lyw5oC75pS255uKIHt7KGxvYW4udG90YWxJbnRlcmVzdCAqIChpbnVtfHwwKSAvIGxvYW4ub3JpZ2luYWxBbW91bnQpLnRvRml4ZWQoMil9feWFgzwvcD4tLT5cXG5cdFx0XHRcdDxwIGNsYXNzPVwicnVsZS1tYXhcIj7ljZXnrJTmnIDlpJrlj6/mipXvvJp7e2xvYW4ucnVsZS5tYXh9feWFgzwvcD5cXG4gICAgICAgICAgICAgICAge3sjaWYgdXNlcn19XFxuICAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiZmluaXNoZWQtYnRuXCIgdmFsdWU9XCLljbPlsIblvIDlp4tcIiAvPlxcbiAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICB7e2Vsc2V9fVxcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2xvZ2luXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nIGludmVzdC1idXR0b25cIiB2YWx1ZT1cIueri+WNs+eZu+W9lVwiIC8+XFxuICAgICAgICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgICAgICAge3svaWZ9fVxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnZlc3RidG5cIiBkYXRhLWlkPVwie3sgbG9hbi5pZCB9fVwiIGRhdGEtc3RhdHVzPVwie3sgbG9hbi5zdGF0dXMgfX1cIiBkYXRhLW9wZW49XCJ7eyBsb2FuLnRpbWVPcGVuIH19XCIgZGF0YS1zZXJ2PVwie3tzZXJ2ZXJEYXRlfX1cIiBzdHlsZT1cImNvbG9yOiBibGFjazt3aWR0aDogMTU1cHg7dGV4dC1hbGlnbjogY2VudGVyO2JhY2tncm91bmQ6I2ZmZjttYXJnaW4tbGVmdDotMjVweFwiPjwvZGl2PlxcblxcbiAgICAgICAgICAgIDxwIGNsYXNzPVwibGVmdC10aW1lLXN0YXJ0XCI+6Led56a75byA5qCH5pe26Ze06L+Y5pyJeHjlsI/ml7Z4eOWIhnh456eSPC9wPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbjwvZGl2Plxcbnt7L2lmfX0gXFxuXFxue3sjaWYgbG9hbi5zdGF0dXMgPT0gXCJPUEVORURcIn19XFxuPGRpdiBjbGFzcz1cInN0YXR1c1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiaW5mb1wiPlxcbiAgICAgIFxcbiAgICAgICAgPGRpdiBjbGFzcz1cInVzZXJCbG9ja1wiIGlkPVwidXNlckJsb2NrXCI+XFxuICAgICAgICAgICAge3sjaWYgdXNlcn19IHt7ISDlt7LnmbvlvZUs5L2G5piv5rKh5byA56ys5LiJ5pa55pSv5LuYIH19IFxcblx0XHRcdHt7I2lmICFuYW1lfX1cXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdE1vbmV5LW9wZW5cIj7otKbmiLfkvZnpop3vvJrCpSZuYnNwOzxpIGNsYXNzPVwicmVkXCI+e3t1c2VyLmF2YWlsYWJsZUFtb3VudH19PC9pPlxcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL25ld0FjY291bnQvcmVjaGFyZ2VcIiBjbGFzcz1cInJlY2hhcmdlXCI+PGJ1dHRvbj7lhYXlgLw8L2J1dHRvbj48L2E+XFxuICAgICAgICAgICAgPC9kaXY+XFxuXHRcdFx0PGRpdiBjbGFzcz1cImNhbGN1bGF0b3JCb3hcIj5cXG5cdFx0XHQgPGRpdiBjbGFzcz1cImNhbGN1bGF0b3JcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLW1pbnVzXCIgc3R5bGU9XCJ0b3A6MDtcIiBvbi1jbGljaz1cInJlZHVjZVwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwibG9hbklkXCIgdmFsdWU9XCJ7e2xvYW4uaWR9fVwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJ7e2xvYW4ucnVsZS5taW59fVwiICBuYW1lPVwiYW1vdW50XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cInt7IGlucHV0TnVtIH19XCIgb24tYmx1cj1cImdldENvdXBvblwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgc3R5bGU9XCJ0b3A6MDtcIiBvbi1jbGljaz1cImFkZFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG5cdFx0XHRcdCA8c3BhbiBjbGFzcz1cInRvcEFtb3VudFwiIG9uLWNsaWNrPVwibWF4TnVtYmVyXCI+5pyA5aSn5Y+v5oqV6YeR6aKdPC9zcGFuPlxcblx0XHRcdDwvZGl2Plxcblx0XHRcdDxwIGNsYXNzPVwib25lLXRpbWUtbWF4XCI+5Y2V56yU5pyA5aSa5Y+v5oqV77yae3tsb2FuLnJ1bGUubWF4fX3lhYM8L3A+XFxuICAgICAgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvbXB0LW9wZW4tM3JkcGF5XCI+XFxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic2hpbWluZ1wiPuaCqOeahOi0puaIt+WwmuacquWunuWQjeiupOivge+8jOiupOivgeWQjuWPr+aKlei1hDwvcD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW52ZXN0LWJ1dHRvbi13cmFwcGVyXCI+XFxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nIG9wZW4tYnV0dG9uXCIgIGhyZWY9XCIvbmV3QWNjb3VudC9zZXR0aW5ncy9hdXRoZW50aWNhdGlvblwiPueri+WNs+iupOivgTwvYT5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICB7e2Vsc2V9fSB7eyEg5bey55m75b2VIH19IHt7ISDmnKrnrb7orqLml6Dlr4bmipXotYR9fVxcblxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0TW9uZXktb3BlblwiPui0puaIt+S9memine+8msKlJm5ic3A7PGkgY2xhc3M9XCJyZWRcIj57e3VzZXIuYXZhaWxhYmxlQW1vdW50fX08L2k+XFxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvbmV3QWNjb3VudC9yZWNoYXJnZVwiIGNsYXNzPVwicmVjaGFyZ2VcIj48YnV0dG9uPuWFheWAvDwvYnV0dG9uPjwvYT5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXRcIj5cXG4gICAgICAgICAgICAgICAgPGZvcm0gYWN0aW9uPVwiL2xpYW5saWFucGF5L3RlbmRlclwiIG5hbWU9XCJpbnZlc3RGb3JtXCIgbWV0aG9kPVwiUE9TVFwiIGNsYXNzPVwiaW52ZXN0LWZvcm1cIiB0YXJnZXQ9XCJfYmxhbmtcIiBvbi1zdWJtaXQ9XCJpbnZlc3Qtc3VibWl0XCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsY3VsYXRvckJveFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxjdWxhdG9yXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1taW51c1wiIHN0eWxlPVwidG9wOjA7XCIgb24tY2xpY2s9XCJyZWR1Y2VcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImxvYW5JZFwiIHZhbHVlPVwie3tsb2FuLmlkfX1cIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwie3tsb2FuLnJ1bGUubWlufX1cIiAgbmFtZT1cImFtb3VudFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJ7eyBpbnB1dE51bSB9fVwiIG9uLWJsdXI9XCJnZXRDb3Vwb25cIiBhdXRvY29tcGxldGU9XCJvZmZcIi8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgc3R5bGU9XCJ0b3A6MDtcIiBvbi1jbGljaz1cImFkZFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvcEFtb3VudFwiIG9uLWNsaWNrPVwibWF4TnVtYmVyXCI+5pyA5aSn5Y+v5oqV6YeR6aKdPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicC1tYXhcIj7ljZXnrJTmnIDlpJrlj6/mipXvvJp7e2xvYW4ucnVsZS5tYXh9feWFgzwvcD5cXG5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RPcHRpb25cIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJwbGFjZW1lbnRJZFwiIGlkPVwiY291cG9uU2VsZWN0aW9uXCIgdmFsdWU9XCJ7e2NvdXBvbn19XCI+ICAgICAgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sjaWYgc2VsZWN0T3B0aW9ufX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj7or7fpgInmi6nlj6/nlKjnmoTnuqLljIU8L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7I2VhY2ggc2VsZWN0T3B0aW9ufX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyNpZiAhaGlkZSYmIWNhbnVzZX19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ7eyBpZCB9fVwiIHt7I2lmIGNhbnVzZX19ZGlzYWJsZWR7ey9pZn19Pnt7IGRpc3BsYXlWYWx1ZSB9fXt7IHR5cGVLZXkgfX0gLSDmnIDkvY7mipXotYTpop3vvJp7eyBtaW5pbXVtSW52ZXN0IH19PC9vcHRpb24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3svaWZ9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3svZWFjaH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ZWxzZX19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+5pqC5peg5Y+v55So5Yi4PC9vcHRpb24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7L2lmfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Plxcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYXNzd29yZC1ib3hcIj5cXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhc3N3b3JkXCI+XFxuICAgICAgICAgICAgICAgICAgICBcdDxpbnB1dCBjbGFzcz1cInRyYWRlLXBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXkuqTmmJPlr4bnoIFcIiBuYW1lPVwicGF5bWVudFBhc3N3b3JkXCIgdmFsdWU9XCJ7e3BheW1lbnRQYXNzd29yZH19XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIvPlxcblx0XHRcdFx0XHQ8L2Rpdj5cXG5cdFx0XHRcdFx0XHQ8cD48YSBocmVmPVwiL25ld0FjY291bnQvc2V0dGluZ3MvcGFzc3dvcmRcIiBzdHlsZT1cImZvbnQtc2l6ZToxNHB4XCI+5b+Y6K6w5Lqk5piT5a+G56CB77yfPC9hPjwvcD5cXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cImRpc3BsYXk6bm9uZVwiIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5Lqk5piT5a+G56CBXCIgLz4gICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nIGludmVzdC1idXR0b25cIiB2YWx1ZT1cIuehruiupOaKlei1hFwiIC8+XFxuXHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJhZ3JlZS1ib3hcIj5cXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImFncmVlXCIgY2hlY2tlZCBpZD1cImFncmVlXCIvPlxcblx0XHRcdFx0XHRcdFx0PHNwYW4+5oiR5ZCM5oSPXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sjaWYgbG9hbi5wcm9kdWN0S2V5PT09XCJMVEJcIn19XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2FncmVlbWVudC9tb2JpbGUvcHJvdG9jb2xsdGJcIiB0YXJnZXQ9XCJfYmxhbmtcIj7jgIrkuZDmipXkv53mipXotYTmnI3liqHljY/orq7jgIs8L2E+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2Vsc2VpZiBsb2FuLnByb2R1Y3RLZXk9PT1cIkxYWVwifX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2FncmVlbWVudC9tb2JpbGUvcHJvdG9jb2xseHlcIiB0YXJnZXQ9XCJfYmxhbmtcIj7jgIrkuZDkuqvnm4jmipXotYTmnI3liqHljY/orq7jgIs8L2E+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tlbHNlfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2FncmVlbWVudC9tb2JpbGUvcHJvdG9jb2xcIiB0YXJnZXQ9XCJfYmxhbmtcIj7jgIrnlKjmiLfmipXotYTmnI3liqHljY/orq7jgIs8L2E+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3svaWZ9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XFxuXHRcdFx0XHRcdFx0PC9wPlxcblx0XHRcdFx0XHRcdDxwIGNsYXNzPVwiYWdyZWUtZXJyb3JcIj48L3A+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gIFxcbiAgICAgICAgICAgICAgICAgICAge3sjaWYgZXJyb3JzLnZpc2libGV9fVxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXBcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1leGNsYW1hdGlvbi1zaWduIGljb25cIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPnt7IGVycm9ycy5tc2cgfX08L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIHt7L2lmfX1cXG4gICAgICAgICAgICAgICAgPC9mb3JtPlxcbiAgICAgICAgICAgIDwvZGl2PlxcblxcbiAgICAgICAgICAgIHt7L2lmfX0ge3tlbHNlfX1cXG5cdFx0XHRcXG5cdFx0XHQ8cCBjbGFzcz1cImxlZnQtbW9uZXkgbG9naW4tc2VlXCI+XFxuICAgICAgICAgICAgICAgIOi0puaIt+S9memine+8mjxhIGhyZWY9XCIvbG9naW5cIiBzdHlsZT1cImNvbG9yOiMwMDlhZGE7XCI+55m75b2VPC9hPiDlkI7lj6/op4FcXG4gICAgICAgICAgICA8L3A+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpcnN0TGluZVwiIHN0eWxlPVwicGFkZGluZzowcHg7XCI+XFxuPCEtLVxcblx0XHRcdFx0PGRpdiBjbGFzcz1cInRpcFwiPnt7bG9hbi5ydWxlLm1pbn195YWD6LW35oqVIDwvZGl2Plxcblx0XHRcdFx0PGRpdiBjbGFzcz1cImhpZ2hBbW91bnRcIj7mnIDpq5jmipXotYTpmZDpop3vvJp7e2xvYW4ucnVsZS5tYXh9feWFgzwvZGl2Plxcbi0tPlxcbiAgICAgICAgXHQ8L2Rpdj5cXG4gICAgICAgICAgICBcXG5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsY3VsYXRvckJveFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsY3VsYXRvclwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLW1pbnVzXCIgc3R5bGU9XCJwYWRkaW5nOjA7bWFyZ2luOjA7dG9wOjA7XCIgb24tY2xpY2s9XCJyZWR1Y2VcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJ7e2xvYW4ucnVsZS5taW59fVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJ7eyBpbnB1dE51bSB9fVwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIiBzdHlsZT1cInRvcDowO1wiIG9uLWNsaWNrPVwiYWRkXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b3BBbW91bnRcIiBvbi1jbGljaz1cIlwiPuacgOWkp+WPr+aKlemHkeminTwvc3Bhbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG5cdFx0XHQ8cCBjbGFzcz1cIm9uZS10aW1lLW1heFwiPuWNleeslOacgOWkmuWPr+aKle+8mnt7bG9hbi5ydWxlLm1heH195YWDPC9wPlxcbjwhLS0gICAgICAgICAgICA8cCBjbGFzcz1cInRvdGFsSW50ZXJlc3RcIj7pooTkvLDmgLvmlLbnm4oge3sobG9hbi50b3RhbEludGVyZXN0ICogKGludW18fDApIC8gbG9hbi5vcmlnaW5hbEFtb3VudCkudG9GaXhlZCgyKX195YWDPC9wPi0tPlxcblxcbiAgICAgICAgICAgIDxhIGhyZWY9XCIvbG9naW4/dXJsPXt7YmFja1VybH19XCIgY2xhc3M9XCJsb2dpbkJ0blwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDnq4vljbPnmbvlvZVcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+IHt7L2lmfX1cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cXG57ey9pZn19XFxuJzsiLCJtb2R1bGUuZXhwb3J0cyA9ICd7eyMgdG90YWxQYWdlLmxlbmd0aCB9fVxcbjx1bCBjbGFzcz1cImludmVzdC1wYWdlclwiPlxcbiAgIDwhLS0gPGxpIGNsYXNzPVwicGFnZS1maXJzdFwiPlxcbiAgICAgICA8YSBocmVmPVwiXCIgb24tY2xpY2s9XCJwYWdlOjFcIj7pppbpobU8L2E+XFxuICAgPC9saT4gLS0+XFxuICAgIDxsaSBjbGFzcz1cInBhZ2UtcHJldlwiPjxhIGhyZWY9XCIjXCIgb24tY2xpY2s9XCJwcmV2aW91c1wiPuS4iuS4gOmhtTwvYT5cXG4gICAgPC9saT5cXG4gICAge3sjZWFjaCB0b3RhbFBhZ2V9fSAgICBcXG4gICAgICAgIDxsaSBjbGFzcz1cInt7I2lmIGN1cnJlbnQgPT0gdG90YWxQYWdlW0BrZXldfX0gY3VycmVudC1wYWdlIHt7L2lmfX1cIj48YSBocmVmPVwiI1wiICBvbi1jbGljaz1cInBhZ2U6e3t0aGlzfX1cIj57e3RvdGFsUGFnZVtAa2V5XX19PC9hPjwvbGk+ICAgICAgICBcXG4gICAge3svZWFjaH19XFxuICAgIDxsaSBjbGFzcz1cInBhZ2UtbmV4dFwiPjxhIGhyZWY9XCIjXCIgb24tY2xpY2s9XCJuZXh0XCI+5LiL5LiA6aG1PC9hPlxcbiAgICA8L2xpPlxcbiAgICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj5cXG48L3VsPlxcbnt7L2lmfX1cXG48ZGl2IHN0eWxlPVwiaGVpZ2h0OjIwcHg7XCI+PC9kaXY+JzsiLCJtb2R1bGUuZXhwb3J0cyA9ICd7eyNpZiBsb2FkaW5nfX1cXG4gICAgICA8ZGl2PuWKoOi9veS4rS4uPC9kaXY+XFxue3tlbHNlfX1cXG4gICA8dGFibGUgY2xhc3M9XCJ0YWJsZSByZXBheS1wbGFuIHJlcGF5LXJlY29yZFwiPlxcbiAgICAgICAgPHRoZWFkPlxcbiAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPVwiYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1wiPuaKleagh+S6ujwvdGg+XFxuICAgICAgICAgICAgICAgIDx0aD7mipXmoIfph5Hpop0o5YWDKTwvdGg+XFxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT1cImJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XCI+5oqV5qCH5pe26Ze0PC90aD5cXG4gICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgPC90aGVhZD5cXG4gICAgICAgIHt7I2xpc3R9fVxcbiAgICAgICAgPHRyPlxcbiAgICAgICAgICAgIDx0aCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtmb250LXNpemU6IDE0cHg7bGluZS1oZWlnaHQ6IDYwcHg7Y29sb3I6ICM2NjY7Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XCI+e3t1c2VyTG9naW5OYW1lfX08L3RoPlxcbiAgICAgICAgICAgIDx0aCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtmb250LXNpemU6IDE0cHg7bGluZS1oZWlnaHQ6IDYwcHg7Y29sb3I6ICM2NjY7Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XCI+e3thbW91bnR9fTwvdGg+XFxuICAgICAgICAgICAgPHRoIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO2ZvbnQtc2l6ZTogMTRweDtsaW5lLWhlaWdodDogNjBweDtjb2xvcjogIzY2Njtib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcIj57e3N1Ym1pdFRpbWV9fTwvdGg+XFxuICAgICAgICA8L3RyPlxcbiAgICAgICAge3svbGlzdH19XFxuICAgIDwvdGFibGU+XFxue3svaWZ9fSc7IiwibW9kdWxlLmV4cG9ydHMgPSAnPHAgY2xhc3M9XCJjb250cm9sZXItdGl0bGVcIj7kvIHkuJrorqTor4Hlm77niYc8L3A+XFxue3sjaWYgY2FyZWVyLmxlbmd0aH19XFxuPGRpdiBjbGFzcz1cImNvbnRyb2xlclwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6MTBweDttYXJnaW4tcmlnaHQ6MTBweFwiPlxcbiAgICA8ZGl2IGlkPVwiY2Fyb3VzZWwtY29tLWNhcmVlclwiIGNsYXNzPVwiY2Fyb3VzZWwgc2xpZGUgbGktY29udGVudFwiIGRhdGEtcmlkZT1cImNhcm91c2VsXCIgZGF0YS1pbnRlcnZhbD1cIjUwMDBcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiIHJvbGU9XCJsaXN0Ym94XCI+XFxuICAgICAgICAgICAge3sjY2FyZWVyfX1cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbSBpdGVtLXBpYyB7eyNpZiBAaW5kZXg9PT0wfX0gYWN0aXZlIHt7L2lmfX1cIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6dXJsKHt7dXJpfX0pO1wiIG9uLWNsaWNrPVwiYmVnaW4tYmlnLXBpYy1jYXJlZXJcIiB0aXRsZT1cIuiupOivgeexu+Wei++8mnt7cHJvb2ZUeXBlfX1cIj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICB7ey9jYXJlZXJ9fVxcbjwhLS1cXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicHJvb2ZcIj5cXG5cdFx0XHRcdDxsYWJsZSBzdHlsZT1cImNvbG9yOiM5OTk7XCI+6K6k6K+B57G75Z6L77yaPC9sYWJsZT5cXG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwie3tjYXJlZXJbY3VycmVudEluZGV4XS5wcm9vZlR5cGV9fVwiIGRpc2FibGVkIHN0eWxlPVwiYm9yZGVyOjFweCBzb2xpZCAjOTk5O3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiM5OTk7XCIvPlxcblx0XHRcdDwvZGl2Plxcbi0tPlxcbiAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICA8YSBjbGFzcz1cImxlZnQgY2Fyb3VzZWwtY29udHJvbFwiIGhyZWY9XCIjY2Fyb3VzZWwtY29tLWNhcmVlclwiIHJvbGU9XCJidXR0b25cIiBkYXRhLXNsaWRlPVwicHJldlwiIHN0eWxlPVwid2lkdGg6MTAlO1wiIG9uLWNsaWNrPVwicHJldi1waWNcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1sZWZ0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPlByZXZpb3VzPC9zcGFuPlxcbiAgICAgICAgPC9hPlxcbiAgICAgICAgPGEgY2xhc3M9XCJyaWdodCBjYXJvdXNlbC1jb250cm9sXCIgaHJlZj1cIiNjYXJvdXNlbC1jb20tY2FyZWVyXCIgcm9sZT1cImJ1dHRvblwiIGRhdGEtc2xpZGU9XCJuZXh0XCIgc3R5bGU9XCJ3aWR0aDoxMCU7XCIgb24tY2xpY2s9XCJuZXh0LXBpY1wiPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPk5leHQ8L3NwYW4+XFxuICAgICAgICA8L2E+XFxuICAgIDwvZGl2PlxcbjwvZGl2Plxcblxcbnt7IGVsc2UgfX1cXG48ZGl2IGNsYXNzPVwibm8tcGljc1wiPlxcbiAgICDmmoLml6Dnm7jlhbPotYTmlplcXG48L2Rpdj5cXG57ey9pZn19XFxuXFxuPHAgY2xhc3M9XCJjb250cm9sZXItdGl0bGVcIj7po47mjqforqTor4Hlm77niYc8L3A+XFxue3sjaWYgbG9hblB1cnBvc2UubGVuZ3RofX1cXG48ZGl2IGNsYXNzPVwiY29udHJvbGVyXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDoxMHB4O21hcmdpbi1yaWdodDoxMHB4XCI+XFxuICAgIDxkaXYgaWQ9XCJjYXJvdXNlbC1jb20tbG9hblwiIGNsYXNzPVwiY2Fyb3VzZWwgc2xpZGUgbGktY29udGVudFwiIGRhdGEtcmlkZT1cImNhcm91c2VsXCIgZGF0YS1pbnRlcnZhbD1cIjUwMDBcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiIHJvbGU9XCJsaXN0Ym94XCI+XFxuICAgICAgICAgICAge3sjbG9hblB1cnBvc2V9fVxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtIGl0ZW0tcGljIHt7I2lmIEBpbmRleD09PTB9fSBhY3RpdmUge3svaWZ9fVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTp1cmwoe3t1cml9fSk7XCIgb24tY2xpY2s9XCJiZWdpbi1iaWctcGljLWxvYW5cIiB0aXRsZT1cIuiupOivgeexu+Wei++8mnt7cHJvb2ZUeXBlfX1cIj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICB7ey9sb2FuUHVycG9zZX19IFxcbiAgICAgICAgPC9kaXY+XFxuPCEtLVxcblx0XHQ8ZGl2IGNsYXNzPVwicHJvb2ZcIj5cXG5cdFx0XHQ8bGFibGUgc3R5bGU9XCJjb2xvcjojOTk5O1wiPuiupOivgeexu+Wei++8mjwvbGFibGU+XFxuXHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJ7e2xvYW5QdXJwb3NlW2N1cnJlbnRJbmRleEJdLnByb29mVHlwZX19XCIgZGlzYWJsZWQgc3R5bGU9XCJib3JkZXI6MXB4IHNvbGlkICM5OTk7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6Izk5OTtcIi8+XFxuXHRcdDwvZGl2Plxcbi0tPlxcbiAgICAgICAgPGEgY2xhc3M9XCJsZWZ0IGNhcm91c2VsLWNvbnRyb2xcIiBocmVmPVwiI2Nhcm91c2VsLWNvbS1sb2FuXCIgcm9sZT1cImJ1dHRvblwiIGRhdGEtc2xpZGU9XCJwcmV2XCIgc3R5bGU9XCJ3aWR0aDoxMCU7XCIgb24tY2xpY2s9XCJwcmV2LXBpY0JcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1sZWZ0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPlByZXZpb3VzPC9zcGFuPlxcbiAgICAgICAgPC9hPlxcbiAgICAgICAgPGEgY2xhc3M9XCJyaWdodCBjYXJvdXNlbC1jb250cm9sXCIgaHJlZj1cIiNjYXJvdXNlbC1jb20tbG9hblwiIHJvbGU9XCJidXR0b25cIiBkYXRhLXNsaWRlPVwibmV4dFwiIHN0eWxlPVwid2lkdGg6MTAlO1wiIG9uLWNsaWNrPVwibmV4dC1waWNCXCI+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tcmlnaHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+TmV4dDwvc3Bhbj5cXG4gICAgICAgIDwvYT5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XFxuXFxue3sgZWxzZSB9fVxcbjxkaXYgY2xhc3M9XCJuby1waWNzXCI+XFxuICAgIOaaguaXoOebuOWFs+i1hOaWmVxcbjwvZGl2Plxcbnt7L2lmfX0nOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xucmVxdWlyZSgnbW9tZW50L2xvY2FsZS96aC1jbicpO1xudmFyIGkxOG4gPSByZXF1aXJlKCdAZHMvaTE4bicpWyd6aC1jbiddLmVudW1zO1xuXG5leHBvcnRzLm1hc2sgPSBtYXNrO1xuXG5mdW5jdGlvbiBtYXNrKHN0ciwgcywgbCkge1xuICAgIGlmICghc3RyKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIGxlbiA9IHN0ci5sZW5ndGg7XG4gICAgaWYgKCFsZW4pIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoIWwgfHwgbCA8IDApIHtcbiAgICAgICAgbCA9IGxlbiA9PT0gMiA/IDEgOiBsZW4gLSAyO1xuICAgICAgICBzID0gcyB8fCAxO1xuICAgIH0gZWxzZSBpZiAobCA+IGxlbiAtIDEpIHtcbiAgICAgICAgbCA9IGxlbiAtIDE7XG4gICAgICAgIHMgPSAhISBzID8gMSA6IDA7XG4gICAgfVxuICAgIGlmIChzID4gbGVuKSB7XG4gICAgICAgIHMgPSBsZW4gLSAxO1xuICAgIH1cbiAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIHMpICsgKG5ldyBBcnJheShsICsgMSkpXG4gICAgICAgIC5qb2luKCcqJykgKyBzdHIuc3Vic3RyaW5nKHMgKyBsKTtcbiAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGxlbik7XG4gICAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0cy5sb2FuID0gcGFyc2VMb2FuO1xuXG5mdW5jdGlvbiBwYXJzZUxvYW4obG9hbikge1xuICAgIGxvYW4ucmF0ZSA9IGxvYW4ucmF0ZSAvIDEwMDtcbiAgICBpZiAobG9hbi50aW1lU2V0dGxlZCkge1xuICAgICAgICBsb2FuLmJvcnJvd0R1ZURhdGUgPSBmb3JtYXRCb3Jyb3dEdWVEYXRlKGxvYW4udGltZVNldHRsZWQsIGxvYW5cbiAgICAgICAgICAgIC5kdXJhdGlvbik7XG4gICAgICAgIGxvYW4udGltZVNldHRsZWQgPSBtb21lbnQobG9hbi50aW1lU2V0dGxlZClcbiAgICAgICAgICAgIC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyDlgJ/mrL7miJDnq4vml6VcbiAgICAgICAgbG9hbi5kdWVEYXRlID0gbG9hbi50aW1lb3V0ICogNjAgKiA2MCAqIDEwMDAgKyBsb2FuLnRpbWVPcGVuO1xuICAgICAgICBsb2FuLnRpbWVTZXR0bGVkID0gbG9hbi5kdWVEYXRlICsgMSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XG4gICAgICAgIGxvYW4uYm9ycm93RHVlRGF0ZSA9IGZvcm1hdEJvcnJvd0R1ZURhdGUobG9hbi50aW1lU2V0dGxlZCwgbG9hblxuICAgICAgICAgICAgLmR1cmF0aW9uKTtcbiAgICAgICAgbG9hbi50aW1lU2V0dGxlZCA9IG1vbWVudChsb2FuLnRpbWVTZXR0bGVkKVxuICAgICAgICAgICAgLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgIH1cbiAgICBsb2FuLmxvYW5SZXF1ZXN0LnRpbWVTdWJtaXQgPSBtb21lbnQobG9hbi5sb2FuUmVxdWVzdC50aW1lU3VibWl0KS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICBsb2FuLmR1ZURhdGUgPSBtb21lbnQobG9hbi5kdWVEYXRlIHx8IGxvYW4udGltZVNldHRsZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgIGxvYW4ubWV0aG9kWmggPSBpMThuLlJlcGF5bWVudE1ldGhvZFtsb2FuLm1ldGhvZF1bMF07XG4gICAgbG9hbi50aW1lTGVmdCA9IGZvcm1hdExlZnRUaW1lKGxvYW4udGltZUxlZnQpO1xuICAgIGxvYW4ucHVycG9zZSA9IGkxOG4uTG9hblB1cnBvc2VbbG9hbi5wdXJwb3NlXTtcbiAgICAvL+agvOW8j+WMluacn+mZkFxuICAgIGlmIChsb2FuLmR1cmF0aW9uLmRheXMgPiAwKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbG9hbi5kdXJhdGlvbi50b3RhbERheXMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGxvYW4uZmR1cmF0aW9uID0gbG9hbi5kdXJhdGlvbi5kYXlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9hbi5mZHVyYXRpb24gPSBsb2FuLmR1cmF0aW9uLnRvdGFsRGF5cztcbiAgICAgICAgfVxuICAgICAgICBsb2FuLmZkdXJ1bml0ID0gXCLlpKlcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsb2FuLmZkdXJhdGlvbiA9IGxvYW4uZHVyYXRpb24udG90YWxNb250aHM7XG4gICAgICAgIGxvYW4uZmR1cnVuaXQgPSBcIuS4quaciFwiO1xuICAgIH1cbiAgICAvL+agvOW8j+WMluW6j+WIl+WPt1xuICAgIGlmIChsb2FuLnByb3ZpZGVyUHJvamVjdENvZGUpIHtcbiAgICAgICAgaWYgKGxvYW4ucHJvdmlkZXJQcm9qZWN0Q29kZS5pbmRleE9mKCcjJykgPiAwKSB7XG4gICAgICAgICAgICB2YXIgaGhfcHJvamVjdF9jb2RlID0gbG9hbi5wcm92aWRlclByb2plY3RDb2RlLnNwbGl0KCcjJyk7XG4gICAgICAgICAgICBsb2FuLmZQcm9qZWN0VHlwZSA9IGhoX3Byb2plY3RfY29kZVswXTtcbiAgICAgICAgICAgIGxvYW4uZlByb2plY3RDb2RlID0gaGhfcHJvamVjdF9jb2RlWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9hbi5mUHJvamVjdFR5cGUgPSAnJztcbiAgICAgICAgICAgIGxvYW4uZlByb2plY3RDb2RlID0gbG9hbi5wcm92aWRlclByb2plY3RDb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsb2FuO1xufVxuXG4vLyBUT0RPIOaUr+aMgWZvcm1hdFxuZXhwb3J0cy50aW1lTGVmdCA9IGZvcm1hdExlZnRUaW1lO1xuXG5mdW5jdGlvbiBmb3JtYXRMZWZ0VGltZShsZWZ0VGltZSkge1xuICAgIHZhciBkZCA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwIC8gNjAgLyA2MCAvIDI0KTtcbiAgICBsZWZ0VGltZSAtPSBkZCAqIDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gICAgdmFyIGhoID0gTWF0aC5mbG9vcihsZWZ0VGltZSAvIDEwMDAgLyA2MCAvIDYwKTtcbiAgICBsZWZ0VGltZSAtPSBoaCAqIDEwMDAgKiA2MCAqIDYwO1xuICAgIHZhciBtbSA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwIC8gNjApO1xuICAgIGxlZnRUaW1lIC09IG1tICogMTAwMCAqIDYwO1xuICAgIHZhciBzcyA9IE1hdGguZmxvb3IobGVmdFRpbWUgLyAxMDAwKTtcbiAgICBsZWZ0VGltZSAtPSBzcyAqIDEwMDA7XG5cbiAgICByZXR1cm4gZGQgKyAn5aSpJyArIGhoICsgJ+Wwj+aXticgKyBtbSArICfliIYnO1xufVxuXG5leHBvcnRzLmR1ZURhdGUgPSBmb3JtYXRCb3Jyb3dEdWVEYXRlO1xuXG5mdW5jdGlvbiBmb3JtYXRCb3Jyb3dEdWVEYXRlKHRpbWVTZXR0bGVkLCBkdXJhdGlvbikge1xuICAgIHZhciBib3Jyb3dUaW1lID0gbW9tZW50KHRpbWVTZXR0bGVkKVxuICAgICAgICAuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgYm9ycm93VGltZSA9IGJvcnJvd1RpbWUuc3BsaXQoJy0nKTtcbiAgICB2YXIgeWVhciA9IHBhcnNlSW50KGJvcnJvd1RpbWVbMF0sIDEwKTtcbiAgICB2YXIgbW9udGggPSBwYXJzZUludChib3Jyb3dUaW1lWzFdLCAxMCk7XG4gICAgdmFyIGRheSA9IHBhcnNlSW50KGJvcnJvd1RpbWVbMl0pO1xuICAgIHZhciBhZGRNb250aCA9IG1vbnRoICsgZHVyYXRpb24udG90YWxNb250aHM7XG4gICAgaWYgKGR1cmF0aW9uLmRheXMgPiAwKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQodGltZVNldHRsZWQpLmFkZCgnZGF5cycsIGR1cmF0aW9uLnRvdGFsRGF5cykuZm9ybWF0KFxuICAgICAgICAgICAgJ1lZWVktTU0tREQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIShhZGRNb250aCAlIDEyKSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhZGRNb250aCk7XG4gICAgICAgICAgICB5ZWFyID0gTWF0aC5mbG9vcihhZGRNb250aCAvIDEyKSAtIDEgKyB5ZWFyO1xuICAgICAgICAgICAgbW9udGggPSBhZGRNb250aCAtIChNYXRoLmZsb29yKGFkZE1vbnRoIC8gMTIpIC0gMSkgKiAxMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHllYXIgPSBNYXRoLmZsb29yKGFkZE1vbnRoIC8gMTIpICsgeWVhcjtcbiAgICAgICAgICAgIG1vbnRoID0gYWRkTW9udGggLSBNYXRoLmZsb29yKGFkZE1vbnRoIC8gMTIpICogMTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcbiAgICAgICAgICAgIG1vbnRoID0gJzAnICsgbW9udGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRheSA8IDEwKSB7XG4gICAgICAgICAgICBkYXkgPSAnMCcgKyBkYXk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcbiAgICB9XG59XG5cbmV4cG9ydHMucmVwYXltZW50cyA9IHJlcGF5bWVudHM7XG5cbmZ1bmN0aW9uIHJlcGF5bWVudHMoYm9keSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGJvZHkuZGF0YSkpIHtcbiAgICAgICAgdmFyIHJlcGF5bWVudHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2R5LmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlcGF5bWVudHMucHVzaChib2R5LmRhdGFbaV0ucmVwYXltZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVwYXltZW50cztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYm9keS5kYXRhLnJlcGF5bWVudHM7XG4gICAgfVxufVxuXG5leHBvcnRzLnByb29mc1VyaSA9IHByb29mc1VyaTtcblxuZnVuY3Rpb24gcHJvb2ZzVXJpKGJvZHkpIHtcbiAgICByZXR1cm4gYm9keS5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNyYzogcC51cmlcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnRzLnRpbWVQZXJpb2QgPSB0aW1lUGVyaW9kO1xuXG5mdW5jdGlvbiB0aW1lUGVyaW9kKGRhdGUpIHtcbiAgICBkYXRlID0gZGF0ZSBpbnN0YW5jZW9mIERhdGUgPyBkYXRlIDogbmV3IERhdGUoKTtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgaWYgKDYgPCBob3VycyAmJiBob3VycyA8IDkpIHtcbiAgICAgICAgcmV0dXJuICfml6nkuIonO1xuICAgIH0gZWxzZSBpZiAoOSA8PSBob3VycyAmJiBob3VycyA8IDEyKSB7XG4gICAgICAgIHJldHVybiAn5LiK5Y2IJztcbiAgICB9IGVsc2UgaWYgKDEyIDw9IGhvdXJzICYmIGhvdXJzIDwgMTMpIHtcbiAgICAgICAgcmV0dXJuICfkuK3ljYgnO1xuICAgIH0gZWxzZSBpZiAoMTMgPD0gaG91cnMgJiYgaG91cnMgPCAxOCkge1xuICAgICAgICByZXR1cm4gJ+S4i+WNiCc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICfmmZrkuIonO1xuICAgIH1cbn1cblxuZXhwb3J0cy5sb2FuTGlzdCA9IHBhcnNlTG9hbkxpc3Q7XG5cbmZ1bmN0aW9uIHBhcnNlTG9hbkxpc3QobG9hbnMpIHtcbiAgICB2YXIgbWF4ID0gNDtcbiAgICB2YXIgbG9hbkxpc3QgPSBbXTtcbiAgICB2YXIgb3BlbkxvYW5MZW4gPSBsb2Fucy5vcGVuLmxlbmd0aDtcbiAgICB2YXIgc2NoZWR1bGVkTG9hbkxlbiA9IGxvYW5zLnNjaGVkdWxlZC5sZW5ndGg7XG4gICAgdmFyIGZpbmlzaGVkTG9hbkxlbiA9IGxvYW5zLmZpbmlzaGVkLmxlbmd0aDtcblxuICAgIGlmIChvcGVuTG9hbkxlbiA+PSBtYXgpIHtcbiAgICAgICAgYWRkSXRlbShsb2Fucy5vcGVuLnNsaWNlKDAsIG1heCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZEl0ZW0obG9hbnMub3Blbi5zbGljZSgwLCBvcGVuTG9hbkxlbikpO1xuICAgICAgICBpZiAoKG1heCAtIHNjaGVkdWxlZExvYW5MZW4pIDw9IG9wZW5Mb2FuTGVuKSB7XG4gICAgICAgICAgICBhZGRJdGVtKGxvYW5zLnNjaGVkdWxlZC5zbGljZSgwLCBtYXggLSBvcGVuTG9hbkxlbikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkSXRlbShsb2Fucy5zY2hlZHVsZWQuc2xpY2UoMCwgc2NoZWR1bGVkTG9hbkxlbikpO1xuICAgICAgICAgICAgYWRkSXRlbShsb2Fucy5maW5pc2hlZC5zbGljZSgwLCBtYXggLSBvcGVuTG9hbkxlbiAtXG4gICAgICAgICAgICAgICAgc2NoZWR1bGVkTG9hbkxlbikpO1xuICAgICAgICAgICAgYWRkSXRlbShsb2Fucy5zZXR0bGVkLnNsaWNlKDAsIG1heCAtIG9wZW5Mb2FuTGVuIC1cbiAgICAgICAgICAgICAgICBzY2hlZHVsZWRMb2FuTGVuIC0gZmluaXNoZWRMb2FuTGVuKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRJdGVtKGl0ZW1zKSB7XG4gICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBpdGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxvYW5MaXN0LnB1c2goZm9ybWF0SXRlbShpdGVtc1tpXSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0SXRlbShpdGVtKSB7XG4gICAgICAgIGl0ZW0ucmF0ZSA9IGl0ZW0ucmF0ZSAvIDEwMDtcbiAgICAgICAgaXRlbS5pbnZlc3RQZXJjZW50ID0gcGFyc2VJbnQoaXRlbS5pbnZlc3RQZXJjZW50ICogMTAwLCAxMCk7XG4gICAgICAgIC8v5qC85byP5YyW5pyf6ZmQXG4gICAgICAgIGlmIChpdGVtLmR1cmF0aW9uLmRheXMgPiAwKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZHVyYXRpb24udG90YWxEYXlzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5mZHVyYXRpb24gPSBpdGVtLmR1cmF0aW9uLmRheXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW0uZmR1cmF0aW9uID0gaXRlbS5kdXJhdGlvbi50b3RhbERheXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLmZkdXJ1bml0ID0gXCLlpKlcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uZmR1cmF0aW9uID0gaXRlbS5kdXJhdGlvbi50b3RhbE1vbnRocztcbiAgICAgICAgICAgIGl0ZW0uZmR1cnVuaXQgPSBcIuS4quaciFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0uYW1vdW50ID49IDEwMDAwKSB7XG4gICAgICAgICAgICBpdGVtLmFtb3VudFVuaXQgPSAn5LiHJztcbiAgICAgICAgICAgIGl0ZW0uYW1vdW50ID0gKGl0ZW0uYW1vdW50IC8gMTAwMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5hbW91bnRVbml0ID0gJ+WFgyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuICAgIHJldHVybiBsb2FuTGlzdDtcbn1cblxuZXhwb3J0cy5kYXRlID0gZnVuY3Rpb24gKGRhdGUsIGZtdCkge1xuICAgIHJldHVybiBkYXRlID8gbW9tZW50KGRhdGUpLmZvcm1hdChmbXQpIDogJyc7XG59O1xuXG4vKlxuICogRm9ybWF0IGFtb3VudCBmcm9tIHB1cmUgbnVtYmVyIHRvIG1vbmV5IGZvcm1hdC5cbiAqIGUuZy4gMTIzNDU2NyAtPiAxLDIzNCw1NjdcbiAqL1xuZXhwb3J0cy5hbW91bnQgPSBmdW5jdGlvbiAocywgbikge1xuICAgIG4gPSBuID4gMCAmJiBuIDw9IDIwID8gbiA6IDA7XG4gICAgaWYgKHMgPCAwKSB7XG4gICAgICAgIHZhciBfcyA9IDA7XG4gICAgICAgIHJldHVybiBfcy50b0ZpeGVkKG4pO1xuICAgIH1cbiAgICBzID0gcGFyc2VGbG9hdCgocyArIFwiXCIpLnJlcGxhY2UoL1teXFxkXFwuLV0vZywgXCJcIikpLnRvRml4ZWQobikgKyBcIlwiO1xuICAgIHZhciBsID0gcy5zcGxpdChcIi5cIilbMF0uc3BsaXQoXCJcIikucmV2ZXJzZSgpO1xuICAgIHZhciByID0gcy5zcGxpdChcIi5cIilbMV07XG4gICAgdmFyIHQgPSBcIlwiLFxuICAgICAgICBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHQgKz0gbFtpXSArICgoaSArIDEpICUgMyA9PSAwICYmIChpICsgMSkgIT0gbC5sZW5ndGggPyBcIixcIiA6IFwiXCIpO1xuICAgIH1cbiAgICBpZiAocikge1xuICAgICAgICByZXR1cm4gdC5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSArIFwiLlwiICsgcjsgLy8gOTkuOTlcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdC5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9XG59O1xuLy/mlbDlrZfovazmjaLkuLrluKbljZXkvY3nmoRcbmV4cG9ydHMudW5pdCA9IGZ1bmN0aW9uIChzLCBmKSB7XG4gICAgdmFyIHUgPSAnJyxcbiAgICAgICAgdW5pdCA9ICcnLFxuICAgICAgICB2ID0gJycsXG4gICAgICAgIHcgPSAxMDAwMCxcbiAgICAgICAgeSA9IDEwMDAwMDAwMCxcbiAgICAgICAgdjEgPSAwO1xuICAgIHMgPSAocyArICcnKS50cmltKCk7XG4gICAgaWYgKHMgPCB3KSB7XG4gICAgICAgIHMgPSBwYXJzZUZsb2F0KHMpLnRvRml4ZWQoMCk7XG4gICAgfSBlbHNlIGlmIChzID49IHcgJiYgcyA8IHkpIHtcbiAgICAgICAgcyA9IChzIC8gdykudG9GaXhlZCgyKTtcbiAgICAgICAgdSA9ICfkuIcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHMgPSAocyAvIHkpLnRvRml4ZWQoMik7XG4gICAgICAgIHUgPSAn5Lq/JztcbiAgICB9XG4gICAgLy/lsI/mlbDngrnlkI4uMDDliJnmmL7npLrkuLrmlbTmlbAg5Y+N5LmL5L+d55WZ5Lik5L2N5bCP5pWwXG4gICAgaWYgKChzICsgJycpLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHYxID0gKHMgKyAnJykuc3Vic3RyaW5nKHBhcnNlRmxvYXQoKHMgKyAnJykuaW5kZXhPZignLicpKSArIDEpO1xuICAgIH1cbiAgICBpZiAodjEgPiAwKSB7XG4gICAgICAgIHMgPSBwYXJzZUZsb2F0KHMpLnRvRml4ZWQoMik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcyA9IHBhcnNlRmxvYXQocykudG9GaXhlZCgwKTtcbiAgICB9XG5cbiAgICBpZiAoZikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdjogcyxcbiAgICAgICAgICAgIHVuaXQ6IHVcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzICsgdTtcbiAgICB9XG59O1xuZXhwb3J0cy5tYXNrRW1haWwgPSBmdW5jdGlvbiAoZW1haWwpIHtcbiAgICB2YXIgbWF0Y2ggPSAoZW1haWwgfHwgJycpLm1hdGNoKC9eKFteQF0rKUAoW15cXC5dKykoLispJC8pO1xuICAgIGlmICghZW1haWwpIHJldHVybiBlbWFpbDtcbiAgICB2YXIgbTEgPSBtYXRjaFsxXS5sZW5ndGggPiA1ID8gbWF0Y2hbMV0uc3Vic3RyaW5nKDAsIDUpIDogbWF0Y2hbMV07XG4gICAgdmFyIG0yID0gbWF0Y2hbMl0ubGVuZ3RoID4gNSA/IG1hdGNoWzJdLnN1YnN0cmluZygwLCA1KSA6IG1hdGNoWzJdO1xuICAgIHJldHVybiBtYXNrKG0xLCAyKSArICdAJyArIG1hc2sobTIsIDIpICsgbWF0Y2hbM107XG59O1xuXG5leHBvcnRzLm1hc2tNb2JpbGUgPSBmdW5jdGlvbiAobnVtYmVyLCBsZWZ0LCByaWdodCkge1xuICAgIGlmICghbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgbGVmdCA9IGxlZnQgfHwgMztcbiAgICByaWdodCA9IHJpZ2h0IHx8IDQ7XG4gICAgdmFyIHRtcCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpIDwgbGVmdCB8fCAobnVtYmVyLmxlbmd0aCAtIHJpZ2h0KSA8PSBpKSB7XG4gICAgICAgICAgICB0bXAgKz0gbnVtYmVyW2ldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG1wICs9ICcqJztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG1wO1xufTtcblxuZXhwb3J0cy5iYW5rQWNjb3VudCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBzdHIgPSBzdHIudHJpbSgpO1xuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICBpZiAoc3RyLmxlbmd0aCA9PSAxNikge1xuICAgICAgICByZXN1bHQgPSBzdHIuc3Vic3RyaW5nKDAsIDQpICsgJyAnICsgJyoqKiogKioqKicgKyAnICcgKyBzdHIuc3Vic3RyaW5nKDEyKTtcbiAgICB9IGVsc2UgaWYgKHN0ci5sZW5ndGggPT0gMTkpIHtcbiAgICAgICAgcmVzdWx0ID0gc3RyLnN1YnN0cmluZygwLCA2KSArICcgJyArICcqKioqKioqJyArICcgJyArIHN0ci5zdWJzdHJpbmcoMTMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0JhbmsgYWNjb3VudCBudW1iZXIgJyArIHN0ciArICcgaXMgaW52YWxpZCcpO1xuICAgICAgICByZXN1bHQgPSBzdHI7XG4gICAgfVxuICAgIC8vcmV0dXJuIHJlc3VsdC5yZXBsYWNlKC9cXHMvZywgJyZuYnNwOycpXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydHMuZHVyYXRpb24gPSBmdW5jdGlvbiAoZCkge1xuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICBpZiAoIWQgfHwgJ29iamVjdCcgIT0gdHlwZW9mIGQgfHwgKCFkLnllYXJzICYmICFkLm1vbnRocyAmJiAhZC5kYXlzKSkgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoZC55ZWFycykgcmVzdWx0ICs9IGQueWVhcnMgKyAn5bm0JztcbiAgICBpZiAoZC5tb250aHMpIHJlc3VsdCArPSAocmVzdWx0Lmxlbmd0aCAmJiAhZC5kYXlzID8gJ+mbticgOiAnJykgKyBkLm1vbnRocyArICfkuKrmnIgnO1xuICAgIGlmIChkLmRheXMpIHJlc3VsdCArPSAocmVzdWx0Lmxlbmd0aCA/ICfpm7YnIDogJycpICsgZC5kYXlzICsgJ+WkqSc7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydHMuY21zRGF0ZSA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGlzdFtpXS5wdWJEYXRlID0gbW9tZW50KGxpc3RbaV0ucHViRGF0ZSkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgfVxuICAgIHJldHVybiBsaXN0O1xufTtcblxuLyoqXG4gKiDmoLzlvI/ljJYgMDAwMDAwMDAwMDAwMSAzOTk5OTk5OTk5OTk5OSDov5nmoLfnmoTlsI/mlbBcbiAqIFxuICogQGV4YW1wbGUgXG4gKiAgZmxvYXROdW0oMC4zMDAwMDAwMDAwMDEpID0+IDAuM1xuICogIGZsb2F0TnVtKDAuMzk5OTk5OTk5OTk5KSA9PiAwLjRcbiAqICBmbG9hdE51bSgxLjk5OTk5OTk5OTk5OSkgPT4gMlxuICovXG5leHBvcnRzLmZsb2F0TnVtID0gZnVuY3Rpb24obnVtKXtcbiAgICB2YXIgcGFydHMgPSBTdHJpbmcoTnVtYmVyKG51bSkpLnNwbGl0KCcuJyk7XG4gICAgXG4gICAgLy8g5rKh5pyJ5bCP5pWw6YOo5YiGXG4gICAgaWYocGFydHMubGVuZ3RoID09PSAxKXtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG4gICAgXG4gICAgLy8g5bCP5pWw5LiN6LazNuS9jVxuICAgIGlmKHBhcnRzWzFdLmxlbmd0aCA8IDYpe1xuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH1cbiAgICBcbiAgICB2YXIgcyA9IFN0cmluZyhudW0pO1xuICAgIFxuICAgIGlmKC9cXC45ezYsfSQvLnRlc3Qocykpe1xuICAgICAgICByZXR1cm4gTnVtYmVyKHBhcnRzWzBdKSArIDE7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBOdW1iZXIoc1xuICAgICAgICAucmVwbGFjZSgvXFwuPzB7Nix9XFxkJC8sJycpXG4gICAgICAgIC5yZXBsYWNlKC8oXFxkKTl7Nix9JC8sZnVuY3Rpb24obWF0Y2gsbnVtKXsgXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKG51bSkrMTsgXG4gICAgICAgIH0pKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgJ3poLWNuJzogcmVxdWlyZSgnLi96aC1jbicpXG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiZW51bXNcIjoge1xuICAgIFwiRnVuZFJlY29yZFR5cGVcIjoge1xuICAgICAgXCJJTlZFU1RcIjogXCLmipXmoIdcIixcbiAgICAgIFwiV0lUSERSQVdcIjogXCLlj5bnjrBcIixcbiAgICAgIFwiREVQT1NJVFwiOiBcIuWFheWAvFwiLFxuICAgICAgXCJMT0FOXCI6IFwi5pS+5qy+XCIsXG4gICAgICBcIkxPQU5fUkVQQVlcIjogXCLotLfmrL7ov5jmrL5cIixcbiAgICAgIFwiRElTQlVSU0VcIjogXCLlnqvku5jov5jmrL5cIixcbiAgICAgIFwiSU5WRVNUX1JFUEFZXCI6IFwi5oqV6LWE6L+Y5qy+XCIsXG4gICAgICBcIkNSRURJVF9BU1NJR05cIjogXCLlgLrmnYPovazorqlcIixcbiAgICAgIFwiVFJBTlNGRVJcIjogXCLovazotKbmiaPmrL5cIixcbiAgICAgIFwiUkVXQVJEX1JFR0lTVEVSXCI6IFwi5rOo5YaM5aWW5YqxXCIsXG4gICAgICBcIlJFV0FSRF9JTlZFU1RcIjogXCLmipXmoIflpZblirFcIixcbiAgICAgIFwiUkVXQVJEX0RFUE9TSVRcIjogXCLlhYXlgLzlpZblirFcIixcbiAgICAgIFwiRkVFX1dJVEhEUkFXXCI6IFwi5o+Q546w5omL57ut6LS5XCIsXG4gICAgICBcIkZFRV9BVVRIRU5USUNBVEVcIjogXCLouqvku73pqozor4HmiYvnu63otLlcIixcbiAgICAgIFwiRkVFX0lOVkVTVF9JTlRFUkVTVFwiOiBcIuWbnuasvuWIqeaBr+euoeeQhui0uVwiLFxuICAgICAgXCJGRUVfTE9BTl9TRVJWSUNFXCI6IFwi5YCf5qy+5pyN5Yqh6LS5XCIsXG4gICAgICBcIkZFRV9MT0FOX01BTkFHRVwiOiBcIuWAn+asvueuoeeQhui0uVwiLFxuICAgICAgXCJGRUVfTE9BTl9JTlRFUkVTVFwiOiBcIui/mOasvuWIqeaBr+euoeeQhui0uVwiLFxuICAgICAgXCJGRUVfTE9BTl9WSVNJVFwiOiBcIuWunuWcsOiAg+Wvn+i0uVwiLFxuICAgICAgXCJGRUVfTE9BTl9HVUFSQU5URUVcIjogXCLmi4Xkv53otLlcIixcbiAgICAgIFwiRkVFX0xPQU5fUklTS1wiOiBcIumjjumZqeeuoeeQhui0uVwiLFxuICAgICAgXCJGRUVfTE9BTl9PVkVSRFVFXCI6IFwi6YC+5pyf566h55CG6LS5XCIsXG4gICAgICBcIkZFRV9MT0FOX1BFTkFMVFlcIjogXCLpgL7mnJ/nvZrmga8o57uZ5ZWG5oi3KVwiLFxuICAgICAgXCJGRUVfTE9BTl9QRU5BTFRZX0lOVkVTVFwiOiBcIumAvuacn+e9muaBryjnu5nmipXotYTkuropXCIsXG4gICAgICBcIkZFRV9ERVBPU0lUXCI6IFwi5YWF5YC85omL57ut6LS5XCIsXG4gICAgICBcIkZFRV9BRFZBTkNFX1JFUEFZXCI6IFwi5o+Q5YmN6L+Y5qy+6L+d57qm6YeRKOe7meWVhuaItylcIixcbiAgICAgIFwiRkVFX0FEVkFOQ0VfUkVQQVlfSU5WRVNUXCI6IFwi5o+Q5YmN6L+Y5qy+6L+d57qm6YeRKOe7meaKlei1hOS6uilcIixcbiAgICAgIFwiRlNTXCI6IFwi55Sf5Yip5a6dXCJcbiAgICB9LFxuICAgIFwiRnVuZFJlY29yZE9wZXJhdGlvblwiOiB7XG4gICAgICBcIkZSRUVaRVwiOiBcIuWGu+e7k1wiLFxuICAgICAgXCJSRUxFQVNFXCI6IFwi6Kej5Ya7XCIsXG4gICAgICBcIklOXCI6IFwi6LWE6YeR6L2s5YWlXCIsXG4gICAgICBcIk9VVFwiOiBcIui1hOmHkei9rOWHulwiXG4gICAgfSxcbiAgICBcIkZ1bmRSZWNvcmRTdGF0dXNcIjoge1xuICAgICAgXCJJTklUSUFMSVpFRFwiOiBcIuWIneWni1wiLFxuICAgICAgXCJQUk9DRVNTSU5HXCI6IFwi5aSE55CG5LitXCIsXG4gICAgICBcIkFVRElUSU5HXCI6IFwi5a6h5qC45LitXCIsXG4gICAgICBcIlNVQ0NFU1NGVUxcIjogXCLmiJDlip9cIixcbiAgICAgIFwiRkFJTEVEXCI6IFwi5aSx6LSlXCIsXG4gICAgICBcIlJFSkVDVEVEXCI6IFwi5ouS57udXCIsXG4gICAgICBcIkNBTkNFTEVEXCI6IFwi5Y+W5raIXCJcbiAgICB9LFxuICAgIFwiTWFyaXRhbFN0YXR1c1wiOiB7XG4gICAgICBcIk1BUlJJRURcIjogXCLlt7LlqZpcIixcbiAgICAgIFwiU0lOR0xFXCI6IFwi5pyq5amaXCIsXG4gICAgICBcIkRJVk9SQ0VEXCI6IFwi56a75byCXCIsXG4gICAgICBcIldJRE9XRURcIjogXCLkuKflgbZcIlxuICAgIH0sXG4gICAgXCJFZHVjYXRpb25MZXZlbFwiOiB7XG4gICAgICBcIkhJR0hTQ0hPT0xcIjogXCLpq5jkuK3lj4rku6XkuItcIixcbiAgICAgIFwiVEVDSE5JQ0FMU0NIT09MXCI6IFwi5Lit5LiTXCIsXG4gICAgICBcIkpVTklPUkNPTExFR0VcIjogXCLlpKfkuJNcIixcbiAgICAgIFwiVU5ERVJHUkFEVUFURVwiOiBcIuacrOenkVwiLFxuICAgICAgXCJNQVNURVJcIjogXCLnoZXlo6tcIixcbiAgICAgIFwiRE9DVE9SXCI6IFwi5Y2a5aOrXCJcbiAgICB9LFxuICAgIFwiQ2FyZWVyU3RhdHVzXCI6IHtcbiAgICAgIFwiRU1QTE9ZRUVcIjogXCLmma7pgJrlkZjlt6VcIixcbiAgICAgIFwiTUFOQUdFUlwiOiBcIueuoeeQhuS6uuWRmFwiLFxuICAgICAgXCJTSEFSRUhPTERFUlwiOiBcIuiCoeS4nFwiLFxuICAgICAgXCJQUklWQVRFX0VOVFJFUFJFTkVVUlwiOiBcIuengeiQpeS8geS4muS4u1wiLFxuICAgICAgXCJPVEhFUlwiOiBcIuWFtuS7llwiXG4gICAgfSxcbiAgICBcIkNvbXBhbnlUeXBlXCI6IHtcbiAgICAgIFwiR09WRVJOTUVOVF9PRkZJQ0VTXCI6IFwi5Zu95a625Y+K5Zyw5pa55pS/5bqc6KGM5pS/5py65p6EXCIsXG4gICAgICBcIlBVQkxJQ19JTlNUSVRVVElPTlwiOiBcIuS6i+S4muWNleS9jVwiLFxuICAgICAgXCJFRFVDQVRJT05fUkVTRUFSQ0hfSU5TVElUVVRJT05cIjogXCLlrabmoKHlj4rnp5HnoJTmnLrmnoRcIixcbiAgICAgIFwiU1RBVEVPV05FRF9LRVlfRU5URVJQUklTRVNcIjogXCLlpK7kvIEo5YyF5ous5LiL57qn5Y2V5L2NKVwiLFxuICAgICAgXCJTVEFURU9XTkVEX0VOVEVSUFJJU0VTXCI6IFwi5LiA6Iis5Zu95LyBKOWMheaLrOS4i+e6p+WNleS9jSlcIixcbiAgICAgIFwiT1ZFUlNFQVNfRlVOREVEX0VOVEVSUFJJU0VTXCI6IFwi5aSW6LWE5LyB5LiaXCIsXG4gICAgICBcIlRBSVdBTl9IT05HS09OR19NQUNBVVwiOiBcIuWPsOa4r+a+s+S8geS4mlwiLFxuICAgICAgXCJKT0lOVF9WRU5UVVJFXCI6IFwi5ZCI6LWE5LyB5LiaXCIsXG4gICAgICBcIlBSSVZBVEVfRU5URVJQUklTRVNcIjogXCLmsJHokKXkvIHkuJpcIixcbiAgICAgIFwiU0VMRl9FTVBMT1lFRFwiOiBcIuS4quS9k+e7j+iQpVwiLFxuICAgICAgXCJPVEhFUlwiOiBcIuWFtuS7llwiXG4gICAgfSxcbiAgICBcIkNvbXBhbnlJbmR1c3RyeVwiOiB7XG4gICAgICBcIkVYQ0FWQVRFXCI6IFwi6YeH5o6Y5LiaXCIsXG4gICAgICBcIkdFT19TVVJWRVlcIjogXCLlnLDotKjli5jmn6XkuJpcIixcbiAgICAgIFwiUkVTRUFSQ0hcIjogXCLnp5HlrabnoJTnqbYv5oqA5pyv5pyN5YqhXCIsXG4gICAgICBcIklSUklHQVRJT05fRU5WSVJPTk1FTlRcIjogXCLmsLTliKkv546v5aKDL+WFrOWFseiuvuaWveeuoeeQhlwiLFxuICAgICAgXCJSRU5UQUxcIjogXCLnp5/otYEv5ZWG5Yqh5pyN5YqhXCIsXG4gICAgICBcIk1JTElUQVJZXCI6IFwi5Yab6ZifL+atpuitplwiLFxuICAgICAgXCJJTlRFUk5BVElPTkFMXCI6IFwi5Zu96ZmF57uE57uHXCIsXG4gICAgICBcIk1BTlVGQUNUVVJFXCI6IFwi5Yi26YCg5LiaXCIsXG4gICAgICBcIklUXCI6IFwi55S15L+hL+mAmuS/oS/orqHnrpfmnLov6L2v5Lu2L+S6kuiBlOe9kVwiLFxuICAgICAgXCJHT1ZFUk5NRU5UXCI6IFwi5Zu95a625py65YWzL+aUv+WFmuacuuWFsy/npL7kvJrlm6LkvZNcIixcbiAgICAgIFwiTUVESUFfQURWRVJUSVNFTUVOVFwiOiBcIuWqkuS9ky/lub/lkYov5bm/5pKtL+eUteW9sS/nlLXop4ZcIixcbiAgICAgIFwiUkVUQUlMX1dIT0xFU0FMRVwiOiBcIumbtuWUri/mibnlj5FcIixcbiAgICAgIFwiRURVQ0FUSU9OX1RSQUlOSU5HXCI6IFwi5pWZ6IKyL+WfueiurSBcIixcbiAgICAgIFwiUFVCTElDX1NFUlZJQ0VTXCI6IFwi56S+5Lya5pyN5Yqh5LiaXCIsXG4gICAgICBcIkZJTkFOQ0VfTEFXXCI6IFwi6YeR6J6NL+S/nemZqS/ms5XlvotcIixcbiAgICAgIFwiVFJBTlNQT1JUQVRJT05cIjogXCLkuqTpgJrov5DovpMv5LuT5YKoL+mCruaUv1wiLFxuICAgICAgXCJSRUFMX0VTVEFURVwiOiBcIuaIv+WcsOS6p+S4mlwiLFxuICAgICAgXCJFTkVSR1lcIjogXCLmsLQv55S1L+eFpC/msJQv6IO95rqQ55Sf5Lqn5L6b5bqUXCIsXG4gICAgICBcIkNBVEVSSU5HX0hPVEVMXCI6IFwi5L2P5a6/L+mkkOmlrlwiLFxuICAgICAgXCJNRURJQ0FMX0hFQUxUSF9DQVJFXCI6IFwi5Yy755aXL+WNq+eUny/kv53lgaVcIixcbiAgICAgIFwiQ09OU1RSVUNUSU9OX0VOR0lORVJSSU5HXCI6IFwi5bu6562RL+W3peeoi1wiLFxuICAgICAgXCJBR1JJQ1VMVFVSRVwiOiBcIuWGnC/mnpcv54mnL+a4lFwiLFxuICAgICAgXCJFTlRFUlRBSU1FTlRcIjogXCLmlofljJYv5aix5LmQ5pyN5Yqh5LiaXCIsXG4gICAgICBcIlNQT1JUX0FSVFwiOiBcIuS9k+iCsi/oibrmnK9cIixcbiAgICAgIFwiVVRJTElUWVwiOiBcIuekvuS8muemj+WIqS/lhaznm4rkuovkuJpcIixcbiAgICAgIFwiT1RIRVJcIjogXCLlhbbku5ZcIlxuICAgIH0sXG4gICAgXCJDb21wYW55U2l6ZVwiOiB7XG4gICAgICBcIlNJWkVfQkVMT1dfMTBcIjogXCIxMOS6uuS7peS4i1wiLFxuICAgICAgXCJTSVpFXzExXzEwMFwiOiBcIjEx77mjMTAw5Lq6XCIsXG4gICAgICBcIlNJWkVfMTAxXzUwMFwiOiBcIjEwMe+5ozUwMOS6ulwiLFxuICAgICAgXCJTSVpFXzUwMV8yMDAwXCI6IFwiNTAxLTIwMDDkurpcIixcbiAgICAgIFwiU0laRV8yMDAxXzEwMDAwXCI6IFwiMjAwMS0xMDAwMOS6ulwiLFxuICAgICAgXCJTSVpFXzEwMDAxXzEwMDAwMFwiOiBcIjEwMDAw5Lq65Lul5LiKXCJcbiAgICB9LFxuICAgIFwiTW9udGhseVNhbGFyeVwiOiB7XG4gICAgICBcIlNBTEFSWV9CRUxPV18yMDAwXCI6IFwiMjAwMOS7peS4i1wiLFxuICAgICAgXCJTQUxBUllfMjAwMV81MDAwMFwiOiBcIjIwMDHvuaM1MDAwXCIsXG4gICAgICBcIlNBTEFSWV81MDAxXzEwMDAwXCI6IFwiNTAwMe+5ozEwMDAwXCIsXG4gICAgICBcIlNBTEFSWV8xMDAwMV8yMDAwMFwiOiBcIjEwMDAx77mjMjAwMDBcIixcbiAgICAgIFwiU0FMQVJZXzIwMDAxXzUwMDAwXCI6IFwiMjAwMDHvuaM1MDAwMFwiLFxuICAgICAgXCJTQUxBUllfQUJPVkVfNTAwMDFcIjogXCI1MDAwMeS7peS4ilwiXG4gICAgfSxcbiAgICBcIlllYXJPZlNlcnZpY2VcIjoge1xuICAgICAgXCJZRUFSX0JFTE9XXzFcIjogXCIx5bm05Lul5LiLXCIsXG4gICAgICBcIllFQVJfMV8zXCI6IFwiMS0z5bm0KOWQqylcIixcbiAgICAgIFwiWUVBUl8zXzVcIjogXCIzLTXlubQo5ZCrKVwiLFxuICAgICAgXCJZRUFSXzVfMTBcIjogXCI1LTEw5bm0KOWQqylcIixcbiAgICAgIFwiWUVBUl8xMF8yMFwiOiBcIjEwLTIw5bm0KOWQqylcIixcbiAgICAgIFwiWUVBUl9BQk9WRV8yMFwiOiBcIjIw5bm05Lul5LiKXCJcbiAgICB9LFxuICAgIFwiRXRobmljR3JvdXBcIjoge1xuICAgICAgXCJIYW5cIjogXCLmsYnml49cIixcbiAgICAgIFwiWmh1YW5nXCI6IFwi5aOu5pePXCIsXG4gICAgICBcIk1hbmNodVwiOiBcIua7oeaXj1wiLFxuICAgICAgXCJIdWlcIjogXCLlm57ml49cIixcbiAgICAgIFwiTWlhb1wiOiBcIuiLl+aXj1wiLFxuICAgICAgXCJVaWdodXJcIjogXCLnu7TlkL7lsJTml49cIixcbiAgICAgIFwiWWlcIjogXCLlvZ3ml49cIixcbiAgICAgIFwiVHVqaWFcIjogXCLlnJ/lrrbml49cIixcbiAgICAgIFwiTW9uZ29sXCI6IFwi6JKZ5Y+k5pePXCIsXG4gICAgICBcIlRpYmV0YW5cIjogXCLol4/ml49cIixcbiAgICAgIFwiQnV5aVwiOiBcIuW4g+S+neaXj1wiLFxuICAgICAgXCJEb25nXCI6IFwi5L6X5pePXCIsXG4gICAgICBcIllhb1wiOiBcIueRtuaXj1wiLFxuICAgICAgXCJLb3JlYW5cIjogXCLmnJ3pspzml49cIixcbiAgICAgIFwiQmFpXCI6IFwi55m95pePXCIsXG4gICAgICBcIkhhbmlcIjogXCLlk4jlsLzml49cIixcbiAgICAgIFwiTGlcIjogXCLpu47ml49cIixcbiAgICAgIFwiS2F6YWtoXCI6IFwi5ZOI6JCo5YWL5pePXCIsXG4gICAgICBcIkRhaVwiOiBcIuWCo+aXj1wiLFxuICAgICAgXCJTaGVcIjogXCLnlbLml49cIixcbiAgICAgIFwiTGlzdVwiOiBcIuWDs+WDs+aXj1wiLFxuICAgICAgXCJHZWxhb1wiOiBcIuS7oeS9rOaXj1wiLFxuICAgICAgXCJMYWh1XCI6IFwi5ouJ56Wc5pePXCIsXG4gICAgICBcIkRvbmd4aWFuZ1wiOiBcIuS4nOS5oeaXj1wiLFxuICAgICAgXCJXYVwiOiBcIuS9pOaXj1wiLFxuICAgICAgXCJTaHVpXCI6IFwi5rC05pePXCIsXG4gICAgICBcIk5heGlcIjogXCLnurPopb/ml49cIixcbiAgICAgIFwiUWlhbmdcIjogXCLnvozml49cIixcbiAgICAgIFwiRHVcIjogXCLlnJ/ml49cIixcbiAgICAgIFwiWGliZVwiOiBcIumUoeS8r+aXj1wiLFxuICAgICAgXCJNdWxhbVwiOiBcIuS7q+S9rOaXj1wiLFxuICAgICAgXCJLaXJnaGl6XCI6IFwi5p+v5bCU5YWL5a2c5pePXCIsXG4gICAgICBcIkRhdXJcIjogXCLovr7mlqHlsJTml49cIixcbiAgICAgIFwiSmluZ3BvXCI6IFwi5pmv6aKH5pePXCIsXG4gICAgICBcIlNhbGFyXCI6IFwi5pKS5ouJ5pePXCIsXG4gICAgICBcIkJsYW5nXCI6IFwi5biD5pyX5pePXCIsXG4gICAgICBcIk1hb25hblwiOiBcIuavm+WNl+aXj1wiLFxuICAgICAgXCJUYWppa1wiOiBcIuWhlOWQieWFi+aXj1wiLFxuICAgICAgXCJQdW1pXCI6IFwi5pmu57Gz5pePXCIsXG4gICAgICBcIkFjaGFuZ1wiOiBcIumYv+aYjOaXj1wiLFxuICAgICAgXCJOdVwiOiBcIuaAkuaXj1wiLFxuICAgICAgXCJFdmVua2lcIjogXCLphILmuKnlhYvml49cIixcbiAgICAgIFwiR2luXCI6IFwi5Lqs5pePXCIsXG4gICAgICBcIkppbm9cIjogXCLln7ror7rml49cIixcbiAgICAgIFwiRGVhbmdcIjogXCLlvrfmmILml49cIixcbiAgICAgIFwiVXpiZWtcIjogXCLkuYzlrZzliKvlhYvml49cIixcbiAgICAgIFwiUnVzc2lhblwiOiBcIuS/hOe9l+aWr+aXj1wiLFxuICAgICAgXCJZdWd1clwiOiBcIuijleWbuuaXj1wiLFxuICAgICAgXCJCb25hblwiOiBcIuS/neWuieaXj1wiLFxuICAgICAgXCJNZW5iYVwiOiBcIumXqOW3tOaXj1wiLFxuICAgICAgXCJPcm9xaW5cIjogXCLphILkvKbmmKXml49cIixcbiAgICAgIFwiRHJ1bmdcIjogXCLni6zpvpnml49cIixcbiAgICAgIFwiVGF0YXJcIjogXCLloZTloZTlsJTml49cIixcbiAgICAgIFwiSGV6aGVuXCI6IFwi6LWr5ZOy5pePXCIsXG4gICAgICBcIkxob2JhXCI6IFwi54+e5be05pePXCIsXG4gICAgICBcIkdhb3NoYW5cIjogXCLpq5jlsbHml49cIlxuICAgIH0sXG4gICAgXCJNYXJpdGFsU3RhdHVzXCI6IHtcbiAgICAgIFwiTUFSUklFRFwiOiBcIuW3suWpmlwiLFxuICAgICAgXCJTSU5HTEVcIjogXCLmnKrlqZpcIixcbiAgICAgIFwiRElWT1JDRURcIjogXCLnprvlvIJcIixcbiAgICAgIFwiV0lET1dFRFwiOiBcIuS4p+WBtlwiXG4gICAgfSxcbiAgICBcIkNlcnRpZmljYXRlVHlwZVwiOiB7XG4gICAgICBcIklEXCI6IFwi6Lqr5Lu96K6k6K+BXCIsXG4gICAgICBcIkNSRURJVFJFUE9SVFwiOiBcIuS/oeeUqOaKpeWRilwiLFxuICAgICAgXCJGQU1JTFlcIjogXCLlrrbluq3mg4XlhrXorqTor4FcIixcbiAgICAgIFwiRURVQ0FUSU9OXCI6IFwi5a2m5Y6G6K6k6K+BXCIsXG4gICAgICBcIklOQ09NRVwiOiBcIuaUtuWFpeiupOivgVwiLFxuICAgICAgXCJDQVJFRVJcIjogXCLlt6XkvZzorqTor4FcIixcbiAgICAgIFwiUkVBTEVTVEFURVwiOiBcIuaIv+S6p+iupOivgVwiLFxuICAgICAgXCJMT0NBVElPTlwiOiBcIuWxheS9j+WcsOiupOivgVwiLFxuICAgICAgXCJWRUhJQ0xFXCI6IFwi6LSt6L2m6K6k6K+BXCIsXG4gICAgICBcIkxPQU5QVVJQT1NFXCI6IFwi5YCf5qy+55So6YCU6K6k6K+BXCIsXG4gICAgICBcIkdVQVJBTlRFRVwiOiBcIuaLheS/neiupOivgVwiLFxuICAgICAgXCJPVEhFUlNcIjogXCLlhbbku5borqTor4FcIlxuICAgIH0sXG4gICAgXCJDZXJ0aWZpY2F0ZVN0YXR1c1wiOiB7XG4gICAgICBcIlVOQ0hFQ0tFRFwiOiBcIuacquWuoeaguFwiLFxuICAgICAgXCJDSEVDS0VEXCI6IFwi5a6h5qC46YCa6L+HXCIsXG4gICAgICBcIkRFTklFRFwiOiBcIuWuoeaguOacqumAmui/h1wiLFxuICAgICAgXCJBUkNISVZFRFwiOiBcIuW3suWtmOaho1wiLFxuICAgICAgXCJERUxFVEVEXCI6IFwi5bey5Yiq6ZmkXCJcbiAgICB9LFxuICAgIFwiUHJvb2ZUeXBlXCI6IHtcbiAgICAgIFwiSURfQ0FSRFwiOiBbXCLouqvku73or4FcIiwgXCJJRFwiXSxcbiAgICAgIFwiSURfSFVLT1VcIjogW1wi5oi35Y+j5pysXCIsIFwiSURcIl0sXG4gICAgICBcIklEX1NPQ0lBTF9TRUNVUklUWVwiOiBbXCLnpL7kv51cIiwgXCJJRFwiXSxcbiAgICAgIFwiSURfRFJJVkVfTElDRU5DRVwiOiBbXCLpqb7nhadcIiwgXCJJRFwiXSxcbiAgICAgIFwiSURfTUFSSVRBTFwiOiBbXCLnu5PlqZror4FcIiwgXCJJRFwiXSxcbiAgICAgIFwiSURfRElWT1JTRVwiOiBbXCLnprvlqZror4FcIiwgXCJJRFwiXSxcbiAgICAgIFwiSURfVklERU9cIjogW1wi5pys5Lq66KeG6aKRXCIsIFwiSURcIl0sXG4gICAgICBcIklEX09USEVSXCI6IFtcIuWFtuS7luS4quS6uui6q+S7veivgeaYjlwiLCBcIklEXCJdLFxuICAgICAgXCJDQVJFRVJfTEFCT1VSX0NPTlRSQUNUXCI6IFtcIuWKs+WKqOWQiOWQjFwiLCBcIkNBUkVFUlwiXSxcbiAgICAgIFwiQ0FSRUVSX0xBQk9VUl9DRVJUSUZJQ0FURVwiOiBbXCLmioDmnK/ogYznp7Dlj4rmioDog73orqTor4FcIiwgXCJDQVJFRVJcIl0sXG4gICAgICBcIkNBUkVFUl9CVVNJTkVTU19MSUNFTkNFXCI6IFtcIuiQpeS4muaJp+eFp1wiLCBcIkNBUkVFUlwiXSxcbiAgICAgIFwiQ0FSRUVSX1RBWF9SRUdJU1RSQVRJT05cIjogW1wi56iO5Yqh55m76K6w6K+BXCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJDQVJFRVJfT1JHQU5JWkFUSU9OX1JFR0lTVFJBVElPTlwiOiBbXCLnu4Tnu4fmnLrmnoTku6PnoIHor4FcIiwgXCJDQVJFRVJcIl0sXG4gICAgICBcIkNBUkVFUl9TQU5JVEFSWV9MSUNFTkNFXCI6IFtcIuWNq+eUn+iuuOWPr+ivgVwiLCBcIkNBUkVFUlwiXSxcbiAgICAgIFwiQ0FSRUVSX0JVU0lORVNTX0NPTlRSQUNUXCI6IFtcIue7j+iQpeebuOWFs+WQiOWQjOWPiuWQiOS9nOWNj+iurlwiLCBcIkNBUkVFUlwiXSxcbiAgICAgIFwiQ0FSRUVSX0JVU0lORVNTX0NFUlRJRklDQVRFXCI6IFtcIue7j+iQpeebuOWFs+iuuOWPr+ivgVwiLCBcIkNBUkVFUlwiXSxcbiAgICAgIFwiQ0FSRUVSX0JVU0lORVNTX1BMQUNFXCI6IFtcIue7j+iQpeaIluaWveW3peWcuuaJgFwiLCBcIkNBUkVFUlwiXSxcbiAgICAgIFwiQ0FSRUVSX0NPUlBfQ09WRVJcIjogW1wi5LyB5Lia5aSn5Zu+XCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJDQVJFRVJfQ09SUF9MT0dPXCI6IFtcIuS8geS4mkxvZ29cIiwgXCJDQVJFRVJcIl0sXG4gICAgICBcIkNBUkVFUl9DT1JQX0lDT05cIjogW1wi5LyB5LiaSWNvblwiLCBcIkNBUkVFUlwiXSxcbiAgICAgIFwiQ0FSRUVSX0NPUlBfQ09NTUlUTUVOVF9MRVRURVJcIjogW1wi5LyB5Lia5om/6K+65Ye9XCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJDQVJFRVJfT1RIRVJcIjogW1wi5YW25LuW5bel5L2c55u45YWz6K+B5piOXCIsIFwiQ0FSRUVSXCJdLFxuICAgICAgXCJJTkNPTUVfQkFOS0FDQ09VTlRcIjogW1wi6ZO26KGM5rWB5rC0XCIsIFwiSU5DT01FXCJdLFxuICAgICAgXCJJTkNPTUVfU0FMQVJZXCI6IFtcIuW3pei1hOivgeaYjlwiLCBcIklOQ09NRVwiXSxcbiAgICAgIFwiSU5DT01FX09USEVSXCI6IFtcIuWFtuS7luaUtuWFpeivgeaYjlwiLCBcIklOQ09NRVwiXSxcbiAgICAgIFwiUkVfSE9VU0VfUFJPUEVSVFlcIjogW1wi5L2P5oi/5p2D6K+B5oiW5ZCI5ZCMXCIsIFwiUkVBTEVTVEFURVwiXSxcbiAgICAgIFwiUkVfSE9VU0VfUElDVFVSRVwiOiBbXCLkvY/miL/nhafniYdcIiwgXCJSRUFMRVNUQVRFXCJdLFxuICAgICAgXCJSRV9MQU5EX1BST1BFUlRZXCI6IFtcIuWcn+WcsOadg+ivgeaIluWQiOWQjFwiLCBcIlJFQUxFU1RBVEVcIl0sXG4gICAgICBcIlJFX0xBTkRfUElDVFVSRVwiOiBbXCLlnJ/lnLDnhafniYdcIiwgXCJSRUFMRVNUQVRFXCJdLFxuICAgICAgXCJSRV9GQUNUT1JZX1BST1BFUlRZXCI6IFtcIuWOguaIv+S7k+W6k+adg+ivgeaIluWQiOWQjFwiLCBcIlJFQUxFU1RBVEVcIl0sXG4gICAgICBcIlJFX0ZBQ1RPUllfUElDVFVSRVwiOiBbXCLljoLmiL/ku5PlupPnhafniYdcIiwgXCJSRUFMRVNUQVRFXCJdLFxuICAgICAgXCJSRl9PVEhFUlwiOiBbXCLlhbbku5bmiL/kuqfnm7jlhbPor4HmmI5cIiwgXCJSRUFMRVNUQVRFXCJdLFxuICAgICAgXCJWRUhJQ0xFX0xJQ0VOQ0VcIjogW1wi6KGM6am26K+BXCIsIFwiVkVISUNMRVwiXSxcbiAgICAgIFwiVkVISUNMRV9QUk9QRVJUWVwiOiBbXCLovabovobmnYPor4HmiJblkIjlkIzlj5HnpahcIiwgXCJWRUhJQ0xFXCJdLFxuICAgICAgXCJWRUhJQ0xFX1BMQVRFXCI6IFtcIui9pueJjOWPt1wiLCBcIlZFSElDTEVcIl0sXG4gICAgICBcIlZFSElDTEVfUElDVFVSRVwiOiBbXCLovabovobnhafniYdcIiwgXCJWRUhJQ0xFXCJdLFxuICAgICAgXCJWRUhJQ0xFX09USEVSXCI6IFtcIuWFtuS7lui9pui+huebuOWFs+ivgeaYjlwiLCBcIlZFSElDTEVcIl0sXG4gICAgICBcIkdVQVJBTlRFRV9JRFwiOiBbXCLlgJ/mrL7mi4Xkv53kurrouqvku71cIiwgXCJHVUFSQU5URUVcIl0sXG4gICAgICBcIkdVQVJBTlRFRV9SRUFMRVNUQVRFXCI6IFtcIuWAn+asvuaLheS/neS6uuaIv+S6p1wiLCBcIkdVQVJBTlRFRVwiXSxcbiAgICAgIFwiR1VBUkFOVEVFX0NPTlRSQUNUXCI6IFtcIuWAn+asvuaLheS/neWQiOWQjOaIluaWh+S7tlwiLCBcIkdVQVJBTlRFRVwiXSxcbiAgICAgIFwiR1VBUkFOVEVFX09USEVSXCI6IFtcIuWFtuS7luWAn+asvuaLheS/neebuOWFs+ivgeaYjlwiLCBcIkdVQVJBTlRFRVwiXSxcbiAgICAgIFwiRkFDVE9SSU5HX0hJU1RPUllcIjogW1wi5Y6G5Y+y5Lqk5piTXCIsIFwiRkFDVE9SSU5HXCJdLFxuICAgICAgXCJGQUNUT1JJTkdfUFJPSkVDVFwiOiBbXCLkv53nkIbpobnnm65cIiwgXCJGQUNUT1JJTkdcIl0sXG4gICAgICBcIkZBQ1RPUklOR19BTlRJXCI6IFtcIuWPjeS/neeQhuaOquaWvVwiLCBcIkZBQ1RPUklOR1wiXSxcbiAgICAgIFwiRkFDVE9SSU5HX0ZJTkFOQ0VfQ09SUFwiOiBbXCLono3otYTkvIHkuJpcIiwgXCJGQUNUT1JJTkdcIl0sXG4gICAgICBcIkNSRURJVFJFUE9SVFwiOiBbXCLkv6HnlKjmiqXlkYpcIiwgXCJDUkVESVRSRVBPUlRcIl0sXG4gICAgICBcIkxPQU5QVVJQT1NFXCI6IFtcIui0t+asvueUqOmAlFwiLCBcIkxPQU5QVVJQT1NFXCJdLFxuICAgICAgXCJGQU1JTFlcIjogW1wi5a625bqt5oOF5Ya1XCIsIFwiRkFNSUxZXCJdLFxuICAgICAgXCJFRFVDQVRJT05cIjogW1wi5a2m5Y6GXCIsIFwiRURVQ0FUSU9OXCJdLFxuICAgICAgXCJMT0NBVElPTlwiOiBbXCLlsYXkvY/lnLBcIiwgXCJMT0NBVElPTlwiXSxcbiAgICAgIFwiT1RIRVJfU0lOQV9XRUlCT1wiOiBbXCLmlrDmtarlvq7ljZpcIiwgXCJPVEhFUlNcIl0sXG4gICAgICBcIk9USEVSX1RFQ0VOVF9XRUlCT1wiOiBbXCLohb7orq/lvq7ljZpcIiwgXCJPVEhFUlNcIl0sXG4gICAgICBcIk9USEVSX1FRXCI6IFtcIuiFvuiur1FRXCIsIFwiT1RIRVJTXCJdLFxuICAgICAgXCJGVU5ESU5HUFJPSkVDVF9CQU5ORVJcIjogW1wi6aaW5bGP5Zu+54mHXCIsIFwiQ1JPV0RGVU5ESU5HXCJdLFxuICAgICAgXCJGVU5ESU5HUFJPSkVDVF9QUkVcIjogW1wi6aKE54Ot5Zu+54mHXCIsIFwiQ1JPV0RGVU5ESU5HXCJdLFxuICAgICAgXCJGVU5ESU5HUFJPSkVDVF9QUk9KRUNUXCI6IFtcIumhueebruWbvueJh1wiLCBcIkNST1dERlVORElOR1wiXSxcbiAgICAgIFwiRlVORElOR1BST0pFQ1RfTU9CSUxFXCI6IFtcIuenu+WKqOerr+WbvueJh1wiLCBcIkNST1dERlVORElOR1wiXSxcbiAgICAgIFwiSU5WRVNUTUVOVF9GVU5EX09WRVJWSUVXXCI6IFtcIuWfuumHkeamguWGtVwiLCBcIklOVkVTVE1FTlRGVU5EXCJdLFxuICAgICAgXCJJTlZFU1RNRU5UX0ZVTkRfQ0hBUlRcIjogW1wi5Z+66YeR5Zu+6KGoXCIsIFwiSU5WRVNUTUVOVEZVTkRcIl0sXG4gICAgICBcIklOVkVTVE1FTlRfRlVORF9BU1NFVF9NQU5BR0VcIjogW1wi6LWE5Lqn566h55CGXCIsIFwiSU5WRVNUTUVOVEZVTkRcIl0sXG4gICAgICBcIklOVkVTVE1FTlRfRlVORF9GRUVTX0xFVkVMXCI6IFtcIui0ueeOh+awtOW5s1wiLCBcIklOVkVTVE1FTlRGVU5EXCJdLFxuICAgICAgXCJJTlNVUkFOQ0VfT1ZFUlZJRVdcIjogW1wi5L+d6Zmp5qaC5Ya1XCIsIFwiSU5TVVJBTkNFXCJdLFxuICAgICAgXCJJTlNVUkFOQ0VfQ0hBUlRcIjogW1wi5oqV6LWE5pa55ZCR5Y+K6LWE5Lqn6YWN572uXCIsIFwiSU5TVVJBTkNFXCJdLFxuICAgICAgXCJJTlNVUkFOQ0VfQ0FTRV9ERU1PXCI6IFtcIuahiOS+i+a8lOekulwiLCBcIklOU1VSQU5DRVwiXSxcbiAgICAgIFwiT1JERVJfSURfQ0FSRF9GUk9OVFwiOiBbXCLouqvku73or4HmraPpnaJcIiwgXCJPUkRFUl9EQVRBXCJdLFxuICAgICAgXCJPUkRFUl9JRF9DQVJEX0JBQ0tcIjogW1wi6Lqr5Lu96K+B5Y+N6Z2iXCIsIFwiT1JERVJfREFUQVwiXSxcbiAgICAgIFwiT1JERVJfQkFOS19BQ0NPVU5UX0ZST05UXCI6IFtcIumTtuihjOWNoeato+mdolwiLCBcIk9SREVSX0RBVEFcIl0sXG4gICAgICBcIk9SREVSX1BBSURfREFUQVwiOiBbXCLmiZPmrL7lh63or4FcIiwgXCJPUkRFUl9EQVRBXCJdLFxuICAgICAgXCJPUkRFUl9DT05UUkFDVFwiOiBbXCLorqLljZXlkIjlkIxcIiwgXCJPUkRFUl9EQVRBXCJdLFxuICAgICAgXCJXRUFMVEhQUk9EVUNUX09WRVJWSUVXXCI6IFtcIueQhui0ouS6p+WTgeamguWGtVwiLCBcIldFQUxUSFBST0RVQ1RcIl0sXG4gICAgICBcIldFQUxUSFBST0RVQ1RfUkVQT1JUXCI6IFtcIueQhui0ouS6p+WTgeeuoeeQhuaKpeWRilwiLCBcIldFQUxUSFBST0RVQ1RcIl1cbiAgICB9LFxuICAgIFwiQmFua1wiOiB7XG4gICAgICBcIklDQkNcIjogXCLkuK3lm73lt6XllYbpk7booYxcIixcbiAgICAgIFwiQUJDXCI6IFwi5Lit5Zu95Yac5Lia6ZO26KGMXCIsXG4gICAgICBcIkNNQlwiOiBcIuaLm+WVhumTtuihjFwiLFxuICAgICAgXCJDQ0JcIjogXCLlu7rorr7pk7booYxcIixcbiAgICAgIFwiQkNDQlwiOiBcIuWMl+S6rOmTtuihjFwiLFxuICAgICAgXCJCSlJDQlwiOiBcIuWMl+S6rOWGnOadkeWVhuS4mumTtuihjFwiLFxuICAgICAgXCJCT0NcIjogXCLkuK3lm73pk7booYxcIixcbiAgICAgIFwiQk9DT01cIjogXCLkuqTpgJrpk7booYxcIixcbiAgICAgIFwiQ01CQ1wiOiBcIuawkeeUn+mTtuihjFwiLFxuICAgICAgXCJCT1NcIjogXCLkuIrmtbfpk7booYxcIixcbiAgICAgIFwiQ0JIQlwiOiBcIua4pOa1t+mTtuihjFwiLFxuICAgICAgXCJDRUJcIjogXCLlhYnlpKfpk7booYxcIixcbiAgICAgIFwiQ0lCXCI6IFwi5YW05Lia6ZO26KGMXCIsXG4gICAgICBcIkNJVElDXCI6IFwi5Lit5L+h6ZO26KGMXCIsXG4gICAgICBcIkNaQlwiOiBcIua1meWVhumTtuihjFwiLFxuICAgICAgXCJHREJcIjogXCLlub/lj5Hpk7booYxcIixcbiAgICAgIFwiSEtCRUFcIjogXCLkuJzkuprpk7booYxcIixcbiAgICAgIFwiSFhCXCI6IFwi5Y2O5aSP6ZO26KGMXCIsXG4gICAgICBcIkhaQ0JcIjogXCLmna3lt57pk7booYxcIixcbiAgICAgIFwiTkpDQlwiOiBcIuWNl+S6rOmTtuihjFwiLFxuICAgICAgXCJQSU5HQU5cIjogXCLlubPlronpk7booYxcIixcbiAgICAgIFwiUFNCQ1wiOiBcIumCruaUv+WCqOiThOmTtuihjFwiLFxuICAgICAgXCJTREJcIjogXCLmt7Hlj5Hpk7booYxcIixcbiAgICAgIFwiU1BEQlwiOiBcIua1puWPkemTtuihjFwiLFxuICAgICAgXCJTUkNCXCI6IFwi5LiK5rW35Yac5p2R5ZWG5Lia6ZO26KGMXCJcbiAgICB9LFxuICAgIFwiQ3JlZGl0UmFua1wiOiB7XG4gICAgICBcIkhSXCI6IFwiOTktMFwiLFxuICAgICAgXCJFXCI6IFwiMTA5LTEwMFwiLFxuICAgICAgXCJEXCI6IFwiMTE5LTExMFwiLFxuICAgICAgXCJDXCI6IFwiMTI5LTEyMFwiLFxuICAgICAgXCJCXCI6IFwiMTQ0LTEzMFwiLFxuICAgICAgXCJBXCI6IFwiMTU5LTE0NVwiLFxuICAgICAgXCJBQVwiOiBcIjE2MOWPiuS7peS4ilwiXG4gICAgfSxcbiAgICBcIkxvYW5QdXJwb3NlXCI6IHtcbiAgICAgIFwiU0hPUlRURVJNXCI6IFwi55+t5pyf5ZGo6L2sXCIsXG4gICAgICBcIlBFUlNPTkFMXCI6IFwi5Liq5Lq65raI6LS5XCIsXG4gICAgICBcIklOVkVTVE1FTlRcIjogXCLmipXotYTliJvkuJpcIixcbiAgICAgIFwiQ0FSXCI6IFwi6L2m6L6G6J6N6LWEXCIsXG4gICAgICBcIkhPVVNFXCI6IFwi5oi/5Lqn6J6N6LWEXCIsXG4gICAgICBcIkNPUlBPUkFUSU9OXCI6IFwi5LyB5Lia6J6N6LWEXCIsXG4gICAgICBcIk9USEVSXCI6IFwi5YW25a6D5YCf5qy+XCJcbiAgICB9LFxuICAgIFwiUmVwYXltZW50TWV0aG9kXCI6IHtcbiAgICAgIFwiTW9udGhseUludGVyZXN0XCI6IFtcIuaMieaciOS7mOaBr+WIsOacn+i/mOacrFwiLCBcIui/mOasvuWOi+WKm+Wwj1wiXSxcbiAgICAgIFwiRXF1YWxJbnN0YWxsbWVudFwiOiBbXCLmjInmnIjnrYnpop3mnKzmga9cIiwgXCLov5jmrL7kvr/mjbdcIl0sXG4gICAgICBcIkVxdWFsUHJpbmNpcGFsXCI6IFtcIuaMieaciOetiemineacrOmHkVwiLCBcIuaAu+WIqeaBr+acgOS9jlwiXSxcbiAgICAgIFwiQnVsbGV0UmVwYXltZW50XCI6IFtcIuS4gOasoeaAp+i/mOacrOS7mOaBr1wiLCBcIuefreacn+mmlumAiVwiXSxcbiAgICAgIFwiRXF1YWxJbnRlcmVzdFwiOiBbXCLmnIjlubPmga9cIiwgXCLlrp7pmYXliKnnjofmnIDpq5hcIl0sXG4gICAgICBcIlllYXJseUludGVyZXN0XCI6IFtcIuaMieW5tOS7mOaBr+WIsOacn+i/mOacrFwiLCBcIui/mOasvuWOi+WKm+Wwj1wiXVxuICAgIH0sXG5cdFwiUmVwYXltZW50U3RhdHVzXCI6IHtcbiAgICAgIFwiVU5EVUVcIjogXCLmnKrliLDmnJ9cIixcbiAgICAgIFwiT1ZFUkRVRVwiOiBcIumAvuacn1wiLFxuICAgICAgXCJCUkVBQ0hcIjogXCLov53nuqZcIixcbiAgICAgIFwiUkVQQVlFRFwiOiBcIuW3sui/mOa4hVwiXG4gICAgfSxcbiAgICBcIkxvYW5TdGF0dXNcIjoge1xuICAgICAgXCJVTkFTU0lHTkVEXCI6IFwi5pyq5aSE55CGXCIsXG4gICAgICBcIklOSVRJQVRFRFwiOiBcIuWIneWni1wiLFxuICAgICAgXCJTQ0hFRFVMRURcIjogXCLlt7LlronmjpJcIixcbiAgICAgIFwiT1BFTkVEXCI6IFwi5byA5pS+5oqV5qCHXCIsXG4gICAgICBcIkZBSUxFRFwiOiBcIua1geagh1wiLFxuICAgICAgXCJGSU5JU0hFRFwiOiBcIuW3sua7oeagh1wiLFxuICAgICAgXCJDQU5DRUxFRFwiOiBcIuW3suWPlua2iFwiLFxuICAgICAgXCJTRVRUTEVEXCI6IFwi5bey57uT566XXCIsXG4gICAgICBcIkNMRUFSRURcIjogXCLlt7Lov5jmuIVcIixcbiAgICAgIFwiT1ZFUkRVRVwiOiBcIumAvuacn1wiLFxuICAgICAgXCJCUkVBQ0hcIjogXCLov53nuqZcIixcbiAgICAgIFwiQVJDSElWRURcIjogXCLlt7LlrZjmoaNcIlxuICAgIH0sXG4gICAgXCJCaWRNZXRob2RcIjoge1xuICAgICAgXCJBVVRPXCI6IFwi6Ieq5Yqo5oqV5qCHXCIsXG4gICAgICBcIk1BTlVBTFwiOiBcIuaJi+WKqOaKleagh1wiLFxuICAgICAgXCJXRUFMVEhQUk9EVUNUXCI6IFwi55CG6LSi5Lqn5ZOBXCJcbiAgICB9LFxuICAgIFwiTW9ydGdhZ2VUeXBlXCI6IHtcbiAgICAgIFwiUkVfSE9VU0VcIjogXCLmiL/kuqdcIixcbiAgICAgIFwiUkVfTEFORFwiOiBcIuWcn+WcsCjljIXmi6zlsbHmnpfmuJTniacpXCIsXG4gICAgICBcIlJFX0ZBQ1RPUllcIjogXCLljoLmiL/lupPmiL9cIixcbiAgICAgIFwiQ09NTU9ORElUWVwiOiBcIuWVhuWTgeW6k+WtmFwiLFxuICAgICAgXCJWRUhJQ0xFXCI6IFwi6L2m6L6GXCIsXG4gICAgICBcIkVRVUlQTUVOVFwiOiBcIuiuvuWkh+WZqOadkFwiLFxuICAgICAgXCJTRUNVUklUSUVTXCI6IFwi6K+B5Yi4XCIsXG4gICAgICBcIkJPTkRcIjogXCLlgLrliLhcIixcbiAgICAgIFwiU1RPQ0tcIjogXCLogqHnpahcIixcbiAgICAgIFwiREVQT1NJVF9SRUNFSVBUXCI6IFwi6ZO26KGM5a2Y5Y2VXCIsXG4gICAgICBcIk9USEVSXCI6IFwi5YW25LuWXCJcbiAgICB9LFxuICAgIFwiTG9hblJlcXVlc3RTdGF0dXNcIjoge1xuICAgICAgXCJVTkFTU0lHTkVEXCI6IFwi5pyq5aSE55CGXCIsXG4gICAgICBcIkFTU0lHTkVEXCI6IFwi5aSE55CG5LitXCIsXG4gICAgICBcIkNBTkNFTEVEXCI6IFwi5bey5Y+W5raIXCIsXG4gICAgICBcIlBFTkRJTkdfVklTSVRcIjogXCLlrp7lnLDlvoHkv6FcIixcbiAgICAgIFwiUEVORElOR19SSVNLXCI6IFwi6aOO5o6n5a6h5qC4XCIsXG4gICAgICBcIlBFTkRJTkdfQVBQT1JWRVwiOiBcIuW+heaJueWHhlwiLFxuICAgICAgXCJBUFBST1ZFRFwiOiBcIuW3suaJueWHhlwiLFxuICAgICAgXCJSRUpFQ1RFRFwiOiBcIuW3sumps+WbnlwiLFxuICAgICAgXCJQVUJMSVNIRURcIjogXCLlt7Llj5HmlL5cIixcbiAgICAgIFwiQVJDSElWRURcIjogXCLlt7LlrZjmoaNcIixcbiAgICAgIFwiREVMRVRFRFwiOiBcIuW3suWIqumZpFwiXG4gICAgfSxcbiAgICBcIkh1a291VHlwZVwiOiB7XG4gICAgICBcIkFHUklDVUxUVVJFXCI6IFwi5Yac5Lia5oi35Y+jXCIsXG4gICAgICBcIlVSQkFOXCI6IFwi5Z+O6ZWH5oi35Y+jXCJcbiAgICB9LFxuICAgIFwiSG91c2VTdGF0dXNcIjoge1xuICAgICAgXCJDT01NRVJDSUFMX0xPQU5cIjogXCLllYbkuJrotLfmrL5cIixcbiAgICAgIFwiSEFGX0xPQU5cIjogXCLlhaznp6/ph5HotLfmrL5cIixcbiAgICAgIFwiQ09NUE9TSVRFX0xPQU5cIjogXCLnu4TlkIjotLfmrL5cIixcbiAgICAgIFwiU0VMRl9PV05FRFwiOiBcIuiHquacieS9j+aIv1wiLFxuICAgICAgXCJSRU5UXCI6IFwi56ef5oi/XCIsXG4gICAgICBcIk9USEVSXCI6IFwi5YW25LuWXCJcbiAgICB9LFxuICAgIFwiSW52ZXN0U3RhdHVzXCI6IHtcbiAgICAgIFwiUFJPUE9TRURcIjogXCLnlLPor7fmipXmoIdcIixcbiAgICAgIFwiRlJPWkVOXCI6IFwi6LSm5oi36LWE6YeR5Ya757uTXCIsXG4gICAgICBcIkZST1pFTl9GQUlMRURcIjogXCLotYTph5Hlhrvnu5PlpLHotKVcIixcbiAgICAgIFwiRkFJTEVEXCI6IFwi5rWB5qCHXCIsXG4gICAgICBcIkZJTklTSEVEXCI6IFwi5oqV5qCH5oiQ5YqfXCIsXG4gICAgICBcIkNBTkNFTEVEXCI6IFwi5bey5Y+W5raIXCIsXG4gICAgICBcIlNFVFRMRURcIjogXCLlt7Lnu5PnrpdcIixcbiAgICAgIFwiQ0xFQVJFRFwiOiBcIui/mOasvuWujOaIkFwiLFxuICAgICAgXCJPVkVSRFVFXCI6IFwi6YC+5pyfXCIsXG4gICAgICBcIkJSRUFDSFwiOiBcIui/nee6plwiXG4gICAgfVxuICB9XG59XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogY2Fyb3VzZWwuanMgdjMuMy42XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNjYXJvdXNlbFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE1IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENBUk9VU0VMIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBDYXJvdXNlbCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCAgICA9ICQoZWxlbWVudClcbiAgICB0aGlzLiRpbmRpY2F0b3JzID0gdGhpcy4kZWxlbWVudC5maW5kKCcuY2Fyb3VzZWwtaW5kaWNhdG9ycycpXG4gICAgdGhpcy5vcHRpb25zICAgICA9IG9wdGlvbnNcbiAgICB0aGlzLnBhdXNlZCAgICAgID0gbnVsbFxuICAgIHRoaXMuc2xpZGluZyAgICAgPSBudWxsXG4gICAgdGhpcy5pbnRlcnZhbCAgICA9IG51bGxcbiAgICB0aGlzLiRhY3RpdmUgICAgID0gbnVsbFxuICAgIHRoaXMuJGl0ZW1zICAgICAgPSBudWxsXG5cbiAgICB0aGlzLm9wdGlvbnMua2V5Ym9hcmQgJiYgdGhpcy4kZWxlbWVudC5vbigna2V5ZG93bi5icy5jYXJvdXNlbCcsICQucHJveHkodGhpcy5rZXlkb3duLCB0aGlzKSlcblxuICAgIHRoaXMub3B0aW9ucy5wYXVzZSA9PSAnaG92ZXInICYmICEoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSAmJiB0aGlzLiRlbGVtZW50XG4gICAgICAub24oJ21vdXNlZW50ZXIuYnMuY2Fyb3VzZWwnLCAkLnByb3h5KHRoaXMucGF1c2UsIHRoaXMpKVxuICAgICAgLm9uKCdtb3VzZWxlYXZlLmJzLmNhcm91c2VsJywgJC5wcm94eSh0aGlzLmN5Y2xlLCB0aGlzKSlcbiAgfVxuXG4gIENhcm91c2VsLlZFUlNJT04gID0gJzMuMy42J1xuXG4gIENhcm91c2VsLlRSQU5TSVRJT05fRFVSQVRJT04gPSA2MDBcblxuICBDYXJvdXNlbC5ERUZBVUxUUyA9IHtcbiAgICBpbnRlcnZhbDogNTAwMCxcbiAgICBwYXVzZTogJ2hvdmVyJyxcbiAgICB3cmFwOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZS50YXJnZXQudGFnTmFtZSkpIHJldHVyblxuICAgIHN3aXRjaCAoZS53aGljaCkge1xuICAgICAgY2FzZSAzNzogdGhpcy5wcmV2KCk7IGJyZWFrXG4gICAgICBjYXNlIDM5OiB0aGlzLm5leHQoKTsgYnJlYWtcbiAgICAgIGRlZmF1bHQ6IHJldHVyblxuICAgIH1cblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmN5Y2xlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlIHx8ICh0aGlzLnBhdXNlZCA9IGZhbHNlKVxuXG4gICAgdGhpcy5pbnRlcnZhbCAmJiBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpXG5cbiAgICB0aGlzLm9wdGlvbnMuaW50ZXJ2YWxcbiAgICAgICYmICF0aGlzLnBhdXNlZFxuICAgICAgJiYgKHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgkLnByb3h5KHRoaXMubmV4dCwgdGhpcyksIHRoaXMub3B0aW9ucy5pbnRlcnZhbCkpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmdldEl0ZW1JbmRleCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdGhpcy4kaXRlbXMgPSBpdGVtLnBhcmVudCgpLmNoaWxkcmVuKCcuaXRlbScpXG4gICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmluZGV4KGl0ZW0gfHwgdGhpcy4kYWN0aXZlKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmdldEl0ZW1Gb3JEaXJlY3Rpb24gPSBmdW5jdGlvbiAoZGlyZWN0aW9uLCBhY3RpdmUpIHtcbiAgICB2YXIgYWN0aXZlSW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleChhY3RpdmUpXG4gICAgdmFyIHdpbGxXcmFwID0gKGRpcmVjdGlvbiA9PSAncHJldicgJiYgYWN0aXZlSW5kZXggPT09IDApXG4gICAgICAgICAgICAgICAgfHwgKGRpcmVjdGlvbiA9PSAnbmV4dCcgJiYgYWN0aXZlSW5kZXggPT0gKHRoaXMuJGl0ZW1zLmxlbmd0aCAtIDEpKVxuICAgIGlmICh3aWxsV3JhcCAmJiAhdGhpcy5vcHRpb25zLndyYXApIHJldHVybiBhY3RpdmVcbiAgICB2YXIgZGVsdGEgPSBkaXJlY3Rpb24gPT0gJ3ByZXYnID8gLTEgOiAxXG4gICAgdmFyIGl0ZW1JbmRleCA9IChhY3RpdmVJbmRleCArIGRlbHRhKSAlIHRoaXMuJGl0ZW1zLmxlbmd0aFxuICAgIHJldHVybiB0aGlzLiRpdGVtcy5lcShpdGVtSW5kZXgpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUudG8gPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgdmFyIHRoYXQgICAgICAgID0gdGhpc1xuICAgIHZhciBhY3RpdmVJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KHRoaXMuJGFjdGl2ZSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLml0ZW0uYWN0aXZlJykpXG5cbiAgICBpZiAocG9zID4gKHRoaXMuJGl0ZW1zLmxlbmd0aCAtIDEpIHx8IHBvcyA8IDApIHJldHVyblxuXG4gICAgaWYgKHRoaXMuc2xpZGluZykgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQub25lKCdzbGlkLmJzLmNhcm91c2VsJywgZnVuY3Rpb24gKCkgeyB0aGF0LnRvKHBvcykgfSkgLy8geWVzLCBcInNsaWRcIlxuICAgIGlmIChhY3RpdmVJbmRleCA9PSBwb3MpIHJldHVybiB0aGlzLnBhdXNlKCkuY3ljbGUoKVxuXG4gICAgcmV0dXJuIHRoaXMuc2xpZGUocG9zID4gYWN0aXZlSW5kZXggPyAnbmV4dCcgOiAncHJldicsIHRoaXMuJGl0ZW1zLmVxKHBvcykpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUgfHwgKHRoaXMucGF1c2VkID0gdHJ1ZSlcblxuICAgIGlmICh0aGlzLiRlbGVtZW50LmZpbmQoJy5uZXh0LCAucHJldicpLmxlbmd0aCAmJiAkLnN1cHBvcnQudHJhbnNpdGlvbikge1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZClcbiAgICAgIHRoaXMuY3ljbGUodHJ1ZSlcbiAgICB9XG5cbiAgICB0aGlzLmludGVydmFsID0gY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnNsaWRpbmcpIHJldHVyblxuICAgIHJldHVybiB0aGlzLnNsaWRlKCduZXh0JylcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnNsaWRpbmcpIHJldHVyblxuICAgIHJldHVybiB0aGlzLnNsaWRlKCdwcmV2JylcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5zbGlkZSA9IGZ1bmN0aW9uICh0eXBlLCBuZXh0KSB7XG4gICAgdmFyICRhY3RpdmUgICA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLml0ZW0uYWN0aXZlJylcbiAgICB2YXIgJG5leHQgICAgID0gbmV4dCB8fCB0aGlzLmdldEl0ZW1Gb3JEaXJlY3Rpb24odHlwZSwgJGFjdGl2ZSlcbiAgICB2YXIgaXNDeWNsaW5nID0gdGhpcy5pbnRlcnZhbFxuICAgIHZhciBkaXJlY3Rpb24gPSB0eXBlID09ICduZXh0JyA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgICB2YXIgdGhhdCAgICAgID0gdGhpc1xuXG4gICAgaWYgKCRuZXh0Lmhhc0NsYXNzKCdhY3RpdmUnKSkgcmV0dXJuICh0aGlzLnNsaWRpbmcgPSBmYWxzZSlcblxuICAgIHZhciByZWxhdGVkVGFyZ2V0ID0gJG5leHRbMF1cbiAgICB2YXIgc2xpZGVFdmVudCA9ICQuRXZlbnQoJ3NsaWRlLmJzLmNhcm91c2VsJywge1xuICAgICAgcmVsYXRlZFRhcmdldDogcmVsYXRlZFRhcmdldCxcbiAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uXG4gICAgfSlcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc2xpZGVFdmVudClcbiAgICBpZiAoc2xpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB0aGlzLnNsaWRpbmcgPSB0cnVlXG5cbiAgICBpc0N5Y2xpbmcgJiYgdGhpcy5wYXVzZSgpXG5cbiAgICBpZiAodGhpcy4kaW5kaWNhdG9ycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuJGluZGljYXRvcnMuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgdmFyICRuZXh0SW5kaWNhdG9yID0gJCh0aGlzLiRpbmRpY2F0b3JzLmNoaWxkcmVuKClbdGhpcy5nZXRJdGVtSW5kZXgoJG5leHQpXSlcbiAgICAgICRuZXh0SW5kaWNhdG9yICYmICRuZXh0SW5kaWNhdG9yLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgIH1cblxuICAgIHZhciBzbGlkRXZlbnQgPSAkLkV2ZW50KCdzbGlkLmJzLmNhcm91c2VsJywgeyByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0LCBkaXJlY3Rpb246IGRpcmVjdGlvbiB9KSAvLyB5ZXMsIFwic2xpZFwiXG4gICAgaWYgKCQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ3NsaWRlJykpIHtcbiAgICAgICRuZXh0LmFkZENsYXNzKHR5cGUpXG4gICAgICAkbmV4dFswXS5vZmZzZXRXaWR0aCAvLyBmb3JjZSByZWZsb3dcbiAgICAgICRhY3RpdmUuYWRkQ2xhc3MoZGlyZWN0aW9uKVxuICAgICAgJG5leHQuYWRkQ2xhc3MoZGlyZWN0aW9uKVxuICAgICAgJGFjdGl2ZVxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJG5leHQucmVtb3ZlQ2xhc3MoW3R5cGUsIGRpcmVjdGlvbl0uam9pbignICcpKS5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKFsnYWN0aXZlJywgZGlyZWN0aW9uXS5qb2luKCcgJykpXG4gICAgICAgICAgdGhhdC5zbGlkaW5nID0gZmFsc2VcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcihzbGlkRXZlbnQpXG4gICAgICAgICAgfSwgMClcbiAgICAgICAgfSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKENhcm91c2VsLlRSQU5TSVRJT05fRFVSQVRJT04pXG4gICAgfSBlbHNlIHtcbiAgICAgICRhY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAkbmV4dC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgIHRoaXMuc2xpZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc2xpZEV2ZW50KVxuICAgIH1cblxuICAgIGlzQ3ljbGluZyAmJiB0aGlzLmN5Y2xlKClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIENBUk9VU0VMIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLmNhcm91c2VsJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIENhcm91c2VsLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuICAgICAgdmFyIGFjdGlvbiAgPSB0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnID8gb3B0aW9uIDogb3B0aW9ucy5zbGlkZVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmNhcm91c2VsJywgKGRhdGEgPSBuZXcgQ2Fyb3VzZWwodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ251bWJlcicpIGRhdGEudG8ob3B0aW9uKVxuICAgICAgZWxzZSBpZiAoYWN0aW9uKSBkYXRhW2FjdGlvbl0oKVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5pbnRlcnZhbCkgZGF0YS5wYXVzZSgpLmN5Y2xlKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uY2Fyb3VzZWxcblxuICAkLmZuLmNhcm91c2VsICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uY2Fyb3VzZWwuQ29uc3RydWN0b3IgPSBDYXJvdXNlbFxuXG5cbiAgLy8gQ0FST1VTRUwgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmNhcm91c2VsLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5jYXJvdXNlbCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIENBUk9VU0VMIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgdmFyIGNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGhyZWZcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICB2YXIgJHRhcmdldCA9ICQoJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKSB8fCAoaHJlZiA9ICR0aGlzLmF0dHIoJ2hyZWYnKSkgJiYgaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykpIC8vIHN0cmlwIGZvciBpZTdcbiAgICBpZiAoISR0YXJnZXQuaGFzQ2xhc3MoJ2Nhcm91c2VsJykpIHJldHVyblxuICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sICR0YXJnZXQuZGF0YSgpLCAkdGhpcy5kYXRhKCkpXG4gICAgdmFyIHNsaWRlSW5kZXggPSAkdGhpcy5hdHRyKCdkYXRhLXNsaWRlLXRvJylcbiAgICBpZiAoc2xpZGVJbmRleCkgb3B0aW9ucy5pbnRlcnZhbCA9IGZhbHNlXG5cbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb25zKVxuXG4gICAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICAgICR0YXJnZXQuZGF0YSgnYnMuY2Fyb3VzZWwnKS50byhzbGlkZUluZGV4KVxuICAgIH1cblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgJChkb2N1bWVudClcbiAgICAub24oJ2NsaWNrLmJzLmNhcm91c2VsLmRhdGEtYXBpJywgJ1tkYXRhLXNsaWRlXScsIGNsaWNrSGFuZGxlcilcbiAgICAub24oJ2NsaWNrLmJzLmNhcm91c2VsLmRhdGEtYXBpJywgJ1tkYXRhLXNsaWRlLXRvXScsIGNsaWNrSGFuZGxlcilcblxuICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtcmlkZT1cImNhcm91c2VsXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJGNhcm91c2VsID0gJCh0aGlzKVxuICAgICAgUGx1Z2luLmNhbGwoJGNhcm91c2VsLCAkY2Fyb3VzZWwuZGF0YSgpKVxuICAgIH0pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiB0b29sdGlwLmpzIHYzLjMuNlxuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jdG9vbHRpcFxuICogSW5zcGlyZWQgYnkgdGhlIG9yaWdpbmFsIGpRdWVyeS50aXBzeSBieSBKYXNvbiBGcmFtZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE1IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFRPT0xUSVAgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBUb29sdGlwID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnR5cGUgICAgICAgPSBudWxsXG4gICAgdGhpcy5vcHRpb25zICAgID0gbnVsbFxuICAgIHRoaXMuZW5hYmxlZCAgICA9IG51bGxcbiAgICB0aGlzLnRpbWVvdXQgICAgPSBudWxsXG4gICAgdGhpcy5ob3ZlclN0YXRlID0gbnVsbFxuICAgIHRoaXMuJGVsZW1lbnQgICA9IG51bGxcbiAgICB0aGlzLmluU3RhdGUgICAgPSBudWxsXG5cbiAgICB0aGlzLmluaXQoJ3Rvb2x0aXAnLCBlbGVtZW50LCBvcHRpb25zKVxuICB9XG5cbiAgVG9vbHRpcC5WRVJTSU9OICA9ICczLjMuNidcblxuICBUb29sdGlwLlRSQU5TSVRJT05fRFVSQVRJT04gPSAxNTBcblxuICBUb29sdGlwLkRFRkFVTFRTID0ge1xuICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJ0b29sdGlwXCIgcm9sZT1cInRvb2x0aXBcIj48ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+PC9kaXY+JyxcbiAgICB0cmlnZ2VyOiAnaG92ZXIgZm9jdXMnLFxuICAgIHRpdGxlOiAnJyxcbiAgICBkZWxheTogMCxcbiAgICBodG1sOiBmYWxzZSxcbiAgICBjb250YWluZXI6IGZhbHNlLFxuICAgIHZpZXdwb3J0OiB7XG4gICAgICBzZWxlY3RvcjogJ2JvZHknLFxuICAgICAgcGFkZGluZzogMFxuICAgIH1cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAodHlwZSwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuZW5hYmxlZCAgID0gdHJ1ZVxuICAgIHRoaXMudHlwZSAgICAgID0gdHlwZVxuICAgIHRoaXMuJGVsZW1lbnQgID0gJChlbGVtZW50KVxuICAgIHRoaXMub3B0aW9ucyAgID0gdGhpcy5nZXRPcHRpb25zKG9wdGlvbnMpXG4gICAgdGhpcy4kdmlld3BvcnQgPSB0aGlzLm9wdGlvbnMudmlld3BvcnQgJiYgJCgkLmlzRnVuY3Rpb24odGhpcy5vcHRpb25zLnZpZXdwb3J0KSA/IHRoaXMub3B0aW9ucy52aWV3cG9ydC5jYWxsKHRoaXMsIHRoaXMuJGVsZW1lbnQpIDogKHRoaXMub3B0aW9ucy52aWV3cG9ydC5zZWxlY3RvciB8fCB0aGlzLm9wdGlvbnMudmlld3BvcnQpKVxuICAgIHRoaXMuaW5TdGF0ZSAgID0geyBjbGljazogZmFsc2UsIGhvdmVyOiBmYWxzZSwgZm9jdXM6IGZhbHNlIH1cblxuICAgIGlmICh0aGlzLiRlbGVtZW50WzBdIGluc3RhbmNlb2YgZG9jdW1lbnQuY29uc3RydWN0b3IgJiYgIXRoaXMub3B0aW9ucy5zZWxlY3Rvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgc2VsZWN0b3JgIG9wdGlvbiBtdXN0IGJlIHNwZWNpZmllZCB3aGVuIGluaXRpYWxpemluZyAnICsgdGhpcy50eXBlICsgJyBvbiB0aGUgd2luZG93LmRvY3VtZW50IG9iamVjdCEnKVxuICAgIH1cblxuICAgIHZhciB0cmlnZ2VycyA9IHRoaXMub3B0aW9ucy50cmlnZ2VyLnNwbGl0KCcgJylcblxuICAgIGZvciAodmFyIGkgPSB0cmlnZ2Vycy5sZW5ndGg7IGktLTspIHtcbiAgICAgIHZhciB0cmlnZ2VyID0gdHJpZ2dlcnNbaV1cblxuICAgICAgaWYgKHRyaWdnZXIgPT0gJ2NsaWNrJykge1xuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay4nICsgdGhpcy50eXBlLCB0aGlzLm9wdGlvbnMuc2VsZWN0b3IsICQucHJveHkodGhpcy50b2dnbGUsIHRoaXMpKVxuICAgICAgfSBlbHNlIGlmICh0cmlnZ2VyICE9ICdtYW51YWwnKSB7XG4gICAgICAgIHZhciBldmVudEluICA9IHRyaWdnZXIgPT0gJ2hvdmVyJyA/ICdtb3VzZWVudGVyJyA6ICdmb2N1c2luJ1xuICAgICAgICB2YXIgZXZlbnRPdXQgPSB0cmlnZ2VyID09ICdob3ZlcicgPyAnbW91c2VsZWF2ZScgOiAnZm9jdXNvdXQnXG5cbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbihldmVudEluICArICcuJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMuZW50ZXIsIHRoaXMpKVxuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKGV2ZW50T3V0ICsgJy4nICsgdGhpcy50eXBlLCB0aGlzLm9wdGlvbnMuc2VsZWN0b3IsICQucHJveHkodGhpcy5sZWF2ZSwgdGhpcykpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zLnNlbGVjdG9yID9cbiAgICAgICh0aGlzLl9vcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgeyB0cmlnZ2VyOiAnbWFudWFsJywgc2VsZWN0b3I6ICcnIH0pKSA6XG4gICAgICB0aGlzLmZpeFRpdGxlKClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldERlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBUb29sdGlwLkRFRkFVTFRTXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMuZ2V0RGVmYXVsdHMoKSwgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpXG5cbiAgICBpZiAob3B0aW9ucy5kZWxheSAmJiB0eXBlb2Ygb3B0aW9ucy5kZWxheSA9PSAnbnVtYmVyJykge1xuICAgICAgb3B0aW9ucy5kZWxheSA9IHtcbiAgICAgICAgc2hvdzogb3B0aW9ucy5kZWxheSxcbiAgICAgICAgaGlkZTogb3B0aW9ucy5kZWxheVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXREZWxlZ2F0ZU9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgID0ge31cbiAgICB2YXIgZGVmYXVsdHMgPSB0aGlzLmdldERlZmF1bHRzKClcblxuICAgIHRoaXMuX29wdGlvbnMgJiYgJC5lYWNoKHRoaXMuX29wdGlvbnMsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoZGVmYXVsdHNba2V5XSAhPSB2YWx1ZSkgb3B0aW9uc1trZXldID0gdmFsdWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIG9wdGlvbnNcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmVudGVyID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBzZWxmID0gb2JqIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3RvciA/XG4gICAgICBvYmogOiAkKG9iai5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlKVxuXG4gICAgaWYgKCFzZWxmKSB7XG4gICAgICBzZWxmID0gbmV3IHRoaXMuY29uc3RydWN0b3Iob2JqLmN1cnJlbnRUYXJnZXQsIHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpXG4gICAgICAkKG9iai5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlLCBzZWxmKVxuICAgIH1cblxuICAgIGlmIChvYmogaW5zdGFuY2VvZiAkLkV2ZW50KSB7XG4gICAgICBzZWxmLmluU3RhdGVbb2JqLnR5cGUgPT0gJ2ZvY3VzaW4nID8gJ2ZvY3VzJyA6ICdob3ZlciddID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChzZWxmLnRpcCgpLmhhc0NsYXNzKCdpbicpIHx8IHNlbGYuaG92ZXJTdGF0ZSA9PSAnaW4nKSB7XG4gICAgICBzZWxmLmhvdmVyU3RhdGUgPSAnaW4nXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQoc2VsZi50aW1lb3V0KVxuXG4gICAgc2VsZi5ob3ZlclN0YXRlID0gJ2luJ1xuXG4gICAgaWYgKCFzZWxmLm9wdGlvbnMuZGVsYXkgfHwgIXNlbGYub3B0aW9ucy5kZWxheS5zaG93KSByZXR1cm4gc2VsZi5zaG93KClcblxuICAgIHNlbGYudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuaG92ZXJTdGF0ZSA9PSAnaW4nKSBzZWxmLnNob3coKVxuICAgIH0sIHNlbGYub3B0aW9ucy5kZWxheS5zaG93KVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuaXNJblN0YXRlVHJ1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5pblN0YXRlKSB7XG4gICAgICBpZiAodGhpcy5pblN0YXRlW2tleV0pIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5sZWF2ZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgc2VsZiA9IG9iaiBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IgP1xuICAgICAgb2JqIDogJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGlmICghc2VsZikge1xuICAgICAgc2VsZiA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG9iai5jdXJyZW50VGFyZ2V0LCB0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKVxuICAgICAgJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgc2VsZilcbiAgICB9XG5cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgJC5FdmVudCkge1xuICAgICAgc2VsZi5pblN0YXRlW29iai50eXBlID09ICdmb2N1c291dCcgPyAnZm9jdXMnIDogJ2hvdmVyJ10gPSBmYWxzZVxuICAgIH1cblxuICAgIGlmIChzZWxmLmlzSW5TdGF0ZVRydWUoKSkgcmV0dXJuXG5cbiAgICBjbGVhclRpbWVvdXQoc2VsZi50aW1lb3V0KVxuXG4gICAgc2VsZi5ob3ZlclN0YXRlID0gJ291dCdcblxuICAgIGlmICghc2VsZi5vcHRpb25zLmRlbGF5IHx8ICFzZWxmLm9wdGlvbnMuZGVsYXkuaGlkZSkgcmV0dXJuIHNlbGYuaGlkZSgpXG5cbiAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmhvdmVyU3RhdGUgPT0gJ291dCcpIHNlbGYuaGlkZSgpXG4gICAgfSwgc2VsZi5vcHRpb25zLmRlbGF5LmhpZGUpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBlID0gJC5FdmVudCgnc2hvdy5icy4nICsgdGhpcy50eXBlKVxuXG4gICAgaWYgKHRoaXMuaGFzQ29udGVudCgpICYmIHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICAgIHZhciBpbkRvbSA9ICQuY29udGFpbnModGhpcy4kZWxlbWVudFswXS5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgdGhpcy4kZWxlbWVudFswXSlcbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8ICFpbkRvbSkgcmV0dXJuXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcblxuICAgICAgdmFyICR0aXAgPSB0aGlzLnRpcCgpXG5cbiAgICAgIHZhciB0aXBJZCA9IHRoaXMuZ2V0VUlEKHRoaXMudHlwZSlcblxuICAgICAgdGhpcy5zZXRDb250ZW50KClcbiAgICAgICR0aXAuYXR0cignaWQnLCB0aXBJZClcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1kZXNjcmliZWRieScsIHRpcElkKVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbikgJHRpcC5hZGRDbGFzcygnZmFkZScpXG5cbiAgICAgIHZhciBwbGFjZW1lbnQgPSB0eXBlb2YgdGhpcy5vcHRpb25zLnBsYWNlbWVudCA9PSAnZnVuY3Rpb24nID9cbiAgICAgICAgdGhpcy5vcHRpb25zLnBsYWNlbWVudC5jYWxsKHRoaXMsICR0aXBbMF0sIHRoaXMuJGVsZW1lbnRbMF0pIDpcbiAgICAgICAgdGhpcy5vcHRpb25zLnBsYWNlbWVudFxuXG4gICAgICB2YXIgYXV0b1Rva2VuID0gL1xccz9hdXRvP1xccz8vaVxuICAgICAgdmFyIGF1dG9QbGFjZSA9IGF1dG9Ub2tlbi50ZXN0KHBsYWNlbWVudClcbiAgICAgIGlmIChhdXRvUGxhY2UpIHBsYWNlbWVudCA9IHBsYWNlbWVudC5yZXBsYWNlKGF1dG9Ub2tlbiwgJycpIHx8ICd0b3AnXG5cbiAgICAgICR0aXBcbiAgICAgICAgLmRldGFjaCgpXG4gICAgICAgIC5jc3MoeyB0b3A6IDAsIGxlZnQ6IDAsIGRpc3BsYXk6ICdibG9jaycgfSlcbiAgICAgICAgLmFkZENsYXNzKHBsYWNlbWVudClcbiAgICAgICAgLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHRoaXMpXG5cbiAgICAgIHRoaXMub3B0aW9ucy5jb250YWluZXIgPyAkdGlwLmFwcGVuZFRvKHRoaXMub3B0aW9ucy5jb250YWluZXIpIDogJHRpcC5pbnNlcnRBZnRlcih0aGlzLiRlbGVtZW50KVxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdpbnNlcnRlZC5icy4nICsgdGhpcy50eXBlKVxuXG4gICAgICB2YXIgcG9zICAgICAgICAgID0gdGhpcy5nZXRQb3NpdGlvbigpXG4gICAgICB2YXIgYWN0dWFsV2lkdGggID0gJHRpcFswXS5vZmZzZXRXaWR0aFxuICAgICAgdmFyIGFjdHVhbEhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICAgIGlmIChhdXRvUGxhY2UpIHtcbiAgICAgICAgdmFyIG9yZ1BsYWNlbWVudCA9IHBsYWNlbWVudFxuICAgICAgICB2YXIgdmlld3BvcnREaW0gPSB0aGlzLmdldFBvc2l0aW9uKHRoaXMuJHZpZXdwb3J0KVxuXG4gICAgICAgIHBsYWNlbWVudCA9IHBsYWNlbWVudCA9PSAnYm90dG9tJyAmJiBwb3MuYm90dG9tICsgYWN0dWFsSGVpZ2h0ID4gdmlld3BvcnREaW0uYm90dG9tID8gJ3RvcCcgICAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ3RvcCcgICAgJiYgcG9zLnRvcCAgICAtIGFjdHVhbEhlaWdodCA8IHZpZXdwb3J0RGltLnRvcCAgICA/ICdib3R0b20nIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50ID09ICdyaWdodCcgICYmIHBvcy5yaWdodCAgKyBhY3R1YWxXaWR0aCAgPiB2aWV3cG9ydERpbS53aWR0aCAgPyAnbGVmdCcgICA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9PSAnbGVmdCcgICAmJiBwb3MubGVmdCAgIC0gYWN0dWFsV2lkdGggIDwgdmlld3BvcnREaW0ubGVmdCAgID8gJ3JpZ2h0JyAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnRcblxuICAgICAgICAkdGlwXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKG9yZ1BsYWNlbWVudClcbiAgICAgICAgICAuYWRkQ2xhc3MocGxhY2VtZW50KVxuICAgICAgfVxuXG4gICAgICB2YXIgY2FsY3VsYXRlZE9mZnNldCA9IHRoaXMuZ2V0Q2FsY3VsYXRlZE9mZnNldChwbGFjZW1lbnQsIHBvcywgYWN0dWFsV2lkdGgsIGFjdHVhbEhlaWdodClcblxuICAgICAgdGhpcy5hcHBseVBsYWNlbWVudChjYWxjdWxhdGVkT2Zmc2V0LCBwbGFjZW1lbnQpXG5cbiAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByZXZIb3ZlclN0YXRlID0gdGhhdC5ob3ZlclN0YXRlXG4gICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignc2hvd24uYnMuJyArIHRoYXQudHlwZSlcbiAgICAgICAgdGhhdC5ob3ZlclN0YXRlID0gbnVsbFxuXG4gICAgICAgIGlmIChwcmV2SG92ZXJTdGF0ZSA9PSAnb3V0JykgdGhhdC5sZWF2ZSh0aGF0KVxuICAgICAgfVxuXG4gICAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiR0aXAuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAgICR0aXBcbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBjb21wbGV0ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNvbXBsZXRlKClcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5hcHBseVBsYWNlbWVudCA9IGZ1bmN0aW9uIChvZmZzZXQsIHBsYWNlbWVudCkge1xuICAgIHZhciAkdGlwICAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHdpZHRoICA9ICR0aXBbMF0ub2Zmc2V0V2lkdGhcbiAgICB2YXIgaGVpZ2h0ID0gJHRpcFswXS5vZmZzZXRIZWlnaHRcblxuICAgIC8vIG1hbnVhbGx5IHJlYWQgbWFyZ2lucyBiZWNhdXNlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpbmNsdWRlcyBkaWZmZXJlbmNlXG4gICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlSW50KCR0aXAuY3NzKCdtYXJnaW4tdG9wJyksIDEwKVxuICAgIHZhciBtYXJnaW5MZWZ0ID0gcGFyc2VJbnQoJHRpcC5jc3MoJ21hcmdpbi1sZWZ0JyksIDEwKVxuXG4gICAgLy8gd2UgbXVzdCBjaGVjayBmb3IgTmFOIGZvciBpZSA4LzlcbiAgICBpZiAoaXNOYU4obWFyZ2luVG9wKSkgIG1hcmdpblRvcCAgPSAwXG4gICAgaWYgKGlzTmFOKG1hcmdpbkxlZnQpKSBtYXJnaW5MZWZ0ID0gMFxuXG4gICAgb2Zmc2V0LnRvcCAgKz0gbWFyZ2luVG9wXG4gICAgb2Zmc2V0LmxlZnQgKz0gbWFyZ2luTGVmdFxuXG4gICAgLy8gJC5mbi5vZmZzZXQgZG9lc24ndCByb3VuZCBwaXhlbCB2YWx1ZXNcbiAgICAvLyBzbyB3ZSB1c2Ugc2V0T2Zmc2V0IGRpcmVjdGx5IHdpdGggb3VyIG93biBmdW5jdGlvbiBCLTBcbiAgICAkLm9mZnNldC5zZXRPZmZzZXQoJHRpcFswXSwgJC5leHRlbmQoe1xuICAgICAgdXNpbmc6IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICAkdGlwLmNzcyh7XG4gICAgICAgICAgdG9wOiBNYXRoLnJvdW5kKHByb3BzLnRvcCksXG4gICAgICAgICAgbGVmdDogTWF0aC5yb3VuZChwcm9wcy5sZWZ0KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sIG9mZnNldCksIDApXG5cbiAgICAkdGlwLmFkZENsYXNzKCdpbicpXG5cbiAgICAvLyBjaGVjayB0byBzZWUgaWYgcGxhY2luZyB0aXAgaW4gbmV3IG9mZnNldCBjYXVzZWQgdGhlIHRpcCB0byByZXNpemUgaXRzZWxmXG4gICAgdmFyIGFjdHVhbFdpZHRoICA9ICR0aXBbMF0ub2Zmc2V0V2lkdGhcbiAgICB2YXIgYWN0dWFsSGVpZ2h0ID0gJHRpcFswXS5vZmZzZXRIZWlnaHRcblxuICAgIGlmIChwbGFjZW1lbnQgPT0gJ3RvcCcgJiYgYWN0dWFsSGVpZ2h0ICE9IGhlaWdodCkge1xuICAgICAgb2Zmc2V0LnRvcCA9IG9mZnNldC50b3AgKyBoZWlnaHQgLSBhY3R1YWxIZWlnaHRcbiAgICB9XG5cbiAgICB2YXIgZGVsdGEgPSB0aGlzLmdldFZpZXdwb3J0QWRqdXN0ZWREZWx0YShwbGFjZW1lbnQsIG9mZnNldCwgYWN0dWFsV2lkdGgsIGFjdHVhbEhlaWdodClcblxuICAgIGlmIChkZWx0YS5sZWZ0KSBvZmZzZXQubGVmdCArPSBkZWx0YS5sZWZ0XG4gICAgZWxzZSBvZmZzZXQudG9wICs9IGRlbHRhLnRvcFxuXG4gICAgdmFyIGlzVmVydGljYWwgICAgICAgICAgPSAvdG9wfGJvdHRvbS8udGVzdChwbGFjZW1lbnQpXG4gICAgdmFyIGFycm93RGVsdGEgICAgICAgICAgPSBpc1ZlcnRpY2FsID8gZGVsdGEubGVmdCAqIDIgLSB3aWR0aCArIGFjdHVhbFdpZHRoIDogZGVsdGEudG9wICogMiAtIGhlaWdodCArIGFjdHVhbEhlaWdodFxuICAgIHZhciBhcnJvd09mZnNldFBvc2l0aW9uID0gaXNWZXJ0aWNhbCA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0J1xuXG4gICAgJHRpcC5vZmZzZXQob2Zmc2V0KVxuICAgIHRoaXMucmVwbGFjZUFycm93KGFycm93RGVsdGEsICR0aXBbMF1bYXJyb3dPZmZzZXRQb3NpdGlvbl0sIGlzVmVydGljYWwpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5yZXBsYWNlQXJyb3cgPSBmdW5jdGlvbiAoZGVsdGEsIGRpbWVuc2lvbiwgaXNWZXJ0aWNhbCkge1xuICAgIHRoaXMuYXJyb3coKVxuICAgICAgLmNzcyhpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCcsIDUwICogKDEgLSBkZWx0YSAvIGRpbWVuc2lvbikgKyAnJScpXG4gICAgICAuY3NzKGlzVmVydGljYWwgPyAndG9wJyA6ICdsZWZ0JywgJycpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGlwICA9IHRoaXMudGlwKClcbiAgICB2YXIgdGl0bGUgPSB0aGlzLmdldFRpdGxlKClcblxuICAgICR0aXAuZmluZCgnLnRvb2x0aXAtaW5uZXInKVt0aGlzLm9wdGlvbnMuaHRtbCA/ICdodG1sJyA6ICd0ZXh0J10odGl0bGUpXG4gICAgJHRpcC5yZW1vdmVDbGFzcygnZmFkZSBpbiB0b3AgYm90dG9tIGxlZnQgcmlnaHQnKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciAkdGlwID0gJCh0aGlzLiR0aXApXG4gICAgdmFyIGUgICAgPSAkLkV2ZW50KCdoaWRlLmJzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgIGlmICh0aGF0LmhvdmVyU3RhdGUgIT0gJ2luJykgJHRpcC5kZXRhY2goKVxuICAgICAgdGhhdC4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1kZXNjcmliZWRieScpXG4gICAgICAgIC50cmlnZ2VyKCdoaWRkZW4uYnMuJyArIHRoYXQudHlwZSlcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmICR0aXAuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAkdGlwXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNvbXBsZXRlKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICBjb21wbGV0ZSgpXG5cbiAgICB0aGlzLmhvdmVyU3RhdGUgPSBudWxsXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZml4VGl0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIGlmICgkZS5hdHRyKCd0aXRsZScpIHx8IHR5cGVvZiAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJykgIT0gJ3N0cmluZycpIHtcbiAgICAgICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCAkZS5hdHRyKCd0aXRsZScpIHx8ICcnKS5hdHRyKCd0aXRsZScsICcnKVxuICAgIH1cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmhhc0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUoKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcbiAgICAkZWxlbWVudCAgID0gJGVsZW1lbnQgfHwgdGhpcy4kZWxlbWVudFxuXG4gICAgdmFyIGVsICAgICA9ICRlbGVtZW50WzBdXG4gICAgdmFyIGlzQm9keSA9IGVsLnRhZ05hbWUgPT0gJ0JPRFknXG5cbiAgICB2YXIgZWxSZWN0ICAgID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBpZiAoZWxSZWN0LndpZHRoID09IG51bGwpIHtcbiAgICAgIC8vIHdpZHRoIGFuZCBoZWlnaHQgYXJlIG1pc3NpbmcgaW4gSUU4LCBzbyBjb21wdXRlIHRoZW0gbWFudWFsbHk7IHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzE0MDkzXG4gICAgICBlbFJlY3QgPSAkLmV4dGVuZCh7fSwgZWxSZWN0LCB7IHdpZHRoOiBlbFJlY3QucmlnaHQgLSBlbFJlY3QubGVmdCwgaGVpZ2h0OiBlbFJlY3QuYm90dG9tIC0gZWxSZWN0LnRvcCB9KVxuICAgIH1cbiAgICB2YXIgZWxPZmZzZXQgID0gaXNCb2R5ID8geyB0b3A6IDAsIGxlZnQ6IDAgfSA6ICRlbGVtZW50Lm9mZnNldCgpXG4gICAgdmFyIHNjcm9sbCAgICA9IHsgc2Nyb2xsOiBpc0JvZHkgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIDogJGVsZW1lbnQuc2Nyb2xsVG9wKCkgfVxuICAgIHZhciBvdXRlckRpbXMgPSBpc0JvZHkgPyB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfSA6IG51bGxcblxuICAgIHJldHVybiAkLmV4dGVuZCh7fSwgZWxSZWN0LCBzY3JvbGwsIG91dGVyRGltcywgZWxPZmZzZXQpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRDYWxjdWxhdGVkT2Zmc2V0ID0gZnVuY3Rpb24gKHBsYWNlbWVudCwgcG9zLCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KSB7XG4gICAgcmV0dXJuIHBsYWNlbWVudCA9PSAnYm90dG9tJyA/IHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCwgICBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCAvIDIgLSBhY3R1YWxXaWR0aCAvIDIgfSA6XG4gICAgICAgICAgIHBsYWNlbWVudCA9PSAndG9wJyAgICA/IHsgdG9wOiBwb3MudG9wIC0gYWN0dWFsSGVpZ2h0LCBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCAvIDIgLSBhY3R1YWxXaWR0aCAvIDIgfSA6XG4gICAgICAgICAgIHBsYWNlbWVudCA9PSAnbGVmdCcgICA/IHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCAvIDIgLSBhY3R1YWxIZWlnaHQgLyAyLCBsZWZ0OiBwb3MubGVmdCAtIGFjdHVhbFdpZHRoIH0gOlxuICAgICAgICAvKiBwbGFjZW1lbnQgPT0gJ3JpZ2h0JyAqLyB7IHRvcDogcG9zLnRvcCArIHBvcy5oZWlnaHQgLyAyIC0gYWN0dWFsSGVpZ2h0IC8gMiwgbGVmdDogcG9zLmxlZnQgKyBwb3Mud2lkdGggfVxuXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEgPSBmdW5jdGlvbiAocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpIHtcbiAgICB2YXIgZGVsdGEgPSB7IHRvcDogMCwgbGVmdDogMCB9XG4gICAgaWYgKCF0aGlzLiR2aWV3cG9ydCkgcmV0dXJuIGRlbHRhXG5cbiAgICB2YXIgdmlld3BvcnRQYWRkaW5nID0gdGhpcy5vcHRpb25zLnZpZXdwb3J0ICYmIHRoaXMub3B0aW9ucy52aWV3cG9ydC5wYWRkaW5nIHx8IDBcbiAgICB2YXIgdmlld3BvcnREaW1lbnNpb25zID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLiR2aWV3cG9ydClcblxuICAgIGlmICgvcmlnaHR8bGVmdC8udGVzdChwbGFjZW1lbnQpKSB7XG4gICAgICB2YXIgdG9wRWRnZU9mZnNldCAgICA9IHBvcy50b3AgLSB2aWV3cG9ydFBhZGRpbmcgLSB2aWV3cG9ydERpbWVuc2lvbnMuc2Nyb2xsXG4gICAgICB2YXIgYm90dG9tRWRnZU9mZnNldCA9IHBvcy50b3AgKyB2aWV3cG9ydFBhZGRpbmcgLSB2aWV3cG9ydERpbWVuc2lvbnMuc2Nyb2xsICsgYWN0dWFsSGVpZ2h0XG4gICAgICBpZiAodG9wRWRnZU9mZnNldCA8IHZpZXdwb3J0RGltZW5zaW9ucy50b3ApIHsgLy8gdG9wIG92ZXJmbG93XG4gICAgICAgIGRlbHRhLnRvcCA9IHZpZXdwb3J0RGltZW5zaW9ucy50b3AgLSB0b3BFZGdlT2Zmc2V0XG4gICAgICB9IGVsc2UgaWYgKGJvdHRvbUVkZ2VPZmZzZXQgPiB2aWV3cG9ydERpbWVuc2lvbnMudG9wICsgdmlld3BvcnREaW1lbnNpb25zLmhlaWdodCkgeyAvLyBib3R0b20gb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEudG9wID0gdmlld3BvcnREaW1lbnNpb25zLnRvcCArIHZpZXdwb3J0RGltZW5zaW9ucy5oZWlnaHQgLSBib3R0b21FZGdlT2Zmc2V0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBsZWZ0RWRnZU9mZnNldCAgPSBwb3MubGVmdCAtIHZpZXdwb3J0UGFkZGluZ1xuICAgICAgdmFyIHJpZ2h0RWRnZU9mZnNldCA9IHBvcy5sZWZ0ICsgdmlld3BvcnRQYWRkaW5nICsgYWN0dWFsV2lkdGhcbiAgICAgIGlmIChsZWZ0RWRnZU9mZnNldCA8IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0KSB7IC8vIGxlZnQgb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEubGVmdCA9IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0IC0gbGVmdEVkZ2VPZmZzZXRcbiAgICAgIH0gZWxzZSBpZiAocmlnaHRFZGdlT2Zmc2V0ID4gdmlld3BvcnREaW1lbnNpb25zLnJpZ2h0KSB7IC8vIHJpZ2h0IG92ZXJmbG93XG4gICAgICAgIGRlbHRhLmxlZnQgPSB2aWV3cG9ydERpbWVuc2lvbnMubGVmdCArIHZpZXdwb3J0RGltZW5zaW9ucy53aWR0aCAtIHJpZ2h0RWRnZU9mZnNldFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWx0YVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0VGl0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRpdGxlXG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciBvICA9IHRoaXMub3B0aW9uc1xuXG4gICAgdGl0bGUgPSAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJylcbiAgICAgIHx8ICh0eXBlb2Ygby50aXRsZSA9PSAnZnVuY3Rpb24nID8gby50aXRsZS5jYWxsKCRlWzBdKSA6ICBvLnRpdGxlKVxuXG4gICAgcmV0dXJuIHRpdGxlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRVSUQgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgZG8gcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKVxuICAgIHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKVxuICAgIHJldHVybiBwcmVmaXhcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuJHRpcCkge1xuICAgICAgdGhpcy4kdGlwID0gJCh0aGlzLm9wdGlvbnMudGVtcGxhdGUpXG4gICAgICBpZiAodGhpcy4kdGlwLmxlbmd0aCAhPSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLnR5cGUgKyAnIGB0ZW1wbGF0ZWAgb3B0aW9uIG11c3QgY29uc2lzdCBvZiBleGFjdGx5IDEgdG9wLWxldmVsIGVsZW1lbnQhJylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuJHRpcFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuYXJyb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLiRhcnJvdyA9IHRoaXMuJGFycm93IHx8IHRoaXMudGlwKCkuZmluZCgnLnRvb2x0aXAtYXJyb3cnKSlcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS50b2dnbGVFbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWRcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgaWYgKGUpIHtcbiAgICAgIHNlbGYgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSlcbiAgICAgIGlmICghc2VsZikge1xuICAgICAgICBzZWxmID0gbmV3IHRoaXMuY29uc3RydWN0b3IoZS5jdXJyZW50VGFyZ2V0LCB0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKVxuICAgICAgICAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgc2VsZilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgc2VsZi5pblN0YXRlLmNsaWNrID0gIXNlbGYuaW5TdGF0ZS5jbGlja1xuICAgICAgaWYgKHNlbGYuaXNJblN0YXRlVHJ1ZSgpKSBzZWxmLmVudGVyKHNlbGYpXG4gICAgICBlbHNlIHNlbGYubGVhdmUoc2VsZilcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi50aXAoKS5oYXNDbGFzcygnaW4nKSA/IHNlbGYubGVhdmUoc2VsZikgOiBzZWxmLmVudGVyKHNlbGYpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KVxuICAgIHRoaXMuaGlkZShmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRlbGVtZW50Lm9mZignLicgKyB0aGF0LnR5cGUpLnJlbW92ZURhdGEoJ2JzLicgKyB0aGF0LnR5cGUpXG4gICAgICBpZiAodGhhdC4kdGlwKSB7XG4gICAgICAgIHRoYXQuJHRpcC5kZXRhY2goKVxuICAgICAgfVxuICAgICAgdGhhdC4kdGlwID0gbnVsbFxuICAgICAgdGhhdC4kYXJyb3cgPSBudWxsXG4gICAgICB0aGF0LiR2aWV3cG9ydCA9IG51bGxcbiAgICB9KVxuICB9XG5cblxuICAvLyBUT09MVElQIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMudG9vbHRpcCcpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSAmJiAvZGVzdHJveXxoaWRlLy50ZXN0KG9wdGlvbikpIHJldHVyblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50b29sdGlwJywgKGRhdGEgPSBuZXcgVG9vbHRpcCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4udG9vbHRpcFxuXG4gICQuZm4udG9vbHRpcCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IgPSBUb29sdGlwXG5cblxuICAvLyBUT09MVElQIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLnRvb2x0aXAubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRvb2x0aXAgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbn0oalF1ZXJ5KTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiB0cmFuc2l0aW9uLmpzIHYzLjMuNlxuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jdHJhbnNpdGlvbnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNSBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDU1MgVFJBTlNJVElPTiBTVVBQT1JUIChTaG91dG91dDogaHR0cDovL3d3dy5tb2Rlcm5penIuY29tLylcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZCgpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdib290c3RyYXAnKVxuXG4gICAgdmFyIHRyYW5zRW5kRXZlbnROYW1lcyA9IHtcbiAgICAgIFdlYmtpdFRyYW5zaXRpb24gOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgICBNb3pUcmFuc2l0aW9uICAgIDogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgT1RyYW5zaXRpb24gICAgICA6ICdvVHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCcsXG4gICAgICB0cmFuc2l0aW9uICAgICAgIDogJ3RyYW5zaXRpb25lbmQnXG4gICAgfVxuXG4gICAgZm9yICh2YXIgbmFtZSBpbiB0cmFuc0VuZEV2ZW50TmFtZXMpIHtcbiAgICAgIGlmIChlbC5zdHlsZVtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB7IGVuZDogdHJhbnNFbmRFdmVudE5hbWVzW25hbWVdIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2UgLy8gZXhwbGljaXQgZm9yIGllOCAoICAuXy4pXG4gIH1cblxuICAvLyBodHRwOi8vYmxvZy5hbGV4bWFjY2F3LmNvbS9jc3MtdHJhbnNpdGlvbnNcbiAgJC5mbi5lbXVsYXRlVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZVxuICAgIHZhciAkZWwgPSB0aGlzXG4gICAgJCh0aGlzKS5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHsgY2FsbGVkID0gdHJ1ZSB9KVxuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgaWYgKCFjYWxsZWQpICQoJGVsKS50cmlnZ2VyKCQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCkgfVxuICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIGR1cmF0aW9uKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAkKGZ1bmN0aW9uICgpIHtcbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25FbmQoKVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuXG5cbiAgICAkLmV2ZW50LnNwZWNpYWwuYnNUcmFuc2l0aW9uRW5kID0ge1xuICAgICAgYmluZFR5cGU6ICQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxcbiAgICAgIGRlbGVnYXRlVHlwZTogJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLFxuICAgICAgaGFuZGxlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXModGhpcykpIHJldHVybiBlLmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbn0oalF1ZXJ5KTtcbiJdfQ==
