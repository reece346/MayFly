import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, get, push, remove } from 'firebase/database';
import { getAuth, signOut, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
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
const phoneProvider = new PhoneAuthProvider(auth);

// Authentication 

export async function sendCode2FA(phoneNumber, recaptcha) {
	try {
		const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, 
			recaptcha);
		window.verificationId = verificationId;
		console.log("Code sent!");
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
	//if (phoneNumber == "+18888888888") // Testing number, disable CAPTCHA
	//	auth.settings.appVerificationDisabledForTesting = true;
	//// New invisible CAPTCHA for user
	//window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
	//	'size': 'invisible',
	//	'callback': (response) => {
	//		// CAPTCHA solved, TODO sign in
	//	}
	//}, auth);
	//// Send an SMS to user's phone number
	//return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
	//	.then((confirmationResult) => {
	//		// SMS sent, use confirmationResult.confirm() to auth
	//		window.confirmationResult = confirmationResult;
	//		return true;
	//	}).catch((error) => {
	//		// TODO SMS not sent due to CAPTCHA error, return error
	//		console.error(error);
	//		return false;
	//	});

}

export async function confirm2FA(code) {
	try {
		const credential = PhoneAuthProvider.credential(verificationId, code);
		await signInWithCredential(auth, credential);
		console.log("Signed in");
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
	//// Get code from user, sign in
	//return window.confirmationResult.confirm(code).then((result) => {
	//	// Successful sign in, allow in application
	//	window.user = result.user;
	//	return true;
	//}).catch((error) => {
	//	// Unsuccessful, user potentially entered incorrect code
	//	console.error(error);
	//	return false;
	//});

}

export async function signOutCurrentUser() {
	signOut(auth).then(() => {
		console.log("Signed out");
		return true;
	}).catch((error) => {
		console.error(error);
		return false;
	});
}


// Database
// https://firebase.google.com/docs/database/web/read-and-write#read_data_once
export async function getUserByID(userID) {
	const dbRef = ref(database);
	return get(child(dbRef, 'users/' + userID)).then((snapshot) => {
		if(snapshot.exists()) {
			const val = snapshot.val();
			const user = new User(val.displayName, userID, val.profilePicture, val.username, val.phoneNumber, val.currentChatID, val.interests, val.friendIDs);
			return user;
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

export async function reportUser(username) {
	let reportedUser = await getUserByUsername(username)
	reportedUser.isReported = true
	await updateUser(reportedUser)
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
			const val = data.val();
			//console.log('User ID:', data.key);
      		//console.log('Current chat ID:', val.currentChatID);
			if (val.currentChatID === chatID) {
				//console.log('Adding user to array:', data.key);
				users.push(data.key);
			}
		});
		return users;
	});
}

module.exports.app = app;
