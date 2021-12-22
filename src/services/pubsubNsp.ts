import { PubSub } from "graphql-subscriptions"
const eventNames = ["newMessage", "matched"]

// pubsubNsp([12,3, NEW_MESSAEG]).publish()

interface Props {
	pubsub: PubSub
	userIds: string[] | any[]
	room: "newMessage" | "matched"
}

const nsp = (uid: any, room: string): string[] | string => {
    if (Array.isArray(uid)) {
        return  uid.map(u => nsp(u, room)) as string[]
    }

    return `${uid}:${room}` 
}

export const pubsubNsp = ({ pubsub, userIds, room }: Props) => {
	return {
		publish(data: any) {
			for (const uid of userIds) {
				pubsub.publish(nsp(uid, room) as string, {
                    [room]: data
                })
			}
		},
		asyncIterator() {
            return pubsub.asyncIterator(nsp(userIds, room))
        },
	}
}
