import styles from './index.module.less'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
	DesktopOutlined,
	UsergroupAddOutlined,
	SettingOutlined,
	MenuOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem
}

const items: MenuItem[] = [
	getItem('工作台', '1', <DesktopOutlined />),
	getItem('系统管理', '2', <SettingOutlined />, [
		getItem('用户管理', 'sub2-1', <UsergroupAddOutlined />),
		getItem('菜单管理', 'sub2-2', <MenuOutlined />),
		getItem('角色管理', 'sub2-3'),
		getItem('部门管理', 'sub2-4'),
	]),
	getItem('订单管理', '3', <SettingOutlined />, [
		getItem('订单列表', 'sub3-1'),
		getItem('订单聚合', 'sub3-2'),
		getItem('司机列表', 'sub3-3'),
	]),
]

const SideMenu = () => {
	const navigate = useNavigate()
	const handleClickLogo = () => {
		navigate('/welcome')
	}
	const collapsed = useStore(state => state.collapsed)

	return (
		<div>
			<div className={styles.logo} onClick={handleClickLogo}>
				{collapsed ? (
					<img src='/imgs/logo.png' className={styles.img} />
				) : (
					<>
						<img src='/imgs/logo.png' className={styles.img} />
						<span>慕慕货运</span>
					</>
				)}
			</div>
			<Menu
				// defaultSelectedKeys={['1']}
				// defaultOpenKeys={['sub1']}
				mode='inline'
				theme='dark'
				items={items}
			/>
		</div>
	)
}

export default SideMenu
