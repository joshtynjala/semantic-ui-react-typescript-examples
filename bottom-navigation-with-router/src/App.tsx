import * as React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import NewsfeedView from "./NewsfeedView";
import ProfileView from "./ProfileView";
import SettingsView from "./SettingsView";

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
				{ /* this is the currently selected view */ }
				<div
					style={{
						flexGrow: 1,
						overflowX: "hidden",
						overflowY: "auto",
					}}>
					<Switch>
						<Route path="/newsfeed" component={NewsfeedView}/>
						<Route path="/profile" component={ProfileView}/>
						<Route path="/settings" component={SettingsView}/>
						<Redirect from="/" to="/newsfeed/"/>
					</Switch>
				</div>
				{ /* this is the navigation fixed to the bottom */ }
				<Menu
					icon="labeled"
					borderless
					widths={3}
					style={{
						flexShrink: 0, //don't allow flexbox to shrink it
						borderRadius: 0, //clear semantic-ui style
						margin: 0 //clear semantic-ui style
					}}>
					<Menu.Item as={NavLink} to="/newsfeed/">
						<Icon name="newspaper"/>
						Newsfeed
					</Menu.Item>
					<Menu.Item as={NavLink} to="/profile/">
						<Icon name="user"/>
						Profile
					</Menu.Item>
					<Menu.Item as={NavLink} to="/settings/">
						<Icon name="setting"/>
						Settings
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}
