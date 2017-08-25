import * as React from "react";
import { Button, Input, InputOnChangeData } from "semantic-ui-react";

interface NumericStepperProps
{
	value?: number;
	stepSize?: number;
	minimum?: number;
	maximum?: number;
	onChange?: (newValue: number) => void;
}

interface NumericStepperState
{
	value: number;
	editedValue?: string;
}

export default class NumericStepper extends React.Component<NumericStepperProps, NumericStepperState>
{
	constructor(props: NumericStepperProps, context?: any)
	{
		super(props, context);
		if(typeof props.stepSize === "number")
		{
			this._stepSize = props.stepSize;
		}
		if(typeof props.minimum === "number")
		{
			this._minimum = props.minimum;
		}
		if(typeof props.maximum === "number")
		{
			this._maximum = props.maximum;
		}
		if(typeof props.value === "number")
		{
			this.state = {value: props.value};
		}
		else
		{
			this.state = {value: this._minimum};
		}
	}

	private _stepSize: number = 1;
	private _minimum: number = 0;
	private _maximum: number = 10;

	componentWillReceiveProps(props: NumericStepperProps)
	{
		if(typeof props.stepSize === "number")
		{
			this._stepSize = props.stepSize;
		}
		if(typeof props.minimum === "number")
		{
			this._minimum = props.minimum;
		}
		if(typeof props.maximum === "number")
		{
			this._maximum = props.maximum;
		}
		if(typeof props.value === "number")
		{
			this.setState({value: props.value});
		}
	}

	render()
	{
		let text = this.state.editedValue;
		if(typeof text === "undefined")
		{
			text = this.state.value.toString();
		}
		return <Input
				value={text}
				onChange={this.input_onChange}
				input=
				{
					<input
						onBlur={this.input_onBlur}
						onKeyDown={this.input_onKeyDown}/>
				}
				label=
				{
					<Button
						icon="minus"
						tabIndex="-1"
						onClick={this.minusButton_onClick}/>
				}
				action=
				{
					<Button
						icon="plus"
						tabIndex="-1"
						onClick={this.plusButton_onClick}/>
				}
			/>
	}

	private commit()
	{
		if(typeof this.state.editedValue === "undefined")
		{
			return;
		}
		let oldValue = this.state.value;
		let newValue = this.roundToNearest(parseFloat(this.state.editedValue), this._stepSize);
		if(newValue < this._minimum)
		{
			newValue = this._minimum;
		}
		if(newValue > this._maximum)
		{
			newValue = this._maximum;
		}
		this.setState({value: newValue, editedValue: undefined});
		if(oldValue !== newValue && this.props.onChange)
		{
			this.props.onChange(newValue);
		}
	}

	private decrement()
	{
		let oldValue = this.state.value;
		let newValue = this.roundToNearest(oldValue - this._stepSize, this._stepSize);
		if(newValue < this._minimum)
		{
			newValue = this._minimum;
		}
		this.setState({value: newValue});
		if(oldValue !== newValue && this.props.onChange)
		{
			this.props.onChange(newValue);
		}
	}

	private increment()
	{
		let oldValue = this.state.value;
		let newValue = this.roundToNearest(oldValue + this._stepSize, this._stepSize);
		if(newValue > this._maximum)
		{
			newValue = this._maximum;
		}
		this.setState({value: newValue});
		if(oldValue !== newValue && this.props.onChange)
		{
			this.props.onChange(newValue);
		}
	}
	
	private roundToPrecision(number: number, precision: number = 0): number
	{
		let decimalPlaces = Math.pow(10, precision);
		return Math.round(decimalPlaces * number) / decimalPlaces;
	}

	private roundToNearest(number: number, nearest: number = 1): number
	{
		if(nearest === 0)
		{
			return number;
		}
		let roundedNumber = Math.round(this.roundToPrecision(number / nearest, 10)) * nearest;
		return this.roundToPrecision(roundedNumber, 10);
	}
	
	private input_onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
	{
		if(event.key === "ArrowUp")
		{
			event.preventDefault();
			this.increment();
		}
		else if(event.key === "ArrowDown")
		{
			event.preventDefault();
			this.decrement();
		}
	}
	
	private input_onChange = (event: React.UIEvent<HTMLInputElement>, data: InputOnChangeData) =>
	{
		this.setState({editedValue: data.value});
	}

	private input_onBlur = () =>
	{
		this.commit();
	}

	private minusButton_onClick = () =>
	{
		this.decrement();
	}
	
	private plusButton_onClick = () =>
	{
		this.increment();
	}
}