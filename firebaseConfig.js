import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, get, push, remove } from 'firebase/database';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import User from './user.js';
import Chat from './chat.js';
import Message from './message.js';

// TODO Need some way of getting the user's phone number. Making do with an example one
//const phoneNumber = "+16505553434" // Test number, has been added to Firebase
// TODO Also need some form of way to get the code from the user.
const code = "123456"; // Test code tied to above phone number

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyBc4K_VsAO60P-Gmqg8x9B9e2oJ4R-ECdQ',
	authDomain: 'odyssey-490.firebaseapp.com',
	databaseURL: 'https://odyssey-490-default-rtdb.firebaseio.com/',
	projectId: 'odyssey-490',
	storageBucket: 'odyssey-490.appspot.com',
	messagingSenderId: '747613227593',
	appId: '1:747613227593:web:5ea3e82de1cdc0470b8d98'
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Authentication TODO Throwing errors, disabled for now, fix in the future

// Invisible CAPTCHA for user
/*window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
	'size': 'invisible',
	'callback': (response) => {
		// CAPTCHA solved, TODO sign in
	}
}, auth);
*/
// Get user's phone number and send an SMS
/*signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
	.then((confirmationResult) => {
		// TODO SMS sent, use confirmationResult.confirm() to auth
		window.confirmationResult = confirmationResult;
	}).catch((error) => {
		// TODO SMS not sent due to CAPTCHA error
	});
*/
// Get code from user, sign in
/*confirmationResult.confirm(code).then((result) => {
	// TODO Successful sign in
	const user = result.user;
}).catch((error) => {
	// TODO Unsuccessful, user potentially entered incorrect code
});
*/

// Database
// https://firebase.google.com/docs/database/web/read-and-write#read_data_once
export async function getUserByID(userID) {
	const dbRef = ref(database);
	return get(child(dbRef, 'users/' + userID)).then((snapshot) => {
		if(snapshot.exists()) {
			const val = snapshot.val();
			const user = new User(val.displayName, userID, val.profilePicture, val.username, val.phoneNumber, val.currentChatID, val.interests, val.friendIDs);
			return user;
			console.log("This shouldn't print!");
		} else {
			console.log("No user found");
		}
	}).catch((error) => {
		console.error(error);
	});
}

export async function getUserByUsername(username) {
	const dbRef = ref(database);
	return get(child(dbRef, 'users/')).then((snapshot) => {
		let user, found = false;
		snapshot.forEach((data) => {
			if (data.val().username == username) {
				const dataVal = data.val();
				user = new User(dataVal.displayName, data.key, dataVal.profilePicture, username, dataVal.phoneNumber, dataVal.currentChatID, dataVal.interests, dataVal.friendIDs);
				found = true;
			}
		})
		if(found)
			return user;
		return 0;
	}).catch((error) => {
		//error
	});
}

export async function getUserByPhoneNumber(phoneNumber) {
	const dbRef = ref(database);
	return get(child(dbRef, 'users/')).then((snapshot) => {
		let user, found = false;
		snapshot.forEach((data) => {
			if (data.val().phoneNumber == phoneNumber) {
				const dataVal = data.val();
				user = new User(dataVal.displayName, data.key, dataVal.profilePicture, dataVal.username, phoneNumber, dataVal.currentChatID, dataVal.interests, dataVal.friendIDs);
				found = true;
			}
		})
		if(found)
			return user;
		return 0;
	}).catch((error) => {
		//error
	});
}

export async function updateUser(user) {
	const userID = user.userID;
	delete user.userID; // Shift userID to be the key
	const userRef = ref(database, 'users/' + userID);
	return set(userRef, user).catch((error) => {
		console.error(error);
	});
}

export async function createUser(user) {
	const dbRef = ref(database);
	delete user.userID;
	push(child(dbRef, 'users'), user).catch((error) => { // Generate new userID
		console.error(error);
	}); 
	return;
}

export async function deleteUser(userID) {
	const userRef = ref(database, 'users/' + userID);
	return remove(userRef).catch((error) => {
		console.error(error);
	});
}

export async function getMessageByID(messageID, chatID) {
	// This is mostly just for testing purposes
	const msgRef = ref(database, 'messages/' + chatID + '/' + messageID);
	return get(msgRef).then(snapshot => {
		if (snapshot.exists()) {
			const val = snapshot.val();
			const message = new Message(messageID, val.authorID, val.timestamp, val.contents, val.images);
			return message;
		} else {
			console.log("No message found");
		}
	}).catch(error => {
		console.error(error);
	});
}

export async function getMessagesByUser(userID, chatID) {
	var messages = [];
	const msgRef = ref(database, 'messages/' + chatID);
	return get(msgRef).then(snapshot => {
		if (snapshot.exists()) {
			snapshot.forEach(data => {
				if (data.val().authorID == userID) {
					const val = data.val();
					const newMsg = new Message(data.key, val.authorID, val.timestamp, val.contents, val.images);
					messages.push(newMsg);
				}
			});
		} else {
			console.log("No messages found");
		}
		return messages;
	});
}

export async function sendMessage(message, chatID) {
	const msgRef = ref(database, 'messages/' + chatID);
	delete message.messageID;
	push(msgRef, message).catch((error) => {
		console.error(error);
	});
	return;
}

export async function createMessageList(messageList) {
	const dbRef = ref(database);
	delete messageList.messageListID;
	push(child(dbRef, 'messages'), messageList).catch((error) => { // Generate new messageListID
		console.error(error);
	}); 
	return;
}

export async function getChatByChatID(chatID) {
	const dbRef = ref(database);
	return get(child(dbRef, 'chats/')).then((snapshot) => {
		let chat, found = false;
		snapshot.forEach((data) => {
			if (data.val().chatID == chatID) {
				const dataVal = data.val();
				chat = new Chat(data.key, dataVal.messageList, dataVal.timeCreated);
				console.log("Found a chat with this ID");
				found = true;
			}
		})
		if(found)
			return chat;
		return 0;
	}).catch((error) => {
		console.error(error);
	});
}

export async function removeUser(userID) {
	const userRef = ref(database, 'users/' + userID);
	remove(userRef).catch((error) => {
		console.error(error);
	});
	return;
}

export async function removeMessage(messageID, chatID) {
	const msgRef = ref(database, 'messages/' + chatID + '/' + messageID);
	remove(msgRef).catch((error) => {
		console.error(error);
	});
	return;
}

export async function getUsersInChat(chatID) {
	var users = [];
	const userRef = ref(database, 'users/');
	return get(userRef).then((snapshot) => {
		snapshot.forEach((data) => {
			console.log('data is: ', data)
			const val = data.val();
			console.log('val is: ', val)
			console.log('chatID is: ', chatID)
			//console.log('User ID:', data.key);
      		//console.log('Current chat ID:', val.currentChatID);
			if (val.currentChatID === chatID) {
				//console.log('Adding user to array:', data.key);
				users.push(data.key);
			}
		});
		console.log('Users in chat:', users);
		return users;
	});
}

module.exports.app = app;
