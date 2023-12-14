import { User } from '@/types/api'
import { create } from 'zustand'
interface Store {
	token: string
	collapsed: boolean
	userInfo: {
		userName: string
		userEmail: string
	}
	updateUserInfo: (userInfo: User.UserItem) => void
	updateToken: (token: string) => void
	updateCollapsed: () => void
}

export const useStore = create<Store>(set => ({
	token: '',
	collapsed: false,
	userInfo: {
		userName: '',
		userEmail: '',
	},
	updateUserInfo: userInfo => set({ userInfo }),
	updateToken: token => set({ token }),
	updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
}))
