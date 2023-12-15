import request from '@/utils/request'
import { Login, User, Dashboard } from '@/types/api'

export default {
	//登录接口
	login(params: Login.params) {
		return request.post<string>('/users/login', params, { showLoading: false })
	},
	//获取用户信息接口
	getUserInfo() {
		return request.get<User.UserItem>('/users/getUserInfo')
	},
	//获取工作台统计数据
	getReportData() {
		return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
	},
	//获取图表数据
	getLineData() {
		return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
	},
	getPieCityData() {
		return request.get<Dashboard.PieData>('/order/dashboard/getPieCityData')
	},
	getPieAgeData() {
		return request.get<Dashboard.PieData>('/order/dashboard/getPieAgeData')
	},
	getRadarData() {
		return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
	},
}
