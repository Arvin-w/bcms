/**
 * Created by admin on 2017/3/31.
 */


module.exports = function(req, res, callback){


    //方便测试
    // res.cookie('workId', 1111, { maxAge: 100000*60*60*24*15, httpOnly: true });
    //
    // //设置session
    // req.session.user = {
    //     userLogined: true,
    //     username: '中国知网',
    //     workId: 1111,
    //     position: 1,
    //     avatar: '/images/codeMonkey.jpg'
    // };
    //方便测试







    var workId = req.cookies.workId;
    var user = req.session.user;

    var viewModel = {};
    if(typeof workId != 'undefined' && workId != null){ //cookie数据存在
       if(typeof user != 'undefined' && user.workId == workId){ //session数据存在
           viewModel.loginInfo = {
               userLogined: user.userLogined,
               username: user.username,
               workId: user.workId,
               position: user.position,
               avatar : user.avatar
           };
       }else{
           viewModel.loginInfo = null;
       }
    }else{ //cookie数据不存在
       viewModel.loginInfo = null;
    }


    //回调
    callback(viewModel);
};

