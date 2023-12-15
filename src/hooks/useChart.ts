import { useEffect, useRef, useState, RefObject } from 'react'
import * as echart from 'echarts'

const useChart = (): [RefObject<HTMLDivElement>, echarts.EChartsType | undefined] => {
	const chartRef = useRef<HTMLDivElement>(null)
	const [chartInstance, setChartInstance] = useState<echarts.EChartsType>()

	useEffect(() => {
		const chart = echart.init(chartRef.current)
		setChartInstance(chart)
	}, [chartInstance])

	return [chartRef, chartInstance]
}
export default useChart
