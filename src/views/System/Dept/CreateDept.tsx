import { Dept, User } from '@/types/api'
import { IAction, IModelProp } from '@/types/modal'
import { Modal, Form, Input, Select, TreeSelect, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useImperativeHandle, useState } from 'react'
import api from '@/api'

export default function CreateDept(props: IModelProp<Dept.DeptItem>) {
	const [action, setAction] = useState<IAction>('create')
	const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
	const [allUsers, setallUsers] = useState<User.UserItem[]>([])
	const [visiable, setVisiable] = useState(false)
	const [form] = useForm()
	//提交表单
	const handelSubmit = async () => {
		const valid = await form.validateFields()
		if (valid) {
			const data = form.getFieldsValue()
			if (action === 'create') {
				await api.createDeptList(data)
			} else if (action === 'edit') {
				api.editDeptList(data)
			}
			message.success('创建成功')
			handelCancel()
			props.update()
		}
	}
	//关闭和重置弹框表单
	const handelCancel = () => {
		setVisiable(false)
		form.resetFields()
	}
	useImperativeHandle(props.mRef, () => ({
		open,
	}))
	//打开弹窗函数
	const open = (type: IAction, data?: Dept.editParams | { parentId: string | undefined }) => {
		setAction(type)
		setVisiable(true)
		if (data) {
			form.setFieldsValue(data)
		}
	}
	const getDeptList = async () => {
		const data = await api.getDeptList()
		setDeptList(data)
	}
	const getUserList = async () => {
		const data = await api.getAllUserList()
		setallUsers(data)
	}
	useEffect(() => {
		getDeptList()
		getUserList()
	}, [])
	return (
		<Modal
			title={action === 'create' ? '新增部门' : '编辑部门'}
			okText='确定'
			cancelText='取消'
			onOk={handelSubmit}
			onCancel={handelCancel}
			centered
			open={visiable}
			width={600}>
			<Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
				<Form.Item name='_id' hidden></Form.Item>
				<Form.Item label='上级部门' name='parentId'>
					<TreeSelect
						placeholder='请选择上级部门'
						treeDefaultExpandAll
						allowClear
						fieldNames={{ label: 'deptName', value: '_id' }}
						treeData={deptList}
					/>
				</Form.Item>
				<Form.Item
					label='部门名称'
					rules={[{ required: true, message: '请输入部门名称' }]}
					name='deptName'>
					<Input placeholder='请输入部门名称'></Input>
				</Form.Item>
				<Form.Item
					label='负责人'
					rules={[{ required: true, message: '请选择负责人' }]}
					name='userName'>
					<Select placeholder='请选择负责人'>
						{allUsers.map(item => (
							<Select.Option value={item.userName} key={item._id}>
								{item.userName}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	)
}
