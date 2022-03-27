import { Avatar, Divider } from 'antd'
import {GithubOutlined, WechatOutlined, WeiboOutlined} from '@ant-design/icons'
import ImageAvatar from '../../public/images/avatar.jpg'

export default function Author () {
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src='../../images/avatar.jpg' /></div>
            <div className='author-introduction'>
                任何事情都看似很难，实则不难；任何事情都比你预期的更令人满意；任何事情都能办好，而且是在最佳的时刻办好；
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className='account'/>
                <Avatar size={28} icon={<WechatOutlined />} className='account'/>
                <Avatar size={28} icon={<WeiboOutlined />} className='account'/>
            </div>
        </div>
    )
}