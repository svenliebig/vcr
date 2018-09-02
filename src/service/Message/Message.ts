import MessageModel from "@model/MessageModel"
import ServiceFactory from "@utils/ServiceFactory"

export default class Message {
    private database = ServiceFactory.database

    /**
	 * writes a message into the database
	 *
	 * @param {number} series
	 * @param {string} from
	 * @param {string} to
	 */
    writeMessage(series: number, from: string, to: string) {
        const message = new MessageModel(series, from, to)

        return this.database.write(`/messages/${message.toString()}`, message)
    }

    /**
	 * returns all messages that are adressed to the argument
	 *
	 * @param {string} to the username of the receiver
	 * @return {Promise<Array<Message>>}
	 * @memberof Message
	 */
    getMessages(to: string) {
        return this.database.getWhere("/messages", "to", to).then(val =>
            Promise.resolve(MessageModel.fromFirebaseArray(val))
        )
    }

    /**
	 * clears a specific Message from the database
	 *
	 * @param {MessageModel} message
	 * @return {Promise<>}
	 */
    clearMessage(message: string) {
        return this.database.remove(`/messages/${message.toString()}`)
    }
}