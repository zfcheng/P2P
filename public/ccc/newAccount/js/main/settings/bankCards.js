"use strict";

var utils = require('ccc/global/js/lib/utils');
var LLPBANKS = require('ccc/global/js/modules/cccllpBanks');
var Confirm = require('ccc/global/js/modules/cccConfirm');
var accountService = require('ccc/newAccount/js/main/service/account').accountService;
var CommonService = require('ccc/global/js/modules/common').CommonService;
var CccOk = require('ccc/global/js/modules/cccOk');
// 过滤银行卡，只显示enabled=true的
var banks = _.filter(LLPBANKS, function (r) {
    return r.enable === true;
});

if (CC.user.account) {
    CC.user.account.Faccount = utils.bankAccount(CC.user.account.account);
}

var banksabled = _.filter(CC.user.bankCards, function (r) {
    return r.deleted === false;
});

var ractive = new Ractive({
    el: "#ractive-container",
    template: require('ccc/newAccount/partials/settings/bankCards.html'),

    data: {
        status: banksabled.length ? 1 : 0,
        payment: CC.user.name ? true : false,
        banks: banks,
        msg: {
            BANK_NULL: false,
            CARD_NULL: false,
            CARD_INVALID: false,
        },
        bank: '',
        bankAccount: banksabled || [],
        province: '',
        city: '',
        ifDel: false,
        mobile: CC.user.mobile,
        realName: CC.user.name,
        isAuditing : CC.user.fundaccountsMap.data.auditingList.length > 0 ? true : false,
        authenticated: CC.user.authenticates.idauthenticated || false
    },
    oninit: function () {
        accountService.getUserInfo(function (o) {
            ractive.set('realName', o.user.name);
        });
    },
    oncomplete: function () {
        accountService.getProvince(function (res) {
            ractive.set('province', changeToList(res));
            ractive.set('myProvince','安徽省');
            var fProvince = ractive.get('myProvince') || '安徽省';
            accountService.getCity(fProvince, function (res) {
                ractive.set('city', changeToList(res));
            });
        });
    }
});

ractive.on("validateCardNo", function () {
    var no = this.get("cardNo");
    if (!/^\d*$/.test(no)) {
        this.set("cardNoError", true);
    } else {
        this.set("cardNoError", false);
    }
});

ractive.on('checkSame', function () {
    var no = this.get("cardNo");
    var reno = this.get("recardNo");

    if (reno !== '') {
        if (no !== reno) {
            this.set('cardDiff', true);
            this.set("cardNoError", false);
        } else {
            this.set('cardDiff', false);
        }
    }
});


ractive.on('checkSmsCaptcha', function () {
    var smsCaptcha = this.get('smsCaptcha');
    if (smsCaptcha === '') {
        this.set('SMS_NULL', true);
    } else {
        this.set('SMS_NULL', false);
    }
});

ractive.on("validatePhoneNo", function () {
    var no = this.get("phoneNo");
    if (!/^\d*$/.test(no)) {
        this.set("phoneNoError", true);
    } else {
        this.set("phoneNoError", false);
    }
});

ractive.on('doDel', function () {
    this.set('ifDel',true);
});
ractive.on("bind-card-submit", function (e) {
    e.original.preventDefault();
    var cardNoError = this.get("cardNoError");
    var phoneNoError = this.get("phoneNoError");
    var SMS_NULL = this.get('SMS_NULL');
    if (cardNoError || phoneNoError || SMS_NULL) {
        return false;
    }
    // var bankr= _.filter(CC.user.bankCards, function (r) {
    // return r.deleted === false;
    // });
    var bankName = this.get('bankName');
    var cardNo = this.get('cardNo');
    var cardPhone = this.get('mobile');
    var province = this.get('myProvince');
    var city = this.get('myCity');
    var branchName = this.get('branchName');
    var smsCaptcha = this.get('smsCaptcha');

    var sendObj = {
        bankName: bankName,
        cardNo: cardNo,
        cardPhone: cardPhone,
        province: province,
        city: city,
        branchName: branchName,
        smsCaptcha: smsCaptcha
    }

    $.post('/lianlianpay/bindCard', sendObj, function (r) {
        if(r.success) {
            CccOk.create({
                msg: '绑卡成功', 
                okText: '确定',
                ok: function () {
                    window.location.reload();
                },
                cancel: function () {
                    window.location.reload();
                }
            });
        } else {
            CccOk.create({
                msg: '绑卡失败，' + r.error[0].message, 
                okText: '确定',
                ok: function () {
                    window.location.reload();
                },
                cancel: function () {
                    window.location.reload();
                }
            }); 
        }
    });
});

ractive.on("delete-card-submit", function (e) {
    e.original.preventDefault();
    Confirm.create({
        msg: '请先确认当前的投资待还本金全部结清，再进行解绑银行卡！',
        okText: '确定解绑',
        cancelText: '取消解绑',
        ok: function () {
            $('.btn-confirm-cancel').trigger('click');
            $.post('/lianlianpay/deleteCard', {
                cardNo : ractive.get('bankAccount[0].account.account'),
                paymentPassword : ractive.get('password')
            }, function (r) {
                if(r.success) {
                    CccOk.create({
                        msg: '删卡申请成功，请等待审核!', 
                        okText: '确定',
                        ok: function () {
                            window.location.reload();
                        },
                        cancel: function () {
                            window.location.reload();
                        }
                    });
                } else {
                    CccOk.create({
                        msg: '删卡失败，' + r.error[0].message, 
                        okText: '确定',
                        ok: function () {
                            window.location.reload();
                        },
                        cancel: function () {
                            window.location.reload();
                        }
                    }); 
                }

            });
        },
        cancel: function () {
        }
    });
    
});

ractive.on('selectPro', function () {
    var province = this.get('myProvince');
    accountService.getCity(province, function (res) {
        ractive.set('city', changeToList(res));
    });
});

function changeToList(map) {
    var _arr = [];
    for (var key in map) {
        var tmp = {};
        tmp.key = key;
        tmp.val = map[key];
        _arr.push(tmp);
    }

    return _arr;
};

ractive.on('sendCode', function (){

    if (!this.get('isSend')) {
        this.set('isSend', true);
        var smsType = 'CREDITMARKET_CAPTCHA';
        CommonService.getMessage(smsType, function (r) {
            if (r.success) {
                countDown();
            }
        });
    }
});

function countDown() {
    $('.sendCode')
        .addClass('disabled');
    var previousText = '获取验证码';
    var msg = '$秒后重新发送';

    var left = 60;
    var interval = setInterval((function () {
        if (left > 0) {
            $('.sendCode')
                .html(msg.replace('$', left--));
        } else {
            ractive.set('isSend', true);
            $('.sendCode')
                .html(previousText);
            $('.sendCode')
                .removeClass('disabled');
            clearInterval(interval);
        }
    }), 1000);
}