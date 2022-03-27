import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
// react-router-dom 6以上版本 Switch 已经用Routes替换
// 此处重新安装了5版的react-router-dom和react-router
import Login from './Login'
import AdminIndex from './AdminIndex'
function Main() {
    return (
        <Router>
            <Route path="/" exact component={Login}></Route>
            <Route path="/index/" component={AdminIndex}></Route>
        </Router>
        
    )
}
export default Main