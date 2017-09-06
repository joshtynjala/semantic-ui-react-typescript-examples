import * as React from "react";
import { Menu } from "semantic-ui-react";

export default class ProfileView extends React.Component
{
	render()
	{
		return (
			<div
			style={{
					display: "flex",
					flexDirection: "column",
					height: "100%"
				}}>
				{ /* this header is fixed to the top */ }
				<Menu
					borderless
					style={{
						flexShrink: 0, //don't allow flexbox to shrink it
						borderRadius: 0, //clear semantic-ui style
						margin: 0 //clear semantic-ui style
					}}>
					<Menu.Item
						header>
						Profile
					</Menu.Item>
				</Menu>
				{ /* this section fills the rest of the page */ }
				<div
					style={{
						flexGrow: 1,
						overflowX: "hidden",
						overflowY: "auto",
					}}>
					This is the <strong>Profile</strong> view.
				</div>
			</div>	
		);
	}
}