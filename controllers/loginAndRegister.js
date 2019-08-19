var user = require('../models/user.js');
var session = require('express-session');
var path = require('path');
var fs = require('fs');
var cookie = require('../helpers/cookie.js')





module.exports = {
    registration: function(req, res, next){
        // cookie(req, res, function(viewModel) {
        //     res.render('./loginAndRegister/register', {title: '注册'});
        // });
        res.render('./loginAndRegister/register', {title: '注册'});
    },
    success: function(req, res, next){
        cookie(req, res, function(viewModel){
            if(req.body){
                //验证表单信息
                var workId = /^\d{4}$/.test(req.body.workId) || /^\d{5}$/.test(req.body.workId);
                var username = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(req.body.username);
                var position = req.body.position != 0;
                var password = /^(\w){6,20}$/.test(req.body.password);

                if(workId && username && position && password){
                    var newUser = new user(req.body);

                    newUser.save(function(err){
                        if(err){ throw err; }
                        //设置cookie 同一个域名下的不同cookie可以设置不同的过期时间
                        res.cookie('workId', req.body.workId, { maxAge: 1000*60*60*24*15, httpOnly: true });

                        //设置session
                        req.session.user = {
                            userLogined: true,
                            username: req.body.username,
                            workId: req.body.workId,
                            position: req.body.position,
                            avatar: '/images/codeMonkey.jpg'
                        };
                        res.render('loginAndRegister/success', { title: '注册成功' });
                    });
                }
            }
        });
    },
    verifyWorkId: function(req, res, next){
        var workId = req.params.workId;
        user.findOne({ UserNum: workId }, function(err, user){
            if(err){ throw err; };
            if(user){
                res.json(true);
            }else{
                res.json(false);
            }
        })
    },
    login: function(req, res, next){
        if(/^\d{4}$/.test(req.body.workId) || /^\d{5}$/.test(req.body.workId)){
            user.findOneAndUpdate({ workId: req.body.workId }, { $set: { lastLoginTime: Date.now() }, $inc: { loginTimes: 1 } }, function(err, user){
                //findbyId必须是id,workId不是id
                if(err){ throw err; }
                if(user){
                    if(user.password == req.body.password){
                        //设置cookie 同一个域名下的不同cookie可以设置不同的过期时间
                        res.cookie('workId', req.body.workId, { maxAge: 1000*60*60*24*15, httpOnly: true });

                        //设置session
                        req.session.user = {
                            userLogined: true,
                            username: user.username,
                            workId: user.workId,
                            position: user.position,
                            avatar: user.avatar
                        };
                        res.json(true);
                    }else{
                        res.json(false);
                    }
                }else{
                    res.json(false);
                }
            });
        }else{
            return false;
        }

    },
    quit: function(req, res, next){
        var viewModel = {};
        viewModel.currentPage = {
            item1:'active'
        };
        res.clearCookie('workId');
        req.session.user = null;

        res.render('index', { title: '首页', viewModel: viewModel });

    },
    modifyAvatar: function(req, res, next){
        var extname = path.extname(req.file.originalname);
        //上传文件大小小于2M，格式为png/jpg/gif/bmp的图片格式
        if(extname == '.png' || extname == '.jpg' || extname == '.gif' || extname == '.bmp'){
            if(req.file.size <= 2000000){
                //更新数据库头像
                user.update({ workId: req.session.user.workId }, { $set: { avatar: '/uploads/avatar/' + req.file.filename } }, function(err){
                    if(err){ throw err; }
                    //更新session头像信息
                    req.session.user.avatar = '/uploads/avatar/' + req.file.filename;
                    res.json({ avatar: '/uploads/avatar/' + req.file.filename, errorCode: 1 });
                });
            }else{
                //删除未达上传要求的文件
                fs.unlink(req.file.path, function(err){
                    if(err){ throw err; }
                    res.json({ errorMessage: '上传文件不能大于2M！', errorCode: 0 });
                });
            }
        }
        else{
            //删除未达上传要求的文件
            fs.unlink(req.file.path, function(err){
                if(err){ throw err; }
                res.json({ errorMessage: '头像必须为图片格式的文件', errorCode: 0 });
            });
        }


    },
    uploadArticleImage: function(req, res, next){
        var extname = path.extname(req.file.originalname);
        //上传文件大小小于2M，格式为png/jpg/gif/bmp的图片格式
        if(extname == '.png' || extname == '.jpg'|| extname == '.jpeg' || extname == '.gif' || extname == '.bmp'){
            if(req.file.size <= 2000000){
                //更新数据库头像
                user.update({ workId: req.session.user.workId }, { $set: { avatar: '/uploads/images/' + req.file.filename } }, function(err){
                    if(err){ throw err; }
                    //更新session头像信息
                    req.session.user.avatar = '/uploads/images/' + req.file.filename;
                    res.json({ image: '/uploads/images/' + req.file.filename, errorCode: 1 });
                });
            }else{
                //删除未达上传要求的文件
                fs.unlink(req.file.path, function(err){
                    if(err){ throw err; }
                    res.json({ errorMessage: '上传文件不能大于2M！', errorCode: 0 });
                });
            }
        }
        else{

            //删除未达上传要求的文件
            fs.unlink(req.file.path, function(err){
                if(err){ throw err; }
                res.json({ errorMessage: '必须为图片格式的文件', errorCode: 0 });
            });
        }


    }
};