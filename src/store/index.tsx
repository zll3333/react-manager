import api from '@/api'
import { User, Menu, Role, Order, ResultData, Driver } from '@/types/api'
import storage from '@/utils/storage'
import { create } from 'zustand'
interface Store {
	token: string
	collapsed: boolean
	userInfo: {
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
	menuItem: Menu.MenuItem[]
	roleResult: ResultData<Role.RoleItem>
	orderResult: ResultData<Order.OrderItem>
	driverList: Driver.DriverItem[]
	isDark: boolean
	updateUserInfo: (userInfo: User.UserItem) => void
	updateToken: (token: string) => void
	updateCollapsed: () => void
	updateMenuItem: (params?: Menu.Params) => void
	updateRoleItem: (params?: Role.Params) => void
	updateOrderItem: (params?: Order.Params) => void
	updateDriverItem: (params?: Driver.Params) => void
	updateIsDark: (isDark: boolean) => void
}

export const useStore = create<Store>(set => ({
	token: '',
	isDark: storage.get('isdark') || false,
	collapsed: false,
	userInfo: {
		userId: 0,
		userName: '',
		userEmail: '',
		mobile: '',
		deptId: '',
		deptName: '',
		job: '',
		state: 1,
		role: 1,
		roleList: [],
		createId: 1,
		userImg: '',
	},
	menuItem: [
		{
			_id: '',
			menuName: '',
			createTime: '',
			menuState: 1,
			menuType: 1,
			menuCode: '',
			icon: '',
			parentId: '',
			component: '',
			path: '',
			orderBy: 0,
		},
	],
	roleResult: {
		list: [
			{
				roleName: '',
				remark: '',
				_id: '',
				permissionList: {
					checkedKeys: [],
					halfCheckedKeys: [],
				},
				updateTime: '',
				createTime: '',
			},
		],
		page: {
			pageSize: 10,
			pageNum: 1,
			total: 0,
		},
	},
	orderResult: {
		list: [
			{
				_id: '',
				orderId: '',
				route: [], //行动轨迹
				createTime: '',
				remark: '',
				cityName: '',
				userName: '',
				mobile: 0,
				startAddress: '', //下单开始的地址
				endAddress: '', //下单结束的地址
				orderAmount: 0,
				userPayAmount: 0,
				driverAmount: 0,
				payType: 0, //支付方式 1微信 2支付宝
				driverName: '',
				vehicleName: '', //订单车型
				state: 0, //订单状态
				useTime: '',
				endTime: '',
			},
		],
		page: {
			pageSize: 10,
			pageNum: 1,
			total: 0,
		},
	},
	driverList: [
		{
			driverName: '',
			driverId: 0,
			driverPhone: '',
			cityName: '',
			grade: false,
			driverLevel: 0,
			accountState: 0,
			carNo: '',
			vehicleBrand: '',
			vehicleName: '',
			onlineTime: '',
			driverAmount: 0,
			rating: 0,
			driverScore: 0,
			pushOrderCount: 0,
			orderCompleteCount: 0,
			createTime: '',
		},
	],
	updateUserInfo: userInfo => set({ userInfo }),
	updateIsDark: isDark => set({ isDark }),
	updateToken: token => set({ token }),
	updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
	updateMenuItem: async params => {
		const data = await api.getMenuItem(params)
		set({ menuItem: data })
	},
	updateRoleItem: async params => {
		const data = await api.getRoleItem(params)
		set({ roleResult: data })
	},
	updateOrderItem: async params => {
		const data = await api.getOrderList(params)
		set({ orderResult: data })
	},
	updateDriverItem: async params => {
		const data = await api.getDriverList(params)
		set({ driverList: data.list })
	},
}))
