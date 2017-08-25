export interface ChatUser
{
	name: string;
	avatarURL: string;
}

export interface ChatMessage
{
	text: string;
	user: ChatUser;
}

export const USER_8BALL =
{
	name: "Magic 8 Ball",
	avatarURL: "img/8-icon.png"
};

export const USER_ME =
{
	name: "Me",
	avatarURL: "img/user-icon.png"
};