import * as React from "react";
import { Menu } from "semantic-ui-react";

export default class App extends React.Component
{
	render()
	{
		return (
			<div
				style={{
					//see some additional required styles in index.css
					display: "flex",
					flexDirection: "column",
					height: "100%"
				}}>
				{ /* the following section is fixed to the top */ }
				<Menu
					inverted
					color="green"
					borderless
					style={{
						flexShrink: 0, //don't allow flexbox to shrink it
						borderRadius: 0, //clear semantic-ui style
						margin: 0 //clear semantic-ui style
					}}>
					<Menu.Item as="h1"
						header>
						Fixed Header
					</Menu.Item>
				</Menu>
				{ /* the following section is in the middle, and it can scroll */ }
				<div
					style={{
						flexGrow: 1,
						overflowX: "hidden",
						overflowY: "auto",
					}}>
						<p style={{paddingBottom: "200%"}}>This container can scroll vertically. Give it a try!</p>
						<p>You made it to the bottom!</p>
				</div>
				{ /* the following section is fixed to the bottom */ }
				<Menu
					inverted
					color="green"
					borderless
					style={{
						flexShrink: 0, //don't allow flexbox to shrink it
						borderRadius: 0, //clear semantic-ui style
						margin: 0 //clear semantic-ui style
					}}>
					<Menu.Item
						header>
						Fixed Footer
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}