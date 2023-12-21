import { Button, Form, Input, Select, Space, Table, Pagination, Modal, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { PageParams, User } from '@/types/api'
import { useEffect, useState, useRef, SetStateAction } from 'react'
import api from '@/api'
import { formatDate, formatState } from '@/utils'
import { useForm } from 'antd/es/form/Form'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'

const { Option } = Select

export default function UserFC() {
	const [form] = useForm()
	const [data, setData] = useState<User.UserItem[]>([])
	const [selectUsers, setSelectUser] = useState<React.Key[]>([])
	const [total, setTotal] = useState(0)
	const [pagination, setPagination] = useState({
		currnet: 1,
		pageSize: 10,
	})

	const userRef = useRef<{
		open: (type: IAction, data?: User.UserItem) => void
	}>()
	const getUserList = async (params: PageParams) => {
		const values = form.getFieldsValue()
		const data = await api.getUserList({
			...values,
			pageNum: params.pageNum,
			pageSize: params.pageSize || pagination.pageSize,
		})

		setData(data.list)
		setTotal(data.page.total)
		setPagination({ pageSize: data.page.pageSize, currnet: data.page.pageNum })
	}
	//重置搜索
	const handleReset = () => {
		form.resetFields()
	}

	//搜索
	const handleSearch = () => {
		getUserList({
			pageNum: 1,
		})
	}
	//新增用户
	const handleCreate = () => {
		userRef.current?.open('create')
	}
	//编辑用户
	const handleEdit = (recode: User.UserItem) => {
		userRef.current?.open('edit', recode)
	}
	//删除用户
	const handleDel = async (userId: number) => {
		Modal.confirm({
			title: '删除用户',
			content: <span>确认删除吗？</span>,
			okText: '确定',
			cancelText: '取消',
			onOk: () => {
				handleUserDelSubmit([userId])
			},
		})
	}
	//批量删除用户
	const handlePatchDel = () => {
		if (selectUsers.length === 0) {
			message.error('请先选择要删除的用户')
			return
		}
		Modal.confirm({
			title: '删除用户',
			content: <span>确认删除用户吗？</span>,
			onOk() {
				handleUserDelSubmit(selectUsers as number[])
			},
		})
	}

	//公共删除用户接口
	const handleUserDelSubmit = async (ids: number[]) => {
		try {
			const data = await api.deleteUser({ userIds: ids })
			getUserList({
				pageNum: 1,
			})
			message.success('删除成功!')
		} catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		getUserList({ pageNum: pagination.currnet, pageSize: pagination.pageSize })
	}, [pagination.currnet, pagination.pageSize])

	const columns: ColumnsType<User.UserItem> = [
		{
			title: '用户ID',
			dataIndex: 'userId',
			key: 'userId',
		},
		{
			title: '用户名',
			dataIndex: 'userName',
			key: 'userName',
		},
		{
			title: '用户邮箱',
			dataIndex: 'userEmail',
			key: 'userEmail',
		},
		{
			title: '用户角色',
			dataIndex: 'role',
			key: 'role',
			render(role: number) {
				return {
					0: '超级管理员',
					1: '管理员',
					2: '体验管理员',
					3: '普通用户',
				}[role]
			},
		},
		{
			title: '用户状态',
			dataIndex: 'state',
			key: 'state',
			render(state: number) {
				return formatState(state)
			},
		},
		{
			title: '注册时间',
			dataIndex: 'createTime',
			key: 'createTime',
			render(createTime: string) {
				return formatDate(createTime)
			},
		},
		{
			title: '最后登录时间',
			dataIndex: 'lastLoginTime',
			key: 'lastLoginTime',
			render(lastLoginTime: string) {
				return formatDate(lastLoginTime)
			},
		},
		{
			title: '操作',
			dataIndex: 'action',
			render(val, record) {
				return (
					<Space>
						<Button type='text' onClick={() => handleEdit(record)}>
							编辑
						</Button>
						<Button type='text' onClick={() => handleDel(record.userId)}>
							删除
						</Button>
					</Space>
				)
			},
		},
	]

	return (
		<div className='userList'>
			<Form className='search-item' layout='inline' initialValues={{ state: 0 }} form={form}>
				<Form.Item label='用户ID' name='userId'>
					<Input placeholder='请输入用户ID' />
				</Form.Item>
				<Form.Item label='用户名称' name='userName'>
					<Input placeholder='请输入用户名称' />
				</Form.Item>
				<Form.Item label='状态' name='state'>
					<Select style={{ width: 120 }}>
						<Option value={0}>所有</Option>
						<Option value={1}>在职</Option>
						<Option value={2}>离职</Option>
						<Option value={3}>试用期</Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type='primary' style={{ marginRight: 10 }} onClick={handleSearch}>
						搜索
					</Button>
					<Button onClick={handleReset}>重置</Button>
				</Form.Item>
			</Form>

			<div className='base-table'>
				<div className='header-wrapper'>
					<div className='title'>用户列表</div>
					<div className='action'>
						<Button type='primary' style={{ marginRight: 10 }} onClick={handleCreate}>
							新增
						</Button>
						<Button onClick={handlePatchDel}>批量删除</Button>
					</div>
				</div>
				<Table
					rowKey='userId'
					columns={columns}
					dataSource={data}
					bordered
					rowSelection={{
						type: 'checkbox',
						// onSelect: (record, selected) => console.log(record, selected),
						onChange: selectedRowKeys => setSelectUser(selectedRowKeys),
					}}
					pagination={false}
				/>
				<div className='pagination'>
					<Pagination
						defaultCurrent={6}
						total={total}
						showTotal={total => `共有 ${total} 条`}
						current={pagination.currnet}
						pageSize={pagination.pageSize}
						onChange={(page, pageSize) => setPagination({ currnet: page, pageSize })}
					/>
				</div>
			</div>
			<CreateUser mRef={userRef} update={() => getUserList({ pageNum: 1 })} />
		</div>
	)
}
