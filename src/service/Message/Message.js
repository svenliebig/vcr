import Firebase from '../firebase/Firebase';
import MessageModel from '../../model/MessageModel';

export default class Message {
	constructor() {
		this.fb = new Firebase()
	}

	/**
	 * writes a message into the database
	 *
	 * @param {number} series
	 * @param {string} from
	 * @param {string} to
	 */
	writeMessage(series, from, to) {
		const message = new MessageModel(series, from, to)

		return this.fb.write(`/messages/${message.toString()}`, message)
	}

	/**
	 * returns all messages that are adressed to the argument
	 *
	 * @param {string} to the username of the receiver
	 * @return {Promise<Array<Message>>}
	 * @memberof Message
	 */
	getMessages(to) {
		return this.fb.getWhere("/messages", "to", to).then(val =>
			Promise.resolve(MessageModel.fromFirebaseArray(val))
		)
	}

	/**
	 * clears a specific Message from the database
	 *
	 * @param {MessageModel} message
	 * @return {Promise<>}
	 */
	clearMessage(message) {
		return this.fb.remove(`/messages/${message.toString()}`)
	}
}