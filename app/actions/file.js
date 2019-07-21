export const SET_FILE = 'SET_FILE';
export const GET_FILE = 'GET_FILE';

export function setFile(file) {
    return {
        type: SET_FILE,
        file
    };
}

export function getFile() {
    return {
        type: GET_FILE
    };
}

export default { setFile, getFile };
