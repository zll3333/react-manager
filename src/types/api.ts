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

export interface ResultData<T = any> {
	list: T[]
	page: {
		pageNum: number
		pageSize: number
		total: number | 0
	}
}
export interface PageParams {
	pageSize?: number | undefined
	pageNum: number | 1
}

export namespace Login {
	export interface params {
		userName: string
		userPwd: string
	}
}

export namespace User {
	export interface Params extends PageParams {
		userId?: number
		userName?: string
		state?: number
	}

	export interface UserItem {
		_id: number
		createId: number
		createTime: string
		deptId: string
		deptName: string
		job: string
		lastLoginTime: string
		mobile: string
		role: number
		roleList: (number | string)[]
		state: number
		userEmail: string
		userId: number
		userImg: string
		userName: string
		__v: number
	}
	//创建用户接口
	export interface createParams {
		userName: string
		userEmail: string
		mobile?: number
		deptId: string[]
		job?: string
		state?: number
		roleList?: string[]
		userImg: string
	}
	//编辑用户接口
	export interface editParams extends createParams {
		userId: number
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

export namespace Dept {
	//接口参数
	export interface Params {
		deptName?: string
	}
	//返回值
	export interface createParams {
		parentId?: string
		deptName: string
		userName: string
	}
	export interface editParams extends createParams {
		_id: string
	}
	export interface DeptItem extends createParams {
		_id: string
		createTime: string
		updatetime: string
		children?: DeptItem[]
	}
}

export namespace Menu {
	export interface Params {
		menName?: string
		state?: number
	}
	export interface CreateParams {
		menuName: string
		icon?: string
		menuState: number
		menuType: number
		menuCode?: string
		parentId?: string
		path?: string
		component?: string
		orderBy: number
	}
	export interface EditMenu extends CreateParams {
		_id?: string
	}
	export interface MenuItem extends CreateParams {
		_id: string
		createTime: string
		buttons?: MenuItem[]
		children?: MenuItem[]
	}
}

//角色管理接口参数
export namespace Role {
	export interface Params extends PageParams {
		roleName?: string
	}

	export interface CreateParams {
		roleName: string
		remark?: string
	}
	export interface EditParams extends CreateParams {
		_id: string
	}
	export interface RoleItem extends CreateParams {
		_id: string
		permissionList: {
			checkedKeys: string[]
			halfCheckedKeys: string[]
		}
		updateTime: string
		createTime: string
	}

	//权限设置
	export interface Permission {
		_id: string
		permissionList: {
			checkedKeys: string[]
			halfCheckedKeys: string[]
		}
	}
}

export namespace Order {
	export interface Params extends PageParams {
		orderId?: string
		userName?: string
		state?: string
	}
	export enum IState {
		doing = 1,
		done = 2,
		timeout = 3,
		cancel = 4,
	}
	export interface CreateParams {
		cityName: string
		userName: string
		mobile: number
		startAddress: string //下单开始的地址
		endAddress: string //下单结束的地址
		orderAmount: number
		userPayAmount: number
		driverAmount: number
		payType: number //支付方式 1微信 2支付宝
		driverName: string
		vehicleName: string //订单车型
		state: IState //订单状态
		useTime: string
		endTime: string
	}

	export interface OrderItem extends CreateParams {
		_id: string
		orderId: string
		route: Array<{ lng: string; lat: string }> //行动轨迹
		createTime: string
		remark: string
	}
	export interface DictItem {
		id: number
		name: string
	}
	export interface SearchParams {
		orderId?: string
		userName?: string
		state?: number
	}
	export interface OrderRoute {
		orderId: string
		route?: Array<{ lng?: string; lat?: string }>
	}
}

export namespace Driver {
	export interface Params {
		driverName?: string
		accountStatus?: number
	}
	export enum DriverStatus {
		auth = 0,
		normal = 1,
		temp = 2,
		always = 3,
		stop = 4,
	}
	export interface DriverItem {
		driverName: string
		driverId: number
		driverPhone: string
		cityName: string
		grade: boolean
		driverLevel: number
		accountState: DriverStatus
		carNo: string
		vehicleBrand: string
		vehicleName: string
		onlineTime: string
		driverAmount: number
		rating: number
		driverScore: number
		pushOrderCount: number
		orderCompleteCount: number
		createTime: string
	}
	export interface DriverResult {
		total: number
		list: DriverItem[]
	}
}
