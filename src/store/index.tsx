import { User } from '@/types/api'
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
	updateUserInfo: (userInfo: User.UserItem) => void
	updateToken: (token: string) => void
	updateCollapsed: () => void
}

export const useStore = create<Store>(set => ({
	token: '',
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
	updateUserInfo: userInfo => set({ userInfo }),
	updateToken: token => set({ token }),
	updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
}))
