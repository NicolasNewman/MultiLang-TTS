import { FileTypeKeys, FileTypes } from '../actions/file';

interface InitialStateInterface {
    file: string;
}

const initialState: InitialStateInterface = {
    file: ''
};

export default function file(
    state: InitialStateInterface = initialState,
    action: FileTypes
) {
    switch (action.type) {
        case FileTypeKeys.SET_FILE:
            return {
                file: action.file
            };
        default:
            return state;
    }
}
