import React, { useEffect, useState } from 'react'
import { Layout, theme, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader/indxe'
import NavFooter from '@/components/NavFooter'
import SideMenu from '@/components/Menu'
import { Outlet } from 'react-router-dom'
import api from '@/api'
import { useStore } from '@/store'
import styles from './index.module.less'

const { Content, Footer, Sider, Header } = Layout

const LayoutFC: React.FC = () => {
	const updateUserInfo = useStore(state => state.updateUserInfo)
	const collapsed = useStore(state => state.collapsed)
	const getUserInfo = async () => {
		const data = await api.getUserInfo()
		updateUserInfo(data)
	}
	useEffect(() => {
		getUserInfo()
	}, [])

	return (
		<Watermark content={'react'}>
			<Layout>
				<Sider collapsed={collapsed}>
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
