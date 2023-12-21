import api from '@/api'
import { Menu } from '@/types/api'
import { getMenuPath } from '@/utils'

//loader的作用：优先处理loader，在子路由组件加载之前，先加载loader
//这里用于获取用户权限，先判断用户有没有权限加载页面，再选择是否加载
export interface IAuthLoader {
	buttonList: string[]
	menuList: Menu.MenuItem[]
	menuPathList: []
}

export default async function AuthLoader() {
	const data = await api.getPermissionList()
	// console.log(data)

	const menuPathList = getMenuPath(data.menuList)

	return {
		buttonList: data.buttonList,
		menuList: data.menuList, //用户判断当前页面是否有权限  动态生成左侧侧边栏
		menuPathList, //组装页面路径
	}
}
