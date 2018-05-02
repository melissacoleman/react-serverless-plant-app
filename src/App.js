import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Plants from "./Plants";
// import Nav from "./Nav";

import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Plants />
                        {/* <Nav />
                        <Switch>
                            <Route exact path="/" component={Plants} />
                            <Route path="/AddPlant" component={AddPlant} />
                        </Switch> */}
                    </div>
                </Router>
            </div>
        );
    }
}

export default withAuthenticator(App);
