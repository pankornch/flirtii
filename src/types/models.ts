export interface IUser {
	_id?: string
	username?: string
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
	updatedAt?: string
}
