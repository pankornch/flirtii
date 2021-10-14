export interface IUser {
	_id?: string
	email?: string
	firstName?: string
	lastName?: string
	nickname?: string
	password?: string
	avatar?: string
	images?: string[]
	birthDate?: Date
	gender?: string
	bio?: string
	about?: string
	preferred?: string[]
	createdAt?: Date
	updatedAt?: Date
}

export interface ILike {
	_id?: string
	users?: IUser[] | string[]
	matched?: Boolean
	createdAt?: Date
	updatedAt?: Date
}

export interface ILikeUser {
	_id?: string
	source?: string | IUser
	target?: string | IUser
	createdAt?: Date
	updatedAt?: Date
	like?: string | ILike
}

export interface IChat {
	_id?: string
	users?: IUser[] | string[]
	createdAt?: Date
	updatedAt?: Date
}

export interface IMessage {
	_id?: string
	chat?: string | IChat
	user?: string | IUser
	text?: string
	createdAt?: Date
	updatedAt?: Date
}
