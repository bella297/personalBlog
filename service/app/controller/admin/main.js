'use strict'
const Controller = require('egg').Controller

class MainController extends Controller{
    async index() {
        this.ctx.body = "hi~ api"
    }
    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = `SELECT userName, password FROM admin_user WHERE userName="${userName}" AND password="${password}"`
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'data': '登录成功', 'openId': openId }
        } else {
            this.ctx.body = {'data':'登录失败'}
        }
    }
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {data:resType}
    }
    
    async addArticle() {
        let tempArticle = this.ctx.request.body // 获取前台数据
        const result = await this.app.mysql.insert('article', tempArticle)
        const insertSuccess = (result.affectedRows === 1)
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId:insertId
        }
    }

    async updateArticle() {
        let tempArticle = this.ctx.request.body // 获取post传递的参数
        const result = await this.app.mysql.update('article', tempArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    async getArticleList() {
        let sql = 'SELECT article.id as id, article.title as title, ' +
            "article.introduction as introduction, date_format(article.add_time,'%Y-%m-%d') as add_time, " +
            'article.view_count as view_count, type.typeName as typeName, ' +
            'article.article_content as content ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'ORDER BY article.id DESC';
        const resList = await this.app.mysql.query(sql)
        this.ctx.body = {list:resList}
    }

    async delArticle() {
        let id = this.ctx.params.id // 因为用get的方式传 故可以如此取到id
        const res = await this.app.mysql.delete('article', { 'id': id })
        this.ctx.body={data:res}

    }
    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id, article.title as title, ' +
            "article.introduction as introduction, date_format(article.add_time,'%Y-%m-%d') as add_time, " +
            'article.view_count as view_count, type.typeName as typeName, ' +
            'article.article_content as content,' +
            'type.id as typeId '+
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'WHERE article.id=' + id;
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }
}

module.exports = MainController