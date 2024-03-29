import * as React from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
const routes = require('./constants/routes.json');
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
// Hacky way to access history to push the SETTINGS route
ipcRenderer.on('open-settings', () => {
    history.push(routes.SETTINGS);
});

const AppContainer = process.env.PLAIN_HMR
    ? React.Fragment
    : ReactHotAppContainer;

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
);

if ((module as any).hot) {
    (module as any).hot.accept('./containers/Root', () => {
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
