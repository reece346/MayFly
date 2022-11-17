import User from './user.js';
const getUserByID = require('./firebaseConfig.js');

test('the data should return "Chad Thompson"', async done => {
	let user = await getUserByID('testuser');
	console.log(JSON.stringify(user));
	expect(user.displayName).toBe("Chad Thompson");
	done();
	/*return await getUserByID('testuser').then(data => {
		expect(data.displayName).toBe("Chad Thompson");
		done();
	});
	*/
});

/*test('check to see if Firebase database is read correctly', async () => {
	const delay = ms => new Promise(res => setTimeout(res, ms));
	var user2 = new User();
	//delay(5000);
	//console.log("waited");
	//Object.assign(user, user2);
	//console.log("After: " + user.displayName);
	//expect(user.displayName).toBe("Chad Thompson");
});*/
