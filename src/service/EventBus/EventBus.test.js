import EventBus from "./EventBus";

describe('EventBus', () => {

	describe('registered: printHelloWorld', () => {

		beforeAll(() => {
			EventBus.instance.register("printHelloWorld", (val, world) => console.log(val, world))
		})

		it("should run", () => {
			EventBus.instance.emit("printHelloWorld", "hello", "world")
		})

		it("add another printHelloWorld, should throw exception", (done) => {
			try {
				EventBus.instance.register("printHelloWorld", () => console.log())
				fail("Should have thrown an exception")
			} catch (e) {
				done()
			}
		})

	})

})