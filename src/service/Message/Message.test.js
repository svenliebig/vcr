import Message from "./index";
import { MessageModel } from "../../model";

describe('Message', () => {
	/** @type {Message} */
	let message

	beforeAll(() => message = new Message())

	describe(".writeMessage", () => {
		const to = "james"
		const from = "justin"
		const series = 1

		it("should write a message into the database", done => {
			message.writeMessage(series, from, to).then(() => {
				message.fb.get("/messages").then(result => {
					for (let key in result) {
						expect(result[key].series).toEqual(series)
						expect(result[key].from).toEqual(from)
						expect(result[key].to).toEqual(to)
					}
					done()
				})
			})
		})
	})

	describe(".getMessages", () => {
		const to = "sherlock"
		const from = "watson"
		const series = 2

		describe(`1 message for ${to} in database`, () => {
			beforeEach(done => message.writeMessage(series, from, to).then(done))

			it(`should find one message for ${to}`, done => {
				message.getMessages(to).then(messages => {
					expect(messages.length).toEqual(1)
					done()
				})
			})

			it(`should find no message for ${from}`, done => {
				message.getMessages(from).then(messages => {
					expect(messages.length).toEqual(0)
					done()
				})
			})
		})

		describe(`2 message for ${to} in database`, () => {
			const to2 = "sherlock"
			const from2 = "watson"
			const series2 = 3

			beforeEach(done => {
				message.writeMessage(series, from, to).then(() => {
					message.writeMessage(series2, from2, to2).then(done)
				})
			})

			it(`should find two messages for ${to}`, (done) => {
				message.getMessages(to).then(messages => {
					expect(messages.length).toEqual(2)
					done()
				})
			})

			it(`should find no message for ${from}`, (done) => {
				message.getMessages(from).then(messages => {
					expect(messages.length).toEqual(0)
					done()
				})
			})
		})
	})

	describe(".clearMessage", () => {
		const to = "sherlock"
		const from = "watson"
		const series = 2

		describe(`1 message for ${to} in database`, () => {
			beforeEach(done => message.writeMessage(series, from, to).then(done))

			it(`should find no message for ${to} after clearMessage`, done => {
				const msg = new MessageModel(series, from, to)
				message.clearMessage(msg).then(() => {
					message.getMessages(to).then(messages => {
						expect(messages.length).toEqual(0)
						done()
					})
				})
			})
		})
	})

	afterEach(done => message.fb.remove("/messages").then(done))

	afterAll(() => {
		message.fb.db.goOffline()
	})
})