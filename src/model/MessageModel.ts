/**
 * represents a message between two users
 *
 * @export
 * @class MessageModel
 */
export default class MessageModel {
    public series: number
    public from: string
    public to: string

    /**
	 * creates an instance of {@link MessageModel}
	 *
	 * @param {number} series
	 * @param {string} from
	 * @param {string} to
	 */
    constructor(series: number, from: string, to: string) {
        this.series = series
        this.from = from
        this.to = to
    }

    toString() {
        return `${this.from}_${this.to}_${this.series}`
    }

    /**
	 *
	 * @param {Array<MessageModel>} entities
	 */
    static fromFirebaseArray(entities: Array<MessageModel>) {
        if (!entities) {
            return []
        }

        const array = []

        for (const key in entities) {
            array.push(this.fromFirebase(entities[key]))
        }

        return array
    }

    /**
	 *
	 * @param {MessageModel} entity
	 */
    static fromFirebase(entity: MessageModel) {
        return new MessageModel(entity.series, entity.from, entity.to)
    }
}