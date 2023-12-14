//接口类型定义

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
