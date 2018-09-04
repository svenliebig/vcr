import axios from "axios"
import SeriesapiService from "vcr-shared/service/Moviedb"

describe("MovieDatabase", () => {
    let classUnderTest: SeriesapiService

    beforeAll(() => {
        classUnderTest = new SeriesapiService("?api_key=2e74839a423b1266f0ccf5043bade403")
    })

    it("should find the walking dead in the database", (done) => {
        classUnderTest.findSerieByName("The Walking Dead").then(res => {
            expect(res.length).toBeGreaterThan(0)
            done()
        })
    })

    it("should find the walking dead by id in the database", (done) => {
        classUnderTest.getSeries(1402).then(res => {
            expect(res).toBeDefined()
            done()
        })
    })

    it("should find the walking dead season 1 by id in the database", (done) => {
        classUnderTest.getSeriesSeason(1402, 1).then(res => {
            expect(res).toBeDefined()
            done()
        })
    })

    it("should find complete the walking dead by id in the database", (done) => {
        classUnderTest.getCompleteSeries(1402).then(res => {
            expect(res).toBeDefined()
            done()
        })
    })

    describe("rest api returns null as promise", () => {
        beforeEach(() => {
            spyOn(axios, "get").and.callFake(() => Promise.resolve(null))
        })

        it("should call the promise with a value that is equal to null", (done) => {
            (classUnderTest as any).callApi(null as any).then((val: any) => {
                expect(val).toBe(null)
                done()
            })
        })
    })

    // describe("rest api rejects promise", () => {
    //     beforeEach(() => {
    //         spyOn(axios, "get").and.callFake(() => Promise.reject())
    //     })

    //     it("should call the setTimeout function when a error was thrown in the promise", (done) => {
    //         spyOn(window, "setTimeout").and.callFake(done);
    //         (classUnderTest as any).callApi(null as any).then(done)
    //     })
    // })
})