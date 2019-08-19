var express = require('express');
var router = express.Router();
var lr = require('../controllers/loginAndRegister.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'This is an ejs template!' });

});

//登录、退出
router.get('/login', function(req, res, next) {
    res.render('loginAndRegister/login', { title: '登录' });
});
router.post('/loginState',lr.login);
router.get('/quit', lr.quit);

// 验证工号
router.get('/verifyWorkId/:workId', lr.verifyWorkId);


//注册
router.get('/register', lr.registration);
router.post('/register/:workId', lr.verifyWorkId);

//提交注册信息
router.post('/success', lr.success);

module.exports = router;
