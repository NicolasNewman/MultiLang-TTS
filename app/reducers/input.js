import { SET_INPUT } from '../actions/input';

const initialState = {
    text: ''
};

export default function input(state = initialState, action) {
    switch (action.type) {
        case SET_INPUT:
            return {
                text: action.text
            };
        default:
            return state;
    }
}
