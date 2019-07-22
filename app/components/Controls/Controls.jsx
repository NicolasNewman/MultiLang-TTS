import * as React from 'react';
import { Switch, Route } from 'react-router';
import FileControl from './FileControl/FileControl';
import MediaControl from './MediaControl/MediaControl';

const routes = require('../../constants/routes.json');

const Controls = props => {
    return (
        <Switch>
            <Route
                path={routes.HOME_MEDIA}
                component={() => (
                    <MediaControl
                        targetFolder={props.targetFolder}
                        targetFile={props.targetFile}
                    />
                )}
            />
            <Route
                path={routes.HOME_FILE}
                component={() => (
                    <FileControl
                        targetFolder={props.targetFolder}
                        text={props.text}
                        makeRequest={props.makeRequest}
                        getVoices={props.getVoices}
                    />
                )}
            />
        </Switch>
    );
};

export default Controls;
