import api from '@/api'
import { Role } from '@/types/api'
import { IAction, IModelProp } from '@/types/modal'
import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState, useImperativeHandle } from 'react'
import { message } from '@/utils/AntdGlobal'

export default function CreateRole(props: IModelProp<Role.EditParams>) {
	const [action, setAction] = useState('create')
	const [visiable, setVisiable] = useState(false)
	const [form] = useForm()
	const handleSubmit = async () => {
		const valid = await form.validateFields()
		const data = form.getFieldsValue()
		if (valid) {
			if (action === 'create') {
				await api.createRoleItem(data)
				message.success('创建成功！')
			} else {
				await api.editRoleItem(data)
				message.success('编辑成功！')
			}
			handleCancel()
			props.update()
		}
	}
	const handleCancel = () => {
		setVisiable(false)
		form.resetFields()
	}
	useImperativeHandle(
		props.mRef,
		() => {
			return {
				open,
			}
		},
		[]
	)
	const open = (type: IAction, data?: Role.EditParams) => {
		setAction(type)
		setVisiable(true)
		if (data) {
			form.setFieldsValue(data)
		}
	}
	return (
		<Modal
			open={visiable}
			title={action === 'create' ? '创建角色' : '编辑角色'}
			okText='确定'
			cancelText='取消'
			onOk={handleSubmit}
			onCancel={handleCancel}>
			<Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
				<Form.Item name='_id' hidden></Form.Item>
				<Form.Item
					label='角色名称'
					name='roleName'
					rules={[{ required: true, message: '请输入角色名称' }]}>
					<Input placeholder='请输入角色名称'></Input>
				</Form.Item>
				<Form.Item label='备注' name='remark'>
					<Input.TextArea placeholder='请输入备注'></Input.TextArea>
				</Form.Item>
			</Form>
		</Modal>
	)
}
