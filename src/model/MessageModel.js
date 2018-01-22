/**
 * represents a message between two users
 *
 * @export
 * @class MessageModel
 */
export default class MessageModel {

	/**
	 * creates an instance of {@link MessageModel}
	 *
	 * @param {number} series
	 * @param {string} from
	 * @param {string} to
	 */
	constructor(series = 0, from = "", to = "") {
		this.series = series
		this.from = from
		this.to = to
	}

	toString() {
		return `${this.from}_${this.to}_${this.series}`;
	}

	/**
	 *
	 * @param {Array<MessageModel>} entities
	 */
	static fromFirebaseArray(entities) {
		if (!entities) {
			return []
		}

		const array = []

		for (let key in entities) {
			array.push(this.fromFirebase(entities[key]));
		}

		return array
	}

	/**
	 *
	 * @param {MessageModel} entity
	 */
	static fromFirebase(entity) {
		return new MessageModel(entity.series, entity.from, entity.to)
	}

	// set series(series) {
	// 	this.series = series
	// }

	// set from(from) {
	// 	this.from = from
	// }

	// set to(to) {
	// 	this.to = to
	// }

	// /**
	//  * returns the id of the series
	//  *
	//  * @return {number}
	//  */
	// get series() {
	// 	return this.series
	// }

	// /**
	//  * returns the message sender
	//  *
	//  * @return {string}
	//  */
	// get from() {
	// 	return this.from
	// }

	// /**
	//  * returns the message receiver
	//  *
	//  * @return {string}
	//  */
	// get to() {
	// 	return this.to
	// }
}