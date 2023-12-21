import { ConfigProvider, App as AntdApp, theme } from 'antd'
import { RouterProvider } from 'react-router-dom'
import './App.less'
import router from './router/index'
import AntdGlobal from './utils/AntdGlobal'
import './styles/theme.less'
import { useStore } from '@/store'

function App() {
	const isDark = useStore(state => state.isDark)
	const path = location.href
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#ed6c00',
				},
				algorithm: isDark && path !== '/login' ? [theme.darkAlgorithm] : [],
			}}>
			<AntdApp>
				<AntdGlobal />
				<RouterProvider router={router} />
			</AntdApp>
		</ConfigProvider>
	)
}

export default App
