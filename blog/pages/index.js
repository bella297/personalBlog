import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List } from 'antd'
import '../node_modules/antd/dist/antd.css'
import { CalendarOutlined, FolderOpenOutlined, FireOutlined } from '@ant-design/icons'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Header from '../components/Header/index.js'
import Author from '../components/Author/index.js'
import Advert from '../components/Advert/index.js'
import Footer from '../components/Footer/index.js'
import servicePath from '../config/apiURL'


export default function Home(list) {
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartlists: true,
    highLight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })
  const [myList, setMyList] = useState(list.data)
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          
          <List
            header={<div>最新日志</div>}
            itemLayout='vertical'
            dataSource={myList}
            renderItem={(item) => (
              <List.Item>
                <div className='list-title'>
                  <Link href={{pathname: '/detailed', query: { id: item.id }}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className='list-icon'>
                  <span><CalendarOutlined />&nbsp;{ item.add_time}</span>
                  <span><FolderOpenOutlined />&nbsp;{ item.typeName}</span>
                  <span><FireOutlined />&nbsp;{item.view_count}</span>
                </div>
                <div className='list-context' dangerouslySetInnerHTML={{__html:marked(item.introduction)}}></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (response) => {
        resolve(response.data);
      }
    )
  })
  return await promise;

}
