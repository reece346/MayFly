export default class Message {
	constructor(messageID, authorID, timestamp, contents, images) {
		this.messageID = messageID;
		this.authorID = authorID;
		this.timestamp = timestamp;
		this.contents = contents;
		this.images = images;
	}
}
