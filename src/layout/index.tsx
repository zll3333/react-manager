import React, { useEffect, useState } from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader/indxe'
import NavFooter from '@/components/NavFooter'
import SideMenu from '@/components/Menu'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
import api from '@/api'
import { useStore } from '@/store'
import styles from './index.module.less'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { routers } from '@/router'
import Tabs from '@/components/Tabs/Tabs'
import { stat } from 'fs/promises'

const { Content, Footer, Sider, Header } = Layout

const LayoutFC: React.FC = () => {
	const updateUserInfo = useStore(state => state.updateUserInfo)
	const collapsed = useStore(state => state.collapsed)
	const isdark = useStore(state => state.isDark)

	const { pathname } = useLocation()
	const getUserInfo = async () => {
		const data = await api.getUserInfo()
		updateUserInfo(data)
	}

	useEffect(() => {
		getUserInfo()
	}, [])
	const route = searchRoute(pathname, routers)
	if (route && route.meta?.auth === false) {
		//继续执行
	} else {
		const data = useRouteLoaderData('layout') as IAuthLoader
		const staticPath = ['/welcome', '/404', '/403']
		if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
			return <Navigate to='/403' />
		}
	}

	return (
		<Watermark content={'react'}>
			<Layout>
				<Sider collapsed={collapsed} theme={isdark ? 'light' : 'dark'}>
					<SideMenu />
				</Sider>
				<Layout>
					<Header
						style={{
							position: 'sticky',
							zIndex: 1,
							top: 0,
							padding: 0,
							backgroundColor: '#fff',
							height: 50,
						}}>
						<NavHeader />
					</Header>
					<Tabs />
					<Content className={styles.content}>
						<div className={styles.wrapper}>
							<Outlet />
						</div>
						<Footer style={{ textAlign: 'center' }}>
							<NavFooter />
						</Footer>
					</Content>
				</Layout>
			</Layout>
		</Watermark>
	)
}

export default LayoutFC
