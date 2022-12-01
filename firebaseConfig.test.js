import User from './user.js';
import {getUserByID, updateUser, getUserByPhoneNumber, createUser} from './firebaseConfig.js';
//const getUserByID = require('./firebaseConfig.js');


test('the test user should be able to be obtained by ID', async done => {
	console.log("Grabbing 'testuser' from the database...");
	let user = await getUserByID('testuser');
	console.log(JSON.stringify(user));
	expect(user.displayName).toBe("Chad Thompson");
	done();
});

test('the test user should be able to be obtained by phone number', async done => {
	console.log("Grabbing '+16505553434' from the database...");
	let user = await getUserByPhoneNumber("+16505553434");
	expect(user.displayName).toBe("Chad Thompson");
	done();
});

test("the test user should be able to be edited", async done => {
	let user = await getUserByID('testuser');
	console.log("Obtained user: " + user.displayName);
	user.displayName = "Brad Thompson";
	console.log("Updating username");
	await updateUser(user);
	console.log("Done, grabbing user again");
	let updatedUser = await getUserByID('testuser');
	expect(updatedUser.displayName).toBe("Brad Thompson");
	done();
});

test("a user should be able to be added to the database", async done => {
	const newUser = new User("Testy McTestFace", 0, "none", "+1234567890", {0: "football"}, {});
	await createUser(newUser); // Create the user in the database
	let user = await getUserByPhoneNumber("+1234567890");
	expect(user.displayName).toBe("Testy McTestFace");
	done();
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
