export default class Chat {
	constructor(chatID, isActive, memberID, expireTime, messagesID) {
		this.chatID = chatID;
		this.isActive = isActive;
		this.memberID = memberID;
		this.expireTime = expireTime;
		this.messagesID = messagesID;
	}
}
