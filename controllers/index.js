/**
 * Created by admin on 2017/3/27.
 */
var cookie = require('../helpers/cookie.js');
var article = require('../models/article');
var user = require('../models/user');

module.exports = function (req, res, next) {
    cookie(req, res, function (viewModel) {
        //设置布局页的导航显示当前栏目，每个item对应相应的栏目
        viewModel.currentPage = {
            item1: 'active'
        };

        article.find({}).limit(10).sort('-publishTime').populate('author', ['avatar', 'username', 'workId']).exec(function (err, articles) {
            if (err) {
                throw err;
            }
            viewModel.articles = articles;
            res.render('index', {title: '首页', viewModel: viewModel});
        });


    });
};