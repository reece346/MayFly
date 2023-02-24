import User from '../user.js';
import Message from '../message.js';
import {getUserByID, updateUser, getUserByPhoneNumber, createUser, sendMessage, getMessageByID, getMessagesByUser} from '../firebaseConfig.js';

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
	it("Should recieve chat messages from the database", async () => {
		let message = await getMessageByID('testmsg2', 'test2');
		expect(message.contents).toBe("Testy test test!");
	});
	it("Should filter chat messages by authorID", async () => {
		let messages = await getMessagesByUser('testuser', 'test2');
		expect(messages[0].contents).toBe("Testy test test!");
	});
	it("Should send a chat message to the database", async () => {
		const newMessage = new Message(0, 'testuser', 1677224028, "This is a test!", {});
		await sendMessage(newMessage, 'test2');
		var containsMessage = false;
		let messages = await getMessagesByUser('testuser', 'test2');
		messages.forEach(msg => {
			if (msg.contents == "This is a test!")
				containsMessage = true;
		});
		expect(containsMessage).toBe(true);
	});
});

afterAll(async () => {
	// Change Brad Thompson back to Brad Thompson
	await updateUser(INITUSER);
});
