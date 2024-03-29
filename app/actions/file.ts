export enum FileTypeKeys {
    SET_FILE = 'SET_FILE',
    GET_FILE = 'GET_FILE'
}

interface SetFileAction {
    type: FileTypeKeys.SET_FILE;
    file: string;
}

interface GetFileAction {
    type: FileTypeKeys.GET_FILE;
}

export type FileTypes = SetFileAction | GetFileAction;

export function setFile(file: string) {
    return {
        type: FileTypeKeys.SET_FILE,
        file
    };
}

export function getFile() {
    return {
        type: FileTypeKeys.GET_FILE
    };
}

export default { setFile, getFile };
