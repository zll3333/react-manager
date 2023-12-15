import styles from './index.module.less'
import { Descriptions, Card, Button } from 'antd'
import type { DescriptionsProps } from 'antd'
import { useStore } from '@/store'
import * as echarts from 'echarts'
import { useEffect, useState } from 'react'
import { formatMoney, formatNum, formatState } from '@/utils'
import api from '@/api'
import { Dashboard } from '@/types/api'
import useChart from '@/hooks/useChart'

export default function DashboardFC() {
	const [report, setReport] = useState<Dashboard.ReportData>()
	const userInfo = useStore(state => state.userInfo)
	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: '用户ID',
			children: `${userInfo.userId}`,
		},
		{
			key: '2',
			label: '邮箱',
			children: `${userInfo.userEmail}`,
		},
		{
			key: '3',
			label: '状态',
			children: `${formatState(userInfo.state)}`,
		},
		{
			key: '4',
			label: '手机号',
			children: `${userInfo.mobile}`,
		},
		{
			key: '5',
			label: '岗位',
			children: `${userInfo.job}`,
		},
		{
			key: '6',
			label: '部门',
			children: `${userInfo.deptName}`,
		},
	]
	const [lineRef, lineChart] = useChart()
	const [pieCityRef, pieChartCity] = useChart()
	const [pieAgeRef, pieChartAge] = useChart()
	const [radarRef, radarChart] = useChart()
	//创建订单和流水走势图
	const renderLineChart = async () => {
		if (!lineChart) return
		const data = await api.getLineData()
		lineChart?.setOption({
			legend: {
				type: 'plain',
			},
			tooltip: {
				trigger: 'axis',
			},
			grid: {
				containLabel: true,
				left: 10,
				right: 0,
			},
			xAxis: {
				data: data.label,
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: '订单',
					data: data.order,
					type: 'line',
				},
				{
					name: '流水',
					data: data.money,
					type: 'line',
				},
			],
		})
	}
	//创建司机城市分布饼图
	const renderPieChartCity = async () => {
		if (!pieChartCity) return
		const data = await api.getPieCityData()
		console.log(data)

		pieChartCity?.setOption({
			title: {
				text: '司机城市分布',
				left: 'center',
			},
			tooltip: {
				triggger: 'item',
			},
			legend: {
				left: 'left',
				orient: 'vertical',
			},
			series: [
				{
					type: 'pie',
					radius: '50%',
					data: data,
				},
			],
		})
	}

	//创建司机年龄分布饼图
	const renderPieChartAge = async () => {
		if (!pieChartAge) return
		const data = await api.getPieAgeData()
		pieChartAge?.setOption({
			title: {
				text: '司机年龄分布',
				left: 'center',
			},
			tooltip: {
				type: 'item',
			},
			legend: {
				// type: 'plain',
				left: 'left',
				orient: 'vertical',
			},
			series: [
				{
					type: 'pie',
					// top: 'middle',
					radius: [50, 140],
					roseType: 'area',
					data: data,
				},
			],
		})
	}

	//创建司机模型诊断雷达图
	const renderRadarChart = async () => {
		if (!radarChart) return
		const data = await api.getRadarData()
		radarChart?.setOption({
			legend: {
				type: 'plain',
				data: ['司机模型诊断'],
			},
			tooltip: {},
			radar: {
				indicator: data.indicator,
			},
			series: [
				{
					name: '模型诊断',
					type: 'radar',
					data: data.data,
				},
			],
		})
	}

	//获取工作台汇总数据
	const getReportData = async () => {
		const data = await api.getReportData()
		setReport(data)
	}

	const handlePieChart = () => {
		renderPieChartAge()
		renderPieChartCity()
	}

	useEffect(() => {
		//渲染Echarts
		renderLineChart()
		renderPieChartCity()
		renderPieChartAge()
		renderRadarChart()

		//渲染DashBoard数据
		getReportData()
	}, [lineChart, pieChartCity, pieChartAge, radarChart])

	return (
		<div className={styles.dashboardWrapper}>
			<div className={styles.userInfo}>
				<img src={userInfo.userImg} alt='' className={styles.userImg} />
				<Descriptions title='User Info' items={items} />
			</div>
			<div className={styles.report}>
				<div className={styles.card}>
					<div className={styles.title}>司机数量</div>
					<div className={styles.data}>{formatNum(report?.driverCount)}&nbsp;个</div>
				</div>
				<div className={styles.card}>
					<div className={styles.title}>总流水</div>
					<div className={styles.data}>{formatMoney(report?.totalMoney)}&nbsp;元</div>
				</div>
				<div className={styles.card}>
					<div className={styles.title}>总订单</div>
					<div className={styles.data}>{formatNum(report?.orderCount)}&nbsp;单</div>
				</div>
				<div className={styles.card}>
					<div className={styles.title}>开通城市</div>
					<div className={styles.data}>{report?.cityNum}&nbsp;个</div>
				</div>
			</div>
			<div className={styles.chart}>
				<Card
					title='订单和模型走势图'
					extra={
						<Button type='primary' onClick={renderLineChart}>
							刷新
						</Button>
					}>
					<div ref={lineRef} className={styles.itemLine}></div>
				</Card>
			</div>
			<div className={styles.chart}>
				<Card
					title='司机分布'
					extra={
						<Button type='primary' onClick={handlePieChart}>
							刷新
						</Button>
					}>
					<div className={styles.pieChart}>
						<div ref={pieCityRef} className={styles.itemPie}></div>
						<div ref={pieAgeRef} className={styles.itemPie}></div>
					</div>
				</Card>
			</div>
			<div className={styles.chart}>
				<Card
					title='模型诊断'
					extra={
						<Button type='primary' onClick={renderRadarChart}>
							刷新
						</Button>
					}>
					<div ref={radarRef} className={styles.itemLine}></div>
				</Card>
			</div>
		</div>
	)
}
