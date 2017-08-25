import * as React from "react";
import { Container, Menu, List, Input, Button, InputOnChangeData } from "semantic-ui-react";
import { ChatMessage, USER_ME, USER_8BALL } from "./ChatData";
import ChatMessageItem from "./ChatMessageItem";
import magic8 from "./magic8";

interface AppState
{
	items: ChatMessage[]
	questionText: string;
	error?: boolean;
}

export default class App extends React.Component<object, AppState>
{
	constructor()
	{
		super();
		this.state =
		{
			questionText: "",
			items: []
		};
	}

	render()
	{
		let items = this.state.items.map((message: ChatMessage, index: number) =>
		{
			return (
				<ChatMessageItem
					key={"msg" + index}
					message={message}/>
			);
		});
		return (
			<Container
				fluid>
				<Menu
					fixed="top"
					inverted
					color="green"
					borderless>
					<Container text>
						<Menu.Item>
							<Menu.Header as="h1">
								Magic 8 Ball
							</Menu.Header>
						</Menu.Item>
					</Container>
				</Menu>
				<Menu
					fixed="bottom"
					inverted
					color="green"
					borderless>
					<Container
						text
						style={{
							display: "flex",
							alignItems: "center",
							padding: "0.92857143em 1.14285714em"
						}}>
						<Input
							fluid
							placeholder="Ask a yes or no question..."
							value={this.state.questionText}
							error={this.state.error}
							style={{
								flexGrow: 1,
								marginRight: "0.5em"
							}}
							onChange={this.input_onChange}
							onKeyDown={this.input_onKeyDown}/>
						<Button
							onClick={this.button_onClick}>
							Send
						</Button>
					</Container>
				</Menu>
				<Container
					text
					style={{
						paddingTop: "6em",
						paddingBottom: "6em"
					}}>
					<List>
						{items}
					</List>
				</Container>
			</Container>
		);
	}

	componentDidUpdate(prevProps: any, prevState: AppState)
	{
		if(prevState.items.length !== this.state.items.length)
		{
			//scroll to end when new messages appear
			document.body.scrollTop = document.body.scrollHeight - document.body.clientHeight;
		}
	}

	private sendMessage()
	{
		if(this.state.questionText.length === 0)
		{
			this.setState({error: true});
			return;
		}
		let items = this.state.items.slice();
		items.push({text: this.state.questionText, user: USER_ME});
		items.push({text: magic8(), user: USER_8BALL});
		this.setState({questionText: "", items: items});
	}

	private button_onClick = () =>
	{
		this.sendMessage();
	}

	private input_onChange = (event: any, data: InputOnChangeData) =>
	{
		if(data.value.length > 0)
		{
			this.setState({error: false});
		}
		this.setState({questionText: data.value});
	}

	private input_onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
	{
		if(event.key === "Enter")
		{
			this.sendMessage();
		}
	}
}