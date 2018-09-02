import SeriesRepository from 'vcr-shared/service/SeriesRepository';

describe('SeriesRepository', () => {
    let repo = new SeriesRepository()

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
            let series = {
                id: id,
                name: "testseries"
            }

            beforeAll((done) => {
                repo.removeSeries(id).then(() => done())
            })

            it('id and value given should add a series', (done) => {
                repo.addSeries(series).then(() => {
                    repo.getSeries(id).then(value => {
                        expect(value.name).toBe("testseries")
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
        repo.fb.db.goOffline()
    })
});