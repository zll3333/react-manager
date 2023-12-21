/**
 * 工具函数封装
 */

import { Menu, Order } from '@/types/api'

//格式化金额
export const formatMoney = (num?: number | string) => {
	if (!num) return 0
	const a = parseFloat(num.toString())
	//number.toLocaleString()  用于金额格式化
	return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}
//格式化数字
export const formatNum = (num?: number | string) => {
	if (!num) return 0
	const a = num.toString()
	if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	return a.replace(/(\d)(?=(\d{3})+$)/g, '$1')
}

//格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
	let curDate = new Date()
	if (date instanceof Date) curDate = date
	else if (date) curDate = new Date(date)
	if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString()
	if (rule === 'HH:mm:ss') return curDate.toLocaleTimeString()
	return curDate.toLocaleString().replaceAll('/', '-')
}

//格式化状态
export const formatState = (state: number) => {
	switch (state) {
		case 1:
			return '在职'
		case 2:
			return '离职'
		case 3:
			return '试用期'
		default:
			break
	}
}

//格式化订单状态
export const formatOrderState = (state: Order.IState | undefined) => {
	switch (state) {
		case 1:
			return '进行中'

		case 2:
			return '已完成'
		case 3:
			return '已超时'
		case 4:
			return '已取消'
		default:
			break
	}
}
//格式化支付方式
export const formatPayType = (payType: number | undefined) => {
	switch (payType) {
		case 1:
			return '微信'
		case 2:
			return '支付宝'

		default:
			break
	}
}

//获取页面路径  concat用户合并数组  用法 arr1.concat(arr2)
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
	return list.reduce((result: string[], item: Menu.MenuItem) => {
		return result.concat(
			Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + ''
		)
	}, [])
}

//递归获取路由对象
export const searchRoute: any = (path: string, routes: any = []) => {
	for (const item of routes) {
		if (item.path === path) return item
		if (item.children) {
			const result = searchRoute(path, item.children)
			if (result) return result
		}
	}
	return ''
}

//手机号码加密
export const encryptMobile = (mobile: number | string | undefined) => {
	if (!mobile) return '-'
	const phone = mobile.toString()
	return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

//动态生成面包屑
export const findTreeNode = (tree: Menu.MenuItem[], pathName: string, path: string[]): string[] => {
	if (!tree) return []
	for (const data of tree) {
		path.push(data.menuName)
		if (data.path === pathName) return path
		if (data.children) {
			const list = findTreeNode(data.children, pathName, path)
			if (list?.length) return list
		}
		path.pop()
	}
	return []
}
