import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';
import * as fileActions from '../actions/file';
import * as folderActions from '../actions/folder';
import * as inputActions from '../actions/input';
import * as trackActions from '../actions/track';

const history = createHashHistory();

const rootReducer = createRootReducer(history);

const configureStore = (initialState?: any) => {
    // Redux Configuration
    const middleware = [];
    const enhancers = [];

    // Thunk Middleware
    middleware.push(thunk);

    // Logging Middleware
    const logger = createLogger({
        level: 'info',
        collapsed: true
    });

    // Skip redux logs in console during the tests
    if (process.env.NODE_ENV !== 'test') {
        middleware.push(logger);
    }

    // Router Middleware
    const router = routerMiddleware(history);
    middleware.push(router);

    // Redux DevTools Configuration
    const actionCreators = {
        ...fileActions,
        ...folderActions,
        ...inputActions,
        ...trackActions,
        ...routerActions
    };
    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = (window as any)
        .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Options: http://extension.remotedev.io/docs/API/Arguments.html
              actionCreators
          })
        : compose;
    /* eslint-enable no-underscore-dangle */

    // Apply Middleware & Compose Enhancers
    enhancers.push(applyMiddleware(...middleware));
    const enhancer = composeEnhancers(...enhancers);

    // Create Store
    const store = createStore(rootReducer, initialState, enhancer);

    if ((module as any).hot) {
        (module as any).hot.accept(
            '../reducers',
            // eslint-disable-next-line global-require
            () => store.replaceReducer(require('../reducers').default)
        );
    }

    return store;
};

export default { configureStore, history };
