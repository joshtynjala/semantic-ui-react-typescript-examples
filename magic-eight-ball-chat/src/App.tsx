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

	private _container: HTMLDivElement;

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
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100%"
				}}>
				<Menu
					inverted
					color="green"
					borderless
					style={{
						flexShrink: 0, //don't allow to shrink
						borderRadius: 0, //clear semantic-ui style
						margin: 0 //clear semantic-ui style
					}}>
					<Container text>
						<Menu.Item>
							<Menu.Header as="h1">
								Magic 8 Ball
							</Menu.Header>
						</Menu.Item>
					</Container>
				</Menu>
				<div
					ref={(container: HTMLDivElement) => this._container = container}
					style={{
						flexGrow: 1,
						overflowX: "hidden",
						overflowY: "auto",
						paddingTop: "1.5em",
						paddingBottom: "1.5em"
					}}>
					<Container
						text>
						<List>
							{items}
						</List>
					</Container>
				</div>
				<Menu
					inverted
					color="green"
					borderless
					style={{
						flexShrink: 0, //don't allow to shrink
						borderRadius: 0, //clear semantic-ui style
						margin: 0 //clear semantic-ui style
					}}>
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
			</div>
		);
	}

	componentDidUpdate(prevProps: any, prevState: AppState)
	{
		if(prevState.items.length !== this.state.items.length)
		{
			//scroll to end when new messages appear
			this._container.scrollTop = this._container.scrollHeight - this._container.clientHeight;
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
		this.setState({questionText: "", items: items});
		//reply after a short delay because that feels
		//more natural than an instant reply
		setTimeout(this.reply, 250);
	}

	private reply = () =>
	{
		let items = this.state.items.slice();
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