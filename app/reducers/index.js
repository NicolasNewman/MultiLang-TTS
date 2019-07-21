import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import folder from './folder';
import file from './file';

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        // counter
        folder,
        file
    });
}
