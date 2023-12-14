import styles from './index.module.less'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useStore } from '@/store'
import storage from '@/utils/storage'

const NavHeader = () => {
	let userInfo = useStore(store => store.userInfo)
	const items: MenuProps['items'] = [
		{
			key: 'email',
			label: <span>邮箱：{userInfo.userEmail}</span>,
		},
		{
			key: 'layout',
			label: <span>退出</span>,
		},
	]

	const onClick: MenuProps['onClick'] = ({ key }) => {
		if (key === 'layout') {
			storage.remove('token')
			location.href = '/login?callback=' + encodeURIComponent(location.href)
		}
	}

	const updateCollapsed = useStore(state => state.updateCollapsed)

	const breadList = [
		{
			title: '首页',
		},
		{
			title: '工作台',
		},
	]
	const collapsed = useStore(state => state.collapsed)
	const toggleCollapsed = () => {
		updateCollapsed()
	}

	return (
		<div className={styles.navHeader}>
			<div className={styles.left}>
				<div onClick={toggleCollapsed} className={styles.collapse}>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</div>
				<Breadcrumb items={breadList} style={{ margin: 5 }} />
			</div>
			<div className='right'>
				<Switch style={{ marginRight: 10 }} checkedChildren='暗黑' unCheckedChildren='默认' />
				<Dropdown menu={{ items, onClick }}>
					<span className={styles.nickname}>{userInfo.userName}</span>
				</Dropdown>
			</div>
		</div>
	)
}

export default NavHeader
