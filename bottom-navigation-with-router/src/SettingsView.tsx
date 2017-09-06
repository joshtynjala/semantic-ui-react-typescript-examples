import * as React from "react";
import { Menu } from "semantic-ui-react";

export default class SettingsView extends React.Component
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
						Settings
					</Menu.Item>
				</Menu>
				{ /* this section fills the rest of the page */ }
				<div
					style={{
						flexGrow: 1,
						overflowX: "hidden",
						overflowY: "auto",
					}}>
					This is the <strong>Settings</strong> view.
				</div>
			</div>	
		);
	}
}