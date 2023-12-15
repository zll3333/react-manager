//接口类型定义

import Dashboard from '@/views/DashBoard'

declare module 'axios' {
	interface AxiosRequestConfig {
		showLoading?: boolean
		showError?: boolean
	}
}
export interface Result<T = any> {
	code: Number
	data: T
	msg: String
}

export namespace Login {
	export interface params {
		userName: string
		userPwd: string
	}
}

export namespace User {
	export interface UserItem {
		_id: string
		userId: number
		userName: string
		userEmail: string
		mobile: string
		deptId: string
		deptName: string
		job: string
		state: number
		role: number
		roleList: (number | string)[]
		createId: number
		userImg: string
	}
}

export namespace Dashboard {
	export interface ReportData {
		driverCount: number
		totalMoney: number
		orderCount: number
		cityNum: 80
	}
	export interface LineData {
		label: string[]
		order: number[]
		money: number[]
	}
	export interface PieData {
		value: number
		name: string
	}
	export interface RadarData {
		indicator: Array<{ name: string; max: number }>
		data: {
			name: string
			value: number
		}
	}
}
