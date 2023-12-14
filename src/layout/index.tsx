import React, { useEffect, useState } from 'react'
import { Layout, theme, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader/indxe'
import NavFooter from '@/components/NavFooter'
import SideMenu from '@/components/Menu'
import { Outlet } from 'react-router-dom'
import api from '@/api'
import { useStore } from '@/store'

const { Content, Footer, Sider } = Layout

const LayoutFC: React.FC = () => {
	const updateUserInfo = useStore(state => state.updateUserInfo)
	const collapsed = useStore(state => state.collapsed)
	const getUserInfo = async () => {
		const data = await api.getUserInfo()
		// store.updateUserInfo(data)
		updateUserInfo(data)
	}
	useEffect(() => {
		getUserInfo()
	}, [])

	return (
		<Watermark content={'react'}>
			<Layout>
				<Sider collapsible collapsed={collapsed}>
					<SideMenu />
				</Sider>
				<Layout>
					<NavHeader />
					<Content style={{ margin: '20px 20px 0' }}>
						<Outlet />
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						<NavFooter />
					</Footer>
				</Layout>
			</Layout>
		</Watermark>
	)
}

export default LayoutFC
