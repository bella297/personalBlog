'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'Hi~, API'
    }
    async getArticleList() {
        let sql = 'SELECT article.id as id, article.title as title, ' +
            "article.introduction as introduction, date_format(article.add_time,'%Y-%m-%d') as add_time, " +
            'article.view_count as view_count, type.typeName as typeName, ' +
            'article.article_content as content ' +
            // 最后要加空格 和from连在一起就错了！
            'FROM article LEFT JOIN type ON article.type_id = type.id;'
        const results = await this.app.mysql.query(sql);
        this.ctx.body = { data: results };
    }

    // 根据文章id获取文章内容及其他信息的接口 
    async getArticleById() {
        let id = this.ctx.params.id // 通过前台传递过来的数据
        let sql = 'SELECT article.id as id, article.title as title, ' +
            "article.introduction as introduction, date_format(article.add_time,'%Y-%m-%d') as add_time, " +
            'article.view_count as view_count, type.typeName as typeName, ' +
            'type.id as typeId, ' +
            'article.article_content as content ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'WHERE article.id = ' + id;
        const result = await this.app.mysql.query(sql);
        this.ctx.body = { data: result };
    }

    // 得到类别名称和编号 
    async getTypeInfo() {
        const result = await this.app.mysql.select('type');
        this.ctx.body = { data: result };
    }

    // 根据类别ID获得文章列表
    async getListById() {
        let id = this.ctx.params.id;
        let sql = 'SELECT article.id as id, article.title as title, ' +
            "article.introduction as introduction, date_format(article.add_time,'%Y-%m-%d') as add_time, " +
            'article.view_count as view_count, type.typeName as typeName, ' +
            'article.article_content as content ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'WHERE type_id=' + id;
        const results = await this.app.mysql.query(sql);
        this.ctx.body = { data: results };
    }



}

module.exports = HomeController;