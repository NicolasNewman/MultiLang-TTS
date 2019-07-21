import { SET_FILE, GET_FILE } from '../actions/file';

const initialState = {
    file: ''
};

export default function file(state = initialState, action) {
    switch (action.type) {
        case SET_FILE:
            return {
                file: action.file
            };
        default:
            return state;
    }
}
