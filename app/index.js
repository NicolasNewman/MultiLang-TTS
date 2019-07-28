import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import routes from './constants/routes.json';
import DataStore from './classes/DataStore';
import './app.global.light.less';

// const dataStore = new DataStore();
// const uiTheme = dataStore.get('uiTheme');
// if (uiTheme === 'light') {
//     console.log('importing light');
//     require('./app.global.light.less');
// } else if (uiTheme === 'dark') {
//     console.log('importing dark');
//     require('./app.global.dark.less');
// }

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
