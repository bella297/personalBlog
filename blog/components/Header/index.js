import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../../config/apiURL'
import '../../node_modules/antd/dist/antd.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined,  HeartOutlined } from '@ant-design/icons'
// import style from './index.module.css'

function Header() {
    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method:'get',
                url: servicePath.getTypeInfo,
                header:{ 'Access-Control-Allow-Origin':'*' }
            }).then(
                (res) => {
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, []) // 后面这个方括号中放入当其改变就驱动执行前一个函数参数执行的值 当它为空时是指组件第一次挂载时才执行前面的函数
    
    
    const handleClick = (e) => {
        if (e.key == 0)
        {
            Router.push('/') // 对应地址是/ 而不是index
        } else {
            Router.push('/list?id=' + e.key)
        }
    }
    return (
        <div className='header'>
            <Row type='flex' justify='center'>
                <Col xs={24} sm={24} md={8} lg={15} xl={ 10}>
                    <span className='header-logo'>YuSze</span>
                    <span className='header-text'>Don't have a good day, have a great day.</span>
                </Col>
                <Col xs={0} sm={0} md={16} lg={8} xl={ 8}>
                    <Menu mode='horizontal' onClick={ handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined/>
                            &nbsp;首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.id}>
                                        <HeartOutlined />
                                        &nbsp;{ item.typeName}
                                    </Menu.Item>
                                )                                
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header