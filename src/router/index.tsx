import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '@/layout'
import Error404 from '@/views/Error/404'
import Error403 from '@/views/Error/403'
import AuthLoader from './AuthLoader'
import lazyLoad from './lazyLoad'
import { lazy } from 'react'
export const routers = [
	{
		path: '/',
		// element:</>
		element: <Navigate to='/welcome' />,
	},
	{
		path: '/login',
		element: lazyLoad(lazy(() => import('@/views/Login'))),
	},

	{
		element: <Layout />,
		id: 'layout',
		loader: AuthLoader,
		children: [
			{
				path: 'welcome',
				element: lazyLoad(lazy(() => import('@/views/Welcome'))),
			},
			{
				path: 'dashboard',
				element: lazyLoad(lazy(() => import('@/views/DashBoard'))),
			},
			{
				path: 'user',
				element: lazyLoad(lazy(() => import('@/views/System/User'))),
			},
			{
				path: 'dept',
				element: lazyLoad(lazy(() => import('@/views/System/Dept'))),
			},
			{
				path: 'menu',
				element: lazyLoad(lazy(() => import('@/views/System/Menu'))),
			},
			{
				path: 'role',
				element: lazyLoad(lazy(() => import('@/views/System/Role'))),
			},
			{
				path: 'orderList',
				element: lazyLoad(lazy(() => import('@/views/Order/OrderList'))),
			},
			{
				path: 'cluster',
				element: lazyLoad(lazy(() => import('@/views/Order/Cluster'))),
			},
			{
				path: 'driver',
				element: lazyLoad(lazy(() => import('@/views/Order/DriverList'))),
			},
		],
	},
	{
		path: '*',
		element: <Navigate to='/404' />,
	},
	{
		path: '/404',
		element: <Error404 />,
	},
	{
		path: '/403',
		element: <Error403 />,
	},
]

export default createBrowserRouter(routers)
