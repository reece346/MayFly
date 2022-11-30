export default class User {
	constructor(displayName, userID, profilePicture, phoneNumber, interests, friendIDs) {
		this.displayName = displayName;
		this.userID = userID;
		this.profilePicture = profilePicture;
		this.phoneNumber = phoneNumber;
		this.interests = interests;
		this.friendIDs = friendIDs;
	}
}
