export enum InputTypeKeys {
    SET_INPUT = 'SET_INPUT'
}

interface SetInputAction {
    type: InputTypeKeys.SET_INPUT;
}

export type InputTypes = SetInputAction;

export function setInput(text: string) {
    return {
        type: InputTypeKeys.SET_INPUT,
        text
    };
}

export default { setInput };
