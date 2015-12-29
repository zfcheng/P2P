/**
 * @file 账户数据对接模块交互逻辑
 * @author xushusheng(jason.xu@creditcloud.com)
 */

'use strict';

exports.accountService = {
    registerUmpay: function (user, next) {
        request('POST', '/api/v2/upayment/register/MYSELF')
            .type('form')
            .send(user)
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    bindAgrement: function(agreementList,next) {
        request('POST', '/api/v2/upayment/bindAgreement/MYSELF')
            .type('form')
            .send({agreementList: agreementList})
            .end()
            .then(function (r) {
                next(r.body);
            });
        
    },
    
    getLoanCount: function(status,next){         
        var api = '/api/v2/user/MYSELF/loan/count';
        api = api+status;
        request('GET', api)                
        .end()
            .then(function (r) {                  
                if( r.body.data > 0 ){                    
                    next(r.body.data);                    
                } else {
                    next(0);
                }
            });
    },
    authenticateUser: function(user, next) {
        request('POST', '/api/v2/lianlianpay/authenticateUser/MYSELF')
            .type('form')
            .send(user)
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    checkAuthenticate: function (next) {
        request('GET', '/api/v2/user/MYSELF/authenticates')
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    getProvince: function (next) {
        request('GET', '/api/v2/lianlianpay/provinceCodes')
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    getCity: function (provinceName, next) {
        request('GET', encodeURI('/api/v2/lianlianpay/provinceCityCodes/' + provinceName))
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    getUserInfo: function (next) {
        request('GET', '/api/v2/user/MYSELF/userinfo')
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    getAccount: function (next) {
        request('GET', '/api/v2/user/MYSELF/fundaccounts')
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    feedback:function(userId,params,next){
          request('POST', '/api/v2/user/'+userId+'/feedback')
            .type('form')
            .send(params)
            .end()
            .then(function (r) {
                next(r.body);
            });
        
    },
    saveAutoBidConfig: function(params, next){
        $.post('/api/v2/user/MYSELF/save_autobid_config', params, function(r){
            next(r);
            return r;
        });
    },
    getTotalInters:function(next){
         request('GET', '/api/v2/points/user/'+CC.user.id+'/getTotalPoints')
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    initialPassword: function (password, next) {
        request('POST', '/api/v2/user/MYSELF/setPaymentPassword')
            .type('form')
            .send({password : password})
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    updatePassword: function (oldPassword, newPassword, next) {
        request('POST', '/api/v2/user/MYSELF/updatePaymentPassword')
            .type('form')
            .send({
                oldPassword : oldPassword,
                newPassword : newPassword
            })
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    resetPassword: function (password, smsCaptcha, next) {
        request('POST', '/api/v2/user/MYSELF/resetPaymentPassword')
            .type('form')
            .send({
                password : password,
                smsCaptcha : smsCaptcha
            })
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    checkPassword: function (password, next) {
        request('GET', '/api/v2/user/MYSELF/validatePaymentPassword?password=' + password)
            .end()
            .then(function (r) {
                next(r.body);
            });
    },
    getGroupMedal: function (next) {
        request('GET', '/api/v2/users/MYSELF/groupMedal')
                .end()
                .then(function (r) {
                    var results = r.body.results;
                    if (results) {
                        for(var i = 0; i < results.length; i ++) {
                            
                            results[i] = results[i] + "!3";
                        } 

                        next(results);
                    } else {
                        next([]);
                    }
            })
    },
    updatePersonalInfo:function(male,educationLevel,maritalStatus,next) {
        request('PUT', '/api/v2/user/MYSELF/personal')
            .type('form')
            .send({
                male: male,
                educationLevel: educationLevel,
                maritalStatus: maritalStatus
            })
            .end()
            .then(next);
    },
    updateCareerInfo:function(companyIndustry,salary,next) {
        request('PUT', '/api/v2/user/MYSELF/career')
            .type('form')
            .send({
                companyIndustry: companyIndustry,
                salary: salary 
            })
            .end()
            .then(next);
    },
    getCurrentMonthLoan:function(to,from,next){
        request('GET','/api/v2/user/MYSELF/investRepayments/1/10?to='+to+'&from='+from)
        .end().then(function(res){
            next(res.body);
        });
    },
    getVipLevel: function (next) {
        request('GET','/api/v2/user/MYSELF/membership')
            .end()
            .then(function(res){
                next(res.body);
        });
    }
};
