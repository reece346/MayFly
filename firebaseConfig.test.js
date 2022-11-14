import User from './user.js';
const getUserByID = require('./firebaseConfig.js');

test('check to see if Firebase database is read correctly', () => {
	const user = getUserByID('testid');
	console.log(user);
	expect(user.displayName).toBe("Chad Thompson");
});
