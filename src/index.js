import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from "react-apollo";

import appSyncConfig from "./AppSync";

// Set app sync client to take aws config
const client = new AWSAppSyncClient({
    url: appSyncConfig.graphqlEndpoint,
    region: appSyncConfig.region,
    auth: {
        type: appSyncConfig.authenticationType,
        apiKey: appSyncConfig.apiKey
    }
    // complexObjectsCredentials: () => Auth.currentCredentials()
});

// Inject aws appsync client into Apollo
const WithProvider = () => (
    <ApolloProvider client={client}>
        <Rehydrated
            render={({ rehydrated }) =>
                rehydrated ? <App /> : <strong>Plants loading &lt;3</strong>
            }
        />
    </ApolloProvider>
);

WebFont.load({
    custom: {
        families: ["Greycliff"]
    }
});

ReactDOM.render(<WithProvider />, document.getElementById("root"));
