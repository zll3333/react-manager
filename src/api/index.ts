import request from '@/utils/request'
import { Login, User, Dashboard, ResultData, Dept, Menu, Role, Order, Driver } from '@/types/api'

export default {
	//登录接口
	login(params: Login.params) {
		return request.post<string>('/users/login', params, { showLoading: false })
	},
	//获取用户信息接口
	getUserInfo() {
		return request.get<User.UserItem>('/users/getUserInfo')
	},
	//获取用户权限接口
	getPermissionList() {
		return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>(
			'/users/getPermissionList'
		)
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

	/**
	 * 用户管理接口
	 */

	//获取用户管理数据
	getUserList(params: User.Params) {
		return request.get<ResultData<User.UserItem>>('/users/list', params)
	},

	//创建用户
	createUser(params: User.createParams) {
		return request.post('/users/create', params)
	},
	//编辑用户
	editUser(params: User.editParams) {
		return request.post('/users/edit', params)
	},
	//删除用户
	deleteUser(params: { userIds: number[] }) {
		return request.post('/users/delete', params)
	},

	/**
	 * 部门管理接口
	 */

	//获取部门列表
	getDeptList(parmas?: Dept.Params) {
		return request.get<Dept.DeptItem[]>('/dept/list', parmas)
	},
	//创建部门
	createDeptList(params: Dept.createParams) {
		return request.post('/dept/create', params)
	},
	//编辑部门
	editDeptList(params: Dept.editParams) {
		return request.post('/dept/edit', params)
	},

	//删除部门
	deleteDeptList(params: string) {
		return request.post('/dept/delete', { _id: params })
	},
	getAllUserList() {
		return request.get<User.UserItem[]>('/users/all/list')
	},

	/**
	 * 菜单管理接口
	 */

	//获取菜单列表
	getMenuItem(params?: Menu.Params) {
		return request.get<Menu.MenuItem[]>('/menu/list', params)
	},

	createMenuItem(params: Menu.CreateParams) {
		return request.post('/menu/create', params)
	},
	editMenuItem(params: Menu.EditMenu) {
		return request.post('/menu/edit', params)
	},
	deleteMenuItem(params: string) {
		return request.post('/menu/delete', { _id: params })
	},

	/**
	 * 角色管理接口
	 */

	getRoleItem(params?: Role.Params) {
		return request.get<ResultData<Role.RoleItem>>('/roles/list', params)
	},

	createRoleItem(params: Role.CreateParams) {
		return request.post<Role.RoleItem>('/roles/create', params)
	},

	editRoleItem(params: Role.EditParams) {
		return request.post<Role.RoleItem>('/roles/edit', params)
	},
	deleteRoleItem(parmas: string) {
		return request.post('/roles/delete', { _id: parmas })
	},
	//获取所有角色列表
	getAllRoleList() {
		return request.get<Role.RoleItem[]>('/roles/allList')
	},
	//权限设置接口
	updatePermisson(parmas: Role.Permission) {
		return request.post('/roles/update/permission', parmas)
	},

	/**
	 * 订单接口
	 */

	getOrderList(params?: Order.Params) {
		return request.get<ResultData<Order.OrderItem>>('/order/list', params)
	},
	getOrderDetail(orderId: string) {
		return request.get<Order.OrderItem>(`/order/detail/${orderId}`)
	},
	getCityList() {
		return request.get<Order.DictItem[]>('/order/cityList')
	},
	getVehicleList() {
		return request.get<Order.DictItem[]>('/order/vehicleList')
	},
	createOrder(params: Order.CreateParams) {
		return request.post('/order/create', params)
	},
	orderExport(params: Order.SearchParams) {
		return request.downloadFile('/order/orderExport', params, '订单列表.xlsx')
	},
	//修改订单轨迹
	editRoute(params?: Order.OrderRoute) {
		return request.post('/order/edit', params)
	},
	deleteOrder(params: string) {
		return request.post('/order/delete', { _id: params })
	},

	/**
	 * 司机接口
	 */
	getDriverList(params?: Driver.Params) {
		return request.get<Driver.DriverResult>('/order/driver/list', params)
	},

	/**
	 * 获取城市订单
	 */
	getCityData(cityId: number) {
		return request.get<Array<{ lng: number; lat: number }>>(`/order/cluster/${cityId}`)
	},
}
