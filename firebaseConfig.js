import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, get, push } from 'firebase/database';
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
			const user = new User(val.displayName, userID, val.profilePicture, val.phoneNumber, val.interests, val.friendIDs);
			return user;
		} else {
			console.log("No user found");
		}
	}).catch((error) => {
		console.error(error);
	});
}

export async function getUserByPhoneNumber(phoneNumber) {
	const dbRef = ref(database);
	return get(child(dbRef, 'users/')).then((snapshot) => {
		let user;
		snapshot.forEach((data) => {
			if (data.val().phoneNumber == phoneNumber) {
				const dataVal = data.val();
				user = new User(dataVal.displayName, 0, dataVal.profilePicture, dataVal.phoneNumber, dataVal.interests, dataVal.friendIDs);
			}
		})
		return user;
	}).catch((error) => {
		console.error(error);
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
