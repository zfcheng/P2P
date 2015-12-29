var express = require('express');
var router = express.Router();
var user = require('../server/controllers/user')
/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/reg', function(req, res) {
  res.render('reg', { title: '注册' });
});
router.get('/log', function(req, res) {
  res.render('login', { title: '登陆' });
});
router.get('/applyloan', function(req, res) {
  res.render('applyloan', { title: '借款' });
});
router.get('/guide', function(req, res) {
  res.render('guide', { title: '新手引导' });
});
router.get('/account/home', function(req, res) {
  res.render('account_home', { title: '个人中心主页' });
});
router.get('/account/settings/userInfo', function(req, res) {
    var tabName = req.url.split('/');
    res.render('settings', {
        title: '',
        tabName: tabName[3]
    });
});
router.get('/account/settings/authentication', function(req, res) {
    var tabName = req.url.split('/');
    res.render('settings', {
        title: '借款',
        tabName: tabName[3]
    });
});
router.get('/account/settings/password', function(req, res) {
    var tabName = req.url.split('/');
    res.render('settings', {
        title: '借款',
        tabName: tabName[3]
    });
});
router.get('/account/settings/bankCards', function(req, res) {
    var tabName = req.url.split('/');
    res.render('settings', {
        title: '借款',
        tabName: tabName[3]
    });
});
router.get('/account/settings/resetPassword', function(req, res) {
    var tabName = req.url.split('/');
    res.render('settings', {
        title: '借款',
        tabName: tabName[3]
    });
});
router.get('/account/message', function(req, res) {
    res.render('message', {
        title: '消息'
    });
});



router.get('/test', user.test);
module.exports = router;
