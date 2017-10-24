import SeriesRepository from './SeriesRepository';

describe('SeriesRepository', () => {
	
	xit('random id 🎉  should get no series', (done) => {
		// preparation
		let repo = new SeriesRepository();
		
		// execution
		repo.getById('987654321', (value) => {
			expect(value).toBe(null);
			done();
		});
	});

	xit('empty id 🎉  should get no series', (done) => {
		// preparation
		let repo = new SeriesRepository();
	
		// execution
		repo.getById('', (value) => {
			expect(value).toBe(null);
			done();
		});
	});

	xit('null 🎉  should get no series', (done) => {
		// preparation
		let repo = new SeriesRepository();
	
		// execution
		repo.getById(null, (value) => {
			expect(value).toBe(null);
			done();
		});
	});

	xit('id and value given 🎉  should add a series', (done) => {
		// preparation
		let repo = new SeriesRepository();
		let id = "myownid";
		let series = { "foo": 'bar' }

		// execution
		repo.addSeries(id, series);

		repo.getById(id, (value) => {
			expect(value.foo).toBe("bar");
			done();
		});
	});

	xit('id and value null 🎉  should throw exception', (done) => {
		// preparation
		let repo = new SeriesRepository();

		// execution
		try {
			repo.addSeries(null, null);
		} catch(e) {
			done();
		}
	});
});