import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

ReactDOM.render(
	//create-react-app exposes process.env.PUBLIC_URL to ensure that we use
	//the correct base URL both locally and in production
	<BrowserRouter
		basename={process.env.PUBLIC_URL}>
		<App />
	</BrowserRouter>,
	document.getElementById("root") as HTMLElement
);
registerServiceWorker();
