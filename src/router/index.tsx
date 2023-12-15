import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/views/Login'
import Layout from '@/layout'
import Welcome from '@/views/Welcome'
import Error404 from '@/views/Error/404'
import Error403 from '@/views/Error/403'
import Dashboard from '@/views/DashBoard'

const routers = createBrowserRouter([
	{
		path: '/',
		// element:</>
		element: <Navigate to='/welcome' />,
	},
	{
		path: '/login',
		element: <Login />,
	},

	{
		element: <Layout />,
		children: [
			{
				path: 'welcome',
				element: <Welcome />,
			},
			{
				path: 'dashboard',
				element: <Dashboard />,
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
])

export default routers
