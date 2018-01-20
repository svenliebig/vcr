import SeriesRepository from './SeriesRepository';

describe('SeriesRepository', () => {
	let repo

	beforeAll(() => repo = new SeriesRepository())

	describe("getSeries", () => {

		describe("database is empty", () => {

			it('random Id, should return null as promise value', (done) => {
				repo.getSeries('987654321').then(value => {
					expect(value).toBe(null)
					done()
				})
			})

			it('empty Id, should return null as promise value', (done) => {
				repo.getSeries('').then(value => {
					expect(value).toBe(null)
					done()
				})
			})


			it('null Id, should return null as promise value', (done) => {
				repo.getSeries(null).then(value => {
					expect(value).toBe(null)
					done()
				})
			})

		})

		describe("series { foo: 'bar' } is in database", () => {
			const id = "mySecretId";
			let series = { id: id, name: "testseries" }

			beforeAll((done) => {
				repo.removeSeries(id).then(() => done())
			})

			it('id and value given 🎉  should add a series', (done) => {

				// execution
				repo.addSeries(series).then(() => {
					repo.getSeries(id).then(value => {
						expect(value.name).toBe("testseries")
						done()
					})
				})
			})
		})
	})



	describe("getBurningSeriesLink", () => {
		describe("series with old bs.to link in database", () => {

			const id = "mySecondSecretId";
			let series = { id: id, name: "testseries", "bstolink": "mylink" }


			beforeEach((done) => {
				repo.removeSeries(id).then(() => repo.addSeries(series).then(() => done()))
			})

			fit("should have the old link", (done) => {
				repo.getSeries(id).then(val => {
					expect(val.bstolink).toBe("mylink")
					done()
				})
			})

			fit("should have the new link type after load", (done) => {
				repo.getBurningSeriesLink(id).then(val => {
					repo.getSeries(id).then(val => {
						expect(val.links.bsto).toBe("mylink")
						done()
					})
				})
			})

			fit("should not have the old link after load", (done) => {
				repo.getBurningSeriesLink(id).then(val => {
					repo.getSeries(id).then(val => {
						expect(val.bstolink).toBe(undefined)
						done()
					})
				})
			})
		})
	})

	describe('addSeries', () => {
		describe('id and value null', () => {
			it('should throw exception', (done) => {
				try {
					repo.addSeries(null, null)
				} catch (e) {
					done()
				}
			})
		})
	})

	afterAll(() => {
		// Close firebase connection
		repo.fb.db.goOffline()
	})
});