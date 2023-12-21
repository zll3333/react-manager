import { useStore } from '@/store'
import { Driver } from '@/types/api'
import { formatDate, formatMoney } from '@/utils'
import { Button, Form, Input, Select, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ColumnsType } from 'antd/es/table/interface'
import { useEffect } from 'react'

export default function DriverFC() {
	const columns: ColumnsType<Driver.DriverItem> = [
		{
			title: '司机名称',
			key: 'driverName',
			dataIndex: 'driverName',
			fixed: 'left',
			width: 100,
			align: 'center',
		},
		{
			title: '司机信息',
			key: 'driverId',
			dataIndex: 'driverId',
			fixed: 'left',
			width: 180,

			render(_, record) {
				return (
					<div>
						<p>司机ID：{record.driverId}</p>
						<p>手机号码：{record.driverPhone}</p>
						<p>注册城市：{record.cityName}</p>
						<p>会员等级:{record.grade ? '会员' : '非会员'}</p>
						<p>司机等级：{record.driverLevel}</p>
					</div>
				)
			},
		},
		{
			title: '司机状态',
			key: 'accountStatus',
			dataIndex: 'accountStatus',
			width: 100,
			align: 'center',
			render(accountState: Driver.DriverStatus) {
				return {
					0: '待认证',
					1: '正常',
					2: '暂时拉黑',
					3: '永久拉黑',
					4: '停止推送',
				}[accountState]
			},
		},
		{
			title: '车辆信息',
			key: 'carNo',
			dataIndex: 'carNo',
			width: 180,
			render(_, record) {
				return (
					<div>
						<p>车辆号码：{record.carNo}</p>
						<p>车辆品牌：{record.vehicleBrand}</p>
						<p>车辆名称：{record.vehicleName}</p>
					</div>
				)
			},
		},
		{
			title: '昨日在线时长',
			dataIndex: 'onlineTime',
			key: 'onlineTime',
			width: 120,
			align: 'center',
		},
		{
			title: '昨日司机流水',
			dataIndex: 'driverAmount',
			key: 'driverAmount',
			width: 120,
			align: 'center',
			render(driverAmount) {
				return formatMoney(driverAmount)
			},
		},
		{
			title: '司机评分',
			dataIndex: 'rating',
			key: 'rating',
			width: 100,
			align: 'center',
		},
		{
			title: '行为分',
			dataIndex: 'driverScore',
			key: 'driverScore',
			width: 100,
			align: 'center',
		},
		{
			title: '昨日推单数',
			dataIndex: 'pushOrderCount',
			key: 'pushOrderCount',
			width: 120,
			align: 'center',
		},
		{
			title: '昨日完单数',
			dataIndex: 'orderCompleteCount',
			key: 'orderCompleteCount',
			width: 120,
			align: 'center',
		},
		{
			title: '加入时间',
			dataIndex: 'createTime',
			width: 160,
			key: 'createTime',
			align: 'center',
			render(createTime: string) {
				return formatDate(createTime)
			},
		},
	]
	const driverList = useStore(state => state.driverList)
	const updateDriverList = useStore(state => state.updateDriverItem)
	const [form] = useForm()
	const handleSearch = () => {
		const data = form.getFieldsValue()
		updateDriverList(data)
	}
	const handleReset = () => {
		form.resetFields()
		updateDriverList()
	}

	useEffect(() => {
		updateDriverList()
	}, [])

	return (
		<div className='driver-list'>
			<Form form={form} className='search-item' layout='inline'>
				<Form.Item label='司机名称' name='driverName'>
					<Input placeholder='请输入司机名称'></Input>
				</Form.Item>
				<Form.Item label='司机状态' name='accountState'>
					<Select style={{ width: 120 }}>
						<Select.Option value={0}>待认证</Select.Option>
						<Select.Option value={1}>正常</Select.Option>
						<Select.Option value={2}>暂时拉黑</Select.Option>
						<Select.Option value={3}>永久拉黑</Select.Option>
						<Select.Option value={4}>停止推送</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Space>
						<Button onClick={handleSearch} type='primary'>
							搜索
						</Button>
						<Button onClick={handleReset}>重置</Button>
					</Space>
				</Form.Item>
			</Form>
			<div className='base-table'>
				<div className='header-wrapper'>
					<div className='title'>司机列表</div>
				</div>
				<Table
					columns={columns}
					dataSource={driverList}
					rowKey='driverId'
					pagination={false}
					bordered
					scroll={{ x: 1400 }}
				/>
			</div>
		</div>
	)
}
