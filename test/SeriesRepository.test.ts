import { SeriesRepository, SeriesModel } from "vcr-shared"
import ServiceFactory from "@utils/ServiceFactory"

describe("SeriesRepository", () => {
    let repo = new SeriesRepository(ServiceFactory.database)

    beforeAll(() => repo = new SeriesRepository(ServiceFactory.database))

    describe("getSeries", () => {
        describe("database is empty", () => {

            it("random Id, should return null as promise value", (done) => {
                repo.getSeries("987654321").then((value: SeriesModel) => {
                    expect(value).toBe(null)
                    done()
                })
            })

            it("empty Id, should return null as promise value", (done) => {
                repo.getSeries("").then(value => {
                    expect(value).toBe(null)
                    done()
                })
            })

            it("null Id, should return null as promise value", (done) => {
                repo.getSeries(null as any).then(value => {
                    expect(value).toBe(null)
                    done()
                })
            })
        })

        describe("series { foo: \"bar\" } is in database", () => {
            const id = 12345

            const series: Partial<SeriesModel> = {
                id,
                name: "testseries"
            }

            beforeAll((done) => {
                repo.removeSeries(id).then(done)
            })

            it("id and value given should add a series", (done) => {
                repo.addSeries(series as SeriesModel).then(() => {
                    repo.getSeries(id).then(value => {
                        expect(value.name).toBe("testseries")
                        done()
                    })
                })
            })
        })
    })

    describe("addSeries", () => {
        describe("id and value null", () => {
            it("should throw exception", (done) => {
                try {
                    repo.addSeries(null as any)
                } catch (e) {
                    done()
                }
            })
        })
    })

    afterAll(() => {
        (repo as any).firebase.db.goOffline()
    })
})