type Props = (arg1: string | any, arg2: string | any) => boolean

export const compareId: Props = (arg1, arg2): boolean => {
	if (arg1.toString() !== arg2.toString()) return false
	return true
}
