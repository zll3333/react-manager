import api from '@/api'
import { Menu } from '@/types/api'
import { IAction, IModelProp } from '@/types/modal'
import { Modal, TreeSelect, Form, Input, Radio, RadioChangeEvent, InputNumber } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useState, useImperativeHandle, useEffect } from 'react'
import { BaseOptionType, DefaultOptionType } from 'antd/es/select'
import { useStore } from '@/store'

export default function CreateMenu(props: IModelProp<Menu.EditMenu>) {
	const [action, setAction] = useState<IAction>('create')
	const [visiable, setVisiable] = useState(false)
	const [value, setValue] = useState(1)
	const [form] = useForm()
	const menuList = useStore(state => state.menuItem)
	const onChange = (e: RadioChangeEvent) => {
		setValue(e.target.value)
	}
	const handleSubmit = async () => {
		const valid = await form.validateFields()
		const data = form.getFieldsValue()
		if (valid) {
			if (action === 'create') {
				await api.createMenuItem(data)
			} else {
				await api.editMenuItem(data)
			}
			props.update()
			handleCancel()
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
	const open = (type: IAction, data?: Menu.EditMenu | { parentId: string }) => {
		setAction(type)
		setVisiable(true)
		if (data) {
			form.setFieldsValue(data)
		}
	}
	return (
		<Modal
			title={action === 'create' ? '新建菜单' : '编辑菜单'}
			open={visiable}
			width={600}
			okText='确定'
			cancelText='取消'
			onOk={handleSubmit}
			onCancel={handleCancel}>
			<Form
				labelAlign='right'
				labelCol={{ span: 3 }}
				form={form}
				initialValues={{ menuType: 1, menuState: 1 }}>
				<Form.Item name='_id' hidden></Form.Item>
				<Form.Item label='父级菜单' name='parentId'>
					<TreeSelect
						placeholder='请选择父级菜单'
						treeDefaultExpandAll
						fieldNames={{ label: 'menuName', value: '_id' }}
						treeData={menuList as (BaseOptionType | DefaultOptionType)[]}
						allowClear
					/>
				</Form.Item>
				<Form.Item label='菜单类型' name='menuType'>
					<Radio.Group onChange={onChange} value={value} defaultValue={1}>
						<Radio value={1}>菜单</Radio>
						<Radio value={2}>按钮</Radio>
						<Radio value={3}>页面</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='菜单名称' name='menuName'>
					<Input placeholder='请输入菜单名称'></Input>
				</Form.Item>
				<Form.Item noStyle shouldUpdate>
					{() => {
						return form.getFieldValue('menuType') === 2 ? (
							<Form.Item label='权限标识' name='menuCode'>
								<Input placeholder='请输入权限标识'></Input>
							</Form.Item>
						) : (
							<>
								<Form.Item label='菜单图标' name='icon'>
									<Input placeholder='请输入菜单图标'></Input>
								</Form.Item>
								<Form.Item label='路由地址' name='path'>
									<Input placeholder='请输入路由地址'></Input>
								</Form.Item>
								<Form.Item label='组件地址' name='component'>
									<Input placeholder='请输入组件地址'></Input>
								</Form.Item>
							</>
						)
					}}
				</Form.Item>

				<Form.Item
					label='排序'
					name='orderBy'
					tooltip={{ title: '值越大，越靠后', icon: <InfoCircleOutlined /> }}>
					<InputNumber></InputNumber>
				</Form.Item>
				<Form.Item label='菜单状态' name='menuState'>
					<Radio.Group onChange={onChange}>
						<Radio value={1}>启用</Radio>
						<Radio value={2}>停用</Radio>
					</Radio.Group>
				</Form.Item>
			</Form>
		</Modal>
	)
}
