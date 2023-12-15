import axios, { AxiosError } from 'axios'
import { HideLoading, ShowLoading } from './Loading/index'
// import env from '@/config'
import { Result } from '@/types/api'
import { message } from './AntdGlobal'
import storage from './storage'

//创建实例
const instance = axios.create({
	baseURL: '/api',
	timeout: 5000,
	timeoutErrorMessage: '请求超时，请稍后再试',
	//请求跨域
	withCredentials: true,
	headers: { icode: 'D7DCDED83B772E89' }, //头部添加校验码
})

//请求拦截器
instance.interceptors.request.use(
	config => {
		if (config.showLoading) {
			ShowLoading()
		}
		const token = storage.get('token')
		//将token写入头
		if (token) {
			config.headers.Authorization = 'Bearer ' + token
		}

		return {
			...config,
		}
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

//响应拦截器
instance.interceptors.response.use(
	response => {
		const data: Result = response.data
		HideLoading()
		if (data.code === 500001) {
			//data.code===500001  用户未登录
			message.error(data.msg)

			localStorage.removeItem('token')
			location.href = '/login?callback=' + encodeURIComponent(location.href)
		} else if (data.code != 0) {
			if (response.config.showError === false) {
				return Promise.resolve(data)
			} else {
				message.error(data.msg)
				return Promise.reject(data)
			}
		}
		return data.data
	},
	error => {
		HideLoading()
		message.error(error.message)
		return Promise.reject(error.message)
	}
)

//二次封装get、post方法
interface IConfig {
	showLoading?: boolean
	showError?: boolean
}
export default {
	get<T>(
		url: string,
		params?: object,
		options: IConfig = { showLoading: true, showError: true }
	): Promise<T> {
		return instance.get(url, { params, ...options })
	},
	post<T>(
		url: string,
		data?: object,
		options: IConfig = { showLoading: true, showError: true }
	): Promise<T> {
		return instance.post(url, data, options)
	},
}
