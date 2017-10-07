import SeriesapiService from './Moviedb'


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
	});
});