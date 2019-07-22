export const SET_INPUT = 'SET_INPUT';

export function setInput(text) {
    return {
        type: SET_INPUT,
        text
    };
}

export default { setInput };
