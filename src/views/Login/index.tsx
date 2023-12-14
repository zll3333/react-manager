import styles from './index.module.less'
import { Form, Button, Input, message } from 'antd'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'
// import { message } from '@/utils/AntdGlobal'
import { useState } from 'react'
import { useStore } from '@/store'

type FieldType = {
	userName?: string
	userPwd?: string
	// remember?: string;
}

export default function LoginFC() {
	const [loading, setLoading] = useState(false)
	const updateToken = useStore(state => state.updateToken)

	const onFinish = async (value: Login.params) => {
		try {
			setLoading(true)
			const data = await api.login(value)
			setLoading(false)
			storage.set('token', data)
			//保存token
			// store.token = data
			updateToken(data)
			message.success('登录成功 ')
			const urlParams = new URLSearchParams(location.search)
			setTimeout(() => {
				location.href = urlParams.get('callback') || '/welcome'
			})
		} catch (error) {
			setLoading(false)
		}
	}

	return (
		<div className={styles.login}>
			<div className={styles.loginWrapper}>
				<div className={styles.title}>系统登陆</div>
				<Form
					name='basic'
					onFinish={onFinish}
					autoComplete='off'
					initialValues={{ userName: '1364144616', userPwd: '204562' }}>
					<Form.Item<FieldType>
						name='userName'
						rules={[{ required: true, message: '请输入你的账号!' }]}>
						<Input placeholder='请输入你的账号' />
					</Form.Item>

					<Form.Item<FieldType>
						name='userPwd'
						rules={[{ required: true, message: '请输入你的密码!' }]}>
						<Input.Password placeholder='请输入你的密码' />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' block loading={loading}>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
