module.exports = app => {
    const { router, controller } = app;
    var adminauth = app.middleware.adminauth()
        // 参数1：路由的路径 参数2：cotroller文件下的方法
    router.get('/admin/index', adminauth, controller.admin.main.index);
    router.post('/admin/checkLogin', controller.admin.main.checkLogin);
    router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
    router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
    router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
    router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
    router.get('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle);
    router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);

}

// 要在外层文件router中配置 require('./router/admin')(app)