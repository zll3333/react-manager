import { Form, Input, Space, Button, Table, message, Modal } from 'antd'
import api from '@/api'
import { useEffect, useState, useRef } from 'react'
import { Dept } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import CreateDept from './CreateDept'
import { IAction, IModelProp } from '@/types/modal'
import { ColumnType } from 'antd/es/table'
import { formatDate } from '@/utils'

export default function DeptFC() {
	const [form] = useForm()
	const columns = [
		{
			title: '部门名称',
			key: 'deptName',
			dataIndex: 'deptName',
		},
		{
			title: '负责人',
			key: 'userName',
			dataIndex: 'userName',
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

			render(record: Dept.DeptItem) {
				return (
					<Space>
						<Button type='text' onClick={() => handleSubCreate(record._id)}>
							新增
						</Button>
						<Button type='text' onClick={() => handleEdit(record)}>
							编辑
						</Button>
						<Button type='text' onClick={() => handleDel(record._id)}>
							删除
						</Button>
					</Space>
				)
			},
		},
	]
	const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])

	const handleSearch = () => {
		const params = form.getFieldsValue()
		console.log(params)

		getDeptList(params)
	}
	const deptRef = useRef<{
		open: (type: IAction, data?: Dept.editParams | { parentId: string }) => void
	}>()
	const handleReset = () => {
		form.resetFields()
	}

	const handleCreate = () => {
		deptRef.current?.open('create')
	}
	const handleSubCreate = (id: string) => {
		deptRef.current?.open('create', { parentId: id })
	}

	const handleEdit = (params: Dept.DeptItem) => {
		deptRef.current?.open('edit', params)
	}
	const handleDel = (id: string) => {
		Modal.confirm({
			title: '删除部门',
			content: '确定删除吗？',
			okText: '确定',
			cancelText: '取消',
			onOk() {
				api.deleteDeptList(id)
				message.success('删除成功')
				getDeptList()
			},
		})
	}

	//获取部门列表
	const getDeptList = async (params?: Dept.Params) => {
		const data = await api.getDeptList(params)
		setDeptList(data)
	}

	useEffect(() => {
		getDeptList()
	}, [])
	return (
		<div className='deptList'>
			<Form layout='inline' className='search-item' form={form}>
				<Form.Item label='部门名称' name='deptName'>
					<Input placeholder='请输入部门名称'></Input>
				</Form.Item>
				<Space>
					<Button type='primary' onClick={handleSearch}>
						搜索
					</Button>
					<Button onClick={handleReset}>重置</Button>
				</Space>
			</Form>
			<div className='base-table'>
				<div className='header-wrapper'>
					<div className='title'>部门列表</div>
					<div className='action'>
						<Space>
							<Button type='primary' onClick={handleCreate}>
								新增
							</Button>
						</Space>
					</div>
				</div>
				<Table columns={columns} dataSource={deptList} rowKey='_id'></Table>
			</div>
			<CreateDept mRef={deptRef} update={getDeptList} />
		</div>
	)
}
