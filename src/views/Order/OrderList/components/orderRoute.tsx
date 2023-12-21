import api from '@/api'
import { Order } from '@/types/api'
import { IDetailProps } from '@/types/modal'
import { Modal } from 'antd'
import { transcode } from 'buffer'
import { useImperativeHandle, useState } from 'react'

export default function OrderRoute(props: IDetailProps) {
	const [visiable, setVisiable] = useState(false)
	const [trackAni, setTrackAni] = useState<any>()
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
		const trackAniObj = renderMap(detail)
		trackAniObj.start()
		setTrackAni(trackAniObj)
	}

	const handleCancel = () => {
		setVisiable(false)
		if (trackAni) {
			trackAni.cancel()
		}
	}

	//渲染地图
	const renderMap = (detail: Order.OrderItem) => {
		let map = new window.BMapGL.Map('routeAnimation')
		map.centerAndZoom(detail.cityName, 17)
		map.enableScrollWheelZoom()
		let point: any[] = []
		detail.route.forEach(item => {
			point.push(new window.BMapGL.Point(item.lng, item.lat))
		})
		let polyline = new window.BMapGL.Polyline(point, {
			strokeColor: '#ed6c00',
			strokeWeight: 6,
			strokeOpacity: 0.7,
		})
		let trackAni = new window.BMapGLLib.TrackAnimation(map, polyline, {
			overallView: true, // 动画完成后自动调整视野到总览
			tilt: 60, // 轨迹播放的角度，默认为55
			duration: 6000, // 动画持续时长，默认为10000，单位ms
			delay: 2000, // 动画开始的延迟，默认0，单位ms
		})
		return trackAni
	}

	return (
		<Modal
			title='司机轨迹'
			onCancel={handleCancel}
			width={1000}
			centered
			open={visiable}
			footer={false}>
			<div id='routeAnimation' style={{ height: 450 }}></div>
		</Modal>
	)
}
