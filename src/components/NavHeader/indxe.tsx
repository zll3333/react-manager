import styles from './index.module.less'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useStore } from '@/store'
import storage from '@/utils/storage'
import BreadCrumb from './Breadcrumb'
import { useEffect } from 'react'

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
	const isDark = useStore(state => state.isDark)
	const updateIsDark = useStore(state => state.updateIsDark)
	const updateCollapsed = useStore(state => state.updateCollapsed)
	const collapsed = useStore(state => state.collapsed)
	const toggleCollapsed = () => {
		updateCollapsed()
	}
	//切换主题颜色
	const handleSwitch = (isDark: boolean) => {
		if (isDark) {
			document.documentElement.dataset.theme = 'dark' //无实际作用，只用于标识当前页面为深色调
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.dataset.theme = 'light' //无实际作用，只用于标识当前页面为深色调
			document.documentElement.classList.remove('dark')
		}
		storage.set('isdark', isDark)
		updateIsDark(isDark)
	}
	useEffect(() => {
		// updateIsDark(isDark)
		handleSwitch(isDark)
	}, [])
	return (
		<div className={styles.navHeader}>
			<div className={styles.left}>
				<div onClick={toggleCollapsed} className={styles.collapse}>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</div>

				<BreadCrumb />
			</div>
			<div className='right'>
				<Switch
					style={{ marginRight: 10 }}
					checked={isDark}
					checkedChildren='暗黑'
					unCheckedChildren='默认'
					onClick={handleSwitch}
				/>
				<Dropdown menu={{ items, onClick }}>
					<span className={styles.nickname} style={{ marginRight: 20 }}>
						{userInfo.userName}
					</span>
				</Dropdown>
			</div>
		</div>
	)
}

export default NavHeader
