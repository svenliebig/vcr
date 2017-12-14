import SeriesapiService from './Moviedb'
import axios from 'axios'


describe('MovieDatabase', () => {
	let classUnderTest = null;

	beforeAll(() => {
		classUnderTest = new SeriesapiService();
	});

	it('should find the walking dead in the database', (done) => {
		// preparation
	
		// execution
	
		// testing
		classUnderTest.findSerieByName('The Walking Dead', (res) => {
			expect(res.length).toBeGreaterThan(0);
			done();
		});
	});
	
	it('should find the walking dead by id in the database', (done) => {
		// preparation
	
		// execution
	
		// testing
		classUnderTest.getSeries(1402, (res) => {
			expect(res).toBeDefined();
			done();
		});
	});

	it('should find the walking dead season 1 by id in the database', (done) => {
		// preparation
	
		// execution
	
		// testing
		classUnderTest.getSeriesSeason(1402, 1, (res) => {
			expect(res).toBeDefined();
			done();
		});
	});
	
	it('should find complete the walking dead by id in the database', (done) => {
		// preparation
	
		// execution
	
		// testing
		classUnderTest.getCompleteSeries(1402, (res) => {
			expect(res).toBeDefined();
			done();
		});
	})
	
	describe('rest api returns null as value', () => {
		beforeEach(() => {
			spyOn(axios, 'get').and.callFake(() => Promise.resolve(null))
		})

		it('should call the callback with a value that is equal to null', (done) => {
			var mock = { func: (val) => {
					expect(val).toBe(null)
					done()
				}
			}
			classUnderTest.callApi(null, mock.func)
		});
		
		it('should call the setTimeout function when a error was thrown in the promise', (done) => {
			var mock = { func: () => {
					throw ""
				}
			}
			spyOn(window, 'setTimeout').and.callFake(() => done())
			classUnderTest.callApi(null, mock.func)
		});
	})
});