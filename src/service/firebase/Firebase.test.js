import Firebase from './Firebase';

describe('Firebase', () => {
	let classUnderTest = new Firebase();

	beforeEach((done) => {
		classUnderTest.remove('/test')
		.then(done());
	});

	describe('onAuthStateChanged(object): void', () => {
		describe('user is null', () => {
			xit('should call localStorage removeItem', () => {
				spyOn(window.localStorage, 'removeItem');
				classUnderTest.onAuthStateChanged(null);
				expect(window.localStorage.removeItem).toBeCalled();
			});
		});

		describe('user is not null', () => {
			xit('should call localStorage setItem', () => {
				spyOn(window.localStorage, 'setItem');
				classUnderTest.onAuthStateChanged("not null");
				expect(window.localStorage.setItem).toBeCalled();
			})

			afterAll(() => {
				classUnderTest.user = null;
			});
		})
	})

	// Firebase.write
	describe('.write(string, value): Promise', () => {
		it('should write the value and call the promise', (done) => {
			// execution
			classUnderTest.write('/test/', { val: 'val' })
			.then(done());
		});
	});

	// Firebase.remove
	describe('.remove(string): Promise', () => {
		describe('node exists', () => {
			beforeEach(done => {
				classUnderTest.write('/test/', { val: 'myVal' })
				.then(done());
			});

			it('should remove the node and call the promise', (done) => {
				// execution
				classUnderTest.remove('/test/')
				.then(() =>
					classUnderTest.exists('/test/val').then(val => {
						expect(val).toBe(false);
						done();
					})
				);
			});

			it('should not remove the node and call the promise', done => {
				// execution
				classUnderTest.remove('/test/val2')
				.then(() =>
					classUnderTest.exists('/test/val')
					.then(val => {
						expect(val).toBe(true);
						done();
					})
				);
			});
		});
	});

	describe('.exists(string): Promise', () => {
		describe('node exists', () => {
			beforeEach(done => {
				classUnderTest.write('/test/', { val: 'myVal' })
				.then(done());
			});

			it('should return promise with true', done => {
				// execution
				classUnderTest.write('/test/', { val: 'myVal' })
				.then(() =>
					classUnderTest.exists('/test/val')
					.then(exists => {
						expect(exists).toBe(true);
						done();
					})
				);
			});
		});

		describe('node doesn\'t exists', () => {
			it('should call the promise with false', done => {
				// execution
				classUnderTest.exists('/test/val')
				.then(exists => {
					expect(exists).toBe(false);
					done();
				});
			});
		});
	});

	describe('get(string): Promise', () => {
		describe('node has value', () => {
			beforeEach(done => {
				classUnderTest.write('/test/', { val: 'myVal' })
				.then(done());
			});

			it('should find value "myVal" and call promise', done => {
				// execution
				classUnderTest.get('/test/val')
				.then(val => {
					expect(val).toBe('myVal');
					done();
				});
			});
		});

		describe('node has no value', () => {
			it('should find null and call promise', done => {
				// execution
				classUnderTest.get('/test/val')
				.then(val => {
					expect(val).toBeNull();
					done();
				});
			});
		});
	});

	describe('isLoggedIn(): Boolean', () => {
		describe('user is not logged in', () => {
			it('should return false', () => {
				// execution
				const result = classUnderTest.isLoggedIn();
				expect(result).toBe(false);
			});
		});
	});

	describe('logout()', () => {
		it('should call auth.signout', () => {
			spyOn(classUnderTest.auth, 'signOut');
			classUnderTest.logout();
			expect(classUnderTest.auth.signOut).toBeCalled();
		});
	});

	describe('getUser()', () => {
		describe('user is not logged in', () => {
			it('should return null', () => {
				// execution
				const result = classUnderTest.getUser();
				expect(result).toBeNull();
			});
		});
	});

	describe('login(string, string): Promise', () => {
		describe('without email and password', () => {
			it('should have error "Your email is not vaild."', done => {
				classUnderTest.login('', '').then(() => {
					expect(classUnderTest.getError()).toBe('Your email is not vaild.');
					done();
				});
			});
	  	});
		describe('with email and without password', () => {
			it('should have error "Invaild Password."', done => {
				classUnderTest.login('test@test.de', '').then(() => {
					expect(classUnderTest.getError()).toBe('Invaild Password.');
					done();
				});
			});
	  	});
	});
	
	describe('createUser(): void', () => {
		describe('without email and password', () => {
			it('should have error "Your email is not vaild."', done => {
				classUnderTest.createUser('', '').then(() => {
					expect(classUnderTest.getError()).toBe('Your email is not vaild.');
					done();
				});
			});
		});
		describe('with email and without password', () => {
			it('should have error "Password is not long enough or not complex enough."', done => {
				classUnderTest.createUser('test@test.de', '').then(() => {
					expect(classUnderTest.getError()).toBe('Password is not long enough or not complex enough.');
					done();
				});
			});
		});
	});
});