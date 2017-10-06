import Firebase from './Firebase';

describe('Firebase', () => {
	let fb;

	beforeAll(() => {
		fb = Firebase;
	});

	it('should login the testuser', (done) => {
		// execution
		fb.login("tester@tester.test", "test1234", () => {
			done();
		});
	});

	it('should give series table', (done) => {
		// preparation
		fb.get("/series/", (val) => {
			done();
		});
	});

	it('write', () => {
		// preparation
		let cu = fb.getUser();
	
		// execution
		fb.write('/users/' + cu.uid);
	
		// testing
		// fail();
	});
});