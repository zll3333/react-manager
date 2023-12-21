import { MutableRefObject } from 'react'
import { Dept, User } from './api'

export type IAction = 'create' | 'edit' | 'delete'

export interface IModelProp<T = User.UserItem> {
	mRef: MutableRefObject<{ open: (type: IAction, data?: T) => void } | undefined>
	update: () => void
}
export interface IDetailProps {
	mRef: MutableRefObject<{ open: (orderId: string) => void } | undefined>
}
/* export interface IEditMarkerProps {
	mRef: MutableRefObject<{ open: (orderId: string) => void } | undefined>
	update: () => void
} */
