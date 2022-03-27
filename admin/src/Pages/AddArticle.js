import React, { useState, useEffect } from 'react'
import {marked} from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('请选择分类') //选择的文章类别
    
    useEffect(() => {
        getTypeInfo()
        // 获取文章id
        let tempId = props.match.params.id
        if (tempId)
        {
            setArticleId(tempId)
            getArticleById(tempId)

        }
    },[])
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false
    })

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true,

        }).then(
            res => {
                if (res.data.data == '没有登录')
                {
                    localStorage.removeItem('openId')
                    props.history.push('/')
                }
                else {
                    setTypeInfo(res.data.data)
                }
            }
        )
    }
    const selectTypeHandler = (value) => {
        setSelectType(value)        
    }

    const saveArticle = () => {
        if (!selectedType) {
            message.error('请选择文章类别')
            return false
        } else if (!articleTitle)
        {
            message.error('请填写文章标题')
            return false
        } else if (!articleContent) {
            message.error('请填写文章内容')
            return false
        } else if (!introducemd)
        {
            message.error('请填写文章简介')
            return false
        } else if (!articleTitle)
        {
            message.error('请填写文章名称')
            return false
        } else if (selectedType == '请选择分类')
        {
            message.error('请选择文章类别')
            return false
        }
        else if (!showDate)
        {
            message.error('请填写发布日期')
            return false
        }
        let dataProps = {}
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduction = introducemd
        dataProps.add_time = showDate
        
        if (articleId == 0) {
            dataProps.view_count = 0
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials:true
            }).then(
                res => {
                    console.log(res.data.insertId)
                    console.log(res.data.isSuccess)
                    setArticleId(res.data.insertId)
                    if (res.data.isSuccess) {
                        message.success('保存成功')
                    } else
                    {
                        message.error('保存失败')    
                    }
                    
                }
            )
        } else
        {
            dataProps.id = articleId
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                data: dataProps,
                withCredentials:true
            }).then(
                res => {
                    if (res.data.isSuccess) {
                        message.success('修改成功')
                    }
                    else {
                        message.error('修改失败')
                    }
                }
            )
        }
    }
    
    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, { withCredentials: true }).then(
            res => {
                let articleInfo = res.data.data[0]
                setArticleTitle(articleInfo.title)
                setArticleContent(articleInfo.content)
                let html = marked(articleInfo.content)
                setMarkdownContent(html)
                setIntroducemd(articleInfo.introduction)
                let tempIntro = marked(articleInfo.introduction)
                setIntroducehtml(tempIntro)
                setShowDate(articleInfo.add_time)
                setSelectType(articleInfo.typeId)
            }
        )
    }
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={25}>
                        <Col span={19}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={ e=>{setArticleTitle(e.target.value)}}/>
                        </Col>
                        <Col span={5}>
                            &nbsp;
                            <Select value={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item) => {
                                        return (<Option key={item.id} value={item.id}>{ item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className="markdown-content"
                                rows={36}
                                placeholder="文章内容"
                                value={articleContent}
                                onChange={changeContent}
                            >
                            
                            </TextArea>
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{__html:markdownContent}}
                            ></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row getters={10}>
                        <Col span={11}>
                            <Button style={{ 'marginLeft': '32px' }} size="large">暂存文章</Button>&nbsp;
                        </Col>
                        <Col span={11}>
                            <Button type="primary" style={{ 'marginLeft': '45px' }} size="large" onClick={saveArticle}>发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <TextArea
                                rows={12}
                                placeholder="文章简介"
                                value={introducemd}
                                onChange={changeIntroduce}
                            ></TextArea>
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={ {__html:introducehtml}}
                            ></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(date, dateString)=>{setShowDate(dateString)}}
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="修改日期"
                                    size="large"
                                    style={{ "marginLeft": "15px" }}
                                    onChange={(date, dateString)=>{setUpdateDate(dateString)}}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle