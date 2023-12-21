//路由懒加载组件封装

import { Spin } from 'antd'
import { ReactNode, Suspense } from 'react'

export default function lazyLoad(
	Component: React.LazyExoticComponent<() => JSX.Element>
): ReactNode {
	return (
		<Suspense
			fallback={
				<Spin
					size='large'
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
					}}
				/>
			}>
			<Component />
		</Suspense>
	)
}
