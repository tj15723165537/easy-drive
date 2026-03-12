import { Layout, Spin } from 'antd'
import { useEffect } from 'react'
import AvatarIcon from './components/AvatarIcon'
import CollapseIcon from './components/CollapseIcon'
import BreadcrumbNav from './components/BreadcrumbNav'
import AssemblySize from './components/AssemblySize'
import Theme from './components/Theme'
import Fullscreen from './components/Fullscreen'
import useGlobalStore, { UserInfo } from '@/store'
import { getUserInfoApi } from '@/api/modules/login'
import './index.less'

const LayoutHeader = () => {
	const { Header } = Layout
	const token = useGlobalStore((s) => s.token)
	const userInfo = useGlobalStore((s) => s.userInfo) as UserInfo | null
	const setUserInfo = useGlobalStore((s) => s.setUserInfo)

	// 如果有 token 但没有用户信息，就获取用户信息
	useEffect(() => {
		if (token && !userInfo) {
			getUserInfoApi().then((res) => {
				if (res.data) {
					setUserInfo(res.data)
				}
			}).catch(() => {
				// 忽略错误
			})
		}
	}, [token, userInfo, setUserInfo])

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				<AssemblySize />
				<Theme />
				<Fullscreen />
				<span className="username">
					{userInfo?.nickname || userInfo?.username || (
						<Spin size="small" />
					)}
				</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
