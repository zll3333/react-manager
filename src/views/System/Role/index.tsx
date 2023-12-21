import { formatDate } from '@/utils'
import { Button, Form, Input, message, Modal, Space, Table } from 'antd'
import { useEffect, useRef } from 'react'
import CreateRole from './createRole'
import { IAction } from '@/types/modal'
import { Role } from '@/types/api'
import { useStore } from '@/store'
import { useForm } from 'antd/es/form/Form'
import api from '@/api'
import Permission from './setPermission'

export default function RoleFC() {
	const roleItem = useStore(state => state.roleResult)

	const updateRoleItem = useStore(state => state.updateRoleItem)
	const columns = [
		{
			title: '角色名称',
			key: 'roleName',
			dataIndex: 'roleName',
		},
		{
			title: '备注',
			key: 'remark',
			dataIndex: 'remark',
		},
		{
			title: '更新时间',
			key: 'updateTime',
			dataIndex: 'updateTime',
			render(updateTime: string) {
				return formatDate(updateTime)
			},
		},
		{
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime',
			render(createTime: string) {
				return formatDate(createTime)
			},
		},
		{
			title: '操作',
			key: 'action',
			render(record: Role.RoleItem) {
				return (
					<Space>
						<Button type='text' onClick={() => handleEidt(record)}>
							编辑
						</Button>
						<Button type='text' onClick={() => handlePerission(record)}>
							设置权限
						</Button>
						<Button type='text' onClick={() => handleDelete(record._id)}>
							删除
						</Button>
					</Space>
				)
			},
		},
	]
	const [form] = useForm()
	const roleRef = useRef<{
		open: (type: IAction, data?: Role.EditParams) => void
	}>()
	const permissionRef = useRef<{
		open: (type: IAction, data?: Role.RoleItem) => void
	}>()

	const handleSearch = () => {
		const data = form.getFieldsValue()
		updateRoleItem({ ...data, pageNum: 1 })
	}
	const handleReset = () => {
		form.resetFields()
	}
	const handleCreate = () => {
		roleRef.current?.open('create')
	}
	const handleEidt = (params: Role.EditParams) => {
		roleRef.current?.open('edit', params)
	}
	const handlePerission = (params: Role.RoleItem) => {
		permissionRef.current?.open('edit', params)
	}
	const handleDelete = async (params: string) => {
		Modal.confirm({
			title: '删除角色',
			content: '确定删除该角色吗？',
			okText: '确定',
			cancelText: '取消',
			async onOk() {
				await api.deleteRoleItem(params)
				updateRoleItem()
				message.success('删除成功')
			},
		})
	}

	useEffect(() => {
		updateRoleItem()
	}, [])
	return (
		<div className='role'>
			<Form layout='inline' className='search-item' form={form}>
				<Form.Item label='角色名称' name='roleName'>
					<Input placeholder='请输入角色名称'></Input>
				</Form.Item>
				<Form.Item>
					<Space>
						<Button type='primary' onClick={handleSearch}>
							搜索
						</Button>
						<Button onClick={handleReset}>重置</Button>
					</Space>
				</Form.Item>
			</Form>
			<div className='base-table'>
				<div className='header-wrapper'>
					<div className='title'>角色列表</div>
					<Button onClick={handleCreate} type='primary'>
						新增
					</Button>
				</div>
				<Table
					columns={columns}
					rowKey='_id'
					dataSource={roleItem.list}
					pagination={{
						total: roleItem.page.total,
						pageSizeOptions: [10, 20, 50],
						pageSize: roleItem.page.pageSize,
						current: roleItem.page.pageNum,
						showTotal: total => `共有${total}条`,
						onChange: (pageNum, pageSize) => {
							updateRoleItem({ pageNum, pageSize })
						},
					}}></Table>
			</div>
			<CreateRole mRef={roleRef} update={() => updateRoleItem({ pageNum: 1 })} />
			<Permission mRef={permissionRef} update={() => updateRoleItem({ pageNum: 1 })} />
		</div>
	)
}
