import * as React from 'react';
import { Switch, Route } from 'react-router';
import FileControl from './FileControl/FileControl';
import MediaControl from './MediaControl/MediaControl';

const routes = require('../../constants/routes.json');

const Controls = () => {
    return (
        <Switch>
            <Route path={routes.HOME_MEDIA} component={MediaControl} />
            <Route path={routes.HOME_FILE} component={FileControl} />
        </Switch>
    );
};

export default Controls;
