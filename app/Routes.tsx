import * as React from 'react';
import { Switch, Route } from 'react-router';
const routes = require('./constants/routes.json');
import App from './containers/App';
import HomePage from './containers/HomePage';
import SettingsPage from './containers/SettingsPage';

export default () => (
    <App>
        <Switch>
            <Route path={routes.SETTINGS} component={SettingsPage} />
            <Route path={routes.HOME} component={HomePage} />
        </Switch>
    </App>
);
