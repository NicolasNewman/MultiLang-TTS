import { InputTypeKeys, InputTypes } from '../actions/input';

interface InitialStateInterface = {
    text: string
}

const initialState: InitialStateInterface = {
    text: ''
};

export default function input(state: InitialStateInterface = initialState, action: InputTypes) {
    switch (action.type) {
        case InputTypeKeys.SET_INPUT:
            return {
                text: action.text
            };
        default:
            return state;
    }
}
