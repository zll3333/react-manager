import api from '@/api'
import { Order } from '@/types/api'
import { IModelProp } from '@/types/modal'
import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState, useImperativeHandle, useEffect } from 'react'

export default function CreateOrder(props: IModelProp<Order.OrderItem>) {
	const [visiable, setVisiable] = useState(false)
	const [cityItem, setCityItem] = useState<Order.DictItem[]>([])
	const [vehicleItem, setVehicleItem] = useState<Order.DictItem[]>([])
	const [form] = useForm()
	useImperativeHandle(
		props.mRef,
		() => {
			return {
				open,
			}
		},
		[]
	)
	const handleSubmit = async () => {
		const valid = await form.validateFields()
		const data = form.getFieldsValue()
		if (valid) {
			api.createOrder(data)
			handleCancel()
			props.update()
		}
	}
	const handleCancel = () => {
		setVisiable(false)
		form.resetFields()
	}
	const open = () => {
		setVisiable(true)
	}

	//获取城市列表
	const getCityList = async () => {
		const data = await api.getCityList()
		setCityItem(data)
	}

	//获取车型
	const getVehicleList = async () => {
		const data = await api.getVehicleList()
		setVehicleItem(data)
	}

	useEffect(() => {
		getCityList()
		getVehicleList()
	}, [])

	return (
		<Modal
			open={visiable}
			title='创建订单'
			okText='确定'
			cancelText='取消'
			onOk={handleSubmit}
			onCancel={handleCancel}
			width={700}>
			<Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign='right'>
				<Row>
					<Col span={12}>
						<Form.Item
							label='城市名称'
							name='cityName'
							rules={[{ required: true, message: '请选择城市' }]}>
							<Select placeholder='请选择城市名称'>
								{cityItem.map(item => {
									return (
										<Select.Option value={item.name} key={item.id}>
											{item.name}
										</Select.Option>
									)
								})}
							</Select>
						</Form.Item>
						<Form.Item
							label='用户名称'
							name='userName'
							rules={[{ required: true, message: '请输入用户名称' }]}>
							<Input placeholder='请输入用户名称'></Input>
						</Form.Item>
						<Form.Item label='起始地址' name='startAddress'>
							<Input placeholder='请输入起始地址'></Input>
						</Form.Item>
						<Form.Item
							label='下单金额'
							name='orderAmount'
							rules={[{ required: true, message: '请输入下单金额' }]}>
							<Input placeholder='请输入下单金额' type='number'></Input>
						</Form.Item>
						<Form.Item
							label='司机名称'
							name='driverName'
							rules={[{ required: true, message: '请输入司机名称' }]}>
							<Input placeholder='请输入司机名称'></Input>
						</Form.Item>
						<Form.Item label='支付方式' name='payType'>
							<Select>
								<Select.Option value={1}>微信</Select.Option>
								<Select.Option value={2}>支付宝</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label='用车时间' name='useTime'>
							<DatePicker /* onChange={onChange} */ />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label='车型'
							name='vehicleName'
							rules={[{ required: true, message: '请选择车型' }]}>
							<Select placeholder='请选择车型'>
								{vehicleItem.map(item => {
									return (
										<Select.Option value={item.name} key={item.id}>
											{item.name}
										</Select.Option>
									)
								})}
							</Select>
						</Form.Item>
						<Form.Item
							label='手机号'
							name='mobile'
							rules={[
								{
									required: true,
									message: '请输入正确的手机号',
									pattern: /^1[3-9][0-9]{9}$/,
								},
							]}>
							<Input placeholder='请输入手机号'></Input>
						</Form.Item>
						<Form.Item label='结束地址' name='endAddress'>
							<Input placeholder='请输入结束地址'></Input>
						</Form.Item>
						<Form.Item
							label='支付金额'
							name='userPayAmount'
							rules={[{ required: true, message: '请输入支付金额' }]}>
							<Input placeholder='请输入支付金额' type='number'></Input>
						</Form.Item>
						<Form.Item
							label='司机金额'
							name='driverAmount'
							rules={[{ required: true, message: '请输入司机金额' }]}>
							<Input placeholder='请输入司机金额' type='number'></Input>
						</Form.Item>
						<Form.Item label='订单状态' name='state'>
							<Select>
								<Select.Option value={1}>进行中</Select.Option>
								<Select.Option value={2}>已完成</Select.Option>
								<Select.Option value={3}>已超时</Select.Option>
								<Select.Option value={4}>已取消</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label='结束时间'>
							<DatePicker />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}
