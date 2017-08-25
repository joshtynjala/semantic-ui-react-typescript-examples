import * as React from "react";
import { List, Image } from "semantic-ui-react";
import { ChatMessage, USER_ME } from "./ChatData";

interface ChatMessageItemProps
{
	message: ChatMessage;
}

export default class App extends React.Component<ChatMessageItemProps, object>
{
	render()
	{
		let isMe = this.props.message.user === USER_ME;
		return (
			<List.Item
				style={{
					paddingLeft: isMe ? "50%" : undefined,
					paddingRight: isMe ? undefined : "50%",
					display: "flex",
					alignItems: "top"
				}}>
				<Image
					avatar
					src={this.props.message.user.avatarURL}
					style={{
						order: isMe ? 2 : undefined,
					}}/>
				<List.Content
					style={{
						flexGrow: 1
					}}>
					{this.props.message.text}
				</List.Content>
			</List.Item>
		);
	}
}