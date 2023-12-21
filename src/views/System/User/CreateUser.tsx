import { Modal, Form, Input, Select, Upload, TreeSelect } from 'antd'
import { useState, useImperativeHandle, useEffect } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import { message } from '@/utils/AntdGlobal'
import storage from '@/utils/storage'
import { IAction, IModelProp } from '@/types/modal'
import { Dept, User, Role } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import api from '@/api'

export default function CreateUser(props: IModelProp) {
	const [visiale, setVisiable] = useState(false)
	const [form] = useForm()
	const [action, setAction] = useState<IAction>('create')
	const [roles, setRoles] = useState<Role.RoleItem[]>([])
	const [deptItem, setDeptItem] = useState<Dept.DeptItem[]>([])
	//获取部门
	const getDeptItem = async () => {
		const data = await api.getDeptList()
		setDeptItem(data)
	}

	//获取所有角色
	const getAllRoles = async () => {
		const data = await api.getAllRoleList()
		// console.log(data)
		setRoles(data)
	}
	useEffect(() => {
		getDeptItem()
		getAllRoles()
	}, [])
	const handleSubmit = async () => {
		const valid = await form.validateFields()
		if (valid) {
			const parmas = {
				...form.getFieldsValue(),
				userImg: img,
			}
			if (action === 'create') {
				await api.createUser(parmas)
				message.success('创建成功!')
			} else if (action === 'edit') {
				await api.editUser(parmas)
				message.success('编辑成功!')
			}
			handleCancel()
			props.update()
		}
	}
	const handleCancel = () => {
		setVisiable(false)
		form.resetFields()
		setImg('')
	}

	const [img, setImg] = useState('')
	const [loading, setLoading] = useState(false)

	useImperativeHandle(
		props.mRef,
		() => {
			return {
				open,
			}
		},
		[]
	)
	//调用弹窗显示方法
	const open = (type: IAction, data?: User.UserItem) => {
		setAction(type)
		setVisiable(true)

		//编辑弹框 填充已有信息
		if (type === 'edit' && data) {
			form.setFieldsValue(data)
			setImg(img)
		}
	}

	//图片上传之前 要求图片必须是png或jpg，且小于500K
	const beforeUpload = (file: RcFile) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
		if (!isJpgOrPng) {
			message.error('只能上传png或jpeg格式的图片!')
			return false
		}
		const isLt500k = file.size / 1024 / 1024 < 0.5
		if (!isLt500k) {
			message.error('图片必须小于500k')
		}
		return isJpgOrPng && isLt500k
	}
	//上传后，图片处理
	const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === 'uploading') {
			setLoading(true)
			return
		}
		if (info.file.status === 'done') {
			setLoading(false)
			const { code, data, msg } = info.file.response
			if (code === 0) {
				setImg(data.file)
			} else {
				message.error(msg)
			}
		} else if ((info.file.status = 'error')) {
			setLoading(false)
			message.error('服务器异常，请稍后再试！')
		}
	}

	return (
		<Modal
			title={action === 'create' ? '新增用户' : '编辑用户'}
			width={600}
			open={visiale}
			okText='确定'
			cancelText='取消'
			centered
			onOk={handleSubmit}
			onCancel={handleCancel}>
			<Form labelAlign='right' labelCol={{ span: '4' }} form={form}>
				<Form.Item name='userId' hidden></Form.Item>
				<Form.Item
					name='userName'
					label='用户名称'
					rules={[
						{ required: true, message: '请输入用户名称' },
						{ min: 5, max: 12, message: '长度必须为5~12个字符' },
					]}>
					<Input placeholder='请输入用户名称'></Input>
				</Form.Item>
				<Form.Item
					name='userEmail'
					label='邮箱'
					rules={[
						{ required: true, message: '请输入邮箱' },
						{ pattern: /\w+@mars.com$/, message: '邮箱必须以@mars.com结尾' },
					]}>
					<Input placeholder='请输入邮箱: xxx@mars.com'></Input>
				</Form.Item>
				<Form.Item
					label='手机号'
					name='mobile'
					rules={[{ pattern: /^1[3-9][0-9]{9}$/, message: '请输入正确的手机号' }]}>
					<Input type='number' placeholder='请输入手机号'></Input>
				</Form.Item>
				<Form.Item name='deptId' label='部门' rules={[{ required: true, message: '请选择部门' }]}>
					<TreeSelect
						treeDefaultExpandAll
						placeholder='请选择部门'
						allowClear
						fieldNames={{ label: 'deptName', value: '_id' }}
						treeData={deptItem}
					/>
				</Form.Item>
				<Form.Item name='job' label='岗位'>
					<Input placeholder='请输入岗位'></Input>
				</Form.Item>
				<Form.Item name='state' label='状态'>
					<Select placeholder='请选择状态'>
						<Select.Option value={1}>在职</Select.Option>
						<Select.Option value={2}>离职</Select.Option>
						<Select.Option value={3}>试用期</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item name='roleList' label='系统角色'>
					<Select placeholder='请选择系统角色'>
						{roles?.map(item => {
							return (
								<Select.Option key={item._id} value={item._id}>
									{item.roleName}
								</Select.Option>
							)
						})}
						{/* <Select.Option value={0}>超级管理员</Select.Option>
						<Select.Option value={1}>管理员</Select.Option>
						<Select.Option value={2}>体验管理员</Select.Option>
						<Select.Option value={3}>测试</Select.Option> */}
					</Select>
				</Form.Item>
				<Form.Item
					name='useImg'
					label='用户头像'
					// rules={[{ required: true, message: '请上传头像' }]}
				>
					<Upload
						listType='picture-card'
						beforeUpload={beforeUpload}
						onChange={handleChange}
						showUploadList={false}
						action='/api/users/upload'
						headers={{
							Authorization: 'Bearer ' + storage.get('token'),
							icode: 'D7DCDED83B772E89',
						}}>
						{img ? (
							<img src={img} style={{ width: '100%', height: '100%' }} />
						) : (
							<div>
								{loading ? (
									<LoadingOutlined />
								) : (
									<div style={{ color: '#aaa' }}>
										<PlusOutlined style={{ fontSize: 20 }} />
										<div style={{ marginTop: 5 }}>上传头像</div>
									</div>
								)}
							</div>
						)}
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	)
}
