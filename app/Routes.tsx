import * as React from 'react';
import { Switch, Route } from 'react-router';
import { Redirect } from 'react-router-dom';
const routes = require('./constants/routes.json');
import App from './containers/App';
import HomePage from './containers/HomePage';
import SettingsPage from './containers/SettingsPage';
import DataStore from './classes/DataStore';

export default class Routes extends React.Component {
    private dataStore: DataStore = new DataStore();

    constructor(props) {
        super(props);
        // this.dataStore = new DataStore();
    }
    render() {
        return (
            <App>
                <Switch>
                    <Route
                        path={routes.SETTINGS}
                        component={() => (
                            <SettingsPage dataStore={this.dataStore} />
                        )}
                    />
                    <Route
                        path={routes.HOME}
                        component={() => (
                            <HomePage dataStore={this.dataStore} />
                        )}
                    />
                    <Redirect from="/" to="/home/media" />
                </Switch>
            </App>
        );
    }
}
