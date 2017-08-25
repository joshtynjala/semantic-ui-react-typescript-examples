import * as React from "react";
import { Segment, Checkbox, CheckboxProps, Button, Input, InputOnChangeData } from "semantic-ui-react";

export interface TodoItemData
{
	text: string;
	completed: boolean;
}

interface TodoItemProps
{
	item: TodoItemData;
	onDelete: (item: TodoItemData) => void;
	onToggle: (item: TodoItemData) => void;
	onEdit: (newText: string, item: TodoItemData) => void;
}

interface TodoItemState
{
	hovering: boolean;
	editing: boolean;
	newText?: string;
}

export default class TodoItem extends React.Component<TodoItemProps, TodoItemState>
{
	constructor(props?: TodoItemProps, context?: any)
	{
		super(props, context);
		this.state = {
			hovering: false,
			editing: false
		};
	}

	private _input:Input;

	render()
	{
		return (
			<Segment
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center"
				}}
				attached
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}>
				<Checkbox
					style={{
						marginRight: "1em",
						visibility: this.state.editing ? "hidden" : "visible"
					}}
					checked={this.props.item.completed}
					onChange={this.item_onChange}/>
				<span
					style={{
						flexGrow: 1,
						display: this.state.editing ? "none" : "block"
					}}
					onDoubleClick={this.text_onDoubleClick}>
					{this.props.item.text}
				</span>
				<Input
					ref={(input: Input) => this._input = input}
					style={{
						flexGrow: 1,
						display: this.state.editing ? "block" : "none"
					}}
					value={this.state.newText}
					onChange={this.input_onChange}
					onBlur={this.input_onBlur}
					onKeyDown={this.input_onKeyDown}/>
				<Button
					icon="x"
					circular
					style={{
						marginLeft: "1em",
						visibility: this.state.hovering ? "visible" : "hidden",
						display: this.state.editing ? "none" : "block"
					}}
					onClick={this.itemClearButton_onClick}/>
			</Segment>
		);
	}

	componentDidUpdate(prevProps: TodoItemProps, prevState: TodoItemState)
	{
		if(!prevState.editing && this.state.editing)
		{
			this._input.focus();
			this._input["inputRef"].setSelectionRange(0, this._input.props.value.length);
		}
	}

	private commitEdit()
	{
		let newText = this.state.newText as string;
		if(newText.length === 0)
		{
			newText = this.props.item.text;
		}
		this.props.onEdit(newText, this.props.item);
		this.setState({newText: newText, editing: false});
	}

	private onMouseEnter = () =>
	{
		this.setState({hovering: true});
	}
	
	private onMouseLeave = () =>
	{
		this.setState({hovering: false});
	}

	private text_onDoubleClick = () =>
	{
		this.setState({editing: true, newText: this.props.item.text});
	}
	
	private input_onChange = (event: React.UIEvent<HTMLInputElement>, data: InputOnChangeData) =>
	{
		this.setState({newText: data.value});
	}

	private input_onBlur = () =>
	{
		this.commitEdit();
	}
	
	private input_onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
	{
		if(event.key === "Enter")
		{
			this.commitEdit();
		}
	}

	private item_onChange = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) =>
	{
		this.props.onToggle(this.props.item);
	}

	private itemClearButton_onClick = () =>
	{
		this.props.onDelete(this.props.item);
	}
}