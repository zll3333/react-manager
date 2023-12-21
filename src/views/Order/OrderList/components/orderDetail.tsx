import { Descriptions, Modal } from 'antd'
import type { DescriptionsProps } from 'antd'
import { IAction, IDetailProps, IModelProp } from '@/types/modal'
import { useImperativeHandle, useState } from 'react'
import { Order } from '@/types/api'
import api from '@/api'
import { encryptMobile, formatDate, formatMoney, formatOrderState, formatPayType } from '@/utils'

export default function OrderDetail(props: IDetailProps) {
	const [detail, setDetail] = useState<Order.OrderItem>()
	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: '订单编号',
			children: `${detail?.orderId}`,
		},
		{
			key: '2',
			label: '下单城市',
			children: `${detail?.cityName}`,
		},
		{
			key: '3',
			label: '下单用户',
			children: `${detail?.userName}`,
		},
		{
			key: '4',
			label: '手机号',
			children: `${encryptMobile(detail?.mobile || 0)}`,
		},
		{
			key: '5',
			label: '起点',
			children: `${detail?.startAddress}`,
		},
		{
			key: '6',
			label: '终点',
			children: `${detail?.endAddress}`,
		},
		{
			key: '7',
			label: '订单金额',
			children: `${formatMoney(detail?.orderAmount)}`,
		},
		{
			key: '8',
			label: '用户支付金额',
			children: `${formatMoney(detail?.userPayAmount)}`,
		},
		{
			key: '9',
			label: '司机到账金额',
			children: `${formatMoney(detail?.driverAmount)}`,
		},
		{
			key: '10',
			label: '支付方式',
			children: `${formatPayType(detail?.payType)}`,
		},
		{
			key: '11',
			label: '司机名称',
			children: `${detail?.driverName}`,
		},
		{
			key: '12',
			label: '订单车型',
			children: `${detail?.vehicleName}`,
		},
		{
			key: '13',
			label: '订单状态',
			children: `${formatOrderState(detail?.state)}`,
		},
		{
			key: '14',
			label: '用车时间',
			children: `${formatDate(detail?.useTime)}`,
		},
		{
			key: '15',
			label: '订单结束时间',
			children: `${formatDate(detail?.endTime)}`,
		},
		{
			key: '16',
			label: '订单创建时间',
			children: `${formatDate(detail?.createTime)}`,
		},
	]

	const [visiable, setVisiable] = useState(false)

	useImperativeHandle(
		props.mRef,
		() => {
			return {
				open,
			}
		},
		[]
	)
	const open = async (orderId: string) => {
		setVisiable(true)
		const orderDetail = await api.getOrderDetail(orderId)
		setDetail(orderDetail)
	}
	/* 	const hancleOk = () => {
		setVisiable(true)
	} */
	const handleCancel = () => {
		setVisiable(false)
	}

	return (
		<Modal
			title='订单详情'
			/* okText='确定'
			cancelText='取消'
			onOk={hancleOk} */
			onCancel={handleCancel}
			open={visiable}
			width={700}
			footer={false}
			centered>
			<Descriptions items={items} column={2} style={{ padding: '10px 30px', fontSize: 20 }} />
		</Modal>
	)
}
