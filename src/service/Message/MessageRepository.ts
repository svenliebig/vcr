import MessageModel from "@model/MessageModel"
import ServiceFactory from "@utils/ServiceFactory"

export default class MessageRepository {
    private database = ServiceFactory.database

    /**
     * writes a message into the database
     *
     * @param {number} series
     * @param {string} from
     * @param {string} to
     */
    public writeMessage(series: number, from: string, to: string) {
        const message = new MessageModel(series, from, to)

        return this.database.write(`/messages/${message.toString()}`, message)
    }

    /**
     * returns all messages that are adressed to the argument
     *
     * @param {string} to the username of the receiver
     * @return {Promise<Array<MessageRepository>>}
     * @memberof Message
     */
    public getMessages(to: string) {
        return this.database.getWhere("/messages", "to", to).then(val => MessageModel.fromFirebaseArray(val))
    }

    /**
     * returns the amount of the current messages
     *
     * @param {string} to the username of the receiver
     * @return {Promise<number>}
     * @memberof Message
     */
    public getMessageAmount(to: string): Promise<number> {
        return this.getMessages(to)
            .then(val => val.length)
    }

    /**
     * clears a specific Message from the database
     *
     * @param {MessageModel} message
     * @return {Promise<>}
     */
    public clearMessage(message: string) {
        return this.database.remove(`/messages/${message.toString()}`)
    }
}