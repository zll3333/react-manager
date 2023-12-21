import api from '@/api'
import { useStore } from '@/store'
import { Menu } from '@/types/api'
import { IAction } from '@/types/modal'
import { formatDate } from '@/utils'
import { Form, Input, Select, Space, Button, Table, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import CreateMenu from './createMenu'

export default function MenuFC() {
	const menuRef = useRef<{
		open: (type: IAction, data?: Menu.EditMenu | { parentId?: string; orderBy: number }) => void
	}>()
	const columns = [
		{
			title: '菜单名称',
			key: 'menuName',
			dataIndex: 'menuName',
		},
		{
			title: '图标',
			key: 'icon',
			dataIndex: 'icon',
		},
		{
			title: '菜单类型',
			key: 'menuType',
			dataIndex: 'menuType',
			render(menuType: number) {
				return {
					1: '菜单',
					2: '按钮',
					3: '页面',
				}[menuType]
			},
		},
		{
			title: '权限标识',
			key: 'menuCode',
			dataIndex: 'menuCode',
		},
		{
			title: '路由地址',
			key: 'path',
			dataIndex: 'path',
		},
		{
			title: '菜单状态',
			key: 'menuState',
			dataIndex: 'menuState',
			render(menuState: number) {
				return {
					1: '正常',
					2: '停用',
				}[menuState]
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
			// key:'action'
			render(record: Menu.MenuItem) {
				return (
					<Space>
						<Button type='text' onClick={() => handleSubCreate(record)}>
							新增
						</Button>
						<Button type='text' onClick={() => handleEdit(record)}>
							编辑
						</Button>
						<Button type='text' onClick={() => handleDel(record)}>
							删除
						</Button>
					</Space>
				)
			},
		},
	]
	const [form] = useForm()
	// const [menuItem, setMenuItem] = useState<Menu.MenuItem[]>([])

	const menuItem = useStore(state => state.menuItem)
	const updateMenuItem = useStore(state => state.updateMenuItem)

	//处理搜索
	const handleSearch = () => {
		const data = form.getFieldsValue()
		updateMenuItem(data)
	}
	//重置表单
	const handleReset = () => {
		form.resetFields()
	}
	//新建菜单
	const handleCreate = () => {
		menuRef.current?.open('create', {
			orderBy: menuItem.length,
		})
	}
	//新建子菜单
	const handleSubCreate = (record: Menu.MenuItem) => {
		menuRef.current?.open('create', { parentId: record._id, orderBy: record.children?.length })
	}
	//编辑菜单
	const handleEdit = (params: Menu.EditMenu) => {
		menuRef.current?.open('edit', params)
	}
	//删除菜单
	const handleDel = async (params: Menu.MenuItem) => {
		let text = ''
		switch (params.menuType) {
			case 1:
				text = '菜单'
				break
			case 2:
				text = '按钮'
				break
			case 3:
				text = '页面'
				break
			default:
				break
		}
		Modal.confirm({
			title: `删除${text}`,
			content: `确定要删除该${text}吗？`,
			okText: '确定',
			cancelText: '取消',
			async onOk() {
				await api.deleteMenuItem(params._id)
				updateMenuItem()
			},
		})
	}
	useEffect(() => {
		updateMenuItem()
	}, [])
	return (
		<div className='menu'>
			<Form
				layout='inline'
				className='search-item'
				initialValues={{
					menuState: 1,
				}}
				form={form}>
				<Form.Item label='菜单名称' name='menuName'>
					<Input placeholder='请输入菜单名称'></Input>
				</Form.Item>
				<Form.Item label='菜单状态' name='menuState'>
					<Select style={{ width: 120 }}>
						<Select.Option value={1}>正常</Select.Option>
						<Select.Option value={2}>停用</Select.Option>
					</Select>
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
					<div className='title'>菜单列表</div>
					<Button type='primary' onClick={handleCreate}>
						新增
					</Button>
				</div>
				<Table columns={columns} dataSource={menuItem} rowKey='_id'></Table>
			</div>
			<CreateMenu mRef={menuRef} update={() => updateMenuItem()} />
		</div>
	)
}
