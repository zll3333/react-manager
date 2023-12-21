import api from '@/api'
import { Select } from 'antd'
import { useEffect, useState } from 'react'

export default function Cluster() {
	const [cityId, setCityId] = useState(10001)
	const getCityDate = async () => {
		const data = await api.getCityData(cityId)
		// console.log(data)

		setTimeout(() => {
			renderMap(cityId, data)
		})
	}
	useEffect(() => {
		getCityDate()
	}, [cityId])

	//渲染地图
	const renderMap = (cityId: number, points: Array<{ lng: number; lat: number }>) => {
		const map = new window.BMapGL.Map('clusterMap')
		const cityName: { [k: number]: string } = {
			10001: '长沙',
			20001: '武汉',
			30001: '杭州',
			40001: '惠州',
			50001: '昆明',
		}
		map.centerAndZoom(cityName[cityId], 12)
		map.enableScrollWheelZoom()
		// 添加缩放控件
		const zoomCtrl = new window.BMapGL.ZoomControl()
		map.addControl(zoomCtrl)

		//创建marker
		const markers: any[] = []
		points.forEach(point => {
			let pt = new window.BMapGL.Point(point.lng, point.lat)
			markers.push(new window.BMapGL.Marker(pt))
		})
		if (markers.length > 0) {
			new window.BMapLib.MarkerClusterer(map, { markers: markers })
		}
	}
	const handleChange = (val: number) => {
		setCityId(val)
	}
	return (
		<div className='cluster' style={{ backgroundColor: '#fff', padding: 10 }}>
			<Select style={{ width: 120, marginBottom: 10 }} value={cityId} onChange={handleChange}>
				<Select.Option value={10001}>长沙</Select.Option>
				<Select.Option value={20001}>武汉</Select.Option>
				<Select.Option value={30001}>杭州</Select.Option>
				<Select.Option value={40001}>惠州</Select.Option>
				<Select.Option value={50001}>昆明</Select.Option>
			</Select>
			<div id='clusterMap' style={{ height: 400 }}></div>
		</div>
	)
}
