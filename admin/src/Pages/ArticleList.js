import React, { useEffect, useState } from "react";
import {List, Row, Col, message, Modal, Button } from 'antd'
import axios from "axios";
import servicePath from "../config/apiUrl";
import '../static/css/ArticleList.css'

const { confirm } = Modal

function ArticleList(props) {
    const [myList, setMyList] = useState([])

    useEffect(() => {
        getList()
    },[])
    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials:true
        }).then(
            res => {
                setMyList(res.data.list)
            }
        )      
    }

    const delArticle = (id) => {
        confirm({
            title: '确定删除吗？',
            content: '如果点击确认，文章将被删除且不可恢复',
            onOk() {
                axios(servicePath.delArticle+id, { withCredentials: true}).then(
                    res => {
                        message.success('删除成功')
                        getList() // 此功能不太常用可以这样重新获取 此法增加了数据库的负载 在高并发高访问时不常用
                    }
                )
            },
            onCancel() {
                message.success('取消成功')
            }
        })

    }

    //修改文章的跳转方法
    const updateArticle = (id) => {
        props.history.push('/index/add/' + id) // 跳转到相应路径
        
    }
    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={myList}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                             {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                            <Col span={4}>
                              {item.view_count}
                            </Col>

                            <Col span={4}>
                                <Button type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>&nbsp;
                                {/* 此处为了传参数item.id 所以要用回调函数的形式包裹住 否则就是直接执行了 */ }
                              <Button onClick={()=>{delArticle(item.id)}}>删除 </Button>
                            </Col>
                        </Row>
                    </List.Item>)
                }
            />
        </div>
    )
}

export default ArticleList