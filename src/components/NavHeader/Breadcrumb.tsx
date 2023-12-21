import { IAuthLoader } from '@/router/AuthLoader'
import { findTreeNode } from '@/utils'
import { Breadcrumb } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import { findDOMNode } from 'react-dom'
import { useLocation, useRouteLoaderData } from 'react-router-dom'

export default function BreadCrumb() {
	const { pathname } = useLocation()
	const data = useRouteLoaderData('layout') as IAuthLoader
	const [breadItem, setBreatItem] = useState<(string | ReactNode)[]>([])
	const items = findTreeNode(data.menuList, pathname, [])
	useEffect(() => {
		setBreatItem([<a href='/welcome'>首页</a>, ...items])
	}, [pathname])

	return (
		<Breadcrumb
			items={breadItem.map(item => {
				return { title: item }
			})}></Breadcrumb>
	)
}
