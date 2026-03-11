import { Layout } from 'antd'
import AvatarIcon from './components/AvatarIcon'
import CollapseIcon from './components/CollapseIcon'
import BreadcrumbNav from './components/BreadcrumbNav'
import AssemblySize from './components/AssemblySize'
import Theme from './components/Theme'
import Fullscreen from './components/Fullscreen'
import './index.less'

const LayoutHeader = () => {
	const { Header } = Layout;

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
				<span className="username">hooks</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
