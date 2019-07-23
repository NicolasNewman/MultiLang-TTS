import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import folder from './folder';
import file from './file';
import input from './input';
import tts from './tts';

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        // counter
        folder,
        file,
        input,
        tts,
        track
    });
}
