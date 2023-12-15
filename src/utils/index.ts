/**
 * 工具函数封装
 */

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
export const formatDate = (date?: Date, rule?: string) => {
	let curDate = new Date()
	if (date) curDate = date
	if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString()
	if (rule === 'HH:mm:ss') return curDate.toLocaleTimeString()
	return curDate.toLocaleString
}

//格式化状态
export const formatState = (state: number) => {
	switch (state) {
		case 1:
			return '在职'
		case 2:
			return '试用期'
		case 3:
			return '离职'
		default:
			break
	}
}
