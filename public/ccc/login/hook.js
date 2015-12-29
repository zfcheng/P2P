'use strict';
module.exports = function (hook) {
    hook.get('/login', function (locals, expose) {
        var user = locals.user;
        expose(user, 'user');

        return {
            views: 'login/index',
            locals: {
                title : '登录_奇乐融_联想控股成员企业-正奇金融旗下互联网金融战略平台',
                keywords : '奇乐融登录',
                description : '奇乐融(www.qilerong.com) - 联想控股成员企业--正奇金融旗下互联网金融战略平台，由安徽唯源金融信息服务有限公司运营。践行普惠金融，助力财富增值。奇乐融致力于为中小微企业及个人提供专业、透明、安心、稳盈的互联网金融服务。'
            }
        }
    }); 
}
