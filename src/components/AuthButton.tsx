import { IAuthLoader } from '@/router/AuthLoader'
import { useStore } from '@/store'
import { Button } from 'antd'
import { useRouteLoaderData } from 'react-router-dom'

//按钮权限实现

export default function AuthButton(props: any) {
	const data = useRouteLoaderData('layout') as IAuthLoader
	const role = useStore(state => state.userInfo)
	if (!props.auth) return <Button {...props}>{props.children}</Button>
	if (data.buttonList.includes(props.auth) || role.state === 1) {
		return <Button {...props}>{props.children}</Button>
	}
	return <></>
}
