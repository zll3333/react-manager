import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'

type tabItems = {
	label: string
	key: string
	closable: boolean
}

export default function TabsFC() {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [tabItems, setTabItems] = useState<tabItems[]>([
		{ label: '首页', key: '/welcome', closable: false },
	])
	const [activeKey, setActiveKey] = useState<string>('')
	const data = useRouteLoaderData('layout') as IAuthLoader

	const addTabs = () => {
		const route = searchRoute(pathname, data.menuList)
		if (!route) return
		if (!tabItems.find(item => item.key === route.path)) {
			tabItems.push({
				label: route.menuName,
				key: route.path,
				closable: !(route.path == '/welcome'),
			})
		}
		setTabItems([...tabItems])
		setActiveKey(pathname)
	}
	const changeTab = (path: string) => {
		navigate(path)
	}
	const onEdit = (
		path: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
	) => {
		if (pathname === path) {
			tabItems.forEach((item, index: number) => {
				if (item.key != pathname) return
				const nextTab = tabItems[index + 1] || tabItems[index - 1]
				navigate(nextTab.key)
			})
		}
		const newTabs = tabItems.filter(item => item.key != path)
		setTabItems([...newTabs])
		console.log(tabItems)
	}
	useEffect(() => {
		addTabs()
	}, [pathname])
	return (
		<Tabs
			type='editable-card'
			activeKey={activeKey}
			items={tabItems}
			style={{ height: 40, marginBottom: 0, backgroundColor: 'var(--dark-bg-color)' }}
			hideAdd
			onChange={changeTab}
			onEdit={onEdit}></Tabs>
	)
}
