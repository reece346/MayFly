import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

// TODO Need some way of getting the user's phone number. Making do with an example one
const phoneNumber = "+16505553434" // Test number, has been added to Firebase
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

// Invisible CAPTCHA for user
window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
	'size': 'invisible',
	'callback': (response) => {
		// CAPTCHA solved, TODO sign in
	}
}, auth);

// Get user's phone number and send an SMS
signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
	.then((confirmationResult) => {
		// TODO SMS sent, use confirmationResult.confirm() to auth
		window.confirmationResult = confirmationResult;
	}).catch((error) => {
		// TODO SMS not sent due to CAPTCHA error
	});

// Get code from user, sign in
confirmationResult.confirm(code).then((result) => {
	// TODO Successful sign in
	const user = result.user;
}).catch((error) => {
	// TODO Unsuccessful, user potentially entered incorrect code
});
