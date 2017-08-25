import * as React from "react";
import { Card, Container, Input, Checkbox, InputOnChangeData, Menu, Button } from "semantic-ui-react";
import TodoItem, { TodoItemData } from "./TodoItem";

interface AppState
{
	items: TodoItemData[];
	pendingText: string;
	error?: boolean;
}

export default class App extends React.Component<object, AppState>
{
	constructor()
	{
		super();

		this.state =
		{
			pendingText: "",
			items: []
		};
	}

	private _input: Input;

	render()
	{
		let itemCount = null;
		if(this.state.items.length === 1)
		{
			itemCount = <span>1 item</span>
		}
		else
		{
			itemCount = <span>{this.state.items.length} items</span>
		}

		let items = null;
		let clearButton = null;
		let allCompleted = false;
		if(this.state.items.length > 0)
		{
			allCompleted = this.state.items.every((item: TodoItemData) =>
			{
				return item.completed;
			});
			items = this.state.items.map((item: TodoItemData, index: number) =>
			{
				return (
					<TodoItem
						item={item}
						key={"todo-item" + index}
						onToggle={this.item_onToggle}
						onDelete={this.item_onDelete}
						onEdit={this.item_onEdit}/>
				);
			});

			clearButton = (
				<Menu.Item>
					<Button
						onClick={this.clearButton_onClick}>
						Clear Completed
					</Button>
				</Menu.Item>
			);
		}

		return (
			<Container
				style={{
					paddingTop: "1em"
				}}>
				<Card
					centered>
					<Card.Content
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center"
						}}>
						<Checkbox
							checked={allCompleted}
							onChange={this.allCheck_onChange}/>
						<Input
							ref={(input: Input) => this._input = input}
							style={{
								marginLeft: "1em",
								flexGrow: 1
							}}
							placeholder="What needs to be done?"
							value={this.state.pendingText}
							error={this.state.error}
							onChange={this.input_onChange}
							onKeyDown={this.input_onKeyDown}/>
					</Card.Content>
					{items}
					<Menu
						borderless
						attached="bottom">
						<Menu.Item>
							{itemCount}
						</Menu.Item>
						<Menu.Menu
							position="right">
							{clearButton}
						</Menu.Menu>
					</Menu>
				</Card>
			</Container>
		);
	}

	private addPendingTodo()
	{
		if(this.state.pendingText.length === 0)
		{
			this.setState({error: true});
			return;
		}
		let items = this.state.items.slice();
		items.push({text: this.state.pendingText, completed: false});
		this.setState({items: items, pendingText: ""});
	}

	private item_onToggle = (item: TodoItemData) =>
	{
		item.completed = !item.completed;
		this.setState({items: this.state.items});
	}
	
	private item_onDelete = (item: TodoItemData) =>
	{
		let items = this.state.items.slice();
		let index = items.indexOf(item);
		items.splice(index, 1);
		this.setState({items: items});
	}
	
	private item_onEdit = (newText: string, item: TodoItemData) =>
	{
		let newItem = {text: newText, completed: item.completed};

		let items = this.state.items.slice();
		let index = items.indexOf(item);
		items[index] = newItem;
		this.setState({items: items});
	}

	private allCheck_onChange = () =>
	{
		let someIncomplete = this.state.items.some((item: TodoItemData) =>
		{
			return !item.completed;
		})
		let items = this.state.items.slice();
		items.forEach((item: TodoItemData) =>
		{
			item.completed = someIncomplete;
		});
		this.setState({items: items});
	}

	private clearButton_onClick = () =>
	{
		let items = this.state.items.filter((item: TodoItemData) =>
		{
			return !item.completed;
		})
		this.setState({items: items});
	}
	
	private input_onChange = (event: React.UIEvent<HTMLInputElement>, data: InputOnChangeData) =>
	{
		if(data.value.length > 0)
		{
			this.setState({error: false});
		}
		this.setState({pendingText: data.value});
	}

	private input_onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
	{
		if(event.key === "Enter")
		{
			this.addPendingTodo();
		}
	}
}