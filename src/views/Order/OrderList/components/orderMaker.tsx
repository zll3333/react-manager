import api from '@/api'
import { Order } from '@/types/api'
import { IDetailProps } from '@/types/modal'
import { Modal } from 'antd'
import { useCallback, useImperativeHandle, useState } from 'react'
import { message } from '@/utils/AntdGlobal'

export default function OrderMacker(props: IDetailProps) {
	const [visiable, setVisiable] = useState(false)
	const [markers, setMarkers] = useState<{ lng: string; lat: string; id: number }[]>([])
	const [orderId, setOrderId] = useState<string>('')
	const handleOk = async () => {
		console.log(markers)

		await api.editRoute({ orderId, route: [...markers] })
		message.success('打点成功')
		handleCancel()
		console.log('置空marker' + markers)
	}

	const handleCancel = () => {
		setVisiable(false)
		setMarkers([])
		console.log(markers)
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
	const open = async (orderId: string) => {
		setVisiable(true)
		const detail = await api.getOrderDetail(orderId)
		setOrderId(orderId)
		renderMap(detail)
	}
	//渲染地图
	const renderMap = (detail: Order.OrderItem) => {
		var map = new window.BMapGL.Map('makerMap')
		var scaleCtrl = new window.BMapGL.ScaleControl() //比例尺控件
		var zoomCtrl = new window.BMapGL.ZoomControl() //  缩放控件
		map.centerAndZoom(detail.cityName, 12) //允许鼠标滚动缩放
		map.enableScrollWheelZoom(true)
		map.addControl(scaleCtrl)
		map.addControl(zoomCtrl)
		detail.route?.map(item => {
			createMarker(map, item.lng, item.lat)
		})

		//绑定点击事件
		map.addEventListener('click', function (e: any) {
			createMarker(map, e.latlng.lng, e.latlng.lat)
		})
	}
	//创建标注点
	const createMarker = (map: any, lng: string, lat: string) => {
		let point = new window.BMapGL.Point(lng, lat)
		const marker = new window.BMapGL.Marker(point)

		const id = Math.random()
		marker.id = id
		markers.push({ lng, lat, id })

		//右键删除事件
		const markerMenu = new window.BMapGL.ContextMenu()
		markerMenu.addItem(
			new window.BMapGL.MenuItem('删除', function () {
				map.removeOverlay(marker)
				const index = markers.findIndex(item => item.id === marker.id)
				markers.splice(index, 1)
				setMarkers([...markers])
			})
		)
		setMarkers([...markers])
		marker.addContextMenu(markerMenu)
		map.addOverlay(marker)
	}
	return (
		<Modal
			open={visiable}
			width={1000}
			title='地图打点'
			okText='确定'
			cancelText='取消'
			onOk={handleOk}
			onCancel={handleCancel}
			centered>
			<div id='makerMap' style={{ height: 450 }}></div>
		</Modal>
	)
}
