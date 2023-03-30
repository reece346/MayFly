export default class User {
	constructor(displayName, userID, profilePicture, phoneNumber, interests, friendIDs) {
		this.displayName = displayName;
		this.userID = userID;
		if (profilePicture)
			this.profilePicture = profilePicture;
		else
			this.profilepicture = "default";
		this.phoneNumber = phoneNumber;
		this.interests = ["None"];
		if (interests && Array.isArray(interests) && interests.length !== 0) // Check if it exists & valid
			this.interests = interests;
		if (friendIDs && Array.isArray(friendIDs))
			this.friendIDs = friendIDs;
		else
			this.friendIDs = ["None"];
	}
}
