import api from '@/api'
import { Menu, Role } from '@/types/api'
import { IAction, IModelProp } from '@/types/modal'
import { Form, message, Modal, Tree } from 'antd'
import { useState, useImperativeHandle, useEffect } from 'react'

export default function Permission(props: IModelProp<Role.RoleItem>) {
	const [visiable, setVisiable] = useState(false)
	const [checkedKeys, setCheckedKeys] = useState<string[]>([])
	const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
	const [menuItem, setMenuItem] = useState<Menu.MenuItem[]>([])
	const [permission, setPermission] = useState<Role.Permission>()
	const handleSubmit = async () => {
		if (permission) {
			await api.updatePermisson(permission)
			message.success('权限设置成功！')

			handleCancel()
			props.update()
		}
	}
	const handleCancel = () => {
		setVisiable(false)
		setPermission(undefined)
	}
	const onCheck = (checkedKeysValue: any, item: any) => {
		setCheckedKeys(checkedKeysValue)
		const checkedKeys: string[] = []
		const paranetKeys: string[] = []

		item.checkedNodes.map((item: Menu.MenuItem) => {
			if (item.menuType === 2) {
				checkedKeys.push(item._id)
			} else {
				paranetKeys.push(item._id)
			}
		})

		setPermission({
			_id: roleInfo?._id || '',
			permissionList: {
				checkedKeys,
				halfCheckedKeys: paranetKeys.concat(item.halfCheckedKeys),
			},
		})
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
	const getMenuItem = async () => {
		const data = await api.getMenuItem()
		setMenuItem(data)
	}
	useEffect(() => {
		getMenuItem()
	}, [])
	const open = (type: IAction, data?: Role.RoleItem) => {
		setVisiable(true)
		setRoleInfo(data)
		setCheckedKeys(data?.permissionList.checkedKeys || [])
	}
	return (
		<Modal
			open={visiable}
			title='权限设置'
			okText='确定'
			cancelText='取消'
			onOk={handleSubmit}
			onCancel={handleCancel}>
			<Form labelCol={{ span: 4 }} labelAlign='right'>
				<Form.Item name='_id' hidden></Form.Item>
				<Form.Item label='角色名称' name='roleName'>
					{roleInfo?.roleName}
				</Form.Item>
				<Form.Item label='权限列表'>
					<Tree
						checkable
						onCheck={onCheck}
						defaultExpandAll
						checkedKeys={checkedKeys}
						fieldNames={{ title: 'menuName', key: '_id', children: 'children' }}
						treeData={menuItem}
					/>
				</Form.Item>
			</Form>
		</Modal>
	)
}
