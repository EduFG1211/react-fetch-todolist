//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/appstyles.scss";

//import your own components
import { App3 } from "./component/App3.js";

//render your react application
ReactDOM.render(<App3 />, document.querySelector("#app"));
