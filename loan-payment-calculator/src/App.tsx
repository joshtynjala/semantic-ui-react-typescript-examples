import * as React from 'react';
import { Container, Header, Form, Menu, Statistic } from 'semantic-ui-react';
import NumericStepper from "./NumericStepper";

interface LoanPaymentCalculatorState
{
	principal: number;
	interest: number;
	numYears: number;
	payment: number;
}

class App extends React.Component<object, LoanPaymentCalculatorState>
{
	constructor()
	{
		super();

		let initialState = 
		{
			principal: 250000,
			interest: 6.0,
			numYears: 20,
			payment: 0
		};
		initialState.payment = this.calculatePayment(initialState.principal, initialState.interest, initialState.numYears);
		this.state = initialState;
	}

	render()
	{
		return (
			<Container fluid>
				<Menu fixed="top" borderless inverted color="blue">
					<Container text>
						<Menu.Item>
							<Header inverted>
								Loan Payment Calculator
							</Header>
						</Menu.Item>
					</Container>
				</Menu>
				<Container text
					style={{
						paddingTop: "5em"
					}}>
					<Form>
						<Form.Field>
      						<label>Principal</label>
							<NumericStepper minimum={10000} maximum={10000000} stepSize={1000} value={this.state.principal}
								onChange={this.principalStepper_onChange}/>
						</Form.Field>
						<Form.Field>
      						<label>Interest</label>
							<NumericStepper minimum={1} maximum={50} stepSize={0.1} value={this.state.interest}
								onChange={this.interestStepper_onChange}/>
						</Form.Field>
						<Form.Field>
							<label>Years</label>
							<NumericStepper minimum={5} maximum={50} stepSize={5} value={this.state.numYears}
								onChange={this.yearsStepper_onChange}/>
						</Form.Field>
					</Form>
					<Container
						style={{
							marginTop: "2em"
						}}
						textAlign="center">
						<Statistic color="blue">
							<Statistic.Value>{this.state.payment.toFixed(2)}</Statistic.Value>
							<Statistic.Label>per month</Statistic.Label>
						</Statistic>
					</Container>
				</Container>
			</Container>
		);
	}

	private calculatePayment(principal: number, interest: number, numYears: number): number
	{		
		let effectiveInterestRate = (interest / 100) / 12;
		let totalPaymentCount = numYears * 12;
		return principal * (effectiveInterestRate / (1 - Math.pow(1 + effectiveInterestRate, -totalPaymentCount)))
	}

	private principalStepper_onChange = (value: number) =>
	{
		let payment = this.calculatePayment(value, this.state.interest, this.state.numYears);
		this.setState({principal: value, payment: payment});
	}
	
	private interestStepper_onChange = (value: number) =>
	{
		let payment = this.calculatePayment(this.state.principal, value, this.state.numYears);
		this.setState({interest: value, payment: payment});
	}
	
	private yearsStepper_onChange = (value: number) =>
	{
		let payment = this.calculatePayment(this.state.principal, this.state.interest, value);
		this.setState({numYears: value, payment: payment});
	}
}

export default App;
