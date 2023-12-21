import api from '@/api'
import { useStore } from '@/store'
import { Order } from '@/types/api'
import { IAction } from '@/types/modal'
import { formatDate, formatMoney } from '@/utils'
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import { message } from '@/utils/AntdGlobal'
import CreateOrder from './components/createOrder'
import OrderDetail from './components/orderDetail'
import OrderMacker from './components/OrderMaker'
import OrderRoute from './components/orderRoute'

export default function OrderFC() {
	const columns: ColumnsType<Order.OrderItem> = [
		{
			title: '订单编号',
			key: 'orderId',
			dataIndex: 'orderId',
		},
		{
			title: '城市',
			key: 'cityName',
			dataIndex: 'cityName',
			width: 65,
		},
		{
			title: '下单地址',
			key: 'startAddress',
			dataIndex: 'startAddress',
			width: 160,
			render(_, record) {
				return (
					<div>
						<p>起始地址：{record.startAddress}</p>
						<p>结束地址：{record.endAddress}</p>
					</div>
				)
			},
		},
		{
			title: '下单时间',
			key: 'createTime',
			width: 120,
			dataIndex: 'createTime',
			render(createTime) {
				return formatDate(createTime)
			},
		},

		{
			title: '订单价格',
			key: 'orderAmount',
			dataIndex: 'orderAmount',

			render(orderAmount: string) {
				return formatMoney(orderAmount)
			},
		},
		{
			title: '订单状态',
			key: 'state',
			dataIndex: 'state',

			render(state: Order.IState) {
				return {
					1: '进行中',
					2: '已完成',
					3: '已超时',
					4: '已取消',
				}[state]
			},
		},
		{
			title: '用户名称',
			key: 'userName',
			dataIndex: 'userName',
		},
		{
			title: '司机名称',
			key: 'driverName',
			dataIndex: 'driverName',
		},
		{
			title: '操作',
			key: 'action',
			render(_, record) {
				return (
					<Space>
						<Button type='text' onClick={() => showDetail(record.orderId)}>
							详情
						</Button>
						<Button type='text' onClick={() => handleMaker(record.orderId)}>
							打点
						</Button>
						<Button type='text' onClick={() => showRoute(record.orderId)}>
							轨迹
						</Button>
						<Button type='text' onClick={() => handleDelete(record._id)}>
							删除
						</Button>
					</Space>
				)
			},
		},
	]
	const orderResult = useStore(state => state.orderResult)
	const { page, list } = orderResult
	const orderRef = useRef<{
		open: (type: IAction, data?: Order.OrderItem) => void
	}>()
	const detailRef = useRef<{
		open: (orderId: string) => void
	}>()
	const markerRef = useRef<{
		open: (orderId: string) => void
	}>()
	const routeRef = useRef<{ open: (orderId: string) => void }>()
	const [pageSize, setPageSize] = useState(10)
	const updateOrderItem = useStore(state => state.updateOrderItem)
	const [form] = useForm()
	const handleSearch = () => {
		const data = form.getFieldsValue()
		updateOrderItem({ ...data, pageNum: 1, pageSize })
	}
	const handleReset = () => {
		form.resetFields()
	}
	const handleCreate = () => {
		orderRef.current?.open('create')
	}
	const handleExport = () => {
		api.orderExport(form.getFieldsValue())
		message.success('导出文件成功！')
	}
	const handleDelete = async (params: string) => {
		Modal.confirm({
			title: '删除订单',
			content: '确定删除该订单吗？',
			okText: '确定',
			cancelText: '取消',
			async onOk() {
				await api.deleteOrder(params)
				updateOrderItem({
					pageNum: 1,
				})
				message.success('删除成功！')
			},
		})
	}
	const showDetail = (orderId: string) => {
		detailRef.current?.open(orderId)
	}
	const handleMaker = (orderId: string) => {
		markerRef.current?.open(orderId)
	}
	const showRoute = (orderId: string) => {
		routeRef.current?.open(orderId)
	}
	useEffect(() => {
		updateOrderItem()
	}, [])
	return (
		<div className='order-list'>
			<Form className='search-item' layout='inline' form={form} initialValues={{ state: 1 }}>
				<Form.Item label='订单编号' name='orderId'>
					<Input placeholder='请输入订单编号' />
				</Form.Item>
				<Form.Item label='用户名称' name='userName'>
					<Input placeholder='请输入用户名称' />
				</Form.Item>
				<Form.Item label='订单状态' name='state'>
					<Select>
						<Select.Option value={1}>进行中</Select.Option>
						<Select.Option value={2}>已完成</Select.Option>
						<Select.Option value={3}>已超时</Select.Option>
						<Select.Option value={4}>已取消</Select.Option>
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
					<div className='title'>订单列表</div>
					<Space>
						<Button type='primary' onClick={handleCreate}>
							新建
						</Button>
						<Button type='primary' onClick={handleExport}>
							导出
						</Button>
					</Space>
				</div>
				<Table
					bordered
					rowKey='_id'
					columns={columns}
					dataSource={list}
					pagination={{
						total: page.total,
						pageSize: page.pageSize,
						current: page.pageNum,
						showTotal: total => `共${total}条`,
						onChange: (pageNum, pageSize) => {
							setPageSize(pageSize)
							updateOrderItem({ pageNum, pageSize })
						},
					}}></Table>
			</div>
			<CreateOrder mRef={orderRef} update={() => updateOrderItem()} />
			<OrderDetail mRef={detailRef} />
			<OrderMacker mRef={markerRef} />
			<OrderRoute mRef={routeRef} />
		</div>
	)
}
