import Firebase from './Firebase';

describe('Firebase', () => {
	let fb;

	beforeAll(() => {
		fb = Firebase;
	});

	it('should give series table', (done) => {
		// preparation
		fb.get("/series/", (val) => {
			done();
		});
	});
});