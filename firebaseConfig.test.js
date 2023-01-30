import User from './user.js';
import {getUserByID, updateUser, getUserByPhoneNumber, createUser} from './firebaseConfig.js';

var INITUSER;

describe("Firebase Realtime Database Access", () => {
	it("Should obtain the test user by ID", async () => {
		//console.log("Grabbing 'testuser' from the database...");
		let user = await getUserByID('testuser');
		INITUSER = user;
		//console.log(JSON.stringify(user));
		expect(user.displayName).toBe("Chad Thompson");
	});
	it("Should recieve the test user by phone number", async () => {
		//console.log("Grabbing '+16505553434' from the database...");
		let user = await getUserByPhoneNumber("+16505553434");
		expect(user.displayName).toBe("Chad Thompson");
	});
	it("Should edit the test user's name", async () => {
		let user = await getUserByID('testuser');
		//console.log("Obtained user: " + user.displayName);
		user.displayName = "Brad Thompson";
		//console.log("Updating username");
		await updateUser(user);
		//console.log("Done, grabbing user again");
		let updatedUser = await getUserByID('testuser');
		expect(updatedUser.displayName).toBe("Brad Thompson");
	});
	it("Should add a new user to the database", async () => {
		const newUser = new User("Testy McTestFace II", 0, undefined, "+1234567890", undefined, undefined);
		await createUser(newUser); // Create the user in the database
		let user = await getUserByPhoneNumber("+1234567890");
		expect(user.displayName).toBe("Testy McTestFace II");
	});
});

afterAll(async () => {
	// Change Brad Thompson back to Brad Thompson
	await updateUser(INITUSER);
});
