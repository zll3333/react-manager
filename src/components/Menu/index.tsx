import styles from './index.module.less'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import * as Icons from '@ant-design/icons'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { useStore } from '@/store'
import React, { useEffect, useState } from 'react'
import { Menu as IMenu } from '@/types/api'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		label,
		key,
		icon,
		children,
		type,
	} as MenuItem
}

const SideMenu = () => {
	const navigate = useNavigate()
	const [menuItem, setTreeMenu] = useState<MenuItem[]>()
	const handleClickLogo = () => {
		navigate('/welcome')
	}
	const isdark = useStore(state => state.isDark)
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	const { pathname } = useLocation()

	const collapsed = useStore(state => state.collapsed)

	const data: any = useRouteLoaderData('layout')
	//递归生成菜单
	const getTreeItem = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
		menuList.forEach((item, index) => {
			if (item.menuType === 1 && item.menuState === 1) {
				if (item.buttons) {
					return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
				}
				treeList.push(
					getItem(
						item.menuName,
						item.path || index,
						createIcon(item.icon),
						getTreeItem(item.children || [])
					)
				)
			}
		})
		return treeList
	}

	//自定义icon
	const createIcon = (name?: string) => {
		if (!name) return <></>
		const customIcon: { [key: string]: any } = Icons
		const icon = customIcon[name]
		if (!icon) return <></>
		return React.createElement(icon)
	}

	useEffect(() => {
		const items = getTreeItem(data.menuList)
		setTreeMenu(items)
		setSelectedKeys([pathname])
	}, [])

	return (
		<div className={styles.sideMenu}>
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
				mode='inline'
				theme={isdark ? 'light' : 'dark'}
				items={menuItem}
				selectedKeys={selectedKeys}
				onClick={item => {
					navigate(`${item.key}`)
					setSelectedKeys([item.key])
				}}
			/>
		</div>
	)
}

export default SideMenu
