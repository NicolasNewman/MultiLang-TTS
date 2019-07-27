import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import routes from './constants/routes.json';
import DataStore from './classes/DataStore';

const dataStore = new DataStore();
const uiTheme = dataStore.get('uiTheme');
uiTheme === 'light'
    ? require('./app.global.light.less')
    : require('./app.global.dark.less');

const store = configureStore();
ipcRenderer.on('open-settings', () => {
    history.push(routes.SETTINGS);
});

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        // eslint-disable-next-line global-require
        const NextRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NextRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}

export default store;
