export default class User {
	constructor(displayName, userID, profilePicture, phoneNumber, interests, friendIDs) {
		this.displayName = displayName;
		this.userID = userID;
		if (profilePicture)
			this.profilePicture = profilePicture;
		else
			this.profilepicture = "default";
		this.phoneNumber = phoneNumber;
		if (interests && Array.isArray(interests)) // Check if it exists & valid
			this.interests = interests;
		else
			this.interests = ["None"];
		if (friendIDs && Array.isArray(friendIDs))
			this.friendIDs = friendIDs;
		else
			this.friendIDs = ["None"];
	}
}
